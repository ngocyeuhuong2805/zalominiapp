import * as React from "react";

const StartRightComponent = ({
  color = "currentColor",
  flipHorizontal = false,
}) => {
  // Determine the transform value based on the flipHorizontal prop
  const transformValue = flipHorizontal ? "scale(-1, 1)" : "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={35}
      style={{
        alignSelf: "center",
        transform: transformValue,
      }}
      fill={color}
    >
      <path
        fill={color}
        d="M5.123.272a.397.397 0 0 1 .755 0l.71 2.13a3.178 3.178 0 0 0 2.01 2.01l2.13.71a.398.398 0 0 1 0 .755l-2.13.71a3.178 3.178 0 0 0-2.01 2.01l-.71 2.13a.397.397 0 0 1-.755 0l-.71-2.13a3.178 3.178 0 0 0-2.01-2.01l-2.13-.71a.397.397 0 0 1 0-.755l2.13-.71a3.178 3.178 0 0 0 2.01-2.01l.71-2.13ZM5.123 24.272a.398.398 0 0 1 .755 0l.71 2.13a3.178 3.178 0 0 0 2.01 2.01l2.13.71a.397.397 0 0 1 0 .755l-2.13.71a3.178 3.178 0 0 0-2.01 2.01l-.71 2.13a.397.397 0 0 1-.755 0l-.71-2.13a3.178 3.178 0 0 0-2.01-2.01l-2.13-.71a.397.397 0 0 1 0-.755l2.13-.71a3.178 3.178 0 0 0 2.01-2.01l.71-2.13ZM16.123 12.272a.397.397 0 0 1 .755 0l.71 2.13a3.177 3.177 0 0 0 2.01 2.01l2.13.71a.397.397 0 0 1 0 .755l-2.13.71a3.178 3.178 0 0 0-2.01 2.01l-.71 2.13a.396.396 0 0 1-.755 0l-.71-2.13a3.177 3.177 0 0 0-2.01-2.01l-2.13-.71a.397.397 0 0 1 0-.755l2.13-.71a3.177 3.177 0 0 0 2.01-2.01l.71-2.13Z"
      />
    </svg>
  );
};

export default StartRightComponent;
