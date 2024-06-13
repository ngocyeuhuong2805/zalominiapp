import React from "react";
import { appColors } from "../../constants/appColors";

interface Props {
  title: string;
  onClick?: () => void;
  color?: string;
  background?: string;
  font?: string;
  fontSize?: string;
  style?: React.CSSProperties;
  stroke?: string,
  colorStroke?: string
}
const ButtonOption = (props: Props) => {
  const { title, onClick, color, background, font, fontSize, stroke, colorStroke } = props;
  return (
    <button
      onClick={onClick}
      style={{
        borderColor: "#006666",
        color: color,
        fontFamily: font,
        fontSize: fontSize,
        stroke: stroke,
        lineHeight: "1.5",
        fontWeight: 400,
      }}
      className="size-80  h-16   border-4  rounded-full   }"
      type="button"
    >
      {title}
    </button>
  );
};
export default ButtonOption;