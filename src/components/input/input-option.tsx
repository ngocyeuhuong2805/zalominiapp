import React, {useState} from "react";
import { appColors } from "../../constants/appColors";
import { on } from "zmp-framework/types/dom";
interface Props {
  placeholder?: string;
  borderColor?: string;
  color?: string;
  background?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  borderWidth?: string;
  borderRadius?: string;
  fontSize?: string;
  lightHeight?: string;
  font?:string;
  style?: React.CSSProperties;
  remove?:boolean;
  onClickDel?: React.MouseEventHandler<HTMLDivElement>;
  onClickNavigate?:React.MouseEventHandler<HTMLDivElement>;
  add?:boolean;
  onClickAdd?: React.MouseEventHandler<HTMLDivElement>;
  colorBorder?:string;
  disabled?:boolean,
  boderColorIcon?:string
}
const InputOption = (props: Props) => {
  const {
    placeholder,
    borderColor,
    color,
    background,
    onChange,
    value,
    borderWidth,
    borderRadius,
    fontSize,
    lightHeight,
    font,
    style,
    remove=false,
    onClickDel,
    onClickNavigate,
    add=false,
    onClickAdd,
    colorBorder,
    disabled=false,
    boderColorIcon
  } = props;

  const inputStyle = {
    borderColor: borderColor || appColors.primary,
    borderWidth: borderWidth || "4px",
    borderRadius: borderRadius || "40px",
    backgroundColor: background || "white",
    color: color || appColors.primary,
    fontSize: fontSize || "24px",
    lineHeight: lightHeight || "32px",
    fontFamily: font,
    ...style // Kết hợp style truyền vào từ props
  };

  return (
    <div className="relative">
          {remove && (
            <div
              onClick={onClickDel}
              className="flex items-center justify-center text-center absolute -left-6 bottom-1 transform translate-x-2/4 -translate-y-2/4 font-bold w-7 h-7 rounded-full"
              style={{
                backgroundColor: background,
                color: color,
                border: `2px solid ${borderColor}`,
              }}
            >
              -
            </div>
          )}
          <div className="w-64 h-16" onClick={onClickNavigate}>
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            className="px-10 w-64 h-16 SfusouvenirBold font-bold text-center focus:outline-none"
            style={inputStyle}    
            onChange={onChange}
            disabled={disabled}
          />
          </div>

          {add && (
            <div
              onClick={onClickAdd}
              className="flex items-center justify-center text-center absolute right-1 bottom-1 transform translate-x-2/4 -translate-y-2/4 font-bold w-7 h-7 rounded-full"
              style={{
                backgroundColor: background,
                color: color,
                border: `2px solid ${borderColor}`,
              }}
            >
              +
            </div>
          )}
        </div>
  );
};

export default InputOption;

