import React, { useState } from "react";
import Table from './Table';
import Modal from 'react-modal';
import CocinaPregunta from "../Modal/Cocina/CocinaPregunta";
import CocinaConfirmacion from "../Modal/Cocina/CocinaConfirmacion";
import CajaEnvio from "../Modal/Caja/CajaEnvio";
import CajaConfirmacion from "../Modal/Caja/CajaConfirmacion";

//Componente que contiene la vista de la mesa donde se generara el pedido.

Modal.setAppElement('#root');

export default function MesaComp() {
  const [showCocinaEnvio, setShowCocinaEnvio] = useState(false);
  const [showCocinaConfir, setShowCocinaConfir] = useState(false);
  const [showBotonPagar, setShowBotonPagar] = useState(false);
  const [showCajaEnvio, setShowCajaEnvio] = useState(false);
  const [showCajaConfir, setShowCajaConfir] = useState(false);

  return (
    <>
      <div className="d-flex">
        <div className="d-flex me-auto">
          <p className="bg-celeste rounded-start p-1 text-white">
            Nro. Pedido
          </p>
          <p className="txt-gris ms-2">
            0001
          </p>
        </div>
        <button className="border-0 bg-rojo rounded-3 text-white h-32">CANCELAR</button>
      </div>
      <div className="d-flex flex-column align-items-center w-100">
        <input className="mb-3 rounded-5 p-1 border-0 bg-gris opacity-50 px-3 w-100"
          type="text"
          placeholder="Buscar">
        </input>
        <div className="table-responsive w-100">
          <Table />
        </div>
        <div className="position-absolute bottom-3rem">
          <button className="border-0 bg-azul text-white rounded-3 px-4 py-2"
            type="submit">
            HECHO
          </button>
          <button
            onClick={() => setShowCocinaEnvio(true)}
            className="border-0 bg-azul text-white rounded-3 px-4 py-2 mx-2"
            type="submit">
            ENVIAR
          </button>
          {showBotonPagar && (
            <button
            onClick={() => setShowCajaEnvio(true)}
            className="border-0 bg-azul text-white rounded-3 px-4 py-2"
            type="submit">
            PAGAR
          </button>
          )}
        </div>
      </div>
      <CocinaPregunta
        isOpen={showCocinaEnvio}
        onRequestClose={() => setShowCocinaEnvio(false)}
        confir={() => setShowCocinaConfir(true)}
        pagar={() => setShowBotonPagar(true)}
      />
      <CocinaConfirmacion
        isOpen={showCocinaConfir}
        onRequestClose={() => setShowCocinaConfir(false)}
      />
      <CajaEnvio
        isOpen={showCajaEnvio}
        onRequestClose={() => setShowCajaEnvio(false)}
        confir={() => setShowCajaConfir(true)}
      />
      <CajaConfirmacion
        isOpen={showCajaConfir}
        onRequestClose={() => setShowCajaConfir(false)}
      />
    </>
  );
}
