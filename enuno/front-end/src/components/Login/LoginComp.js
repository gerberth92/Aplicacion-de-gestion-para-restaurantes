import React, { useState } from 'react';
import { useAuth } from '../../Autenticacion/Autenticacion';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

//Componente que contiene las rutas y formulario de login.

export default function LoginComp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    // Redirige según el rol del usuario
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      switch (user.role) {
        case 'corp':
          navigate('/corp');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'mozo':
          navigate('/pedidos');
          break;
        case 'cocina':
          navigate('/cocina');
          break;
        case 'bar':
          navigate('/bar');
          break;
        case 'caja':
          navigate('/caja');
          break;
        default:
          navigate('/login');
      }
    }
  };

  return (
    <LoginForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
