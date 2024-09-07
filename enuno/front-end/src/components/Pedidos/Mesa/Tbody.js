import React, { useEffect, useState } from "react";
import { platos_bebidas, cargarPagina, cambios, editar, eliminar } from "./Funciones";

//Componente que contiene el cuerpo de la tabla de la vista mesas.

export default function Tbody({ body, setBody, nuevaFila, setNuevaFila, editarFila, setEditarFila }) {
  const [platos, setPlatos] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    cargarPagina(setBody);
    platos_bebidas(setPlatos, setBebidas);
  }, []);

  return (
    <tbody className="text-center">
      {nuevaFila && (
        <tr>
          <td></td>
          <td>
            <input className="w-3rem rounded-3 border-gris border border-2"
              type="text"
              value={nuevaFila.cantidad}
              onChange={(e) => cambios(e, 'cantidad', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
          </td>
          <td>
            <select className="rounded-3 border border-2 border-gris w-10"
              onChange={(e) => cambios(e, 'alimento', editarFila, setEditarFila, nuevaFila, setNuevaFila)}>
              <option>Platos</option>
              {platos.map((plato, index) => (
                <option key={index} value={`${plato.nombre},${plato.precio}`}>{plato.nombre}</option>
              ))}
            </select>
          </td>
          <td>
            <select className="rounded-3 border border-2 border-gris w-10"
              onChange={(e) => cambios(e, 'bebida', editarFila, setEditarFila, nuevaFila, setNuevaFila)}>
              <option>Bebidas</option>
              {bebidas.map((bebida, index) => (
                <option key={index} value={`${bebida.nombre},${bebida.precio}`}>
                  {bebida.nombre}</option>
              ))}
            </select>
          </td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-10"
              type="text"></input>
          </td>
          <td></td>
        </tr>
      )}
      {body.map((item, index) => (
        editarFila && editarFila.id === item.id ? (
          <tr key={index}>
            <td></td>
            <td>
              <input className="w-3rem rounded-3 border-gris border border-2"
                type="text"
                value={editarFila.cantidad}
                onChange={(e) => cambios(e, 'cantidad', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
            </td>
            <td>
              <select className="rounded-3 border border-2 border-gris w-10"
                onChange={(e) => cambios(e, 'alimentos', editarFila, setEditarFila, nuevaFila, setNuevaFila)}>
                <option>Platos</option>
                {platos.map((plato, index) => (
                  <option key={index} value={`${plato.nombre},${plato.precio}`}>{plato.nombre}</option>
                ))}
              </select>
            </td>
            <td>
              <select className="rounded-3 border border-2 border-gris w-10"
                onChange={(e) => cambios(e, 'bebidas', editarFila, setEditarFila, nuevaFila, setNuevaFila)}>
                <option>Bebidas</option>
                {bebidas.map((bebida, index) => (
                  <option key={index} value={`${bebida.nombre},${bebida.precio}`}>
                    {bebida.nombre}</option>
                ))}
              </select>
            </td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-10"
                type="text"></input>
            </td>
            <td></td>
          </tr>
        ) : (
          <tr key={index} className="text-center">
            <td>
              <button className="bg-transparent border-0 my-2 opacity-25"
                type="button"
                onClick={() => eliminar(item.id, setBody)}>x</button>
            </td>
            <td>{item.cantidad}</td>
            <td>{item.alimento}</td>
            <td>{item.bebida}</td>
            <td></td>
            <td>
              <button className="bg-azul text-white border-0 rounded-3"
                onClick={() => editar(item, setEditarFila)}>
                Editar</button>
            </td>
          </tr>
        )
      ))}
    </tbody>
  );
}
