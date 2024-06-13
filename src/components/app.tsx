import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import EditChoicesPage from "../pages/create/edit-choices";
import WelcomePage from "../pages/welcome";
import CreateTitlePage from "../pages/create/create-title";
import CreateQuestionsPage from "../pages/create/create-questions";
import CreateLogoPage from "../pages/create/create-logo";
import Library from "../pages/library";
import LibraryUserPage from "../pages/library-user";
import EndSettingPage from "../pages/create/end-setting";
import CreatePrize from "../pages/create/create-prize";
import CreateGift from "../pages/create/create-gift";
import PlayChoices from "../pages/play/play-choices";
import CreateGiftNext from "../pages/create/create-gift-next";
import SplashPage from "../pages/splash";
import CampainSplash from "../pages/play/campain-splash";
import CampainMenu from "../pages/play/campaign-menu";
import CampainConfig from "../pages/play/campaign-config";
import CreateTheme from "../pages/create/create-theme";
import CreateRule from "../pages/create/create-rule";
import CampaignAddPhone from "../pages/play/campaign-add-phone";
import CampaignCongratulations from "../pages/play/campaigin-congratulations";
import CreateMissionsPage from "../pages/create/create-missions";
import CampaignRule from "../pages/play/campaign-rule";
import CampaignGiftDetail from "../pages/play/campaign-gift-detail";
import PlayChoiceNext from "../pages/next/play-choices-next";
import PlayResult from "../pages/play/play-result";
import CampaignRanking from "../pages/play/campaign-ranking";
import MissionProfileUser from "../pages/play/mission-profile-user";
import CampaignGiftListAndMission from "../pages/play/campaign-gift-list-mission";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<SplashPage></SplashPage>}></Route>
              <Route
                path="/welcome"
                element={<WelcomePage></WelcomePage>}
              ></Route>
              <Route path="/library" element={<Library></Library>}></Route>
              <Route
                path="/library-user"
                element={<LibraryUserPage></LibraryUserPage>}
              ></Route>
              <Route path="/library" element={<Library></Library>}></Route>
              {/* Phần khởi tạo & chỉnh sửa */}
              <Route
                path="/create-title"
                element={<CreateTitlePage></CreateTitlePage>}
              ></Route>
              <Route
                path="/create-logo"
                element={<CreateLogoPage></CreateLogoPage>}
              ></Route>
              <Route
                path="/create-theme"
                element={<CreateTheme></CreateTheme>}
              ></Route>
              <Route
                path="/create-questions"
                element={<CreateQuestionsPage></CreateQuestionsPage>}
              ></Route>
              <Route
                path="/edit-choices/:index"
                element={<EditChoicesPage></EditChoicesPage>}
              ></Route>
              <Route
                path="/create-rule"
                element={<CreateRule></CreateRule>}
              ></Route>
              <Route
                path="/create-prize"
                element={<CreatePrize></CreatePrize>}
              ></Route>
              <Route
                path="/create-gift/:index"
                element={<CreateGift></CreateGift>}
              ></Route>
              <Route
                path="/create-gift-next/:index"
                element={<CreateGiftNext></CreateGiftNext>}
              ></Route>
              <Route
                path="/create-missions"
                element={<CreateMissionsPage></CreateMissionsPage>}
              ></Route>
              <Route
                path="/end-setting"
                element={<EndSettingPage></EndSettingPage>}
              ></Route>
              {/* Menu game */}
              <Route
                path="/campain-splash"
                element={<CampainSplash></CampainSplash>}
              ></Route>
              <Route
                path="/campain-menu"
                element={<CampainMenu></CampainMenu>}
              ></Route>
              {/* Bắt đầu chơi game */}
              <Route
                path="/play-choices/:index"
                element={<PlayChoices></PlayChoices>}
              ></Route>
              <Route
                path="/play-choices-next/:index"
                element={<PlayChoiceNext></PlayChoiceNext>}
              ></Route>
              <Route
                path="/play-result"
                element={<PlayResult></PlayResult>}
              ></Route>
              {/* Thể lệ */}
              <Route
                path="/campaign-rule"
                element={<CampaignRule></CampaignRule>}
              ></Route>
              <Route
                path="/campaign-gift-list"
                element={
                  <CampaignGiftListAndMission></CampaignGiftListAndMission>
                }
              ></Route>
              <Route
                path="/campaign-gift-detail/:index"
                element={<CampaignGiftDetail></CampaignGiftDetail>}
              ></Route>
              {/* Kết quả */}
              <Route
                path="/mission-profile-user"
                element={<MissionProfileUser></MissionProfileUser>}
              ></Route>
              {/* Chỉnh sửa */}
              <Route
                path="/campaign-config"
                element={<CampainConfig></CampainConfig>}
              ></Route>
              {/* Kết quả */}
              <Route
                path="/campaign-ranking"
                element={<CampaignRanking></CampaignRanking>}
              ></Route>
              <Route
                path="/campaign-add-phone"
                element={<CampaignAddPhone></CampaignAddPhone>}
              ></Route>
              <Route
                path="/campaign-congratulations"
                element={<CampaignCongratulations></CampaignCongratulations>}
              ></Route>
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
