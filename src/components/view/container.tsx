import React, { ReactNode } from "react";
import { Icon } from "zmp-ui";
import { appIcon } from "../../constants/appIcon";

interface ContainerProps {
  children: ReactNode;
  center?: boolean;
  onBack?: () => void;
  showHeader?: boolean;
  iconColor?: string;
  childSpacing?: string; // Optional prop for custom spacing between children
}

const Container: React.FC<ContainerProps> = ({
  children,
  center = false,
  iconColor = "#000000",
  onBack = () => {
    history.back();
  },
  showHeader = true,
  childSpacing = "1rem", // Default spacing value
}) => {
  const scroll = center ? "h-screen" : "";

  // Convert children to an array to manipulate spacing
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`justify-items-center flex flex-col ${scroll}`}>
      {showHeader && (
        <div
          className="mb-1 p-2"
          style={{ position: scroll ? "absolute" : "static" }}
        >
          <div onClick={onBack} className="cursor-pointer">
            <Icon
              icon="zi-arrow-left"
              size={appIcon.big}
              style={{ color: iconColor }}
            />
          </div>
        </div>
      )}
      <div className="place-items-center flex justify-center self-center flex-col flex-grow">
        {childrenArray.map((child, index) => (
          <div
            key={index}
            style={{
              marginBottom:
                index !== childrenArray.length - 1 ? childSpacing : 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Container;
