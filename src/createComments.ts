import style from "./css/style.css";
import { findElement } from "./findElement";

async function createComments() {
    const root = document.createElement("div");
    root.classList.add(style.mycsCommentArea);
    root.innerHTML = `<div class=${style.mycsCommentInner}><div class=${style.mycsComments}></div></div>`;

    const commentsOuter = root.querySelector(`.${style.mycsComments}`);

    const comments = await findElement("ytd-comments#comments");

    return {
        root,
        commentsOuter,
        comments,
    };
}

async function smallMode(root: Element) {
    const panels = await findElement("#primary-inner > #below > #panels");
    panels.before(root);
    root.classList.add(style.mycsCommentAreaBelow);
    root.classList.remove(style.mycsCommentAreaSecondaryInner);
}

async function bigMode(root: Element) {
    const panels = await findElement("#secondary-inner > #panels");
    panels.before(root);
    root.classList.add(style.mycsCommentAreaSecondaryInner);
    root.classList.remove(style.mycsCommentAreaBelow);
}

export default async (eventElement: Element) => {
    const { root, comments, commentsOuter } = await createComments();

    if (window.innerWidth > 1015) {
        //BIG
        bigMode(root);
    } else {
        //SMALL
        smallMode(root);
    }

    let innerWidthTmp = 0;

    window.addEventListener("resize", () => {
        setTimeout(async () => {
            if (innerWidthTmp > 1015 && window.innerWidth < 1015) {
                //SMALL
                await smallMode(root);
                const related = commentsOuter.querySelector("#related");

                findElement("#primary-inner > #below").then((e) =>
                    e.appendChild(related)
                );
            } else if (innerWidthTmp < 1015 && window.innerWidth > 1015) {
                //BIG
                bigMode(root);
            }
            innerWidthTmp = window.innerWidth;
        }, 1);
    });

    eventElement.addEventListener(
        "toggleComments",
        async (e: CustomEvent<boolean>) => {
            if (e.detail) {
                //hide
                root.classList.add(style.mycsHidden);

                const commentParent = await findElement(
                    "#primary-inner > #below"
                );
                commentParent.appendChild(comments);
            } else {
                //show
                root.classList.remove(style.mycsHidden);
                commentsOuter.appendChild(comments);
            }
        }
    );

    return comments;
};
