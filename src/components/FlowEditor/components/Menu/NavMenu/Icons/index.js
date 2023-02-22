/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import themeColor from "components/Shared/ThemeReference";
import React from "react";

export function RedoIcon({ theme, disable }) {
  return (
    <svg
      fill={disable ? "gray" : themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="25px"
      height="25px"
    >
      <path
        fill={disable ? "gray" : themeColor[theme].iconColor}
        d="M37,36h30L56,25l7-7l16,16l7,7l-7,7L63,64l-7-7l11-11H37c-7.168,0-13,5.832-13,13s5.832,13,13,13h9 v10h-9c-12.683,0-23-10.318-23-23S24.317,36,37,36z"
      />
      <path
        fill={disable ? "gray" : themeColor[theme].iconColor}
        d="M69 31c-.128 0-.256-.049-.354-.146l-5-5c-.195-.195-.195-.512 0-.707s.512-.195.707 0l5 5c.195.195.195.512 0 .707C69.256 30.951 69.128 31 69 31zM75.5 37.5c-.128 0-.256-.049-.354-.146l-2.5-2.5c-.195-.195-.195-.512 0-.707s.512-.195.707 0l2.5 2.5c.195.195.195.512 0 .707C75.756 37.451 75.628 37.5 75.5 37.5zM64 57c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l11-11c.195-.195.512-.195.707 0s.195.512 0 .707l-11 11C64.256 56.951 64.128 57 64 57zM79.5 41.5c-.128 0-.256-.049-.354-.146l-1.5-1.5c-.195-.195-.195-.512 0-.707s.512-.195.707 0l1.5 1.5c.195.195.195.512 0 .707C79.756 41.451 79.628 41.5 79.5 41.5z"
      />
      <path
        fill={disable ? "gray" : themeColor[theme].iconColor}
        d="M46,83h-9c-13.233,0-24-10.767-24-24s10.767-24,24-24h27.586l-9.293-9.293 c-0.391-0.391-0.391-1.023,0-1.414l7-7c0.391-0.391,1.023-0.391,1.414,0l23,23c0.391,0.391,0.391,1.023,0,1.414l-23,23 c-0.391,0.391-1.023,0.391-1.414,0l-7-7c-0.391-0.391-0.391-1.023,0-1.414L64.586,47H37c-6.617,0-12,5.383-12,12s5.383,12,12,12h9 c0.553,0,1,0.447,1,1v10C47,82.553,46.553,83,46,83z M37,37c-12.131,0-22,9.869-22,22s9.869,22,22,22h8v-8h-8c-7.72,0-14-6.28-14-14 s6.28-14,14-14h30c0.404,0,0.77,0.243,0.924,0.617c0.155,0.374,0.069,0.804-0.217,1.09L57.414,57L63,62.586L84.586,41L63,19.414 L57.414,25l10.293,10.293c0.286,0.286,0.372,0.716,0.217,1.09C67.77,36.757,67.404,37,67,37H37z"
      />
    </svg>
  );
}
export function UndoIcon({ theme, disable }) {
  return (
    <svg
      fill={disable ? "gray" : themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="25px"
      height="25px"
    >
      <path
        fill={disable ? "gray" : themeColor[theme].iconColor}
        d="M63,36H33l11-11l-7-7L21,34l-7,7l7,7l16,16l7-7L33,46h30c7.168,0,13,5.832,13,13s-5.832,13-13,13h-9 v10h9c12.683,0,23-10.318,23-23S75.683,36,63,36z"
      />
      <path
        fill={
          disable
            ? "gray"
            : theme === "dark"
            ? themeColor.iconColor
            : themeColor.LIGHT_ICON
        }
        d="M31 31c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l5-5c.195-.195.512-.195.707 0s.195.512 0 .707l-5 5C31.256 30.951 31.128 31 31 31zM24.5 37.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l2.5-2.5c.195-.195.512-.195.707 0s.195.512 0 .707l-2.5 2.5C24.756 37.451 24.628 37.5 24.5 37.5zM36 57c-.128 0-.256-.049-.354-.146l-11-11c-.195-.195-.195-.512 0-.707s.512-.195.707 0l11 11c.195.195.195.512 0 .707C36.256 56.951 36.128 57 36 57zM20.5 41.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l1.5-1.5c.195-.195.512-.195.707 0s.195.512 0 .707l-1.5 1.5C20.756 41.451 20.628 41.5 20.5 41.5z"
      />
      <path
        fill={disable ? "gray" : themeColor[theme].iconColor}
        d="M63,83h-9c-0.553,0-1-0.447-1-1V72c0-0.553,0.447-1,1-1h9c6.617,0,12-5.383,12-12s-5.383-12-12-12 H35.414l9.293,9.293c0.391,0.391,0.391,1.023,0,1.414l-7,7c-0.391,0.391-1.023,0.391-1.414,0l-23-23 c-0.391-0.391-0.391-1.023,0-1.414l23-23c0.391-0.391,1.023-0.391,1.414,0l7,7c0.391,0.391,0.391,1.023,0,1.414L35.414,35H63 c13.233,0,24,10.767,24,24S76.233,83,63,83z M55,81h8c12.131,0,22-9.869,22-22s-9.869-22-22-22H33c-0.404,0-0.77-0.243-0.924-0.617 c-0.155-0.374-0.069-0.804,0.217-1.09L42.586,25L37,19.414L15.414,41L37,62.586L42.586,57L32.293,46.707 c-0.286-0.286-0.372-0.716-0.217-1.09C32.23,45.243,32.596,45,33,45h30c7.72,0,14,6.28,14,14s-6.28,14-14,14h-8V81z"
      />
    </svg>
  );
}
export function SaveIcon({ theme }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="25px"
      height="25px"
    >
      {" "}
      <path d="M 6 3 C 4.343 3 3 4.343 3 6 L 3 38 C 3 39.657 4.343 41 6 41 L 7 41 L 7 12 C 7 9.239 9.239 7 12 7 L 36.414062 7 L 32.707031 3.2929688 C 32.519031 3.1049687 32.265 3 32 3 L 6 3 z M 12 9 C 10.346 9 9 10.346 9 12 L 9 44 C 9 45.654 10.346 47 12 47 L 44 47 C 45.654 47 47 45.654 47 44 L 47 18 C 47 17.735 46.895031 17.479969 46.707031 17.292969 L 38.707031 9.2929688 C 38.520031 9.1049688 38.265 9 38 9 L 12 9 z M 17 11 L 37 11 L 37 22 C 37 23.105 36.105 24 35 24 L 19 24 C 17.895 24 17 23.105 17 22 L 17 11 z M 31 13 L 31 22 L 34 22 L 34 13 L 31 13 z M 19 30 L 37 30 C 38.1 30 39 30.9 39 32 L 39 45 L 17 45 L 17 32 C 17 30.9 17.9 30 19 30 z M 12 42 L 14 42 L 14 44 L 12 44 L 12 42 z M 42 42 L 44 42 L 44 44 L 42 44 L 42 42 z" />
    </svg>
  );
}
export function MapIcon({ theme }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width="25px"
      height="25px"
    >
      <path
        fill={themeColor[theme].iconColor}
        d="M64,21c-21.5,0-38.8,17.3-39.5,39.4c-0.6,20.7,19.5,48.3,31.6,62.8c2,2.4,4.9,3.7,7.9,3.7s6-1.4,7.9-3.7c12.1-14.6,32.2-42.1,31.6-62.8C102.8,38.3,85.5,21,64,21z"
      />
      <path
        fill="gray"
        d="M64 45.9A14.6 14.6 0 1 0 64 75.1A14.6 14.6 0 1 0 64 45.9Z"
      />
      <path
        fill="#444b54"
        d="M94,127H64c-1.7,0-3-1.3-3-3s1.3-3,3-3h30c1.7,0,3,1.3,3,3S95.7,127,94,127z"
      />
      <g>
        <path
          fill="#444b54"
          d="M111,127c-0.2,0-0.4,0-0.6-0.1c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.1-0.3-0.2-0.5-0.3c-0.2-0.1-0.3-0.2-0.5-0.4c-0.1-0.1-0.3-0.3-0.4-0.4c-0.1-0.2-0.2-0.3-0.3-0.5c-0.1-0.2-0.1-0.4-0.2-0.6c0-0.2-0.1-0.4-0.1-0.6c0-0.2,0-0.4,0.1-0.6c0-0.2,0.1-0.4,0.2-0.6c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.2,0.2-0.3,0.4-0.5s0.3-0.3,0.5-0.4c0.2-0.1,0.3-0.2,0.5-0.3c0.2-0.1,0.4-0.1,0.6-0.2c0.4-0.1,0.8-0.1,1.2,0c0.2,0,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.2,0.5,0.3c0.2,0.1,0.3,0.2,0.5,0.4c0.1,0.1,0.3,0.3,0.4,0.5c0.1,0.2,0.2,0.3,0.3,0.5c0.1,0.2,0.1,0.4,0.2,0.6c0,0.2,0.1,0.4,0.1,0.6c0,0.2,0,0.4-0.1,0.6c0,0.2-0.1,0.4-0.2,0.6c-0.1,0.2-0.2,0.4-0.3,0.5c-0.1,0.2-0.2,0.3-0.4,0.4c-0.1,0.1-0.3,0.3-0.5,0.4c-0.2,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.2C111.4,127,111.2,127,111,127z"
        />
      </g>
    </svg>
  );
}
export function SettingsIcon({ color }) {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="25px"
      height="25px"
    >
      {" "}
      <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z" />
    </svg>
  );
}
export function TuneIcon({ color }) {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="25px"
      height="25px"
    >
      <path d="M 32.5 6 C 30.791667 6 29.320482 6.6946334 28.378906 7.7539062 C 27.794645 8.411201 27.467795 9.1911149 27.255859 10 L 5.5 10 A 1.50015 1.50015 0 1 0 5.5 13 L 27.255859 13 C 27.467795 13.808885 27.794645 14.588799 28.378906 15.246094 C 29.320482 16.305367 30.791667 17 32.5 17 C 34.208333 17 35.679518 16.305367 36.621094 15.246094 C 37.205355 14.588799 37.532205 13.808885 37.744141 13 L 42.5 13 A 1.50015 1.50015 0 1 0 42.5 10 L 37.744141 10 C 37.532205 9.1911149 37.205355 8.411201 36.621094 7.7539062 C 35.679518 6.6946334 34.208333 6 32.5 6 z M 32.5 9 C 33.458333 9 33.987149 9.3053665 34.378906 9.7460938 C 34.770664 10.186821 35 10.833333 35 11.5 C 35 12.166667 34.770664 12.813179 34.378906 13.253906 C 33.987149 13.694633 33.458333 14 32.5 14 C 31.541667 14 31.012851 13.694633 30.621094 13.253906 C 30.229336 12.813179 30 12.166667 30 11.5 C 30 10.833333 30.229336 10.186821 30.621094 9.7460938 C 31.012851 9.3053665 31.541667 9 32.5 9 z M 15.5 18.5 C 13.791667 18.5 12.320482 19.194633 11.378906 20.253906 C 10.794645 20.911201 10.467795 21.691115 10.255859 22.5 L 5.5 22.5 A 1.50015 1.50015 0 1 0 5.5 25.5 L 10.255859 25.5 C 10.467795 26.308885 10.794645 27.088799 11.378906 27.746094 C 12.320482 28.805367 13.791667 29.5 15.5 29.5 C 17.208333 29.5 18.679518 28.805367 19.621094 27.746094 C 20.205355 27.088799 20.532205 26.308885 20.744141 25.5 L 42.5 25.5 A 1.50015 1.50015 0 1 0 42.5 22.5 L 20.744141 22.5 C 20.532205 21.691115 20.205355 20.911201 19.621094 20.253906 C 18.679518 19.194633 17.208333 18.5 15.5 18.5 z M 15.5 21.5 C 16.458333 21.5 16.987149 21.805367 17.378906 22.246094 C 17.770664 22.686821 18 23.333333 18 24 C 18 24.666667 17.770664 25.313179 17.378906 25.753906 C 16.987149 26.194633 16.458333 26.5 15.5 26.5 C 14.541667 26.5 14.012851 26.194633 13.621094 25.753906 C 13.229336 25.313179 13 24.666667 13 24 C 13 23.333333 13.229336 22.686821 13.621094 22.246094 C 14.012851 21.805367 14.541667 21.5 15.5 21.5 z M 30.5 31 C 28.791667 31 27.320482 31.694633 26.378906 32.753906 C 25.794645 33.411201 25.467795 34.191115 25.255859 35 L 5.5 35 A 1.50015 1.50015 0 1 0 5.5 38 L 25.255859 38 C 25.467795 38.808885 25.794645 39.588799 26.378906 40.246094 C 27.320482 41.305367 28.791667 42 30.5 42 C 32.208333 42 33.679518 41.305367 34.621094 40.246094 C 35.205355 39.588799 35.532205 38.808885 35.744141 38 L 42.5 38 A 1.50015 1.50015 0 1 0 42.5 35 L 35.744141 35 C 35.532205 34.191115 35.205355 33.411201 34.621094 32.753906 C 33.679518 31.694633 32.208333 31 30.5 31 z M 30.5 34 C 31.458333 34 31.987149 34.305367 32.378906 34.746094 C 32.770664 35.186821 33 35.833333 33 36.5 C 33 37.166667 32.770664 37.813179 32.378906 38.253906 C 31.987149 38.694633 31.458333 39 30.5 39 C 29.541667 39 29.012851 38.694633 28.621094 38.253906 C 28.229336 37.813179 28 37.166667 28 36.5 C 28 35.833333 28.229336 35.186821 28.621094 34.746094 C 29.012851 34.305367 29.541667 34 30.5 34 z" />
    </svg>
  );
}
export function GuideIcon({ color, width, height }) {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={width || "25px"}
      height={height || "25px"}
    >
      <path d="M8,127h90c7.2,0,13-5.8,13-13V26c0-7.2-5.8-13-13-13H53.9c-1.6,0-2.9,1.3-2.9,2.9c0,0,0,0,0,0c0.1,8.6,1.8,17.2,5.7,25 l2.1,4.3c0.4,0.8,0.5,1.7,0.2,2.5c-0.6,1.5-2.2,2.3-3.6,1.9l-12.6-3.6l-6.6,13.4c-0.5,1-1.5,1.7-2.7,1.7h0c-1.1,0-2.2-0.6-2.7-1.7 l-1-1.9C23.4,44.6,20,30.2,20,15.9c0-1.6-1.3-2.9-2.9-2.9h-2.9c-1.6,0-3.1-1.2-3.2-2.8C10.9,8.4,12.3,7,14,7h86c9.4,0,17,7.6,17,17 v90c0,1.7,1.4,3.1,3.2,3c1.6-0.1,2.8-1.5,2.8-3.2V24c0-12.7-10.3-23-23-23H14c-5,0-9,4-9,9v114C5,125.7,6.3,127,8,127z M28,76h55 c1.7,0,3,1.3,3,3s-1.3,3-3,3H28c-1.7,0-3-1.3-3-3S26.3,76,28,76z M28,96h35c1.7,0,3,1.3,3,3s-1.3,3-3,3H28c-1.7,0-3-1.3-3-3 S26.3,96,28,96z" />
    </svg>
  );
}
export function ProfileIcon({ color, width, height }) {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={width}
      height={height}
    >
      <path fill="#72caaf" d="M31 5A28 28 0 1 0 31 61A28 28 0 1 0 31 5Z" />
      <path
        fill="#7dd8ba"
        d="M12.71 54.29a28 28 0 0 0 9.18 5.82L56 26V19.57a28.1 28.1 0 0 0-3.71-4.86zM10.76 52.24L50 13H44L8.22 48.78A28.08 28.08 0 0 0 10.76 52.24z"
      />
      <path
        fill="#c2cde7"
        d="M46.33,48.78a22,22,0,0,1-30.93-.26c1.07-2.21,3.1-5.45,5.87-5.62,0,0,5.56,2.77,9.79,2.11a79.26,79.26,0,0,0,9.66-2.38A11.64,11.64,0,0,1,46.33,48.78Z"
      />
      <path
        fill="#7dd8ba"
        d="M7.79,45.21,41,12l-3-2L6.36,41.64A27.81,27.81,0,0,0,7.79,45.21Z"
      />
      <path
        fill="#ced8ed"
        d="M17.86 31.59L21.2 18.49 29.01 26.12 17.86 31.59zM33.02 26.12L40.3 18.73 42.27 22.07 43.88 30.73 33.02 26.12z"
      />
      <path fill="#b5c4e0" d="M31 25A14 10 0 1 0 31 45A14 10 0 1 0 31 25Z" />
      <path
        fill="#f9e3ae"
        d="M31,5A28,28,0,1,0,59,33,28,28,0,0,0,31,5Zm0,50A22,22,0,1,1,46.17,17.07l.68.67q.39.4.75.82A22,22,0,0,1,31,55Z"
      />
      <path
        fill="#f6d397"
        d="M58.61,37.71a28,28,0,0,1-55.22,0,4,4,0,0,1,4-4.71H9a22,22,0,1,0,44,0h1.66A4,4,0,0,1,58.61,37.71Z"
      />
      <path
        fill="#8d6c9f"
        d="M31,4A29,29,0,1,0,60,33,29,29,0,0,0,31,4Zm0,56A27,27,0,1,1,58,33,27,27,0,0,1,31,60Z"
      />
      <path
        fill="#8d6c9f"
        d="M31 52a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V53A1 1 0 0 0 31 52zM37 52.08a1 1 0 0 0-1.93.52l.52 1.93A1 1 0 0 0 37.53 54zM21.75 49.52a1 1 0 0 0-1.37.37l-1 1.73a1 1 0 0 0 1.73 1l1-1.73A1 1 0 0 0 21.75 49.52zM41.62 49.89a1 1 0 0 0-1.73 1l1 1.73a1 1 0 0 0 1.73-1zM26.21 51.37a1 1 0 0 0-1.22.71L24.47 54a1 1 0 1 0 1.93.52l.52-1.93A1 1 0 0 0 26.21 51.37zM38.35 13.32a21.2 21.2 0 0 1 2.1.92 1 1 0 1 0 .9-1.79 22.82 22.82 0 0 0-2.3-1 1 1 0 1 0-.7 1.87z"
      />
      <path
        fill="#8d6c9f"
        d="M47.26,16.74a23.35,23.35,0,0,0-2.09-1.86,1,1,0,1,0-1.23,1.57,21.35,21.35,0,0,1,1.91,1.7,21,21,0,0,1,.84,28.77,9.66,9.66,0,0,0-4.42-4.55c2.66-2,4.61-4.56,3.18-10.23L42.69,19.94a2.66,2.66,0,0,0-4.59-1.17l-4.73,5.36-.3,0-.34,0C32.17,24,31.6,24,31,24H31c-.46,0-.93,0-1.39.05l-.5,0-.44,0L23.9,18.77a2.66,2.66,0,0,0-4.59,1.17L16.55,32.11c-1.41,5.62.46,8.2,3.07,10.17a9.59,9.59,0,0,0-4.49,4.44,21,21,0,0,1,19.2-34.46,1,1,0,0,0,.32-2,23,23,0,0,0-19.92,39l0,0a2.65,2.65,0,0,0,.34.21l0,0a1,1,0,0,0,.31,0,1,1,0,0,0,.35-.07l.09,0a1,1,0,0,0,.22-.14l.05,0,0,0a1,1,0,0,0,.14-.21,1,1,0,0,0,.05-.1l0,0a7.56,7.56,0,0,1,5.12-5.15,1,1,0,0,0,.14-.07A18.83,18.83,0,0,0,31,46a18.89,18.89,0,0,0,9.22-2.28,7.56,7.56,0,0,1,5.1,5.15,1,1,0,0,0,1,.69l.16,0,.12,0a1,1,0,0,0,.71-.29A23,23,0,0,0,47.26,16.74ZM22,41.49c-2.86-1.91-4.78-3.66-3.46-8.91l2.76-12.19a.64.64,0,0,1,.48-.49l.17,0a.63.63,0,0,1,.49.22l3.93,4.45c-.56.13-1.11.29-1.64.47a17.12,17.12,0,0,0-2.12.88,1,1,0,0,0,.89,1.79,15.06,15.06,0,0,1,1.88-.78A17.16,17.16,0,0,1,29,26.12l.61-.06c.39,0,.79,0,1.18,0h.26c.5,0,1,0,1.5.07l.46,0a16.93,16.93,0,0,1,4.6,1.14,14.18,14.18,0,0,1,1.87.94,1,1,0,0,0,1-1.72,16.27,16.27,0,0,0-2.13-1.07,18.16,18.16,0,0,0-2.72-.85L39.6,20.1a.66.66,0,0,1,1.14.29L43.51,32.6c1.32,5.23-.61,7-3.46,8.89A16.44,16.44,0,0,1,31,44,16.44,16.44,0,0,1,22,41.49Z"
      />
      <path
        fill="#8d6c9f"
        d="M34.29,37.29l-.59.59a1,1,0,0,1-1.41,0L32,37.59V35.72a2,2,0,1,0-2,0v1.86l-.29.29a1,1,0,0,1-1.41,0l-.59-.59a1,1,0,0,0-1.41,1.41l.59.59a3,3,0,0,0,4.12.11,3,3,0,0,0,4.12-.11l.59-.59a1,1,0,0,0-1.41-1.41Z"
      />
    </svg>
  );
}
export function ShareIcon({ width, height, onClick, theme }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      onClick={onClick}
    >
      {" "}
      <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z" />
    </svg>
  );
}
export function FitViewIcon({ theme }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 30"
      width="20px"
      height="20px"
      style={{ marginTop: "-5px" }}
      fill={themeColor[theme].iconColor}
    >
      <path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94a.919.919 0 01-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" />
    </svg>
  );
}
export function ZoomInIcon({ theme }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width="23px"
      height="23px"
    >
      <path d="M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 9 5 L 9 9 L 5 9 L 5 11 L 9 11 L 9 15 L 11 15 L 11 11 L 15 11 L 15 9 L 11 9 L 11 5 Z" />
    </svg>
  );
}
export function ZoomOutIcon({ theme }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
      width="23px"
      height="23px"
    >
      <path d="M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 5 9 L 5 11 L 15 11 L 15 9 Z" />
    </svg>
  );
}
export function LockIcon({ theme }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="23px"
      height="23px"
    >
      <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.300781 20 6 21.300781 6 23 L 6 47 C 6 48.699219 7.300781 50 9 50 L 41 50 C 42.699219 50 44 48.699219 44 47 L 44 23 C 44 21.300781 42.699219 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 25 30 C 26.699219 30 28 31.300781 28 33 C 28 33.898438 27.601563 34.6875 27 35.1875 L 27 38 C 27 39.101563 26.101563 40 25 40 C 23.898438 40 23 39.101563 23 38 L 23 35.1875 C 22.398438 34.6875 22 33.898438 22 33 C 22 31.300781 23.300781 30 25 30 Z" />
    </svg>
  );
}
export function UnLockIcon({ theme }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="23px"
      height="23px"
    >
      <path d="M 22.78125 0 C 21.605469 -0.00390625 20.40625 0.164063 19.21875 0.53125 C 12.902344 2.492188 9.289063 9.269531 11.25 15.59375 L 11.25 15.65625 C 11.507813 16.367188 12.199219 18.617188 12.625 20 L 9 20 C 7.300781 20 6 21.300781 6 23 L 6 47 C 6 48.699219 7.300781 50 9 50 L 41 50 C 42.699219 50 44 48.699219 44 47 L 44 23 C 44 21.300781 42.699219 20 41 20 L 14.75 20 C 14.441406 19.007813 13.511719 16.074219 13.125 15 L 13.15625 15 C 11.519531 9.722656 14.5 4.109375 19.78125 2.46875 C 25.050781 0.832031 30.695313 3.796875 32.34375 9.0625 C 32.34375 9.066406 32.34375 9.089844 32.34375 9.09375 C 32.570313 9.886719 33.65625 13.40625 33.65625 13.40625 C 33.746094 13.765625 34.027344 14.050781 34.386719 14.136719 C 34.75 14.226563 35.128906 14.109375 35.375 13.832031 C 35.621094 13.550781 35.695313 13.160156 35.5625 12.8125 C 35.5625 12.8125 34.433594 9.171875 34.25 8.53125 L 34.25 8.5 C 32.78125 3.761719 28.601563 0.542969 23.9375 0.0625 C 23.550781 0.0234375 23.171875 0 22.78125 0 Z M 25 30 C 26.699219 30 28 31.300781 28 33 C 28 33.898438 27.601563 34.6875 27 35.1875 L 27 38 C 27 39.101563 26.101563 40 25 40 C 23.898438 40 23 39.101563 23 38 L 23 35.1875 C 22.398438 34.6875 22 33.898438 22 33 C 22 31.300781 23.300781 30 25 30 Z" />
    </svg>
  );
}
// export function DeleteIcon({ theme, onClick }) {
//     return (
//       <>
//         <svg
//           fill={themeColor[theme].iconColor}
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 30 30"
//           width="25px"
//           height="25px"
//           onClick={onClick}
//         >
//           {" "}
//           <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
//         </svg>
//       </>
//     );
// }
export function DeleteIcon({ theme, onClick }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="23px"
      height="23px"
      onClick={onClick}
    >
      <path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 4 L 9.6875 4 C 8.464844 4 7.644531 4.894531 7.21875 6 L 7.09375 6 C 4.84375 6 3 7.867188 3 10.1875 L 3 11 C 3 11.550781 3.449219 12 4 12 L 5.125 12 L 10.21875 46.75 C 10.488281 48.636719 12.125 50 14 50 L 36 50 C 37.875 50 39.398438 48.605469 39.78125 46.8125 C 39.78125 46.792969 39.78125 46.769531 39.78125 46.75 L 44.875 12 L 46 12 C 46.550781 12 47 11.550781 47 11 L 47 10.1875 C 47 7.867188 45.15625 6 42.90625 6 L 42.78125 6 C 42.355469 4.894531 41.535156 4 40.3125 4 L 32 4 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.554688 2 30 2.445313 30 3 L 30 4 L 20 4 L 20 3 C 20 2.445313 20.445313 2 21 2 Z M 9.6875 6 L 40.3125 6 C 40.710938 6 41.1875 6.445313 41.1875 7 C 41.1875 7.550781 41.636719 8 42.1875 8 L 42.90625 8 C 43.988281 8 44.835938 8.835938 44.9375 10 L 5.0625 10 C 5.164063 8.835938 6.011719 8 7.09375 8 L 7.8125 8 C 8.363281 8 8.8125 7.550781 8.8125 7 C 8.8125 6.445313 9.289063 6 9.6875 6 Z M 7.15625 12 L 42.84375 12 L 37.8125 46.375 C 37.597656 47.378906 36.921875 48 36 48 L 14 48 C 13.078125 48 12.316406 47.378906 12.1875 46.46875 Z M 12.25 16.28125 C 11.984375 16.320313 11.742188 16.464844 11.585938 16.679688 C 11.425781 16.898438 11.363281 17.171875 11.40625 17.4375 L 14.71875 42.34375 C 14.730469 42.726563 14.960938 43.066406 15.3125 43.222656 C 15.664063 43.378906 16.070313 43.320313 16.363281 43.074219 C 16.65625 42.824219 16.78125 42.433594 16.6875 42.0625 L 13.40625 17.15625 C 13.375 16.882813 13.234375 16.636719 13.015625 16.46875 C 12.796875 16.304688 12.519531 16.238281 12.25 16.28125 Z M 20.65625 16.28125 C 20.140625 16.359375 19.773438 16.824219 19.8125 17.34375 L 20.90625 42.25 C 20.933594 42.800781 21.402344 43.230469 21.953125 43.203125 C 22.503906 43.175781 22.933594 42.707031 22.90625 42.15625 L 21.8125 17.25 C 21.804688 16.980469 21.6875 16.722656 21.488281 16.539063 C 21.285156 16.359375 21.019531 16.265625 20.75 16.28125 C 20.71875 16.28125 20.6875 16.28125 20.65625 16.28125 Z M 29.03125 16.28125 C 28.550781 16.355469 28.195313 16.765625 28.1875 17.25 L 27.09375 42.15625 C 27.066406 42.707031 27.496094 43.175781 28.046875 43.203125 C 28.597656 43.230469 29.066406 42.800781 29.09375 42.25 L 30.1875 17.34375 C 30.207031 17.058594 30.101563 16.777344 29.898438 16.570313 C 29.691406 16.367188 29.410156 16.261719 29.125 16.28125 C 29.09375 16.28125 29.0625 16.28125 29.03125 16.28125 Z M 37.4375 16.28125 C 36.992188 16.347656 36.644531 16.707031 36.59375 17.15625 L 33.3125 42.0625 C 33.21875 42.433594 33.34375 42.824219 33.636719 43.074219 C 33.929688 43.320313 34.335938 43.378906 34.6875 43.222656 C 35.039063 43.066406 35.269531 42.726563 35.28125 42.34375 L 38.59375 17.4375 C 38.640625 17.136719 38.550781 16.828125 38.34375 16.601563 C 38.136719 16.375 37.835938 16.257813 37.53125 16.28125 C 37.5 16.28125 37.46875 16.28125 37.4375 16.28125 Z" />
    </svg>
  );
}
export function RotateAllIcon({ theme }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="25px"
      height="25px"
    >
      <title />
      <desc />
      <defs />
      <g
        fill={themeColor[theme].iconColor}
        fillRule="evenodd"
        id="Page-1"
        stroke="none"
        strokeWidth="1"
      >
        <g
          fill={themeColor[theme].iconColor}
          id="Icons-Device"
          transform="translate(-210.000000, -124.000000)"
        >
          <g id="screen-rotation" transform="translate(210.000000, 124.000000)">
            <path
              d="M16.5,2.5 C19.8,4 22.1,7.2 22.5,11 L24,11 C23.4,4.8 18.3,0 12,0 L11.3,0 L15.1,3.8 L16.5,2.5 L16.5,2.5 Z M10.2,1.7 C9.6,1.1 8.7,1.1 8.1,1.7 L1.7,8.1 C1.1,8.7 1.1,9.6 1.7,10.2 L13.7,22.2 C14.3,22.8 15.2,22.8 15.8,22.2 L22.2,15.8 C22.8,15.2 22.8,14.3 22.2,13.7 L10.2,1.7 L10.2,1.7 Z M14.8,21.2 L2.8,9.2 L9.2,2.8 L21.2,14.8 L14.8,21.2 L14.8,21.2 Z M7.5,21.5 C4.2,20 1.9,16.8 1.5,13 L0.1,13 C0.6,19.2 5.7,24 12,24 L12.7,24 L8.9,20.2 L7.5,21.5 L7.5,21.5 Z"
              id="Shape"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
export function SelectAllIcon({ theme }) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 237 237"
      width="23px"
      height="23px"
    >
      <rect
        x="3.5"
        y="3.5"
        width="230"
        height="230"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7px"
      />
      <rect
        x="31.78"
        y="31.78"
        width="75.41"
        height="75.41"
        rx="4"
        fill={themeColor[theme].iconColor}
      />
      <rect
        x="129.81"
        y="31.78"
        width="75.41"
        height="75.41"
        rx="4"
        fill={themeColor[theme].iconColor}
      />
      <rect
        x="31.78"
        y="129.81"
        width="75.41"
        height="75.41"
        rx="4"
        fill={themeColor[theme].iconColor}
      />
      <line
        x1="196.56"
        y1="190.91"
        x2="151.49"
        y2="145.84"
        fill="none"
        stroke={themeColor[theme].iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9px"
      />
      <line x1="153.38" y1="185.43" x2="191.08" y2="149.61" />
      <polygon
        points="143.95 138.29 156.21 186.37 191.08 151.49 143.95 138.29"
        fill={themeColor[theme].iconColor}
        stroke={themeColor[theme].iconColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5px"
      />
    </svg>
  );
}
export function ExpandAllIcon({ theme }) {
  return (
    <svg
      fill={themeColor[theme].iconColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width="25px"
      height="25px"
    >
      <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 8.5859375 10 L 6 10 A 1.0001 1.0001 0 1 0 6 12 L 10.847656 12 A 1.0001 1.0001 0 0 0 12 10.847656 L 12 6 A 1.0001 1.0001 0 0 0 10.984375 4.9863281 A 1.0001 1.0001 0 0 0 10 6 L 10 8.5859375 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z M 24.980469 3.9902344 A 1.0001 1.0001 0 0 0 24.292969 4.2929688 L 20 8.5859375 L 20 6 A 1.0001 1.0001 0 0 0 18.984375 4.9863281 A 1.0001 1.0001 0 0 0 18 6 L 18 10.847656 A 1.0001 1.0001 0 0 0 19.152344 12 L 24 12 A 1.0001 1.0001 0 1 0 24 10 L 21.414062 10 L 25.707031 5.7070312 A 1.0001 1.0001 0 0 0 24.980469 3.9902344 z M 10.980469 17.990234 A 1.0001 1.0001 0 0 0 10.869141 18 L 6 18 A 1.0001 1.0001 0 1 0 6 20 L 8.5859375 20 L 4.2929688 24.292969 A 1.0001 1.0001 0 1 0 5.7070312 25.707031 L 10 21.414062 L 10 24 A 1.0001 1.0001 0 1 0 12 24 L 12 19.126953 A 1.0001 1.0001 0 0 0 10.980469 17.990234 z M 18.990234 17.990234 A 1.0001 1.0001 0 0 0 18 19.128906 L 18 24 A 1.0001 1.0001 0 1 0 20 24 L 20 21.414062 L 24.292969 25.707031 A 1.0001 1.0001 0 1 0 25.707031 24.292969 L 21.414062 20 L 24 20 A 1.0001 1.0001 0 1 0 24 18 L 19.117188 18 A 1.0001 1.0001 0 0 0 18.990234 17.990234 z" />
    </svg>
  );
}
