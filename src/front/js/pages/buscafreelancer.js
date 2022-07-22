import React, { Profiler, useContext, useEffect, useState } from "react";
import Foto from "../../img/Profile.png";
import { Context } from "../store/appContext";

export const Buscafreelancer = () => {
  const { store, actions } = useContext(Context);
  const [idFreelancerSelected, setIdFreelancerSelected] = useState(null);
  const [experienciaSelected, setExperienciaSelected] = useState(null);
  const [tarifa, setTarifa] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      tipo_freelancer: idFreelancerSelected,
      descripcion: descripcion,
      imagen: imagen,
      linkedin: linkedin,
      portafolio: portafolio,
      tarifa: tarifa,
      experiencia_id: experienciaSelected,
    };
    actions
      .completarPerfil(body)
      .then((resp) => {
        console.log(resp);
        navigate("/");
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
              onClick={(e) => getTipodeFreelancer(e.target.value)}
            >
              <option selected>Selleciona tipo de Freelancer</option>

              {store.tipoFreelancer.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.tipo}
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
            {store.experiencias.map((item, index) => (
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  onClick={() => setExperienciaSelected(item.id)}
                />
                <label
                  className="form-check-label me-5"
                  for="flexRadioDefault1"
                >
                  <option value={item.id} key={index}>
                    {item.experiencia}
                  </option>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="container">
          <h2 className="d-flex justify-content-center mb-5">Resultados</h2>
          <div className="container">
            <div
              className="container d-flex border"
              style={{ height: "220px", width: "350px" }}
            >
              <img
                className="mt-4 ms-3"
                style={{ height: "100px", width: "100px" }}
                src={Foto}
              />
              <div className="mt-4">
                <h4 className="ms-4 text-left">Ivan Gonzalez</h4>
                <h6 className="ms-4">Diseñador Grafico</h6>
                <h6 className="ms-4">1 - 3 años de Experiencia</h6>
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
      </div>
    </div>
  );
};
