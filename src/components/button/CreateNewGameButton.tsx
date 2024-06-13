import * as React from "react";
import { Button } from "zmp-ui";
import { AppFont } from "../../constants/app-font";
import { appFontSize } from "../../constants/appFontSizes";
import { appColors } from "../../constants/appColors";

export interface ICreateNewGameButtonProps {
  title: string;
  onClick?: () => void;
  color?: string;
  background?: string;
  hidden?: boolean;
}

export default function CreateNewGameButton(props: ICreateNewGameButtonProps) {
  const { title, onClick, color, background, hidden } = props;
  return (
    <div className="flex items-center justify-center relative">
      <div
        className="absolute h-3 w-screen"
        style={{ backgroundColor: color ? color : appColors.secondary }}
      ></div>

      <button
        className={`text-3xl w-60 h-16 rounded-full z-10 hover:opacity-100
                bg-blue-500 text-white shadow-md
                transform transition-transform duration-300 ease-in-out
                hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm`}
        onClick={onClick}
        style={{
          backgroundColor: background ? background : appColors.primary,
          fontFamily: AppFont.QuicksanRegular,
          color: color ? color : appColors.secondary,
          fontWeight: "bold",
          fontSize: appFontSize.normal,
        }}
      >
        {title}
      </button>
    </div>
  );
}
