import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import signup from "../../img/signup.png";
import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [isFreelancer, setIsFreelancer] = useState("");
  const [isEmpresa, setIsEmpresa] = useState("");
  const [pais, setPais] = useState("");
  const [rol, setRol] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      rol: rol,
      correo: email,
      contrasena: password,
      telefono: phone,
    };
    console.log(body);

    /*  actions
      .signup(body)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      }); */
  };

  useEffect(() => {
    actions.get_roles();
  }, []);

  return (
    <div className="d-flex justify-content-center" id="contenedor">
      <div className="text-center mt-5 bg-white d-flex justify-content-center" id="con2">
        <h1>Regístrate</h1>
        <div style={{width:"500px", height:"1000px"}} className="position-relative">
          <div className="d-flex w-100 m-5">
            <form onSubmit={onSubmit}>
              <div>
                <img src={signup} style={{width:"210px", height:"210px"}}/>
              </div>
              <div>
                {store?.roles.map((rol) => {
                  return (
                    <div className="form-check mt-3" key={rol.id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        onClick={() => setRol(rol.id)}
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        {rol.nombre}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="m-3">
                <input className="w-100"
                  type={"email"}
                  placeholder="Correo electrónico"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type={"password"}
                  required
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="m-3">
                <input
                  type={"text"}
                  placeholder="Dirección"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="m-3">
                <input
                  type={"text"}
                  placeholder="Ciudad"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="m-3">
                <select
                  className="form-control"
                  id="pais"
                  value={pais}
                  required
                  placeholder="País"
                  onChange={(e) => setPais(e.target.value)}
                >
                  <option
                    value=""
                    selected
                    disabled
                    className="defaultOption border border-dark"
                    id="codigo"
                  >
                    Código de País
                  </option>
                  <option value="+57">Colombia (+57)</option>
                  <option value="+54">Argentina (+54)</option>
                  <option value="+598">Uruguay (+598)</option>
                  <option value="+55">Brasil (+55)</option>
                  <option value="+595">Paraguay</option>
                  <option value="+56">Chile (+56)</option>
                  <option value="+51">Perú (+51)</option>
                  <option value="+598">Venezuela</option>
                  <option value="+507">Panamá</option>
                  <option value="+505">Nicaragua</option>
                  <option value="+506">Costa Rica (+506)</option>
                  <option value="+52">México (+52)</option>
                  <option value="+202">Estados Unidos</option>
                </select>
              </div>
              <div className="m-3">
                <input
                  type={"text"}
                  placeholder="Teléfono"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="text-white bg-black"
                  type="submit"
                  id="submit"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
