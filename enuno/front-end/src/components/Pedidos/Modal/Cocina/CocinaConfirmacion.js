import React from 'react';
import Modal from 'react-modal';
import check from '../../../../assets/icons8-check-mark-50.png';

/**
 * Componente Confirmacion: muestra un modal con un mensaje de confirmacion.
 * @param {boolean} isOpen - Indica si el modal está abierto.
 * @param {function} onRequestClose - Función para cerrar el modal.
*/

export default function Confirmacion({ isOpen, onRequestClose }) {
  const mod = {
    content: {
      width: '40%',
      height: '30%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '3px solid #E67D13',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#113D69',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      style={mod}>
      <img src={check}></img>
      <p className='fs-4'><strong>¡Muy bien!</strong></p>
      <p className='fs-5'>El pedido se envió a cocina</p>
    </Modal>
  );
}
