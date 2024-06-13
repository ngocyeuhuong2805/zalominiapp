import React from "react";
import { TextAlignType } from "zmp-sdk";
import { Icon, Text } from "zmp-ui";
import { appColors } from "../../constants/appColors";
import { AppFont } from "../../constants/app-font";
interface Props {
  title?: string;
  colorText?: string;
  colorGame?: string
  borderColor?: string
  onclick?: () => void;
  isIcon?: boolean
  colorBackground?: string

}

const ViewQuestionComponent = (props: Props) => {
  const {
    title,
    colorText,
    colorGame,
    onclick,
    isIcon = true,
    colorBackground,
    borderColor
  } = props;
  return (
    <div onClick={onclick} className={'bg-white w-44 h-auto border-2 rounded-[30px] flex justify-center items-center overflow-hidden QuicksanRegular'} style={{ backgroundColor: colorGame, borderColor: borderColor ? borderColor : appColors.primary }}>
      <div className="w-32 h-14  flex justify-center items-center">
        <span className="text-center line-clamp-2 text-[20px] pb-1" style={{ color: colorText ? colorText : appColors.primary, fontFamily: AppFont.QuicksanSemibold }}>
          {title ? title : "Nhập đáp án"}
        </span>
      </div>
      <div className="flex justify-center items-center ">
        {isIcon && <Icon className="hover:opacity-70" style={{ color: colorBackground ? colorBackground : appColors.primary }} icon="zi-edit-solid"></Icon>}
      </div>
    </div>
  );
};
export default ViewQuestionComponent;
