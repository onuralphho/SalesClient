import React, { ReactNode } from "react";
import backgroundImg from "../assets/background.jpg";
import NavBar from "../components/NavBar";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen overflow-hidden text-white">
      <img
        src={backgroundImg}
        className="object-cover absolute w-full h-full -z-10"
        alt="Black sand"
      />
      <div className="h-full m-2 lg:m-4 overflow-y-auto">
        <NavBar />

        {children}
      </div>
    </div>
  );
};

export default Layout;
