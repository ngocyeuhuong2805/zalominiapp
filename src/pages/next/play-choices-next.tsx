import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Icon, Page, useSnackbar } from "zmp-ui";
import Container from "../../components/view/container";
import TextComponent from "../../components/text/text";
import { appFontSize } from "../../constants/appFontSizes";
import { appColors } from "../../constants/appColors";
import TextQuestion from "../../components/text/text-question";
import { AppFont } from "../../constants/app-font";
import ViewQuestionComponent from "../../components/view/view-question";
import ButtonCompeted from "../../components/button/button-competed";
import {
  QuestionByOrderSelector,
  QuestionListPlayLengthSelector,
  QuestionListPlaySelector,
  QuestionPlaySelector,
} from "../../states/selectors/QuestionListPlaySelector";
import {
  gameColorSelector,
  gameEditNameSelector,
  gameImageBackgroundSelector,
} from "../../states/selectors/GameEditSelector";
import {
  getInstructionColor,
  getPrimaryColor,
  getSecondaryColor,
} from "../../utils/getColor";
import {
  gameCloseTimePlaySelector,
  gameColorPlaySelector,
  gameImageBackgroundPlaySelector,
  gameImageBrandPlaySelector,
  gameInstantNamePlaySelector,
} from "../../states/selectors/GamePlaySelector";
import ModalInfo from "../../components/modals/info-modal";
import ConfirmModal from "../../components/modals/confirm-modal";
import ImageViewCustom from "../../components/header/image-view";
import { UserSubmitAnswer } from "../../states/selectors/UserJoinAnswerPlaySelector";

const PlayChoiceNext = () => {
  const navigate: any = useNavigate();
  const { openSnackbar } = useSnackbar();
  const LogoImageCampain: string = useRecoilValue(gameImageBrandPlaySelector);
  const backgroundImageCampain = useRecoilValue(
    gameImageBackgroundPlaySelector
  );
  const titleCampain = useRecoilValue(gameInstantNamePlaySelector);
  const color: string = useRecoilValue(gameColorPlaySelector);
  const [primaryColorCampain, setMainColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setTextColorCampain] = useState(
    getSecondaryColor(color)
  );

  const [modalVisible, setModalVisible] = useState(false);
  const { index } = useParams<{ index: string }>();
  const indexParams = parseInt(index || "");
  const [submitAnswer, setSubmitAnswer] = useRecoilState(
    UserSubmitAnswer(indexParams)
  );
  const titleGame = useRecoilValue(gameEditNameSelector);
  const questionPlay = useRecoilValue(QuestionByOrderSelector(indexParams));
  const questionLength = useRecoilValue(QuestionListPlayLengthSelector);
  const [theme, setTheme] = useState<string | undefined>("");
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number>(-1);
  const [indexPlan, setIndexPlan] = useState<number>();
  const [plansTrue, setPlansTrue] = useState<any>();

  const handleSelectPlan = (item: string, index: number) => {
    setIndexPlan(index + 1);
    setPlansTrue(item);
    setTheme(questionPlay?.plans[index]);
    setSelectedChoiceIndex(index);
  };

  useEffect(() => {}, []);

  const validate = () => {
    if (!plansTrue) {
      openSnackbar({
        text: "Vui lòng chọn đáp án",
        type: "error",
      });
      return false; // Return false to indicate validation failure
    }
    return true; // Return true if validation passes
  };

  const handleSuccess = () => {
    if (!validate()) {
      // Handle validation failure here, e.g., show an error message
      return;
    }
    setSubmitAnswer(plansTrue);
    if (indexParams + 1 <= questionLength) {
      navigate(`/play-choices/${indexParams + 1}`);
    } else {
      navigate("/play-result");
    }
  };
  const handelBack = () => {
    setModalVisible(true);
  };

  const handelConfirmModal = () => {
    setModalVisible(false);
    navigate("/campain-menu");
  };
  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
      key={indexParams}
    >
      <Container
        center={true}
        showHeader={true}
        onBack={() => {
          handelBack();
        }}
      >
        <TextComponent
          title={titleGame}
          fontSize={appFontSize.mainTitle + "px"}
          color={"#FFFFFF"}
          font={"BagelFatOne"}
          colorStroke={"10px" + primaryColorCampain}
        />
        <ImageViewCustom
          src={questionPlay?.url}
          showBackdrop={true}
          width={340}
          height={185}
        />
        <TextQuestion
          index={parseInt(index || "undefine")}
          value={questionPlay?.questionText || ""}
          fontFamily={AppFont.SfusouvenirBold}
          isIcon={false}
          color={primaryColorCampain}
        />
        <div className="grid grid-cols-2 grid-rows-2 gap-2">
          {questionPlay?.plans.map((item, index) => (
            <ViewQuestionComponent
              key={index}
              title={item}
              isIcon={false}
              onclick={() => handleSelectPlan(item, index)}
              colorText={
                selectedChoiceIndex === index
                  ? secondaryColorCampain
                  : appColors.primary
              }
              colorGame={
                selectedChoiceIndex === index
                  ? primaryColorCampain
                  : appColors.secondary
              }
              borderColor={primaryColorCampain}
            />
          ))}
        </div>
        <ButtonCompeted
          title="Xong"
          onClick={() => {
            handleSuccess();
          }}
          background={primaryColorCampain}
          color={secondaryColorCampain}
        />
      </Container>
      <ConfirmModal
        title="bạn có muốn thoát trò chơi"
        desc="Toàn bộ kết quả sẽ bị xoá"
        onClose={() => {
          setModalVisible(false);
        }}
        visibility={modalVisible}
        onConfirm={() => {
          handelConfirmModal();
        }}
      ></ConfirmModal>
    </Page>
  );
};

export default PlayChoiceNext;
