import React, { useEffect, useState } from "react";
import { Button, Page, useSnackbar } from "zmp-ui";
import { useNavigate } from "react-router";
import ButtonCompeted from "../../components/button/button-competed";
import Container from "../../components/view/container";
import { appColors } from "../../constants/appColors";
import TextComponent from "../../components/text/text";
import { appFontSize } from "../../constants/appFontSizes";
import { AppFont } from "../../constants/app-font";
import Instruction from "../../components/text/instruction";
import { gameColorPlaySelector, gameImageBackgroundPlaySelector, gameImageBrandPlaySelector, gameInstantNamePlaySelector } from "../../states/selectors/GamePlaySelector";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getInstructionColor, getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import { UserJoinPhoneNumberReceiverSelector } from "../../states/selectors/UserJoinPlaySelector";
import ImageViewCustom from "../../components/header/image-view";
import { gameColorSelector, gameImageBackgroundSelector } from "../../states/selectors/GameEditSelector";

const CampaignAddPhone = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const LogoImageCampain: string = useRecoilValue(gameImageBrandPlaySelector)

  const titleCampain = useRecoilValue(gameInstantNamePlaySelector)
  const backgroundImageCampain = useRecoilValue(gameImageBackgroundPlaySelector || 'images/background-main-app.jpg')
  const color: string = useRecoilValue(gameColorPlaySelector)
  const [primaryColorCampain, setPrimaryColorCampain] = useState(getPrimaryColor(color))
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(getSecondaryColor(color))
  const instructionColorCampain = getInstructionColor(color);

  
  
  const [valuePhone, setValuePhone] = useState("");
  const [valueAddress, setValueAddress] = useState("");
  const setPhone = useSetRecoilState(UserJoinPhoneNumberReceiverSelector)
 

    const handelContinue = () => {
      if(!valuePhone){
        openSnackbar({
          text: "Vui lòng nhập số điện thoại",
          type: "error",
        });
        return;
      }
      if(!valueAddress){
        openSnackbar({
          text: "Vui lòng nhập địa chỉ",
          type: "error",
        });
        return;
      }
      const phoneRegex = /^(0|84)(2(0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|4[0-9]|5[124-9]|6[0-39]|7[0-7]|8[0-9]|9[0-47-9])|3[2-9]|5[5689]|7[06789]|8[0-689]|9[0-46-9])([0-9]{7})$/;
      if (!phoneRegex.test(valuePhone)) {
        openSnackbar({
          text: "Số điện thoại không hợp lệ",
          type: "error",
        });
        return;
      }
      setPhone(valuePhone);
      navigate("/campaign-congratulations");
    };

    const onchangePhone = (value: string) => {
      setValuePhone(value)
    }
    const onchangeAddress = (value: string) => {
      setValueAddress(value)
    }

  return (
    <Page
      className="splash-background" style={{ backgroundImage: `url(${backgroundImageCampain})`}}
    >
      <Container center={false} showHeader={true}>
      <ImageViewCustom src={LogoImageCampain} />

        <TextComponent
          fontSize={appFontSize.mainTitle+"px"}
          font={AppFont.BagelFatOne}
          title={"Chỉ một bước nữa thôi"}
          color={secondaryColorCampain}
          colorStroke={"6px" + primaryColorCampain}
        />
        <Instruction
          text="Vui lòng nhập số điện thoại và địa chỉ để nhận thưởng"
          color={instructionColorCampain}
          fontWeight="bold"
        ></Instruction>
        <div className="text-center w-[90%] m-auto">
          <input
            onChange={(e) => {
              onchangePhone(e.target.value);
            }}
            className="w-full h-14 rounded-3xl text-xl font-bold text-center my-5"
            placeholder="Nhập số điện thoại"
            style={{
              background:primaryColorCampain,
              color:secondaryColorCampain,
              fontFamily: AppFont.QuicksanRegular,
            }}
          ></input>
          <input
            onChange={(e) => {
              onchangeAddress(e.target.value);
            }}
            className="w-full h-14 rounded-3xl text-xl font-bold text-center my-5"
            placeholder="Nhập địa chỉ"
            style={{
              background:primaryColorCampain,
              color:secondaryColorCampain,
              fontFamily: AppFont.QuicksanRegular,
            }}
          ></input>
        </div>
        <ButtonCompeted background={primaryColorCampain} color={secondaryColorCampain} title="Tiếp tục" onClick={() => {handelContinue()}} />
      </Container>
    </Page>
  );
};

export default CampaignAddPhone;
