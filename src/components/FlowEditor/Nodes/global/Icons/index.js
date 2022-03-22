/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as themeColor from "constants/ThemeReference"
import React from "react";
export function SetVariablesIcon({ width, height, enable }) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 236.71 203.61"
      width={width || "27px"}
      height={height || "27px"}
      style={
        enable ? {} : enable === false ? { filter: "grayscale(100%)" } : {}
      }
    >
      <path
        d="M68.51,225.44H49a22.36,22.36,0,0,1-16.5-6.51q-6.53-6.51-6.52-16.51V139.19L7.08,121.67v-3.25L25.94,101V44.86q0-10,6.52-16.51A22.36,22.36,0,0,1,49,21.84H68.51V35.42c-1,0-2.72-.05-5.23-.16s-4.43-.17-5.78-.17q-15.84,0-15.83,11.68V98.88a16.83,16.83,0,0,1-5.51,12.35q-5.73,4.38-11.34,8.87L36.16,129q5.51,5.4,5.51,12.25v59.4q0,11.56,15.83,11.57c1.35,0,3.27-.05,5.78-.17s4.25-.16,5.23-.16Z"
        transform="translate(-7.08 -21.84)"
        fill={themeColor.NODE_ICON.primary}
      />
      <path
        d="M158.9,197.59H143.74l-18.42-43.23-18.65,43.23H92v-.45l25.5-55.7L93.54,88.32H108.7l16.84,40.09,17.3-40.09h14.48v.45L133.4,141Z"
        transform="translate(-7.08 -21.84)"
        fill={themeColor.NODE_ICON.primary}
      />
      <path
        d="M243.79,121.67l-18.87,17.52v63.23a22.46,22.46,0,0,1-23,23H182.35V211.86c1,0,2.72,0,5.23.16s4.43.17,5.78.17q15.94,0,15.95-11.57v-59.4a16.73,16.73,0,0,1,5.5-12.25q5.61-4.48,11.23-8.87-5.61-4.48-11.23-8.87a16.81,16.81,0,0,1-5.5-12.35V46.77q0-11.69-15.95-11.68c-1.35,0-3.28,0-5.78.17s-4.25.16-5.23.16V21.84H201.9a22.46,22.46,0,0,1,23,23V101l18.87,17.41Z"
        transform="translate(-7.08 -21.84)"
        fill={themeColor.NODE_ICON.primary}
      />
    </svg>
  );
}
export function NotificationIcon({ width, height, enable }) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 233.35 223.06"
      width={width || "27px"}
      height={height || "27px"}
      style={
        enable ? {} : enable === false ? { filter: "grayscale(100%)" } : {}
      }
    >
      <path
        d="M32,151s-2-21,13-29M31.91,110.5C11.82,121,13.38,151,13.38,151m205.17-.31s2-21-13-29m31.62,29s1.56-30-18.53-40.5M95,202s29.25,52,63.12,0M115,16V32m0,1c-10,3-44,21-44,45,0,20.26-3.27,57.53-4.52,71a15.92,15.92,0,0,1-3.88,9A249.49,249.49,0,0,1,45,176.12C32.05,188.2,41.92,189,42,189H210c-2.47,0,0,0,0,0,.39-.26,7.79-5.69-.5-13.25C201,168,197,167,189,156c-7.83-10.77-6.08-50.31-6-51.95A.06.06,0,0,0,183,104c-1.86-.22-53.55-7.08-34-66.91,0-.08,0-.09,0-.1L136,33a.07.07,0,0,1,0-.06L135.63,16a.05.05,0,0,0,0-.05C127.23,6,115,16,115,16"
        transform="translate(-8.6 -6.81)"
        fill="none"
        stroke={themeColor.NODE_ICON.primary}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="9.5px"
      />
      <circle cx="181.55" cy="51.69" r="32.5" fill={"#c0392b"} />
      <path
        d="M194.6,42.27h-7.91V34.21h7.91Zm-.07,39.48h-7.77V47.23h7.77Z"
        transform="translate(-8.6 -6.81)"
        fill={themeColor.NODE_ICON.primary}
      />
    </svg>
  );
}
export function CombineIcon({ width, height, enable }) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 236.01 215.36"
      width={width || "27px"}
      height={height || "27px"}
      style={
        enable ? {} : enable === false ? { filter: "grayscale(100%)" } : {}
      }
    >
      <path
        d="M192.52,124.35l46.75.14m0-.25-22-23.5M217.4,148l22-23.5m-119-33.3a44.25,44.25,0,1,0,27.28-9.41,44.17,44.17,0,0,0-27.28,9.41m7.78,34.84a19.25,19.25,0,1,1,19.25,19.25A19.25,19.25,0,0,1,128.14,126.06Zm-115.22-78c0-.42,0-.83,0-1.25a24.21,24.21,0,1,1,0,1.25m51.4,78.11a24.25,24.25,0,1,1-24.25-24.25,24.25,24.25,0,0,1,24.25,24.25m-47.5,78a24.25,24.25,0,1,1,24.25,24.25A24.25,24.25,0,0,1,16.82,204.17Zm86.57-78.11H64.32m55.91,34.74A207.66,207.66,0,0,0,95.5,189.74c-9.07,13.06-22.15,14.87-30.18,14.53M63.64,47.82C72,47.6,85.17,49.58,94.37,62.23a209.72,209.72,0,0,0,26,29"
        transform="translate(-8.14 -17.81)"
        fill="none"
        stroke={themeColor.NODE_ICON.primary}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="9.5px"
      />
    </svg>
  );
}
export function SplitIcon({ width, height, enable }) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 235.93 215.36"
      width={width || "27px"}
      height={height || "27px"}
      style={
        enable ? {} : enable === false ? { filter: "grayscale(100%)" } : {}
      }
    >
      <path
        d="M84.88,159.33a44.25,44.25,0,1,1,17-34.84,44,44,0,0,1-17,34.84m-27-54.09A19.25,19.25,0,1,0,77.1,124.49,19.25,19.25,0,0,0,57.85,105.24Zm134.47,97.25A24.25,24.25,0,1,0,168.1,228c13.39,0,24.9-11,24.25-24.25,0-.42,0-.83,0-1.25m-51.41-78.11a24.25,24.25,0,1,0,24.25-24.25,24.25,24.25,0,0,0-24.25,24.25M164.16,22.13a24.25,24.25,0,1,0,24.25,24.25A24.25,24.25,0,0,0,164.16,22.13ZM140.91,124.49,102,125m37.92-78.72c-8-.34-21.11,1.47-30.18,14.53A207.66,207.66,0,0,1,85,89.75m-.13,69.58a209.72,209.72,0,0,1,26,29c9.2,12.65,22.37,14.63,30.73,14.41M190.9,46.37l46.75.13m0-.25-22-23.5M215.78,70l22-23.5m-.13,79-46.75-.13m46.75-.12-22-23.5m.13,47.28,22-23.5M192.9,203.37l46.75.13m0-.25-22-23.5m.13,47.28,22-23.5"
        transform="translate(-8.6 -17.38)"
        fill="none"
        stroke={themeColor.NODE_ICON.primary}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="9.5px"
      />
    </svg>
  );
}
export function CalculateIcon({ width, height, enable }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 202"
      width={width || "27px"}
      height={height || "27px"}
      style={
        enable ? {} : enable === false ? { filter: "grayscale(100%)" } : {}
      }
    >
      <g id="Layer_2" data-name="Layer 2">
        <path d="M124.5,41.5" transform="translate(-4.5 -20.5)" fill="none" />
        <path
          d="M107,51a13.33,13.33,0,0,1-1.63-.06l-.69-.07-.59-.1a7.52,7.52,0,0,1-1.93-.57,4.43,4.43,0,0,1-1.29-.9l-1.1-1c-1.47-1.36-2.85-2.79-4.38-4.15a12.6,12.6,0,0,0-5.3-3,11.28,11.28,0,0,0-5.91.4c-3.81,1.22-6.93,4.31-9.22,8a46,46,0,0,0-5.14,12.26c-2.38,8.76-3.21,18-3.55,27.26-.14,4.64-.15,9.28-.08,13.93s.26,9.31.5,14a182,182,0,0,1-.44,29c-.2,2.43-.58,4.86-.91,7.28s-.84,4.85-1.39,7.26a100.46,100.46,0,0,1-4.17,14.3A68.3,68.3,0,0,1,53,188.37c-2.89,4.26-6.48,8.36-11.45,11a18.45,18.45,0,0,1-8.3,2.23,8.83,8.83,0,0,1-1.15,0,9.45,9.45,0,0,1-1.18-.07,10.42,10.42,0,0,1-1.2-.16c-.41-.07-.83-.16-1.16-.24l-1.06-.25-1-.29c-.69-.19-1.3-.41-2-.63a18.14,18.14,0,0,1-6.6-3.95,8.37,8.37,0,0,1-2.23-3.17A9.45,9.45,0,0,1,15,188a12.13,12.13,0,0,1,4.77-.24A8.92,8.92,0,0,1,23.15,189a29.47,29.47,0,0,1,5.27,3.87,19.68,19.68,0,0,0,2.41,1.81,3.73,3.73,0,0,0,.54.29,2.24,2.24,0,0,0,.53.2,4,4,0,0,0,1.22.19,10.61,10.61,0,0,0,5.21-1.66c3.39-2,6-5.5,8.09-9.24A55.83,55.83,0,0,0,51,172a113.53,113.53,0,0,0,2.34-13.35c.57-4.52.91-9.09,1.19-13.67s.43-9.2.59-13.83l.13-7,.05-7q0-7.23.4-14.46c.26-4.83.67-9.66,1.28-14.47a132.78,132.78,0,0,1,6.42-28.6,55.2,55.2,0,0,1,6.82-13.43,31.47,31.47,0,0,1,5.35-5.73A20.93,20.93,0,0,1,82.7,36.7a21.63,21.63,0,0,1,8.16-.55,31.55,31.55,0,0,1,8,1.75A17.05,17.05,0,0,1,107,44a5.13,5.13,0,0,1,.93,1.87,5.49,5.49,0,0,1,.11,2.34A6.85,6.85,0,0,1,107,51Z"
          transform="translate(-4.5 -20.5)"
          fill={themeColor.NODE_ICON.primary}
        />
        <path
          d="M50.5,189.5"
          transform="translate(-4.5 -20.5)"
          fill="none"
          stroke="#29c27f"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g id="Layer_1" data-name="Layer 1">
        <path
          d="M68.5,116.5"
          transform="translate(-4.5 -20.5)"
          fill="none"
          stroke="#29c27f"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10px"
        />
        <path
          d="M88.2,118.5"
          transform="translate(-4.5 -20.5)"
          fill="none"
          stroke={themeColor.NODE_ICON.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10px"
        />
        <polyline
          points="71.7 105 89 105 107 156 136 61 223.84 61"
          fill="none"
          stroke={themeColor.NODE_ICON.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10px"
        />
        <path
          d="M166,105s-15-2-17,15,6,45-11,43"
          transform="translate(-4.5 -20.5)"
          fill="none"
          stroke={themeColor.NODE_ICON.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10px"
        />
        <line
          x1="133.5"
          y1="117.66"
          x2="154.66"
          y2="117.66"
          fill="none"
          stroke={themeColor.NODE_ICON.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10px"
        />
        <path
          d="M184,111s-27,20-1,51"
          transform="translate(-4.5 -20.5)"
          fill="none"
          stroke={themeColor.NODE_ICON.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10px"
        />
        <path
          d="M216.2,111.39s27,20,1,51"
          transform="translate(-4.5 -20.5)"
          fill="none"
          stroke={themeColor.NODE_ICON.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10px"
        />
        <line
          x1="184.5"
          y1="104.5"
          x2="207.5"
          y2="127.5"
          fill="none"
          stroke={themeColor.NODE_ICON.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8px"
        />
        <line
          x1="207.5"
          y1="104.48"
          x2="184.5"
          y2="127.48"
          fill="none"
          stroke={themeColor.NODE_ICON.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8px"
        />
        <line
          x1="171"
          y1="85"
          x2="171"
          y2="73.06"
          fill="none"
          stroke={themeColor.NODE_ICON.primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5px"
        />
      </g>
    </svg>
  );
}
export function ExcelReadIcon({ width, height, enable }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width={width || "27px"}
      height={height || "27px"}
      style={
        enable ? {} : enable === false ? { filter: "grayscale(100%)" } : {}
      }
    >
      <g id="surface2967139">
        <path
          stroke="none"
          fillRule="nonzero"
          fill={"rgb(8.627451%,56.862748%,32.941177%)"}
          fillOpacity="1"
          d="M 145 30 L 78.71875 30 C 73.90625 30 70 33.90625 70 38.71875 L 70 75.015625 L 145 75.015625 Z M 145 30 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(9.411765%,28.235295%,16.470589%)"
          fillOpacity="1"
          d="M 70 165.269531 L 70 201.28125 C 70 206.09375 73.90625 210 78.714844 210 L 145 210 L 145 165.269531 Z M 70 165.269531 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(4.705882%,50.196081%,27.058825%)"
          fillOpacity="1"
          d="M 70 75.015625 L 145 75.015625 L 145 120.023438 L 70 120.023438 Z M 70 75.015625 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(9.019608%,27.843139%,16.470589%)"
          fillOpacity="1"
          d="M 70 120.023438 L 145 120.023438 L 145 165.273438 L 70 165.273438 Z M 70 120.023438 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(16.078432%,76.078433%,49.803922%)"
          fillOpacity="1"
          d="M 211.28125 30 L 145 30 L 145 75.015625 L 220 75.015625 L 220 38.71875 C 220 33.90625 216.09375 30 211.28125 30 Z M 211.28125 30 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(15.294118%,40.000001%,24.705882%)"
          fillOpacity="1"
          d="M 145 165.269531 L 145 210 L 211.285156 210 C 216.09375 210 220 206.09375 220 201.285156 L 220 165.273438 L 145 165.273438 Z M 145 165.269531 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(9.803922%,67.450982%,39.607844%)"
          fillOpacity="1"
          d="M 145 75.015625 L 220 75.015625 L 220 120.023438 L 145 120.023438 Z M 145 75.015625 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(7.058824%,58.823532%,32.156864%)"
          fillOpacity="1"
          d="M 145 120.023438 L 220 120.023438 L 220 165.273438 L 145 165.273438 Z M 145 120.023438 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(4.705882%,44.705883%,21.960784%)"
          fillOpacity="1"
          d="M 111.59375 170 L 28.40625 170 C 23.765625 170 20 166.234375 20 161.59375 L 20 78.40625 C 20 73.765625 23.765625 70 28.40625 70 L 111.59375 70 C 116.234375 70 120 73.765625 120 78.40625 L 120 161.59375 C 120 166.234375 116.234375 170 111.59375 170 Z M 111.59375 170 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(100%,100%,100%)"
          fillOpacity="1"
          d="M 49.035156 95 L 60.964844 95 L 70.644531 113.769531 L 80.875 95 L 92.019531 95 L 76.664062 120 L 92.371094 145 L 80.613281 145 L 70.066406 125.351562 L 59.558594 145 L 47.628906 145 L 63.59375 119.910156 Z M 49.035156 95 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(100%,100%,100%)"
          fillOpacity="1"
          d="M 180 180 C 152.5 180 120 205 120 205 C 120 205 152.5 230 180 230 C 207.5 230 240 205 240 205 C 240 205 207.5 180 180 180 Z M 180 180 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(0%,58.823532%,53.333336%)"
          fillOpacity="1"
          d="M 180 180 C 173.5 180 167.5 181 162 182.5 C 157.5 187 155 193.5 155 200 C 155 214 166 225 180 225 C 194 225 205 214 205 200 C 205 193.5 202.5 187 198 182.5 C 192.5 181 186.5 180 180 180 Z M 180 180 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(14.901961%,19.607843%,21.960784%)"
          fillOpacity="1"
          d="M 190 200 C 190 205.523438 185.523438 210 180 210 C 174.476562 210 170 205.523438 170 200 C 170 194.476562 174.476562 190 180 190 C 185.523438 190 190 194.476562 190 200 Z M 190 200 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(100%,100%,100%)"
          fillOpacity="1"
          d="M 180 190 C 180 187 182 185 185 185 C 188 185 190 187 190 190 C 190 193 188 195 185 195 C 182 195 180 193 180 190 "
        />
        <path
          stroke="none"
          fillRule="nonzero"
          fill="rgb(100%,65.490198%,14.901961%)"
          fillOpacity="1"
          d="M 120 205 C 120 205 145 165 180 165 C 215 165 240 205 240 205 C 240 205 205 180 180 180 C 155 180 120 205 120 205 Z M 180 240 C 215 240 240 205 240 205 C 240 205 205 230 180 230 C 155 230 120 205 120 205 C 120 205 145 240 180 240 Z M 180 240 "
        />
      </g>
    </svg>
  );
}
export function HorizontalToVerticalIcon({ width, height, color }) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 174.16 160.87"
      width="12px"
      height="12px"
    >
      <path
        d="M157.28,56.69S187,51.29,187,66.29v36l19-20"
        transform="translate(-36.59 -50.99)"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="129.41"
        y1="31.29"
        x2="150.41"
        y2="51.26"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <polyline
        points="61.28 69.12 53.78 69.12 53.78 76.62"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="53.78"
        y1="89.71"
        x2="53.78"
        y2="142.08"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
        strokeDasharray="16.363636016845703,13.090909004211426"
      />
      <polyline
        points="53.78 148.62 53.78 156.12 61.28 156.12"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="73.93"
        y1="156.12"
        x2="152.96"
        y2="156.12"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
        strokeDasharray="15.806451797485352,12.645161628723145"
      />
      <polyline
        points="159.28 156.12 166.78 156.12 166.78 148.62"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="166.78"
        y1="135.53"
        x2="166.78"
        y2="83.17"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
        strokeDasharray="16.363636016845703,13.090909004211426"
      />
      <polyline
        points="166.78 76.62 166.78 69.12 159.28 69.12"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="146.64"
        y1="69.12"
        x2="67.6"
        y2="69.12"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
        strokeDasharray="15.806451797485352,12.645161628723145"
      />
      <polyline
        points="38.28 115.62 4.75 115.62 4.75 5.03 90.81 5.03 90.81 51.15"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
    </svg>
  );
}
export function VerticalToHorizontalIcon({ width, height, color }) {
  return (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 161.54 171.53"
      width="12px"
      height="12px"
    >
      <polyline
        points="91.75 110.25 91.75 117.75 84.25 117.75"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="71.16"
        y1="117.75"
        x2="18.8"
        y2="117.75"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
        strokeDasharray="16.363636016845703,13.090909004211426"
      />
      <polyline
        points="12.25 117.75 4.75 117.75 4.75 110.25"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="4.75"
        y1="97.6"
        x2="4.75"
        y2="18.57"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
        strokeDasharray="16.363636016845703,13.090909004211426"
      />
      <polyline
        points="4.75 12.25 4.75 4.75 12.25 4.75"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="25.34"
        y1="4.75"
        x2="77.7"
        y2="4.75"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
        strokeDasharray="16.363636016845703,13.090909004211426"
      />
      <polyline
        points="84.25 4.75 91.75 4.75 91.75 12.25"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="91.75"
        y1="24.9"
        x2="91.75"
        y2="103.93"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
        strokeDasharray="15.806451797485352,12.645161628723145"
      />
      <polyline
        points="45.25 133.25 45.25 166.78 155.84 166.78 155.84 80.72 109.72 80.72"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <path
        d="M203.59,96.72S209,67,194,67H158l20-19"
        transform="translate(-47.75 -40.75)"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
      <line
        x1="130.25"
        y1="47.25"
        x2="110.28"
        y2="26.25"
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9.5px"
      />
    </svg>
  );
}
export function InfoIcon({ color }) {
    return (
      <>
        <svg
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26 26"
          width="10px"
          height="10px"
        >
          <path d="M 13 1.1875 C 6.476563 1.1875 1.1875 6.476563 1.1875 13 C 1.1875 19.523438 6.476563 24.8125 13 24.8125 C 19.523438 24.8125 24.8125 19.523438 24.8125 13 C 24.8125 6.476563 19.523438 1.1875 13 1.1875 Z M 15.460938 19.496094 C 14.851563 19.734375 14.367188 19.917969 14.003906 20.042969 C 13.640625 20.167969 13.222656 20.230469 12.742188 20.230469 C 12.007813 20.230469 11.433594 20.050781 11.023438 19.691406 C 10.617188 19.335938 10.414063 18.878906 10.414063 18.324219 C 10.414063 18.109375 10.429688 17.890625 10.460938 17.667969 C 10.488281 17.441406 10.539063 17.191406 10.605469 16.90625 L 11.367188 14.21875 C 11.433594 13.960938 11.492188 13.71875 11.539063 13.488281 C 11.585938 13.257813 11.605469 13.046875 11.605469 12.855469 C 11.605469 12.515625 11.535156 12.273438 11.394531 12.140625 C 11.25 12.003906 10.980469 11.9375 10.582031 11.9375 C 10.386719 11.9375 10.183594 11.96875 9.976563 12.027344 C 9.769531 12.089844 9.59375 12.148438 9.445313 12.203125 L 9.648438 11.375 C 10.144531 11.171875 10.621094 11 11.078125 10.855469 C 11.53125 10.710938 11.964844 10.636719 12.367188 10.636719 C 13.097656 10.636719 13.664063 10.816406 14.058594 11.167969 C 14.453125 11.519531 14.652344 11.980469 14.652344 12.542969 C 14.652344 12.660156 14.640625 12.867188 14.613281 13.160156 C 14.585938 13.453125 14.535156 13.722656 14.460938 13.972656 L 13.703125 16.652344 C 13.640625 16.867188 13.585938 17.113281 13.535156 17.386719 C 13.488281 17.660156 13.464844 17.871094 13.464844 18.011719 C 13.464844 18.367188 13.542969 18.613281 13.703125 18.742188 C 13.859375 18.871094 14.136719 18.933594 14.53125 18.933594 C 14.714844 18.933594 14.921875 18.902344 15.15625 18.839844 C 15.386719 18.773438 15.554688 18.71875 15.660156 18.667969 Z M 15.324219 8.617188 C 14.972656 8.945313 14.546875 9.109375 14.050781 9.109375 C 13.554688 9.109375 13.125 8.945313 12.769531 8.617188 C 12.414063 8.289063 12.238281 7.890625 12.238281 7.425781 C 12.238281 6.960938 12.417969 6.558594 12.769531 6.226563 C 13.125 5.894531 13.554688 5.730469 14.050781 5.730469 C 14.546875 5.730469 14.972656 5.894531 15.324219 6.226563 C 15.679688 6.558594 15.855469 6.960938 15.855469 7.425781 C 15.855469 7.890625 15.679688 8.289063 15.324219 8.617188 Z" />
        </svg>
      </>
    );
}
export function GroupFlagIcon({ color, id }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 487.41 487.41"
        width="23px"
        height="24px"
      >
        <defs>
          <linearGradient
            id={id}
            x1="199.91"
            y1="374.99"
            x2="358.98"
            y2="-18.73"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.57" stopColor={color} />
            <stop offset="1" stopColor="rgba(255,255,255,0.7)" />
          </linearGradient>
        </defs>
        <path
          d="M8,9H412a80,80,0,0,1,80,80V493Z"
          transform="translate(-5.59 -8)"
          fill={`url(#${id})`}
          stroke={color}
          strokeMiterlimit="10"
          strokeOpacity="0.71"
          strokeWidth="2px"
        />
      </svg>
    );
}