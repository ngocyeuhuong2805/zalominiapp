import {
  faCheck,
  faCircle,
  faCircleCheck,
  faCircleDot,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { val, value } from "zmp-dom";
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

const ButtonFollowTask = (props: Props) => {
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

  const classNameDiv = `flex justify-center items-center ${width} border-4 rounded-full min-${width} min-h-16 max-h-48 cursor-pointer`;
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
        <span className="w-9 ml-5">
          {valueUser.status === TaskStatus.UnDone ? (
            <FontAwesomeIcon icon={faCircleDot} color={border} />
          ) : valueUser.status === TaskStatus.InProcess ? (
            <FontAwesomeIcon icon={faSpinner} color={border} />
          ) : valueUser.status === TaskStatus.Done ? (
            <FontAwesomeIcon icon={faCircleCheck} color={border} />
          ) : null}
        </span>
      ) : (
        <span className="w-9 ml-5">
          <FontAwesomeIcon icon={faSpinner} color={border} />
        </span>
      )}
    </div>
  );
};

export default ButtonFollowTask;
