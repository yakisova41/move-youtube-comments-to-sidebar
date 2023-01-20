export type ElementData = {
    element: Element;
    beforeSelector?: string;
    parentSelector?: string;
    addMode: "appendChild" | "before";
};

/**
 * DOM内の要素の有無を監視し、ない場合に再度要素を追加します
 * SPAなどでDOMが書き換わる環境で使うと便利です。
 */
export class ElementManager {
    private elementsData: ElementData[] = [];

    /**
     * 監視する要素を追加します
     * @param elementData 監視する要素についてのオプション
     */
    public add(elementData: ElementData): void {
        this.elementsData.push(elementData);
    }

    /**
     * 要素の監視を停止します
     * @param element 監視中の要素
     */
    public remove(element: Element): void {
        this.elementsData.forEach((elementData, index) => {
            if (elementData.element === element) {
                this.elementsData.splice(index, 1);
                element.remove();
            }
        });
    }

    /**
     * 要素を監視します
     * 見つからない場合はappendChildまたはbeforeを用いて再度追加します
     */
    public listen(): void {
        setInterval(() => {
            this.elementsData.forEach((elementData) => {
                let add = true;
                try {
                    const parent = document.querySelector(
                        elementData.parentSelector
                    );

                    if (elementData.element === null) {
                        add = false;
                    }

                    Array.from(parent.children).forEach((child) => {
                        if (child === elementData.element) {
                            add = false;
                        }
                    });

                    if (add) {
                        switch (elementData.addMode) {
                            case "appendChild":
                                parent.appendChild(elementData.element);
                                break;

                            case "before":
                                document
                                    .querySelector(elementData.beforeSelector)
                                    .before(elementData.element);
                                break;
                        }
                    }
                } catch (err) {
                    //pass
                }
            });
        }, 100);
    }

    /**
     * 監視する要素を追加します
     * addのラッパー addModeはappendChildです
     * @param parentSelector 親要素のselector
     * @param element 追加する要素
     */
    public appendChild(parentSelector: string, element: Element): void {
        this.elementsData.push({
            element,
            parentSelector: parentSelector,
            addMode: "appendChild",
        });

        try {
            element.appendChild(element);
        } catch (err) {
            //pass
        }
    }

    /**
     * 監視する要素を追加します
     * addのラッパー addModeはbeforeです
     * @param parentSelector 親要素のselector
     * @param beforeSelector beforeのselector
     * @param element 追加する要素
     */
    public before(
        parentSelector: string,
        beforeSelector: string,
        element: Element
    ): void {
        this.elementsData.push({
            element,
            parentSelector: parentSelector,
            beforeSelector: beforeSelector,
            addMode: "before",
        });
        try {
            document.querySelector(beforeSelector).before(element);
        } catch (err) {
            //pass
        }
    }

    /**
     * 要素の有無を監視し、nullでなくなった場合に関数を実行します
     * @param selector 監視する要素
     * @param callBack 実行する関数
     */
    public observe(
        selector: string,
        callBack: (element: Element) => void
    ): void {
        const interval = setInterval(() => {
            let element = document.querySelector(selector);

            if (element !== null) {
                clearInterval(interval);
                callBack(element);
                element = null;
            }
        }, 100);
    }
}
