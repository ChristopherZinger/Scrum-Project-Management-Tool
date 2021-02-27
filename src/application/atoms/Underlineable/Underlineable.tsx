import React from "react";
import { Colors } from "../../../global-styles/global-styles";

interface UnderlineProps {
    text: string;
    underline: boolean;
    tagType?: string;
    textStyle?: {
        [key: string]: string | number;
    },
    underlineStyle?: {
        [key: string]: string | number;
    },
}
export const Underlineable = ({
    text,
    underline,
    tagType = "p",
    textStyle = {},
    underlineStyle = {}
}: UnderlineProps) => {

    const element = React.createElement(tagType, {
        style: {
            zIndex: 10,
            position: "relative",
            ...textStyle
        }
    }, text)

    return (
        <div style={{ display: "inline-block", position: "relative" }}>
            {element}
            <div style={{
                zIndex: 0,
                position: "absolute",
                bottom: "10px",
                width: underline ? "100%" : "0%",
                height: "11px",
                transitionDuration: ".4s",
                backgroundColor: `${Colors.Palet01}`,
                ...underlineStyle
            }} />
        </div>
    )
}