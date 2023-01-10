import fs from "fs";
import packageJson from "./../package.json";

export default () => ({
    name: "writeUserscriptHeader",
    setup(build) {
        build.onEnd(() => {
            const outFile = build.initialOptions.outfile;
            const buildResult = fs.readFileSync(outFile);

            let userscriptHeaders: string[] = [];

            userscriptHeaders.push("// ==UserScript==");
            Object.keys(packageJson.userScript).forEach((key) => {
                if (key[0] === "@") {
                    userscriptHeaders.push(
                        `// ${key} ${packageJson["userScript"][key]}`
                    );
                }
            });
            userscriptHeaders.push("// ==/UserScript==");

            fs.writeFileSync(
                outFile,
                [userscriptHeaders.join("\n"), buildResult].join("\n\n")
            );
        });
    },
});
