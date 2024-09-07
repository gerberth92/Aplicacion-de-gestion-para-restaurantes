import React, { useState } from 'react';
import Modal from 'react-modal';
import mesa from '../../../assets/icons8-table-50.png';
import instance from '../../../conexion';
import { useAuth } from '../../../Autenticacion/Autenticacion';
import { registro_mesas } from '../Funciones';

/**
 * Componente Mesa: muestra un modal para agregar el numero de mesas.
 * @param {boolean} isOpen - Indica si el modal está abierto.
 * @param {function} onRequestClose - Función para cerrar el modal.
*/

export default function Mesa({ isOpen, onRequestClose, setMesas }) {
  const [cantidad, setCantidad] = useState(0);
  const currentUser = useAuth();

  const mod = {
    content: {
      width: '23%',
      height: '60%',
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

  async function post_mesa(e) {
    e.preventDefault();

    try {
      const data = {
        'cantidad': cantidad,
        "id_restaurante": currentUser.currentUser.id_restaurante
      };
  
      await instance.post('mesas/', data)
      close();
    } catch (error) {
      console.error("Error al registrar", error)
    }
  }

  const valor = (e) => {
    setCantidad(e.target.value);
  }

  const close = () => {
    onRequestClose();
    registro_mesas(setMesas);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      style={mod}>
      <img width='125' height='150' src={mesa} alt='mesa'></img>
      <p className='txt-gris my-4'>CANTIDAD</p>
      <form className='d-flex flex-column'
        onSubmit={post_mesa}>
        <input className='border-top-0 border-end-0 border-start-0 w-3rem'
          value={cantidad}
          onChange={(e) => valor(e)}></input>
        <button className='border-0 bg-azul rounded-2 py-1 px-3 text-white mt-5'
          type='submit'>
          OK</button>
      </form>
    </Modal>
  );
}
