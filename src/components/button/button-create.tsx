import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "zmp-ui";
import { AppFont } from "../../constants/app-font";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";
import { appIcon } from "../../constants/appIcon";
import StartLeftComponent from "../../static/svg/icons/icon-start-lef";
import StartRightComponent from "../../static/svg/icons/icon-start-right";

interface Props {
  onClick?: () => void;
  color?: string;
  background?: string;
  fontSize?: string;
  title: string;
}

const ButtonCreate = (props: Props) => {
  const { title, onClick, color = "#000000", background = appColors.primary, fontSize = appFontSize.small } = props;

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: background }}
      className="hover:opacity-70 mt-5 rounded-r-[30px] p-1 flex flex-row absolute top-2 left-0">
      <div className="inline self-center ml-3 font-semibold" style={{ color: color, fontSize: fontSize }}>
        {title}
      </div>
      <FontAwesomeIcon icon={faPlus} className="self-center m-3" color={color} size="lg" />
    </div>
  );
};

export default ButtonCreate;