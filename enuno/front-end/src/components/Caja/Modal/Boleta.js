import React from "react";
import Modal from 'react-modal';

/**
 * Componente Boleta: muestra un modal con detalles de una boleta.
 * @param {boolean} isOpen - Indica si el modal está abierto.
 * @param {function} onRequestClose - Función para cerrar el modal.
 * @param {function} pagar - Función para procesar el pago.
*/

export default function Boleta({ isOpen, onRequestClose, pregunta }) {
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={mod}
      pregunta={pregunta}>
      <tr className="text-center d-flex justify-content-between">
        <div>
          <td className="bg-celeste rounded-start text-white w-10 py-1">Encargado</td>
          <td className="ps-2">asdasdas</td>
        </div>
        <div>
          <td className="bg-celeste rounded-start text-white w-10 py-1">Nro. Pedido</td>
          <td className="ps-2">asdasdas</td>
        </div>
        <div>
          <td className="bg-celeste rounded-start text-white w-10 py-1">Mesa</td>
          <td className="ps-2">adasdas</td>
        </div>
      </tr>
      <table className="w-100 my-2 txt-gris position-relative">
        <thead>
          <tr className="bg-plomo">
            <td className="rounded-tl ps-2">Cantidad</td>
            <td className="ps-2">Orden</td>
            <td className="rounded-tr w-10 ps-2">Precio</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table className="w-100 mt-auto">
        <tr className="bg-plomo txt-gris">
          <td className="ps-2"
            style={{ borderBottomLeftRadius: '10px' }}
            colSpan={2}>Total</td>
          <td style={{ borderBottomRightRadius: '10px' }}
            className="w-10 ps-2">asd</td>
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
          <td className="ps-2 txt-gris">S/.</td>
        </tr>
      </table>
    </Modal>
  );
}
