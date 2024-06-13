import React, { useEffect, useState } from "react";
import { Sheet, Button, Page, Text, useNavigate, Icon, Center } from "zmp-ui";
import ButtonCompeted from "../components/button/button-competed";
import GameList from "../components/list/game-list";
import Container from "../components/view/container";
import { appColors } from "../constants/appColors";
import { GameSample } from "../models/GameSample";
import TextComponent from "../components/text/text";
import { AppFont } from "../constants/app-font";
import ApiNetWork from "../networks/ApiConFig";
import { GAME_ID } from "../constants/AppInFo";
import { GameInstant } from "../models/GameInstant";
import ConfirmModal from "../components/modals/confirm-modal";
import { AppFlowType } from "../constants/AppFlowType";
import { mapUserLibraryApi } from "../utils/mapping/mapApiList";
import { useRecoilValue } from "recoil";
import { UserLoginIdSelector } from "../states/selectors/UserLoginSelector";

const LibraryUserPage = () => {
  const idUser = useRecoilValue(UserLoginIdSelector);
  const navigate = useNavigate();
  const [gameList, setGameList] = useState<GameInstant[]>([
    {
      idGameInstant: "",
      namePoilicy: "",
      descPolicy: "",
      imageBranch: "https://i.ibb.co/6P1JfgC/FPT-Polytechnic-1.png",
      gameInstantName: "Bạn chưa tạo game",
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
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmModalVisibleDelete, setConfirmModalVisibleDelete] =
    useState(false);
  const [currentChoice, setCurrentChoice] = useState(0);
  const [createGameDesc, setCreateGameDesc] = useState("Game mẫu");
  const [gameToDelete, setGameToDelete] = useState<{
    id: string;
    index: number;
  } | null>(null);

  const getUserGameLibrary = async () => {
    // Call API to get user game library
    try {
      const response: any = await ApiNetWork.HandleCallApi(
        `/UserGame/GetUserGameLibrary?ownerId=${idUser}`,
        "get"
      );

      const result: GameInstant[] = mapUserLibraryApi(response);
      console.log(result);
      setGameList(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: string, index: number) => {
    setGameToDelete({ id, index });
    setConfirmModalVisibleDelete(true);
  };

  const confirmDelete = () => {
    if (gameToDelete) {
      setGameList((prevGameList) =>
        prevGameList.filter((_, i) => i !== gameToDelete.index)
      );
      setGameToDelete(null);
    }
    setConfirmModalVisibleDelete(false);
  };
  const handleContinue = () => {
    navigate("/welcome", {
      replace: true,
      direction: "backward",
    });
  };

  const onCloseDelete = () => {
    setConfirmModalVisibleDelete(false);
  };

  const handleClick = (index: number) => {
    setCreateGameDesc(gameList[index].gameInstantName);
    onConfirmOpenGame(index);
    // setConfirmModalVisible(true);
  };

  const onConfirmOpenGame = (index: number) => {
    //Chuyển trang

    console.log(gameList[index].idGameInstant);
    navigate(
      `/campain-splash?idGameInstant=${gameList[index].idGameInstant}
      &imageBackgroundCampaign=${gameList[index].imageBackgroundCampaign}
      &imageBranch=${gameList[index].imageBranch}
      &type=${AppFlowType.DRAFT}`
    );
  };

  useEffect(() => {
    getUserGameLibrary();
  }, []);

  return (
    <Page className="container-background">
      <Container center={true} showHeader={true}>
        <TextComponent
          boderColor={appColors.primary}
          color={appColors.secondary}
          fontSize="30px"
          font={AppFont.BagelFatOne}
          title="Game Đã Tạo"
          fontWeight="400"
          colorStroke={`6px ${appColors.primary}`}
        />
        <GameList
          games={gameList}
          onGameClick={handleClick}
          onDelete={handleDelete}
          showDelete={true}
        />
        <ButtonCompeted title="Quay về" onClick={handleContinue} />
      </Container>
      <ConfirmModal
        visibility={confirmModalVisibleDelete}
        onClose={onCloseDelete}
        onConfirm={confirmDelete}
        title={"Xác nhận xóa"}
        desc={"Bạn có chắc chắn muốn xóa game này?"}
      />
    </Page>
  );
};

export default LibraryUserPage;
