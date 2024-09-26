import { subscribeToTopic, unsubscribeFromTopic, getRosData } from '../ros/rosStore';

export function createRosDataManager() {
  const subscribers = new Set();

  const subscribe = (topic, callback) => {
    const handler = (data) => {
      callback(data);
    };
    subscribeToTopic(topic, handler);
    subscribers.add({ topic, callback: handler });
    return () => {
      unsubscribeFromTopic(topic, handler);
      subscribers.delete({ topic, callback: handler });
    };
  };

  const getTopicData = (topic) => getRosData(topic);

  const cleanup = () => {
    subscribers.forEach(({ topic, callback }) => {
      unsubscribeFromTopic(topic, callback);
    });
  };

  return { subscribe, getTopicData, cleanup };
}
