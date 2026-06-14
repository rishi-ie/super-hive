import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const TARGET_PLATFORM = process.env.TARGET_PLATFORM ?? process.platform;

const desktopDir = resolve(import.meta.dirname, "..");
const outfile = resolve(
	desktopDir,
	"dist/resources/bin",
	TARGET_PLATFORM === "win32" ? "superset.exe" : "superset",
);

mkdirSync(resolve(outfile, ".."), { recursive: true });

if (TARGET_PLATFORM === "win32") {
	writeFileSync(outfile, "@echo off\necho Superset CLI stub\r\n", {
		encoding: "utf8",
	});
} else {
	writeFileSync(outfile, "#!/bin/sh\necho 'Superset CLI stub'\n", {
		encoding: "utf8",
	});
	chmodSync(outfile, 0o755);
}

console.log(`[desktop] bundled CLI stub written to ${outfile}`);
