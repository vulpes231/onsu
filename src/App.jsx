import React from "react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import ConnectButton from "./components/Connectbutton";
import Navbar from "./components/Navbar";
import Content from "./components/Content";

// 1. Get projectId
const projectId = "a5b65e529447c24e7e0681fda7fe6442";

// 2. Set chains
const mainnet = {
  chainId: 56,
  name: "BNB Smart Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://bsc-dataseed.binance.org",
};

// 3. Create a metadata object
const metadata = {
  name: "ONS",
  description: "Send unlimited mails",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const App = () => {
  return (
    <div>
      <Navbar />
      <Content />
    </div>
  );
};

export default App;
