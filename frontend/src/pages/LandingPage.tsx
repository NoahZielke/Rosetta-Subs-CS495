import teamLogo from "../images/app-logo-75px.png";
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav} from "react-bootstrap";

const LandingPage = () => {
  return (
    <div>
      <Navbar expand="lg" className="mr-0 ml-0">
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
              <Nav.Link className="navbar-item active px-3" href="/home">Home</Nav.Link>
              <Nav.Link className="navbar-item px-3" href="/app-home">Web App</Nav.Link>
              <Nav.Link className="navbar-item pl-3 pr-4" href="/team-bios">Team Member Bios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container-fluid">
        <div className='row' style={{ padding: "70px 0" }}>
          <div className='col-lg-8 col-11 main-module justify-content-center'>
            <p className='pt-4 pb-2 px-2 main-module-text'>
              Rosetta-Subs is an app designed to make adding subtitles to a video
              in any language easy
            </p>
            <p className='main-module-text pb-3'>
              This browser-based application requires no setup on the part of the
              user
            </p>
            <div className='pb-4'>
              <a href='/app-home' className='btn btn-success app-button'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-translate'
                  viewBox='0 0 16 16'>
                  <path d='M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z' />
                  <path d='M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z' />
                </svg>
                {/* icon source https://icons.getbootstrap.com/icons/translate/ */}
                {"\u00A0"} Go to the Web App
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className='row'>
          <div className='col-11 col-lg-8 main-module justify-content-center'>
            <p className='pt-4 pb-2 px-2 main-module-text'>
              To view source code, instructions for running this app on your own
              server, and videos presenting the app in use, visit our public
              Github page
            </p>
            <div className='pb-4'>
              <a
                href='https://github.com/NoahZielke/Subtitle-Generator-cs495'
                target='_blank'
                rel='noreferrer'
                className='btn btn-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-github'
                  viewBox='0 0 16 16'>
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
                {/* Icon source https://icons.getbootstrap.com/icons/github/ */}
                {"\u00A0"} Our Github Project
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer></footer>

      <div className='py-2 px-3 attribution'>
        App logo made by{" "}
        <a href='https://www.freepik.com' title='Freepik'>
          Freepik
        </a>{" "}
        from{" "}
        <a href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
