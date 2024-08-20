import React from "react";
import { useAuth } from "../../Autenticacion/Autenticacion";

//Componente que contiene el header de todas las vistas.

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <>
      <div className="d-flex bg-azul py-2">
        <h2 className="text-white me-auto px-5">
          { currentUser ? (
            currentUser.local
          ) : (
            'local'
          ) }</h2>
        <button className="border-0 bg-transparent text-white px-5"
          onClick={logout}
        >Logout</button>
      </div>
    </>
  );
}
