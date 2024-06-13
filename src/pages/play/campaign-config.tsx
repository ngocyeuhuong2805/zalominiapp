import React, { useEffect, useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import ButtonCompeted from "../../components/button/button-competed";
import Container from "../../components/view/container";
import { appColors } from "../../constants/appColors";
import TextComponent from "../../components/text/text";
import { appFontSize } from "../../constants/appFontSizes";
import { AppFont } from "../../constants/app-font";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  gameColorSelector,
  gameEditSelector,
  gameImageBackgroundSelector,
} from "../../states/selectors/GameEditSelector";
import {
  gameColorPlaySelector,
  gamePlaySelector,
} from "../../states/selectors/GamePlaySelector";
import { getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import { QuestionListEditSelector } from "../../states/selectors/QuestionListEditSelector";
import { QuestionListPlaySelector } from "../../states/selectors/QuestionListPlaySelector";
import { PrizeAddListEditSelector } from "../../states/selectors/PrizeListEditSelector";
import { PrizeAddListPlaySelector } from "../../states/selectors/PrizeListPlaySelector";
import { TaskListEditSelector } from "../../states/selectors/TaskListEditSelector";
import { TaskListPLaySelector } from "../../states/selectors/TaskListPlaySelector";
import { ScreenFlowSelector } from "../../states/selectors/ScreenFlowSelector";
import { AppFlowType } from "../../constants/AppFlowType";

const CampaignConfig = () => {
  const navigate = useNavigate();
  const [gameInstantEdit, setGameInstantEdit] =
    useRecoilState(gameEditSelector);
  const [gameInstantPlay, setGameInstantPlay] =
    useRecoilState(gamePlaySelector);
  const [questionsEdit, setQuestionsEdit] = useRecoilState(
    QuestionListEditSelector
  );
  const [questionsPlay, setQuestionsPlay] = useRecoilState(
    QuestionListPlaySelector
  );
  const [prizeEdit, setPrizeEdit] = useRecoilState(PrizeAddListEditSelector);
  const [prizePlay, setPrizePlay] = useRecoilState(PrizeAddListPlaySelector);
  const [taskEdit, setTaskEdit] = useRecoilState(TaskListEditSelector);
  const [taskPLay, setTaskPlay] = useRecoilState(TaskListPLaySelector);
  //use recoil
  const [color, setColor] = useRecoilState<string>(gameColorSelector);
  const [backgroundImageCampain, setBackgroundImageCampain] = useRecoilState(
    gameImageBackgroundSelector
  );
  const [primaryColorCampain, setPrimaryColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(
    getSecondaryColor(color)
  );
  const type = useRecoilValue(ScreenFlowSelector);

  useEffect(() => {
    //Lấy từ bên game play
  }, []);

  const onChangeEditLogo = () => {
    navigate("/create-logo");
  };

  const onChangeEditTitle = () => {
    navigate("/create-title");
  };

  const onChangeEditTheme = () => {
    navigate("/create-theme");
  };

  const onChangeRuleDesc = () => {
    navigate("/create-rule");
  };

  const onChangeMission = () => {
    navigate("/create-missions");
  };

  const onChangeQuestion = () => {
    navigate("/create-questions");
  };

  const moveToEndSetting = () => {
    //Load lại game play mới vào edit để test
    setGameInstantPlay(gameInstantEdit);
    setQuestionsPlay(questionsEdit);
    setPrizePlay(prizeEdit);
    setTaskPlay(taskEdit);

    navigate("/end-setting", {
      replace: true,
      direction: "forward",
    });
  };

  const onChangeConfirm = () => {
    switch (type) {
      case AppFlowType.DRAFT:
        // Gọi Api detail draft
        moveToEndSetting();
        break;
      case AppFlowType.REVIEW:
      case AppFlowType.PLAY:
      default:
        navigate("/campain-menu", {
          replace: true,
          direction: "backward",
        });
        break;
    }
  };

  const onBack = () => {
    //Clear game instant Edit

    navigate("/campain-menu", {
      replace: true,
      direction: "backward",
    });
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
        onBack={onBack}
      >
        <TextComponent
          title={"Cấu hình nâng cao"}
          color={secondaryColorCampain}
          colorStroke={`8px  ${primaryColorCampain}`}
          fontSize={appFontSize.mainTitle + "px"}
          font={AppFont.BagelFatOne}
        />
        <ButtonCompeted
          title={"Ảnh logo"}
          onClick={onChangeEditLogo}
          background={primaryColorCampain}
          color={secondaryColorCampain}
          width={"w-64"}
        />
        <ButtonCompeted
          title={"Ảnh chủ đề"}
          onClick={onChangeEditTheme}
          background={primaryColorCampain}
          color={secondaryColorCampain}
          width={"w-64"}
        />
        <ButtonCompeted
          title={"Tên chương trình"}
          onClick={onChangeEditTitle}
          background={primaryColorCampain}
          color={secondaryColorCampain}
          width={"w-64"}
        />
        <ButtonCompeted
          title={"Thể lệ giải thưởng"}
          onClick={onChangeRuleDesc}
          background={primaryColorCampain}
          color={secondaryColorCampain}
          width={"w-64"}
        />
        <ButtonCompeted
          title={"Nhiệm vụ"}
          onClick={onChangeMission}
          background={primaryColorCampain}
          color={secondaryColorCampain}
          width={"w-64"}
        />
        <ButtonCompeted
          title={"Câu hỏi"}
          onClick={onChangeQuestion}
          background={primaryColorCampain}
          color={secondaryColorCampain}
          width={"w-64"}
        />
        <ButtonCompeted
          title={"Xác nhận"}
          onClick={onChangeConfirm}
          background={primaryColorCampain}
          color={secondaryColorCampain}
        />
      </Container>
    </Page>
  );
};

export default CampaignConfig;
