import React, { useState } from "react";
import { Page, Text, useNavigate } from "zmp-ui";
import Container from "../../components/view/container";
import TextComponent from "../../components/text/text";
import ButtonCompeted from "../../components/button/button-competed";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";
import { AppFont } from "../../constants/app-font";
import { useRecoilState, useRecoilValue } from "recoil";
import { useParams, useLocation } from "react-router-dom";
import {
  PrizeListPlayTitleSelector,
  PrizeListPlayDescSelector,
  PrizeListPlayImageUrlSelector,
} from "../../states/selectors/PrizeListPlaySelector";
import {
  gameCloseTimeSelector,
  gameColorSelector,
  gameDescPolicySelector,
  gameEditNameSelector,
  gameImageBackgroundSelector,
  gameOpenTimeSelector,
} from "../../states/selectors/GameEditSelector";
import {
  getInstructionColor,
  getPrimaryColor,
  getSecondaryColor,
} from "../../utils/getColor";
import { string } from "prop-types";
import Instruction from "../../components/text/instruction";
import EditImageCustom from "../../components/input/edit-image-custom";
import InputOption from "../../components/input/input-option";
import ImageViewCustom from "../../components/header/image-view";
import {
  gameColorPlaySelector,
  gameImageBackgroundPlaySelector,
} from "../../states/selectors/GamePlaySelector";
import SelectCampaingRewards from "../../components/selected/select_campaign_rewards";
import TextareaPrize from "../../components/text/textarea-prize";

const CampaignGiftDetail = () => {
  const { index } = useParams<{ index: string }>();
  const indexParams = parseInt(index || "");
  const navigator = useNavigate();

  // const title = useRecoilValue(IdLibrarySelector);
  // const number = useRecoilValue(PlayQuestionListSelector(title))
  const title = useRecoilValue(PrizeListPlayTitleSelector(index || ""));
  const image = useRecoilValue(PrizeListPlayImageUrlSelector(index || ""));
  const desc = useRecoilValue(PrizeListPlayDescSelector(index || ""));
  const [titleCampain, setTitleCampain] = useRecoilState(gameEditNameSelector);
  const backgroundImageCampain = useRecoilValue(
    gameImageBackgroundPlaySelector || "images/background-main-app.jpg"
  );
  const color: string = useRecoilValue(gameColorPlaySelector);
  const [primaryColorCampain, setPrimaryColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(
    getSecondaryColor(color)
  );
  const [instructionColorCampain, setInstructionColorCampain] = useState(
    getInstructionColor(color)
  );

  const handleButton = () => {
   history.back();
  };

  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container iconColor={primaryColorCampain} showHeader={true}>
        <TextComponent
          title="Cơ Cấu Giải Thưởng"
          color={secondaryColorCampain}
          colorStroke={`8px ${primaryColorCampain}`}
          fontSize={appFontSize.mainTitle + "px"}
          font={AppFont.BagelFatOne}
        />
        <InputOption
          value={title}
          disabled
          color={primaryColorCampain}
          borderColor={primaryColorCampain}
          background={secondaryColorCampain}
        />
        <SelectCampaingRewards image={image} />
        <ButtonCompeted
          background={primaryColorCampain}
          color={secondaryColorCampain}
          title="Xong"
          onClick={handleButton}
        />
        <div 
            className="pt-10 w-screen px-9 font-bold text-2xl" 
            style={{
                    fontFamily:AppFont.QuicksanMedium,
                    fontSize:appFontSize.small,
                    color: primaryColorCampain,
                    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1),rgba(255, 255, 255, 1),rgba(255, 255, 255, 1),rgba(255, 255, 255, 1))`,
                  }}
        >
            {desc}
        </div>
      </Container>
    </Page>
  );
};

export default CampaignGiftDetail;
