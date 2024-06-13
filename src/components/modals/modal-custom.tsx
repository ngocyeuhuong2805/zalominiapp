import React, { useState } from "react";
import { Modal, Box, Button, useNavigate } from "zmp-ui";
import { appColors } from "../../constants/appColors";
import { AppFont } from "../../constants/app-font";
import ButtonCompeted from "../button/button-competed";
import {
  EDIT_ANSWER_TRUE,
  EDIT_ANSWER_QUESTION,
  EDIT_QUESTION_TEXT,
} from "./lable-type";
import InputOption from "../input/input-option";
import EditQuestion from "../input/edit-question";

interface Props {
  title: string;
  modalVisible?: boolean;
  onClose: () => void;
  plans?: string[];
  selectedItem?: number | null;
  onConfirm?: () => void;
  onItemClick?: (item: string, index: number) => void;
  label:
    | typeof EDIT_ANSWER_TRUE
    | typeof EDIT_ANSWER_QUESTION
    | typeof EDIT_QUESTION_TEXT;
  value?: string;
  onchangeValue?: (value: string) => void;
  colorGame,
  colorText,
}

const ModalCustomComponent: React.FC<Props> = ({
  modalVisible,
  onClose,
  onConfirm,
  onItemClick,
  selectedItem,
  plans,
  label,
  title,
  value,
  onchangeValue,
  colorGame,
  colorText
}) => {
  const handleModalItemClick = (item: string, index: number) => {
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  const handleChangeValue = (e) => {
    if (onchangeValue) {
      onchangeValue(e);
    }
  };

  return (
    <>
      {label === EDIT_ANSWER_TRUE ? (
        <Modal
          visible={modalVisible}
          title="Chọn đáp án đúng"
          onClose={onClose}
          verticalActions
        >
          <Box p={6}>
            <div className="grid grid-cols-1 gap-5 ">
              {plans &&
                plans.map((item, index) => (
                  <div
                    key={index}
                    className="h-14 border-4 rounded-full flex justify-center items-center cursor-pointer"
                    style={{
                      borderColor:
                        selectedItem === index
                          ? colorGame
                          : colorGame,
                      backgroundColor:
                        selectedItem === index
                          ? colorGame
                          : "transparent",
                      color:
                        selectedItem === index ? colorText : colorGame,
                      fontFamily: AppFont.QuicksanSemibold,
                    }}
                    onClick={() => {
                      handleModalItemClick(item, index);
                    }}
                  >
                    <span>{item}</span>
                  </div>
                ))}
            </div>
            <div className=" flex mt-5 justify-center">
              <ButtonCompeted color={colorText} background={colorGame} title="Xác nhận" onClick={onConfirm} />
            </div>
          </Box>
        </Modal>
      ) : label === EDIT_ANSWER_QUESTION ? (
        <Modal
          visible={modalVisible}
          title={title}
          onClose={onClose}
          verticalActions
        >
          <Box pb={2}>
            <div className="flex mt-5 justify-center">
              <InputOption
                value={value}
                onChange={(e) => {
                  handleChangeValue(e.target.value);
                }}
                add={false}
                color={colorGame}
                borderColor={colorGame}
              />
            </div>
            <div className=" flex mt-5 justify-center">
            <ButtonCompeted color={colorText} background={colorGame} title="Xác nhận" onClick={onConfirm} />
            </div>
          </Box>
        </Modal>
      ) : (
        <Modal
          visible={modalVisible}
          title={title}
          onClose={onClose}
          verticalActions
        >
          <Box pb={2}>
            <EditQuestion
              value={value}
              onChange={(e) => {
                handleChangeValue(e.target.value);
              }}
              colorBorder={colorGame}
              color={colorGame}
            />
            <div className=" flex mt-5 justify-center">
            <ButtonCompeted color={colorText} background={colorGame} title="Xác nhận" onClick={onConfirm} />
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ModalCustomComponent;
