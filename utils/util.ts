const COLOR_CODE_REGEX = /&([0-9a-fk-or]|#[0-9A-F]{6})/ig;

export function stripColorCodes(str: string): string {
  return str.replace(COLOR_CODE_REGEX, '');
}

export function navigateToEditorPane(type: 'quest' | 'category' | 'item' | null, id?: string) {
  if (id) {
    if (type === 'category') {
      navigateTo({ path: '/category/' + id })
    } else if (type === 'quest') {
      navigateTo({ path: '/quest/' + id })
    } else if (type === 'item') {
      navigateTo({ path: '/item/' + id })
    }
  } else if (!id && !type) {
    navigateTo({ path: '/' })
  }
}

export type BrowserCapabilities = {
  canUseFsApi: boolean
}

export function getBrowserCapabilities(): BrowserCapabilities {
  return {
    canUseFsApi: typeof (window as any)?.showDirectoryPicker === 'function'
  }
}