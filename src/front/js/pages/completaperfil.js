import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import "../../styles/home.css";

export const Completaperfil = () => {
  const { store, actions } = useContext(Context);
  const [idFreelancerSelected, setIdFreelancerSelected] = useState(null);
  const [idiomaSelected, setIdiomaSelected] = useState(null);
  const [experienciaSelected, setExperienciaSelected] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [imagen, setImagen] = useState(" ");
  const [linkedin, setLinkedin] = useState(null);
  const [portafolio, setPortafolio] = useState(null);
  const [tarifa, setTarifa] = useState(null);
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }


  const handleUpload = () => {
    const storageRef = ref(storage, `/market_match/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot)=>{
      const percent = Math.round(snapshot.bytesTransferred/snapshot.totalBytes * 100)
      setPercent(percent)
    })
  };
(err) => console.log(err)



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
    //actions.signup(body);
    /*actions
        .signup(body)
        .then((resp) => {
          console.log(resp);
          navigate("/login")
        })
        .catch((error) => {
          console.log(error);
        }
        );*/
  };

  useEffect(() => {
    actions.getTipodeFreelancer();
    actions.getIdiomas();
    actions.getExperiencias();
    actions.getIdiomasFreelancer();
  }, []);
  const agregarIdioma = () => {
    const body = {
      idioma_id: idiomaSelected,
    };
    actions.agregarIdioma(body).then((resp) => {
      console.log(resp);
    });
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
                <i className={item.icono} /> {item.tipo}
              </button>
            ))}
          </div>
        </div>
        <div className="container d-flex justify-content-center mt-5 align-items-center ">
          <i style={{ fontSize: "80px" }} class="fas fa-cloud-upload-alt"></i>
          <input type="file" onChange={handleChange} accept="/image/*"></input>
          <button
            onClick={handleUpload}
            style={{ height: "50px" }}
            className="btn btn-dark mt-5 "
          >
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
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div
          className="container justify-content-center"
          style={{ width: "100px" }}
        >
          <div className="input-group mb-2 mt-5 d-flex justify-content-center">
            <span
              className="input-group-text aoptiongn-items-center"
              style={{ height: "50px" }}
              id="basic-addon1"
            >
              <i className="fab fa-optionnkedin"></i>

              <input
                style={{ width: "350px" }}
                type="text"
                className="form-control"
                placeholder="Perfil de Linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </span>
          </div>

          <div className="input-group mb-2 mt-5 d-flex justify-content-center">
            <span
              className="input-group-text aoptiongn-items-center pe-3"
              style={{ height: "50px" }}
              id="basic-addon1"
            >
              Portafolio
              <input
                style={{ width: "300px" }}
                type="text"
                className="form-control ms-3"
                placeholder="(Opcional)"
                value={portafolio}
                onChange={(e) => setPortafolio(e.target.value)}
              />
            </span>
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
            onClick={(e) => setIdiomaSelected(e.target.value)}
          >
            <option selected>Selecciona Idioma</option>

            {store.idiomas.map((item, index) => {
              if (!store.idiomasFreelancer?.some((obj) => obj.id == item.id)) {
                console.log(store.idiomasFreelancer);
                console.log(store.idiomas);
                console.log(store.idiomasFreelancer.includes(item));
                return (
                  <option value={item.id} key={index}>
                    {item.idioma}
                  </option>
                );
              }
            })}
          </select>
        </div>
      </div>

      {store.idiomasFreelancer.map((item, index) => (
        <div className="d-flex justify-content-center mt-5">
          <span>{item.nombre}</span>
        </div>
      ))}

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
        {store.experiencias.map((item, index) => (
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              onClick={() => setExperienciaSelected(item.id)}
            />
            <label className="form-check-label me-5" for="flexRadioDefault1">
              <option value={item.id} key={index}>
                {item.experiencia}
              </option>
            </label>
          </div>
        ))}
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
            placeholder="Precio en Dólares"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-dark mb-5"
          type="submit"
          id="submit"
          onClick={onSubmit}
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
