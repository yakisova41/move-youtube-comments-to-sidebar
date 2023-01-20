import { ElementManager } from "./ElementManager";
import style from "./css/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import CommentArea from "./components/CommentArea";

/**
 * コメント表示切り替えのボタンを作成
 * @param manager ElementManager
 */
function createCommentToggleBtn(manager: ElementManager) {
    const commentToggleBtn = document.createElement("button");
    commentToggleBtn.addEventListener("click", () => {
        document.dispatchEvent(new CustomEvent("mycs-commentBtnClick"));
    });
    commentToggleBtn.className = style.mycsButton;

    const commentToggleBtnDown = document.createElement("div");
    commentToggleBtn.appendChild(commentToggleBtnDown);
    commentToggleBtnDown.className = style.mycsButtonDown;

    commentToggleBtn.innerHTML =
        commentToggleBtn.innerHTML +
        `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><path d="M8,7h8v2H8V7z M8,13h5v-2H8V13z M5,3v13h10h0.41l0.29,0.29L19,19.59V3H5 M4,2h16v20l-5-5H4V2L4,2z"></path></svg>`;

    manager.appendChild(
        "ytd-menu-renderer.ytd-watch-metadata",
        commentToggleBtn
    );
}

/**
 * コメント欄のReactRootを作成
 * @param manager ElementManager
 */
function createCommentArea(manager: ElementManager): ReactDOM.Root {
    const commentAreaRootElement = document.createElement("div");
    commentAreaRootElement.style.width = "100%";

    const root = ReactDOM.createRoot(commentAreaRootElement);

    const addCommentArea = () => {
        manager.remove(commentAreaRootElement);

        if (window.innerWidth > 1015) {
            manager.before(
                "#secondary-inner",
                "#panels",
                commentAreaRootElement
            );
        } else {
            manager.before("#below", "#panels", commentAreaRootElement);
        }
    };

    let innerWidthTmp = 0;

    window.addEventListener("resize", () => {
        if (innerWidthTmp > 1015 && window.innerWidth < 1015) {
            //1016 > Width
            addCommentArea();
            document.dispatchEvent(new CustomEvent("mycs-resize"));
        } else if (innerWidthTmp < 1015 && window.innerWidth > 1015) {
            //1016 < Width
            addCommentArea();
            document.dispatchEvent(new CustomEvent("mycs-resize"));
        }
        innerWidthTmp = window.innerWidth;
    });

    addCommentArea();

    return root;
}

/**
 * DOM処理
 * @param manager ElementManager
 */
export const domInitialize = (manager: ElementManager) => {
    if (document.querySelector("#mycsDominitialize-success") === null) {
        createCommentToggleBtn(manager);
        const root = createCommentArea(manager);

        root.render(
            <React.StrictMode>
                <CommentArea manager={manager} />
            </React.StrictMode>
        );

        const success = document.createElement("div");
        success.id = "mycsDominitialize-success";
        document.querySelector("body").appendChild(success);
    }
};
