import React from "react";

interface Props {
  src: string | undefined;
  showBackdrop?: boolean; // New prop to control the visibility of the backdrop
  width?: number;
  height?: number;
  borderRadius?: number;
  
}

const ImageViewCustom: React.FC<Props> = ({
  src,
  showBackdrop = false,
  width = 160,
  height = 160,
  borderRadius,
  
}) => {
  const handleError = (e) => {
    e.target.src = "";
  };

  return (
    <div
      style={{
        width: width + "px",
        height: height + "px",
        borderRadius: borderRadius + "px",
      }}
      className="overflow-hidden relative place-items-center justify-center flex"
    >
      {showBackdrop && (
        <div className="absolute w-full h-full backdrop-blur border border-transparent rounded-full opacity-70"></div>
      )}
      <img
        src={src}
        alt="Ảnh đại diện"
        style={{
          zIndex: 10,
          position: "relative",
          width: "100%",
          borderRadius: borderRadius + "px",
          pointerEvents: "none",
        }}
        onError={handleError}
      />
    </div>
  );
};

export default ImageViewCustom;
