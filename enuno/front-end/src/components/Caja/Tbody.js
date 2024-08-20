import React, { useState } from "react";
import Preguntar from "./Modal/Preguntar";
import Confirmacion from "./Modal/Confirmacion";
import Boleta from "./Modal/Boleta";
import Modal from 'react-modal';

//Componente que contiene el cuerpo de la tabla de caja.

Modal.setAppElement('#root');

export default function Tbody() {
  const [pregunta, setPregunta] = useState(false);
  const [Confir, setConfir] = useState(false);
  const [boleta, setBoleta] = useState(false);
  const [bg, setBg] = useState('#22AAC9');

  return (
    <>
      <tbody className="text-center">
        <tr className="text-white"
          style={{ backgroundColor:bg }}>
          <td>0001</td>
          <td>M07</td>
          <td className="w-30">
            <button className="border-0 bg-azul text-white px-4 py-1 rounded my-2 w-6"
              onClick={() => setBoleta(true)}>
              Ver</button>
          </td>
          <td>D</td>
        </tr>
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
