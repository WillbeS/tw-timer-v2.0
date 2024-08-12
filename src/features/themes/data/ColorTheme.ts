interface BasicColors {
  primary: string;
  primaryOpposite: string;
}

interface OldColors {
  main: string;
  lightBox: string;
  button: string;
  feature: string;
}

interface StateColors {
  info: string;
  success: string;
  warning: string;
  danger: string;
}

interface ExtendedColors {}

interface TextColors extends BasicColors, OldColors, StateColors {
  logo: string;
}

type BgColors = BasicColors & OldColors & StateColors;

export interface ColorTheme {
  // colors: BasicColors;

  bgColors: BgColors;

  borderColors: OldColors;

  textColors: TextColors;

  fillColors: OldColors;

  hoverColors: BasicColors;
}
