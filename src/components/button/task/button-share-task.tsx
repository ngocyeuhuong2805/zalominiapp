import { faCheck, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Text } from "zmp-ui";
import { AppFont } from "../../../constants/app-font";
import { appColors } from "../../../constants/appColors";
import { appFontSize } from "../../../constants/appFontSizes";
import { TaskStatus } from "../../../constants/TaskStatus";
import { Task } from "../../../models/Task";
import { UserTask } from "../../../models/UserTask";
import { isUserTask } from "../../../utils/isUserTask";

interface Props {
  color?: string;
  fontSize?: string;
  font?: string;
  border?: string;
  background?: string;
  width?: string;
  onClick?: () => void;
  valueUser: UserTask | Task;
}

const ButtonShareTask = (props: Props) => {
  const {
    color = appColors.secondary,
    fontSize = appFontSize.small,
    font = AppFont.QuicksanSemibold,
    border = appColors.primary,
    background = appColors.secondary,
    width = "w-72",
    onClick,
    valueUser,
  } = props;

  const classNameDiv = `flex justify-center items-center ${width} border-4 rounded-full min-${width} min-h-16 max-h-48`;
  const borderColorStyle = { borderColor: border };
  const backgroundColorStyle = { backgroundColor: background };
  const fontColorStyle = { color: color };
  const fontStyle = { fontFamily: font, fontSize: fontSize };

  return (
    <div
      className={classNameDiv}
      onClick={onClick}
      style={{ ...borderColorStyle, ...backgroundColorStyle }}
    >
      <span
        style={{ ...fontColorStyle, ...fontStyle }}
        className="flex flex-grow break-keep text-wrap m-4"
      >
        {valueUser.title}
      </span>
      {isUserTask(valueUser) ? (
        <span className="max-w-24 ml-5 self-center p-2 break-keep">
          <span
            style={{
              ...fontColorStyle,
              fontFamily: AppFont.QuicksanMedium,
              fontSize: appFontSize.tiny,
            }}
          >
            {valueUser.curentQuantity}/{valueUser.quantityRequire}
          </span>
          {/* {valueUser.status === TaskStatus.UnDone ? (
          ) : (
          )} */}
        </span>
      ) : (
        <span className="max-w-24 self-center p-2 break-keep">
          <span
            style={{
              ...fontColorStyle,
              fontFamily: AppFont.QuicksanMedium,
              fontSize: appFontSize.tiny,
            }}
          >
            0/{valueUser.quantityRequire}
          </span>
        </span>
      )}
    </div>
  );
};

export default ButtonShareTask;
