import { NonAuthNavbar } from "../components/NonAuthNavbar";
import logan from "../images/logan-profile.jpg";
import noah from "../images/noah-profile.jpg";
import puffin from "../images/puffin.jpg";


const TeamBios = () => {
  function showHideContact(email: string, order: number) {
    var x = document.getElementById(`contact-info-${order}`)!;
    if (x.style.display === "none") {
      x.style.display = "block";
      x.style.textAlign = "center";
      x.style.display = "inline";
      x.classList.add('px-3');
      x.innerHTML = `${email}`;
    } else {
      x.style.display = "none";
    }
  }
  return (
    <div>
      <NonAuthNavbar active="team-bios" />

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
              src={puffin}
              alt='Parker Hopson'
              className='d-none d-lg-block col-lg-4 pl-0'
              style={{ borderRadius: "10px" }}
            />
            <div className='col-lg-8 col-12'>
              <h3 className='pt-4'>Parker Hopson</h3>
              <p className='pt-3 px-2 biography-module-text'>
                I am a senior at the University of Alabama, expecting to graduate in December with a B.S. in Computer Science, Minor in Mathematics. I have experience in multiple facets of IT, from triage to basic server maintenance, from my time at Alabama Public Radio and WVUA23 News station.
              </p>
              <p className='px-2 biography-module-text'>
                I also gained experience in project management during my time at Profill Solutions. Other than technology, my interests include exercising, watching movies, and listening to a variety of music.
              </p>
              <div className='pb-4 pt-2'>
                <button
                  onClick={() => showHideContact("pzhopson@crimson.ua.edu", 2)}
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
                  onClick={() => showHideContact("noahsamuelzielke@gmail.com", 3)}
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

      <div className="container-fluid">
        <div className='row justify-content-center' style={{ padding: "15px 0" }}>
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
                  onClick={() => showHideContact("crmilsap@crimson.ua.edu", 4)}
                  className='btn btn-primary py-2'>
                  Click to Show Contact Info
                </button>
                <p
                  id='contact-info-4'
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
