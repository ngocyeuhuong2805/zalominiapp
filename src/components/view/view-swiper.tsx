import * as React from "react";
import "../../css/swiper.css";
import { appColors } from "../../constants/appColors";
import { useEffect, useRef } from "react";
import { AppFont } from "../../constants/app-font";

export interface ISwiperProps {
  colorBackGround?: string;
  textColor?: string;
  titleHeader?: string;
  titleButtom?: string;
}

const data = [
  {
    id: 1,
    images:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/433/933/products/thung-12-hop-sua-tuoi-khong-duong-vinamilk-100-sua-tuoi-1-lit-202002241312282318.jpg?v=1629381051220",
  },
  {
    id: 2,
    images:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/418/667/products/sua-milo2-1688865616582.jpg?v=1701267154530",
  },
  {
    id: 3,
    images:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5r6K3koXdCJvmYyZ9cySqZrnZNbCcJ0cIqd2KbDhaaQ&s",
  },
  {
    id: 4,
    images:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeLEnDOXIXCl6fUQG63FXhqFjv2FFS-Fi2sku2BJBWtA&s",
  },
  {
    id: 5,
    images:
      "https://cdn.tgdd.vn/Products/Images/2943/108674/bhx/sua-dau-nanh-nguyen-chat-fami-hop-1-lit-202309111455252085.jpg",
  },
  {
    id: 6,
    images:
      "https://vcdn-kinhdoanh.vnecdn.net/2020/07/26/sile-5-hinh-duoi1-5694-1595704539.jpg",
  },
];

export default function SwiperComponent(props: ISwiperProps) {
  const { colorBackGround, textColor, titleHeader, titleButtom } = props;


  return (
    <div
      className="flex w-full flex-col h-auto items-center self-center pt-3 pb-3"
      style={{ backgroundColor: appColors.secondary }}
    >
      <span style={{ color: textColor, fontFamily: AppFont.QuicksanBold}} className="h-7">
        {titleHeader}
      </span>
      <div className=" pt-9 pb-9  swiper-container" style={{backgroundColor: colorBackGround}}>
        <div className="slide-track" >
          {data.map((item, index) => (
            <div key={index} className="flex justify-center ml-9 bg-white p-4 rounded-2xl">
              <img
                src={item.images}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
          {/* Thêm ảnh lặp lại từ đầu */}
          {data.map((item, index) => (
            <div key={`duplicate-${index}`} className="flex justify-center ml-9 p-4 bg-white rounded-2xl">
              <img
                src={item.images}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <span style={{ color: textColor, fontFamily: AppFont.QuicksanBold}} className="mt-2">
        {titleButtom}
      </span>
    </div>
  );
}
