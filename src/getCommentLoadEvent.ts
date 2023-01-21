export const getCommentLoadEvent = (namespace: string) => {
    const { fetch: originalFetch } = window;
    window.fetch = (...args) => {
        let [request, config] = args;
        const response = originalFetch(request, config);

        response.then(async (res) => {
            const newRes = res.clone();

            if (typeof request["url"] === "string") {
                if (
                    request["url"].match(
                        "https://www.youtube.com/youtubei/v1/next.*"
                    )
                ) {
                    const text = await newRes.text();
                    const data = JSON.parse(text);
                    try {
                        const onResponseReceivedEndpoints =
                            data["onResponseReceivedEndpoints"];

                        if (
                            onResponseReceivedEndpoints.length > 1 &&
                            "reloadContinuationItemsCommand" in
                                onResponseReceivedEndpoints[1]
                        ) {
                            if (
                                onResponseReceivedEndpoints[1][
                                    "reloadContinuationItemsCommand"
                                ]["targetId"] === "comments-section"
                            ) {
                                const items =
                                    onResponseReceivedEndpoints[1][
                                        "reloadContinuationItemsCommand"
                                    ]["continuationItems"];

                                items.forEach((item, index) => {
                                    if ("continuationItemRenderer" in item) {
                                        items.splice(index, 1);
                                    }
                                });
                                const length = items.length;

                                const commentLoadEvent = new CustomEvent(
                                    namespace + "-commentload",
                                    {
                                        detail: {
                                            length,
                                            mode: "main",
                                            contents: items,
                                        },
                                    }
                                );

                                document.dispatchEvent(commentLoadEvent);
                            }
                        }

                        if (
                            "appendContinuationItemsAction" in
                            onResponseReceivedEndpoints[0]
                        ) {
                            if (
                                onResponseReceivedEndpoints[0][
                                    "appendContinuationItemsAction"
                                ]["targetId"] === "comments-section"
                            ) {
                                const items =
                                    onResponseReceivedEndpoints[0][
                                        "appendContinuationItemsAction"
                                    ]["continuationItems"];

                                items.forEach((item, index) => {
                                    if ("continuationItemRenderer" in item) {
                                        items.splice(index, 1);
                                    }
                                });
                                const length = items.length;

                                const commentLoadEvent = new CustomEvent(
                                    namespace + "-commentload",
                                    {
                                        detail: {
                                            length,
                                            mode: "main",
                                            contents: items,
                                        },
                                    }
                                );

                                document.dispatchEvent(commentLoadEvent);
                            }

                            if (
                                onResponseReceivedEndpoints[0][
                                    "appendContinuationItemsAction"
                                ]["targetId"].match("comment-replies.*")
                            ) {
                                const length =
                                    onResponseReceivedEndpoints[0][
                                        "appendContinuationItemsAction"
                                    ]["continuationItems"].length;

                                const commentLoadEvent = new CustomEvent(
                                    namespace + "-commentload",
                                    {
                                        detail: {
                                            length,
                                            mode: "replies",
                                            target: onResponseReceivedEndpoints[0][
                                                "appendContinuationItemsAction"
                                            ]["targetId"],
                                        },
                                    }
                                );

                                document.dispatchEvent(commentLoadEvent);
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        });

        return response;
    };
};
