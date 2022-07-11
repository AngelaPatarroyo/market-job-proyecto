import React, { useContext } from "react";
import logo from "../../img/logomm.png";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <div className="d-flex">
        <div className="texthome w-50">
          <h2>
            Encuentra los mejores profesionales que mejor se adaptan a las
            necesidades de tu empresa
          </h2>
          <p className="pt-5">
            <b>market match</b> te ayuda a encontrar trabajadores por horas que
            mejor se adapten a tus necesidas y si eres un <b>freelance</b>{" "}
            buscando trabajar para una empreza calificada, este es tu lugar
          </p>
          <div className="d-grid col-6">
            <Link to="/signup">
              <button type="button" className="btn btn-default">
                Resgistrate Aquí
              </button>
            </Link>
          </div>
        </div>
        <div className="d-flex w-50">
          <img src={logo} className="imagehome" alt="..." />
        </div>
      </div>
    </div>
  );
};
