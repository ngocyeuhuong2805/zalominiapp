import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Page, useNavigate } from "zmp-ui";
import ImageViewCustom from "../../components/header/image-view";
import Container from "../../components/view/container";
import { AppFlowType } from "../../constants/AppFlowType";
import {
  DefaultGameFromApi,
  DefaultPrizeFromApi,
  DefaultQuesionsFromApi,
  DefaultTaskFromApi,
  DefaultUserJoinFromApi,
  DefaultUserTaskFromApi,
} from "../../constants/DefaultData";
import { GameInstant } from "../../models/GameInstant";
import { Prize } from "../../models/Prize";
import { Question } from "../../models/Question";
import { Task } from "../../models/Task";
import { gamePlaySelector } from "../../states/selectors/GamePlaySelector";
import {
  PrizeAddListPlaySelector,
  PrizeListPlayTitleSelector,
} from "../../states/selectors/PrizeListPlaySelector";
import { QuestionListPlaySelector } from "../../states/selectors/QuestionListPlaySelector";
import { ScreenFlowSelector } from "../../states/selectors/ScreenFlowSelector";
import { TaskListPLaySelector } from "../../states/selectors/TaskListPlaySelector";
import { UserJoinSelector } from "../../states/selectors/UserJoinPlaySelector";
import { UserTaskPlaySelector } from "../../states/selectors/UserJoinTaskPlaySelector";
import ApiNetWork from "../../networks/ApiConFig";
import { data } from "zmp-framework/types/dom";
import {
  mapGameDetail,
  mapGamePrizeDetail,
  mapGameQuestionDetail,
  mapGameTaskDetail,
  mapSampleGameDetail,
} from "../../utils/mapping/mapApiGame";
import {
  mapUserAnswerDetail,
  mapUserJoinDetail,
  mapUserTaskDetail,
} from "../../utils/mapping/mapApiUserJoin";
import { UserAnswerSelector } from "../../states/selectors/UserJoinAnswerPlaySelector";
import { getUserInfo } from "zmp-sdk/apis";
import {
  UserLoginIdSelector,
  UserLoginSelector,
} from "../../states/selectors/UserLoginSelector";
import { mapUserLoginDetail } from "../../utils/mapping/mapApiUserLogin";
import { Result } from "antd";

const CampainSplash: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [logoImageCampain, setLogoImageCampain] = useState("");
  //Query Params
  const queryParams = new URLSearchParams(location.search);
  const idGameInstant: string = queryParams.get("idGameInstant") || "";
  const type: string = queryParams.get("type") || "";
  const urlBackground: string =
    queryParams.get("imageBackgroundCampaign") || "";
  const urlLogo: string = queryParams.get("imageBranch") || "";
  const refCode: string = queryParams.get("refCode") || "";
  //Recoil
  const [gameInstantPlay, setGameInstantPlay] =
    useRecoilState(gamePlaySelector);
  const [questionPlay, setQuestionPlay] = useRecoilState(
    QuestionListPlaySelector
  );
  const [prizePlay, setPrizePlay] = useRecoilState(PrizeAddListPlaySelector);
  const [taskPlay, setTaskPlay] = useRecoilState(TaskListPLaySelector);
  const [userJoin, setUserJoin] = useRecoilState(UserJoinSelector);
  const [userJoinTask, setUserJoinTask] = useRecoilState(UserTaskPlaySelector);
  const [userAnswer, setUserAnswer] = useRecoilState(UserAnswerSelector);
  const [visibility, setVisibility] = useState(false);
  const [userLogin, setUserLogin] = useRecoilState(UserLoginSelector);
  const idUser = useRecoilValue(UserLoginIdSelector);
  //Flow screen
  const [screenFlowType, setScreenFlowType] =
    useRecoilState(ScreenFlowSelector);

  useEffect(() => {
    //Set ảnh từ params
    setBackgroundImage(urlBackground);
    setLogoImageCampain(urlLogo);
    //Gọi Api
    callApi();
  }, []);

  const backToWelcome = () => {
    const timeoutId = setTimeout(() => {
      navigate("/welcome", {
        replace: true,
        direction: "backward",
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  const moveToCampaignMenu = () => {
    const timeoutId = setTimeout(() => {
      navigate("/campain-menu", {
        replace: true,
        direction: "forward",
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  const callApi = () => {
    setScreenFlowType(type);
    switch (type.trim().toLowerCase()) {
      case AppFlowType.REVIEW:
        // Gọi Api sample detail
        callSampleDetailApi();
        break;
      case AppFlowType.PLAY:
        // Gọi Api play game
        callGamePlayApi();
        break;
      case AppFlowType.DRAFT:
        // Gọi Api detail draft
        callDraftDetailApi();
        break;
      default:
        navigate("/welcome", {
          replace: true,
          direction: "backward",
        });
        break;
    }
  };

  const callSampleDetailApi = async () => {
    try {
      // Call the API here
      const result: any = await ApiNetWork.HandleCallApi(
        `/GameInstant/GetDetailGameSample?gameSampleId=${idGameInstant}`,
        "get"
      );
      if (result.success === true) {
        // Map and set game details
        const dataGameDetail = mapSampleGameDetail(result);
        setGameInstantPlay(dataGameDetail);
        // Map and set question details
        const dataQuestionDetail = mapGameQuestionDetail(result);
        setQuestionPlay(dataQuestionDetail);
        // Map and set prize details
        const dataPrizeDetail = mapGamePrizeDetail(result);
        setPrizePlay(dataPrizeDetail);
        // Map and set task details
        const dataTaskDetail = mapGameTaskDetail(result);
        setTaskPlay(dataTaskDetail);
        moveToCampaignMenu();
      } else {
        backToWelcome();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callGamePlayApi = async () => {
    console.log("PLAY");
    try {
      const resultApiUserInfo: any = await getUserInfo({});
      await ApiNetWork.HandleCallApi(
        "/User/CreateNewUser",
        {
          zaloId: resultApiUserInfo.userInfo.id,
          IdByOA: resultApiUserInfo.userInfo.idByOA,
          Name: resultApiUserInfo.userInfo.name,
          Avatar: resultApiUserInfo.userInfo.avatar,
          isSensitive: resultApiUserInfo.userInfo.isSensitive,
          PhoneNumber: "",
        },
        "post"
      ).then(async (result: any) => {
        //Map user
        const userLoginRes = mapUserLoginDetail(result);
        setUserLogin(userLogin);
        // Tiếp tục với các yêu cầu API sau khi createNewUser hoàn thành
        const gameInstant: any = await ApiNetWork.HandleCallApi(
          `GameInstant/PlayGame?gameinstantId=${idGameInstant}`,
          "get"
        );
        const joinUser: any = await ApiNetWork.HandleCallApi(
          `/UserJoin/JoinGameInstant?gameinstantId=${idGameInstant}&userId=${userLoginRes.idUserLogin}&userIdShare=${refCode}`,
          {},
          "post"
        );

        if (joinUser.success && gameInstant.success && result.success) {
          // Map and set game details
          const dataGameDetail = mapGameDetail(gameInstant);
          setGameInstantPlay(dataGameDetail);
          // Map and set question details
          const dataQuestionDetail = mapGameQuestionDetail(gameInstant);
          setQuestionPlay(dataQuestionDetail);
          // Map and set prize details
          const dataPrizeDetail = mapGamePrizeDetail(gameInstant);
          setPrizePlay(dataPrizeDetail);
          // Map and set task details
          const dataTaskDetail = mapGameTaskDetail(gameInstant);
          setTaskPlay(dataTaskDetail);

          const dataUserJoinDetail = mapUserJoinDetail(joinUser);
          setUserJoin(dataUserJoinDetail);
          //
          const dataUserTaskDetail = mapUserTaskDetail(joinUser);
          setUserJoinTask(dataUserTaskDetail);
          //
          const dataUserAnswer = mapUserAnswerDetail(joinUser);
          setUserAnswer(dataUserAnswer);
          moveToCampaignMenu();
        } else {
          backToWelcome();
        }
      });
    } catch (error) {
      backToWelcome();
    }
    return undefined;
  };

  const callDraftDetailApi = async () => {
    try {
      const result: any = await ApiNetWork.HandleCallApi(
        `/GameInstant/GetDetailDraft?gameinstantId=${idGameInstant}`,
        "get"
      );
      console.log(result);
      if (result.success === true) {
        // Map and set game details
        const dataGameDetail = mapGameDetail(result);
        setGameInstantPlay(dataGameDetail);
        // Map and set question details
        const dataQuestionDetail = mapGameQuestionDetail(result);
        setQuestionPlay(dataQuestionDetail);
        // Map and set prize details
        const dataPrizeDetail = mapGamePrizeDetail(result);
        setPrizePlay(dataPrizeDetail);
        // Map and set task details
        const dataTaskDetail = mapGameTaskDetail(result);
        setTaskPlay(dataTaskDetail);
        moveToCampaignMenu();
      } else {
        backToWelcome();
      }
    } catch (error) {
      backToWelcome();
    }
  };

  return (
    <Page
      className="splash-background"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container center={true} showHeader={false}>
        <ImageViewCustom src={logoImageCampain} />
      </Container>
    </Page>
  );
};

export default CampainSplash;
