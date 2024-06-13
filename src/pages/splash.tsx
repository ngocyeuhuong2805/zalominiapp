import React, { useEffect, useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import "../css/app.css";
import Background1 from "../static/svg/Background";
import backgroundImage from "../static/images/background-smallest.jpg";
import TextTitleApp from "../components/text/text-title-app";
import { appColors } from "../constants/appColors";
import { closeApp, getUserInfo } from "zmp-sdk/apis";
import ApiNetWork from "../networks/ApiConFig";
import { data } from "zmp-framework/types/dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserLoginSelector } from "../states/selectors/UserLoginSelector";
import ModalInfo from "../components/modals/info-modal";
import { mapUserLoginDetail } from "../utils/mapping/mapApiUserLogin";

const SplashPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useRecoilState(UserLoginSelector);
  // console.log("🚀 ~ userLogin:", userLogin)
  const [visibility, setVisibility] = useState(false);
  
  const closeMiniApp = async () => {
    try {
      await closeApp({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setVisibility(false);
    closeMiniApp();
  };

  const createNewUser = async () => {
    let apiCompleted = false; // Cờ để theo dõi trạng thái hoàn thành của API

    try {
      const apiTimeout = setTimeout(() => {
        if (!apiCompleted) {
          // closeMiniApp()
          setVisibility(true);
          console.error("API request timed out.");
        }
      }, 9000); // Giả sử timeout là 10 giây
      const resultApiUserInfo: any = await getUserInfo({});
      if (resultApiUserInfo.userInfo) {
        
        const resultApiCreateNew: any = await ApiNetWork.HandleCallApi(
          "/User/CreateNewUser",
          {
            zaloId: resultApiUserInfo.userInfo.id,
            IdByOA: resultApiUserInfo.userInfo.idByOA,
            Name: resultApiUserInfo.userInfo.name,
            Avatar: resultApiUserInfo.userInfo.avatar,
            isSensitive: resultApiUserInfo.userInfo.isSensitive,
            PhoneNumber: "",
          },
          "post"
        );
        apiCompleted = true; // Đánh dấu API đã hoàn thành
        clearTimeout(apiTimeout); // Hủy bỏ timeout kiểm tra
        console.log("🚀 ~ createNewUser ~ CreateNewUser:", resultApiCreateNew)

        if (resultApiCreateNew.success === true) {
          console.log("User created successfully, setting timeout.");
          const timeoutId = setTimeout(() => {
            setUserLogin(mapUserLoginDetail(resultApiCreateNew));
            navigate("/welcome", { replace: true });
          }, 1000);

          return () => {
            console.log("Clearing timeout.");
            clearTimeout(timeoutId);
          };
        }
      }
    } catch (error) {
      if (!apiCompleted) {
        console.error("API request timed out before completing.");
      } else {
        console.error("Error in createNewUser:", error);
      }
    }
    return;
  };

  useEffect(() => {
    createNewUser();
  }, []);

  return (
    <Page
      className="relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          mixBlendMode: "overlay", // Chế độ trộn lớp overlay
        }}
      >
        <Background1 />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <TextTitleApp
          titleTop="Hỏi Xoáy"
          titleBottom="Đáp Siuuu"
          color={appColors.secondary}
          strokeColor={appColors.primary}
        />
      </div>
      <ModalInfo
        visibility={visibility}
        title="Lỗi ứng dụng"
        onClose={handleClose}
      />
    </Page>
  );
};

export default SplashPage;
