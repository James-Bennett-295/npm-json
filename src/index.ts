import fs from "node:fs";

function stripComments(jsonc: string): string {
	let json = "";
	for (let i = 0; i < jsonc.length; i++) {
		if (jsonc[i] === `"`) {
			json += jsonc[i];
			while (i + 1 < jsonc.length && jsonc[++i] !== `"`) json += jsonc[i];
			json += jsonc[i];
			continue;
		}
		if (jsonc[i] === '/') {
			if (jsonc[++i] === '*') {
				while (1) {
					if (i > jsonc.length) {
						throw "JSONC contains unterminated multi-line comment";
					}
					if (jsonc[++i] === '*' && jsonc[i + 1] === '/') break;
				}
				i++;
			} else {
				while (i < jsonc.length && jsonc[++i] !== '\n');
				if (jsonc[i] === '\n') json += "\n";
			}
			continue;
		}
		json += jsonc[i];
	}
	return json;
}

function parseJsonc(jsonc: string): object {
	return JSON.parse(stripComments(jsonc));
}

function readJsonc(path: string): object {
	return parseJsonc(fs.readFileSync(path, { encoding: "utf-8" }));
}

export { stripComments, parseJsonc, readJsonc }
