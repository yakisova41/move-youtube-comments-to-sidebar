import { ElementManager } from "./ElementManager";
import { domInitialize } from "./domInitialize";
import style from "./css/style.css";

function changeListener() {
    let beforeHref = "";

    setInterval(() => {
        const href = location.href;
        if (href !== beforeHref) {
            const clickEvent = new CustomEvent("mycs-pageChange");
            document.dispatchEvent(clickEvent);
        }
        beforeHref = href;
    });
}

const main = () => {
    const manager = new ElementManager();

    changeListener();

    document.addEventListener("mycs-pageChange", () => {
        const path = location.pathname;

        switch (path) {
            case "/watch":
                manager.observe("." + style.mycsCommentArea, (commentArea) => {
                    commentArea.classList.add(style.mycsHidden);
                });

                domInitialize(manager);
                break;
        }
    });

    manager.listen();
};

export default main;
main();
