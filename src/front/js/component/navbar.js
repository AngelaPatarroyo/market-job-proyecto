import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

export const Navbar = () => {
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
              <a className="nav-link text-white" href="#">
                Soluciones
              </a>
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
                    Diseñadores
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Videografos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Digital Marketers
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <div className="container row col-md-8 col-md-offset-2 text-right">
            <form className="form-inline my-2 my-lg-0 text-right">
              <div className="d-flex justify-content-end">
                <input
                  className="form-control w-50"
                  type="search"
                  placeholder="Buscar Freelancers"
                  aria-label="Search"
                ></input>
              </div>
            </form>
          </div>
          <div>
            <Link to="login">
              <button type="button" class="btn btn-dark">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
