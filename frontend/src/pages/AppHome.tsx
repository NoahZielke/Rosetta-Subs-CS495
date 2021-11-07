import React from "react";
import { FileUpload } from "../components/FileUpload";
import { MyNavbar } from "../components/Navbar";

const AppHome = () => {
  return (
    <div style={{ marginBottom: 50 }}>
      <MyNavbar />

      <FileUpload />
    </div>
  );
};

export default AppHome;
