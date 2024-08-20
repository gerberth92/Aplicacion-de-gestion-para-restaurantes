import React from "react";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import CajaComp from "../../components/Caja/CajaComp";
import '../../assets/style.css';

//Componente que renderiza la vista de caja.

export default function CajaPage() {
  return (
    <>
      <div id="body">
        <header id="header">
          <Header />
        </header>
        <main id="main" className="d-flex justify-content-center position-relative">
          <div className="table-responsive mt-5">
            <CajaComp />
          </div>
        </main>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </>
  );
}
