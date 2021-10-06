import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import { FileUpload } from "../components/FileUpload";
import teamLogo from "../images/app-logo-75px.png";

const AppHome = () => {
  return (
    <div>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="/home"><img src={teamLogo} alt='Translation app logo' />{" "}
            {/* Image source: https://www.flaticon.com/free-icon/translation_2793580 */}
          </Navbar.Brand>
          <Navbar.Brand href="/home">
            <a className='navbar-brand app-name' href='/home'>
              Rosetta-Subs
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className="navbar-item px-3" href="/home">Home</Nav.Link>
              <Nav.Link className="navbar-item active px-3" href="/app-home">Web App</Nav.Link>
              <Nav.Link className="navbar-item pl-3 pr-4" href="/team-bios">Team Member Bios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <FileUpload />
    </div>
  );
};

export default AppHome;
