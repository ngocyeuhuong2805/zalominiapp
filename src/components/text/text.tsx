import React from "react";
import { Text } from "zmp-ui";
import { AppFont } from "../../constants/app-font";
import { appColors } from "../../constants/appColors";

interface Props {
  title: any;
  color?: string;
  boderColor?: string;
  fontSize?: string;
  font?: string;
  stroke?: string;
  colorStroke?: string;
  fontWeight?: string;
  boder?: string;
  boderRadius?: string;
  background?: string;
  padding?: string;
}

const TextComponent = (props: Props) => {
  const {
    title,
    color = appColors.secondary,
    boderColor,
    fontSize,
    font = AppFont.BagelFatOne,
    stroke,
    colorStroke,
    fontWeight,
    boder,
    boderRadius,
    background,
    padding,
  } = props;
  return (
    <div className="flex justify-center place-items-center relative h-24 w-screen">
      <Text
        className="absolute"
        style={{
          color: color,
          borderColor: boderColor,
          fontSize: fontSize,
          fontFamily: font,
          WebkitTextStroke: colorStroke,
          fontWeight: fontWeight,
          borderWidth: boder,
          borderRadius: boderRadius,
          textTransform: "uppercase",
          lineHeight: "1.5",
          textAlign: "center",
          background: background,
          padding: padding,
        }}
      >
        {title}
      </Text>
      <Text
        className="absolute"
        style={{
          color: color,
          borderColor: boderColor,
          fontSize: fontSize,
          fontFamily: font,
          fontWeight: fontWeight,
          borderWidth: boder,
          borderRadius: boderRadius,
          textTransform: "uppercase",
          lineHeight: "1.5",
          textAlign: "center",
          background: background,
          padding: padding,
        }}
      >
        {title}
      </Text>
    </div>
  );
};
export default TextComponent;
