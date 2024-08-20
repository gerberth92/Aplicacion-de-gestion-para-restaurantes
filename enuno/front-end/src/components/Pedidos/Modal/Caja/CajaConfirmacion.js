import React from 'react';
import Modal from 'react-modal';
import check from '../../../../assets/icons8-check-mark-50-verde.png';

/**
 * Componente CajaConfirmacion: muestra un modal con un mensaje de confirmacion.
 * @param {boolean} isOpen - Indica si el modal está abierto.
 * @param {function} onRequestClose - Función para cerrar el modal.
*/

export default function CajaConfirmacion({ isOpen, onRequestClose }) {
  const mod = {
    content: {
      width: '40%',
      height: '60%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '3px solid #38D91A',
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
      <div>
        <div>
          <img src={check}></img>
          <p className='fs-4'><strong>¡Buen trabajo!</strong></p>
          <p className='fs-5'>El pedido se envió a caja</p>
          <button className='border-0 bg-verde rounded-2 py-1 w-10 text-white'>
            Finalizar</button>
        </div>
      </div>
    </Modal>
  );
}
