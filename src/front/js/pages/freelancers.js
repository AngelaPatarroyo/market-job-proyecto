import React, { useContext, useEffect } from "react";
import Profile from "../../img/Profile.png";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Freelancers = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getPerfilCompleto(localStorage.getItem("id"), true);
  }, [localStorage.getItem("id")]);
  return (
    <div className="container fluid">
      <div id="freelancerscon" className="justify-content-center d-flex">
        <div className="w-50 ml-5 d-flex justify-content-center">
          <img className="rounded-circle"
            src={store?.user?.imagen}
            style={{ height: "350px", width: "350px" }}
          />
        </div>
        <div
          className="w-50 text-left"
          style={{ height: "350px", width: "350px" }}
        >
          <h1>{store?.user?.nombre}</h1>
          <h4>{store?.user?.tipo_freelancer}</h4>

          <h5>{store?.user?.experiencia}</h5>
          <h5 className="d-flex">
            Idiomas:{" "}
            <h5 className="ms-2">
              {store.user?.idiomas?.map((item, index) => (
                <h5 key={index}>{item.nombre}</h5>
              ))}
            </h5>
          </h5>
          <div className="ms-5"></div>
          <h5>Tarifa por Hora: ${store?.user?.tarifa}</h5>
          <div className="d-block">
            <div className="container d-grid gap-2 d-md w-50 row align-items-start p-0 mt-5">
              <button type="button" className="btn btn btn-dark">
                <a
                  target="_blank"
                  className="text-decoration-none text-white"
                  href={store?.user?.portafolio}
                >
                  Portafolio
                </a>
              </button>
              <button type="button" className="btn btn btn-dark">
                <a
                  target="_blank"
                  className="text-decoration-none text-white"
                  href={store?.user?.linkedin}
                >
                  LinkedIn
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container mt-5 col-4 "
        style={{ width: "1000px", height: "1000px" }}
      >
        <div id="perfilcont" className="container border p-3" >
        <h3>Mi Perfil</h3>
        <p className="mt-5 mb-5">{store?.user?.descripcion}</p>
        </div>
      </div>
    </div>
  );
};
