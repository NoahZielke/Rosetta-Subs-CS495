import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import teamLogo from "../images/app-logo-75px.png";
import { useHistory } from "react-router";
// Below is needed to ignore href requirement for <a> tags -> we use history.push for routing
/* eslint-disable jsx-a11y/anchor-is-valid */ 

export const NonAuthNavbar: React.FC<{
      active: "home" | "app-home" | "team-bios";
    }> = ({ active }) => {
    const history = useHistory();

    return (
        <Navbar expand="lg" className="mr-0 ml-0">
        <Container fluid>
          <Navbar.Brand onClick={() => { history.push('/home'); }} style={{ cursor: "pointer" }}><img src={teamLogo} alt='Translation app logo' />{" "}
            {/* Image source: https://www.flaticon.com/free-icon/translation_2793580 */}
          </Navbar.Brand>
          <Navbar.Brand>
            <a className='navbar-brand app-name' onClick={() => { history.push('/home'); }} style={{ cursor: "pointer" }}>
              Rosetta-Subs
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className={`navbar-item ${active === "home" ? "active" : null} px-3`} onClick={() => { history.push('/home'); }}>
                  Home
              </Nav.Link>
              <Nav.Link className={`navbar-item ${active === "app-home" ? "active" : null} px-3`} onClick={() => { history.push('/app-home'); }}>
                  Web App
              </Nav.Link>
              <Nav.Link className={`navbar-item ${active === "team-bios" ? "active" : null} pl-3 pr-4`} onClick={() => { history.push('/team-bios'); }}>
                  Team Member Bios
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  