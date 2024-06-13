import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Text } from "zmp-ui";
import { AppFont } from "../../constants/app-font";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";

const GameList = ({ games, onGameClick, onDelete, showDelete = false, backgroundColor = appColors.secondary, textColor = appColors.primary }) => {
  return (
    <div className="overflow-y-auto max-h-72 w-full flex flex-col items-center justify-start">
      {games.map((game: any, i: number) => (
        <div key={i} className="flex items-center justify-between w-64 h-16 m-2 relative cursor-pointer">
          <div className='w-64 h-16' onClick={() => onGameClick(i)}>
            <Text
              className="w-full h-full border-4 rounded-full text-center flex items-center justify-center font-bold text-3xl"
              style={{
                borderColor: appColors.primary,
                color: textColor || appColors.primary,
                fontFamily: AppFont.SfusouvenirBold,
                display: "flex",
                fontWeight: "bold",
                fontSize: `${appFontSize.small}px`,
                background: backgroundColor || appColors.secondary,
              }}
            >
              {game.gameInstantName}
            </Text>
          </div>

          {showDelete && (
            <div
              onClick={() => onDelete(game.idGameInstant, i)}
              className="flex items-center justify-center absolute right-2 transform translate-x-1/2 -translate-y-1/2 rounded-full font-bold p-2"
              style={{ backgroundColor: backgroundColor || appColors.secondary, color: textColor || appColors.primary, border: `2px solid ${textColor || appColors.primary}` }}
            >
              <FontAwesomeIcon icon={faClose} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GameList;
