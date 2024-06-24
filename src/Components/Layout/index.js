import React from "react";
import Footer from "../Shared/Footer"
import Navbar from "../Shared/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div
        
      >
        <Navbar />
      </div>

      <main>{children}</main>

      <Footer /> 
    </>
  );
};

export default Layout;
