import React from 'react'

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark ps-3">
  <a className="navbar-brand fs-3" href="#">Exapmle</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
      <a className="nav-item nav-link" href="#">Features</a>
      <a className="nav-item nav-link" href="#">Pricing</a>
      <a className="nav-item nav-link disabled" href="#">Disabled</a>
    </div>
  </div>
</nav>
  )
}