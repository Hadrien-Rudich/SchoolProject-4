import { createContext, useState, useEffect } from "react";
import { getAdmins } from "../utils/getters/HomeTokenContract/getAdmins";

export const HomeOwnerTokenAdminsContext = createContext();

export const HomeOwnerTokenAdminsContextProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeOwnerTokenAdmins = async () => {
      setIsLoading(true);
      try {
        const adminsArray = await getAdmins();
        setAdmins(adminsArray);
      } catch (err) {
        console.error("Error fetching admins:", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeOwnerTokenAdmins();
  }, []);

  return (
    <HomeOwnerTokenAdminsContext.Provider
      value={{ admins, setAdmins, isLoading, error }}
    >
      {children}
    </HomeOwnerTokenAdminsContext.Provider>
  );
};
