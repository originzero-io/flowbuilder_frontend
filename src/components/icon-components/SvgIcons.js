import React from "react";

export function RedoIcon({ width, height, color }) {
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={width}
        height={height}
      >
        <path
          fill={color}
          d="M37,36h30L56,25l7-7l16,16l7,7l-7,7L63,64l-7-7l11-11H37c-7.168,0-13,5.832-13,13s5.832,13,13,13h9 v10h-9c-12.683,0-23-10.318-23-23S24.317,36,37,36z"
        />
        <path
          fill={color}
          d="M69 31c-.128 0-.256-.049-.354-.146l-5-5c-.195-.195-.195-.512 0-.707s.512-.195.707 0l5 5c.195.195.195.512 0 .707C69.256 30.951 69.128 31 69 31zM75.5 37.5c-.128 0-.256-.049-.354-.146l-2.5-2.5c-.195-.195-.195-.512 0-.707s.512-.195.707 0l2.5 2.5c.195.195.195.512 0 .707C75.756 37.451 75.628 37.5 75.5 37.5zM64 57c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l11-11c.195-.195.512-.195.707 0s.195.512 0 .707l-11 11C64.256 56.951 64.128 57 64 57zM79.5 41.5c-.128 0-.256-.049-.354-.146l-1.5-1.5c-.195-.195-.195-.512 0-.707s.512-.195.707 0l1.5 1.5c.195.195.195.512 0 .707C79.756 41.451 79.628 41.5 79.5 41.5z"
        />
        <path
          fill={color}
          d="M46,83h-9c-13.233,0-24-10.767-24-24s10.767-24,24-24h27.586l-9.293-9.293 c-0.391-0.391-0.391-1.023,0-1.414l7-7c0.391-0.391,1.023-0.391,1.414,0l23,23c0.391,0.391,0.391,1.023,0,1.414l-23,23 c-0.391,0.391-1.023,0.391-1.414,0l-7-7c-0.391-0.391-0.391-1.023,0-1.414L64.586,47H37c-6.617,0-12,5.383-12,12s5.383,12,12,12h9 c0.553,0,1,0.447,1,1v10C47,82.553,46.553,83,46,83z M37,37c-12.131,0-22,9.869-22,22s9.869,22,22,22h8v-8h-8c-7.72,0-14-6.28-14-14 s6.28-14,14-14h30c0.404,0,0.77,0.243,0.924,0.617c0.155,0.374,0.069,0.804-0.217,1.09L57.414,57L63,62.586L84.586,41L63,19.414 L57.414,25l10.293,10.293c0.286,0.286,0.372,0.716,0.217,1.09C67.77,36.757,67.404,37,67,37H37z"
        />
      </svg>
    </>
  );
}
export function UndoIcon({ width, height, color }) {
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={width}
        height={height}
      >
        <path
          fill={color}
          d="M63,36H33l11-11l-7-7L21,34l-7,7l7,7l16,16l7-7L33,46h30c7.168,0,13,5.832,13,13s-5.832,13-13,13h-9 v10h9c12.683,0,23-10.318,23-23S75.683,36,63,36z"
        />
        <path
          fill={color}
          d="M31 31c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l5-5c.195-.195.512-.195.707 0s.195.512 0 .707l-5 5C31.256 30.951 31.128 31 31 31zM24.5 37.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l2.5-2.5c.195-.195.512-.195.707 0s.195.512 0 .707l-2.5 2.5C24.756 37.451 24.628 37.5 24.5 37.5zM36 57c-.128 0-.256-.049-.354-.146l-11-11c-.195-.195-.195-.512 0-.707s.512-.195.707 0l11 11c.195.195.195.512 0 .707C36.256 56.951 36.128 57 36 57zM20.5 41.5c-.128 0-.256-.049-.354-.146-.195-.195-.195-.512 0-.707l1.5-1.5c.195-.195.512-.195.707 0s.195.512 0 .707l-1.5 1.5C20.756 41.451 20.628 41.5 20.5 41.5z"
        />
        <path
          fill={color}
          d="M63,83h-9c-0.553,0-1-0.447-1-1V72c0-0.553,0.447-1,1-1h9c6.617,0,12-5.383,12-12s-5.383-12-12-12 H35.414l9.293,9.293c0.391,0.391,0.391,1.023,0,1.414l-7,7c-0.391,0.391-1.023,0.391-1.414,0l-23-23 c-0.391-0.391-0.391-1.023,0-1.414l23-23c0.391-0.391,1.023-0.391,1.414,0l7,7c0.391,0.391,0.391,1.023,0,1.414L35.414,35H63 c13.233,0,24,10.767,24,24S76.233,83,63,83z M55,81h8c12.131,0,22-9.869,22-22s-9.869-22-22-22H33c-0.404,0-0.77-0.243-0.924-0.617 c-0.155-0.374-0.069-0.804,0.217-1.09L42.586,25L37,19.414L15.414,41L37,62.586L42.586,57L32.293,46.707 c-0.286-0.286-0.372-0.716-0.217-1.09C32.23,45.243,32.596,45,33,45h30c7.72,0,14,6.28,14,14s-6.28,14-14,14h-8V81z"
        />
      </svg>
    </>
  );
}
export function SaveIcon({ width, height, color }) {
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width={width}
        height={height}
      >
        {" "}
        <path d="M 6 3 C 4.343 3 3 4.343 3 6 L 3 38 C 3 39.657 4.343 41 6 41 L 7 41 L 7 12 C 7 9.239 9.239 7 12 7 L 36.414062 7 L 32.707031 3.2929688 C 32.519031 3.1049687 32.265 3 32 3 L 6 3 z M 12 9 C 10.346 9 9 10.346 9 12 L 9 44 C 9 45.654 10.346 47 12 47 L 44 47 C 45.654 47 47 45.654 47 44 L 47 18 C 47 17.735 46.895031 17.479969 46.707031 17.292969 L 38.707031 9.2929688 C 38.520031 9.1049688 38.265 9 38 9 L 12 9 z M 17 11 L 37 11 L 37 22 C 37 23.105 36.105 24 35 24 L 19 24 C 17.895 24 17 23.105 17 22 L 17 11 z M 31 13 L 31 22 L 34 22 L 34 13 L 31 13 z M 19 30 L 37 30 C 38.1 30 39 30.9 39 32 L 39 45 L 17 45 L 17 32 C 17 30.9 17.9 30 19 30 z M 12 42 L 14 42 L 14 44 L 12 44 L 12 42 z M 42 42 L 44 42 L 44 44 L 42 44 L 42 42 z" />
      </svg>
    </>
  );
}
export function MapIcon({ width, height, color }) {
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width={width}
        height={height}
      >
        <path
          fill={color}
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
    </>
  );
}
export function SettingsIcon({ width, height, color }) {
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width={width}
        height={height}
      >
        {" "}
        <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z" />
      </svg>
    </>
  );
}
export function GuideIcon({ width, height, color }) {
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
        width={width}
        height={height}
      >
        <path d="M8,127h90c7.2,0,13-5.8,13-13V26c0-7.2-5.8-13-13-13H53.9c-1.6,0-2.9,1.3-2.9,2.9c0,0,0,0,0,0c0.1,8.6,1.8,17.2,5.7,25 l2.1,4.3c0.4,0.8,0.5,1.7,0.2,2.5c-0.6,1.5-2.2,2.3-3.6,1.9l-12.6-3.6l-6.6,13.4c-0.5,1-1.5,1.7-2.7,1.7h0c-1.1,0-2.2-0.6-2.7-1.7 l-1-1.9C23.4,44.6,20,30.2,20,15.9c0-1.6-1.3-2.9-2.9-2.9h-2.9c-1.6,0-3.1-1.2-3.2-2.8C10.9,8.4,12.3,7,14,7h86c9.4,0,17,7.6,17,17 v90c0,1.7,1.4,3.1,3.2,3c1.6-0.1,2.8-1.5,2.8-3.2V24c0-12.7-10.3-23-23-23H14c-5,0-9,4-9,9v114C5,125.7,6.3,127,8,127z M28,76h55 c1.7,0,3,1.3,3,3s-1.3,3-3,3H28c-1.7,0-3-1.3-3-3S26.3,76,28,76z M28,96h35c1.7,0,3,1.3,3,3s-1.3,3-3,3H28c-1.7,0-3-1.3-3-3 S26.3,96,28,96z" />
      </svg>
    </>
  );
}
export function ProfileIcon({ width, height, color }) {
  return (
    <>
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
    </>
  );
}
export function InfoIcon({ width, height, color }) {
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26 26"
        width={width}
        height={height}
      >
        <path d="M 13 1.1875 C 6.476563 1.1875 1.1875 6.476563 1.1875 13 C 1.1875 19.523438 6.476563 24.8125 13 24.8125 C 19.523438 24.8125 24.8125 19.523438 24.8125 13 C 24.8125 6.476563 19.523438 1.1875 13 1.1875 Z M 15.460938 19.496094 C 14.851563 19.734375 14.367188 19.917969 14.003906 20.042969 C 13.640625 20.167969 13.222656 20.230469 12.742188 20.230469 C 12.007813 20.230469 11.433594 20.050781 11.023438 19.691406 C 10.617188 19.335938 10.414063 18.878906 10.414063 18.324219 C 10.414063 18.109375 10.429688 17.890625 10.460938 17.667969 C 10.488281 17.441406 10.539063 17.191406 10.605469 16.90625 L 11.367188 14.21875 C 11.433594 13.960938 11.492188 13.71875 11.539063 13.488281 C 11.585938 13.257813 11.605469 13.046875 11.605469 12.855469 C 11.605469 12.515625 11.535156 12.273438 11.394531 12.140625 C 11.25 12.003906 10.980469 11.9375 10.582031 11.9375 C 10.386719 11.9375 10.183594 11.96875 9.976563 12.027344 C 9.769531 12.089844 9.59375 12.148438 9.445313 12.203125 L 9.648438 11.375 C 10.144531 11.171875 10.621094 11 11.078125 10.855469 C 11.53125 10.710938 11.964844 10.636719 12.367188 10.636719 C 13.097656 10.636719 13.664063 10.816406 14.058594 11.167969 C 14.453125 11.519531 14.652344 11.980469 14.652344 12.542969 C 14.652344 12.660156 14.640625 12.867188 14.613281 13.160156 C 14.585938 13.453125 14.535156 13.722656 14.460938 13.972656 L 13.703125 16.652344 C 13.640625 16.867188 13.585938 17.113281 13.535156 17.386719 C 13.488281 17.660156 13.464844 17.871094 13.464844 18.011719 C 13.464844 18.367188 13.542969 18.613281 13.703125 18.742188 C 13.859375 18.871094 14.136719 18.933594 14.53125 18.933594 C 14.714844 18.933594 14.921875 18.902344 15.15625 18.839844 C 15.386719 18.773438 15.554688 18.71875 15.660156 18.667969 Z M 15.324219 8.617188 C 14.972656 8.945313 14.546875 9.109375 14.050781 9.109375 C 13.554688 9.109375 13.125 8.945313 12.769531 8.617188 C 12.414063 8.289063 12.238281 7.890625 12.238281 7.425781 C 12.238281 6.960938 12.417969 6.558594 12.769531 6.226563 C 13.125 5.894531 13.554688 5.730469 14.050781 5.730469 C 14.546875 5.730469 14.972656 5.894531 15.324219 6.226563 C 15.679688 6.558594 15.855469 6.960938 15.855469 7.425781 C 15.855469 7.890625 15.679688 8.289063 15.324219 8.617188 Z" />
      </svg>
    </>
  );
}
export function DeleteIcon({ width, height, color }) {
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width={width}
        height={height}
      >
        {" "}
        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
      </svg>
    </>
  );
}
export function FavoriteIcon({ width, height, color, favClick, nodeId }) {
  const id = nodeId;
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width={width}
        height={height}
        style={{ cursor: "pointer",transition: "fill 0.3s ease" }}
        onClick={() => favClick(id)}
      >
        {" "}
        <path d="M50,19.3c-0.1-0.4-0.5-0.7-0.9-0.7l-17-1l-6.2-16C25.8,1.3,25.4,1,25,1c-0.4,0-0.8,0.3-0.9,0.6l-6.2,16l-17,1 c-0.4,0-0.8,0.3-0.9,0.7s0,0.8,0.3,1.1l13.2,10.8L9,47.7c-0.1,0.4,0,0.8,0.4,1.1c0.3,0.2,0.8,0.3,1.1,0L25,39.5l14.5,9.3 c0.2,0.1,0.4,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2c0.3-0.2,0.5-0.7,0.4-1.1l-4.5-16.6l13.2-10.8C50,20.1,50.1,19.7,50,19.3z M32,28h-6 v6h-2v-6h-6v-2h6v-6h2v6h6V28z" />
      </svg>
    </>
  );
}
export function RotateIcon({ width, height, color }) {
  return (
    <>
      <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
      >
        <title />
        <desc />
        <defs />
        <g
          fill={color}
          fillRule="evenodd"
          id="Page-1"
          stroke="none"
          strokeWidth="1"
        >
          <g
            fill={color}
            id="Icons-Device"
            transform="translate(-210.000000, -124.000000)"
          >
            <g
              id="screen-rotation"
              transform="translate(210.000000, 124.000000)"
            >
              <path
                d="M16.5,2.5 C19.8,4 22.1,7.2 22.5,11 L24,11 C23.4,4.8 18.3,0 12,0 L11.3,0 L15.1,3.8 L16.5,2.5 L16.5,2.5 Z M10.2,1.7 C9.6,1.1 8.7,1.1 8.1,1.7 L1.7,8.1 C1.1,8.7 1.1,9.6 1.7,10.2 L13.7,22.2 C14.3,22.8 15.2,22.8 15.8,22.2 L22.2,15.8 C22.8,15.2 22.8,14.3 22.2,13.7 L10.2,1.7 L10.2,1.7 Z M14.8,21.2 L2.8,9.2 L9.2,2.8 L21.2,14.8 L14.8,21.2 L14.8,21.2 Z M7.5,21.5 C4.2,20 1.9,16.8 1.5,13 L0.1,13 C0.6,19.2 5.7,24 12,24 L12.7,24 L8.9,20.2 L7.5,21.5 L7.5,21.5 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </svg>
    </>
  );
}
