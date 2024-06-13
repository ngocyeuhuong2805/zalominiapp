import React, { useState } from "react";
import { Page } from "zmp-ui";
import TextComponent from "../../components/text/text";
import { AppFont } from "../../constants/app-font";
import ButtonCompeted from "../../components/button/button-competed";
import { useRecoilState, useRecoilValue } from "recoil";
import { gameColorSelector, gameImageBackgroundSelector, gameImageBranchSelector } from "../../states/selectors/GameEditSelector";
import { getInstructionColor, getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import Container from "../../components/view/container";
import Instruction from "../../components/text/instruction";
import { appFontSize } from "../../constants/appFontSizes";
import MissionView from "../../components/view/mission-view";
import { TaskListEditSelector } from "../../states/selectors/TaskListEditSelector";
import AxiosClient from "../../networks/AxiosClient";
import { gameIdSelector } from "../../states/selectors/GamePlaySelector";
import { message } from "antd";
import { useNavigate } from "react-router";


const CreateMissionsPage = () => {

  const backgroundImageCampain = useRecoilValue(gameImageBackgroundSelector)
  const color: string = useRecoilValue(gameColorSelector)
  const [primaryColorCampain, setMainColorCampain] = useState(getPrimaryColor(color))
  const [secondaryColorCampain, setTextColorCampain] = useState(getSecondaryColor(color))
  const [instructionColorCampain, setInstructionColorCampain] = useState(getInstructionColor(color))
  const [shareQuantity, setShareQuantity] = useState("0")
  const [taskList, setTaskList] = useRecoilState<any>(TaskListEditSelector)

  const gameInstantId = useRecoilValue(gameIdSelector)
  const navigate = useNavigate()

  const onEditShareValue = (edited: boolean, props: { key: string; value: string }[]) => {
    if (edited) {
      setShareQuantity(props[0].value);
    } else {
      setShareQuantity("0");
    }
  }
  const postData = async (data: any) => {
    const modifiedArray = data.map(item => {
      const { title, ...rest } = item; // Lấy giá trị của trường title và giữ lại phần còn lại của đối tượng
      return { ...rest, taskName: title }; // Tạo một đối tượng mới với trường title được đổi tên thành taskName
    });



    const dataUpdate = {
      gameInstantId: gameInstantId,
      tasks: modifiedArray
    }

    try {
      const response: any = await AxiosClient.post('/GameInstant/UpdateTask', dataUpdate);
      response?.data ?
        message.success('Cập nhật thành công')
        : message.warning((response?.message || 'Có lỗi xảy ra'))

    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };

  const handleUpdateTask = ({ key, value, title, brandUri }: any) => {
    if (value == "" || title == "") {
      message.warning("Vui lòng điền đầy đủ thông tin !")
    }

    else {
      const updatedTaskList = taskList.map((task, index) =>
        index === key ? { ...task, quantityRequire: value, title: title, brandUri: brandUri } : task
      );

      postData(updatedTaskList);
      setTaskList(updatedTaskList);
    }

  }


  const navigateMenu = () => {
    navigate('/campain-menu')
  }
  console.log(taskList)

  return (
    <Page className="splash-background" style={{ backgroundImage: `url(${backgroundImageCampain})`, }}>
      <Container center={true} showHeader={true}>
        <TextComponent
          title={"Nhiệm vụ nhận thưởng"}
          font={AppFont.BagelFatOne}
          color="white"
          fontSize="35px"
          colorStroke={"15px " + primaryColorCampain}
        />
        {/* Thêm nhiệm vụ */}
        <Instruction
          text="Chọn nhiệm vụ"
          fontWeight='bold'
          textSize={`${appFontSize.mainTitle}px`}
          color={primaryColorCampain}
        />
        {taskList?.map((item: any, index: number) => (
          <MissionView
            key={item?.id}
            initialLabel={item?.title}
            initialColor={primaryColorCampain}
            onEditedColor={secondaryColorCampain}
            onChangeInfo={onEditShareValue}
            editList={[{ key: item?.type, label: item?.title, value: item?.quantityRequire, brandUri: item?.oaId }]}
            handleUpdateTask={handleUpdateTask}
            width={"w-80"}
            editModal={true}
            data={item}
            index={index}

          />
        ))}
        <ButtonCompeted title="Xác nhận"
          onClick={navigateMenu}
          color={secondaryColorCampain} background={primaryColorCampain} />
        <Instruction
          color={instructionColorCampain}
          text="Bấm vào để chọn nhiệm vụ"
        />
      </Container>
    </Page>
  );
};

export default CreateMissionsPage;

