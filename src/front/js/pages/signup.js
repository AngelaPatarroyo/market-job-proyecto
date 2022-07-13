import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
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
  const onSubmit = () => {
    alert(password);
  };

  return (
    <div className="d-flex justify-content-center">
    <div className="text-center mt-5">
      <h1>Regístrate</h1>
      <div>
        <div className="d-flex">
          <form onSubmit={onSubmit}>
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  Freelancer
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
                <label className="form-check-label" for="flexRadioDefault2">
                  Empresa
                </label>
              </div>
            </div>
            <div>
              <input
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type={"text"}
                placeholder="Dirección"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <input
                type={"text"}
                placeholder="Ciudad"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <select
                className="form-control"
                id="pais"
                required
                placeholder="País"
                onChange={(e) => setPais(e.target.value)}
              >
                <option value="" selected disabled className="defaultOption">
                  Código de País
                </option>
                <option value="CO">Colombia (+57)</option>
                <option value="AR">Argentina (+54)</option>
                <option value="UR">Uruguay (+598)</option>
                <option value="BR">Brasil (+55)</option>
                <option value="PA">Paraguay</option>
                <option value="CH">Chile (+56)</option>
                <option value="PE">Perú (+51)</option>
                <option value="VE">Venezuela</option>
                <option value="PA">Panamá</option>
                <option value="NI">Nicaragua</option>
                <option value="CR">Costa Rica (+506)</option>
                <option value="SA">Salvador</option>
                <option value="GU">Guatemala</option>
                <option value="MX">México (+52)</option>
                <option value="EU">Estados Unidos</option>
                <option value="CU">Cuba</option>
                <option value="RD">República Dominicana</option>
                <option value="HA">Haití</option>
                <option value="JA">Jamaica</option>
              </select>
            </div>
            <div>
              <input
                type={"text"}
                placeholder="Teléfono"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};
