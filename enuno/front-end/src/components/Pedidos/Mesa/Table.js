import React from "react";
import Tbody from "./Tbody";
import { crearFila } from "./Funciones";

//Componente que contiene la tabla de la vista de mesas.

export default function Table({ body, setBody, nuevaFila, setNuevaFila, editarFila, setEditarFila }) {
  return (
    <table>
      <thead>
        <tr className="bg-celeste text-center">
          <th className="rounded-tl w-2"></th>
          <th className="text-white p-2 w-3rem">Cantidad</th>
          <th colSpan='2' className="text-white w-20">Ordenes</th>
          <th className="text-white w-10">Observaciones</th>
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
        setEditarFila={setEditarFila} />
    </table>
  );
}
