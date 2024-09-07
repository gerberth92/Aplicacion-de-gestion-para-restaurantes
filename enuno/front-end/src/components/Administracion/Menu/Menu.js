import React, { useState } from "react";
import MealTable from "./Meal/MealTable";
import DrinkTable from "./Drink/DrinkTable";
import { buscar_drink, handleSubmit_drink } from "./Drink/funcionesDrink";
import { buscar_meal, handleSubmit_meal } from "./Meal/funcionesMeal";

//Componente que contiene los componentes de comida y bebida.

export default function Menu() {
  //Variables para el componentes MealTable.
  const [nuevaFila_meal, setNuevaFila_meal] = useState(null);
  const [editarFila_meal, setEditarFila_meal] = useState(null);
  const [body_meal, setBody_meal] = useState([]);
  const [valor_meal, setValor_meal] = useState('');

  //Variables para el componentes DrinkTable.
  const [nuevaFila_drink, setNuevaFila_drink] = useState(null);
  const [editarFila_drink, setEditarFila_drink] = useState(null);
  const [body_drink, setBody_drink] = useState([]);
  const [valor_drink, setValor_drink] = useState('');

  return (
    <div className="d-flex">
      <div className="d-flex flex-column me-5">
        <input className="mb-3 rounded-5 p-1 border-0 bg-gris opacity-50 px-3 w-100"
          type="text"
          value={valor_meal}
          onChange={(e) => buscar_meal(e, setValor_meal)}
          placeholder="Buscar">
        </input>
        <form className="d-flex flex-column align-items-center"
          onSubmit={(e) => handleSubmit_meal(e, nuevaFila_meal, setNuevaFila_meal, editarFila_meal, setEditarFila_meal, setBody_meal)}>
          <div className="table-responsive">
            <MealTable
              body_meal={body_meal}
              setBody_meal={setBody_meal}
              nuevaFila_meal={nuevaFila_meal}
              setNuevaFila_meal={setNuevaFila_meal}
              editarFila_meal={editarFila_meal}
              setEditarFila_meal={setEditarFila_meal}
              valor_meal={valor_meal} />
          </div>
          <button className="position-absolute bottom-3rem  border-0 bg-azul text-white rounded-3 px-4 py-2"
            type="submit">
            REGISTRAR
          </button>
        </form>
      </div>
      <div className="d-flex flex-column">
        <input className="mb-3 rounded-5 p-1 border-0 bg-gris opacity-50 px-3 w-100"
          type="text"
          value={valor_drink}
          onChange={(e) => buscar_drink(e, setValor_drink)}
          placeholder="Buscar">
        </input>
        <form className="d-flex flex-column align-items-center"
          onSubmit={(e) => handleSubmit_drink(e, nuevaFila_drink, setNuevaFila_drink, editarFila_drink, setEditarFila_drink, setBody_drink)}>
          <div className="table-responsive">
            <DrinkTable
              body_drink={body_drink}
              setBody_drink={setBody_drink}
              nuevaFila_drink={nuevaFila_drink}
              setNuevaFila_drink={setNuevaFila_drink}
              editarFila_drink={editarFila_drink}
              setEditarFila_drink={setEditarFila_drink}
              valor_drink={valor_drink} />
          </div>
          <button className="position-absolute bottom-3rem border-0 bg-azul text-white rounded-3 px-4 py-2"
            type="submit">
            REGISTRAR
          </button>
        </form>
      </div>
    </div>
  );
}
