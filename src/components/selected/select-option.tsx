import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { appFontSize } from '../../constants/appFontSizes';
import { Button } from "zmp-ui";

interface CustomButtonProps {
  initialLabel: string;
  initialColor: string;
  onClickColor: string;
}

const SelectOption: React.FC<CustomButtonProps> = ({ initialLabel, initialColor, onClickColor }) => {
  const [colorBG, setColorBG] = useState<string>(onClickColor);
  const [colorText, setColorText] = useState<string>(initialColor);

  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setColorBG(!clicked ? initialColor : onClickColor);
    setColorText(!clicked ? onClickColor : initialColor);
    setClicked(!clicked);
  };

  return (
    <Button
      className={`px-4 py-2 rounded-3xl text-white font-semibold transition-colors`}
      style={{ backgroundColor: colorBG, fontSize: appFontSize.small, color: colorText }}
      onClick={handleClick}
    >
      <div className="flex gap-5">
        {initialLabel}
        {clicked ? (
          <FontAwesomeIcon icon={faCircleCheck} color={colorText} />
        ) : (
          <FontAwesomeIcon icon={faCircle} color={"#f1f1f1"} />
        )}
      </div>
    </Button>
  );
};

export default SelectOption;
