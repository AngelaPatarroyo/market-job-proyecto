import React, { Profiler, useContext, useEffect, useState } from "react";
import Foto from "../../img/Profile.png";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Buscafreelancer = () => {
  const { store, actions } = useContext(Context);
  const [idTipo, setIdTipo] = useState(null);
  const [idExperiencia, setIdExperiencia] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("estos son los id");
    console.log(idTipo);
    console.log(idExperiencia);

    actions
      .buscaFreelancer(idTipo, idExperiencia)
      .then((resp) => {
        console.log(resp);
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    actions.getTipodeFreelancer();
    actions.getIdiomas();
    actions.getExperiencias();
  }, []);
  const agregarIdioma = () => {
    const body = {
      idioma_id: idiomaSelected,
    };
    actions.agregarIdioma(body);
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5 pt-5 mb-5">
        <h1>Busca tu mejor Freelancer</h1>
      </div>
      <div>
        <div className="d-flex justify-content-center mt-5 ">
          <div className="container d-flex justify-content-center">
            <select
              className="form-select w-25"
              aria-label="Default select example"
              onChange={(e) => setIdTipo(e.target.value)}
            >
              <option selected>Selecciona tipo de Freelancer</option>

              {store?.tipoFreelancer?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.tipo}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-center mt-5">
            <h3 className="mt-4">Años de Experiencia</h3>
          </div>
          <div className="d-flex justify-content-center p-5">
            {store?.experiencias?.map((item, index) => (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  onClick={() => setIdExperiencia(item?.id)}
                />
                <label
                  className="form-check-label me-5"
                  for="flexRadioDefault1"
                >
                  <option value={item?.id} key={index}>
                    {item?.experiencia}
                  </option>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-5 mt-3">
        <button
          type="submit"
          className="btn btn-dark text-white"
          id="submit"
          onClick={onSubmit}
        >
          Buscar
        </button>
      </div>
      <div className="container mb-5">
        <div className="container">
          <h2 className="d-flex justify-content-center mb-5">Resultados</h2>
          <div className="container">
            <div className="row">
              {store?.perfilesFreelancer?.map((item, index) => (
                <div className="col">
                  <div
                    className="container d-flex border mb-5"
                    id="cartaperfil"
                    style={{ height: "250px", width: "350px" }}
                  >
                    <img
                      className="mt-4 ms-3 rounded-circle"
                      style={{ height: "100px", width: "100px" }}
                      src={item.imagen}
                    />
                    <div className="mt-4 mb-5">
                      <h4 className="ms-4 text-left">{item?.nombre}</h4>
                      <h6 className="ms-4">{item?.tipo_freelancer}</h6>
                      <h6 className="ms-4">{item?.experiencia}</h6>
                      <h6 className="ms-4">Tarifa por hora: ${item?.tarifa}</h6>

                      <Link
                        className="text-decoration-none"
                        to={`/perfilbusqueda/${item?.id}`}
                      >
                        <button
                          type="button"
                          class="btn btn-dark d-flex justify-content-center mt-4 mb-5"
                        >
                          Ver Perfil
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
