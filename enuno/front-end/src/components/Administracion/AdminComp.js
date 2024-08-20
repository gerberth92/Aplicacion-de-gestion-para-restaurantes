import React, { useState } from "react";
import Modal from 'react-modal';
import mesa from '../../assets/icons8-table-50.png';
import Estado from "./Estado/Estado";
import Empleados from "./Empleados/Empleados";
import Menu from "./Menu/Menu";
import Mesa from "./Modal/Mesa";

//Componente que contiene las vistas de empleados, menu y estado.

Modal.setAppElement('#root');

export default function AdminComp() {
  const [showVentana, setShowVentana] = useState(false);
  const [showEmpleados, setShowEmpleados] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEstado, setShowEstado] = useState(true);

  return (
    <>
      <div className="d-flex position-absolute mesa">
        <button className="border-0 bg-transparent"
          onClick={() => setShowVentana(true)}>
          <img width="30" height="30" src={mesa} alt="mesa">
          </img>
        </button>
        <p className="mx-1">0</p>
      </div>
      <div className="d-flex flex-column">
        <div className="mt-5 mb-4 m-auto">
          <button className="bg-naranja border-0 rounded-2 p-2 w-10 text-white"
            onClick={() => {
              setShowMenu(true);
              setShowEstado(false);
              setShowEmpleados(false);
            }}>
            MENÚ</button>
          <button className="bg-celeste border-0 rounded-2 p-2 w-10 text-white mx-3"
            onClick={() => {
              if (!showEstado) {
                setShowEstado(true)
              }
              setShowMenu(false);
              setShowEmpleados(false);
            }}>
            ESTADO</button>
          <button className="bg-azul border-0 rounded-2 p-2 w-10 text-white"
            onClick={() => {
              setShowEmpleados(true);
              setShowMenu(false);
              setShowEstado(false)
            }}>
            EMPLEADOS</button>
        </div>
        {showEstado && <Estado />}
        {showMenu && <Menu />}
        {showEmpleados && <Empleados />}
        <Mesa
          isOpen={showVentana}
          onRequestClose={() => setShowVentana(false)} />
      </div>
    </>
  );
}
