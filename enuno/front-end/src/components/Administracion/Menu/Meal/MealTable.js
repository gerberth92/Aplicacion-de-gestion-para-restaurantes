import React from "react";
import Tbody from "./Tbody";

//Componente que contiene la tabla de platos.

export default function MealTable() {
  return (
    <table>
      <thead className="">
        <tr className="bg-celeste text-center">
          <th className="rounded-tl"></th>
          <th className="text-white p-2">Id</th>
          <th className="text-white">Plato</th>
          <th className="text-white">Precio</th>
          <th className="rounded-tr">
            <button className="text-white border-0 bg-transparent">+</button>
          </th>
        </tr>
      </thead>
      <Tbody />
    </table>
  );
}
