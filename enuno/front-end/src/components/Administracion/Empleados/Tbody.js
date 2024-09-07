import React, { useEffect, useState } from "react";
import { cargarEmpleados, cambios, editar, eliminar, buscar, cargarRoles } from "../Funciones";

//Componente que contiene el cuerpo de la tabla de empleados.

export default function Tbody({ body, setBody, nuevaFila, setNuevaFila, editarFila, setEditarFila, valor }) {
  const [roles, setRoles] = useState([]);

  let datos = [];

  if (!buscar) {
    datos = body;
  } else {
    datos = body.filter((dato) =>
      dato.nombre.toLowerCase().includes(valor.toLowerCase())
    );
  }

  useEffect(() => {
    cargarEmpleados(setBody);
    cargarRoles(setRoles);
  }, []);

  return (
    <tbody>
      {nuevaFila && (
        <tr>
          <td></td>
          <td></td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-6"
              type="text"
              value={nuevaFila.nombre}
              onChange={(e) => cambios(e, 'nombre', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
          </td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-6"
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
          <td>
            <select className="w-6 text-center rounded-3"
              onChange={(e) => cambios(e, 'puesto', editarFila, setEditarFila, nuevaFila, setNuevaFila)}>
              <option>Selecciona</option>
              {roles.map((item, index) => (
                <option key={index}
                  value={item.cargo}>{item.cargo}</option>
              ))}
            </select>
          </td>
          <td></td>
          <td>
            <input className="rounded-3 border border-2 border-gris w-6"
              type="text"
              value={nuevaFila.cont}
              onChange={(e) => cambios(e, 'cont', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
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
              <input className="rounded-3 border border-2 border-gris w-6"
                type="text"
                value={editarFila.nombre}
                onChange={(e) => cambios(e, 'nombre', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
            </td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-6"
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
            <td>
              <select className="w-6 text-center rounded-3"
                onChange={(e) => cambios(e, 'puesto', editarFila, setEditarFila, nuevaFila, setNuevaFila)}>
                <option>Selecciona</option>
                {roles.map((item, index) => (
                <option key={index}
                  value={item.cargo}>{item.cargo}</option>
                ))}
              </select>
            </td>
            <td></td>
            <td>
              <input className="rounded-3 border border-2 border-gris w-6"
                type="text"
                value={editarFila.cont}
                onChange={(e) => cambios(e, 'cont', editarFila, setEditarFila, nuevaFila, setNuevaFila)}></input>
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
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.dni}</td>
            <td>{item.puesto}</td>
            <td>{item.user}</td>
            <td>{item.cont}</td>
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
