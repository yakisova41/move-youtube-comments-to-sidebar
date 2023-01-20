import { ElementManager } from "./ElementManager";
import { domInitialize } from "./domInitialize";

function changeListener() {
    let beforeHref = "";

    setInterval(() => {
        const href = location.href;
        if (href !== beforeHref) {
            document.dispatchEvent(new CustomEvent("mycs-pageChange"));
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
