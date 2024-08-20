import React from "react";
import MealTable from "./Meal/MealTable";
import DrinkTable from "./Drink/DrinkTable";

//Componente que contiene los componentes de comida y bebida.

export default function Menu() {
  return (
    <div className="d-flex">
      <div className="d-flex flex-column me-5 align-items-center">
        <input className="mb-3 rounded-5 p-1 border-0 bg-gris opacity-50 px-3 w-100"
          type="text"
          placeholder="Buscar">
        </input>
        <div className="table-responsive">
          <MealTable />
        </div>
        <button className="position-absolute bottom-3rem border-0 bg-azul text-white rounded-3 px-4 py-2"
          type="submit">
          REGISTRAR
        </button>
      </div>
      <div className="d-flex flex-column align-items-center">
        <input className="mb-3 rounded-5 p-1 border-0 bg-gris opacity-50 px-3 w-100"
          type="text"
          placeholder="Buscar">
        </input>
        <div className="table-responsive">
          <DrinkTable />
        </div>
        <button className="position-absolute bottom-3rem border-0 bg-azul text-white rounded-3 px-4 py-2"
          type="submit">
          REGISTRAR
        </button>
      </div>
    </div>
  );
}
