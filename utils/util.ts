const COLOR_CODE_REGEX = /&([0-9a-fk-or]|#[0-9A-F]{6})/gi;

export function stripColorCodes(str: string): string {
  return str.replace(COLOR_CODE_REGEX, '');
}

export function navigateToEditorPane(
  type: 'quest' | 'category' | 'item' | 'config' | null,
  id?: string
) {
  if (id) {
    if (type === 'category') {
      navigateTo({ path: '/editor/category/' + id });
    } else if (type === 'quest') {
      navigateTo({ path: '/editor/quest/' + id });
    } else if (type === 'item') {
      navigateTo({ path: '/editor/item/' + id });
    }
  } else if (type === 'config') {
    navigateTo({ path: '/editor/config' });
  } else if (!id && !type) {
    navigateTo({ path: '/editor' });
  }
}

export type BrowserCapabilities = {
  canUseFsApi: boolean;
};

export function getBrowserCapabilities(): BrowserCapabilities {
  return {
    canUseFsApi: typeof (window as any)?.showDirectoryPicker === 'function',
  };
}
