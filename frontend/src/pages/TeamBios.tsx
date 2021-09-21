import puffin from "../images/puffin.jpg";
import teamLogo from "../images/app-logo-75px.png";


const TeamBios = () => {
    function myFunction() {
        var x = document.getElementById("contact-info")!;
        if (x.style.display === "none") {
            x.style.display = "block";
            x.innerHTML = "email: johnsmith@example.com";
        } else {
            x.style.display = "none";
        }
    }
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-md">
                    <a className="navbar-brand ps-3" href="/home" ><img src={teamLogo} alt="Translation app logo" /> </a>
                    <a className="navbar-brand app-name" href="/home">Our App Name</a>
                    <button className="navbar-toggler navbar-light" data-toggle="collapse" data-target="#collapse_target">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Image source: https://www.flaticon.com/free-icon/translation_2793580 */}
                    <div className="collapse navbar-collapse" id="collapse_target">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item px-2">
                                <a className="nav-link navbar-item" href="/home">Home</a>
                            </li>
                            <li className="nav-item px-2">
                                <a className="nav-link navbar-item" href="/app-home">Web App</a>
                            </li>
                            <li className="nav-item ps-2 pe-4 active">
                                <a className="nav-link navbar-item" href="/team-bios">Team Member Bios</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

             <div className="row justify-content-center" style={{padding: "70px 0"}}>
                <div className="col-10 row main-module ps-0">
                    <img src={puffin} alt="A wonderful puffin bird" className="col-4 ps-0" style={{borderRadius: "10px"}} />
                    <div className="col-8">
                        <h3 className="pt-4">Someone's Name</h3>
                        <p className="pt-4 pb-2 px-2 main-module-text">
                            I'm from such-and-such, my skills are so-and-so, my interests are so-and-so. I have worked here, and I've internshiped here, where I worked on this. 
                        </p>
                        <p className="pt-2 pb-3 px-2 main-module-text">
                            More text here more text here more text here more text here more text here more text here more text here
                        </p>
                        <div className="pt-2">
                            <button onClick={myFunction} className="btn btn-primary py-2">Click to Show Contact Info</button>
                            <p id="contact-info" className=" py-2 main-module-text" style={{display: "none"}}></p>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <footer></footer>
            <div className="py-2 px-3 attribution">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                
        </div>
    );
  };

  export default TeamBios;