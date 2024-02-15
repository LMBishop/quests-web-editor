const COLOR_CODE_REGEX = /&[0-9a-fk-or]/i;
const VALID_ID_REGEX = /^[a-z0-9_]+$/i;

export function stripColorCodes(str: string): string {
  return str.replace(COLOR_CODE_REGEX, '');
}

export function validateQuestId(id: string): boolean {
  return VALID_ID_REGEX.test(id);
}

export function validateCategoryId(id: string): boolean {
  return VALID_ID_REGEX.test(id);
}

export function validateTaskId(id: string): boolean {
  return VALID_ID_REGEX.test(id);
}