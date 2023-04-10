import { createRequire } from "node:module";
import esbuild from "esbuild";

esbuild.build({
    entryPoints: ["src/extension.ts"],
    outfile: "dist/extension.js",
    bundle: true,
    platform: "node",
    external: ["vscode"],
    format: "cjs",
    legalComments: "none",
    logLevel: "info",
    alias: {
        "any-observable": "rxjs",
    },
    define: {
        APK_MITM_VERSION: JSON.stringify(
            // https://nodejs.org/api/module.html#module_module_createrequire_filename
            createRequire(import.meta.url)("apk-mitm/package.json").version
        ),
    },
    minify: true,
});
