export function stripColourCodes(str: string): string {
  return str.replace(/&[0-9a-fk-or]/i, '');
}