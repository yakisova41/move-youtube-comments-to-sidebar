import React, { useEffect, useState } from "react";
import style from "../css/style.css";
import { ElementManager } from "../ElementManager";

const CommentInner = ({
    mode,
    manager,
    hide,
}: {
    mode: "secondry-inner" | "below";
    manager: ElementManager;
    hide: boolean;
}) => {
    const [appendComment, setAppendComment] = useState(false);

    useEffect(() => {
        if (!hide) {
            manager.observe("ytd-comments#comments", (comments) => {
                const mycscomments = document.querySelector(
                    "." + style.mycsComments
                );

                if (!appendComment) {
                    mycscomments.appendChild(comments);
                    setAppendComment(true);
                } else {
                    if (mode === "below") {
                        document
                            .querySelector("#below")
                            .appendChild(document.querySelector("#related"));
                    }
                }
            });
        } else if (appendComment) {
            manager.observe("ytd-comments#comments", (comments) => {
                document.querySelector("#below").appendChild(comments);
                setAppendComment(false);
            });
        }
    });

    return (
        <div className={style.mycsCommentInner}>
            <div className={style.mycsComments}></div>
        </div>
    );
};

export default CommentInner;
