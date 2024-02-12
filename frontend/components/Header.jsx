import RoleHandler from "./RoleHandler";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

const Header = () => {
  return (
    <header className="border-b-4 border-dotted border-blue-400 py-10 text-xl mb-20 w-full gap-x-10 text-gray-50 px-10 flex items-end">
      <h1
        className={`${roboto.className} text-blue-400 text-4xl tracking-wider`}
      >
        Home Owner Tokens
      </h1>
      <ConnectButton />
      <RoleHandler />
    </header>
  );
};

export default Header;
