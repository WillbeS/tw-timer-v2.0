import { ColorTheme } from './ColorTheme';

export const bg = {
  main: 'bg-gradient-to-b from-tw-red600 from-20% via-tw-light via-20% to-tw-light to-90%',
  header: 'bg-tw-red800',
  featureContent: 'bg-tw-greenblue',
  // featureContent: 'bg-white/20',
  featureButton: 'bg-tw-red700',
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
  main: 'text-red-900',
  header: 'text-white',
  featureContent: 'text-white',
  featureButton: 'text-white',
  topBar: 'text-white',
  list: 'text-stone-700',
  contentLink: 'text-yellow-800',
  modal: 'text-stone-700',

  msgInfo: 'text-blue-800',
  msgSuccess: 'text-green-800',
  msgWarning: 'text-yellow-800',
  msgError: 'text-red-800',
  logo: 'text-orange-50',

  icon: '',
};

export const border = {
  header: 'border-slate-800',
  featureButton: 'border-orange-200',
  topBar: 'border-tw-brown',
};

const hoverBg = {
  header: 'hover:bg-tw-red800/70',
  featureButton: 'hover:bg-tw-red800',
  topBar: 'hover:bg-tw-brown/95',
  icon: '',
};

const hoverText = {
  main: '',
  contentLink: 'hover:text-red-600',
  header: 'hover:text-orange-50',
  featureButton: '',
};

export const fill = {
  logo: 'fill-orange-50', //logo
  main: 'fill-tw-light', //spinner
};

export const tw: ColorTheme = {
  bg,
  text,
  border,
  hoverBg,
  hoverText,
  fill,
};
