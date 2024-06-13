import React from "react";
import { AppFont } from "../../constants/app-font";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";
import StartRightComponent from "../../static/svg/icons/StartRightComponent";

interface Props {
  title: string;
  onClick?: () => void;
  color?: string;
  background?: string;
  fontFamily?: string;
  textAllCap?: boolean;
}

const ButtonStart = (props: Props) => {
  const {
    title,
    onClick,
    color = "#FFFFFF",
    background,
    fontFamily = AppFont.SfusouvenirBold,
    textAllCap,
  } = props;
  const classNameTailwind = `leading-8 justify-center flex text-center max-w-46`;

  return (
    <div
      className="flex flex-row rounded-[33px] hover:opacity-70 p-3"
      style={{
        backgroundColor: background || appColors.primary,
        boxShadow: "3px 2px 5px rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClick}
    >
      <div className="justify-center flex pr-3">
        <StartRightComponent color={color} flipHorizontal={true} />
      </div>
      <div
        className={classNameTailwind}
        style={{
          fontSize: appFontSize.normal,
          color: color,
          textTransform: textAllCap ? "uppercase" : "none",
          fontFamily: fontFamily,
        }}
      >
        {title}
      </div>
      <div className="justify-center flex pl-3">
        <StartRightComponent color={color} flipHorizontal={false} />
      </div>
    </div>
  );
};

export default ButtonStart;
