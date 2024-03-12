import { parse } from "yaml";
import { loadCategoriesFromJson, loadItemsFromJson, loadQuestsFromJson } from "~/lib/questsLoader";

export async function openFileSystem() {
  try {
    return await (window as any).showDirectoryPicker();
  } catch (e) {
    return undefined;
  }
}

export async function enumerateQuestDirectory(dirHandle: any) {
  let configFile: any = null;
  let categoryFile: any = null;
  let questsDirectory: any = null;
  let itemsDirectory: any = null;

  for await (const [name, handle] of dirHandle) {
    if (name === 'quests' && handle.kind === 'directory') {
      questsDirectory = handle;
    } else if (name === 'items' && handle.kind === 'directory') {
      itemsDirectory = handle;
    } else if (name === 'config.yml' && handle.kind === 'file') {
      configFile = handle;
    } else if (name === 'categories.yml' && handle.kind === 'file') {
      categoryFile = handle;
    }
  }

  if (!configFile) {
    throw Error('invalid quest directory');
  }

  const [questFiles, itemFiles] = await Promise.all([questsDirectory ? listAllFilesAndDirs(questsDirectory) : [], itemsDirectory ? listAllFilesAndDirs(itemsDirectory) : []]);
  const [categories, quests, items] = await Promise.all([(async () => {
    if (!categoryFile) {
      return [];
    }

    const file: any = await categoryFile.getFile();
    const text: string = await file.text();
    const parsedYaml: any = parse(text);

    return loadCategoriesFromJson(parsedYaml.categories);
  })(),
  (async () => {
    if (!questFiles) {
      return [];
    }

    const allQuests = await Promise.all(questFiles.filter(({ name, handle, kind }) => name.endsWith('.yml')).map(async ({ name, handle, kind }) => {
      const file: any = await handle.getFile();
      const text: string = await file.text();
      return [
        name.replace('.yml', ''),
        parse(text)
      ];
    }))

    return loadQuestsFromJson(Object.fromEntries(allQuests));
  })(),
  (async () => {
    if (!itemFiles) {
      return [];
    }

    const allItems = await Promise.all(itemFiles.filter(({ name, handle, kind }) => name.endsWith('.yml')).map(async ({ name, handle, kind }) => {
      const file: any = await handle.getFile();
      const text: string = await file.text();
      return [
        name.replace('.yml', ''),
        parse(text)
      ];
    }))

    return loadItemsFromJson(Object.fromEntries(allItems));
  })()]);

  return { categories, quests, items };
}

async function listAllFilesAndDirs(dirHandle: any): Promise<any[]> {
  const files = [];
  for await (const [name, handle] of dirHandle) {
    const { kind } = handle;
    if (handle.kind === 'directory') {
      files.push(...await listAllFilesAndDirs(handle));
    } else {
      files.push({ name, handle, kind });
    }
  }
  return files;
}