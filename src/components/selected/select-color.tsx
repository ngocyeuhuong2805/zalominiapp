import * as React from 'react';
import { appTheme } from '../../constants/app-theme';

export interface ISelectColorProps {
  dataColor?: { id: number; color: string; value?: string; textColor?: string }[];
  onChange: (value: string) => void;
  isCheckBorder?: boolean;
}

const defaultData = appTheme.themeList

const SelectColor: React.FC<ISelectColorProps> = ({ dataColor, onChange, isCheckBorder }) => {
  const data = dataColor && dataColor.length > 0 ? dataColor : defaultData;
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const handleClick = (id: number, value: string) => {
    setSelectedId(id);
    onChange(value);
  };

  return (
    <div className='flex bg-white pl-2 pr-2 pt-2 pb-2 rounded-3xl'>
      <div className='flex flex-row rounded-[30px] w-72 h-16 bg-[#CCCCCC] items-center justify-evenly'>
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id, item.value!)}
            className={`w-11 h-11 rounded-xl hover:opacity-70 ${selectedId === item.id && isCheckBorder ? 'border-2 border-inherit' : ''}`}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectColor;
