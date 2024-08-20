import React from "react";
import Tbody from "./Tbody";
import { crearFila } from "./Funciones";

//Componente que contiene la tabla del componente corporativo.

export default function Table({ body, setBody, nuevaFila, setNuevaFila, editarFila, setEditarFila, valor }) {
  return (
    <table className="">
      <thead className="">
        <tr className="bg-celeste text-center">
          <th className="rounded-tl"></th>
          <th className="text-white p-2">Id</th>
          <th className="text-white w-10">Razón Social</th>
          <th className="text-white w-6">Nombre</th>
          <th className="text-white w-10">Apellidos</th>
          <th className="text-white w-6">DNI</th>
          <th className="text-white w-10">Usuario</th>
          <th className="text-white w-6">Contraseña</th>
          <th className="text-white w-6">Membresía</th>
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
