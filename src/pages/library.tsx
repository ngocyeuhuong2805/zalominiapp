import React, { useEffect, useState } from "react";
import { Sheet, Button, Page, Text, useNavigate, Icon, Center } from "zmp-ui";
import ButtonCompeted from "../components/button/button-competed";
import GameList from "../components/list/game-list";
import Container from "../components/view/container";
import { appColors } from "../constants/appColors";
import { GameSample } from "../models/GameSample";
import { AppFont } from "../constants/app-font";
import TextComponent from "../components/text/text";
import ApiNetWorks from "../networks/ApiConFig";
import ApiNetWork from "../networks/ApiConFig";
import axios from "axios";
import { GAME_ID } from "../constants/AppInFo";
import ConfirmModal from "../components/modals/confirm-modal";
import { AppFlowType } from "../constants/AppFlowType";
import { mapSampleListApi } from "../utils/mapping/mapApiList";
import { GameInstant } from "../models/GameInstant";

import { closeApp, getUserInfo } from "zmp-sdk/apis";

const LibraryPage = () => {
  const navigate = useNavigate();
  // const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [currentChoice, setCurrentChoice] = useState(0);
  const [createGameDesc, setCreateGameDesc] = useState("Game mẫu");

  const [gameList, setGameList] = useState<GameInstant[]>([
    {
      idGameInstant: "",
      namePoilicy: "",
      descPolicy: "",
      imageBranch: "https://i.ibb.co/6P1JfgC/FPT-Polytechnic-1.png",
      gameInstantName: "Chọn Game mẫu",
      imageBackground: "https://i.ibb.co/ZNJtYj2/msg5176974528-183.jpg",
      imageBackgroundCampaign: "https://i.ibb.co/ZNJtYj2/msg5176974528-183.jpg",
      color: "Green",
      wintype: "", //Loại trò chơi
      deepLink: "Default",
      openTime: "",
      closeTime: "",
      createdBy: "1",
      totalCanJoin: 100,
    },
  ]);

  const handleDelete = (id: string, index: number) => {
    setGameList((prevGameList) => prevGameList.filter((_, i) => i !== index));
  };

  const userInfo: any = getUserInfo({});
  const getListSampleGame = async () => {
    try {
      // Call the API here
      const result: any = await ApiNetWork.HandleCallApi(
        `/UserGame/GetListSampleGame?miniGameId=${GAME_ID}`,
        "get"
      );
      if (result.success === true) {
        const library = mapSampleListApi(result);
        setGameList(library);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListSampleGame();
  }, []);

  const handleContinue = () => {
    navigate("/welcome", {
      replace: true,
      direction: "backward",
    });
  };

  const onConfirmCreate = () => {
    //Chuyển trang
    navigate(
      `/campain-splash?idGameInstant=${gameList[currentChoice].idGameInstant}
        &imageBackgroundCampaign=${gameList[currentChoice].imageBackgroundCampaign}
        &imageBranch=${gameList[currentChoice].imageBranch}
        &type=${AppFlowType.REVIEW}`
    );
  };

  // const onClose = () => {
  //   setConfirmModalVisible(false)
  // }

  // const handleClick = (index: number) => {
  //   setCurrentChoice(index);
  //   setCreateGameDesc(gameList[index].gameInstantName);
  //   setConfirmModalVisible(true);
  // };

  return (
    <Page className="container-background">
      <Container center={true}>
        <TextComponent
          boderColor={appColors.primary}
          color={appColors.secondary}
          fontSize="30px"
          font={AppFont.BagelFatOne}
          title="Kho game mẫu"
          fontWeight="400"
          colorStroke={`6px ${appColors.primary}`}
        />
        <GameList
          games={gameList}
          onGameClick={onConfirmCreate}
          onDelete={handleDelete}
        />
        <ButtonCompeted title="Quay về" onClick={handleContinue} />
      </Container>
      {/* <ConfirmModal visibility={confirmModalVisible} onClose={onClose} onConfirm={onConfirmCreate} title={"Bạn có muốn tạo game mới?"} desc={createGameDesc} /> */}
    </Page>
  );
};

export default LibraryPage;
