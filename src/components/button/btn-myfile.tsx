import React from "react";
import { Button } from "zmp-ui";
import { AppFont } from "../../constants/app-font";

interface Props {
  color?: string;
  background?: string;
  font?: string;
  fontSize?: string;
  style?: React.CSSProperties;
  stroke?: string;
  colorStroke?: string;
  titleButton?: string;
  titleText?: any;
  titleIcon?:any;
}

const ButtonMyFile = (props: Props) => {
  const {color, background, font, fontSize, titleButton, titleText, titleIcon } = props;

  return (
    <div className="relative">
      <Button
        className=""
        style={{
          background: background,
          fontFamily: font,
          width: '300px',
          display: 'flex',
          fontSize: fontSize,
          alignItems: 'center',
          justifyContent: 'between',
          position: 'relative'
        }}
      >
        {titleButton}
      </Button>
      <div
        className="absolute flex"
        style={{
          width: '10%',
          bottom: '29%',
          color: color,
          right: '8%',
          fontFamily: font,
          fontSize: '15px',
          alignItems: 'center',
        }}
      >
        {titleText}
      </div>
    </div>
  );
};

export default ButtonMyFile;
