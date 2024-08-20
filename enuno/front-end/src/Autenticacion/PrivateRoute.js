import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Autenticacion";

// Componente para rutas privadas

export default function PrivateRoute({ element: Component, ...rest }) {
  const { currentUser } = useAuth();

  if (currentUser === null) {
    return(
      <Navigate to="/login" />
    );
  }

  return (
    currentUser ? (
      Component
    ) : (
      <Navigate to="/login" />
    )
  );
};
