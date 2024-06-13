import * as React from 'react';
import { appTheme } from '../../constants/app-theme';
import ImageViewCustom from '../header/image-view';

export interface ISelectCampaignRewardsProps {
  image: string;
  primaryColorCampaign?: string;
  secondaryColorCampaign?: string;
  edit3?: string;
  show?:boolean;
  onClick?: () => void;
  
}

const defaultData = appTheme.themeList;

const SelectCampaingRewards: React.FC<ISelectCampaignRewardsProps> = ({
  image,
  primaryColorCampaign,
  secondaryColorCampaign,
  edit3,
  onClick,
  show=false,
  
}) => {
  return (
    <div className='relative' style={{ backgroundSize: 'cover' }}>
      {/* <img 
        className='rounded-3xl' 
        src={image ? image : 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/dien-thoai-camera-tot-nhat-1.png'} 
        alt='Background' 
      /> */}
      <ImageViewCustom borderRadius={32} width={250} height={220} src={image ? image : 'https://i.ibb.co/PY7hPBY/Fifa-world-cup-org.jpg'}/>
      {show && (
        <>
          <div
            onClick={onClick}
            className='text-center  absolute w-[80%] p-2 bottom-[-15px] left-6 z-10'
            style={{
              color: primaryColorCampaign,
              background: secondaryColorCampaign,
              borderRadius: '40px'
            }}
          >
            Chọn Thưởng Chiến Dịch
          </div>
        </>
      )}
    </div>
  );
};

export default SelectCampaingRewards;
