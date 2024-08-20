import React from "react";
import PropTypes from 'prop-types';

//Componente que contiene el formulario.

export default function LoginForm({ username, setUsername, password, setPassword, handleSubmit }) {
  return (
    <div id="form" className="container w-35 pt-3 px-5 pb-5 rounded bg-white">
      <h2 className=" text-center p-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3 rounded-pill"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className="form-control mb-3 rounded-pill"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="border-0 rounded-5 w-100 bg-naranja text-white"
          type="submit">
          INGRESAR
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
