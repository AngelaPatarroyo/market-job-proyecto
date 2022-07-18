import React, { useContext } from "react";
import Profile from "../../img/Profile.png";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Freelancers = () => {
  const { store, actions } = useContext(Context);
  actions
    .get_idiomas()
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div className="container fluid">
      <div id="freelancerscon" className="justify-content-center d-flex">
        <div className="w-50 ml-5 d-flex justify-content-center">
          <img src={Profile} style={{ height: "350px", width: "350px" }} />
        </div>
        <div
          className="w-50 text-left"
          style={{ height: "350px", width: "350px" }}
        >
          <h1>Iván González</h1>
          <h4>Diseñador Gráfico</h4>
          <h5>
            Calificación <i className="fab fa-github"></i> 4.5
          </h5>
          <h5>3 - 5 años de experiencia</h5>
          <h5>Idiomas: Español, Inglés, Francés, Latín, Portugués</h5>
          <h5>Tarifa: $35</h5>
          <div className="container d-grid gap-2 d-md w-50 row align-items-start p-0 mt-5">
            <button type="button" className="btn btn btn-dark">
              GitHub
            </button>
            <button type="button" className="btn btn btn-dark">
              LinkedIn
            </button>
          </div>
        </div>
      </div>

      <div
        className="container mt-5 col-4"
        style={{ width: "1000px", height: "1000px" }}
      >
        <h3>Descripción</h3>
        <p className="mt-5 mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-dark btn-lg col-4">
            Contratar
          </button>
        </div>
      </div>
    </div>
  );
};
