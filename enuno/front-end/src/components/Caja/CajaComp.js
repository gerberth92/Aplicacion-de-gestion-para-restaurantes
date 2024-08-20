import React from "react";
import Tbody from "./Tbody";

//Componente que contiene la tabla de caja.

export default function CajaComp() {
  return (
    <>
      <table className="w-60">
        <thead className="bg-plomo txt-gris text-center">
          <tr>
            <th className="rounded-tl p-2">Pedido</th>
            <th>Mesa</th>
            <th>Opciones</th>
            <th className="rounded-tr"></th>
          </tr>
        </thead>
        <Tbody />
      </table>
    </>
  );
}
