import React from "react";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer";
import PedidosComp from "../../components/Pedidos/PedidosComp";
import '../../assets/style.css';

//Componente que renderiza la vista de pedidos.

export default function PedidosPage() {
  return (
    <>
      <div id="body">
        <header id="header">
          <Header />
        </header>
        <main id="main" className="d-flex justify-content-center position-relative">
          <div className="m-auto">
            <PedidosComp />
          </div>
        </main>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </>
  );
}
