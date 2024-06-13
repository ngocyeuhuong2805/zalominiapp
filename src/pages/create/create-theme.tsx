import React, { useEffect, useState } from "react";
import { Sheet, Button, Page, Text, useNavigate, useSnackbar } from "zmp-ui";
import TextComponent from "../../components/text/text";
import ButtonOption from "../../components/button/btn-option";
import ButtonCompeted from "../../components/button/button-competed";
import { appColors } from "../../constants/appColors";
import Container from "../../components/view/container";
import LogoBranchImage from "../../components/header/image-view";
import EditImageCustom from "../../components/input/edit-image-custom";
import {
  gameColorSelector,
  gameEditSelector,
  gameImageBackgroundCampaignSelector,
  gameImageBackgroundSelector,
} from "../../states/selectors/GameEditSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  getInstructionColor,
  getPrimaryColor,
  getSecondaryColor,
} from "../../utils/getColor";
import ModalInfo from "../../components/modals/info-modal";
import { AppFont } from "../../constants/app-font";
import Instruction from "../../components/text/instruction";
import ConfirmModal from "../../components/modals/confirm-modal";
import { chooseImage } from "zmp-sdk";
import { message } from "antd";
import AxiosClient from "../../networks/AxiosClient";
import { gamePlaySelector } from "../../states/selectors/GamePlaySelector";
import {
  appendImageToFormDataIfBlob,
  fetchAllImageBlobs,
  fetchImageBlobs,
} from "../../networks/FormatImage";
import { mapGameDetail } from "../../utils/mapping/mapApiGame";
import { AppFlowType } from "../../constants/AppFlowType";
import { ScreenFlowSelector } from "../../states/selectors/ScreenFlowSelector";

const CreateTheme: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();

  const [backgroundImageCampain, setBackgroundImageCampain] = useRecoilState(
    gameImageBackgroundSelector
  );
  const [backgroundSplashCampain, setBackgroundSplashCampain] = useRecoilState(
    gameImageBackgroundCampaignSelector
  );

  const typeScreen: string = useRecoilValue(ScreenFlowSelector);

  const color: string = useRecoilValue(gameColorSelector);
  const [primaryColorCampain, setMainColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setTextColorCampain] = useState(
    getSecondaryColor(color)
  );
  const [instructionColorCampain, setInstructionColorCampain] = useState(
    getInstructionColor(color)
  );
  const [infoVisible, setInfoVisible] = useState(false);

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const [currentSplash, setCurrentSplash] = useState("");
  const [currentBackground, setcurrentBackground] = useState("");
  const gameInstanceId = useRecoilValue(gamePlaySelector).idGameInstant;
  const [gameInstantEdit, setGameInstantEdit] =
    useRecoilState(gameEditSelector);
  const [gameInstantPlay, setGameInstantPlay] =
    useRecoilState(gamePlaySelector);

  useEffect(() => {
    setCurrentSplash(backgroundSplashCampain);
  }, []);

  useEffect(() => {
    setcurrentBackground(backgroundImageCampain);
  }, []);

  useEffect(() => {
    setGameInstantPlay(gameInstantEdit);
  }, [gameInstantEdit]);

  const handelConfirm = () => {
    setConfirmModalVisible(true);
  };

  const handleUpdateImageBgandCp = async () => {
    const formData = new FormData();

    console.log(currentSplash);
    const fetchSplash = appendImageToFormDataIfBlob(
      formData,
      currentSplash,
      "imgCampain"
    );

    const fetchBackGround = await appendImageToFormDataIfBlob(
      formData,
      currentBackground,
      "imgBackground"
    );

    if (!fetchBackGround && !fetchSplash) {
      return;
    }

    try {
      const response: any = await AxiosClient.post(
        `/GameInstant/UpdateImageGameConfig?gameInstantId=${gameInstanceId}`,
        formData
      );
      if (response.success === true) {
        const gameInstantRes = mapGameDetail(response);
        setBackgroundImageCampain(gameInstantRes.imageBackground);
        setBackgroundSplashCampain(gameInstantRes.imageBackgroundCampaign);
        setcurrentBackground(gameInstantRes.imageBackground);
        setCurrentSplash(gameInstantRes.imageBackgroundCampaign);
        console.log(gameInstantRes.imageBackgroundCampaign);
        openSnackbar({
          text: "Thêm thành công",
          duration: 2000,
        });
      } else {
        openSnackbar({
          text: "Thêm thất bại",
          duration: 2000,
        });
      }
    } catch (error) {
      openSnackbar({
        text: "Thêm thất bại",
        duration: 2000,
      });
    }
  };

  const handleOnInfoClick = () => {
    setInfoVisible(true);
  };

  const handleCloseModal = () => {
    setInfoVisible(false);
  };

  const onClose = () => {
    setConfirmModalVisible(false);
  };

  const onConfirmCreate = () => {
    handleUpdateImageBgandCp();
    setConfirmModalVisible(false);
  };

  const openMediaPickerSplash = () => {
    chooseImage({
      sourceType: ["album", "camera"],
      cameraType: "back",
      count: 1,
      success: async ({ filePaths }) => {
        const [file] = filePaths;
        if (filePaths.length > 0) {
          setCurrentSplash(file);
          console.log("Current Splash:", file);
        }
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  const openMediaPickerBackground = () => {
    chooseImage({
      sourceType: ["album", "camera"],
      cameraType: "back",
      count: 1,
      success: async ({ filePaths }) => {
        const [file] = filePaths;
        if (filePaths.length > 0) {
          setcurrentBackground(file);
          console.log("Current Background:", file);
        }
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container center={true} showHeader={true}>
        <TextComponent
          title={"Ảnh chiến dịch"}
          font={AppFont.BagelFatOne}
          color="white"
          fontSize="35px"
          colorStroke={"15px " + primaryColorCampain}
        />
        <div className="flex flex-row gap-5 text-center">
          <div className="flex flex-col gap-2">
            <Instruction text="Ảnh nền" color={instructionColorCampain} />
            <EditImageCustom
              src={currentBackground}
              color={primaryColorCampain}
              onInfoClick={handleOnInfoClick}
              onClick={openMediaPickerBackground}
              width={140}
              height={280}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Instruction text="Màn hình chờ" color={instructionColorCampain} />
            <EditImageCustom
              src={currentSplash}
              color={primaryColorCampain}
              onInfoClick={handleOnInfoClick}
              onClick={openMediaPickerSplash}
              width={140}
              height={280}
            />
          </div>
        </div>
        {typeScreen === AppFlowType.DRAFT && (
          <ButtonCompeted
            title="Xác nhận"
            onClick={handelConfirm}
            color={secondaryColorCampain}
            background={primaryColorCampain}
          />
        )}
        <Instruction
          color={instructionColorCampain}
          text="Bấm vào để thay ảnh"
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
        visibility={confirmModalVisible}
        onClose={onClose}
        onConfirm={onConfirmCreate}
        title={"Bạn có muốn xác nhận chỉnh sửa?"}
      />
    </Page>
  );
};

export default CreateTheme;
