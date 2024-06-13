// src/TextView.js
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { appColors } from '../../constants/appColors';
import Instruction from './instruction';

interface Props {
  text: string;
  borderColor?: string;
  iconColor?: string;
  backgroundColor?: string;
}

const TextCopyView: React.FC<Props> = ({
  text = "Default text to be copied!",
  borderColor = appColors.primary,
  iconColor = appColors.primary,
  backgroundColor = "rgba(255, 255, 255, 0.5)"
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // Reset the copied state after 3 seconds
    }).catch(() => {
      console.error("Failed to copy text");
    });
  };

  return (
    <div className="gap-2 flex flex-col">
      <div
        onClick={handleCopy}
        className="text-ellipsis border-4 px-5 py-3 overflow-hidden justify-between rounded-3xl gap-5 flex cursor-pointer"
        style={{ width: "300px", borderColor, backgroundColor }}>
        <div className="truncate" style={{ width: "250px" }}>{text}</div>
        <FontAwesomeIcon icon={faCopy} size="xl" color={iconColor} className="hover:opacity-70" />
      </div>
      {copied && <Instruction
        color={appColors.instruction}
        text="Đã sao chép đường dẫn"
      />}
    </div>
  );
};

export default TextCopyView;
