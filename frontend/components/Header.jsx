"use client";
import { Roboto } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/User.context";
import { HomeOwnerTokenAdminsContext } from "../context/HomeOwnerTokenAdmins.Context";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

const Header = () => {
  const { address, isConnected } = useAccount();
  const { user, setUser } = useContext(UserContext);
  const { admins, isLoading, error } = useContext(HomeOwnerTokenAdminsContext);

  useEffect(() => {
    setUser(isConnected ? address : "");
  }, [address, isConnected, setUser]);

  return (
    <header className="border-b-4 border-dotted border-blue-400 py-10 text-xl mb-20 w-full gap-x-10 text-gray-50 px-10 flex items-end">
      <h1
        className={`${roboto.className} text-blue-400 text-4xl tracking-wider`}
      >
        Home Owner Tokens
      </h1>
      <ConnectButton />
      {isConnected && isLoading ? (
        <p className="text-yellow-400">Loading admin status...</p>
      ) : isConnected && error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : (
        isConnected &&
        admins.find((adminAddress) => adminAddress === address) && (
          <p className="text-green-400">Connected as admin</p>
        )
      )}
    </header>
  );
};

export default Header;
