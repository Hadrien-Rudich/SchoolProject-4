import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Roboto } from 'next/font/google';
import RoleHandler from './RoleHandler';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

function Header() {
  const gradientStyle = {
    background: 'linear-gradient(to bottom, #D1D5DB 0%, #89AECB 100%)',
  };

  return (
    <header
      style={gradientStyle}
      className="bg-gray-500 py-10 text-xl mb-20 w-full gap-x-10 px-10 flex items-end text-black"
    >
      <h1
        className={`${roboto.className}  text-4xl font-semibold tracking-wider`}
      >
        Home Owner Tokens
      </h1>
      <ConnectButton />
      <RoleHandler />
    </header>
  );
}

export default Header;
