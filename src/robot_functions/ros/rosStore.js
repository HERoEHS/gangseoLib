let socket = null;
let rosData = {};
const observers = {};

export const setSocket = (newSocket) => {
  socket = newSocket;
};

export const updateRosData = (topic, data) => {
  if (topic && data !== undefined) {
    // console.log(`Updating ROS data for topic: ${topic}`, data);  // 로그 추가
    rosData[topic] = {
      data,
      timestamp: Date.now()
    };
    notifyObservers(topic);
  } else {
    console.warn(`Invalid update attempt: topic=${topic}, data=${data}`);
  }
};

export const getRosData = (topic) => rosData[topic] || null;

export const subscribeToTopic = (topic, callback) => {
  if (!observers[topic]) {
    observers[topic] = [];
  }
  observers[topic].push(callback);
};

export const unsubscribeFromTopic = (topic, callback) => {
  if (observers[topic]) {
    observers[topic] = observers[topic].filter(cb => cb !== callback);
  }
};

const notifyObservers = (topic) => {
  if (observers[topic] && rosData[topic]) {
    // console.log(`Notifying observers for topic: ${topic}`, rosData[topic]);  // 로그 추가
    observers[topic].forEach(callback => callback(rosData[topic]));
  }
};

export const getSocket = () => socket;
