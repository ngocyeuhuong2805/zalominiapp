import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import TextComponent from "../../components/text/text";
import { appColors } from "../../constants/appColors";
import InputOption from "../../components/input/input-option";
import ButtonCompeted from "../../components/button/button-competed";
import { Page, useNavigate, useSnackbar } from "zmp-ui";
import Container from "../../components/view/container";
import SelectColor from "../../components/selected/select-color";
import {
  gameColorSelector,
  gameEditNameSelector,
  gameEditSelector,
  gameImageBackgroundSelector,
} from "../../states/selectors/GameEditSelector";
import { getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import { AppFont } from "../../constants/app-font";
import ConfirmModal from "../../components/modals/confirm-modal";
import ApiNetWork from "../../networks/ApiConFig";
import { gamePlaySelector } from "../../states/selectors/GamePlaySelector";
import { AppFlowType } from "../../constants/AppFlowType";
import { ScreenFlowSelector } from "../../states/selectors/ScreenFlowSelector";

const CreateTitlePage: React.FunctionComponent = (props) => {
  const { openSnackbar } = useSnackbar();

  //set background vào màu vào
  const backgroundImageCampain = useRecoilValue(gameImageBackgroundSelector);
  const [titleCampain, SetTitleCampain] = useRecoilState(gameEditNameSelector);
  const [color, setColor] = useRecoilState(gameColorSelector);
  const [primaryColorCampain, setPrimaryColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(
    getSecondaryColor(color)
  );
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [gameInstantEdit, setGameInstantEdit] =
    useRecoilState(gameEditSelector);
  const [gameInstantPlay, setGameInstantPlay] =
    useRecoilState(gamePlaySelector);
  const [title, setTitle] = useState<string>(titleCampain);
  const [theme, setTheme] = useState<string>(""); // lấy màu được chọn
  const [isCheckBorder, setIsCheckBorder] = useState<boolean>(false);
  const typeScreen = useRecoilValue(ScreenFlowSelector);

  const gameInstanceId = useRecoilValue(gamePlaySelector).idGameInstant;

  const navigate: any = useNavigate();

  useEffect(() => {
    setGameInstantPlay(gameInstantEdit);
  }, [gameInstantEdit]);

  const checkTitle = () => {
    if (title === "" || theme === "") {
      openSnackbar({
        text: "Vui lòng nhập title và chọn màu",
        type: "error",
      });
      return;
    } else {
      setConfirmModalVisible(true);
      callApiUpdateNameandColor();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleColor = (value: string) => {
    setIsCheckBorder(true);
    setTheme(value);
    setPrimaryColorCampain(getPrimaryColor(value));
    setSecondaryColorCampain(getSecondaryColor(value));
  };

  const onClose = () => {
    setConfirmModalVisible(false);
  };

  const onConfirmCreate = () => {
    history.back();
  };

  const callApiUpdateNameandColor = async () => {
    try {
      const result: any = await ApiNetWork.HandleCallApi(
        `/GameInstant/UpdateNameGameConfig?gameInstantId=${gameInstanceId}&name=${title}&color=${theme}`,
        null,
        "post"
      );
      if (result.success === true) {
        SetTitleCampain(title);
        setColor(theme);
      } else {
        openSnackbar({
          text: "Có lỗi xảy ra khi cập nhật tên và màu sắc. Vui lòng thử lại sau.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error while calling updateNameandColor:", error);
      openSnackbar({
        text: "Có lỗi xảy ra khi cập nhật tên và màu sắc. Vui lòng thử lại sau.",
        type: "error",
      });
    }
  };

  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container center={true} showHeader={true}>
        <TextComponent
          boderColor={primaryColorCampain}
          color={secondaryColorCampain}
          fontSize="30px"
          font={AppFont.BagelFatOne}
          title="Tên chương trình"
          fontWeight="400"
          colorStroke={`6px ${primaryColorCampain}`}
        />
        <InputOption
          value={title}
          onChange={handleTitleChange}
          fontSize="20px"
          placeholder="Nhập tiêu đề chương trình"
          color={primaryColorCampain}
          background={secondaryColorCampain}
          borderColor={primaryColorCampain}
        />
        <TextComponent
          boderColor={primaryColorCampain}
          color={secondaryColorCampain}
          fontSize="20px"
          font={AppFont.BagelFatOne}
          title="Chọn hệ màu"
          fontWeight="400"
          colorStroke={`6px ${primaryColorCampain}`}
        />
        <SelectColor onChange={handleColor} isCheckBorder={isCheckBorder} />
        {typeScreen === AppFlowType.DRAFT && (
          <ButtonCompeted
            onClick={checkTitle}
            title="Xác nhận"
            background={primaryColorCampain}
            color={secondaryColorCampain}
          />
        )}
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

export default CreateTitlePage;
