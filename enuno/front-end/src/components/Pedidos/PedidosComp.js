import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mesablanca from '../../assets/icons8-table-50-w.png';
import instance from "../../conexion";
import { useAuth } from '../../Autenticacion/Autenticacion';

//Componente que contiene los botones de las mesas.

export default function PedidosComp() {
  const [mesas, setMesa] = useState([]);
  const navigate = useNavigate();
  const currentUser = useAuth();
  let numero = 0;

  function formatNumero(numero) {
    return (numero.toString().padStart(2, '0'));
  }

  let datos = [];
  datos = [...mesas];
  datos.map((dato) => dato['num'] = formatNumero(numero += 1));

  useEffect(() => {
    async function info() {
      try {
        const response = await instance.get(`mesas/?id_rest=${currentUser.currentUser.id_restaurante}`);
        setMesa(response.data);
      } catch (error) {
        console.error('Error', error);
      }
    }
    info();
  }, []);

  async function ocupada(num, id_mesa, id_pedido) {
    try {
      localStorage.setItem('id_mesa', id_mesa);
      localStorage.setItem('id_pedido', id_pedido);

      const data = {
        estado_enum_ocupada_disponible_field: 'ocupada',
        id_restaurante: currentUser.currentUser.id_restaurante,
        id_mozo: currentUser.currentUser.id_mozo
      };

      await instance.put(`mesas/${id_mesa}/`, data)
        navigate(`/pedidos/mesa/${num}`);
    } catch (error) {
      console.error('Error', error);
    }
  }

  return (
    <>
      <div className="container-md mesas-container">
        {datos.map((mesa, index) => (
          (mesa.estado_enum_ocupada_disponible_field === 'disponible' || (mesa.estado_enum_ocupada_disponible_field === 'ocupada' && mesa.id_mozo === currentUser.currentUser.id_mozo)) && (
            <div key={index}>
              <button className="bg-celeste border-0 rounded-3 px-4 py-3 d-flex"
                onClick={() => ocupada(mesa.num, mesa.id_mesa, mesa.id_pedido)}>
                <div className="m-auto d-flex">
                  <img width='50' height='55' alt="mesa blanca" src={mesablanca}></img>
                  <p className="text-white fs-1 ms-4">
                    {mesa.num}</p>
                </div>
              </button>
            </div>
          )
        ))}
      </div>
    </>
  );
}
