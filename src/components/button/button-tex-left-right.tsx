import * as React from "react";
import { Button } from "zmp-ui";
import { appColors } from "../../constants/appColors";
import { AppFont } from "../../constants/app-font";
import { appFontSize } from "../../constants/appFontSizes";

export interface IButtonTexLeftProps {
  title: string;
  onClick?: () => void;
  color?: string;
  background?: string;
  textLeft?: string; // Change type to IconProp
  textRight?: string;
  numberPeople?: string; //
  width?: string

}

export default function ButtonTexLeft(props: IButtonTexLeftProps) {
  const {
    title,
    onClick,
    color,
    background,
    textLeft,
    textRight,
    numberPeople,
    width
  } = props;
  const className = `hover:opacity-70 ${width}`
  return (
    <div>
      <Button
        onClick={onClick}
        className={className}
        style={{
          backgroundColor: background ? background : appColors.primary,
          fontFamily: AppFont.QuicksanRegular,
          fontWeight: "bold",
          fontSize: appFontSize.small,
          color: color,
        }}
        variant="primary"
      >
        <div className="gap-2 flex">
          {textLeft && (
            <span>
              {textLeft}
              {numberPeople}
            </span>
          )}
          {title}{" "}
          {textRight && (
            <span>
              {textRight}
              {numberPeople}
            </span>
          )}
        </div>
      </Button>
    </div>
  );
}
