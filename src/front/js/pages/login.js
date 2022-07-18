import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
       if (resp.rol==1&&resp.complete==false) {
        //redirigimos a completar la data
        navigate("/..")
       } else if (resp.rol==1){
        //redirigimos al freelancer con sus datos completos a su profile
        navigate("/..")
       } else if (resp.rol==2){
        //redirigimos a la empresa a su página
        navigate("/..")
       }
       })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="containerlogin" className="d-flex justify-content-center">
      <div
        id="con3"
        className="text-center container mt-5 mb-5 bg-white"
        style={{ width: "500px", height: "600px" }}
      >
        <div className="position-relative w-100">
          <h1 className="pt-5">Login</h1>

          <img src={logo} style={{ width: "200px", height: "200px" }} />

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
              <Link to={"/1"}>Ir a Perfil Frelancer</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
