import { Flex, Avatar } from "antd";
import * as React from "react";
import { Text } from "zmp-ui";
import { AppFont } from "../../../constants/app-font";
import { dataUser, TopDataUser } from "../../../data_fake/user_fake";

export interface ICountPeopleProps {
  numPeople: string;
  url?: string;
  sizeText?: "xLarge" | "large" | "normal" | "small" | "xSmall" | "xxSmall" | "xxxSmall" | "xxxxSmall" | undefined;
}

export default function CountPeople(props: ICountPeopleProps) {
  const { numPeople, url, sizeText } = props;
  return (
    <div className="flex flex-row pt-2 pb-2 pl-8  pr-8 rounded-full" style={{ backgroundColor: '#C1E4CF' }}>
      {/* <div className="flex -space-x-3">
        <Avatar size={12} src="https://haycafe.vn/wp-content/uploads/2022/03/Anh-chan-dung-goc-nghieng.jpg" />
        <Avatar size={12} src="https://haycafe.vn/wp-content/uploads/2022/03/Anh-chan-dung-goc-nghieng.jpg" />
        <Avatar size={12} src="https://haycafe.vn/wp-content/uploads/2022/03/Anh-chan-dung-goc-nghieng.jpg" />
      </div> */}
      <Flex className="-space-x-3">
        {TopDataUser?.map((item: any) => (
          // <Avatar key={item?.id} size={smail} src={item?.avatar} />
          <Avatar key={item?.id} src={item?.avatar} />
        ))}
      </Flex>
      <Text className="self-center ml-3" style={{ fontFamily: AppFont.QuicksanBold }} size={sizeText}>
        Bạn và {numPeople}N cư dân
      </Text>
    </div>
  );
}
