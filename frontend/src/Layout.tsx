import React, { ReactPropTypes } from "react";
import { Navbar } from "./components/Navbar";

interface LayoutProps {}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className='row '>
        <div className='col-sm-12'>
          <Navbar />
        </div>
      </div>
      <div className='row d-flex justify-content-center pt-4'>
        <div className='col-sm-10'>{children}</div>
      </div>
    </>
  );
};

export default Layout;
