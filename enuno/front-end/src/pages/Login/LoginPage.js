import React from "react";
import LoginComp from '../../components/Login/LoginComp';
import '../../assets/style.css';
import './LoginPage.css';

//Componente que renderiza la vista de login.

export default function Login() {
  return (
    <>
      <div id="body">
        <header id="header" className="bg-naranja mb-0 pt-5">
          <h1 className="text-center text-white ">ENUNO</h1>
        </header>
        <main id="main" className="login bg-naranja">
          <LoginComp />
        </main>
        <footer id="footer" className="bg-naranja pb-5">
          <p className="text-center text-white">
            Copyright © 2024 Soft by ENUNO
          </p>
        </footer>
      </div>
    </>
  );
}
