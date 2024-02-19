import { ConnectButton } from '@rainbow-me/rainbowkit';
import RoleHandler from './RoleHandler';

function Header() {
  return (
    <header
      // style={gradientStyle}
      className="bg-black py-10 text-xl mb-20 w-full gap-x-10 px-10 flex items-end text-white tracking-widest"
    >
      <h1 className="text-4xl font-semibold ">Home Owner Tokens</h1>
      <ConnectButton />
      <RoleHandler />
    </header>
  );
}

export default Header;
