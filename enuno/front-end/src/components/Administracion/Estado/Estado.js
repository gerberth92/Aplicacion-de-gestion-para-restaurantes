import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import Boleta from "../Modal/Boleta";
import { registro_mesas, cargarPedidos } from "../Funciones";

//Componente que contiene la informacion de los pedidos.

Modal.setAppElement('#root');

export default function Estado({ setMesas, mesas }) {
  const [boleta, setBoleta] = useState(false);
  const [body, setBody] = useState([]);

  let numero = 0;
  let data = [];

  function formatNumero(numero) {
    return (numero.toString().padStart(2, '0'));
  }

  data = mesas.map((mesa) => ({
    ...mesa,
    num: formatNumero(numero += 1)
  }));

  useEffect(() => {
    registro_mesas(setMesas);
    cargarPedidos(setBody);
  }, [])

  function pedido(id_pedido, id_usuario, mesa, id_mesa) {
    localStorage.setItem('id_pedido', id_pedido);
    localStorage.setItem('id_usuario', id_usuario);
    localStorage.setItem('mesa', mesa);
    localStorage.setItem('id_mesa', id_mesa);
  }

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
            {body.map((item, index) => (
              <tr key={index} className="bg-celeste text-white border-bottom border-white">
                <td>{item.id}</td>
                <td>
                  {data.find(mesa => mesa.id_mesa === item.id_mesa)?.num || 'N/A'}
                </td>
                <td>
                  <button className="border-0 bg-azul text-white px-4 py-1 rounded my-2 w-6"
                    onClick={() => {
                      const mesaSeleccionada = data.find(mesa => mesa.id_mesa === item.id_mesa);
                      setBoleta(true);
                      pedido(item.id, item.id_usuario, mesaSeleccionada?.num || 'N/A', item.id_mesa);
                      }}>
                    Ver</button>
                </td>
                <td>D</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Boleta
        isOpen={boleta}
        onRequestClose={() => setBoleta(false)} />
    </>
  );
}
