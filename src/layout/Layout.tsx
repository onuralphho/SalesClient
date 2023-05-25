import React, { ReactNode } from "react";
import backgroundImg from "../assets/background.jpg";
import NavBar from "../components/NavBar";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen overflow-x-hidden text-white ">
      <img
        src={backgroundImg}
        className="object-cover absolute w-full h-full -z-10"
        alt="Black sand"
      />
      <div className="m-2 h-full pb-10">
        <NavBar />

        {children}
      </div>
    </div>
  );
};

export default Layout;
