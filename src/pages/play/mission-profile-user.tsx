import React, { useState } from "react";
import { Button, Icon, Page, Text, useNavigate } from "zmp-ui";
import Container from "../../components/view/container";
import TextComponent from "../../components/text/text";
import { AppFont } from "../../constants/app-font";
import ButtonCompeted from "../../components/button/button-competed";
import {
  gameColorSelector,
  gameImageBackgroundSelector,
} from "../../states/selectors/GameEditSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  getInstructionColor,
  getPrimaryColor,
  getSecondaryColor,
} from "../../utils/getColor";
import { appFontSize } from "../../constants/appFontSizes";
import Instruction from "../../components/text/instruction";
import ButtonMyFile from "../../components/button/btn-myfile";
import { Navigate } from "react-router";
import {
  gameColorPlaySelector,
  gameImageBackgroundPlaySelector,
} from "../../states/selectors/GamePlaySelector";
import {
  UserJoinDeeplinkShareSelector,
  UserJoinLuckyNumberSelector,
} from "../../states/selectors/UserJoinPlaySelector";
import TaskUserList from "../../components/list/task-user-list";
import { AppFlowType } from "../../constants/AppFlowType";
import { UserTaskPlaySelector } from "../../states/selectors/UserJoinTaskPlaySelector";
import { TaskListPLaySelector } from "../../states/selectors/TaskListPlaySelector";
import { ScreenFlowSelector } from "../../states/selectors/ScreenFlowSelector";
import { followOA, openShareSheet } from "zmp-sdk";
import { UserTask } from "../../models/UserTask";
import { Task } from "../../models/Task";
import { AppMissionTag } from "../../constants/AppMissionTag";

const MissionProfileUser = () => {
  const navigate = useNavigate();

  const backgroundImageCampain = useRecoilValue(
    gameImageBackgroundPlaySelector
  );
  const luckyNumber = useRecoilValue(UserJoinLuckyNumberSelector);

  const color: string = useRecoilValue(gameColorPlaySelector);
  const [primaryColorCampain, setPrimaryColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(
    getSecondaryColor(color)
  );
  const [instructionColorCampain, setInstructionColorCampain] = useState(
    getInstructionColor(color)
  );
  const typeScreen = useRecoilValue(ScreenFlowSelector);
  const missionList = useRecoilValue(TaskListPLaySelector);
  const userTaskList = useRecoilValue(UserTaskPlaySelector);
  const userJoinDeepLink = useRecoilValue(UserJoinDeeplinkShareSelector);

  const changeToMenu = () => {
    navigate("/campain-menu", {
      replace: true,
      direction: "backward",
    });
  };

  const followOAZamiga = async (mission: UserTask | Task) => {
    try {
      await followOA({
        id: mission.oaId,
      }).then((result) => {
        if (typeScreen === AppFlowType.DRAFT) {
          //Gọi Api Gửi idByOA và cập nhật nhiệm vụ hoàn thành
        }
      });
    } catch (error) {}
  };

  const followOABranch = async (mission: UserTask | Task) => {
    try {
      await followOA({
        id: mission.oaId,
      }).then((result) => {
        if (typeScreen === AppFlowType.PLAY) {
          //Gọi Api Gửi cập nhật nhiệm vụ hoàn thành
        }
      });
    } catch (error) {}
  };

  const shareDeepLink = async (mission: UserTask | Task) => {
    openShareSheet({
      type: "link",
      data: {
        link: userJoinDeepLink,
        chatOnly: false,
      },
      success: (data) => {},
      fail: (err) => {},
    });
  };

  const onClickMission = (mission: UserTask | Task, index: number) => {
    switch (mission.type) {
      case AppMissionTag.SHARE:
        shareDeepLink(mission);
        break;
      case AppMissionTag.FOLLOW_OA:
        followOABranch(mission);
        break;
      case AppMissionTag.FOLLOW_OA_ZAMIGA:
        followOAZamiga(mission);
        break;
      default:
        break;
    }
  };

  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container
        iconColor={primaryColorCampain}
        center={true}
        showHeader={true}
        onBack={changeToMenu}
      >
        <TextComponent
          color={secondaryColorCampain}
          fontSize={appFontSize.mainTitle + "px"}
          font={AppFont.BagelFatOne}
          title="Hồ sơ của tôi"
          colorStroke={`6px ${primaryColorCampain}`}
        />
        <Instruction
          text="Số may mắn của bạn"
          color={primaryColorCampain}
          fontFamily={AppFont.QuicksanBold}
        />
        <TextComponent
          title={luckyNumber}
          color="red"
          fontSize="35px"
          font={AppFont.BagelFatOne}
          fontWeight="bold"
          boderRadius={appFontSize.mainTitle + "px"}
          background={secondaryColorCampain}
          padding="3px 10px"
        />
        <Instruction
          text="Tiến trình nhiệm vụ"
          color={primaryColorCampain}
          fontFamily={AppFont.QuicksanBold}
        />
        <TaskUserList
          userTaskList={
            typeScreen === AppFlowType.PLAY ? userTaskList : missionList
          }
          primaryColorCampain={primaryColorCampain}
          secondaryColorCampain={secondaryColorCampain}
          onClickMission={onClickMission}
        />
        <Instruction
          text="Gần xong rồi còn một chút nữa thôi"
          fontWeight="bold"
          color={instructionColorCampain}
        />
      </Container>
    </Page>
  );
};

export default MissionProfileUser;
