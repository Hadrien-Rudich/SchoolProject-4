/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import fetchProposals from '../services/fetchProposals';

export const ProposalsContext = createContext();

export function ProposalsContextProvider({ children }) {
  const [proposalsArray, setProposalsArray] = useState([]);
  const [proposalModalIsOpen, setProposalModalIsOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState({});
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
        proposalModalIsOpen,
        setProposalModalIsOpen,
        selectedProposal,
        setSelectedProposal,
      }}
    >
      {children}
    </ProposalsContext.Provider>
  );
}
