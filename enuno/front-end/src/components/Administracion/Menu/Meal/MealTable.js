import React from "react";
import Tbody from "./Tbody";
import { crearFila_meal } from "./funcionesMeal";

//Componente que contiene la tabla de bebidas.

export default function MealTable({ body_meal, setBody_meal, nuevaFila_meal, setNuevaFila_meal, editarFila_meal, setEditarFila_meal, valor_meal }) {
  return (
    <table>
      <thead>
        <tr className="bg-celeste text-center">
          <th className="rounded-tl w-2"></th>
          <th className="text-white w-10">Alimentos</th>
          <th className="text-white w-6">Precio</th>
          <th className="rounded-tr">
            <button className="text-white border-0 bg-transparent w-6"
              type="button"
              onClick={() => crearFila_meal(nuevaFila_meal, setNuevaFila_meal)}>+
            </button>
          </th>
        </tr>
      </thead>
      <Tbody
        body_meal={body_meal}
        setBody_meal={setBody_meal}
        nuevaFila_meal={nuevaFila_meal}
        setNuevaFila_meal={setNuevaFila_meal}
        editarFila_meal={editarFila_meal}
        setEditarFila_meal={setEditarFila_meal}
        valor_meal={valor_meal} />
    </table>
  );
}
