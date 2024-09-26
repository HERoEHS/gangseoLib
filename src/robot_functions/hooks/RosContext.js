import React, { createContext, useContext, useEffect } from 'react';
import { createRosDataManager } from './RosDataManager';

const RosContext = createContext(null);

export function RosProvider({ children }) {
  const rosDataManager = createRosDataManager();

  useEffect(() => {
    return () => rosDataManager.cleanup();
  }, []);

  return (
    <RosContext.Provider value={rosDataManager}>
      {children}
    </RosContext.Provider>
  );
}

export function useRosData() {
  return useContext(RosContext);
}
