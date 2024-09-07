import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import instance from "../../../conexion";

/**
 * Componente Boleta: muestra un modal con detalles de una boleta.
 * @param {boolean} isOpen - Indica si el modal está abierto.
 * @param {function} onRequestClose - Función para cerrar el modal.
 * @param {function} pagar - Función para procesar el pago.
*/

export default function Boleta({ isOpen, onRequestClose, pregunta }) {
  const [body, setBody] = useState([]);

  const id_pedido = localStorage.getItem('id_pedido');
  const id_usuario = localStorage.getItem('id_usuario');
  const mesa = localStorage.getItem('mesa');

  const mod = {
    content: {
      width: '65%',
      height: '80%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      color: '#113D69',
      position: 'absolute',
    },
  };

  useEffect(() => {
    if (isOpen) {
      (async function ordenes() {
        try {
          const id_pedido = localStorage.getItem('id_pedido');
          const id_mesa = localStorage.getItem('id_mesa');
          const response = await instance.get(`ordenes/?id_pedido=${id_pedido}&id_mesa=${id_mesa}`);

          setBody(response.data);
        } catch (error) {
          console.error('Error al cargar ordenes', error);
        }
      })();
    }
  }, [isOpen]);

  const total = body.reduce((sum, item) => sum + parseFloat(item.precio) * item.cantidad, 0).toFixed(2);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={mod}
      pregunta={pregunta}>
      <table>
        <tbody>
          <tr className="text-center d-flex justify-content-between">
            <td className="bg-celeste rounded-start text-white w-10 py-1">Encargado</td>
            <td className="ps-2">{id_usuario}</td>
            <td className="bg-celeste rounded-start text-white w-10 py-1">Nro. Pedido</td>
            <td className="ps-2">{id_pedido}</td>
            <td className="bg-celeste rounded-start text-white w-10 py-1">Mesa</td>
            <td className="ps-2">{mesa}</td>
          </tr>
        </tbody>
      </table>
      <table className="w-100 my-2 txt-gris position-relative">
        <thead>
          <tr className="bg-plomo">
            <td className="rounded-tl ps-2">Cantidad</td>
            <td className="ps-2">Orden</td>
            <td className="rounded-tr w-10 ps-2">Precio</td>
          </tr>
        </thead>
        <tbody>
          {body.map((item, index) => (
            <tr key={index}>
              <td>{item.cantidad}</td>
              <td>{item.alimento || item.bebida}</td>
              <td>{(parseFloat(item.precio) * item.cantidad).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-100 mt-auto">
        <tbody>
          <tr className="bg-plomo txt-gris">
            <td className="ps-2"
              style={{ borderBottomLeftRadius: '10px' }}
              colSpan={2}>Total</td>
            <td style={{ borderBottomRightRadius: '10px' }}
              className="w-10 ps-2">{total}</td>
          </tr>
          <tr>
            <td className="w-10">
              <button className="border-0 bg-azul text-white rounded-2 w-10 py-2 mt-2"
                onClick={() => {
                  onRequestClose();
                  pregunta();
                }}>
                Pagar</button>
            </td>
            <td className="ps-2 txt-gris">S/.{total}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
}
