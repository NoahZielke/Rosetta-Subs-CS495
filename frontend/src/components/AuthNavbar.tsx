import React, { useContext, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import teamLogo from "../images/app-logo-75px.png";
import AuthModal from "./auth/AuthModal";
import { useHistory } from "react-router";
// Below is needed to ignore href requirement for <a> tags -> we use history.push for routing
/* eslint-disable jsx-a11y/anchor-is-valid */ 

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

export const AuthNavbar = () => {
  const history = useHistory();
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand onClick={() => { history.push('/home'); }} style={{ cursor: "pointer" }}><img src={teamLogo} alt='Translation app logo' />{" "}
          {/* Image source: https://www.flaticon.com/free-icon/translation_2793580 */}
        </Navbar.Brand>
        <Navbar.Brand>
          {/* Strange href value is to prevent a npm linting warning. Routing is done via history.push */}
          <a className='navbar-brand app-name' style={{ cursor: "pointer" }} onClick={() => { history.push('/home'); }} >
            Rosetta-Subs
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="navbar-item px-3" onClick={() => { history.push('/home'); }}>Home</Nav.Link>
            <Nav.Link className="navbar-item active px-3" onClick={() => { history.push('/app-home'); }}>Web App</Nav.Link>
            <Nav.Link className="navbar-item pl-3 pr-4" onClick={() => { history.push('/team-bios'); }}>Team Member Bios</Nav.Link>
          </Nav>
          <AuthButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
