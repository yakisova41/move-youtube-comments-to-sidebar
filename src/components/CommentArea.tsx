import React, { useLayoutEffect, useState } from "react";
import style from "../css/style.css";
import CommentInner from "./CommentInner";
import { ElementManager } from "../ElementManager";

const commentArea = ({ manager }: { manager: ElementManager }) => {
    const [mode, setMode] = useState<"secondry-inner" | "below">(
        "secondry-inner"
    );
    const [hide, setHide] = useState(true);

    const modeChanger = () => {
        if (window.innerWidth < 1015) {
            setMode("below");
        } else {
            setMode("secondry-inner");
        }
    };

    useLayoutEffect(() => {
        modeChanger();
    }, []);

    document.addEventListener("mycs-resize", () => {
        modeChanger();
    });

    document.addEventListener("mycs-commentBtnClick", () => {
        if (hide) {
            setHide(false);
        } else {
            setHide(true);
        }
    });

    document.addEventListener("mycs-setHide", (e: CustomEvent) => {
        setHide(e.detail);
    });

    return (
        <div
            className={
                style.mycsCommentArea +
                " " +
                (mode === "secondry-inner"
                    ? style.mycsCommentAreaSecondaryInner
                    : style.mycsCommentAreaBelow) +
                " " +
                (hide ? style.mycsHidden : "")
            }
        >
            <CommentInner mode={mode} manager={manager} hide={hide} />
        </div>
    );
};

export default commentArea;
