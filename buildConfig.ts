import packagejson from "./package.json";

export const userScriptHeader = {
    "@name": packagejson.name,
    "@version": packagejson.version,
    "@licence": packagejson.license,
    "@name:ja": "YouTubeのコメント欄をサイドバーで見れるようにする",
    "@author": "yakisova41",
    "@description":
        "Make the Youtube comments section visible from the sidebar",
    "@description:ja":
        "YouTubeのコメント欄をサイドバーから見れるようにします。",
    "@match": "https://www.youtube.com/*",
    "@namespace": "https://yakisova.com",
    "@icon":
        "data:image/png;base64,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",
};

export const devServer = {
    port: 4545,
    host: "localhost",
    websocket: 6464,
    hot: true,
};

/**
 * Chrome extension support
 * manifest v3
 */
export const manifest = {
    name: "__MSG_Name__",
    short_name: "mycs",
    version: packagejson.version,
    manifest_version: 3,
    description: "__MSG_Description__",
    content_scripts: [
        {
            matches: ["https://www.youtube.com/*"],
            js: ["contentScript.js"],
        },
    ],
    web_accessible_resources: [
        {
            resources: ["embed.js"],
            matches: ["https://www.youtube.com/*"],
        },
    ],
    default_locale: "en",
    icons: {
        "16": "assets/icon16.png",
        "48": "assets/icon48.png",
        "128": "assets/icon128.png",
    },
};
