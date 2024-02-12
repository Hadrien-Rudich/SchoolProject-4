"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/User.context";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

const Header = () => {
  const { address, isConnected } = useAccount();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(isConnected ? address : "");
  }, [address, isConnected]);

  return (
    <header
      className="border-b-4 border-dotted border-blue-400 py-10 text-xl mb-20 w-full gap-x-10 text-gray-50 px-10 flex items-end"
      s
    >
      <h1
        className={`${roboto.className} text-blue-400 text-4xl tracking-wider `}
      >
        Home Owner Tokens
      </h1>
      <ConnectButton />
      {/* {isConnected && user == owner ? (
        <p className="text-green-400 ">Connected as owner.</p>
      ) : (
        ""
      )} */}
    </header>
  );
};

export default Header;
