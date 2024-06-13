import { text } from '@fortawesome/fontawesome-svg-core';
import * as React from 'react';
import { AppFont } from '../../constants/app-font';

export interface IViewGifComponentProps {
    text: string;
    color: string;
    colorText: string;
    size: number;
}

export default function ViewGifComponent (props: IViewGifComponentProps) {
    const { text, color, colorText,size } = props;
  return (
    <div className='flex p-5 pl-8 pr-8 rounded-full' style={{backgroundColor: color,fontFamily: AppFont.BagelFatOne}}>
        <span style={{color: colorText, fontSize: size}}>{text}</span>
    </div>
  );
}
