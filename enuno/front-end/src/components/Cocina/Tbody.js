import React, { useState, useEffect } from "react";
import instance from "../../conexion";

//Componente que contiene el cuerpo de la tabla de cocina.

export default function Tbody() {
  const [body, setBody] = useState([]);
  const [color, setColor] = useState({});
  const [mesas, setMesas] = useState([]);

  async function cargarPagina() {
    try {
      const id_rest = JSON.parse(localStorage.getItem('currentUser')).id_restaurante;
      const response = await instance.get(`ordenes/?id_rest=${id_rest}&modulo=cocina`)
      setBody(response.data);
    } catch (error) {
      console.error('Error al obtener las ordenes', error);
    }
  }

  async function cargarMesas() {
    try {
      const response = await instance.get(`mesas/?id_rest=${JSON.parse(localStorage.getItem('currentUser')).id_restaurante}`);
      let numero = 0;
      function formatNumero(numero) {
        return (numero.toString().padStart(2, '0'));
      }
      setMesas(response.data.map((mesa, index) => ({
        ...mesa,
        num: formatNumero(numero += 1)
      })));
    } catch (error) {
      console.error('Error al obtener las mesas', error);
    }
  }

  useEffect(() => {
    cargarPagina();
    cargarMesas();
  }, []);

  async function cambiarColor(id) {
    setColor(prev => ({
      ...prev,
      [id]: 'bg-verde'
    }));

    const data = {estado: 'terminado'};

    try {
      await instance.patch(`ordenes/${id}/`, data)
    } catch (error) {
      console.error('Error al actualizar la orden', error);
    }

    setTimeout(() => {
      cargarPagina();
    }, 3000);
  }

  return (
    <tbody>
      {body.map((item, index) => (
        item.estado === 'preparando' && (
          <React.Fragment key={index}>
            <tr className={`text-white text-center ${color[item.id] || 'bg-celeste'}`}>
              <td>{item.alimento}</td>
              <td>{item.cantidad}</td>
              <td>
                {mesas.find(mesa => mesa.id_mesa === item.id_mesa)?.num || 'N/A'}
              </td>
              <td>
                <button className="border-0 bg-white t-celeste px-4 py-1 rounded my-2"
                  onClick={() => cambiarColor(item.id)}>
                  Listo</button>
              </td>
            </tr>
            {item.observaciones !== null && (
              <tr className="bg-plomo">
                <td className="ps-4"
                  colSpan={4}>{item.observaciones}</td>
              </tr>
            )}
          </React.Fragment>
        )
      ))}
    </tbody>
  );
}
