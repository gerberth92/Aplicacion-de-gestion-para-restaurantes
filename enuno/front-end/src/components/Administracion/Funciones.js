import instance from "../../conexion";

// Función que obtiene el registro de mesas
export async function registro_mesas(setMesas) {
  try {
    const id_rest = JSON.parse(localStorage.getItem('currentUser')).id_restaurante;
    const response = await instance.get(`mesas/?id_rest=${id_rest}`);
    setMesas(response.data);
  } catch (error) {
    console.error('Error', error);
  }
}

// Función para cargar los pedidos desde la base de datos
export async function cargarPedidos(setBody) {
  try {
    const id_rest = JSON.parse(localStorage.getItem('currentUser')).id_restaurante;
    const response = await instance.get(`pedidos/?id_rest=${id_rest}`);
    setBody(response.data);
  } catch (error) {
    console.error('Error', error);
  }
};

// Función para cargar los empleados desde la base de datos
export async function cargarEmpleados(setBody) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  try {
    const response = await instance.get(`usuarios/?id_rest=${currentUser.id_restaurante}`);
    setBody(response.data);
  } catch (error) {
    console.error('Error', error);
  }
};

// Función para cargar los roles desde la base de datos
export async function cargarRoles(setRoles) {
  try {
    const response = await instance.get('cargos/');
    setRoles(response.data);
  } catch (error) {
    console.error('Error', error);
  }
};

// Función que maneja el envío del formulario
export const handleSubmit = (e, nuevaFila, setNuevaFila, editarFila, setEditarFila, setBody) => {
  e.preventDefault();

  if (nuevaFila) {
    // Si hay una nueva fila, enviar los datos por POST
    instance.post('usuarios/', nuevaFila)
      .then(response => {
        setNuevaFila(null); // Limpiar la fila después de registrar
        cargarEmpleados(setBody);
      })
      .catch(error => console.error("Error al registrar", error));
  }

  if (editarFila) {
    // Si hay una fila en edición, enviar los cambios por PUT
    instance.put(`usuarios/${editarFila.id}/`, editarFila)
    .then(response => {
      setEditarFila(null); // Limpiar la fila después de actualizar
        cargarEmpleados(setBody);
      })
      .catch(error => console.error("Error al actualizar", error));
  }
};

// Función para manejar el campo de busqueda
export const buscar = (e, setValor) => {
  setValor(e.target.value);
}

// Función para manejar el click en el botón '+'
export function crearFila(nuevaFila, setNuevaFila) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (nuevaFila) {
    setNuevaFila(null);
  } else {
    setNuevaFila({
      nombre: "",
      apellido: "",
      dni: "",
      puesto: "",
      cont: "",
      id_restaurante: currentUser.id_restaurante
    });
  }
};

// Función para manejar cambios en los inputs de la nueva fila o fila en edición
export function cambios(e, field, editarFila, setEditarFila, nuevaFila, setNuevaFila) {

  if (nuevaFila) {
    setNuevaFila({
      ...nuevaFila,
      [field]: e.target.value
    });
  } else {
    setEditarFila({
      ...editarFila,
      [field]: e.target.value
    });
  }
};

// Función para activar la edición de una fila existente
export function editar(item, setEditarFila) {
  setEditarFila(item);
};

// Función para eliminar un registro de la base de datos
export function eliminar(id, setBody) {
  instance.delete(`usuarios/${id}`)
    .then(response => {
      // Recargar los datos después de eliminar el registro
      cargarEmpleados(setBody);
    })
    .catch(error => console.error("Error al eliminar", error));
};
