import * as React from "react"
const ZaloIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      enableBackground: "new 0 0 48 48",
      width: props.width || 96, // Use 10 as default width if not provided
      height: props.height || 96, // Use 10 as default height if not provided
    }}
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      d="M15 36V6.827l-1.211-.811C8.64 8.083 5 13.112 5 19v10c0 7.732 6.268 14 14 14h10c4.722 0 8.883-2.348 11.417-5.931V36H15z"
      style={{
        fill: "#2962ff",
      }}
    />
    <path
      d="M29 5H19c-1.845 0-3.601.366-5.214 1.014C10.453 9.25 8 14.528 8 19c0 6.771.936 10.735 3.712 14.607.216.301.357.653.376 1.022.043.835-.129 2.365-1.634 3.742-.162.148-.059.419.16.428.942.041 2.843-.014 4.797-.877a1.976 1.976 0 0 1 1.729.083C20.453 39.764 24.333 40 28 40c4.676 0 9.339-1.04 12.417-2.916A13.922 13.922 0 0 0 43 29V19c0-7.732-6.268-14-14-14z"
      style={{
        fill: "#eee",
      }}
    />
    <path
      d="M36.75 27C34.683 27 33 25.317 33 23.25s1.683-3.75 3.75-3.75 3.75 1.683 3.75 3.75S38.817 27 36.75 27zm0-6c-1.24 0-2.25 1.01-2.25 2.25s1.01 2.25 2.25 2.25S39 24.49 39 23.25 37.99 21 36.75 21zM31.5 27h-1a.5.5 0 0 1-.5-.5V18h1.5v9zM27 19.75v.519a3.715 3.715 0 0 0-2.25-.769c-2.067 0-3.75 1.683-3.75 3.75S22.683 27 24.75 27c.847 0 1.621-.293 2.25-.769v.269a.5.5 0 0 0 .5.5h1v-7.25H27zm-2.25 5.75c-1.24 0-2.25-1.01-2.25-2.25S23.51 21 24.75 21 27 22.01 27 23.25s-1.01 2.25-2.25 2.25z"
      style={{
        fill: "#2962ff",
      }}
    />
    <path
      d="M21.25 18h-8v1.5h5.321L13 26h.026a1.221 1.221 0 0 0-.276.75V27h7.5a.5.5 0 0 0 .5-.5v-1h-5.321L21 19h-.026c.163-.211.276-.463.276-.75V18z"
      style={{
        fill: "#2962ff",
      }}
    />
  </svg>
)
export default ZaloIcon;