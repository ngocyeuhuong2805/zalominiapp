import React from "react";
import { Icon } from "zmp-ui";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";
import { appIcon } from "../../constants/appIcon";
import styled from "styled-components";
import { AppFont } from "../../constants/app-font";
import { value } from "zmp-framework/types/dom";

interface Props {
  index?: number;
  placeholder?: string;
  color?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  fontSize?: string;
  fontFamily: string;
  isIcon?: boolean;
}

const StyledIcon = styled(Icon) <{ color: string }>`
  color: ${(props) => props.color};
`;

const TextQuestion: React.FC<Props> = ({
  index,
  color = appColors.primary,
  fontSize = appFontSize.normal,
  fontFamily = AppFont.QuicksanRegular,
  value,
  isIcon = true,
}) => {
  const style = {
    color,
    fontSize,
    fontFamily,
    lineHeight: "1",
  };
  return (
    <div className="flex item-start">
      <div className="w-[320px] flex justify-between gap-3">
      <span
        className="overflow-hidden whitespace-normal break-words pb-2"
        style={{
          ...style,
          fontWeight: "bold",
          textShadow:
            "1px 1px 0 #ffffe6, -1px -1px 0 #ffffe6, 1px -1px 0 #ffffe6, -1px 1px 0 #ffffe6",
        }}
      >
        {index }. Câu hỏi: {value}
      </span>
      {isIcon && (
        <StyledIcon
          className=" hover:opacity-70"
          icon="zi-edit-solid"
          size={appIcon.normal}
          color={color}
        />
      )}
      </div>
   
  
    </div>
  );
};

export default TextQuestion;
