import React from "react";
import { height } from "zmp-dom";
import { AppFont } from "../../constants/app-font";
import { appColors } from "../../constants/appColors";
import TextComponent from "./text";

interface Props {
  onClick?: () => void;
  color?: string;
  background?: string;
  fontSize?: number;
  titleTop: string;
  titleBottom: string;
  strokeWidth?: number;
  strokeColor?: string;
  font?: string;
  height?: string;
}

const TextTitleApp = (props: Props) => {
  const {
    titleTop,
    titleBottom,
    onClick,
    color = "white",
    fontSize = 60,
    strokeWidth = 30,
    strokeColor = appColors.primary,
    font = AppFont.BagelFatOne,
    height = "h-56",
  } = props;

  const classNameComponent = `${height} flex flex-col justify-center place-items-center`;

  return (
    <div onClick={onClick} className={classNameComponent}>
      <TextComponent
        title={`${titleTop}`}
        font={font}
        color={color}
        fontSize={`${fontSize}px`}
        colorStroke={`${strokeWidth}px ${strokeColor}`}
      />
      <TextComponent
        title={`${titleBottom}`}
        font={font}
        color={color}
        fontSize={`${fontSize}px`}
        colorStroke={`${strokeWidth}px ${strokeColor}`}
      />
    </div>
  );
};

export default TextTitleApp;
