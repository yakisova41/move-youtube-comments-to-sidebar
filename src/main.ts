import addButton from "./addButton";
import createComments from "./createComments";

function pageChangeListener(eventelement: Element) {
    let beforeHref = "";

    const observer = new MutationObserver(() => {
        const href = location.href;
        if (href !== beforeHref) {
            eventelement.dispatchEvent(
                new CustomEvent("pageChange", {
                    detail: {
                        beforeHref: beforeHref,
                        newHref: href,
                    },
                })
            );
        }
        beforeHref = href;
    });

    observer.observe(document.querySelector("body"), {
        childList: true,
        subtree: true,
    });
}

export function main() {
    const mycs = document.createElement("div");
    let isButtonCreated = false;
    let isCommentsCreated = false;
    let commentsHide = true;

    pageChangeListener(mycs);

    mycs.addEventListener(
        "pageChange",
        async (e: CustomEvent<pageChangeEvent>) => {
            const { newHref } = e.detail;

            if (newHref.split("/")[3].split("?")[0] === "watch") {
                if (!isButtonCreated) {
                    await addButton(mycs);
                    isButtonCreated = true;
                }

                if (!isCommentsCreated) {
                    await createComments(mycs);
                    isCommentsCreated = true;
                }

                commentsHide = true;

                mycs.dispatchEvent(
                    new CustomEvent("toggleComments", {
                        detail: commentsHide,
                    })
                );
            }
        }
    );

    mycs.addEventListener("toggleClick", () => {
        if (commentsHide) {
            commentsHide = false;
        } else {
            commentsHide = true;
        }

        mycs.dispatchEvent(
            new CustomEvent("toggleComments", {
                detail: commentsHide,
            })
        );
    });
}

export type pageChangeEvent = {
    newHref: string;
    beforeHref: string;
};
