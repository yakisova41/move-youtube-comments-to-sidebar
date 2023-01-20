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
