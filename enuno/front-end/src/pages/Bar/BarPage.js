import React from "react";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import BarComp from "../../components/Bar/BarComp";
import '../../assets/style.css';

//Componente que renderiza la vista de bar.

export default function BarPage() {
  return (
    <>
      <div id="body">
        <header id="header">
          <Header />
        </header>
        <main id="main" className="d-flex justify-content-center position-relative">
          <div>
            <BarComp />
          </div>
        </main>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </>
  );
}
