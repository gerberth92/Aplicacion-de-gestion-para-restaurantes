import React, { useState } from "react";
import Modal from 'react-modal';
import Boleta from "../Modal/Boleta";

//Componente que contiene la informacion de los pedidos.

Modal.setAppElement('#root');

export default function Estado() {
  const [boleta, setBoleta] = useState(false);

  return (
    <>
      <div className="table-responsive">
        <table className="w-60">
          <thead className="bg-plomo txt-gris text-center">
            <tr>
              <th className="rounded-tl p-2">Pedido</th>
              <th>Mesa</th>
              <th>Opciones</th>
              <th className="rounded-tr"></th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className="bg-celeste text-white">
              <td>0001</td>
              <td>M07</td>
              <td>
                <button className="border-0 bg-azul text-white px-4 py-1 rounded my-2 w-6"
                  onClick={() => setBoleta(true)}>
                  Ver</button>
              </td>
              <td>D</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Boleta
        isOpen={boleta}
        onRequestClose={() => setBoleta(false)} />
    </>
  );
}
