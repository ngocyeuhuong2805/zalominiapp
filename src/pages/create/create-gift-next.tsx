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
import InputOption from '../../components/input/input-option';
import TextareaPrize from '../../components/text/textarea-prize';
import ConfirmModal from '../../components/modals/confirm-modal';
import SelectCampaingRewards from '../../components/selected/select_campaign_rewards';
import { PrizeListEditAtom } from '../../states/atoms/PrizeListEditAtom';
import AxiosClient from '../../networks/AxiosClient';
import { message } from 'antd';



const CreateGiftNext = () => {

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
  const setTitles=useSetRecoilState( PrizeListEditTitleSelector(index || 'defaultIndex'))
  const [imageGift, setImageGift]=useRecoilState(PrizeListEditImageUrlSelector(index || 'defaultIndex'))

  const [title, setTitle] = useState<string>(present);
  const [image, setImage] = useState<string>(imageGift);
  const [desc, setDesc] = useState<string>(description);
  const length: number = useRecoilValue(PrizeAddListEditSelector).length;

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);


  const gameInstanceId = useRecoilValue(gamePlaySelector).idGameInstant;

  const prize = useRecoilValue(PrizeListEditAtom)
  const firstPrizeId = prize[indexParams]?.id

  
  

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
    if (indexParams === length) {
      setConfirmModalVisible(true);
    } else {
      navigate("/create-gift" + "/" + (indexParams + 1));
    }
  }
const [isUpdating, setIsUpdating] = useState(false);

const onConfirmCreate = async () => {
  if (isUpdating) return;
  setIsUpdating(true);

  try {
    await handleUpdateGift();
    navigate("/campaign-config", {
      replace: true,
    });
  } catch (error) {
    console.error("Error updating gift:", error);
  } finally {
    setIsUpdating(false);
  }
};

  
  const quantity = 0
  const handleUpdateGift = async () => {
    const dataUpdate = {
      prizeId: firstPrizeId,
      gameInstanceId: gameInstanceId,
      title: title,
      quantity: quantity,
      image: image,
      priceName: title,
      description: desc
    };
  
    try {
      const response: any = await AxiosClient.post('/GameInstant/UpdatePrize', dataUpdate);
      if (response?.data) {
        message.success('Cập nhật thành công');
        setDescription(desc)
        setImageGift(image)
        setTitles(title)
      } else {
        message.warning(response?.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };

  const openMediaPickerSplash = () => {
    openSnackbar({
      text: "Thành công",
      action: {
        text: "Đã chọn thưởng chiến dịch",
        close: true
      },
      duration: 2000
    });
    setImage("https://i.ibb.co/kMY3QkF/il-570x-N-4905100063-fykj.webp")
  }

  return (
    <Page className="splash-background" style={{ backgroundImage: `url(${backgroundImageCampain})`}}>
      <Container center={false}  showHeader={true}>
        <TextComponent color={secondaryColorCampain} fontSize={appFontSize.mainTitle+"px"} font={AppFont.BagelFatOne} title="Cơ Cấu Giải Thưởng" colorStroke={`8px ${primaryColorCampain}`} />
        <InputOption value={title} onChange={handlePresent} color={primaryColorCampain} borderColor={primaryColorCampain} background={secondaryColorCampain}/>
        <div className='mt-5 mb-10'>
        <SelectCampaingRewards image={image} show primaryColorCampaign={primaryColorCampain} secondaryColorCampaign={secondaryColorCampain} onClick={openMediaPickerSplash}/>
        </div>
        <ButtonCompeted title="Tiếp Tục" onClick={handleClick} background={primaryColorCampain} color={secondaryColorCampain} />
        <TextareaPrize disabled = {false}   onChange={handleContentChange} paddingTop={40}  title={desc} width='100%'   boder='0px' fontSize={appFontSize.small+"px"}  color={primaryColorCampain} background={secondaryColorCampain}
            placeholder='Với khả năng chống nước và chống bụi đạt chuẩn IP672, chiếc loa này có chất lượng tốt từ trong ra ngoài. Chỉ cần đem theo loa đến hồ bơi, bờ
            Với khả năng chống nước và chống bụi đạt chuẩn IP672, chiếc loa này có chất lượng tốt từ trong ra ngoài. Chỉ cần đem theo loa đến hồ bơ' 
        />
      </Container>
      <ConfirmModal visibility={confirmModalVisible} onClose={onClose} onConfirm={onConfirmCreate} title={"Bạn có xác nhận chỉnh sửa"} desc="Bạn có muốn xác nhận chỉnh sửa" />
    </Page>
  )
}
export default CreateGiftNext;
