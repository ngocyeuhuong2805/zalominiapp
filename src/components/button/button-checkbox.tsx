import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "zmp-ui";
import { AppFont } from "../../constants/app-font";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";

interface Props {
  title: string;
  onClick?: () => void;
  color?: string;
  background?: string;
  iconLeft?: any; // Change type to IconProp
  iconRight?: any; 
  width?: string
  // Change type to IconProp
}

const ButtonCheck= (props: Props) => {
  const { title, onClick, color, background, iconLeft, iconRight,width} = props;
  const className = `hover:opacity-70 ${width}`

  return (
    <Button
      onClick={onClick}
      className={className}
      style={{
        backgroundColor: background ? background : appColors.primary, fontFamily: AppFont.QuicksanRegular, fontWeight: 'bold', fontSize: appFontSize.small,
        color: color
      }}
      variant="primary"
    >
     <div className="gap-2 flex">
        {iconLeft && <FontAwesomeIcon icon={iconLeft} color={color} />} {title} {iconRight && <FontAwesomeIcon icon={iconRight} color={color} />}
      </div>
    </Button>
  );
};

export default ButtonCheck;
