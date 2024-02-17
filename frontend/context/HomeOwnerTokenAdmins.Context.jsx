/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import getAdmins from '../utils/HomeTokenContract/getAdmins';

export const HomeOwnerTokenAdminsContext = createContext();

export function HomeOwnerTokenAdminsContextProvider({ children }) {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchHomeOwnerTokenAdmins = async () => {
      try {
        const adminsArray = await getAdmins();
        setAdmins(adminsArray);
      } catch (err) {
        console.error('Error fetching admins:', err.message);
      }
    };

    fetchHomeOwnerTokenAdmins();
  }, []);

  return (
    <HomeOwnerTokenAdminsContext.Provider value={{ admins }}>
      {children}
    </HomeOwnerTokenAdminsContext.Provider>
  );
}
