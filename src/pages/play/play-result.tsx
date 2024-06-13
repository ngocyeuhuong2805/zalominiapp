import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Box, Input, useSnackbar } from "zmp-ui";
import ButtonCompeted from "../../components/button/button-competed";
import ImageViewCustom from "../../components/header/image-view";
import Instruction from "../../components/text/instruction";
import TextComponent from "../../components/text/text";
import Container from "../../components/view/container";
import { AppFont } from "../../constants/app-font";
import { appColors } from "../../constants/appColors";
import { appFontSize } from "../../constants/appFontSizes";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserJoinLuckyNumberSelector } from "../../states/selectors/UserJoinPlaySelector";
import {
  gameImageBrandPlaySelector,
  gameImageBackgroundPlaySelector,
  gameInstantNamePlaySelector,
  gameColorPlaySelector,
} from "../../states/selectors/GamePlaySelector";
import {
  getInstructionColor,
  getPrimaryColor,
  getSecondaryColor,
} from "../../utils/getColor";
import { QuestionListPlayLengthSelector } from "../../states/selectors/QuestionListPlaySelector";

const PlayResult = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const LogoImageCampain: string = useRecoilValue(gameImageBrandPlaySelector);
  const backgroundImageCampain = useRecoilValue(
    gameImageBackgroundPlaySelector
  );
  const titleCampain = useRecoilValue(gameInstantNamePlaySelector);
  const color: string = useRecoilValue(gameColorPlaySelector);
  const [primaryColorCampain, setMainColorCampain] = useState(
    getPrimaryColor(color)
  );
  const [secondaryColorCampain, setTextColorCampain] = useState(
    getSecondaryColor(color)
  );
  const instructionColorCampain = getInstructionColor(color);

  const questionQantity = useRecoilValue(QuestionListPlayLengthSelector);
  const [luckyNumber, setLuckyNumber] = useRecoilState(
    UserJoinLuckyNumberSelector
  );
  const [inputValue, setInputValue] = useState(luckyNumber);

  const changeLuckyNumber = (event) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = () => {
    if (!inputValue) {
      openSnackbar({
        text: "Vui lòng nhập số may mắn",
        type: "error",
      });
      return;
    }
    setLuckyNumber(inputValue);
    navigate("/mission-profile-user");
  };

  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container
        iconColor={primaryColorCampain}
        center={false}
        showHeader={false}
      >
        <ImageViewCustom src={LogoImageCampain} />
        <TextComponent
          title="CHÚC MỪNG"
          fontSize={`${appFontSize.mainTitle}px`}
          color={secondaryColorCampain}
          font="BagelFatOne"
          colorStroke={`10px ${primaryColorCampain}`}
        />
        <Box pb={10} px={10} flex justifyContent="center" alignItems="center">
          <Instruction
            text={
              "Bạn đã hoàn thành " +
              questionQantity +
              " câu hỏi, phần thưởng và kết quả sẽ được thông báo khi kết thúc sự kiện"
            }
            color={instructionColorCampain}
            fontWeight="bold"
            textSize="20px"
            fontFamily={AppFont.QuicksanBold}
            lightHeight={appFontSize.mainTitle + "px"}
          />
        </Box>
        {/* Ensure value is a string */}
        <Input.OTP
          otpLength={3}
          show={true}
          onChange={changeLuckyNumber}
          value={inputValue.toString()}
          defaultValue=""
          style={{
            border: `2px solid ${primaryColorCampain}`,
            borderRadius: "5px",
            backgroundColor: secondaryColorCampain,
          }}
        />
        <Instruction
          text="Chọn số may mắn"
          color={instructionColorCampain}
          fontWeight="bold"
          textSize={appFontSize.small + "px"}
          fontFamily={AppFont.QuicksanBold}
          lightHeight={appFontSize.mainTitle + "px"}
        />
        <Box mb={5}>
          <ButtonCompeted
            background={primaryColorCampain}
            color={secondaryColorCampain}
            title="Xác nhận"
            onClick={handleConfirm}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default PlayResult;
