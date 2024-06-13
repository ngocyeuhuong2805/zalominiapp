import * as React from "react"
const QrIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 96}
    height={props.height || 96}
    fill="#0068FF"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M21 2h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1v2h2v-2h2v2h2V3a1 1 0 0 0-1-1Zm-3 6h-2V4h4v4ZM3 10h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1Zm1-6h4v4H4Zm1 12v2H3v-2Zm-2 4h2v2H3Zm4-2v2H5v-2Zm0-2H5v-2h2v-2h2v4Zm-2-4v2H3v-2Zm9 3v1h-1v-2h-2v4h3v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-5v-2h-2Zm6 1v4h-4v-4ZM9 18h2v2h1v2H7v-2h2Zm4-12h-2V4h2Zm-2 2h2v4h-2ZM5 5h2v2H5Zm12 0h2v2h-2Zm2 14h-2v-2h2Z" />
  </svg>
)
export default QrIcon
