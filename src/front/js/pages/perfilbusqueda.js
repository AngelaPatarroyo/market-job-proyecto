import React, { useContext, useEffect } from "react";
import Profile from "../../img/Profile.png";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const Perfilbusqueda = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  /* actions
    .getIdiomasFreelancer()
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    }); */

  const onSubmit = (e) => {
    e.preventDefault();
    
    actions
      .addFavoritos(store?.perfilCompleto?.usuario_id)
      .then((resp) => {
        console.log(resp);
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
      window.scrollTo(0,0)
  };

  useEffect(() => {
    if (params?.userid) {
      actions.getPerfilCompleto(Number(params?.userid));
    }
  }, [params?.userid]);
  console.log(store?.perfilCompleto?.idiomas);
  return (
    <div className="container position-static">
      <div id="freelancerscon" className="justify-content-center d-flex">
        <div className="w-50 ml-5 d-flex justify-content-center">
          <img
            className="rounded-circle"
            src={store.perfilCompleto.imagen}
            style={{ height: "350px", width: "350px" }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div
          className="w-50 text-center"
          style={{ height: "350px", width: "350px" }}
        >
          <h1>{store.perfilCompleto.nombre}</h1>
          <h4>{store.perfilCompleto.tipo_freelancer}</h4>

          <h4>{store.perfilCompleto.experiencia}</h4>

          <h5>Idiomas:</h5>
          <div className="d-flex justify-content-center">
            <h5>
              {store.perfilCompleto?.idiomas?.map((item, index) => (
                <h5 key={index}>{item.nombre}</h5>
              ))}
            </h5>
          </div>

          <h5>
            Teléfono:{" "}
            <a
              className="text-decoration-none text-black mb-4"
              href={
                "https://web.whatsapp.com/send?phone=" +
                store.perfilCompleto.telefono
              }
              target="_blank"
            >
              <i
                style={{ color: "green", fontSize: "30px" }}
                className="fab fa-whatsapp pe-2 ps-2"
              ></i>
            </a>
            {store.perfilCompleto.telefono}
          </h5>

          <div>
            <h5>Tarifa por Hora: ${store.perfilCompleto.tarifa}</h5>
            <div className="container d-flex justify-content-center">
              <div className="container gap-3 w-50 row mt-5">
                <button type="button" className="btn btn btn-dark ">
                  <a
                    className="text-decoration-none text-white"
                    href={store.perfilCompleto.portafolio}
                  >
                    Portafolio
                  </a>
                </button>

                <button type="button" className="btn btn btn-dark mb-2">
                  <a
                    target="_blank"
                    className="text-decoration-none text-white"
                    href={store.perfilCompleto.linkedin}
                  >
                    LinkedIn
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="perfilcontainer"
        className="container border p-3 mb-5"
        style={{ width: "1000px" }}
      >
        <div>
          <h3>Perfil Professional:</h3>
          <p className="mt-3 mb-4">{store.perfilCompleto.descripcion}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center position-relative mb-5">
        <button
          type="button"
          className="btn btn-dark btn-lg col-4 position-static "
          onClick={onSubmit}
        >
          Agregar a Favoritos
        </button>
      </div>
    </div>
  );
};
