import build from "./build";
import getArgv from "./modules/getArgv";

const argv = getArgv();

build(argv["mode"]);
