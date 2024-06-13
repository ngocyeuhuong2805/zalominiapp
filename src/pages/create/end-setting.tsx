import React, { useState, useRef, useEffect } from "react";
import {
  Page,
  useNavigate,
} from "zmp-ui";
import TextComponent from "../../components/text/text";
import ButtonCompeted from "../../components/button/button-competed";
import { useRecoilValue } from "recoil";
import { gameColorPlaySelector, gameIdSelector, gameImageBackgroundCampaignPlaySelector, gameImageBackgroundPlaySelector, gameImageBrandPlaySelector, gameInstantNamePlaySelector } from "../../states/selectors/GamePlaySelector";
import { getInstructionColor, getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import Container from "../../components/view/container";
import TextCopyView from "../../components/text/text-copy";
import { appFontSize } from "../../constants/appFontSizes";
import Instruction from "../../components/text/instruction";
import ButtonLogo from "../../components/button/button-logo";
import ZaloIcon from "../../static/svg/icons/ZaloIcon";
import { openShareSheet } from "zmp-sdk";
import QrIcon from "../../static/svg/icons/QrIcon";
import { getAppInfo } from "zmp-sdk/apis";

const EndSettingPage = () => {
  const LogoImageCampain: string = useRecoilValue(gameImageBrandPlaySelector)
  const backgroundImageCampain = useRecoilValue(gameImageBackgroundPlaySelector)
  const idGameInstant = useRecoilValue(gameIdSelector)//Thay recoil cho id
  const backgroundImageSplash = useRecoilValue(gameImageBackgroundCampaignPlaySelector)
  const color: string = useRecoilValue(gameColorPlaySelector)
  const [primaryColorCampain, setMainColorCampain] = useState(getPrimaryColor(color))
  const [secondaryColorCampain, setTextColorCampain] = useState(getSecondaryColor(color))
  const [intructionColorCampain, setInstructionColorCampain] = useState(getInstructionColor(color))
  const [deepLink, setDeppLink] = useState<string>("")
  const navigate = useNavigate();

  const navOptions: any = {
    replace: true,
    direction: 'backward'
  }
  const handleContinue = () => {
    navigate('/campain-menu', navOptions);
  };
  const onZaloClick = () => {
    openShareSheet({
      type: "link",
      data: {
        link: "http://news.zing.vn/Trung-uong-quyet-dinh-phuong-an-nhan-su-cap-cao-post632739.html",
        chatOnly: false
      },
      success: (data) => { },
      fail: (err) => { }
    });
  };

  const onQrClick = () => {
    openShareSheet({
      type: "link",
      data: {
        link: "http://news.zing.vn/Trung-uong-quyet-dinh-phuong-an-nhan-su-cap-cao-post632739.html",
        chatOnly: false
      },
      success: (data) => {
        
      },
      fail: (err) => { }
    });
  };

  const getInfo = async () => {
    try {
      const { appUrl } = await getAppInfo({});
      setDeppLink(appUrl)
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  useEffect(() => {
    getInfo()
  }, [])

  const handlePlay = () => {
    const url = `/campain-splash?$id=${idGameInstant}&` +
      `imageBackgroundCampaign=${backgroundImageSplash}&imageBranch=${LogoImageCampain}`;
    navigate(url, {
      replace: true,
      direction: 'forward'
    });
  };

  return (
    <Page className="splash-background" style={{ backgroundImage: `url(${backgroundImageCampain})`, }}>
      <Container center={true} showHeader={true}>
        <TextComponent boderColor={primaryColorCampain} color={secondaryColorCampain} fontSize="35px" font="BagelFatOne" title="Bạn đã hoàn thành tạo game!" fontWeight="400" colorStroke={"15px " + primaryColorCampain} />
        <div className="flex flex-row gap-5">
          <ButtonLogo onClick={onZaloClick}><ZaloIcon /></ButtonLogo>
          <ButtonLogo onClick={onQrClick}><QrIcon /></ButtonLogo>
        </div>
        <Instruction text="Mời bạn quảng bá game" fontWeight='bold' textSize={`${appFontSize.normal}px`} color={primaryColorCampain} />
        <TextCopyView text={deepLink + '?appId=' + idGameInstant} borderColor={primaryColorCampain} iconColor={primaryColorCampain} />
        <ButtonCompeted title="Chơi thử" onClick={handlePlay} color={secondaryColorCampain} background={primaryColorCampain} />
        <ButtonCompeted title="Về trang chủ" onClick={handleContinue} color={secondaryColorCampain} background={primaryColorCampain} />
      </Container>
    </Page>
  );
};

export default EndSettingPage;

