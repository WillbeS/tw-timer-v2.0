import { useEffect, useState } from 'react';
import { WorldData } from '../data/types';
import { fetchWorlds } from '../api';

export const useFetchWorls = () => {
  const [worlds, setWorlds] = useState<WorldData[]>([]);

  useEffect(() => {
    fetchWorlds().then((data) => setWorlds(data));
  });

  return worlds;
};
