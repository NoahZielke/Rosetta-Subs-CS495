import { MyNavbar } from "../components/Navbar";
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
      <div style={{ marginBottom: 50 }}>
        <MyNavbar active='team member bios' />
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
