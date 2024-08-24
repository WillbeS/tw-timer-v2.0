import { ColorTheme } from './ColorTheme';

export const bg = {
  //   main: 'bg-gradient-to-b from-red-900 via-orange-300 via-orange-200 via-orange-100 to-orange-100',
  main: 'bg-tw-light',
  header: 'bg-tw-brown',
  featureContent: 'bg-tw-brown',
  featureButton: 'bg-tw-greenblue',
  topBar: 'bg-tw-brown',
  list: 'bg-stone-100',
  modal: 'bg-stone-100',

  msgInfo: 'bg-blue-50',
  msgSuccess: 'bg-green-50',
  msgWarning: 'bg-yellow-50',
  msgError: 'bg-red-50',

  icon: '',
};

export const text = {
  main: 'text-tw-black',
  header: 'text-white',
  featureContent: 'text-white',
  featureButton: 'text-white',
  topBar: 'text-white',
  list: 'text-stone-700',
  contentLink: 'text-yellow-800',
  modal: 'text-stone-700',
  logo: 'text-tw-black',

  msgInfo: 'text-blue-800',
  msgSuccess: 'text-green-800',
  msgWarning: 'text-yellow-800',
  msgError: 'text-red-800',

  icon: '',
};

export const border = {
  header: 'border-slate-800',
  featureButton: 'border-tw-brown',
  topBar: 'border-tw-brown',
};

const hoverBg = {
  header: 'hover:bg-yellow-600',
  featureButton: '',
  topBar: 'hover:bg-yellow-600',
  icon: '',
};

const hoverText = {
  main: '',
  contentLink: 'hover:text-red-600',
  header: 'hover:text-orange-300',
  featureButton: '',
};

export const fill = {
  logo: 'fill-tw-black', //logo
  main: 'fill-tw-light', //spinner
};

export const twOld: ColorTheme = {
  bg,
  text,
  border,
  hoverBg,
  hoverText,
  fill,
};
