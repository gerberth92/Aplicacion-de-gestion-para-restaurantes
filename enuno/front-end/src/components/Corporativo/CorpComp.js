import React, { useState } from "react";
import Table from "./Table";
import { buscar, handleSubmit } from "./Funciones";

//Componente que contiene los elementos del modulo corporativo.

export default function CorpComp() {
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
            nuevaFila={nuevaFila}
            setNuevaFila={setNuevaFila}
            editarFila={editarFila}
            setEditarFila={setEditarFila}
            body={body}
            setBody={setBody}
            valor={valor} />
        </div>
        <button className="position-absolute bottom-0 start-50 translate-middle-x border-0 bg-azul text-white rounded-3 px-4 py-2"
          type="submit">
          REGISTRAR
        </button>
      </form>
    </>
  );
}
