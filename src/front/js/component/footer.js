import React, { Component } from "react";

export const Footer = () => (
  <footer className="bg-dark text-center text-white">
    <div className="p-3">
      <section id="footericonos" className="mb-3">
        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
        >
          <i className="fab fa-facebook-f "></i>
        </a>

        <a
          className="btn btn-outline-light btn-floating m-1" 
          href="#!"
          role="button"
        >
          <i className="fab fa-twitter "></i>
        </a>

        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
        >
          <i className="fab fa-google"></i>
        </a>

        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
        >
          <i className="fab fa-instagram"></i>
        </a>

        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>

        <a
          className="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
        >
          <i className="fab fa-github"></i>
        </a>
     </section>
     
    </div>
    <div className="text-center bg-black p-3">
   <p>© 2022 Copyright:  Made with ❤️ by Team Colombia</p> 
    </div>
  
  </footer>
);
