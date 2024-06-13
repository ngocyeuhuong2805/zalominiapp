import React from "react";
import { Icon, Page, Text } from "zmp-ui";
import { appColors } from "../../constants/appColors";
import { AppFont } from "../../constants/app-font";
interface Props {
  title?: string;
  colorBackground?: string;
  colorGame?: string;
  colorText?: string;
  remove?: boolean;
  add?: boolean;
  onClickDel?: React.MouseEventHandler<HTMLDivElement>;
  onClickAdd?: React.MouseEventHandler<HTMLDivElement>;
  onclickEdit?: () => void;
  type?: "ADD_QUESTION" | "ADD_ANSWER" ;
  onItemClicked?: () => void;
}

const NumberQuestions = (props: Props) => {
  const { title, colorBackground, remove, add, onClickDel, onClickAdd,onclickEdit,onItemClicked,colorGame,colorText, type } =
    props;
  return (
    <>
      {type === "ADD_QUESTION" ? (
        <div className="relative">
          {remove && (
            <div
              onClick={onClickDel}
              className="flex items-center justify-center text-center absolute -left-6 bottom-1 transform translate-x-2/4 -translate-y-2/4 font-bold w-7 h-7 rounded-full"
              style={{
                backgroundColor: appColors.secondary,
                color: colorGame,
                border: `2px solid ${colorGame}`,
              }}
            >
              -
            </div>
          )}
          <div className="w-64 h-16" onClick={onItemClicked}>
            <Text
              className="w-full h-full border-4 rounded-full text-center flex items-center justify-center font-bold text-3xl "
              style={{
                borderColor: colorGame,
                color: colorText,
                fontFamily: AppFont.SfusouvenirBold,
                display: "flex",
                fontWeight: "bold",
                fontSize: "30px",
                background: colorBackground,
              }}
            >
              {title}
            </Text>
          </div>

          {add && (
            <div
              onClick={onClickAdd}
              className="flex items-center justify-center text-center absolute right-1 bottom-1 transform translate-x-2/4 -translate-y-2/4 font-bold w-7 h-7 rounded-full"
              style={{
                backgroundColor: appColors.secondary,
                color: colorGame,
                border: `2px solid ${colorGame}`,
              }}
            >
              +
            </div>
          )}
        </div>
      ) :type === "ADD_ANSWER" ?  (
        <div className="relative">
          {remove && (
            <div
              onClick={onClickDel}
              className="flex items-center justify-center text-center absolute -left-6 bottom-1 transform translate-x-2/4 -translate-y-2/4 font-bold w-6 h-6 rounded-full"
              style={{
                backgroundColor: appColors.secondary,
                color:colorGame,
                border: `2px solid ${colorGame}`,
              }}
            >
              -
            </div>
          )}
          <div className="w-40 h-14 ">
            <div
              className={
                " bg-white w-40 h-auto border-2 rounded-[30px] flex justify-center items-center overflow-hidden QuicksanRegular"
              }
              style={{
                borderColor: colorBackground
                  ? colorBackground
                  : appColors.primary,
              }}
            >
              <div onClick={onclickEdit} className="w-32 h-14  flex justify-center items-center p-1">
                <span
                  className="text-center line-clamp-2 text-[20px]"
                  style={{
                    color: colorBackground
                      ? colorBackground
                      : appColors.primary,
                    fontFamily: AppFont.QuicksanSemibold,
                  }}
                >
                  {title ? title : "Nhập đáp án"}
                </span>
              </div>
              <div className="flex justify-center items-center mr-3">
                <Icon
                  className="hover:opacity-70"
                  style={{
                    color: colorBackground
                      ? colorBackground
                      : appColors.primary,
                      
                  }}
                  icon="zi-edit-solid"
                ></Icon>
              </div>
            </div>
          </div>

          {add && (
            <div
              onClick={onClickAdd}
              className="flex items-center justify-center text-center absolute right-1 bottom-1 transform translate-x-2/4 -translate-y-2/4 font-bold w-6 h-6 rounded-full"
              style={{
                backgroundColor: appColors.secondary,
                color: colorGame,
                border: `2px solid ${colorGame}`,
              }}
            >
              +
            </div>
          )}
        </div>
      ): null}
    </>
  );
};
export default NumberQuestions;
