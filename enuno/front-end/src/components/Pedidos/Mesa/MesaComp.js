import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from './Table';
import Modal from 'react-modal';
import CocinaConfirmacion from "../Modal/Cocina/CocinaConfirmacion";
import CajaEnvio from "../Modal/Caja/CajaEnvio";
import CajaConfirmacion from "../Modal/Caja/CajaConfirmacion";
import menorque from '../../../assets/menor-que.png';
import instance from "../../../conexion";
import { useAuth } from "../../../Autenticacion/Autenticacion";
import { handleSubmit } from "./Funciones";

//Componente que contiene la vista de la mesa donde se generara el pedido.

Modal.setAppElement('#root');

export default function MesaComp() {
  const [showCocinaConfir, setShowCocinaConfir] = useState(false);
  const [showBotonPagar, setShowBotonPagar] = useState(false);
  const [showCajaEnvio, setShowCajaEnvio] = useState(false);
  const [showCajaConfir, setShowCajaConfir] = useState(false);

  const [nuevaFila, setNuevaFila] = useState(null);
  const [editarFila, setEditarFila] = useState(null);
  const [body, setBody] = useState([]);
  const [estado, setEstado] = useState(true);
  const [boton, setBoton] = useState(true);

  const navigate = useNavigate();
  const currentUser = useAuth();
  const id_mesa = localStorage.getItem('id_mesa');

  let numero = localStorage.getItem('id_pedido').toString().padStart(4, '0');

  useEffect(() => {
    if (body.length !== 0) {
      setBoton(false);
      setEstado(false);
      setShowBotonPagar(true);
    }
  }, [body])


  async function disponible() {
    if (boton) {
      try {
        const data = {
          estado_enum_ocupada_disponible_field: 'disponible',
          id_restaurante: currentUser.currentUser.id_restaurante,
          id_mozo: null
        };

        await instance.put(`mesas/${id_mesa}/`, data)
        navigate('/pedidos');
      } catch (error) {
        console.error('Error', error);
      }
    } else {
      navigate('/pedidos');
    }
  }

  return (
    <>
      <div className="d-flex">
        <div className="d-flex me-auto">
          <p className="bg-celeste rounded-start p-1 text-white">
            Nro. Pedido
          </p>
          <p className="txt-gris ms-2">
            {numero === 'null' ? ('0000') : numero}
          </p>
        </div>
        <button className="border-0 bg-rojo rounded-3 text-white h-32">CANCELAR</button>
      </div>
      <form className="d-flex flex-column align-items-center w-100"
        onSubmit={(e) => handleSubmit(e, nuevaFila, setNuevaFila, editarFila, setEditarFila, setBody, estado, setEstado, body)}>
        <div className="table-responsive w-100">
          <Table
            nuevaFila={nuevaFila}
            setNuevaFila={setNuevaFila}
            editarFila={editarFila}
            setEditarFila={setEditarFila}
            body={body}
            setBody={setBody} />
        </div>
        <div className="position-absolute bottom-3rem">
          <button className="border-0 bg-azul text-white rounded-3 px-4 py-2 mx-2"
            onClick={() => {
              setBoton(false);
              setShowBotonPagar(true);
              setShowCocinaConfir(true);
            }}
            type="submit">ENVIAR</button>
          {showBotonPagar && (
            <button
              onClick={() => setShowCajaEnvio(true)}
              className="border-0 bg-azul text-white rounded-3 px-4 py-2">
                PAGAR</button>
          )}
        </div>
      </form>
      <button className="position-absolute bottom-3rem rounded-5 bg-celeste border-0"
        onClick={() => disponible()}>
        <img alt="atras" src={menorque}></img>
      </button>
      <CocinaConfirmacion
        isOpen={showCocinaConfir}
        onRequestClose={() => setShowCocinaConfir(false)} />
      <CajaEnvio
        isOpen={showCajaEnvio}
        onRequestClose={() => setShowCajaEnvio(false)}
        confir={() => setShowCajaConfir(true)} />
      <CajaConfirmacion
        isOpen={showCajaConfir}
        onRequestClose={() => setShowCajaConfir(false)} />
    </>
  );
}
