import React from "react";
import { FileUpload } from "../components/FileUpload";
import teamLogo from "../images/app-logo-75px.png";

const AppHome = () => {
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
                        <li className="nav-item active px-2">
                                <a className="nav-link navbar-item" href="/app-home">Web App</a>
                            </li>
                        <li className="nav-item ps-2 pe-4">
                            <a className="nav-link navbar-item" href="/team-bios">Team Member Bios</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        <FileUpload />
      </div>
  
  );
};

export default AppHome;
