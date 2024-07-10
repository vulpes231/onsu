import React from "react";
import ConnectButton from "./Connectbutton";

const Navbar = () => {
  return (
    <header className="p-4">
      <nav className="flex justify-between">
        <h1>$ONS</h1>
        <ConnectButton />
      </nav>
    </header>
  );
};

export default Navbar;
