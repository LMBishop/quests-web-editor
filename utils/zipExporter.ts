import JSZip from 'jszip';
import { stringify } from 'yaml';
import {
  mapJsonCategoryToYamlObject,
  mapJsonItemToYamlObject,
  mapJsonQuestToYamlObject,
} from '~/lib/questsLoader';

//TODO include the main configuration
export async function prepareZip(
  quests: EditorQuest[],
  categories: EditorCategory[],
  items: EditorItem[]
) {
  const transformedQuests = Object.fromEntries(
    quests.map((quest) => [quest.id, stringify(mapJsonQuestToYamlObject(quest))])
  );
  const transformedItems = Object.fromEntries(
    items.map((item) => [item.id, stringify(mapJsonItemToYamlObject(item))])
  );
  const transformedCategories = stringify(
    Object.fromEntries(
      categories.map((category) => [category.id, mapJsonCategoryToYamlObject(category)])
    )
  );

  return {
    transformedQuests,
    transformedItems,
    transformedCategories,
  };
}

export async function createZip(
  quests: { [key: string]: string },
  categories: string,
  items: { [key: string]: string }
) {
  const zip = new JSZip();

  zip.file('categories.yml', categories);

  const questsDirectory = zip.folder('quests');
  Object.entries(quests).forEach(([key, value]) => {
    questsDirectory?.file(`${key}.yml`, value);
  });
  const itemsDirectory = zip.folder('items');
  Object.entries(items).forEach(([key, value]) => {
    itemsDirectory?.file(`${key}.yml`, value);
  });

  return await zip.generateAsync({ type: 'blob' });
}
