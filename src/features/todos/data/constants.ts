export const WH_CAPACITY = 700000; // Will be set by the user later
export const UNSELECTED_TYPE = '0';

//assume that this amount is already there
export const WH_BUFFER = {
  wood: 100000,
  clay: 17000,
  iron: 167000,
};

export const todoTypes = {
  ATTACK: 'attack',
  SNIPE: 'snipe',
  DODGE: 'dodge',
  // MINTING: 'minting',
  REMINDER: 'reminder',
};

export const attackSubtypes = {
  CLEAR_NUKE: 'clear nuke',
  CAT_NUKE: 'cat nuke',
  ANTI_SNIPE: 'anti-snipe',
  NOBLE_NUKE: 'noble nuke',
  SPLIT_NOBLE_TRAIN: 'split noble train',
  NOBLE_TRAIN: 'noble train',
  FANG: 'fang',
  TIMED_FAKE: 'timed fake',
};

export const attackTypes = {
  SV_ATTACK_RA: 'svAttackRA', // Red Alert
  MASS_ATTACK_RA: 'massAttackRA',
  MASS_ATTACK_FODOX: 'massAttackFodox',
  MASS_ATTACK_DEVIL: 'massAttackDevil',
};

export const snipeTypes = {
  SV_SNIPE_RA: 'svSnipeRA', // Red Alert
  MASS_SNIPE_RA: 'massSnipeRA',
  MASS_SNIPE_DAWOLF: 'massSnipeDawolf', // todo
};

export const coinSize = {
  wood: 15120,
  clay: 16200,
  iron: 13500,
};
