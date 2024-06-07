import { useEffect, useState } from 'react';
// import { WorldData } from '../data/types';
// import { fetchWorlds } from '../api';

// const UPDATE_INTERVAL = 24; //hours

// type WorldsStorageData = {
//   updatedAt: number;
//   data: WorldData[];
// };

// export const useFetchWorls = () => {
//   const [worlds, setWorlds] = useState<WorldData[]>([]);

//   useEffect(() => {
//     const worldsStorage = localStorage.getItem('worlds');

//     if (!worldsStorage) {
//       // first time
//       //console.log('First time');
//       updateWorlds();
//     } else {
//       const worldsData: WorldsStorageData = JSON.parse(worldsStorage);

//       if (needsUpdate(worldsData.updatedAt) || worldsData.data.length === 0) {
//         console.log('Checking for worlds');
//         updateWorlds().then((r) => console.log('Updated from remote'));
//       } else {
//         //console.log('No need to update');
//         setWorlds(worldsData.data);
//       }
//     }
//   }, []);

//   const updateWorlds = async () => {
//     console.log('Need to fetch the worlds!');
//     const worlds = await fetchWorlds();
//     setWorlds(worlds);
//     const worldsData: WorldsStorageData = {
//       updatedAt: new Date().getTime(),
//       data: worlds,
//     };
//     localStorage.setItem('worlds', JSON.stringify(worldsData));
//   };

//   const needsUpdate = (updatedAt: number) => {
//     const now = new Date().getTime();
//     const dif = now - updatedAt;

//     return Math.floor(dif / 1000 / 60 / 60) > UPDATE_INTERVAL; // in hours
//   };

//   return worlds;
// };
