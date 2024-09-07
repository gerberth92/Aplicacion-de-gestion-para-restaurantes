import React from "react";
import Tbody from "./Tbody";
import { crearFila } from "../Funciones";

//Componente para contiene la tabla de los empleados.

export default function Table({ body, setBody, nuevaFila, setNuevaFila, editarFila, setEditarFila, valor }) {
  return (
    <table>
      <thead>
        <tr className="bg-celeste text-center">
          <th className="rounded-tl"></th>
          <th className="text-white p-2">Id</th>
          <th className="text-white w-6">Nombre</th>
          <th className="text-white w-6">Apellido</th>
          <th className="text-white w-6">DNI</th>
          <th className="text-white w-6">Puesto</th>
          <th className="text-white w-10">Usuario</th>
          <th className="text-white w-6">Contraseña</th>
          <th className="rounded-tr">
            <button className="text-white border-0 bg-transparent"
              type="button"
              onClick={() => crearFila(nuevaFila, setNuevaFila)}>+</button>
          </th>
        </tr>
      </thead>
      <Tbody
        body={body}
        setBody={setBody}
        nuevaFila={nuevaFila}
        setNuevaFila={setNuevaFila}
        editarFila={editarFila}
        setEditarFila={setEditarFila}
        valor={valor} />
    </table>
  );
}
