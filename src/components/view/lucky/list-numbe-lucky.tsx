import { Flex, Avatar } from "antd";
import { AppFont } from "../../../constants/app-font";
import { appColors } from "../../../constants/appColors";
import '../../../css/customer.css'
import { dataUser } from "../../../data_fake/user_fake";
import React, { memo } from "react";
import backgroundImageCampain from "../../../static/images/icon_rankGame/icon_rank.png"
import { useRecoilValue } from "recoil";
import { UserLoginAtom } from "../../../states/atoms/UserLoginAtom";
const width = window.innerWidth * 0.9;
const height = window.innerHeight * 0.55;
const ListNUmberLucky = () => {
  const infUser = useRecoilValue(UserLoginAtom)
  console.log(infUser)
  return (
    <div>
      <div style={{ height: height, width: width, backgroundColor: '#F3E6CF', borderTopLeftRadius: 25, borderTopRightRadius: 25, border: '2px solid #006666', overflowY: 'auto' }} className={"custom-scroll"} >
        {dataUser?.map((item: any, index: number) => (
          <Flex key={item?.id}
            style={{ padding: '20px', borderBottom: '2px solid #006666' }}
            justify={"space-around"}
            align={"center"}>
            {(index == 1 || index == 0 || index == 2) ? (
              <Flex
                style={{ backgroundImage: `url(${backgroundImageCampain})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '50px', height: '50px' }}
                align={'center'}
                justify={'center'}
                className={'snap-center'}
              >
                <p style={{ fontFamily: AppFont.BagelFatOne, fontSize: '32px', color: '#006666' }}>{index + 1}</p>
              </Flex>
            ) : (
              <Flex style={{ width: '50px', height: '50px' }} align={'center'} justify={'center'} >
                <p style={{ fontFamily: AppFont.BagelFatOne, fontSize: '32px', color: '#006666' }}>{index + 1}</p>
              </Flex>
            )}

            <Avatar src={item?.avatar} style={{ height: '50px', width: '50px' }} />
            <Flex vertical gap={10} style={{ width: '50%' }}>
              <p style={{ fontFamily: AppFont.QuicksanBold, fontSize: '20px', width: '100%' }}>{item?.name}</p>
              <p style={{ color: '#FF0000', fontFamily: AppFont.QuicksanBold, fontSize: '30px' }}>{item?.luckyNumber}</p>
            </Flex>
          </Flex>
        ))}
      </div >
      
      <Flex
        style={{ padding: '20px', backgroundColor: '#E3C99A', borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px', }}
        justify={"space-around"}
        align={"center"}>

        <Flex style={{ width: '50px', height: '50px' }} align={'center'} justify={'center'} >
          <p style={{ fontFamily: AppFont.BagelFatOne, fontSize: '32px', color: '#006666' }}>999</p>
        </Flex>


        <Avatar src={'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474108Eez/hinh-nen-thu-cung-tuyet-dep_050543348.jpg'} style={{ height: '50px', width: '50px' }} />
        <Flex vertical gap={10} style={{ width: '50%' }}>
          <p style={{ fontFamily: AppFont.QuicksanBold, fontSize: '20px' }}>Vũ Tiến Khoái</p>
          <p style={{ color: '#FF0000', fontFamily: AppFont.QuicksanBold, fontSize: '30px' }}>123124</p>
        </Flex>
      </Flex>
    </div>
  );
}
export default memo(ListNUmberLucky)
