import React, { useContext } from "react";
import designer from "../../img/designer.png";
import shirt from "../../img/tshirts.png";
import work from "../../img/workingppl.png";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <div className="d-flex">
        <div className="texthome w-50">
          <h2>
            Encuentra los mejores profesionales que mejor se adaptan a las
            necesidades de tu empresa
          </h2>
          <p className="pt-5">
            <b>market match</b> te ayuda a encontrar trabajadores por horas que
            mejor se adapten a tus necesidas y si eres un <b>freelance</b>{" "}
            buscando trabajar para una empreza calificada, este es tu lugar
          </p>
          <div className="d-grid col-6">
            <Link to="/signup">
              <button type="button" className="btn btn-default text-white">
                Resgistrate Aquí
              </button>
            </Link>
          </div>
        </div>
        <div className="d-flex w-50">
          <div>
            <div
              id="carouselExampleCaptions"
              className="carousel slide float-end"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators ">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner w-100">
                <div className="carousel-item active">
                  <img src={designer} className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>
                      Some representative placeholder content for the first
                      slide.
                    </p>
                  </div>
                </div>
                <div className="carousel-item w-100">
                  <img src={shirt} className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>
                      Some representative placeholder content for the second
                      slide.
                    </p>
                  </div>
                </div>
                <div className="carousel-item w-100">
                  <img src={work} className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block text-black bg-white">
                    <h5>Third slide label</h5>
                    <p>
                      Some representative placeholder content for the third
                      slide.
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div classname="pt-100px"></div>
      </div>
      <div className="text-center empresas">
        <h4>Estas son las empresas que confían en nosotros</h4>
      </div>
      <div className="text-center">
        <i class="fab fa-apple fa-2x" />
        <i class="fab fa-amazon fa-2x" />
        <i class="fab fa-google fa-2x" />
        <i class="fab fa-google-play fa-2x" />
        <i class="fab fa-ebay fa-2x" />
        <i class="fab fa-facebook fa-2x" />
        <i class="fab fa-snapchat fa-2x" />
        <i class="fab fa-cc-amex fa-2x" />
      </div>
    </div>
  );
};
