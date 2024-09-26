import { useState, useEffect } from 'react';
import { useRosData as useRosContext } from './RosContext';

export function useRosData(topics) {
  const [rosData, setRosData] = useState({});
  const rosDataManager = useRosContext();

  useEffect(() => {
    // console.log('Subscribing to topics:', topics);
    const unsubscribes = topics.map(topic =>
      rosDataManager.subscribe(topic, (data) => {
        // console.log(`Received data for topic: ${topic}`, data);
        setRosData(prevData => {
          const newData = { ...prevData, [topic]: data };
          // console.log('New rosData state:', newData);
          return newData;
        });
      })
    );

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [topics, rosDataManager]);

  return rosData;
}
