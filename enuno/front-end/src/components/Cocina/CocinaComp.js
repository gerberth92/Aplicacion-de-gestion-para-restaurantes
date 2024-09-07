import React from "react";
import Tbody from "./Tbody";

//Componente que contiene la tabla de cocina.

export default function CocinaComp() {
  return(
    <table className="w-60 mt-5">
        <thead className="bg-plomo txt-gris text-center">
          <tr>
            <th className="rounded-tl p-2">Orden</th>
            <th>Cantidad</th>
            <th>Mesa</th>
            <th className="rounded-tr">Estado</th>
          </tr>
        </thead>
        <Tbody />
      </table>
  );
}
