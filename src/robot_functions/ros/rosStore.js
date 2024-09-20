let socket = null;
let rosData = {};

export const setSocket = (newSocket) => {
  socket = newSocket;
};

export const setRosData = (newRosData) => {
  rosData = newRosData;
};

export const getSocket = () => socket;
export const getRosData = () => rosData;
