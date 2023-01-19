import { ElementManager } from "./ElementManager";
import style from "./css/style.css";

/**
 * コメント表示切り替えのボタンを作成
 * @param manager ElementManager
 */
function createCommentToggleBtn(manager: ElementManager) {
    const commentToggleBtn = document.createElement("button");
    commentToggleBtn.addEventListener("click", () => {
        const clickEvent = new CustomEvent("mycs-commentBtnClick");
        document.dispatchEvent(clickEvent);
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
 * サイドのコメント欄を作成
 * @param manager ElementManager
 */
function createCommentArea(manager: ElementManager) {
    const commentArea = document.createElement("div");
    commentArea.className = style.mycsCommentArea;
    commentArea.classList.add(style.mycsHidden);

    const commentInner = document.createElement("div");
    commentInner.className = style.mycsCommentInner;
    commentArea.appendChild(commentInner);

    const mycsComments = document.createElement("div");
    mycsComments.className = style.mycsComments;
    commentInner.appendChild(mycsComments);
    manager.before("#secondary-inner", "#panels", commentArea);

    manager.observe("ytd-comments", (comments) => {
        const below = document.querySelector("#below");

        document.addEventListener("mycs-commentBtnClick", () => {
            if (commentArea.classList.contains(style.mycsHidden)) {
                commentArea.classList.remove(style.mycsHidden);
                mycsComments.appendChild(comments);
            } else {
                commentArea.classList.add(style.mycsHidden);
                below.appendChild(comments);
            }
        });
    });
}

/**
 * DOM処理
 * @param manager ElementManager
 */
export const domInitialize = (manager: ElementManager) => {
    if (document.querySelector("#mycsDominitialize-success") === null) {
        createCommentToggleBtn(manager);
        createCommentArea(manager);

        const success = document.createElement("div");
        success.id = "mycsDominitialize-success";
        document.querySelector("ytd-app").appendChild(success);
    }
};
