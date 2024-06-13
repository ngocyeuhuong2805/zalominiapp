import * as React from 'react';
import {Text } from "zmp-ui";
import { AppFont } from '../../../constants/app-font';

export interface ITextNumberLuckyProps {
  textTop?: string;
  textBottom?: string;
  colorText?: string;
  sizeTextTop?: number
  sizeTextBottom?:number

}

export default function TextNumberLucky (props: ITextNumberLuckyProps) {
  const { textTop, textBottom, colorText, sizeTextTop , sizeTextBottom} = props;
  return (
    <div className='flex flex-col items-center'>
        <span  style={{color: colorText, fontSize: sizeTextTop, fontFamily: AppFont.QuicksanBold, paddingBottom: 30}}>{textTop}</span>
        <span  style={{color: colorText, fontSize: sizeTextBottom,fontFamily: AppFont.QuicksanMedium}}>{textBottom}</span>
    </div>
  );
}
