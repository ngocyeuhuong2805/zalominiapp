import React, { useState } from "react";
import { Page, Text, useNavigate } from "zmp-ui";
import Container from "../../components/view/container";
import TextComponent from "../../components/text/text";
import { AppFont } from "../../constants/app-font";
import { appColors } from "../../constants/appColors";
import ButtonCompeted from "../../components/button/button-competed";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  getInstructionColor,
  getPrimaryColor,
  getSecondaryColor,
} from "../../utils/getColor";
import TextareaRule from "../../components/text/textarea-rule";
import TextArea from "antd/es/input/TextArea";
import { appFontSize } from "../../constants/appFontSizes";
import {
  gameCloseTimePlaySelector,
  gameColorPlaySelector,
  gameDescPoilicyPlaySelector,
  gameImageBackgroundPlaySelector,
  gameOpenTimePlaySelector,
  gamePlaySelector,
} from "../../states/selectors/GamePlaySelector";
import InputOption from "../../components/input/input-option";

const CampaignRule = () => {
  const navigate = useNavigate();
  // const [titleCampain, setTitleCampain] = useRecoilState(gameEditNameSelector);
  const backgroundImageCampain = useRecoilValue(
    gameImageBackgroundPlaySelector
  );
  const color = useRecoilValue(gameColorPlaySelector);
  const [primaryColorCampain, setPrimaryColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(
    getSecondaryColor(color)
  );
  const [instructionColorCampain, setInstructionColorCampain] = useState(
    getInstructionColor(color)
  );
  const getContentGame = useRecoilValue(gameDescPoilicyPlaySelector);
  const getStartDate = useRecoilValue(gameOpenTimePlaySelector);
  const getEndDate = useRecoilValue(gameCloseTimePlaySelector);

  const formatDate = (dateInput: string | Date) => {
    let date: Date;
    if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    } else {
      date = dateInput;
    }

    if (isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString(); // Format date to string
  };

  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container iconColor={primaryColorCampain} center={true} showHeader={true}>
        <TextComponent
          color={secondaryColorCampain}
          fontSize="30px"
          font={AppFont.BagelFatOne}
          title="Thể lệ chương trình"
          colorStroke={`6px ${primaryColorCampain}`}
        />
        <div
          style={{
            fontSize: appFontSize.small + "px",
            color: primaryColorCampain,
            background: secondaryColorCampain,
            fontFamily: AppFont.SfusouvenirBold,
            fontWeight: "bold",
            lineHeight: '1.5',
            width: "270px",
            height: "254px",
            border: `4px solid ${primaryColorCampain}`,
            borderRadius: "40px",
            padding: "20px",
            outline: 'none',
            overflowY: "auto",
            margin: "auto"
          }}>
          {getContentGame}
        </div>
        <div
          style={{
            borderRadius: "40px",
            borderColor: primaryColorCampain,
            width: "270px",
            height: "92%",
            padding: "10px",
            border: `4px solid ${primaryColorCampain}`,
            color: primaryColorCampain,
            fontFamily: "SfusouvenirBold",
            fontSize: 20,
            lineHeight: "1.5",
            fontWeight: 700,
            outline: "none",
            textAlign: "center",
            background: "white",
          }}
          className="w-5/6 h-20 border-4"
        >
          Từ: {formatDate(getStartDate)} - {formatDate(getEndDate)}
        </div>

        <ButtonCompeted
          background={primaryColorCampain}
          color={secondaryColorCampain}
          onClick={() => {
            navigate("/campain-menu", {
              replace: true,
              direction: "backward",
            });
          }}
          title="Tiếp Tục"
        />
      </Container>
    </Page>
  );
};

export default CampaignRule;
