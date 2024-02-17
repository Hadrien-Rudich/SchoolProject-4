/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from 'react';
import fetchProposalIds from '../services/fetchProposalIds';
import fetchVoterAddresses from '../services/fetchVoterAddresses';

export const VoteSummaryContext = createContext();

export function VoteSummaryContextProvider({ children }) {
  const [proposalIds, setProposalIds] = useState([]);
  const [voterAddresses, setVoterAddresses] = useState([]);

  useEffect(() => {
    const fetchVoteOutcome = async () => {
      try {
        const fetchedPropIds = await fetchProposalIds();
        setProposalIds(fetchedPropIds);
        const fetchedVoterAddresses = await fetchVoterAddresses();
        setVoterAddresses(fetchedVoterAddresses);
      } catch (error) {
        console.error('Error fetching proposalIds or voterAddresses', error);
      }
    };

    fetchVoteOutcome();
  }, [voterAddresses, proposalIds]);

  return (
    <VoteSummaryContext.Provider value={{ proposalIds, voterAddresses }}>
      {children}
    </VoteSummaryContext.Provider>
  );
}
