import React, { useEffect, useState } from "react";
import { Page, useNavigate, useSnackbar } from "zmp-ui";
import Container from "../../components/view/container";
import TextComponent from "../../components/text/text";
import Instruction from "../../components/text/instruction";
import ButtonCompeted from "../../components/button/button-competed";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  gameColorSelector,
  gameEditSelector,
  gameImageBackgroundSelector,
  gameImageBranchSelector,
} from "../../states/selectors/GameEditSelector";
import {
  getInstructionColor,
  getPrimaryColor,
  getSecondaryColor,
} from "../../utils/getColor";
import EditImageCustom from "../../components/input/edit-image-custom";
import ConfirmModal from "../../components/modals/confirm-modal";
import { AppFlowType } from "../../constants/AppFlowType";
import { ScreenFlowSelector } from "../../states/selectors/ScreenFlowSelector";
import { chooseImage } from "zmp-sdk/apis";
import axios from "axios";
import { gamePlaySelector } from "../../states/selectors/GamePlaySelector";
import ApiNetWork from "../../networks/ApiConFig";
import {
  appendImageToFormDataIfBlob,
  fetchImageBlobs,
} from "../../networks/FormatImage";
import { mapGameDetail } from "../../utils/mapping/mapApiGame";
import { GameInstant } from "../../models/GameInstant";

const CreateLogoPage = () => {
  const navigate = useNavigate();
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();
  const [logoUrl, setLogoUrl] = useRecoilState(gameImageBranchSelector);
  const backgroundImageCampain = useRecoilValue(gameImageBackgroundSelector);
  const color = useRecoilValue(gameColorSelector);
  const [primaryColorCampain, setMainColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setTextColorCampain] = useState(
    getSecondaryColor(color)
  );
  const [instructionColorCampain, setInstructionColorCampain] = useState(
    getInstructionColor(color)
  );
  const [currentLogo, setCurrentLogo] = useState("");
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const type = useRecoilValue(ScreenFlowSelector);
  const gameInstanceId = useRecoilValue(gamePlaySelector).idGameInstant;
  const [gameInstantEdit, setGameInstantEdit] =
    useRecoilState(gameEditSelector);
  const [gameInstantPlay, setGameInstantPlay] =
    useRecoilState(gamePlaySelector);

  useEffect(() => {
    setCurrentLogo(logoUrl);
  }, []);

  useEffect(() => {
    setGameInstantPlay(gameInstantEdit);
  }, [gameInstantEdit]);

  const callApiLogo = async () => {
    const formData = new FormData();
    const fetchBlob = await appendImageToFormDataIfBlob(
      formData,
      currentLogo,
      "imgLogo"
    );
    if (!fetchBlob) {
      return;
    }

    try {
      await ApiNetWork.HandleCallApi(
        `/GameInstant/UpdateLogoGameInstant?gameInstantId=${gameInstanceId}`,
        formData,
        "post"
      )
        .then((result: any) => {
          const gameInstantRes: GameInstant = mapGameDetail(result);
          setLogoUrl(gameInstantRes.imageBranch);
          setCurrentLogo(gameInstantRes.imageBranch);
          setGameInstantPlay(gameInstantEdit);
          openSnackbar({
            text: "Thêm thành công",
            duration: 2000,
          });
        })
        .catch((e) => {
          openSnackbar({
            text: "Thêm thất bại",
            duration: 2000,
          });
        });
    } catch (error) {
      openSnackbar({
        text: "Thêm thất bại",
        duration: 2000,
      });
    }
  };

  const handelContinue = () => {
    callApiLogo();
  };

  const openMediaPicker = async () => {
    chooseImage({
      sourceType: ["album", "camera"],
      cameraType: "back",
      count: 1,
      success: async ({ filePaths }) => {
        const [file] = filePaths;
        if (filePaths.length > 0) {
          setCurrentLogo(file);
          console.log("Current Logo:", file);
        }
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };

  const onClose = () => {
    setConfirmModalVisible(false);
  };

  const onConfirmCreate = () => {
    navigate(-1);
  };

  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container center={true} showHeader={true}>
        <TextComponent
          title={"Logo chiến dịch"}
          color="white"
          fontSize="35px"
          colorStroke={"15px " + primaryColorCampain}
        />
        <EditImageCustom
          src={currentLogo}
          color={primaryColorCampain}
          onClick={openMediaPicker}
          width={160}
          height={160}
        />
        {type === AppFlowType.DRAFT && (
          <ButtonCompeted
            title="Xác nhận"
            onClick={handelContinue}
            color={secondaryColorCampain}
            background={primaryColorCampain}
          />
        )}
        <Instruction
          color={instructionColorCampain}
          text="Bấm vào để thay ảnh"
        />
      </Container>
      <ConfirmModal
        visibility={confirmModalVisible}
        onClose={onClose}
        onConfirm={onConfirmCreate}
        title={"Bạn có xác nhận chỉnh sửa"}
        desc="Bạn có muốn xác nhận chỉnh sửa"
      />
    </Page>
  );
};

export default CreateLogoPage;
