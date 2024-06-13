import React from "react";
import { Icon } from "zmp-ui";
import styled from "styled-components";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";
import { appIcon } from "../../constants/appIcon";
import { AppFont } from "../../constants/app-font";
import ButtonInfo from "../button/button-info";
import ImageViewCustom from "../header/image-view";

interface EditImageProps {
  color?: string;
  onClick?: () => void;
  onInfoClick?: () => void;
  src: string;
}

const EditLogoImage: React.FC<EditImageProps> = ({
  onClick,
  onInfoClick,
  color = appColors.primary,
  src,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "solid 5px",
        borderColor: color,
        padding: 5,
        position: "relative",
      }}
      className="rounded-md cursor-pointer"
    >
      <ImageViewCustom src={src} />
      <ButtonInfo color={color} onClick={onInfoClick} />
    </div>
  );
};

export default EditLogoImage;
