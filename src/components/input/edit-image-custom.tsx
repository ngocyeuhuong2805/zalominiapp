import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { appColors } from "../../constants/appColors";
import ButtonInfo from "../button/button-info";
import ImageViewCustom from "../header/image-view";

interface EditImageProps {
  color?: string;
  onClick?: () => void;
  onInfoClick?: () => void;
  src: string;
  width: number;
  height: number;
}

const EditImageCustom: React.FC<EditImageProps> = ({
  onClick,
  onInfoClick,
  color = appColors.primary,
  src,
  width = 160,
  height,
}) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        border: "solid 5px",
        borderColor: color,
        padding: 5,
        position: "relative",
      }}
      className="rounded-md cursor-pointer"
    >
      <ImageViewCustom src={src} width={width} height={height}/>
      <div
        onClick={onClick}
        className="absolute top-1 l-0 z-10 hover:text-gray-400 text-transparent text-center"
        style={{ height: height - 30 + "px", width: width + "px" }}
      ></div>
      {onInfoClick && <ButtonInfo color={color} onClick={onInfoClick} />}
    </div>
  );
};

export default EditImageCustom;
