export const findElement = (selector: string): Promise<Element> => {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            const elem = document.querySelector(selector);
            if (elem !== null) {
                clearInterval(interval);
                resolve(elem);
            }
        });
    });
};
