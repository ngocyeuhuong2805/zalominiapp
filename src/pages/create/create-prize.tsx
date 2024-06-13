import React, { useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { Page, useSnackbar } from "zmp-ui";
import Container from "../../components/view/container";
import TextComponent from "../../components/text/text";
import { gameColorSelector, gameImageBackgroundSelector } from "../../states/selectors/GameEditSelector";
import { gameColorPlaySelector, gamePlaySelector } from "../../states/selectors/GamePlaySelector";
import { getInstructionColor, getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import { appFontSize } from "../../constants/appFontSizes";
import { AppFont } from "../../constants/app-font";
import InputOption from "../../components/input/input-option";
import { Prize } from "../../models/Prize";
import { PrizeAddListEditSelector } from "../../states/selectors/PrizeListEditSelector";
import ButtonCompeted from "../../components/button/button-competed";
import { AddPrizeListSelector } from "../../states/selectors/PrizeListEditSelector";
import { PrizeListEditAtom } from "../../states/atoms/PrizeListEditAtom";
import AxiosClient from "../../networks/AxiosClient";
import ConfirmModal from "../../components/modals/confirm-modal";

const CreatePrize = () => {
 
  const navigate = useNavigate();
  const lastQuestionRef = useRef<HTMLDivElement>(null);
  const { openSnackbar } = useSnackbar();

  const backgroundImageCampain = useRecoilValue(gameImageBackgroundSelector);
  const [color, setColor] = useRecoilState(gameColorSelector);
  const [primaryColorCampain, setPrimaryColorCampain] = useState(getPrimaryColor(color));
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(getSecondaryColor(color));
  const [instructionColorCampain, setInstructionColorCampain] = useState(getInstructionColor(color));

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);


  const [numberOfPrize, SetNumberOfPrize] = useRecoilState(PrizeAddListEditSelector);
  console.log(numberOfPrize);
  
  const prizeIndex =  numberOfPrize.length - 1
  const prizeId = numberOfPrize[prizeIndex].id
  const numbers = Array.from({ length: numberOfPrize.length }, (_, i) => i + 1);
  const gameInstanceId = useRecoilValue(gamePlaySelector).idGameInstant;
  const [index, setIndex] = useState<number[]>(numbers);
  const [titles, setTitles] = useState<string[]>(numberOfPrize.map((n) => n.title)); // Array to store titles for each input
  const [Prizes, setPrizes] = useState<Prize[]>([]);

  
  
 

  const addPrize = useSetRecoilState(AddPrizeListSelector)

  useEffect(() => {
    const prizes = index.map((i, idx) => {
      const nextPrize = numberOfPrize[idx];
      return {
        id: i.toString(),
        title: titles[idx],
        quantity: 0,
        desc: nextPrize ? nextPrize.desc || "" : "",
        imageUrl: nextPrize ? nextPrize.imageUrl || "" : "",
        priceName:nextPrize? nextPrize.priceName|| "":"",
      };
    });
    
    setPrizes(prizes);
    SetNumberOfPrize(prizes); // Update Recoil state with new prizes
  }, [titles]);
  
  
  const handleContinue = () => {
    navigate('/create-gift/1');
  };
  
  const handleDeletePrize = (indexToDelete: number) => {
    if (index.length > 1) {
      setConfirmModalVisible(true)
      setIndex(prevIndex => prevIndex.filter(i => i !== indexToDelete));
      setTitles(prevTitles => prevTitles.filter((_, i) => i !== indexToDelete));
      
    }else{
      console.log("Không thể xóa");
    }
  }

  const handleTitlePrize = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const newTitles = [...titles];
    newTitles[idx] = e.target.value;
    setTitles(newTitles);
    
  }
  const onClose = () => {
    setConfirmModalVisible(false)
  }

  const onConfirmCreate = () => {
    handleDeletePrizeList();
    setConfirmModalVisible(false)
  }
  const handleNavigate = () => {
    // const allTitlesFilled = titles.every(title => title.trim() !== ""); // Check if every title is filled
    if (!titles) {
      openSnackbar({
        text: "Vui lòng điền đủ thông tin giải thưởng",
        type: "error",
      });
      return;
    } else {
      navigate('/create-gift/1', {
        replace: true
      })
      // Navigate if all titles are filled
     
    }
  }
  const handleDeletePrizeList = () => {
      AxiosClient.post(`/GameInstant/DeletePrize?gameInstantId=${gameInstanceId}&prizeId=${prizeId}`, {
    })
    .then((response):any => {
     if(response?.data == ""){
      console.log("Detete Prize Error");
     }else{
      console.log("Xóa giải thưởng thành công");
      const updatePrize = [...numberOfPrize];
      updatePrize.pop();
      SetNumberOfPrize(updatePrize);
     }
      
      // Xử lý phản hồi thành công
      console.log('Xóa giải thưởng thành công:', response.data);
    })
    .catch(error => {

      // Xử lý lỗi
      console.error('Lỗi xóa giải thưởng:', error);
    });
  };

  useEffect(() => {
    if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [index]);

  

  return (
    <Page className="splash-background" style={{ backgroundImage: `url(${backgroundImageCampain})` }}>
      <Container center={true}>
        <TextComponent
          boderColor={primaryColorCampain}
          color={secondaryColorCampain}
          fontSize={appFontSize.mainTitle + "px"}
          font={AppFont.BagelFatOne}
          title="Cơ Cấu Giải Thưởng"
          fontWeight="400"
          colorStroke={`8px ${primaryColorCampain}`}
        />

        <div className="w-full max-h-96 overflow-y-auto flex flex-col justify-center items-center ">
          {index.map((i, idx) => (
            <div key={i} ref={i === index.length ? lastQuestionRef : null} className="flex items-center justify-between w-64 h-16 relative m-2">
              <InputOption
                borderColor={titles[idx] ? primaryColorCampain : primaryColorCampain}
                background={titles[idx] ? secondaryColorCampain : secondaryColorCampain}
                color={titles[idx] ? primaryColorCampain : primaryColorCampain}
                onClickDel={() => handleDeletePrize(i)}
                remove={idx === index.length - 1}
                value={titles[idx]}
                onChange={(e) => handleTitlePrize(e, idx)}
                add={idx === index.length - 1}
                onClickAdd={() => {
                  setIndex(prevIndex => [...prevIndex, prevIndex.length + 1]);
                  setTitles(prevTitles => [...prevTitles, ""]);
                }}
                placeholder="Nhập cơ cấu giải thưởng"
                fontSize="17px"
              />
            </div>
          ))}
        </div>
        <ButtonCompeted onClick={handleNavigate} title="Xác nhận" background={primaryColorCampain} color={secondaryColorCampain} />
      </Container>
      <ConfirmModal visibility={confirmModalVisible} onClose={onClose} onConfirm={onConfirmCreate} title={"Bạn có xác nhận muốn xóa"} desc="Bạn có muốn xác nhận chỉnh sửa" />
    </Page>
  );
}

export default CreatePrize;
