"use client";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { UserContextProvider } from "../context/User.context";
import { HomeOwnerTokenAdminsContextProvider } from "../context/HomeOwnerTokenAdmins.context";
import { VotersContextProvider } from "../context/Voters.context";

const { chains, publicClient } = configureChains(
  [hardhat, sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "3bba0b6a7bfce219a7d7c6bc15967edd",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <HomeOwnerTokenAdminsContextProvider>
              <VotersContextProvider>
                <UserContextProvider>{children}</UserContextProvider>
              </VotersContextProvider>
            </HomeOwnerTokenAdminsContextProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
