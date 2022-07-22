import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Completaperfil = () => {
  const { store, actions } = useContext(Context);
  const [idFreelancerSelected, setIdFreelancerSelected] = useState(null);
  const [idiomaSelected, setIdiomaSelected] = useState(null);

  useEffect(() => {
    actions.getTipodeFreelancer();
    actions.getIdiomas();
  }, []);
  const agregarIdioma = () => {
    const body={
      idioma_id:idiomaSelected
    }
    actions.agregarIdioma(body)
  };
  return (
    <div>
      <div className="mt-5">
        <div className="text-center">
          <h1>Completa tu Perfil</h1>
          <h4 className="mt-5">En qué area profesional te desenvuelves</h4>
        </div>
        <span>{idFreelancerSelected}</span>
        <div id="experienciabox" className="container">
          <div className="container d-flex justify-content-center">
            {store.tipoFreelancer.map((item, index) => (
              <button
                className="text-center pe-5 pb-4 me-5 btn btn-dark "
                style={{ width: "350px" }}
                onClick={() => setIdFreelancerSelected(item.id)}
              >
                <i className="fas fa-code" /> {item.tipo}
              </button>
            ))}
          </div>
        </div>
        <div className="container d-flex justify-content-center mt-5 align-items-center ">
          <i style={{ fontSize: "80px" }} class="fas fa-cloud-upload-alt"></i>
          <button style={{ height: "50px" }} className="btn btn-dark mt-5 ">
            Sube tu Foto
          </button>
        </div>

        <div className="mt-5">
          <h3 className="text-center">Describenos tu Perfil</h3>
        </div>

        <div className="container justify-content-center mt-5">
          <textarea
            className="form-control col-md-offset-1"
            rows="6"
            id="input_text"
            name="text_input"
            placeholder="Describe tu experiencia..."
            required=""
          />
        </div>
        <div
          className="container justify-content-center"
          stile={{ width: "100px" }}
        >
          <div className="input-group mb-2 mt-5">
            <span
              className="input-group-text aoptiongn-items-center"
              style={{ height: "50px" }}
              id="basic-addon1"
            >
              <i className="fab fa-optionnkedin"></i>
            </span>
            <input
              style={{ width: "100px" }}
              type="text"
              className="form-control"
              placeholder="Perfil de Linkedin"
            />
          </div>

          <div className="input-group mb-2 mt-5">
            <span
              className="input-group-text aoptiongn-items-center"
              style={{ height: "50px" }}
              id="basic-addon1"
            >
              Portafolio
            </span>
            <input
              style={{ width: "100px" }}
              type="text"
              className="form-control"
              placeholder="(Opcional)"
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <h3>Idiomas</h3>
      </div>
      <div className="d-flex justify-content-center mt-5 ">
        <div className="container d-flex justify-content-center">
          <select
            className="form-select w-25"
            aria-label="Default select example"
            onClick={(e)=>setIdiomaSelected(e.target.value)}
          >
            <option selected>Selecciona Idioma</option>

            {store.idiomas.map((item, index) => (
              <option value={item.id} key={index}>
                {item.idioma}
              </option>
            ))}
          </select>
          <select
            className="form-select w-25 ms-4"
            aria-label="Default select example"
          >
            <option selected>Selecciona Nivel</option>
            <option value="1">Básico</option>
            <option value="2">Intermedio</option>
            <option value="3">Avanzado</option>
            <option value="4">Nativo</option>
          </select>
        </div>
       
      </div>
      <div className="d-flex justify-content-center mt-5">
          <button
            className="bg-black text-white w-25"
            type="button"
            onClick={() => agregarIdioma()}
          >
            Agregar idioma
          </button>
        </div>
      <div className="d-flex justify-content-center mt-5">
        <h3 className="mt-4">Años de Experiencia</h3>
      </div>
      <div className="d-flex justify-content-center p-5">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            checked
          />
          
          <label className="form-check-label me-5" for="flexRadioDefault1">
            0 - 1 Año
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label className="form-check-label me-5 " for="flexRadioDefault2">
            1 - 3 Años
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault3"
            checked
          />
          <label className="form-check-label me-5" for="flexRadioDefault3">
            3 - 5 Años
          </label>
        </div>

        
          
          <label className="form-check-label me-5" for="flexRadioDefault4">
            5+ Años
          </label>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <h3>Tarifa por Hora</h3>
      </div>
      <div className="container d-flex justify-content-center mt-3">
        <div class="d-flex form-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            $
          </span>
          <input
            type="text"
            class="form-control col-xs-2"
            placeholder="Precio en Dolares"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button type="button" className="btn btn-dark mb-5">
          Guardar
        </button>
      </div>
    </div>
  );
};
