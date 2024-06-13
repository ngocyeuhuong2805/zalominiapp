                  
import React, { useState, useRef, useEffect } from "react";
import star from "../../static/icons/star.png";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Page, Text, useNavigate } from "zmp-ui";
import TextComponent from "../../components/text/text";
import { appColors } from "../../constants/appColors";
import ButtonCompeted from "../../components/button/button-competed";
import Container from "../../components/view/container";
import NumberQuestions from "../../components/question/number-question";
import { QuestionListEditSelector, RemoveLastQuestionSelector, AddQuestionSelector } from "../../states/selectors/QuestionListEditSelector";
import { gameColorPlaySelector, gameInstantNamePlaySelector, gamePlaySelector } from "../../states/selectors/GamePlaySelector";
import { getInstructionColor, getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import { gameColorSelector, gameImageBackgroundSelector } from "../../states/selectors/GameEditSelector";
import ApiNetWork from "../../networks/ApiConFig";

const CreateQuestionsPage = () => {
  const navigate = useNavigate();
  const backgroundImageCampain = useRecoilValue(gameImageBackgroundSelector)
  const color: string = useRecoilValue(gameColorSelector)
  const [primaryColorCampain, setMainColorCampain] = useState(getPrimaryColor(color))
  const [secondaryColorCampain, setTextColorCampain] = useState(getSecondaryColor(color))
  const [instructionColorCampain, setInstructionColorCampain] = useState(getInstructionColor(color))
  const questionList = useRecoilValue(QuestionListEditSelector);
  const newTitle = useRecoilValue(gameInstantNamePlaySelector);
  const addQuestion = useSetRecoilState(AddQuestionSelector);
  const [_, setLastQuestionData] = useRecoilState(RemoveLastQuestionSelector);
  const removeLastQuestion = () => setLastQuestionData((oldGameData) => oldGameData);

  const gameInstanceId = useRecoilValue(gamePlaySelector).idGameInstant;
  const onBack = () => {
    history.back();
  };

  const handleAddQuestion = () => {
    addQuestion((oldQuestions) => oldQuestions); // Trigger the set logic in the selector

  }

  const handleRemoveQuestion = async(id) => {
    removeLastQuestion();
    await DelGamePlayApi(id)

  }

  const handelEditQuestion = (id: string, index:number) => {
    navigate(`/edit-choices/${id}?index=${index}`);
  };

  const handelConfirm = () => {
    navigate("/campaign-config");
  };
  // useEffect(() => {
  //   if (lastQuestionRef.current) {
  //     lastQuestionRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [index]);

  //update api question
  // const formData = new FormData()
	// formData.append("GameInstantId", )
	// formData.append("roomType", roomType)
	// formData.append("roomPrice", roomPrice)
  const callApiQuestion = async () => {
    try {
      const result: any = await ApiNetWork.HandleCallApi(
        `/GameInstant/UpdateQuestionById`,
        null,
        "post"
        
      );
      if (result.success === true) {
        
      } else {
        // openSnackbar({
        //   text: "Có lỗi xảy ra khi cập nhật tên và màu sắc. Vui lòng thử lại sau.",
        //   type: "error",
        // });
      }
    } catch (error) {
      console.error("Error while calling updateNameandColor:", error);
      // openSnackbar({
      //   text: "Có lỗi xảy ra khi cập nhật tên và màu sắc. Vui lòng thử lại sau.",
      //   type: "error",
      // });
    }
  };



  //Xóa câu hỏi
    // Xóa câu hỏi trong API
    const DelGamePlayApi = async (questionId) => {
      try {
        const result: any = await ApiNetWork.HandleCallApi(
          `GameInstant/DeleteQuestion?gameInstantId=${gameInstanceId}&questionId=${questionId}`,
          null,
          "post"
        );
        if (result.success === true) {

        } else {
          //backToWelcome();
         
          
        }
      } catch (error) {
        //backToWelcome();
        
      }
      return undefined;
    };



  return (
    <Page className="splash-background" style={{ backgroundImage: `url(${backgroundImageCampain})`, }}>
      <Container center={false}>
        <div>
          <TextComponent
            boderColor={appColors.primary}
            color="#FFFFFF"
            fontSize="30px"
            font="BagelFatOne"
            title={newTitle || 'Tạo câu hỏi'}
            fontWeight="400"
            colorStroke={"10px" + primaryColorCampain}
          />
        </div>
        <div className="w-full max-h-96 overflow-y-auto flex flex-col justify-center items-center">
          {questionList.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-64 h-16 relative m-2"
            >
              <NumberQuestions
                onItemClicked={() => {
                  handelEditQuestion(item.id || 'default_id',index+1);
                }}
                colorGame={primaryColorCampain}
                colorBackground={item.result ? primaryColorCampain : appColors.secondary}
                colorText={item.result ? secondaryColorCampain : primaryColorCampain}
                type="ADD_QUESTION"
                remove={questionList.length > 1 && index === questionList.length - 1}
                title={`Câu ${item.order}`}
                add={questionList.length < 20 && index === questionList.length - 1}
                onClickAdd={() => {
                  handleAddQuestion()
                }}
                onClickDel={() => {
                  handleRemoveQuestion(item.id);
                }}

              />
            </div>
          ))}
        </div>
        {questionList.every(item => item.result) ? <ButtonCompeted title="Xác nhận" onClick={handelConfirm} background={primaryColorCampain} color={secondaryColorCampain} /> : null}
      </Container>
    </Page>
  );
};

export default CreateQuestionsPage;
