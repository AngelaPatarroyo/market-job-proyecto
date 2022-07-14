import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      correo: email,
      contrasena: password,
    };

    console.log(body);

    actions
      .login(body)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="text-center mt-5 container"
      style={{ width: "500px", height: "600px" }}
    >
      <h1>Login</h1>
      <div className="p-5">
        <img src={logo} style={{ width: "200px", height: "200px" }} />
      </div>
      <div>
        <div>
          <form onSubmit={onSubmit}>
            <div className="mt-5 mb-3">
              <input
                className="w-75"
                type={"email"}
                placeholder="Correo electrónico"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <input
                className="w-75"
                type={"password"}
                required
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button className="bg-black text-white w-25" type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
