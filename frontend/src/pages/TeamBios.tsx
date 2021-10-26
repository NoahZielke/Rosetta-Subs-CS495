import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import teamLogo from "../images/app-logo-75px.png";
import logan from "../images/logan-profile.jpg";
import noah from "../images/noah-profile.jpg";
import puffin from "../images/puffin.jpg";

const TeamBios = () => {
  function showHideContact(email: string, order: number) {
    var x = document.getElementById(`contact-info-${order}`)!;
    if (x.style.display === "none") {
      x.style.display = "block";
      x.innerHTML = `email: ${email}`;
    } else {
      x.style.display = "none";
    }
  }
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
              <Nav.Link className="navbar-item px-3" href="/app-home">Web App</Nav.Link>
              <Nav.Link className="navbar-item active pl-3 pr-4" href="/team-bios">Team Member Bios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container-fluid">
        <div className='row justify-content-center' style={{ padding: "70px 0" }}>
          <div className='col-10 row main-module pl-0'>
            <img
              src={logan}
              alt='Logan Elkins'
              className='d-none d-lg-block col-lg-4 pl-0'
              style={{ borderRadius: "10px" }}
            />
            <div className='col-lg-8 col-12'>
              <h3 className='pt-4'>Logan Elkins</h3>
              <p className='pt-3 px-2 biography-module-text'>
                I am a senior at the University of Alabama graduating with a BS in
                Computer Science in December 2021. Throughout my internship at
                Synopsys, Inc., I have had the opportunity to specialize in Data
                Analytics via Python and Data Visualization in Tableau.
              </p>
              <p className='pt-1 px-2 biography-module-text'>
                I have two dogs, an American Staffordshire and a Pointer/Lab mix,
                both of whom are rescues. I enjoy playing video games and going
                hiking in my free time.
              </p>
              <div className='pb-4 pt-2'>
                <button
                  onClick={() => showHideContact("lselkins@crimson.ua.edu", 1)}
                  className='btn btn-primary py-2'>
                  Click to Show Contact Info
                </button>
                <p
                  id='contact-info-1'
                  className='pt-2 main-module-text'
                  style={{ display: "none" }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className='row justify-content-center' style={{ padding: "15px 0" }}>
          <div className='col-10 row main-module pl-0'>
            <img
              src={noah}
              alt='Noah Zielke'
              className='d-none d-lg-block col-lg-4 pl-0'
              style={{ borderRadius: "10px" }}
            />
            <div className='col-lg-8 col-12'>
              <h3 className='pt-4'>Noah Samuel Zielke</h3>
              <p className='pt-3 px-2 biography-module-text'>
                I have experience working with Ansible playbooks, basic C and C++,
                ROBOT Framework, Python, HTML/CSS, and very small amounts of
                Javascript. I also have some experience working with Openstack and
                Jenkins from my time as a Co-op at Adtran, where I worked on their
                device management software called the Mosaic Cloud Platform.
              </p>
              <p className='px-2 biography-module-text'>
                I especially enjoy web design and automation work. Away from the
                computer, I enjoy hiking, biking, camping, studying Spanish, and
                playing basketball. Puedes me contactar para hablar en Espanol en
                cualquier momento!!!
              </p>
              <div className='pb-4 pt-2'>
                <button
                  onClick={() => showHideContact("noahsamuelzielke@gmail.com", 2)}
                  className='btn btn-primary py-2'>
                  Click to Show Contact Info
                </button>
                <p
                  id='contact-info-2'
                  className='pt-2 main-module-text'
                  style={{ display: "none" }}></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className='row justify-content-center' style={{ padding: "70px 0" }}>
          <div className='col-10 row main-module pl-0'>
            <img
              src={puffin}
              alt='Cory Milsap'
              className='d-none d-lg-block col-lg-4 pl-0'
              style={{ borderRadius: "10px" }}
            />
            <div className='col-lg-8 col-12'>
              <h3 className='pt-4'>Cory Milsap</h3>
              <p className='pt-3 px-2 biography-module-text'>
                I am graduating December 2021 with a B.S in Computer Science. I
                plan to return to Goldman Sachs as a Financial Engineer. Interests
                include blockchain, football, and reading.
              </p>
              <div className='pb-4 pt-2'>
                <button
                  onClick={() => showHideContact("crmilsap@crimson.ua.edu", 3)}
                  className='btn btn-primary py-2'>
                  Click to Show Contact Info
                </button>
                <p
                  id='contact-info-3'
                  className='pt-2 main-module-text'
                  style={{ display: "none" }}></p>
              </div>
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

export default TeamBios;
