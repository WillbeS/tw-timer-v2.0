interface BasicColors {
  main: string;
  lightBox: string;
  button: string;
  feature: string;
}

interface TextColors extends BasicColors {
  logo: string;
}

export interface ColorTheme {
  // colors: BasicColors;

  bgColors: BasicColors;

  borderColors: BasicColors;

  textColors: TextColors;

  fillColors: BasicColors;
}
