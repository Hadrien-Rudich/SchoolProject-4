import { useContext, useEffect } from "react";
import { useAccount } from "wagmi";
import { HomeOwnerTokenAdminsContext } from "../context/HomeOwnerTokenAdmins.context";
import { UserContext } from "../context/User.context";
import { VotersContext } from "../context/Voters.context";

const RoleHandler = () => {
  const { address, isConnected } = useAccount();
  const { setUser } = useContext(UserContext);
  const { voter } = useContext(VotersContext);
  const { admins } = useContext(HomeOwnerTokenAdminsContext);

  useEffect(() => {
    setUser(isConnected ? address : "");
  }, [address, isConnected, setUser]);

  const renderUserRole = () => {
    if (admins && admins.includes(address))
      return <p className="text-green-400">Connected as Admin</p>;
    if (voter) return <p className="text-blue-400">Connected as Voter</p>;
    return null;
  };

  return renderUserRole();
};

export default RoleHandler;
