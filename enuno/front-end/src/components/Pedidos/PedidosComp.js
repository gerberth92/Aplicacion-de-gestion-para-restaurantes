import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import mesablanca from '../../assets/icons8-table-50-w.png';

//Componente que contiene los botones de las mesas.

export default function PedidosComp() {
  const [mesas, setMesa] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('url')
      .then(response => setMesa(response.data.mesas))
      .catch(error => console.error('Error', error));
  }, []);

  function redirect(mesa_id) {
    navigate(`/pedidos/mesa/${mesa_id}`);
  }

  return(
    <>
      <div className="container-md mesas-container">
        {mesas.map((mesa, index) => (
          <div key={index} className="">
            <button className="bg-celeste border-0 rounded-3 px-4 py-3 d-flex"
              key={index}
              onClick={() => {
                redirect(mesa.id)
              }}>
              <div className="m-auto d-flex">
                <img width='50' height='55' src={mesablanca}></img>
                <p className="text-white fs-1 ms-4">
                  0{mesa.id}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
