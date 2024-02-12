import { createContext, useState, useMemo } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState('');

  return useMemo(
    () => (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    ),
    [user, setUser, children]
  );
}
