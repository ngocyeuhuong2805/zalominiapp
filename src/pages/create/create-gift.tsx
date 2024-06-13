import React, { useState, useEffect, } from 'react'
import { useParams } from 'react-router-dom';
import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import background from "../../static/images/background.png";
import star from "../../static/icons/star.png"
import edit from "../../static/icons/edit.png"
import edit3 from "../../static/icons/edit3.png"

import TextComponent from '../../components/text/text';
import { Input, Text, Page, useNavigate, useSnackbar } from 'zmp-ui';
import ButtonCompeted from '../../components/button/button-competed';
import Container from '../../components/view/container';

import { appColors } from '../../constants/appColors';
import { gameColorSelector, gameImageBackgroundSelector } from '../../states/selectors/GameEditSelector';
import { gameColorPlaySelector, gamePlaySelector } from '../../states/selectors/GamePlaySelector';
import { getInstructionColor, getPrimaryColor, getSecondaryColor } from '../../utils/getColor';
import { AppFont } from '../../constants/app-font';
import { appFontSize } from '../../constants/appFontSizes';
import { PrizeAddListEditSelector, PrizeListEditDescSelector, PrizeListEditImageUrlSelector, PrizeListEditTitleSelector } from '../../states/selectors/PrizeListEditSelector';
import TextareaRule from '../../components/text/textarea-rule';
import TextareaPrize from '../../components/text/textarea-prize';
import InputOption from '../../components/input/input-option';
import ConfirmModal from '../../components/modals/confirm-modal';
import SelectCampaingRewards from '../../components/selected/select_campaign_rewards';
import AxiosClient from '../../networks/AxiosClient';
import { PrizeListEditAtom } from '../../states/atoms/PrizeListEditAtom';
import { Prize } from '../../models/Prize';
import { bool } from 'prop-types';
import { message } from 'antd';
import { fetchImageBlobs } from '../../networks/FormatImage';
import { chooseImage } from 'zmp-sdk';
import axios from 'axios';





const CreateGift = () => {

  const { index } = useParams<{ index: string }>();
  const indexParams = parseInt(index || "");
  const navigate = useNavigate()
  const { openSnackbar } = useSnackbar();

  const backgroundImageCampain = useRecoilValue(gameImageBackgroundSelector)
  const [color, setColor] = useRecoilState(gameColorSelector);
  const [primaryColorCampain, setPrimaryColorCampain] = useState(getPrimaryColor(color));
  const [secondaryColorCampain, setSecondaryColorCampain] = useState(getSecondaryColor(color));
  const [instructionColorCampain, setInstructionColorCampain] = useState(getInstructionColor(color));

  const present = useRecoilValue(PrizeListEditTitleSelector(index || 'defaultIndex'));
  const [description, setDescription]=useRecoilState( PrizeListEditDescSelector(index || 'defaultIndex'))
  const setTitles = useSetRecoilState( PrizeListEditTitleSelector(index || 'defaultIndex'))
  const [imageGift, setImageGift]= useRecoilState(PrizeListEditImageUrlSelector(index || 'defaultIndex'))

  const [title, setTitle] = useState<string>(present);
  const [image, setImage] = useState<string>(imageGift);
  const [desc, setDesc] = useState<string>(description);
  const length: number = useRecoilValue(PrizeAddListEditSelector).length;

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const gameInstanceId = useRecoilValue(gamePlaySelector).idGameInstant;
  console.log(gameInstanceId);
  

  const prize = useRecoilValue(PrizeListEditAtom)
  const firstPrizeId = prize[indexParams-1 ]?.id  
  console.log(firstPrizeId);
  

  // image


  useEffect(()=> {
    setImage(imageGift);
  },[imageGift])
  
  

  const handlePresent=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setTitle(e.target.value)
  }
  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesc(e.target.value);
  };
  const onClose = () => {
    setConfirmModalVisible(false)
  }
  const handleClick = () => {
    // gọi api create prize
    if (title === "") {
      openSnackbar({
        text: "Chưa nhập cơ cấu giải thưởng",
        type: "error",
      });
      return;
    }
    if (desc === "") {
      openSnackbar({
        text: "Chưa nhập mô tả giải thưởng",
        type: "error",
      });
      return;
    }
    if (indexParams < length) {
      setConfirmModalVisible(true);
    } else {
      setConfirmModalVisible(true);
      navigate("/campaign-config", {
        replace: true,
      });
      
    }
  }
  

  const handleUpdateGift = async () => {
    const quantity = 10
    const quantityString = quantity.toString();
    const imageUrls = [image, /* ... other image URLs */];
    const fieldNames = ['Image'/* ... other field names */];

    const updatePrize = new FormData();
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const fieldName = fieldNames[i];
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`Failed to fetch image from ${url}`);
      }

      const blob = await response.blob();
      const randomNumber = Math.floor(Math.random() * 1000);
      const filename = `${fieldName}_${randomNumber}.png`;
     

      updatePrize.append(fieldName, blob, filename);

  }
  
  updatePrize.append('PrizeId', firstPrizeId);
  updatePrize.append('GameInstantId', gameInstanceId);
  updatePrize.append('Title', title);
  updatePrize.append('Quantity', quantityString);
  updatePrize.append('PriceName', title);
  updatePrize.append('Description', desc);
  
  try {
    const response = await axios({
      method: "post",
      url: `https://gigi.plus:1024/api/GameInstant/UpdatePrize`,
      data: updatePrize,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error while calling updateGift:", error);
    openSnackbar({
      text: "Có lỗi xảy ra khi cập nhật Gift. Vui lòng thử lại sau.",
      type: "error",
    });
  }
  };

const [isUpdating, setIsUpdating] = useState(false);

const onConfirmCreate = async () => {
  if (isUpdating) return;
  setIsUpdating(true);

  try {
    await handleUpdateGift();
    navigate("/create-gift-next" + "/" + (indexParams + 1));
  } catch (error) {
    console.error("Error updating gift:", error);
  } finally {
    setIsUpdating(false);
  }
};

  const openMediaPickerSplash = () => {
    chooseImage({
      sourceType: ["album", "camera"],
      cameraType: "back",
      count: 1,
      success: async ({ filePaths }) => {
        const [file] = filePaths;
        if (filePaths.length > 0) {
          setImage(file);
          console.log("Current Logo:", file);
        }
      },
      fail: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <Page className="splash-background " style={{ backgroundImage: `url(${backgroundImageCampain})`}}>
      <Container center={true}  showHeader={true}>
        <div className='mt-10'>
        <TextComponent color={secondaryColorCampain} fontSize={appFontSize.mainTitle+"px"} font={AppFont.BagelFatOne} title="Cơ Cấu Giải Thưởng" colorStroke={`8px ${primaryColorCampain}`} />
        </div>
        <InputOption value={title} onChange={handlePresent} color={primaryColorCampain} borderColor={primaryColorCampain} background={secondaryColorCampain}/>
        <div className='mt-5 mb-10'>
        <SelectCampaingRewards image={image} show primaryColorCampaign={primaryColorCampain} secondaryColorCampaign={secondaryColorCampain} onClick={openMediaPickerSplash}/>
        </div>
        <ButtonCompeted title="Tiếp Tục" onClick={handleClick} background={primaryColorCampain} color={secondaryColorCampain} />
        <TextareaPrize disabled = {false} onChange={handleContentChange} paddingTop={30}  title={desc} width="100%"  boder='0px' fontSize={appFontSize.small+"px"}  color={primaryColorCampain} background={secondaryColorCampain}
            placeholder='Với khả năng chống nước và chống bụi đạt chuẩn IP672, chiếc loa này có chất lượng tốt từ trong ra ngoài. Chỉ cần đem theo loa đến hồ bơi, bờ
            Với khả năng chống nước và chống bụi đạt chuẩn IP672, chiếc loa này có chất lượng tốt từ trong ra ngoài. Chỉ cần đem theo loa đến hồ bơ' 
        />
      </Container>
      <ConfirmModal visibility={confirmModalVisible} onClose={onClose} onConfirm={onConfirmCreate} title={"Bạn có xác nhận chỉnh sửa"} desc="Bạn có muốn xác nhận chỉnh sửa" />
    </Page>
  )
}
export default CreateGift;
