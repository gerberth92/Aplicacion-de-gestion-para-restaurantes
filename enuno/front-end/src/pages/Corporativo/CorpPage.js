import React from "react"
import CorpComp from "../../components/Corporativo/CorpComp";
import '../../assets/style.css';
import { useAuth } from "../../Autenticacion/Autenticacion";

//Componente que renderiza la vista de corporativo.

export default function CorpPage() {
  const { logout } = useAuth();

  return (
    <>
      <div id="body" className="w-100">
        <header id="header" className="bg-azul py-3">
          <div className="d-flex">
            <h2 className="text-white me-auto px-5">ENUNO</h2>
            <button className="bg-transparent text-white border-0 px-5"
              onClick={() => logout()}>
            Logout</button>
          </div>
        </header>
        <main id="main" className="d-flex justify-content-center">
          <div className="position-relative my-5">
            <CorpComp />
          </div>
        </main>
        <footer id="footer" className="bg-azul pt-3 pb-2">
          <p className="text-center text-white">
            Copyright © 2024 Soft by ENUNO
          </p>
        </footer>
      </div>
    </>
  );
}
