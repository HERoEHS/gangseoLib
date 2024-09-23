let socket = null;
let rosData = {};
let buttonStates = {
  waitingArea: false,
  readingRoom: false,
  restroom: false,
  chargingStation: false
};

export const setSocket = (newSocket) => {
  socket = newSocket;
};

export const setRosData = (newRosData) => {
    console.log('newRosData:', newRosData);
  rosData = newRosData;
};

export const setButtonStates = (newButtonStates) => {
  buttonStates = { ...buttonStates, ...newButtonStates };
};

export const getSocket = () => socket;
export const getRosData = () => rosData;
export const getButtonStates = () => buttonStates;
