import React, { useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import Container from "../../components/view/container";
import { appColors } from "../../constants/appColors";
import CountPeople from "../../components/view/lucky/count-people";
import TextNumberLucky from "../../components/view/lucky/text-number-lucky";
import ListNUmberLucky from "../../components/view/lucky/list-numbe-lucky";
import { useRecoilValue } from "recoil";
import { getPrimaryColor, getSecondaryColor } from "../../utils/getColor";
import {
  gameColorPlaySelector,
  gameImageBackgroundPlaySelector,
} from "../../states/selectors/GamePlaySelector";
const CampaignRanking = () => {
  const navigate = useNavigate();
  // const backgroundImageCampain = useRecoilValue(
  //   gameImageBackgroundPlaySelector || "images/background-main-app.jpg"
  // );
  const color: string = useRecoilValue(gameColorPlaySelector);
  const [primaryColorCampain, setPrimaryColorCampain] = useState(
    getPrimaryColor(color)
  );
  // const primaryColorCampain:string =useRecoilValue<string>(getPrimaryColor)
  const handelContinue = () => {
    navigate("/campaign-add-phone");
  };

  const backgroundImageCampain = 'https://s3-alpha-sig.figma.com/img/9b3f/3d9f/51a81169366175918d17b41435ab398a?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f3ZWcaFZll8miJWuNO5voZ0yLLjhioYrdgt2Q3JmQv~DF~AAf61LolRiawTUeM5BsMk1ox3Edr5vHcY3pyQJ7PsICNL5ESmFcxkF2JZbh9nhuSMXb-9bLXRRQOxWZH9Y52wt4Bciz5HILtKGUqytmW069iaDt4kLrFhVrwcfVc8RqwgD3vDzTqagYc32~Tj-K3pf8iOt1XDI-oLP9AFRNzk~RLAwKxtmjQGrYRxPn8dhCdsZM4oZxQCL9llJaKFOAYfuTUxiKfbaJZXKQg6wJbOM3IUa00HQkN3UZhObOo-98PMwnc5oZVx03T8hXWjbXcjs~YfD0COAIncJYlKM0g__'
  return (
    <Page
      className="splash-background"
      style={{ backgroundImage: `url(${backgroundImageCampain})` }}
    >
      <Container iconColor={primaryColorCampain} center={true}>

        <CountPeople sizeText="xLarge" numPeople="430" />
        <div style={{ marginTop: 10 }}>
          <TextNumberLucky
            sizeTextTop={50}
            sizeTextBottom={25}
            textTop="100 số"
            textBottom="May mắn nhất"
            colorText={'#fff'}
          />
        </div>

        <div style={{ width: '100%' }}>
          <ListNUmberLucky />
        </div>

      </Container>
    </Page >
  );
};

export default CampaignRanking;
