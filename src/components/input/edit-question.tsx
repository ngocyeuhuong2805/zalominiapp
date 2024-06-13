import React from "react";
import { Icon } from "zmp-ui";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";
import { appIcon } from "../../constants/appIcon";
import styled from 'styled-components';
import { AppFont } from "../../constants/app-font";

interface Props {
  index?: number;
  placeholder?: string;
  color?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  fontSize?: string;
  fontFamily?: string;
  colorBorder?:   string;
}

const StyledIcon = styled(Icon) <{ color: string }>`
  color: ${(props) => props.color};
`;

const EditQuestion: React.FC<Props> = ({
  placeholder = "Nhập câu hỏi",
  onChange,
  color = appColors.primary,
  fontSize = appFontSize.normal,
  fontFamily = AppFont.QuicksanRegular,
  value,
  colorBorder
}) => {
  const inputStyle = {
    color,
    fontSize,
    fontFamily: fontFamily,
    outline: "none",
    WebkitBoxShadow: "none",
    MozBoxShadow: "none",
    boxShadow: "none",
    lineHeight: "1",
    borderColor:   colorBorder,
    borderRadius: 20
  };

  return (

      <div className="flex flex-row justify-center place-items-center p-1">
        <textarea
          placeholder={placeholder}
          className="flex bg-transparent overflow-hidden resize-none  border-4 p-2"
          style={inputStyle} // Apply color and font size
          onChange={onChange} // Attach onChange handler
          maxLength={100}
          value={value}
          spellCheck={false}
          rows={4}
        />
      </div>
  );
};

export default EditQuestion;
