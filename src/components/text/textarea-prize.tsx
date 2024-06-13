import React, { ChangeEvent } from 'react';
import { Text } from 'zmp-ui';
import { appColors } from '../../constants/appColors';
import { AppFont } from '../../constants/app-font';

interface Props {
  placeholder?: string;
  title: any;
  width?: string;
  height?: string;
  paddingTop?: number;
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
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?:boolean
}

const TextareaPrize = (props: Props) => {
  const { placeholder, title, color, width, height, paddingTop, boderColor, fontFamily, fontSize, lightHeight, fontWeight, boder, boderRadius, background, onChange, disabled } = props;

  return (
    <textarea
      placeholder={placeholder}
      value={title}
      rows={10}
      disabled = {disabled}
      onChange={onChange}
      style={{
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
        border: `${boder || '4px'} solid ${boderColor || appColors.primary}`,
        width: width || "270px",
        padding: "80px",
        paddingTop: paddingTop,
        color: color || appColors.primary,
        fontFamily: fontFamily || AppFont.QuicksanMedium,
        fontSize: fontSize || '25px',
        lineHeight: lightHeight || '1.5',
        fontWeight: fontWeight || '700',
        outline: 'none',
        resize: 'none',
        overflow: 'hidden',
        background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1),rgba(255, 255, 255, 1),rgba(255, 255, 255, 1))`, // Thiết lập gradient trắng nhạt dần
      }}
    />
  );
}

export default TextareaPrize;
