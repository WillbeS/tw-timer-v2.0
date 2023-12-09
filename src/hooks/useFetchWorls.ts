import { useEffect, useState } from 'react';
import { WorldData } from '../data/types';
import { fetchWorlds } from '../api';
import { parse } from 'path';

const UPDATE_INTERVAL = 24; //hours

type WorldsStorageData = {
  updatedAt: number;
  data: WorldData[];
};

export const useFetchWorls = () => {
  const [worlds, setWorlds] = useState<WorldData[]>([]);

  useEffect(() => {
    const worldsStorage = localStorage.getItem('wordls');

    if (!worldsStorage) {
      // first time
      updateWorlds();
    } else {
      const worldsData: WorldsStorageData = JSON.parse(worldsStorage);

      if (needsUpdate(worldsData.updatedAt)) {
        updateWorlds();
      } else {
        setWorlds(worldsData.data);
      }
    }

    fetchWorlds().then((data) => setWorlds(data));
  }, []);

  const updateWorlds = async () => {
    const worlds = await fetchWorlds();
    setWorlds(worlds);
    const worldsData: WorldsStorageData = {
      updatedAt: new Date().getTime(),
      data: worlds,
    };
    localStorage.setItem('worlds', JSON.stringify(worldsData));
  };

  const needsUpdate = (updatedAt: number) => {
    console.log('Need to fetch the worlds!');
    const now = new Date().getTime();
    const dif = now - updatedAt;

    return Math.floor(dif / 1000 / 60 / 60) > UPDATE_INTERVAL; // in hours
  };

  return worlds;
};
