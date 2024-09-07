import React, { useEffect } from "react";
import { cargarBebidas, cambios_drink, editar_drink, eliminar_drink, buscar_drink } from "./funcionesDrink";

//Componente que contiene el cuerpo de la table de bebidas.

export default function Tbody({ body_drink, setBody_drink, nuevaFila_drink, setNuevaFila_drink, editarFila_drink, setEditarFila_drink, valor_drink }) {
  let datos = [];

  if (!buscar_drink) {
    datos = body_drink;
  } else {
    datos = body_drink.filter((dato) =>
      dato.nombre.toLowerCase().includes(valor_drink.toLowerCase())
    );
  }

  useEffect(() => {
    cargarBebidas(setBody_drink);
  }, []);

  return (
    <tbody className="text-center">
      {nuevaFila_drink && (
        <tr>
          <td></td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-10"
              type="text"
              value={nuevaFila_drink.nombre}
              onChange={(e) => cambios_drink(e, 'nombre', editarFila_drink, setEditarFila_drink, nuevaFila_drink, setNuevaFila_drink)}></input>
          </td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-6"
              type="text"
              value={nuevaFila_drink.precio}
              onChange={(e) => cambios_drink(e, 'precio', editarFila_drink, setEditarFila_drink, nuevaFila_drink, setNuevaFila_drink)}></input>
          </td>
          <td></td>
        </tr>
      )}
      {datos.map((item, index) => (
        editarFila_drink && editarFila_drink.id === item.id ? (
          <tr key={index}>
            <td></td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-10"
                type="text"
                value={editarFila_drink.nombre}
                onChange={(e) => cambios_drink(e, 'nombre', editarFila_drink, setEditarFila_drink, nuevaFila_drink, setNuevaFila_drink)}></input>
            </td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-6"
                type="text"
                value={editarFila_drink.precio}
                onChange={(e) => cambios_drink(e, 'precio', editarFila_drink, setEditarFila_drink, nuevaFila_drink, setNuevaFila_drink)}></input>
            </td>
            <td></td>
          </tr>
        ) : (
          <tr key={index}>
            <td>
              <button className="bg-transparent border-0 my-2 opacity-25"
                type="button"
                onClick={() => eliminar_drink(item.id, setBody_drink)}>x
              </button>
            </td>
            <td>{item.nombre}</td>
            <td>{item.precio}</td>
            <td>
              <button className="bg-azul text-white border-0 rounded-3"
                onClick={() => editar_drink(item, setEditarFila_drink)}>
                Editar</button>
            </td>
          </tr>
        )
      ))}
    </tbody>
  );
}
