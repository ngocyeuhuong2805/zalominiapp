import React from 'react'
import { TextAlignType } from 'zmp-sdk';
import { Text } from 'zmp-ui';
import { AppFont } from '../../constants/app-font';
import { appFontSize } from '../../constants/appFontSizes';

interface Props {
  text: string,
  color?: string,
  fontWeight?: 'bold' | 'normal'
  textSize?: number | string,
  fontFamily?: string,
  lightHeight?: string,
  disable?:boolean
}

const Instruction = (props: Props) => {
  const { text, color, fontWeight, textSize = appFontSize.small, fontFamily, lightHeight, disable } = props
  return (
    <Text
      disabled = {disable}
      className="text-center"
      style={{
        fontWeight: fontWeight, color: color, fontFamily: fontFamily || AppFont.QuicksanBold, fontSize: textSize, lineHeight: lightHeight,
        textShadow: "1px 1px 0 #ffffe6, -1px -1px 0 #ffffe6, 1px -1px 0 #ffffe6, -1px 1px 0 #ffffe6",
      }}>{text}</Text>
  )
}
export default Instruction;