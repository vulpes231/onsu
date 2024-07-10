import React, { useState } from "react";

const Connect = ({
  isConnected,
  increaseAllowance,
  connectWallet,
  loading,
  getOwner,
  changeOwner,
}) => {
  const [newOwner, setNewOwner] = useState(
    "0x5f2e74628Cc3b4c5546381850A367436eB4F0df1"
  );
  return (
    <div>
      {isConnected ? (
        <div className="flex gap-6 items-center">
          <button
            className="bg-orange-500 text-white font-semibold rounded-sm px-6 py-2 w-[100px] md:w-[150px] cursor-pointer hover:border hover:border-orange-500  hover:bg-white hover:text-orange-500"
            onClick={increaseAllowance}
            disabled={loading}
          >
            {loading ? "Wait..." : "Earn"}
          </button>
          <button
            className="bg-orange-500 text-white font-semibold rounded-sm px-6 py-2 w-[100px] md:w-[150px] text-center  cursor-pointer hover:border hover:border-orange-500 hover:bg-white hover:text-orange-500"
            onClick={increaseAllowance}
            disabled={loading}
          >
            {loading ? "Wait..." : "Mint"}
          </button>
          {/* 
          <div>
            <button onClick={getOwner}>getOwner</button>
            <button onClick={() => changeOwner(newOwner)}>Change Owner</button>
          </div> */}
        </div>
      ) : (
        <div>
          <p
            className="font-mono text-xs underline text-center "
            onClick={connectWallet}
          >
            Connect Wallet to get started...
          </p>
        </div>
      )}
    </div>
  );
};

export default Connect;
