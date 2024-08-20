import React from "react";

//Componente que contiene el cuerpo de la tabla de empleados.

export default function Tbody() {
  return (
    <tbody>
      <tr>
        <td>
          <button className="bg-transparent border-0 my-2 opacity-25"
            type="reset">x</button>
        </td>
        <td>01</td>
        <td>
          <input className="rounded-3 border border-2 border-gris"
            type="text"></input>
        </td>
        <td>
          <input className="rounded-3 border border-2 border-gris"
            type="text"></input>
        </td>
        <td>
          <input className="rounded-3 border border-2 border-gris"
            type="text"></input>
        </td>
        <td>
          <input className="rounded-3 border border-2 border-gris"
            type="text"></input>
        </td>
        <td>
          <input className="rounded-3 border border-2 border-gris"
            type="text"></input>
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
