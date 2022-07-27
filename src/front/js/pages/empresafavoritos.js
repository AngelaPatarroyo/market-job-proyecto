import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import Foto from "../../img/Profile.png";

export const Empresafavoritos = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.verFavoritos();
  }, []);

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
      {store.favoritos.map((item, index) => (
        <div className="d-flex">
          <div
            className="container d-flex border mb-3 mt-5"
            id="carta perfil"
            style={{ height: "250px", width: "350px" }}
          >
            <img
              className="mt-4 ms-3"
              style={{ height: "100px", width: "100px" }}
              src={Foto}
            />
            <div className="mt-5 mb-3">
              <h4 className="ms-4 text-left">{item.nombre}</h4>
              <h6 className="ms-4">{item.tipo_freelancer}</h6>
              <h6 className="ms-4">{item.experiencia}</h6>
              <h6 className="ms-4">Tarifa por hora: ${item.tarifa}</h6>
              <div className="d-flex w-50 justify">
                <Link
                  className="text-decoration-none"
                  target="_blank"
                  to={`/perfilbusqueda/${item.id}`}
                >
                  <button
                    type="button"
                    className="btn btn-dark d-flex justify-content-center mt-4 mb-5"
                  >
                    Ver Perfil
                  </button>
                </Link>
                <button value={item.id_favorito}
                onClick={(e)=>{
                  const function1 = actions?.deleteFavorito(e.target.value)
                  const function2 = window.location.reload()}}
                
                    type="button"
                    className="btn btn-dark d-flex justify-content-center mt-4 mb-5"
                  >
                    Eliminar
                  </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
