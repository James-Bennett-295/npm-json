declare function stripComments(jsonc: string): string;
declare function parseJsonc(jsonc: string): object;
declare function readJsonc(path: string): object;
export { stripComments, parseJsonc, readJsonc };
