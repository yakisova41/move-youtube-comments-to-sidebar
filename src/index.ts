import { ElementManager } from "./ElementManager";
import { domInitialize } from "./domInitialize";
import style from "./css/style.css";

function changeListener() {
    let beforeHref = "";

    setInterval(() => {
        const href = location.href;
        if (href !== beforeHref) {
            const clickEvent = new CustomEvent("ycms-pageChange");
            document.dispatchEvent(clickEvent);
        }
        beforeHref = href;
    });
}

const main = () => {
    const manager = new ElementManager();

    changeListener();

    document.addEventListener("ycms-pageChange", () => {
        const path = location.pathname;

        switch (path) {
            case "/watch":
                manager.observe("." + style.ycmsCommentArea, (commentArea) => {
                    commentArea.classList.add(style.ycmsHidden);
                });

                domInitialize(manager);
                break;
        }
    });

    manager.listen();
};

export default main;
main();
