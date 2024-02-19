import { useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { VoteAdminsContext } from '../context/VoteAdmins.context';
import { UserContext } from '../context/User.context';
import { VotersContext } from '../context/Voters.context';

const RoleHandler = () => {
  const { address, isConnected } = useAccount();
  const { setUser } = useContext(UserContext);
  const { voter } = useContext(VotersContext);
  const { voteAdmins } = useContext(VoteAdminsContext);

  useEffect(() => {
    setUser(isConnected ? address : '');
  }, [address, isConnected, setUser]);

  const renderUserRole = () => {
    if (voteAdmins && voteAdmins.includes(address))
      return (
        <div className="flex justify-center items-center ">
          <p className=" font-semibold">Connected as Vote Admin</p>
        </div>
      );
    if (voter) return <p className=" font-semibold">Connected as Voter</p>;
    return null;
  };

  return renderUserRole();
};

export default RoleHandler;
