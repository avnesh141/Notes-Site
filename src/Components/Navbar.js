import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import alertcontext from "../Contexts/Alert/AlertContext";

function Navbar() {

  const alcontext = useContext(alertcontext);
  const { setalert } = alcontext;

  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const logouthandle = () => {
    localStorage.removeItem("token");
    setalert("SUCCESS", "Logged Out SuccessFully");
    navigate('/login');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">Navbar</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={
                    location.pathname === "/" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    location.pathname === "/about"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/about"
                >
                  About Us
                </Link>
              </li>
            </ul>
            { localStorage.getItem('token') &&<Link className="icon" to="/profile" >
            </Link>}
            <div className="loginbutton">
              {!localStorage.getItem("token") ? (
                <form>
                  <Link
                    className="btn btn-primary mx-3"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-primary"
                    to="/register"
                    role="button"
                  >
                    SignUp
                  </Link>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={logouthandle}
                  className="btn btn-primary"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
