import React, { useState, useEffect } from "react";
import axios from "axios";

//Componente que contiene el cuerpo de la tabla de cocina.

export default function Tbody() {
  const [body, setBody] = useState([])

  useEffect(() => {
    axios.get('url')
      .then(response => setBody([response.data]))
      .catch(error => console.error('error', error));
  }, []);

  return (
    <tbody>
      {body.map((item, index) => (
        <React.Fragment key={index}>
          <tr className="bg-celeste text-white text-center">
            <td>{item.pedido}</td>
            <td>{item.mesa}</td>
            <td>{item.cantidad}</td>
            <td>{item.orden}</td>
            <td>
              <button className="border-0 bg-white t-celeste px-4 py-1 rounded my-2">
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
      ))}
    </tbody>
  );
}
