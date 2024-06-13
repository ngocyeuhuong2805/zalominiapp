import { appTheme } from "../constants/app-theme";
import { appColors } from "../constants/appColors";

//Nhập theme màu vào và lấy ra màu phụ thường dùng cho text trên màu chính
export const getSecondaryColor = (colorTheme: string) => {
  switch (colorTheme.toLowerCase()) {
    case appTheme.themeList[0].value:
      return '#FFFFFF';
    case appTheme.themeList[1].value:
      return '#FFFFFF';
    case appTheme.themeList[2].value:
      return '#FFFFFF';
    case appTheme.themeList[3].value:
      return '#FFFFFF';
    case appTheme.themeList[4].value:
      return '#FFFFFF';
    default:
      return appColors.secondary;
  }
};

//Nhập theme màu vào và lấy ra màu phụ chính dùng cho viền border, màu nền button
export const getPrimaryColor = (colorTheme: string) => {
  switch (colorTheme.toLowerCase()) {
    case appTheme.themeList[0].value:
      return appTheme.themeList[0].color;
    case appTheme.themeList[1].value:
      return appTheme.themeList[1].color;
    case appTheme.themeList[2].value:
      return appTheme.themeList[2].color;
    case appTheme.themeList[3].value:
      return appTheme.themeList[3].color;
    case appTheme.themeList[4].value:
      return appTheme.themeList[4].color;
    default:
      return appColors.primary;
  }
};

//Nhập theme màu vào và lấy ra màu hướng dẫn thường ở trên nền
export const getInstructionColor = (colorTheme: string) => {
  switch (colorTheme.toLowerCase()) {
    case appTheme.themeList[0].value:
      return '#000000';
    case appTheme.themeList[0].value:
      return '#000000';
    case appTheme.themeList[0].value:
      return '#000000';
    case appTheme.themeList[0].value:
      return '#000000';
    case appTheme.themeList[4].value:
      return '#000000';
    default:
      return appColors.instruction;
  }
};