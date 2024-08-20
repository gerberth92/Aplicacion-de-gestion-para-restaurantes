import React from "react";
import Tbody from "./Tbody";

//Componente que contiene la tabla de la vista de mesas.

export default function Table() {
  return (
    <table className="w-100">
      <thead>
        <tr className="bg-celeste text-center">
          <th className="rounded-tl"></th>
          <th className="text-white p-2">Cantidad</th>
          <th colSpan='2' className="text-white">Ordenes</th>
          <th className="text-white">Observaciones</th>
          <th className="rounded-tr">
            <button className="text-white border-0 bg-transparent">+</button>
          </th>
        </tr>
      </thead>
      <Tbody />
    </table>
  );
}
