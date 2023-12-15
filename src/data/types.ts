export type VillageData = {
  [key: string]: string;
  bonus: string;
  id: string;
  name: string;
  playerId: string;
  points: string;
  x: string;
  y: string;
};

export type WorldData = {
  name: string;
  tag: string;
  speed: number;
};

// export type ResponseBodyData = {
//   error: boolean | undefined;
//   data: unknown | undefined;
//   message: string;
// };

// Dont think I need those any more as well
export type ModalHelpContent = {
  heading: string;
  content: { heading: string; content: string }[];
};

export type ModalHelpData = {
  [any: string]: {
    heading: string;
    content: { heading: string; content: string }[];
  };
};
//////////////////////////////////////////////

// for now noone's using this
export type Resources = {
  wood: number;
  clay: number;
  iron: number;
};
