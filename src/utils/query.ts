export function toString(string: string | string[] | undefined): string | undefined {
  return Array.isArray(string) ? string[0] : string;
}
