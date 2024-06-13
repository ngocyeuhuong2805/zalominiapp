import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Page, useNavigate, useSnackbar } from 'zmp-ui';
import TextComponent from '../../components/text/text';
import ButtonCompeted from '../../components/button/button-competed';
import Container from '../../components/view/container';
import { AppFont } from '../../constants/app-font';
import ChooseDate from '../../components/date/choose-date';
import { gameCloseTimeSelector, gameColorSelector, gameDescPolicySelector, gameEditNameSelector, gameImageBackgroundSelector, gameOpenTimeSelector } from '../../states/selectors/GameEditSelector';
import TextareaRule from '../../components/text/textarea-rule';
import { appFontSize } from '../../constants/appFontSizes';
import Instruction from '../../components/text/instruction';
import { getInstructionColor, getPrimaryColor, getSecondaryColor } from '../../utils/getColor';
import { convertToISOFormat, convertToVienFormat } from '../../utils/getDate';
import dayjs from 'dayjs';
import { PrizeAddListEditSelector } from '../../states/selectors/PrizeListEditSelector';
import ApiNetWork from '../../networks/ApiConFig';
import { gamePlaySelector } from '../../states/selectors/GamePlaySelector';
import AxiosClient from '../../networks/AxiosClient';
import { gameEditSelector } from '../../states/selectors/GameEditSelector';
import { PrizeListEditAtom } from '../../states/atoms/PrizeListEditAtom';
import { message } from 'antd';

const CreateRule: React.FunctionComponent = () => {
  const { openSnackbar, setDownloadProgress, closeSnackbar } = useSnackbar();

  const backgroundImageCampain = useRecoilValue(gameImageBackgroundSelector);
  const [titleCampain, setTitleCampain] = useRecoilState(gameEditNameSelector);
  const [color, setColor] = useRecoilState(gameColorSelector);
  const [primaryColorCampain, setPrimaryColorCampain] = useState(getPrimaryColor(color));
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(getSecondaryColor(color));
  const [instructionColorCampain, setInstructionColorCampain] = useState(getInstructionColor(color));

  const [nameContentGame, setNameContentGame] = useRecoilState(gameDescPolicySelector);

  
  const [description, setDescription] = useState(nameContentGame);
  //date
  const [nameStartDate, setNameStartDate] = useRecoilState(gameOpenTimeSelector);
  const [nameEndDate, setNameEndDate] = useRecoilState(gameCloseTimeSelector);
  const [startDate, setStartDate] = useState(new Date(nameStartDate));
  

  
  const [gameInstantEdit, setGameInstantEdit] = useRecoilState(gameEditSelector)
  const [gameInstantPlay, setGameInstantPlay] = useRecoilState(gamePlaySelector)
  

  
  const [endDate, setEndDate] = useState(new Date(nameEndDate));

  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [isEndDateSelected, setIsEndDateSelected] = useState(false);
  //
  const gameInstanceId = useRecoilValue(gamePlaySelector).idGameInstant;
  console.log(gameInstanceId);
  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);
  const checkContentGame = () => {
    if (description === "") {
      openSnackbar({
        text: "Thất bại",
        action: {
          text: "Chưa nhập thể lệ",
          close: true
        },
        duration: 2000
      });
      return;
    }

    // if (!isStartDateSelected || !isEndDateSelected) {
    //   openSnackbar({
    //     text: "Thất bại",
    //     action: {
    //       text: "Vui lòng chọn ngày!",
    //       close: true
    //     },
    //     duration: 2000
    //   });
    //   return;
    // }



    openSnackbar({
      text: "Thành công",
      action: {
        text: "Đã nhập thể lệ",
        close: true
      },
      duration: 2000
    });
    callApiUpdateNameContentGameConfig();
    navigate("/create-prize");
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleStartDateChange = (newStartDate: Date) => {
    const localStartDate = new Date(newStartDate.getTime() - (newStartDate.getTimezoneOffset() * 60000));
    const startDateString = localStartDate.toISOString();
    setNameStartDate(startDateString.slice(0, 10));
    setIsStartDateSelected(true);
  };

  const handleEndDateChange = (newEndDate: Date) => {
    const localEndDate = new Date(newEndDate.getTime() - (newEndDate.getTimezoneOffset() * 60000));
    const endDateString = localEndDate.toISOString();
    setNameEndDate(endDateString.slice(0, 10));
    setIsEndDateSelected(true);
  };
  

  const totalCanJoin = 0

  const callApiUpdateNameContentGameConfig = async () => {
    const dataUpdate = {
      gameInstantId: gameInstanceId,
      description: description,
      openTime: nameStartDate,
      closeTime: nameEndDate,
      totalCanJoin: totalCanJoin
    };
  
    try {
      const response: any = await AxiosClient.post('/GameInstant/UpdatePolicy', dataUpdate);
      if (response?.data) {
        message.success('Cập nhật thành công');
        setNameContentGame(description);
        setStartDate(startDate);
        setEndDate(endDate);
      } else {
        message.warning(response?.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };

  

  

  return (
    <Page className="splash-background" style={{ backgroundImage: `url(${backgroundImageCampain})` }}>
      <Container>
        <TextComponent
          color={secondaryColorCampain}
          fontSize={`${appFontSize.mainTitle}px`}
          font={AppFont.BagelFatOne}
          title="Thể lệ chương trình"
          colorStroke={`6px ${primaryColorCampain}`}
        />
        <TextareaRule
          placeholder='Thể lệ chương trình....'
          fontSize={`${appFontSize.small}px`}
          color={primaryColorCampain}
          onChange={handleContentChange}
          title={description}
          boderColor={primaryColorCampain}
        />
        <Instruction
          text="Thời gian chương trình"
          fontWeight='bold'
          textSize={`${appFontSize.mainTitle}px`}
          color={primaryColorCampain}
        />
        <Instruction
          text="Bấm vào để sửa ngày"
          fontWeight='bold'
          color={instructionColorCampain}
        />
        <ChooseDate
          title='Start Date'
          value={startDate}
          onChange={handleStartDateChange}
        />

        <ChooseDate
          title='End Date'
          onChange={handleEndDateChange}
          value={endDate}
        />
        <ButtonCompeted
          onClick={checkContentGame}
          title="Tiếp Tục"
          background={primaryColorCampain}
          color={secondaryColorCampain}
        />
      </Container>
    </Page>
  );
}

export default CreateRule;