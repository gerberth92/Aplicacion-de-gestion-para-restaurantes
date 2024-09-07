import React, { useState, useEffect } from "react";
import Preguntar from "./Modal/Preguntar";
import Confirmacion from "./Modal/Confirmacion";
import Boleta from "./Modal/Boleta";
import Modal from 'react-modal';
import { cargarPedidos, registro_mesas } from "../Administracion/Funciones";

//Componente que contiene el cuerpo de la tabla de caja.

Modal.setAppElement('#root');

export default function Tbody() {
  const [pregunta, setPregunta] = useState(false);
  const [Confir, setConfir] = useState(false);
  const [boleta, setBoleta] = useState(false);
  const [bg, setBg] = useState('#22AAC9');

  const [body, setBody] = useState([]);
  const [mesas, setMesas] = useState([]);

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
      <tbody className="text-center">
        {body.map((item, index) => (
          <tr key={index} className="text-white border-bottom border-white"
            style={{ backgroundColor: bg }}>
            <td>{item.id}</td>
            <td>{data.find(mesa => mesa.id_mesa === item.id_mesa)?.num || 'N/A'}</td>
            <td className="w-30">
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
      <Boleta
        isOpen={boleta}
        onRequestClose={() => setBoleta(false)}
        pregunta={() => setPregunta(true)} />
      <Preguntar
        isOpen={pregunta}
        onRequestClose={() => setPregunta(false)}
        confir={() => setConfir(true)}
        boleta={() => setBoleta(true)}
        bg={() => setBg('#D2D7DC')} />
      <Confirmacion
        isOpen={Confir}
        onRequestClose={() => setConfir(false)} />
    </>
  );
}
