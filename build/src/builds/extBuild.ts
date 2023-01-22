import esbuild, { BuildOptions, Plugin } from "esbuild";
import path from "path";
import fs from "fs-extra";
import glob from "glob";

export default (plugins: Plugin[]) => {
    const workingDir = process.cwd();

    const entryPoints = glob.sync("./src/extension/**/*.ts");

    const config: BuildOptions = {
        logLevel: "info",
        entryPoints,
        define: {
            "process.env.NODE_ENV": "'production'",
        },
        outdir: path.join(workingDir, "/dist/extension"),
        bundle: true,
        plugins: [...plugins],
        minify: true,
    };

    esbuild
        .build(config)
        .then(() => {
            fs.copyFileSync(
                path.join(workingDir, "/manifest.json"),
                path.join(workingDir, "/dist/extension/manifest.json")
            );

            if (
                fs.existsSync(path.join(workingDir, "/src/extension/_locales"))
            ) {
                fs.copySync(
                    path.join(workingDir, "/src/extension/_locales/"),
                    path.join(workingDir, "/dist/extension/_locales/")
                );
            }

            const matches = glob.sync("./assets/**/*");

            matches.forEach((match) => {
                const split = match.split("/");
                const filename = split[split.length - 1];
                fs.copyFileSync(
                    path.join(workingDir, match),
                    path.join(workingDir, "/dist/extension/", filename)
                );
            });
        })
        .catch(() => process.exit(1));
};
