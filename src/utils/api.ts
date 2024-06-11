// export const getWorldKey = (worldTag: string): string | undefined => {
//   const connected = localStorage.getItem('connected_worlds');

//   if (connected) {
//     return JSON.parse(connected)[worldTag];
//   }
// };

// export const getWorldAdminId = (worldTag: string): string | undefined => {
//   const connectedIds = localStorage.getItem('connected_ids');

//   if (connectedIds) {
//     return JSON.parse(connectedIds)[worldTag];
//   }
// };

// export const removeAdminId = (worldTag: string) => {
//   const connectedIds = localStorage.getItem('connected_ids');

//   if (connectedIds) {
//     const localIds = JSON.parse(connectedIds);
//     delete localIds[worldTag];
//     localStorage.setItem('connected_ids', JSON.stringify(localIds));
//   }
// };

export {};
