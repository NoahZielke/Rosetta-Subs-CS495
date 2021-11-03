import React, { useContext, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import teamLogo from "../images/app-logo-75px.png";
import AuthModal from "./auth/AuthModal";

const AuthButton = () => {
  const [modal, setModal] = useState(false);
  const { user, setUser } = useContext(UserContext);

  if (user) {
    return (
      <div
        className="pt-2" 
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
        <p className='mr-3 pt-3' style={{fontSize:"large"}}>Hi {user.email}!</p>
        <Button variant='danger' onClick={() => setUser(undefined)}>
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className="pt-2">
      <AuthModal show={modal} handleClose={() => setModal(false)} />
      <Button variant='primary' onClick={() => setModal(true)}>
        Sign In
      </Button>
    </div>
  );
};

export const MyNavbar = () => {
  return (
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
          <Nav className="mr-auto">
            <Nav.Link className="navbar-item px-3" href="/home">Home</Nav.Link>
            <Nav.Link className="navbar-item active px-3" href="/app-home">Web App</Nav.Link>
            <Nav.Link className="navbar-item pl-3 pr-4" href="/team-bios">Team Member Bios</Nav.Link>
          </Nav>
          <AuthButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
