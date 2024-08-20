import React from 'react';
import Modal from 'react-modal';

/**
 * Componente Preguntar: muestra un modal con una pregunta.
 * @param {boolean} isOpen - Indica si el modal está abierto o cerrado.
 * @param {function} onRequestClose - Función para cerrar el modal.
 * @param {function} confir - Función para abrir el modal Confirmacion.
 * @param {function} boleta - Función para abrir el modal Boleta.
*/

export default function Preguntar({ isOpen, onRequestClose, confir, boleta, bg }) {
  const mod = {
    content: {
      width: '40%',
      height: '30%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '3px solid #113D69',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      confir={confir}
      boleta={boleta}
      bg={bg}
      contentLabel="Modal"
      style={mod}>
      <p className='txt-gris my-4 fs-4'>¿Seguir con el proceso de pago?</p>
      <div className='d-flex mt-3'>
        <button
          onClick={() => {
            onRequestClose();
            confir();
            bg();
          }}
          className='border-0 bg-azul rounded-2 py-1 w-10 text-white me-3'>
          SEGUIR</button>
        <button
          onClick={() => {
            onRequestClose();
            boleta();
          }}
          className='border-0 bg-naranja rounded-2 py-1 w-10 text-white'>
          NO SEGUIR</button>
      </div>
    </Modal>
  );
}
