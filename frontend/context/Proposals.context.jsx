/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import fetchProposals from '../services/getProposals';

export const ProposalsContext = createContext();

export function ProposalsContextProvider({ children }) {
  const [proposalsArray, setProposalsArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProposals();
        setProposalsArray(data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ProposalsContext.Provider
      value={{
        proposalsArray,
        setProposalsArray,
      }}
    >
      {children}
    </ProposalsContext.Provider>
  );
}
