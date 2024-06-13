import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { appFontSize } from "../../constants/appFontSizes";
import { Button, Modal, Input } from "zmp-ui";
import { message } from "antd";

interface CustomButtonProps {
  initialLabel: string;
  initialColor: string;
  onEditedColor: string;
  editModal?: boolean;
  width?: string;
  onChangeInfo: (
    edited: boolean,
    props: { key: string; value: string }[]
  ) => void;
  editList: { key: string; label: string; value: string; brandUri: string }[];
  disable?: boolean;
  handleUpdateTask?: ({ name, value, title }: any) => void;
  data?: any;
  index?: number;

}

const MissionView: React.FC<CustomButtonProps> = ({
  initialLabel,
  initialColor,
  onEditedColor,
  width,
  editModal = false,
  onChangeInfo,
  editList,
  disable,
  handleUpdateTask,
  data,
  index

}) => {
  const [colorBG, setColorBG] = useState<string>(onEditedColor);
  const [colorText, setColorText] = useState<string>(initialColor);
  const [modelVisible, setModelVisible] = useState(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [props, setProps] = useState(
    editList.map((item) => ({ key: item.key, value: "", title: "", brandUri: "" }))
  );
  const classNameButton = `rounded-full font-semibold transition-colors flex`;
  const classNameTextButton = `flex gap-5 justify-between ${width} content-center truncate`;
  const [title, setTitle] = useState("Nhiệm vụ");

  useEffect(() => {
    setProps(editList.map((item) => ({ key: item.key, value: item.value, title: item.label, brandUri: item.brandUri })));
  }, [editList]);

  useEffect(() => {
    setTitle(initialLabel);
  }, [initialLabel]);


  const handleClick = () => {
    if (edited) {
      onChangeInfo(!edited, props);
      saveInfo();
    } else {
      if (editModal) {
        setModelVisible(true);
      } else {
        onChangeInfo(!edited, props);
        saveInfo();
      }
    }
  };

  const getTypeprops = (key: string) => {
    const item = props.find(item => item?.key.toLowerCase() === key.toLowerCase())
    return item;
  };

  const saveInfo = () => {
    setColorBG(!edited ? initialColor : onEditedColor);
    setColorText(!edited ? onEditedColor : initialColor);
    setEdited(!edited);
    setModelVisible(false);
  };

  const handleInputChange = (index: number, value: string, type: string) => {
    if (type == "title") {
      const newProps = [...props];
      newProps[index].title = value;
      setProps(newProps);
    }
    else if (type == "brandUri") {
      const newProps = [...props];
      newProps[index].brandUri = value;
      setProps(newProps);
    }
    else {
      const newProps = [...props];
      newProps[index].value = value;
      setProps(newProps);
    }
  };



  return (
    <div>
      <Button
        disabled={disable}
        className={classNameButton}
        style={{
          backgroundColor: colorBG,
          fontSize: appFontSize.small,
          color: colorText,
          border: "solid 3px",
          borderColor: initialColor,
        }}
        onClick={handleClick}
      >
        <div className={classNameTextButton}>
          <div>{title}</div>
          {editModal ? (
            <FontAwesomeIcon icon={faEdit} color={colorText} />
          ) : (
            <FontAwesomeIcon icon={faCheck} color={onEditedColor} />
          )}
        </div>
      </Button>
      <Modal
        visible={modelVisible}
        title={"Nhập thông tin cần thiết"}
        onClose={() => setModelVisible(false)}
        actions={[
          {
            text: "Hủy",
            close: true,
          },
          {
            text: "Xác nhận",
            highLight: true,
            onClick: () => {
              if (handleUpdateTask) {
                const propValue: any = getTypeprops(data?.type) || '';
                handleUpdateTask({ key: index, value: propValue?.value, title: propValue?.title, brandUri: propValue?.brandUri });
              }

            },
          },
        ]}
      >
        {editList.map((item: any, index) => (
          <div key={index}>
            <p style={{ marginTop: 10 }}>Nhập vào tiêu đề</p>
            <Input

              placeholder={item?.label || "Chưa có dữ liệu"}
              onChange={(e) => handleInputChange(index, e.target.value, "title")}
              defaultValue={props[index].title}
              value={props[index].title}
            />
            {item?.key?.toLowerCase() == 'share' ? (
              <div>
                <p>Nhập vào số lượng</p>
                <Input

                  placeholder={item?.value}
                  onChange={(e) => handleInputChange(index, e.target.value, "")}
                  defaultValue={props[index].value}
                  value={props[index].value}
                />
              </div>
            ) : (
              <div>
                <p style={{ marginTop: 10 }}>Nhập id OA của bạn </p>
                <Input
                  placeholder={item?.brandUri || "Chưa có id Oa"}
                  onChange={(e) => handleInputChange(index, e.target.value, "brandUri")}
                  defaultValue={props[index]?.brandUri}
                // value={props[index]?.brandUri}
                />
              </div>
            )}

          </div>
        ))}
      </Modal>
    </div>
  );
};

export default MissionView;
