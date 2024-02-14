/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';

export const ProposalsContext = createContext();

export function ProposalsContextProvider({ children }) {
  const [proposalsArray, setProposalsArray] = useState([]);

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
