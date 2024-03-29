import React, { useEffect, useContext, useState } from 'react';
import { useAccount } from 'wagmi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/User.context';
import { VoteAdminsContext } from '../context/VoteAdmins.context';
import { VotersContext } from '../context/Voters.context';
import Header from './Header';
import Workflows from './Workflows/Workflows';
import Dashboard from './Dashboard/Dashboard';

function Layout({ children }) {
  const { address, isConnected } = useAccount();
  const { setUser } = useContext(UserContext);
  const { voteAdmins } = useContext(VoteAdminsContext);
  const { voter } = useContext(VotersContext);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setUser(isConnected ? address : '');
  }, [address, isConnected, setUser]);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [address, voteAdmins, voter]);

  const isAdmin = isConnected && voteAdmins.includes(address);
  const isVoter = isConnected && !!voter;

  return (
    <div className="">
      {isConnected ? (
        <>
          <Header />
          <div className="flex flex-col gap-6">
            <div className="w-full">
              <Workflows />
            </div>
            <div className="">
              <Dashboard key={key} isAdmin={isAdmin} isVoter={isVoter} />
            </div>
          </div>
        </>
      ) : (
        <Header />
      )}
      <div className="">{children}</div>
      <ToastContainer />
    </div>
  );
}

export default Layout;
