import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <>
      <nav className="fixed-top mb-1 navbar navbar-expand-lg navbar-dark lighten-1 custom_nav">
        <Link className="navbar-brand" to="/home">
          <img src="https://mdbootstrap.com/img/logo/mdb-transparent.png" height="30" alt="logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
          aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/explore">Explore</Link>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={props.logoutUser}>Logout</span>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto nav-flex-icons">
            <li className="nav-item avatar">
              <Link className="nav-link p-0" to="/profile">
                <img src={`https://davidnode-api.herokuapp.com/static/img/${props.userImg}`} className="user_cirlce_img"
                  alt="avatar"/>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <br />
      <br />
      <br />
    </>
  )
}

export default Navbar;
