import React from "react";
import { Modal } from "zmp-ui";

interface Props {
  visibility: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imageUrl?: string;
  title: string;
  desc?: string;
}

const ConfirmModal = (props: Props) => {
  const { visibility, onClose, imageUrl, title, desc, onConfirm } = props;
  const classNameTailwind = `text-center`;

  return (
    <Modal
      visible={visibility}
      title={title}
      onClose={onClose}
      actions={[
        {
          text: "Huỷ",
          close: true,
        },
        {
          text: "Đồng ý",
          onClick: onConfirm,
          highLight: true
        },
      ]}
      description={desc}
      modalClassName={classNameTailwind}
    >
      {imageUrl ?
        <div className='w-full mt-5'>
          <img src={imageUrl} alt="Image" width={'100%'} />
        </div>
        : null}
    </Modal>
  );
};

export default ConfirmModal;
