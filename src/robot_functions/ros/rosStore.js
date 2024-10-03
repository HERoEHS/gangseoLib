let socket = null;
const rosData = {
  '/heroehs/aimy/commander/status': null,
  '/heroehs/aimy/dialogue/stt': null,
  '/heroehs/aimy/dialogue/stt/stream': null,
  '/heroehs/aimy/dialogue/llm': null,
  '/heroehs/aimy/manage/ebook': null,
  '/heroehs/aimy/dialogue/nav_button': null,
  '/heroehs/aimy/web/top_menu': null
};
const observers = {};

export const setSocket = (newSocket) => {
  socket = newSocket;
};

export const updateRosData = (topic, data) => {
  if (topic && data !== undefined) {
    rosData[topic] = {
      data: data.data,
      timestamp: data.timestamp
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
    observers[topic].forEach(callback => callback(rosData[topic]));
  }
};

export const getSocket = () => socket;
