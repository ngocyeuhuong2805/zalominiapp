import React, { ChangeEvent } from 'react';
import { Text } from 'zmp-ui';
import { appColors } from '../../constants/appColors';
import { AppFont } from '../../constants/app-font';

interface Props {
  placeholder?: string;
  title: any;
  width?: string;
  height?: string;
  padding?: string;
  color?: string;
  boderColor?: string;
  fontFamily?: string;
  fontSize?: string;
  font?: string;
  lightHeight?: string;
  fontWeight?: string;
  boder?: string;
  boderRadius?: string;
  background?:string;
  disabled?:boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaRule = (props: Props) => {
  const { placeholder, title, color, width, height, padding, boderColor, fontFamily, fontSize, lightHeight, fontWeight, boder, boderRadius, background, disabled=false, onChange } = props;

  return (
    <textarea
      placeholder={placeholder}
      value={title}
      onChange={onChange}
      style={{
        borderRadius: boderRadius || '40px',
        border: `${boder || '4px'} solid ${boderColor || appColors.primary}`,
        width: width || "270px",
        height: height || "254px",
        padding: padding || '20px',
        color: color || appColors.primary,
        fontFamily: fontFamily || AppFont.SfusouvenirBold,
        fontSize: fontSize || '25px',
        lineHeight: lightHeight || '1.5',
        fontWeight: fontWeight || '700',
        outline: 'none',
        resize: 'none',
        background:background,

      }}
      disabled={disabled}
    />
  );
}

export default TextareaRule;
