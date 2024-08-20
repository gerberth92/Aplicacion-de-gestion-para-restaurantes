import React from "react";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import MesaComp from "../../components/Pedidos/Mesa/MesaComp";
import '../../assets/style.css';

//Componente que renderiza la vista de mesas para hacer pedidos.

export default function MesaPage() {
  return (
    <>
      <div id="body">
        <header id="header">
          <Header />
        </header>
        <main id="main" className="d-flex justify-content-center position-relative">
          <div className="mt-4">
            <MesaComp />
          </div>
        </main>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </>
  );
}
