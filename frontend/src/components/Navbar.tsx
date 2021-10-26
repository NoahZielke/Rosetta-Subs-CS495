import React, { useContext, useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router";
import { UserContext } from "../context/UserContext";
import teamLogo from "../images/app-logo-75px.png";
import AuthModal from "./auth/AuthModal";

const AuthButton = () => {
  const [modal, setModal] = useState(false);
  const { user, setUser } = useContext(UserContext);

  if (user) {
    return (
      <div
        // className='mb-2'
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: 12,
          bottom: 12,
        }}>
        <p className='text-light m-0 mr-3'>Hi {user.email}!</p>
        <Button variant='outline-danger' onClick={() => setUser(undefined)}>
          Sign out
        </Button>
        \
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", right: 12, bottom: 12 }}>
      <AuthModal show={modal} handleClose={() => setModal(false)} />
      <Button variant='outline-primary' onClick={() => setModal(true)}>
        Sign In
      </Button>
    </div>
  );
};

// export const Navbar: React.FC<{
//   active: "home" | "web app" | "team member bios";
// }> = ({ active }) => {
//   return (
//     <nav className='navbar navbar-expand-md'>
//       <a className='navbar-brand ps-3' href='/home'>
//         <img src={teamLogo} alt='Translation app logo' />{" "}
//       </a>
//       <a className='navbar-brand app-name' href='/home'>
//         Rosetta-Subs
//       </a>
//       <button
//         className='navbar-toggler navbar-light'
//         data-toggle='collapse'
//         data-target='#collapse_target'>
//         <span className='navbar-toggler-icon'></span>
//       </button>
//       {/* Image source: https://www.flaticon.com/free-icon/translation_2793580 */}
//       <div className='collapse navbar-collapse' id='collapse_target'>
//         <ul className='navbar-nav ms-auto'>
//           <li
//             className={`nav-item px-2 ${active === "home" ? "active" : null}`}>
//             <a className='nav-link navbar-item' href='/home'>
//               Home
//             </a>
//           </li>
//           <li
//             className={`nav-item px-2 ${
//               active === "web app" ? "active" : null
//             }`}>
//             <a className='nav-link navbar-item' href='/app-home'>
//               Web App
//             </a>
//           </li>
//           <li
//             className={`nav-item ps-2 pe-4 ${
//               active === "team member bios" ? "active" : null
//             }`}>
//             <a className='nav-link navbar-item' href='/team-bios'>
//               Team Member Bios
//             </a>
//           </li>
//         </ul>
//       </div>
//       <AuthButton />
//     </nav>
//   );
// };

export const MyNavbar: React.FC<{
  active: "home" | "web app" | "team member bios";
}> = ({ active }) => {
  const history = useHistory();

  return (
    <Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
      <Navbar.Brand
        onClick={(e) => {
          e.preventDefault();
          history.push("/home");
        }}
        style={{ cursor: "pointer" }}>
        <img src={teamLogo} width='30' height='30' alt='Translation app logo' />
        <span className='ml-3'>Rossetta Subs</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          <Nav.Link
            onClick={(e) => {
              e.preventDefault();
              history.push("/home");
            }}
            style={{
              color: active === "home" ? "rgb(100, 196, 100)" : undefined,
              cursor: "pointer",
            }}>
            Home
          </Nav.Link>
          <Nav.Link
            onClick={(e) => {
              e.preventDefault();
              history.push("/app-home");
            }}
            style={{
              color: active === "web app" ? "rgb(100, 196, 100)" : undefined,
              cursor: "pointer",
            }}>
            Transcribe
          </Nav.Link>
          <Nav.Link
            onClick={(e) => {
              e.preventDefault();
              history.push("/team-bios");
            }}
            id={
              active === "team member bios"
                ? "active-nav-dropdown"
                : "basic-nav-dropdown"
            }
            style={{ cursor: "pointer" }}>
            Team Members
          </Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar.Collapse>
    </Navbar>
  );
};
