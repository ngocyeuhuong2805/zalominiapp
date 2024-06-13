import React from "react";
import { Modal } from "zmp-ui";

interface Props {
  visibility: boolean;
  onClose: () => void;
  imageUrl?: string;
  title: string;
  desc?: string;
}

const ModalInfo = (props: Props) => {
  const { visibility, onClose, imageUrl, title, desc } = props;
  const classNameTailwind = `text-center`;

  return (
    <Modal
      visible={visibility}
      title={title}
      onClose={onClose}
      actions={[
        {
          text: "Đóng",
          close: true,
          highLight: true,
        },
      ]}
      description={desc}
      modalClassName={classNameTailwind}
    >
      {imageUrl ? (
        <div className="w-full mt-5">
          <img src={imageUrl} alt="Image" width={"100%"} />
        </div>
      ) : null}
    </Modal>
  );
};

export default ModalInfo;
