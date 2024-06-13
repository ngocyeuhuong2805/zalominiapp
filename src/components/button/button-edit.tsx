import { faCog, faCogs, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { appColors } from "../../constants/appColors";

interface Props {
  onClick?: () => void;
  color?: string;
  background?: string;
  icon?:string;
}

const ButtonEdit = (props: Props) => {
  const { onClick, color = "#000000", background = appColors.primary, icon } = props;

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: background }}
      className="hover:opacity-70 mt-5 rounded-l-[30px] p-1 flex flex-row absolute top-10 right-0 hover:pr-5">
      <FontAwesomeIcon icon={faCog} className="self-center m-3" color={color} size="lg" />
    </div>
  );
};

export default ButtonEdit;