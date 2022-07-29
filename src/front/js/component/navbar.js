import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  console.log(store?.user);
  return (
    <nav className="navbar navbar-expand-lg bg-black ">
      <div className="container-fluid ">
        <img className="logonav" src={logo} />
        <a className="navbar-brand p-r-6 text-white" href="/">
          market match
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active text-white"
                aria-current="page"
                href="#"
              >
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#"></a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Precios
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Freelancers
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Digital Marketing
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Programación y Tecnologia
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Digital Marketing
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Producción de video
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {localStorage.getItem("accessToken") && (
            <div>
              <Link to="/buscafreelancer">
                <button
                  id="buttonnavbar"
                  className="btn btn-dark w-100 text-center"
                >
                  Encuentra tu match perfecto
                  <i className="ps-2 fas fa-users fa-2x"></i>
                </button>
              </Link>
            </div>
          )}

          {localStorage.getItem("accessToken") ? (
            <div className="d-flex justify-content-end">
              <div>
                <Link
                  className="btn btn-dark"
                  to={
                    localStorage?.getItem("rol") == 1
                      ? "/perfil"
                      : "/empresafavoritos"
                  }
                  id="navbarlogin"
                  type="button"
                >
                  Mi Perfil
                </Link>
                <button
                  type="button"
                  className="btn btn-dark ms-3"
                  onClick={() => {
                    actions.logOut();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="w-100 text-right d-flex justify-content-end pe-5">
              <Link to="/login">
                <button id="navbarlogin" type="button" className="btn btn-dark">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
