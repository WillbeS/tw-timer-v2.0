export const DEBUG_MODE = true;

// For the dev version
export const REMOTE_URL = process.env.REACT_APP_REMOTE_URL;

// For the public version
//export const REMOTE_URL = process.env.REACT_APP_REMOTE_URL_BETA;

export const sounds = {
  VIB: 'vibration.mp3',
  BEEP: 'beep.wav',
};

export const MESSAGE_TYPES = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};

// I dodn't need these any more!!!
export const amberTheme = {
  bgColor: 'bg-amber-800',
  headerBorder: 'border-yellow-900',
  taksBgColor: 'bg-orange-100',
};

export const stoneTheme = {
  bgColor: 'bg-stone-800',
  headerBorder: 'border-stone-700',
  taksBgColor: 'bg-stone-100',
};

//export const defaultTheme = amberTheme;
export const defaultTheme = stoneTheme;
/////////////////////////////////////////
