import React, { useEffect, useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import Container from "../../components/view/container";
import TextComponent from "../../components/text/text";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";
import ButtonStart from "../../components/button/btn-start";
import ButtonCompeted from "../../components/button/button-competed";
import { faAdd, faCab, faGift, faL } from "@fortawesome/free-solid-svg-icons";
import { AppFont } from "../../constants/app-font";
import ButtonEdit from "../../components/button/button-edit";
import { gameEditSelector } from "../../states/selectors/GameEditSelector";
import { getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import {
  gameColorPlaySelector,
  gameImageBackgroundPlaySelector,
  gameImageBrandPlaySelector,
  gameInstantNamePlaySelector,
  gamePlaySelector,
} from "../../states/selectors/GamePlaySelector";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { QuestionListPlaySelector } from "../../states/selectors/QuestionListPlaySelector";
import { QuestionListEditSelector } from "../../states/selectors/QuestionListEditSelector";
import { PrizeAddListEditSelector } from "../../states/selectors/PrizeListEditSelector";
import { PrizeAddListPlaySelector } from "../../states/selectors/PrizeListPlaySelector";
import ImageViewCustom from "../../components/header/image-view";
import { TaskListPLaySelector } from "../../states/selectors/TaskListPlaySelector";
import { TaskListEditSelector } from "../../states/selectors/TaskListEditSelector";
import { UserAnswerPlayAtom } from "../../states/atoms/UserAnswerPlayAtom";
import { UserLoginIdSelector } from "../../states/selectors/UserLoginSelector";
import {
  UserAnswerCreateEmptyListSelector,
  UserAnswerSelector,
} from "../../states/selectors/UserJoinAnswerPlaySelector";
import { UserJoinSelector } from "../../states/selectors/UserJoinPlaySelector";
import { getToday } from "../../utils/getDate";
import { ScreenFlowSelector } from "../../states/selectors/ScreenFlowSelector";
import { AppFlowType } from "../../constants/AppFlowType";
import ApiNetWork from "../../networks/ApiConFig";
import { message } from "antd";
import ConfirmModal from "../../components/modals/confirm-modal";
import CreateNewGameButton from "../../components/button/CreateNewGameButton";

const CampainMenu = () => {
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
  const [userJoin, setUserJoin] = useRecoilState(UserJoinSelector);

  const [visibility, setVisibility] = useState(false);
  const userId = useRecoilValue(UserLoginIdSelector);

  const [answerList, setAnswerList] = useRecoilState(UserAnswerSelector);
  const emptyList = useRecoilValue(UserAnswerCreateEmptyListSelector);
  const idUser = useRecoilValue(UserLoginIdSelector);

  const LogoImageCampain: string = useRecoilValue(gameImageBrandPlaySelector);
  const backgroundImageCampain = useRecoilValue(
    gameImageBackgroundPlaySelector || "images/background-main-app.jpg"
  );
  const titleCampain = useRecoilValue(gameInstantNamePlaySelector);
  const color: string = useRecoilValue(gameColorPlaySelector);
  const [primaryColorCampain, setMainColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setTextColorCampain] = useState(
    getSecondaryColor(color)
  );

  const type = useRecoilValue(ScreenFlowSelector);

  useEffect(() => {
    // setShowEdit(userId === gameInstantPlay.createdBy)
  });

  const onChangeRuleScreen = () => {
    navigate("/campaign-rule");
  };

  const onChangeResultScreen = () => {
    let closeDate = gameInstantPlay.closeTime.split("T")[0];
    let date = getToday();
    if (closeDate < date) {
      navigate("/campaign-ranking");
    } else {
      navigate("/mission-profile-user");
    }
  };

  const onChangeAwardScreen = () => {
    navigate("/campaign-gift-list");
  };

  const onChangeCreateGame = () => {
    setVisibility(true);
    // navigate("/campain-splash?&type=draft");
  };
  const onConfirmModal = () => {
    // navigate("/campain-splash?&type=draft");
    apiCreate();
  };

  const onChangePlayScreen = () => {
    setAnswerList(emptyList);
    navigate("/play-choices/1");
  };

  const onChangeEditScreen = () => {
    setGameInstantEdit(gameInstantPlay);
    setQuestionsEdit(questionsPlay);
    setPrizeEdit(prizePlay);
    setTaskEdit(taskPLay);
    navigate("/campaign-config");
  };

  const onChangeMenu = () => {
    navigate("/welcome", {
      replace: true,
      direction: "backward",
    });
  };

  const apiCreate = async () => {
    setVisibility(false);
    try {
      const result: any = await ApiNetWork.HandleCallApi(
        `/GameInstant/CreateNewGameInstant`,
        {
          createdBy: idUser,
          gameSampleId: gameInstantPlay.idGameInstant,
        },
        "post"
      );
      if (result.success === true) {
        navigate(
          `/campain-splash?&imageBackgroundCampaign=${result?.data.configGame.imageBackGroundCampaign}&imageBranch=${result.data.brandImage.url}&idGameInstant=${result.data._id}&type=draft&refCode=G0X8ncp7z`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page
      className="container-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container
        iconColor={primaryColorCampain}
        center={false}
        showHeader={true}
        onBack={onChangeMenu}
      >
        <ImageViewCustom
          src={LogoImageCampain}
          showBackdrop={true}
          width={160}
          height={160}
        />
        {type !== AppFlowType.PLAY && (
          <ButtonEdit
            color={secondaryColorCampain}
            onClick={onChangeEditScreen}
            background={primaryColorCampain}
          />
        )}
        <TextComponent
          title={titleCampain}
          color={appColors.secondary}
          colorStroke={"8px " + primaryColorCampain}
          fontSize={appFontSize.mainTitle + "px"}
          font={AppFont.BagelFatOne}
        />
        <ButtonStart
          title={"Bắt đầu"}
          onClick={onChangePlayScreen}
          background={primaryColorCampain}
          color={secondaryColorCampain}
          fontFamily={AppFont.SfusouvenirBold}
        />
        <ButtonCompeted
          title={"Thể lệ"}
          onClick={onChangeRuleScreen}
          background={primaryColorCampain}
          color={secondaryColorCampain}
        />
        <ButtonCompeted
          title={"Kết quả"}
          onClick={onChangeResultScreen}
          background={primaryColorCampain}
          color={secondaryColorCampain}
        />
        <ButtonCompeted
          title={"Nhiệm vụ nhận thưởng"}
          onClick={onChangeAwardScreen}
          background={primaryColorCampain}
          color={secondaryColorCampain}
          iconLeft={faGift}
        />
        {type === AppFlowType.REVIEW && (
          <CreateNewGameButton
            title={"Tạo Mới"}
            onClick={onChangeCreateGame}
            //   background={primaryColorCampain}
            //   color={secondaryColorCampain}
            //   iconLeft={faAdd}
          />
        )}
      </Container>
      <ConfirmModal
        visibility={visibility}
        title="Bạn có chắc muốn tạo game"
        desc={gameInstantPlay.gameInstantName}
        onConfirm={onConfirmModal}
        onClose={() => {
          setVisibility(false);
        }}
      />
    </Page>
  );
};

export default CampainMenu;
