import React, { useEffect, useState } from "react";
import { Button, Page } from "zmp-ui";
import { useNavigate } from "react-router";
import ButtonCompeted from "../../components/button/button-competed";
import Container from "../../components/view/container";
import { appColors } from "../../constants/appColors";
import TextComponent from "../../components/text/text";
import { appFontSize } from "../../constants/appFontSizes";
import { AppFont } from "../../constants/app-font";
import Instruction from "../../components/text/instruction";
import { useRecoilState, useRecoilValue } from "recoil";
import { getInstructionColor, getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import { gameColorPlaySelector, gameImageBackgroundPlaySelector, gameImageBrandPlaySelector, gameInstantNamePlaySelector } from "../../states/selectors/GamePlaySelector";
import ImageViewCustom from "../../components/header/image-view";
import { gameColorSelector, gameImageBackgroundSelector } from "../../states/selectors/GameEditSelector";
import ConfirmModal from "../../components/modals/confirm-modal";

const CampaignCongratulations = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const LogoImageCampain: string = useRecoilValue(gameImageBrandPlaySelector)
  const titleCampain = useRecoilValue(gameInstantNamePlaySelector)
  const backgroundImageCampain = useRecoilValue(gameImageBackgroundPlaySelector || 'images/background-main-app.jpg')
  const color: string = useRecoilValue(gameColorPlaySelector)
  const [primaryColorCampain, setPrimaryColorCampain] = useState(getPrimaryColor(color))
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(getSecondaryColor(color))
  const instructionColorCampain = getInstructionColor(color);

    const handelContinue = () => {
        navigate('/campain-menu')
    };

  return (
    <Page
    className="splash-background" style={{ backgroundImage: `url(${backgroundImageCampain})`}}
    >
      <Container 
        iconColor={primaryColorCampain}
        center={false} 
        showHeader={true} 
      >
      <ImageViewCustom src={LogoImageCampain} />
        <TextComponent
          fontSize={appFontSize.mainTitle+"px"}
          font={AppFont.BagelFatOne}
          title={"Chúc mừng"}
          color={secondaryColorCampain}
          colorStroke={"20px" + primaryColorCampain}
        />
        <Instruction
          text="Giải thưởng đang được giao đến bạn"
          color={instructionColorCampain}
          fontWeight="bold"
        ></Instruction>
        <ButtonCompeted color={secondaryColorCampain} background={primaryColorCampain} title="Xong" onClick={() => {handelContinue()}} />
      </Container>
    </Page>
  );
};

export default CampaignCongratulations;
