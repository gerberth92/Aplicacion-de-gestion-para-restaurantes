import React, { useEffect } from "react";
import { cargarMeal, cambios_meal, editar_meal, eliminar_meal, buscar_meal } from "./funcionesMeal";

//Componente que contiene el cuerpo de la table de bebidas.

export default function Tbody({ body_meal, setBody_meal, nuevaFila_meal, setNuevaFila_meal, editarFila_meal, setEditarFila_meal, valor_meal }) {
  let datos = [];

  if (!buscar_meal) {
    datos = body_meal;
    datos.map((item) => {
      console.log(item)
    })
  } else {
    datos = body_meal.filter((dato) =>
      dato.nombre.toLowerCase().includes(valor_meal.toLowerCase())
    );
  }

  useEffect(() => {
    cargarMeal(setBody_meal);
  }, []);

  return (
    <tbody className="text-center">
      {nuevaFila_meal && (
        <tr>
          <td></td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-10"
              type="text"
              value={nuevaFila_meal.nombre}
              onChange={(e) => cambios_meal(e, 'nombre', editarFila_meal, setEditarFila_meal, nuevaFila_meal, setNuevaFila_meal)}></input>
          </td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-6"
              type="text"
              value={nuevaFila_meal.precio}
              onChange={(e) => cambios_meal(e, 'precio', editarFila_meal, setEditarFila_meal, nuevaFila_meal, setNuevaFila_meal)}></input>
          </td>
          <td></td>
        </tr>
      )}
      {datos.map((item, index) => (
        editarFila_meal && editarFila_meal.id === item.id ? (
          <tr key={index}>
            <td></td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-10"
                type="text"
                value={editarFila_meal.nombre}
                onChange={(e) => cambios_meal(e, 'nombre', editarFila_meal, setEditarFila_meal, nuevaFila_meal, setNuevaFila_meal)}></input>
            </td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-6"
                type="text"
                value={editarFila_meal.precio}
                onChange={(e) => cambios_meal(e, 'precio', editarFila_meal, setEditarFila_meal, nuevaFila_meal, setNuevaFila_meal)}></input>
            </td>
            <td></td>
          </tr>
        ) : (
          <tr key={index}>
            <td>
              <button className="bg-transparent border-0 my-2 opacity-25"
                type="button"
                onClick={() => eliminar_meal(item.id, setBody_meal)}>x
              </button>
            </td>
            <td>{item.nombre}</td>
            <td>{item.precio}</td>
            <td>
              <button className="bg-azul text-white border-0 rounded-3"
                onClick={() => editar_meal(item, setEditarFila_meal)}>
                Editar</button>
            </td>
          </tr>
        )
      ))}
    </tbody>
  );
}
