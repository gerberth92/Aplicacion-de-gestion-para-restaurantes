import React, { useEffect } from "react";
import { cargarPagina, cambios, editar, eliminar, buscar } from "./Funciones";

//Componente que contiene el cuerpo de la tabla de corporativo.

export default function Tbody({ body, setBody, nuevaFila, setNuevaFila, editarFila, setEditarFila, valor }) {
  
  let datos = [];

  if (!buscar) {
    datos = body;
  } else {
    datos = body.filter((dato) =>
      dato.razon_social.toLowerCase().includes(valor.toLowerCase())
    );
  }

  useEffect(() => {
    cargarPagina(setBody);
  }, []);

  return (
    <tbody>
      {nuevaFila && (
        <tr>
          <td></td>
          <td></td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-10"
              type="text"
              value={nuevaFila.razon_social}
              onChange={(e) => cambios(e, 'razon_social', editarFila, setEditarFila, nuevaFila, setNuevaFila)}>
            </input>
          </td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-6"
              type="text"
              value={nuevaFila.nombre}
              onChange={(e) => cambios(e, 'nombre', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
          </td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-10"
              type="text"
              value={nuevaFila.apellido}
              onChange={(e) => cambios(e, 'apellido', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
          </td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-6"
              type="text"
              value={nuevaFila.dni}
              onChange={(e) => cambios(e, 'dni', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
          </td>
          <td></td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-6"
              type="text"
              value={nuevaFila.contrasena}
              onChange={(e) => cambios(e, 'contrasena', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
          </td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-6"
              type="text"
              value={nuevaFila.membresia}
              onChange={(e) => cambios(e, 'membresia', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
          </td>
          <td></td>
        </tr>
      )}
      {datos.map((item, index) => (
        editarFila && editarFila.id === item.id ? (
          <tr key={index}>
            <td></td>
            <td></td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-10"
                type="text"
                value={editarFila.razon_social}
                onChange={(e) => cambios(e, 'razon_social', editarFila, setEditarFila, nuevaFila, setNuevaFila)}>
              </input>
            </td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-6"
                type="text"
                value={editarFila.nombre}
                onChange={(e) => cambios(e, 'nombre', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
            </td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-10"
                type="text"
                value={editarFila.apellido}
                onChange={(e) => cambios(e, 'apellido', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
            </td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-6"
                type="text"
                value={editarFila.dni}
                onChange={(e) => cambios(e, 'dni', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
            </td>
            <td></td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-6"
                type="text"
                value={editarFila.contrasena}
                onChange={(e) => cambios(e, 'contrasena', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
            </td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-6"
                type="text"
                value={editarFila.membresia}
                onChange={(e) => cambios(e, 'membresia', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
            </td>
            <td></td>
          </tr>
        ) : (
          < tr key={index} className="text-center">
            <td>
              <button className="bg-transparent border-0 my-2 opacity-25"
                type="button"
                onClick={() => eliminar(item.id, setBody)}>x</button>
            </td>
            <td>{item.id}</td>
            <td>{item.razon_social}</td>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.dni}</td>
            <td>{item.user}</td>
            <td>{item.contrasena}</td>
            <td>{item.membresia}</td>
            <td>
              <button className="bg-azul text-white border-0 rounded-3"
                onClick={() => editar(item, setEditarFila)}>
                Editar</button>
            </td>
          </tr>
        )
      ))}
    </tbody >
  );
}
