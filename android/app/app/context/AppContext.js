import React, { createContext, useState } from 'react';

export const CommonContext = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return (
    <CommonContext.Provider
      value={{
        loading, setLoading,
      }}>
      {children}
    </CommonContext.Provider>
  );
};
