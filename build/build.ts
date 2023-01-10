import esbuild from "esbuild";
import path from "path";
import writeUserscriptHeader from "./writeUserscriptHeader";
import cssModulesPlugin from "esbuild-ssr-css-modules-plugin";
import eslint from "esbuild-plugin-eslint";
import packageJson from "./../package.json";

export default (mode) => {
    const plugins = [
        cssModulesPlugin({
            jsCSSInject: true,
        }),
        eslint(),
    ];

    switch (mode) {
        case "build":
            (() => {
                const config: esbuild.BuildOptions = {
                    logLevel: "info",
                    entryPoints: [path.join(__dirname, "/../src", "index.ts")],
                    define: {
                        "process.env.NODE_ENV": "'production'",
                    },
                    outfile: path.join(__dirname, "/../dist", "index.user.js"),
                    bundle: true,
                    plugins: [...plugins, writeUserscriptHeader()],
                };

                if (packageJson.userScript?.esbuild !== undefined) {
                    Object.keys(packageJson.userScript.esbuild).forEach(
                        (key) => {
                            config[key] = packageJson.userScript.esbuild[key];
                        }
                    );
                }

                esbuild.build(config).catch(() => process.exit(1));
            })();

            break;

        case "dev":
            (() => {
                const hotReloadCliantconfig: esbuild.BuildOptions = {
                    entryPoints: [path.join(__dirname, "cliant", "index.ts")],
                    outfile: path.join(__dirname, "/../dist", "index.user.js"),
                    bundle: true,
                    plugins: [writeUserscriptHeader()],
                };

                const devConfig: esbuild.BuildOptions = {
                    logLevel: "info",
                    entryPoints: [path.join(__dirname, "/../src", "index.ts")],
                    outfile: path.join(__dirname, "tmp", "dev.user.js"),
                    bundle: true,
                    watch: true,
                    plugins: plugins,
                };

                if (packageJson.userScript?.esbuild !== undefined) {
                    Object.keys(packageJson.userScript.esbuild).forEach(
                        (key) => {
                            if (key !== "entryPoints") {
                                hotReloadCliantconfig[key] =
                                    packageJson.userScript.esbuild[key];
                            }
                            devConfig[key] =
                                packageJson.userScript.esbuild[key];
                        }
                    );
                }

                esbuild
                    .build(hotReloadCliantconfig)
                    .catch(() => process.exit(1))
                    .then(() => {
                        esbuild.build(devConfig).catch(() => process.exit(1));
                    });
            })();

            break;
    }
};
