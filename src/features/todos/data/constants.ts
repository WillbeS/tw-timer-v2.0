export const worlds = [
  { value: 'en136', label: '136' },
  { value: 'en135', label: '135' },
  { value: 'en134', label: '134' },
  { value: 'en133', label: '133' },
  { value: 'en132', label: '132' },
  { value: 'en131', label: '131' },
  { value: 'en130', label: '130' },
  { value: 'en129', label: '129' },
  { value: 'en128', label: '128' },
  { value: 'enp11', label: 'Casual 11' },
  { value: 'enp12', label: 'Casual 12' },
  { value: 'enp13', label: 'Casual 13' },
  { value: 'enc1', label: 'Classic' },
  { value: 'ens1', label: 'Speed' },
];

export const WH_CAPACITY = 590000; // Will be set by the user later

//assume that this amount is already there
export const WH_BUFFER = {
  wood: 88000,
  clay: 17000,
  iron: 167000,
};

export const todoTypes = {
  ATTACK: 'attack',
  SNIPE: 'snipe',
  DODGE: 'dodge',
  MINTING: 'minting',
  REMINDER: 'reminder',
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
