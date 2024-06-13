import React from "react";
import { TextAlignType } from "zmp-sdk";
import { Icon, Page, Text } from "zmp-ui";
import { appColors } from "../../constants/appColors";
import { AppFont } from "../../constants/app-font";
interface Props {
  title?: string;
  colorBackground?: string;
  onClickDel?: React.MouseEventHandler<HTMLDivElement>;
  onClickAdd?: React.MouseEventHandler<HTMLDivElement>;
}

const createQuestions = (props: Props) => {
  const { title, colorBackground, onClickDel, onClickAdd } = props;
  return (
    <Page>
      <div className="flex items-center justify-between w-64 h-16 m-2 relative">
        <div
          onClick={onClickDel}
          className="flex items-center justify-center text-center absolute -left-6 bottom-2 transform translate-x-2/4 -translate-y-2/4 font-bold w-7 h-7 rounded-full"
          style={{
            backgroundColor: appColors.secondary,
            color: appColors.primary,
            border: `2px solid ${appColors.primary}`,
          }}
        >
          -
        </div>
        <div className="w-64 h-16">
          <Text
            className="w-full h-full border-4 rounded-full text-center flex items-center justify-center font-bold text-3xl "
            style={{
              borderColor: appColors.primary,
              color: appColors.primary,
              fontFamily: AppFont.SfusouvenirBold,
              display: "flex",
              fontWeight: "bold",
              fontSize: "30px",
              background: appColors.secondary,
            }}
          >
            {title}
          </Text>
        </div>

        <div
          onClick={onClickAdd}
          className="flex items-center justify-center text-center absolute right-1 bottom-2 transform translate-x-2/4 -translate-y-2/4 font-bold w-7 h-7 rounded-full"
          style={{
            backgroundColor: appColors.secondary,
            color: appColors.primary,
            border: `2px solid ${appColors.primary}`,
          }}
        >
          +
        </div>
      </div>
    </Page>
  );
};
export default createQuestions;
