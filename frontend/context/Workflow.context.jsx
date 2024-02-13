/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
import { parseAbiItem } from 'viem';
import { getPublicClient } from '@wagmi/core';
import setUpVote from '../utils/VoteAdministration/1. SetUpVote/setUpVote';
import startVote from '../utils/VoteAdministration/2. StartVote/startVote';
import endVote from '../utils/VoteAdministration/3. EndVote/endVote';

export const WorkflowContext = createContext();

export function WorkflowContextProvider({ children }) {
  const [workflowStatusLogs, setWorkflowStatusLogs] = useState([]);
  const [workflowStatus, setWorkflowStatus] = useState([
    {
      id: 1,
      label: 'Voting Power Allocation',
      active: true,
      ended: false,
    },
    {
      id: 2,
      label: 'Set Up Vote',
      method: setUpVote,
      active: false,
      ended: false,
    },
    {
      id: 3,
      label: 'Start Vote',
      method: startVote,
      active: false,
      ended: false,
    },
    {
      id: 4,
      label: 'End Vote',
      method: endVote,
      active: false,
      ended: false,
    },
  ]);

  const [currentWorkflow, setCurrentWorkflow] = useState(0);

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
        previousStatus: log.args.previousStatus.toNumber(),
        newStatus: log.args.newStatus.toNumber(),
      }));

      console.log('allEvents', allEvents);
      setWorkflowStatusLogs(allEvents);

      // Find the most recent newStatus
      const latestEvent = allEvents.reduce(
        (latest, event) =>
          !latest || event.newStatus > latest.newStatus ? event : latest,
        null
      );

      if (latestEvent) {
        // Set the current workflow based on the latest newStatus
        setCurrentWorkflow(latestEvent.newStatus);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  }; // Added an empty array as the second argument

  useEffect(() => {
    // Fetch logs on component mount
    updateWorkflow();
  }, []); // Empty dependency array means this effect runs once on mount

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
