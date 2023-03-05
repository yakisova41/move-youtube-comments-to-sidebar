import { findElement } from "./findElement";
import style from "./css/style.css";

export default async (eventElement: Element) => {
    const button = document.createElement("button");
    button.className = style.mycsButton;
    button.innerHTML =
        button.innerHTML +
        `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><path d="M8,7h8v2H8V7z M8,13h5v-2H8V13z M5,3v13h10h0.41l0.29,0.29L19,19.59V3H5 M4,2h16v20l-5-5H4V2L4,2z"></path></svg>`;

    const buttonDown = document.createElement("div");
    button.appendChild(buttonDown);
    buttonDown.className = style.mycsButtonDown;

    const buttonsParent = await findElement(
        "ytd-menu-renderer.ytd-watch-metadata"
    );

    buttonsParent.appendChild(button);

    button.onclick = (e) => {
        eventElement.dispatchEvent(
            new CustomEvent("toggleClick", {
                detail: e,
            })
        );
    };
};
