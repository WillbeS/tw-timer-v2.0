import { ColorTheme } from './ColorTheme';

export const bgColors = {
  main: 'bg-pretty-primary100',
  lightBox: 'bg-pretty-prymary400',
  button: 'bg-pretty-brown200',
  feature: 'bg-pretty-brown400',
};

export const borderColors = {
  main: 'border-pretty-brown400',
  button: 'border-slate-800',
  feature: 'border-stone-100',
  lightBox: 'border-stone-100',
};

export const textColors = {
  main: 'text-tw-black',
  logo: 'text-pretty-brown400',
  button: 'text-white',
  feature: 'text-white',
  lightBox: 'text-stone-700',
};

export const fillColors = {
  main: 'fill-pretty-brown400',
  lightBox: 'fill-stone-100',
  button: 'fill-slate-400',
  feature: 'fill-slate-700',
};

export const pretty: ColorTheme = {
  bgColors,
  borderColors,
  textColors,
  fillColors,
};
