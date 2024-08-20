import React from "react";
import Tbody from "./Tbody";

//Componente para contiene la tabla de los empleados.

export default function Table() {
  return (
    <table>
      <thead className="">
        <tr className="bg-celeste text-center">
          <th className="rounded-tl"></th>
          <th className="text-white p-2">Id</th>
          <th className="text-white">Nombre</th>
          <th className="text-white">Apellidos</th>
          <th className="text-white">DNI</th>
          <th className="text-white">Puesto</th>
          <th className="text-white">Usuario</th>
          <th className="text-white">Contraseña</th>
          <th className="rounded-tr">
            <button className="text-white border-0 bg-transparent">+</button>
          </th>
        </tr>
      </thead>
      <Tbody />
    </table>
  );
}
