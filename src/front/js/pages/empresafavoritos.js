import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import Foto from "../../img/Profile.png";

export const Empresafavoritos = () => {
  return (
    <div>
      <div className="container mt-5 d-flex">
        <h1>Hola Apple</h1>
      </div>
      <div>
        <h5 className="container mt-5">
          Encuentra aquí tus Freelancers Favoritos
        </h5>
      </div>
      <div d-flex>
        <div
          className="container d-flex border mb-5 mt-5"
          id="carta perfil"
          style={{ height: "250px", width: "350px" }}
        >
          <img
            className="mt-4 ms-3"
            style={{ height: "100px", width: "100px" }}
            src={Foto}
          />
          <div className="mt-4 mb-5">
            <h4 className="ms-4 text-left">Angela Rodriguez</h4>
            <h6 className="ms-4">Digital Marketing</h6>
            <h6 className="ms-4">5 Años</h6>
            <h6 className="ms-4">Tarifa por hora: $50</h6>

            <button
              type="button"
              class="btn btn-dark d-flex justify-content-center mt-4 mb-5"
            >
              Ver Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
