import React from "react";
import { Text } from "zmp-ui";
import { AppFont } from "../../constants/app-font";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";

interface Props {
  title: any;
  color?: string;
  fontSize?: string;
  font?: string;
  border?: string;
  background?: string;
  width?: string;
  onClick?: () => void;
}

const TextPrizeComponent = (props: Props) => {
  const {
    title,
    color = appColors.secondary,
    fontSize = appFontSize.small,
    font = AppFont.SfusouvenirBold,
    border = appColors.primary,
    background = appColors.secondary,
    width = "w-72",
    onClick,
  } = props;

  const classNameDiv = `flex justify-center items-center ${width} border-4 rounded-full min-${width} h-16`;
  const borderColorStyle = { borderColor: border };
  const backgroundColorStyle = { backgroundColor: background };
  const fontColorStyle = { color: color };
  const fontStyle = { fontFamily: font, fontSize: fontSize };

  return (
    <div
      className={classNameDiv}
      onClick={onClick}
      style={{ ...borderColorStyle, ...backgroundColorStyle }}
    >
      <span style={{ ...fontColorStyle, ...fontStyle }}>{title}</span>
    </div>
  );
};

export default TextPrizeComponent;
