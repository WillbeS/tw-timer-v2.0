// TW - https://coolors.co/palette/8d9585-804e3e-e9dbb9-1f0806-d4c8b2-c09464-f2e4c0-d1b987-c3a66f-564d3d
import { ColorTheme } from './ColorTheme';

const bg = {
  main: 'bg-zinc-800',
  header: 'bg-zinc-700',
  featureContent: 'bg-zinc-600',
  featureButton: 'bg-zinc-900',
  topBar: 'bg-zinc-600',
  list: 'bg-zinc-700',
  modal: 'bg-zinc-300',

  msgInfo: 'bg-blue-50',
  msgSuccess: 'bg-green-50',
  msgWarning: 'bg-yellow-50',
  msgError: 'bg-red-50',

  icon: '',
};

const text = {
  main: 'text-stone-300',
  header: 'text-stone-300',
  featureContent: 'text-stone-200',
  featureButton: 'text-stone-300',
  topBar: 'text-stone-200',
  list: 'text-stone-200',
  contentLink: 'text-stone-400',
  modal: 'text-stone-700',
  logo: 'text-stone-200',

  msgInfo: 'text-blue-800',
  msgSuccess: 'text-green-800',
  msgWarning: 'text-yellow-800',
  msgError: 'text-red-800',

  icon: '',
};

const border = {
  header: 'border-zinc-700',
  featureButton: 'border-zinc-300',
  topBar: 'border-zinc-300',
};

const hoverBg = {
  header: 'hover:bg-zinc-600',
  featureButton: 'hover:bg-zinc-800',
  topBar: 'hover:bg-zinc-700',
  icon: '',
};

const hoverText = {
  main: '',
  header: 'hover:text-stone-100',
  featureButton: 'hover:text-stone-100',
  contentLink: 'hover:text-stone-500',
};

const fill = {
  logo: 'fill-stone-300', //logo
  main: 'fill-zinc-600', //spinner
};

export const dark: ColorTheme = {
  bg,
  border,
  text,
  hoverBg,
  hoverText,
  fill,
};
