import teamLogo from "../images/app-logo-75px.png";
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
      <div>
        <nav className='navbar navbar-expand-md'>
          <a className='navbar-brand ps-3' href='/home'>
            <img src={teamLogo} alt='Translation app logo' />{" "}
          </a>
          <a className='navbar-brand app-name' href='/home'>
            Rosetta-Subs
          </a>
          <button
            className='navbar-toggler navbar-light'
            data-toggle='collapse'
            data-target='#collapse_target'>
            <span className='navbar-toggler-icon'></span>
          </button>
          {/* Image source: https://www.flaticon.com/free-icon/translation_2793580 */}
          <div className='collapse navbar-collapse' id='collapse_target'>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item px-2'>
                <a className='nav-link navbar-item' href='/home'>
                  Home
                </a>
              </li>
              <li className='nav-item px-2'>
                <a className='nav-link navbar-item' href='/app-home'>
                  Web App
                </a>
              </li>
              <li className='nav-item ps-2 pe-4 active'>
                <a className='nav-link navbar-item' href='/team-bios'>
                  Team Member Bios
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className='row justify-content-center' style={{ padding: "70px 0" }}>
        <div className='col-10 row main-module ps-0'>
          <img
            src={puffin}
            alt='Logan Elkins'
            className='col-4 ps-0'
            style={{ borderRadius: "10px" }}
          />
          <div className='col-8'>
            <h3 className='pt-4'>Logan Elkins</h3>
            <p className='pt-4 px-2 biography-module-text'>
              I am a senior at the University of Alabama graduating with a BS in
              Computer Science in December 2021. Throughout my internship at
              Synopsys, Inc., I have had the opportunity to specialize in Data
              Analytics via Python and Data Visualization in Tableau.
            </p>
            <p className='pt-2 px-2 biography-module-text'>
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

      <div className='row justify-content-center' style={{ padding: "15px 0" }}>
        <div className='col-10 row main-module ps-0'>
          <img
            src={noah}
            alt='Noah Zielke'
            className='col-4 ps-0'
            style={{ borderRadius: "10px" }}
          />
          <div className='col-8'>
            <h3 className='pt-4'>Noah Samuel Zielke</h3>
            <p className='pt-4 px-2 biography-module-text'>
              I have experience working with Ansible playbooks, basic C and C++,
              ROBOT Framework, Python, HTML/CSS, and very small amounts of
              Javascript. I also have some experience working with Openstack and
              Jenkins from my time as a Co-op at Adtran, where I worked on their
              device management software called the Mosaic Cloud Platform.
            </p>
            <p className='pt-2 px-2 biography-module-text'>
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

      <footer></footer>
      <div className='py-2 px-3 attribution'>
        Icons made by{" "}
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
