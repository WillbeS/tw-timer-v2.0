import { ColorTheme } from './ColorTheme';

const bg = {
  main: 'bg-amber-800',
  header: 'bg-yellow-700',
  featureContent: 'bg-yellow-700',
  featureButton: 'bg-amber-900',
  topBar: 'bg-yellow-700',
  list: 'bg-orange-100',
  modal: 'bg-orange-100',

  msgInfo: 'bg-blue-50',
  msgSuccess: 'bg-green-50',
  msgWarning: 'bg-yellow-50',
  msgError: 'bg-red-50',

  icon: '',
};

const text = {
  main: 'text-white',
  header: 'text-white',
  featureContent: 'text-white',
  featureButton: 'text-white',
  topBar: 'text-white',
  list: 'text-stone-700',
  contentLink: 'text-yellow-800',
  modal: 'text-stone-700',
  logo: 'text-white',

  msgInfo: 'text-blue-800',
  msgSuccess: 'text-green-800',
  msgWarning: 'text-yellow-800',
  msgError: 'text-red-800',

  icon: '',
};

const border = {
  header: 'border-yellow-900',
  featureButton: 'border-orange-200',
  topBar: 'border-orange-200',
};

const hoverBg = {
  header: 'hover:bg-yellow-700/80',
  featureButton: '',
  topBar: '',
  icon: '',
};

const hoverText = {
  main: '',
  contentLink: 'hover:text-red-600',
  header: '',
  featureButton: '',
};

const fill = {
  logo: 'fill-white', //logo
  main: 'fill-yellow-700', //spinner
};

export const brown: ColorTheme = {
  bg,
  border,
  text,
  hoverBg,
  hoverText,
  fill,
};
