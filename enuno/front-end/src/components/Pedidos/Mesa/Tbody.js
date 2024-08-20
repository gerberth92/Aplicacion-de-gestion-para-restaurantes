import React, { useEffect, useState } from "react";
import axios from "axios";

//Componente que contiene el cuerpo de la tabla de la vista mesas.

export default function Tbody() {
  const [platos, setPlatos] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    async function info() {
      try {
        const [responseP, responseB] = await Promise.all([
          axios.get('url_platos'),
          axios.get('url_bebidas')
        ]);

        setPlatos(responseP.platos);
        setBebidas(responseB.bebidas);
      } catch (error) {
        console.error('Error', error);
      }
    }
    info();
  }, []);

  return (
    <tbody>
      <tr>
        <td>
          <button className="bg-transparent border-0 my-2 opacity-25"
            type="reset">x</button>
        </td>
        <td className="text-center">01</td>
        <td>
          <select className="rounded-3 border border-2 border-gris w-10"
            type="text">
            {platos.map((plato, index) => (
              <option key={index} value={plato.nombre}>{plato.nombre}</option>
            ))}
          </select>
        </td>
        <td>
          <select className="rounded-3 border border-2 border-gris w-10"
            type="text">
            {bebidas.map((bebida, index) => (
              <option key={index} value={bebida.nombre}>{bebida.nombre}</option>
            ))}
          </select>
        </td>
        <td>
          <input className="rounded-3 border border-2 border-gris"
            type="text"></input>
        </td>
        <td>
          <button className="bg-azul text-white border-0 rounded-3">
            Editar</button>
        </td>
      </tr>
    </tbody>
  );
}
