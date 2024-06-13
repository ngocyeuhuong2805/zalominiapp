import React from "react";
import PropTypes from "prop-types";
import { AppMissionTag } from "../../constants/AppMissionTag";
import ButtonShareTask from "../button/task/button-share-task";
import ButtonFollowTask from "../button/task/button-follow-task";
import { UserTask } from "../../models/UserTask";
import { Task } from "../../models/Task";

interface Props {
  userTaskList: UserTask[] | Task[];
  primaryColorCampain: string;
  secondaryColorCampain: string;
  onClickMission: (mission: UserTask | Task, index: number) => void;
}

const TaskUserList: React.FC<Props> = ({
  userTaskList,
  primaryColorCampain,
  secondaryColorCampain,
  onClickMission,
}) => {
  return (
    <div className="overflow-y-auto max-h-60 min-h-20">
      {userTaskList?.map((mission, index) => {
        const buttonProps = {
          color: primaryColorCampain,
          border: primaryColorCampain,
          background: secondaryColorCampain,
          valueUser: mission,
          onClick: () => onClickMission(mission, index),
        };

        switch (mission.type) {
          case AppMissionTag.SHARE:
            return (
              <div key={index} className="mb-5">
                <ButtonShareTask {...buttonProps} />
              </div>
            );
          case AppMissionTag.FOLLOW_OA:
          case AppMissionTag.FOLLOW_OA_ZAMIGA:
            return (
              <div key={index} className="mb-5">
                <ButtonFollowTask {...buttonProps} />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default TaskUserList;
