import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import { FileUpload } from "../components/FileUpload";
import { MyNavbar } from "../components/Navbar";

const AppHome = () => {
  return (
    <div style={{ marginBottom: 50 }}>
      <MyNavbar active='web app' />

      <FileUpload />
    </div>
  );
};

export default AppHome;
