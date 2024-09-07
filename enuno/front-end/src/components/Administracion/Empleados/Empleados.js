import React, { useState } from "react";
import Table from "./Table";
import { buscar, handleSubmit } from "../Funciones";

//Componente que contiene la informacion de los empleados.

export default function Empleados() {
  const [nuevaFila, setNuevaFila] = useState(null);
  const [editarFila, setEditarFila] = useState(null);
  const [body, setBody] = useState([]);
  const [valor, setValor] = useState('');

  return (
    <>
      <div>
        <input className="w-100 mb-3 rounded-5 p-1 border-0 bg-gris opacity-50 px-3"
          type="text"
          value={valor}
          onChange={(e) => buscar(e, setValor)}
          placeholder="Buscar">
        </input>
      </div>
      <form onSubmit={(e) => handleSubmit(e, nuevaFila, setNuevaFila, editarFila, setEditarFila, setBody)}>
        <div className="table-responsive">
          <Table
            body={body}
            setBody={setBody}
            nuevaFila={nuevaFila}
            setNuevaFila={setNuevaFila}
            editarFila={editarFila}
            setEditarFila={setEditarFila}
            valor={valor} />
        </div>
        <button className="position-absolute bottom-3rem start-50 translate-middle-x border-0 bg-azul text-white rounded-3 px-4 py-2"
          type="submit">
          REGISTRAR
        </button>
      </form>
    </>
  );
}
