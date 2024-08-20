import instance from "../../conexion";

// Función que maneja el envío del formulario
export const handleSubmit = (e, nuevaFila, setNuevaFila, editarFila, setEditarFila, setBody) => {
  e.preventDefault();

  if (nuevaFila) {
    // Si hay una nueva fila, enviar los datos por POST
    instance.post('rests/', nuevaFila)
      .then(response => {
        setNuevaFila(null); // Limpiar la fila después de registrar
        cargarPagina(setBody);
      })
      .catch(error => console.error("Error al registrar", error));
  }

  if (editarFila) {
    // Si hay una fila en edición, enviar los cambios por PUT
    instance.put(`rests/${editarFila.id}/`, editarFila)
      .then(response => {
        setEditarFila(null); // Limpiar la fila después de actualizar
        cargarPagina(setBody);
      })
      .catch(error => console.error("Error al actualizar", error));
  }
};

// Función para manejar el click en el botón '+'
export function crearFila(nuevaFila, setNuevaFila) {
  if (nuevaFila) {
    setNuevaFila(null);
  } else {
    setNuevaFila({
      razon_social: "",
      nombre: "",
      apellido: "",
      dni: "",
      contrasena: "",
      membresia: ""
    });
  }
};

// Función para cargar los datos desde la base de datos
export async function cargarPagina(setBody) {
  try {
    const response = await instance.get('rests/');
    setBody(response.data);
  } catch (error) {
    console.error('Error', error);
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
  instance.delete(`rests/${id}`)
    .then(response => {
      // Recargar los datos después de eliminar el registro
      cargarPagina(setBody);
    })
    .catch(error => console.error("Error al eliminar", error));
};

export const buscar = (e, setValor) => {
  setValor(e.target.value);
}
