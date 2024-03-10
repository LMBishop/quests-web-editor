import type { EditorQuest, EditorTask, EditorCategory } from '../stores/session';

export function loadQuestsFromJson(config: any): EditorQuest[] {
  return Object.keys(config).map((questid: any) => {
    const quest = config[questid];

    return {
      id: questid,
      display: {
        name: quest.display.name,
        lore: {
          normal: quest.display['lore-normal'],
          started: quest.display['lore-started'],
        },
        type: quest.display.type,
      },
      tasks: Object.fromEntries(Object.keys(quest.tasks).map((taskId: string) => {
        return [taskId, {
          id: taskId,
          config: quest.tasks[taskId],
        } as EditorTask];
      })),
      rewards: quest.rewards,
      ...(quest.startcommands && { startCommands: quest.startcommands }),
      ...(quest.startstring && { startString: quest.startstring }),
      ...(quest.rewardstring && { rewardString: quest.rewardstring }),
      ...(quest.placeholders && { placeholders: quest.placeholders }),
      options: {
        category: quest.options.category,
        requirements: quest.options.requires || [],
        permissionRequired: quest.options['permission-required'] || false,
        cancellable: quest.options.cancellable || false,
        countsTowardsLimit: quest.options['counts-towards-limit'] || true,
        repeatable: quest.options.repeatable || false,
        cooldown: {
          enabled: quest.options.cooldown?.enabled || false,
          time: quest.options.cooldown?.time || 0,
        },
        timeLimit: {
          enabled: quest.options['time-limit']?.enabled || false,
          time: quest.options['time-limit']?.time || 0,
        },
        sortOrder: quest.options['sort-order'] || 0,
        autostart: quest.options.autostart || false,
        ...(quest.options['completed-display'] && { completedDisplay: quest.options['completed-display'] }),
        ...(quest.options['cooldown-display'] && { cooldownDisplay: quest.options['cooldown-display'] }),
        ...(quest.options['permission-display'] && { permissionDisplay: quest.options['permission-display'] }),
        ...(quest.options['locked-display'] && { lockedDisplay: quest.options['locked-display'] }),
      },
    } as EditorQuest;
  });
}

export function loadCategoriesFromJson(config: any): EditorCategory[] {
  return Object.keys(config).map((categoryid: any) => {
    const category = config[categoryid];

    return {
      id: categoryid,
      display: {
        name: category.display.name,
        lore: category.display.lore,
        type: category.display.type,
      },
      permissionRequired: category['permission-required'],
    };
  });
}
