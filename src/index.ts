import { ElementManager } from "./ElementManager";
import { domInitialize } from "./domInitialize";

function pageChangeListener() {
    let beforeHref = "";

    const observer = new MutationObserver(() => {
        const href = location.href;
        if (href !== beforeHref) {
            document.dispatchEvent(new CustomEvent("mycs-pageChange"));
        }
        beforeHref = href;
    });

    observer.observe(document.querySelector("body"), {
        childList: true,
        subtree: true,
    });
}

const main = () => {
    const manager = new ElementManager();

    pageChangeListener();

    document.addEventListener("mycs-pageChange", () => {
        const path = location.pathname;

        switch (path) {
            case "/watch":
                domInitialize(manager);
                document.dispatchEvent(
                    new CustomEvent("mycs-setHide", { detail: true })
                );
                break;
        }
    });

    manager.listen();
};

export default main;
main();
