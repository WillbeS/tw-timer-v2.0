// TW - https://coolors.co/palette/8d9585-804e3e-e9dbb9-1f0806-d4c8b2-c09464-f2e4c0-d1b987-c3a66f-564d3d
import { ColorTheme } from './ColorTheme';

const bgColors = {
  primary: 'bg-yellow-700',
  primaryOpposite: 'bg-orange-100',
  main: 'bg-amber-800',
  lightBox: 'bg-orange-100',
  button: 'bg-yellow-700',
  feature: 'bg-amber-900',

  info: 'bg-blue-50',
  success: 'bg-green-50',
  warning: 'bg-yellow-50',
  danger: 'bg-red-50',
};

const hoverColors = {
  primary: 'hover:bg-yellow-600',
  primaryOpposite: 'bg-orange-200',
};

const borderColors = {
  main: 'border-yellow-900',
  lightBox: 'border-stone-200',
  button: 'border-yellow-800',
  feature: ' border-orange-200',
};

const textColors = {
  primary: 'text-white',
  primaryOpposite: 'text-stone-700',
  main: 'text-white',
  lightBox: 'text-stone-700',
  button: 'text-white',
  feature: 'text-white',
  logo: 'text-white',

  info: 'text-blue-800',
  success: 'text-green-800',
  warning: 'text-yellow-800',
  danger: 'text-red-800',
};

const fillColors = {
  main: 'fill-white',
  lightBox: 'fill-orange-100',
  button: 'fill-yellow-700',
  feature: 'fill-amber-900',
};

export const brown: ColorTheme = {
  bgColors,
  borderColors,
  textColors,
  fillColors,
  hoverColors,
};
