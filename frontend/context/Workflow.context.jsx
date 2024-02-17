/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
import { parseAbiItem } from 'viem';
import { getPublicClient } from '@wagmi/core';
import setUpVote from '../contracts/VoteAdministration/1. SetUpVote/setUpVote';
import startVote from '../contracts/VoteAdministration/2. StartVote/startVote';
import endVote from '../contracts/VoteAdministration/3. EndVote/endVote';

export const WorkflowContext = createContext();

export function WorkflowContextProvider({ children }) {
  const [workflowStatusLogs, setWorkflowStatusLogs] = useState([]);
  const [workflowStatus, setWorkflowStatus] = useState([
    {
      id: 0,
      label: 'Voting Power Allocation',
    },
    {
      id: 1,
      label: 'Set Up Vote',
      method: setUpVote,
    },
    {
      id: 2,
      label: 'Start Vote',
      method: startVote,
    },
    {
      id: 3,
      label: 'End Vote',
      method: endVote,
    },
  ]);

  const [currentWorkflow, setCurrentWorkflow] = useState(1);

  const client = getPublicClient();

  const updateWorkflow = async () => {
    try {
      const workflowStatusChangeLogs = await client.getLogs({
        event: parseAbiItem(
          'event WorkflowStatusChange(uint8 previousStatus, uint8 newStatus)'
        ),
        fromBlock: 0n,
        toBlock: 'latest',
      });

      const allEvents = workflowStatusChangeLogs.map((log) => ({
        previousStatus: log.args.previousStatus,
        newStatus: log.args.newStatus,
      }));

      setWorkflowStatusLogs(allEvents);

      if (allEvents.length > 0) {
        const latestEvent = allEvents[allEvents.length - 1];
        setCurrentWorkflow(latestEvent.newStatus + 1);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    updateWorkflow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WorkflowContext.Provider
      value={{
        workflowStatusLogs,
        setWorkflowStatusLogs,
        updateWorkflow,
        workflowStatus,
        setWorkflowStatus,
        currentWorkflow,
        setCurrentWorkflow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}
