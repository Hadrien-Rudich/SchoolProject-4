import { createContext, useState, useEffect, useMemo } from 'react';
import { getAdmins } from '../utils/HomeTokenContract/getAdmins';

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

  return useMemo(
    () => (
      <HomeOwnerTokenAdminsContext.Provider value={{ admins }}>
        {children}
      </HomeOwnerTokenAdminsContext.Provider>
    ),
    [admins, children]
  );
}
