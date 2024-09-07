import React, { useContext, useState, useEffect } from 'react';
import instance from '../conexion';

// Crea un contexto de autenticación
const AuthContext = React.createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor de autenticación que envuelve la aplicación y proporciona el contexto
export const AuthProvider = ({ children }) => {
  // Estado para almacenar el usuario actual
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Estado de carga

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      // Realiza una solicitud POST a la API de Django para autenticar al usuario
      const response = await instance.post('login/', { username, password });
      if (response.data.success) {
        // Si la autenticación es exitosa, guarda la información del usuario en el estado y en localStorage
        setCurrentUser(response.data.user);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      } else {
        // Muestra un mensaje de error si las credenciales son incorrectas
        alert(response.data.message);
      }
    } catch (error) {
      // Maneja errores de la solicitud
      console.error('Error logging in:', error);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Limpia el estado del usuario actual y elimina la información del usuario de localStorage
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('id_mesa');
    localStorage.removeItem('id_pedido');
  };

  // Efecto que se ejecuta al cargar el componente para verificar si el usuario ya está autenticado
  useEffect(() => {
    // Obtiene la información del usuario almacenada en localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      // Si hay un usuario almacenado, actualiza el estado con esa información
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);  // Finaliza la carga
  }, []);

  // Valor que se proporciona a los componentes hijos a través del contexto
  const value = {
    currentUser,
    login,
    logout,
  };

  if (loading) {
    return <div>Loading...</div>;  // O algún tipo de spinner
  }

  // Proporciona el contexto de autenticación a los componentes hijos
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
