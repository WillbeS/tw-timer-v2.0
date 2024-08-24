interface Main {
  main: string;
}

interface Header {
  header: string;
}

interface FeatureContent {
  featureContent: string;
}

interface FeatureButton {
  featureButton: string;
}

interface TopBar {
  topBar: string;
}

// a better name for this will be Content!!!
interface List {
  list: string;
}

interface ContentLink {
  contentLink: string;
}

interface Modal {
  modal: string;
}

interface AppMessage {
  msgInfo: string;
  msgSuccess: string;
  msgWarning: string;
  msgError: string;
}

interface Logo {
  logo: string;
}

// This is for the completed checkbox
interface Icon {
  icon: string;
}

type BgColors = Main &
  Header &
  FeatureContent &
  FeatureButton &
  TopBar &
  List &
  Modal &
  AppMessage &
  Icon;

type TextColors = Main &
  Header &
  FeatureContent &
  FeatureButton &
  TopBar &
  List &
  ContentLink &
  Modal &
  AppMessage &
  Logo &
  Icon;

type HoverBgColors = Header & FeatureButton & TopBar & Icon;

type HoverTextColors = Main & ContentLink & Header & FeatureButton;

type BorderColors = Header & FeatureButton & TopBar;

type FillColors = Main & Logo;

export interface ColorTheme {
  bg: BgColors;
  text: TextColors;
  border: BorderColors;
  hoverBg: HoverBgColors;
  hoverText: HoverTextColors;
  fill: FillColors;
}
