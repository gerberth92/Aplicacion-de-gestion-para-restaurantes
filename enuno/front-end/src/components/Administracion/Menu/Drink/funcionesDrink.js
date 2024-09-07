import instance from "../../../../conexion";

// Función para cargar las bebidas desde la base de datos
export async function cargarBebidas(setBody_drink) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  try {
    const response = await instance.get(`bebidas/?id_rest=${currentUser.id_restaurante}`);
    setBody_drink(response.data);
  } catch (error) {
    console.error('Error', error);
  }
};

// Función que maneja el envío del formulario
export const handleSubmit_drink = (e, nuevaFila_drink, setNuevaFila_drink, editarFila_drink, setEditarFila_drink, setBody_drink) => {
  e.preventDefault();

  if (nuevaFila_drink) {
    // Si hay una nueva fila, enviar los datos por POST
    instance.post('bebidas/', nuevaFila_drink)
      .then(response => {
        setNuevaFila_drink(null); // Limpiar la fila después de registrar
        cargarBebidas(setBody_drink);
      })
      .catch(error => console.error("Error al registrar", error));
  }

  if (editarFila_drink) {
    // Si hay una fila en edición, enviar los cambios por PUT
    instance.put(`bebidas/${editarFila_drink.id}/`, editarFila_drink)
    .then(response => {
      setEditarFila_drink(null); // Limpiar la fila después de actualizar
        cargarBebidas(setBody_drink);
      })
      .catch(error => console.error("Error al actualizar", error));
  }
};

// Función para manejar el campo de busqueda
export const buscar_drink = (e, setValor_drink) => {
  setValor_drink(e.target.value);
}

// Función para manejar el click en el botón '+'
export function crearFila_drink(nuevaFila_drink, setNuevaFila_drink, currentUser) {
  if (nuevaFila_drink) {
    setNuevaFila_drink(null);
  } else {
    setNuevaFila_drink({
      nombre: "",
      precio: "",
      id_restaurante: currentUser.currentUser.id_restaurante
    });
  }
};

// Función para manejar cambios en los inputs de la nueva fila o fila en edición
export function cambios_drink(e, field, editarFila_drink, setEditarFila_drink, nuevaFila_drink, setNuevaFila_drink) {

  if (nuevaFila_drink) {
    setNuevaFila_drink({
      ...nuevaFila_drink,
      [field]: e.target.value
    });
  } else {
    setEditarFila_drink({
      ...editarFila_drink,
      [field]: e.target.value
    });
  }
};

// Función para activar la edición de una fila existente
export function editar_drink(item, setEditarFila_drink) {
  setEditarFila_drink(item);
};

// Función para eliminar un registro de la base de datos
export function eliminar_drink(id, setBody_drink) {
  instance.delete(`bebidas/${id}`)
    .then(response => {
      // Recargar los datos después de eliminar el registro
      cargarBebidas(setBody_drink);
    })
    .catch(error => console.error("Error al eliminar", error));
};
