import React from "react";
import Tbody from "./Tbody";
import { crearFila_drink } from "./funcionesDrink";
import { useAuth } from "../../../../Autenticacion/Autenticacion";

//Componente que contiene la tabla de bebidas.

export default function DrinkTable({ body_drink, setBody_drink, nuevaFila_drink, setNuevaFila_drink, editarFila_drink, setEditarFila_drink, valor_drink }) {
  const currentUser = useAuth();

  return (
    <table>
      <thead>
        <tr className="bg-celeste text-center">
          <th className="rounded-tl w-2"></th>
          <th className="text-white w-10">Bebidas</th>
          <th className="text-white w-6">Precio</th>
          <th className="rounded-tr">
            <button className="text-white border-0 bg-transparent w-6"
              type="button"
              onClick={() => crearFila_drink(nuevaFila_drink, setNuevaFila_drink, currentUser)}>+
            </button>
          </th>
        </tr>
      </thead>
      <Tbody
        body_drink={body_drink}
        setBody_drink={setBody_drink}
        nuevaFila_drink={nuevaFila_drink}
        setNuevaFila_drink={setNuevaFila_drink}
        editarFila_drink={editarFila_drink}
        setEditarFila_drink={setEditarFila_drink}
        valor_drink={valor_drink} />
    </table>
  );
}
