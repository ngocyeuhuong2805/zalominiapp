import React, { useState } from "react";
import { Page, Text, useNavigate } from "zmp-ui";
import Container from "../../components/view/container";
import ButtonCompeted from "../../components/button/button-competed";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameEditNameSelector } from "../../states/selectors/GameEditSelector";
import {
  getInstructionColor,
  getPrimaryColor,
  getSecondaryColor,
} from "../../utils/getColor";
import {
  PrizeAddListPlaySelector,
  PrizeListPlayTitleSelector,
} from "../../states/selectors/PrizeListPlaySelector";
import {
  gameColorPlaySelector,
  gameIdSelector,
  gameImageBackgroundPlaySelector,
} from "../../states/selectors/GamePlaySelector";
import TextTitleApp from "../../components/text/text-title-app";
import TextPrizeComponent from "../../components/text/text-prize";
import Instruction from "../../components/text/instruction";
import ButtonDoMission from "../../components/button/task/button-share-task";
import { TaskListPLaySelector } from "../../states/selectors/TaskListPlaySelector";
import ButtonShareTask from "../../components/button/task/button-share-task";
import { AppMissionTag } from "../../constants/AppMissionTag";
import ButtonFollowTask from "../../components/button/task/button-follow-task";
import { Task } from "../../models/Task";
import { UserTaskPlaySelector } from "../../states/selectors/UserJoinTaskPlaySelector";
import { UserTask } from "../../models/UserTask";
import TaskUserList from "../../components/list/task-user-list";
import { followOA, openShareSheet } from "zmp-sdk";
import { UserJoinDeeplinkShareSelector } from "../../states/selectors/UserJoinPlaySelector";
import { ScreenFlowSelector } from "../../states/selectors/ScreenFlowSelector";
import { AppFlowType } from "../../constants/AppFlowType";

const CampaignGiftListAndMission = () => {
  const [titleCampain, setTitleCampain] = useRecoilState(gameEditNameSelector);
  const backgroundImageCampain = useRecoilValue(
    gameImageBackgroundPlaySelector || "images/background-main-app.jpg"
  );
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
  const prizelist = useRecoilValue(PrizeAddListPlaySelector);
  const missionList = useRecoilValue(TaskListPLaySelector);
  const userTaskList = useRecoilValue(UserTaskPlaySelector);
  const userJoinDeepLink = useRecoilValue(UserJoinDeeplinkShareSelector);
  const type = useRecoilValue(ScreenFlowSelector);

  const navigate = useNavigate();

  const navigateToPrizeDetail = (index: number) => {
    navigate(`/campaign-gift-detail/${index}`);
  };

  const onFinish = () => {
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
        if (type === AppFlowType.DRAFT) {
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
        if (type === AppFlowType.PLAY) {
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
        center={false}
        showHeader={true}
      >
        <TextTitleApp
          titleTop="Giải thưởng"
          titleBottom="Và nhiệm vụ"
          color={secondaryColorCampain}
          strokeColor={primaryColorCampain}
          fontSize={30}
          strokeWidth={10}
          height={"h-28"}
        />

        <Instruction color={primaryColorCampain} text="Cơ cấu giải thưởng" />

        <div className="overflow-y-auto max-h-60 min-h-20">
          {prizelist?.map((prize, index) => (
            <div key={index} className="mb-5">
              <TextPrizeComponent
                title={prize.title}
                color={primaryColorCampain}
                border={primaryColorCampain}
                background={secondaryColorCampain}
                onClick={() => navigateToPrizeDetail(index)}
              />
            </div>
          ))}
        </div>

        <Instruction
          color={primaryColorCampain}
          text="Bấm vào để chọn nhiệm vụ"
        />

        <TaskUserList
          userTaskList={type === AppFlowType.PLAY ? userTaskList : missionList}
          primaryColorCampain={primaryColorCampain}
          secondaryColorCampain={secondaryColorCampain}
          onClickMission={onClickMission}
        />

        <ButtonCompeted
          background={primaryColorCampain}
          color={secondaryColorCampain}
          title="Quay về"
          onClick={onFinish}
        />
      </Container>
    </Page>
  );
};
export default CampaignGiftListAndMission;
