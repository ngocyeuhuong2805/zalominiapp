import { faCircleInfo, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { appColors } from "../../constants/appColors";

interface Props {
  onClick?: () => void;
  color: string;
}

const ButtonInfo = (props: Props) => {
  const { onClick, color = "#D3D3D3" } = props;
  const classNameTailwind = `absolute right-2 bottom-2 cursor-pointer hover:opacity-50 z-10`;

  return (
    <div className={classNameTailwind} onClick={onClick}>
      <FontAwesomeIcon icon={faCircleInfo} size={'xl'} color={color} />
    </div>
  );
};

export default ButtonInfo;
