import React from "react";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import CocinaComp from "../../components/Cocina/CocinaComp";
import '../../assets/style.css';

//Componente que renderiza la vista de cocina.

export default function CocinaPage() {
  return (
    <>
      <div id="body">
        <header id="header">
          <Header />
        </header>
        <main id="main" className="d-flex justify-content-center position-relative">
          <div>
            <CocinaComp />
          </div>
        </main>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </>
  );
}
