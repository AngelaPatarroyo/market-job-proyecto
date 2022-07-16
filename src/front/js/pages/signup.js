import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import signup from "../../img/signup.png";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [msjError, setMsjError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [isFreelancer, setIsFreelancer] = useState("");
  const [isEmpresa, setIsEmpresa] = useState("");
  const [pais, setPais] = useState("");
  const [rol, setRol] = useState(0);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setMsjError("");
    if (password !== password2) {
      alert("Las contraseñas no coinciden");
    } else {
      const body = {
        rol: rol,
        correo: email,
        contrasena: password,
        telefono: phone,
      };
      //actions.signup(body);
      actions
        .signup(body)
        .then((resp) => {
          console.log(resp);
          navigate("/login")
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(body);
  };

  useEffect(() => {
    actions.get_roles();
  }, []);

  return (
    <div className="d-flex justify-content-center" id="contenedor">
      <div className="text-center mt-4 bg-white mb-5 p-5" id="con2">
        <h1>Regístrate</h1>
        <div className="position-relative">
          <div className="d-flex w-100 m-5">
            <form
              style={{ width: "500px", height: "600px" }}
              onSubmit={onSubmit}
            >
              <div>
                <img src={signup} style={{ width: "210px", height: "210px" }} />
              </div>
              <div>
                {store?.roles.map((rol) => {
                  return (
                    <div className="form-check mt-2" key={rol.id}>
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
              <div className="mt-3">
                <input
                  className="w-75"
                  type={"email"}
                  placeholder="Correo electrónico"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <input
                  className="w-75"
                  type={"password"}
                  required
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <input
                  className="w-75"
                  type={"password"}
                  required
                  placeholder="Confirmar Contraseña"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <input
                  className="w-75"
                  type={"text"}
                  placeholder="Dirección"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <input
                  className="w-75"
                  type={"text"}
                  placeholder="Ciudad"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <select
                  className="form-control w-75"
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
                  <option value="+595">Paraguay (+595)</option>
                  <option value="+56">Chile (+56)</option>
                  <option value="+51">Perú (+51)</option>
                  <option value="+598">Venezuela (+598)</option>
                  <option value="+507">Panamá (+507)</option>
                  <option value="+505">Nicaragua (+505)</option>
                  <option value="+506">Costa Rica (+506)</option>
                  <option value="+52">México (+52)</option>
                  <option value="+202">Estados Unidos (+202)</option>
                </select>
              </div>
              <div className="mt-3">
                <input
                  className="w-75"
                  type={"text"}
                  placeholder="Teléfono"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="text-white bg-black mt-5 w-25"
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
