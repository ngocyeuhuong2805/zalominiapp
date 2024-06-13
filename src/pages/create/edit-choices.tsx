import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Icon, Page, useNavigate, useSnackbar } from "zmp-ui";
import { chooseImage } from "zmp-sdk/apis";
import Container from "../../components/view/container";
import TextComponent from "../../components/text/text";
import { appFontSize } from "../../constants/appFontSizes";
import TextQuestion from "../../components/text/text-question";
import { AppFont } from "../../constants/app-font";
import ButtonCompeted from "../../components/button/button-competed";
import ModalCustomComponent from "../../components/modals/modal-custom";
import EditImageCustom from "../../components/input/edit-image-custom";
import ModalInfo from "../../components/modals/info-modal";
import {
  EDIT_ANSWER_QUESTION,
  EDIT_ANSWER_TRUE,
  EDIT_QUESTION_TEXT,
} from "../../components/modals/lable-type";
import NumberQuestions from "../../components/question/number-question";
import {
  QuestionByOrderSelector,
  QuestionListEditSelector,
} from "../../states/selectors/QuestionListEditSelector";
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
import { gamePlaySelector } from "../../states/selectors/GamePlaySelector";
import axios from "axios";
import { Question } from "../../models/Question";
import ApiNetWork from "../../networks/ApiConFig";
import ConfirmModal from "../../components/modals/confirm-modal";
import { mapQuestionApi } from "../../utils/mapping/mapApiQuestion";

const EditChoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const queryParams = new URLSearchParams(location.search);
  const index: string = queryParams.get("index") || '';
  const indexParams = parseInt(index || "");
  const { id } = useParams<{ id: string }>();
  const idParams = parseInt(id || "");
  const gameInstanceId = useRecoilValue(gamePlaySelector).idGameInstant;

  const backgroundImageCampain = useRecoilValue(gameImageBackgroundSelector);
  const color = useRecoilValue(gameColorSelector);
  const primaryColorCampain = getPrimaryColor(color);
  const secondaryColorCampain = getSecondaryColor(color);
  const instructionColorCampain = getInstructionColor(color);

  const [question, setQuestion] = useRecoilState(QuestionByOrderSelector(indexParams));
  console.log("🚀 ~ question:", question)
  const titleGame = useRecoilValue(gameEditNameSelector);
  const [listQuestionEdit, setListQuestionEdit] = useRecoilState(QuestionListEditSelector);
  const [listQuestion, setListQuestion] = useState(listQuestionEdit);

  const [plans, setPlans] = useState<string[]>(question?.plans || []);
  const [logoUrl, setLogoUrl] = useState<any>(question?.url||"");
  const [valueInputAnswer, setValueInputAnswer] = useState("");
  const [valueInputTextQuestion, setValueInputTextQuestion] = useState(
    question?.questionText || ""
  );
  const [selectedItem, setSelectedItem] = useState<number | null>(
    question?.result ? plans.indexOf(question.result) : null
  );
  const [planTrue, setPlanTrue] = useState<string>(question?.result || "");
  const [indexPlan, setIndexPlan] = useState<number>(0);
  const [modalVisibleAnswerTrue, setModalVisibleAnswerTrue] = useState(false);
  const [modalVisibleAnswer, setModalVisibleAnswer] = useState(false);
  const [modalVisibleTitleQuestion, setModalVisibleTextQuestion] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [currentBackground, setcurrentBackground] = useState("");
  const [currentLogo, setCurrentLogo] = useState<any>({});
  const [confirmModalVisibleDelete, setConfirmModalVisible] = useState(false);
  const [currentImage, setCurentImage] = useState('');

  useEffect(() => {
    setCurrentLogo(logoUrl);
  }, [logoUrl]);

  useEffect(() => {
    setPlans(question?.plans || []);
    setValueInputTextQuestion(question?.questionText || "");
    setPlanTrue(question?.result || "");
    setSelectedItem(question?.result ? plans.indexOf(question.result) : null);
  }, [question]);

  const handleOpenModalEditAnswerTrue = () => {
    if (!valueInputTextQuestion) {
      openSnackbar({
        text: "Vui lòng điền câu hỏi",
        type: "error",
      });
      return;
    }
    if (plans.some((plan) => plan === "")) {
      openSnackbar({
        text: "Vui lòng điền đủ thông tin đáp án",
        type: "error",
      });
      return;
    }
    setModalVisibleAnswerTrue(true);
  };

  const handleOpenModalEditAnswer = (index: number) => {
    setIndexPlan(index);
    setValueInputAnswer(plans[index]);
    setModalVisibleAnswer(true);
  };

  const handleOpenModalEditTextQuesTion = () => {
    setModalVisibleTextQuestion(true);
  };

  const handleCloseModal = () => {
    setModalVisibleAnswerTrue(false);
    setModalVisibleAnswer(false);
    setModalVisibleTextQuestion(false);
    setInfoVisible(false);
  };

  const handleConfirmAnswerTrue = async () => {
    if (!planTrue) {
      openSnackbar({
        text: "Vui lòng chọn đáp án đúng",
        type: "error",
      });
      return;
    }
    const updatedQuestion = {
      ...question,
      questionText: valueInputTextQuestion,
      plans: plans,
      result: planTrue,
      id: question?.id ?? null,
      order: question?.order ?? null,
      url: currentImage,
    };
    setQuestion(updatedQuestion as Question);
    setModalVisibleAnswerTrue(false);
    setModalVisibleTextQuestion(false);
    setConfirmModalVisible(true);
  };

  const handleConfirmAnswer = () => {
    const updatedPlans = [...plans];
    if (indexPlan >= 0 && indexPlan < updatedPlans.length) {
      updatedPlans[indexPlan] = valueInputAnswer;
      setPlans(updatedPlans);
    }
    setModalVisibleAnswer(false);
  };

  const handleConfirmQuestion = () => {
    setModalVisibleTextQuestion(false);
  };

  const handleModalItemClick = (item: string, index: number) => {
    setPlanTrue(item);
    setSelectedItem(index);
  };

  const handleOnchangeValue = (value: string) => {
    setValueInputAnswer(value);
  };

  const handleOnchangeValueTextQuestion = (value: string) => {
    setValueInputTextQuestion(value);
  };

  const handleAddPlan = () => {
    const newPlans = [...plans, ""];
    setPlans(newPlans);
  };

  const handleDelAnswer = () => {
    if (plans.length === 0) return;
    const newPlans = plans.slice(0, -1);
    setPlans(newPlans);
  };

  const handleOnInfoClick = () => {
    setInfoVisible(true);
  };

  const openMediaPickerBackground = () => {
    chooseImage({
      sourceType: ["album", "camera"],
      cameraType: "back",
      count: 1,
      success: async ({ filePaths }) => {
        setCurentImage('');
        const [file] = filePaths;
        if (filePaths.length > 0) {
          setCurrentLogo(file);
        }
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  const onCloseAdd = () => {
    setConfirmModalVisible(false);
  };

  const confirmAdd = async () => {
    const updateQuestion = {
      ...question,
      questionText: valueInputTextQuestion,
      plans: plans,
      result: planTrue,
      id: question?.id ?? null,
      order: question?.order ?? 0,
      url: question?.url ?? '',
    };
    setLogoUrl(currentLogo);

    await callApiQuestion(updateQuestion);

    navigate("/create-questions", { replace: true, direction: "backward" });
  };

  const callApiQuestion = async (updatedQuestion: Question) => {
    const imageUrls = [currentLogo];
    const fieldNames = ['QuestionImage'];
    const formData = new FormData();
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const fieldName = fieldNames[i];
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image from ${url}`);
      }
      const blob = await response.blob();
      const randomNumber = Math.floor(Math.random() * 1000);
      const filename = `${fieldName}_${randomNumber}.png`;
      formData.append(fieldName, blob, filename);
    }

    formData.append("GameInstantId", gameInstanceId ?? '');
    formData.append("QuestionId", updatedQuestion.id ?? '');
    formData.append("QuestionText", updatedQuestion.questionText ?? '');
    formData.append("Order", updatedQuestion.order.toString());
    formData.append("Result", updatedQuestion.result ?? '');

    updatedQuestion.plans.forEach((plan, i) => {
      formData.append(`Plans[${i}].title`, "");
      formData.append(`Plans[${i}].planValue`, plan ?? '');
    });

    try {
      const response = await axios({
        method: "post",
        url: `https://gigi.plus:1024/api/GameInstant/UpdateQuestionById`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const result = await mapQuestionApi(response.data);
      const existingQuestionIndex = listQuestion.findIndex((question) => question.order === indexParams);

      const newListQuestion = [...listQuestion];
      if (existingQuestionIndex !== -1) {
        newListQuestion[existingQuestionIndex] = {
          ...listQuestion[existingQuestionIndex],
          id: result.id,
          questionText: result.questionText,
          plans: result.plans,
          result: result.result,
          url: result.url
        };
        setListQuestion(newListQuestion);
        setListQuestionEdit(newListQuestion)
      } else {
        console.log("Không tìm thấy câu hỏi có order ", indexParams);
      }

    } catch (error) {
      console.error("Error while calling updateNameandColor:", error);
      openSnackbar({
        text: "Có lỗi xảy ra khi cập nhật ảnh. Vui lòng thử lại sau.",
        type: "error",
      });
    }
  };

  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container>
        <TextComponent
          title={titleGame}
          fontSize={appFontSize.mainTitle + "px"}
          color={"#FFFFFF"}
          font={"BagelFatOne"}
          colorStroke={"10px" + primaryColorCampain}
        />
        <div
          style={{ zIndex: 0 }}
          className="h-auto border-2 relative select-none"
        >
          <EditImageCustom
            src={currentLogo||logoUrl}
            color={primaryColorCampain}
            onInfoClick={handleOnInfoClick}
            onClick={openMediaPickerBackground}
            width={320}
            height={185}
          />
        </div>
        <div className="" onClick={handleOpenModalEditTextQuesTion}>
          <TextQuestion
            index={parseInt(index || "undefine")}
            value={valueInputTextQuestion}
            fontFamily={AppFont.SfusouvenirBold}
            color={primaryColorCampain}
          />
        </div>
        <div className="flex flex-row pt-5 justify-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {plans.map((item, index) => (
              <NumberQuestions
                key={index}
                type="ADD_ANSWER"
                colorBackground={primaryColorCampain}
                remove={plans.length > 1 && index === plans.length - 1}
                title={item}
                add={plans.length < 6 && index === plans.length - 1}
                onClickAdd={() => handleAddPlan()}
                onClickDel={() => handleDelAnswer()}
                onclickEdit={() => handleOpenModalEditAnswer(index)}
                colorGame={primaryColorCampain}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-1 mt-5 justify-center items-center">
          <ButtonCompeted
            title="Xác nhận chỉnh sửa"
            onClick={handleOpenModalEditAnswerTrue}
            color={secondaryColorCampain}
            background={primaryColorCampain}
          />
        </div>
        <ModalCustomComponent
          title="Chọn đáp án đúng"
          label={EDIT_ANSWER_TRUE}
          modalVisible={modalVisibleAnswerTrue}
          onClose={handleCloseModal}
          selectedItem={selectedItem}
          plans={plans}
          onConfirm={handleConfirmAnswerTrue}
          onItemClick={handleModalItemClick}
          colorText={secondaryColorCampain}
          colorGame={primaryColorCampain}
        />
        <ModalCustomComponent
          title="Sửa đáp án"
          label={EDIT_ANSWER_QUESTION}
          modalVisible={modalVisibleAnswer}
          onClose={handleCloseModal}
          onConfirm={handleConfirmAnswer}
          onchangeValue={(value) => {
            handleOnchangeValue(value);
          }}
          value={valueInputAnswer}
          colorText={secondaryColorCampain}
          colorGame={primaryColorCampain}
        />
        <ModalCustomComponent
          title="Sửa câu hỏi"
          label={EDIT_QUESTION_TEXT}
          modalVisible={modalVisibleTitleQuestion}
          onClose={handleCloseModal}
          onConfirm={handleConfirmQuestion}
          onchangeValue={(value) => {
            handleOnchangeValueTextQuestion(value);
          }}
          value={valueInputTextQuestion}
          colorText={secondaryColorCampain}
          colorGame={primaryColorCampain}
        />
      </Container>
      <ModalInfo
        visibility={infoVisible}
        onClose={handleCloseModal}
        title={"Hướng dẫn vùng thiết kế"}
        imageUrl={"https://i.ibb.co/ZNJtYj2/msg5176974528-183.jpg"}
        desc={"Vùng thiết kế an toàn"}
      />
      <ConfirmModal
        visibility={confirmModalVisibleDelete}
        onClose={onCloseAdd}
        onConfirm={confirmAdd}
        title={"Xác nhận hoàn tất"}
        desc={"Bạn có chắc chắn muốn chỉnh sửa câu hỏi này không này?"}
      />
    </Page>
  );
};

export default EditChoicesPage;
