import build from "./build";
import getArgv from "./modules/getArgv";

const argv = getArgv();

if (argv["mode"] === "build") {
    build("build");
} else {
    build("dev");
}
