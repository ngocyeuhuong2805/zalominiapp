import React, { useState } from "react";
import { Button, Page, useNavigate, Text, Header, Modal, Input } from "zmp-ui";
import { appColors } from "../constants/appColors";
import ButtonStart from "../components/button/btn-start";
import Container from "../components/view/container";
import ButtonCreate from "../components/button/button-create";
import TextTitleApp from "../components/text/text-title-app";
import { useRecoilValue, useResetRecoilState } from "recoil";
import SelectColor from "../components/selected/select-color";
import { UserLoginSelector } from "../states/selectors/UserLoginSelector";

const WelcomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [mainColorCampain, setMainColorCampain] = useState(appColors.primary);
  const [textColorCampain, setTextColorCampain] = useState(appColors.secondary);
  const idUser = useRecoilValue(UserLoginSelector);
  const [inputModalVisible, setInputModalVisible] = useState(false);
  const [deepLink, setDeepLink] = useState(
    `https://zalo.me/s/1283969289473929311/campain-splash?&imageBackgroundCampaign=https://i.ibb.co/ZNJtYj2/msg5176974528-183.jpg&imageBranch=https://i.ibb.co/6P1JfgC/FPT-Polytechnic-1.png&idGameInstant=d9a7711d-6b5b-4cfb-b2c8-c7cb32400257&type=play&refCode=G0X8ncp7z`
  );

  const libraryScreen = () => {
    navigate("/library");
  };

  const libraryUserScreen = () => {
    navigate("/library-user");
  };

  const openDeepLinkInput = () => {
    setInputModalVisible(true);
  };

  const handleInputChange = (value: string) => {
    setDeepLink(value);
  };

  const onConfirm = () => {
    const nav = deepLink.replace("https://zalo.me/s/1283969289473929311", "");
    setInputModalVisible(false);
    navigate(nav, {
      replace: true,
      direction: "forward",
    });
  };

  return (
    <Page className="container-background">
      {/* <ButtonCreate title={"Tạo"} background={appColors.primary} color={appColors.secondary}
        onClick={createScreen} /> */}
      <Container showHeader={false} center={true}>
        <TextTitleApp
          titleTop="Hỏi Xoáy"
          titleBottom="Đáp Siuuu"
          color={textColorCampain}
          strokeColor={mainColorCampain}
        />
        <ButtonStart
          title={"Kho Game"}
          textAllCap={true}
          onClick={libraryScreen}
          color={textColorCampain}
          background={mainColorCampain}
        />
        <ButtonStart
          title={"Game đã tạo"}
          textAllCap={true}
          onClick={libraryUserScreen}
          color={textColorCampain}
          background={mainColorCampain}
        />
        <ButtonStart
          title={"Tham gia game"}
          textAllCap={true}
          onClick={openDeepLinkInput}
          color={textColorCampain}
          background={mainColorCampain}
        />
        <Modal
          visible={inputModalVisible}
          title="Tham gia game"
          onClose={() => {
            setInputModalVisible(false);
          }}
          actions={[
            {
              text: "Hủy",
              close: true,
            },
            {
              text: "Xác nhận",
              highLight: true,
              onClick: () => onConfirm(),
            },
          ]}
          description="Nhập đường dẫn deeplink đến game đang diễn ra"
        >
          <Input
            placeholder={"Deeplink"}
            onChange={(e) => handleInputChange(e.target.value)}
            value={deepLink}
          />
        </Modal>
      </Container>
    </Page>
  );
};

export default WelcomePage;
