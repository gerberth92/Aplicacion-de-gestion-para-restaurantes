import instance from "../../../../conexion";

// Función para cargar las bebidas desde la base de datos
export async function cargarMeal(setBody_meal) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  try {
    const response = await instance.get(`alimentos/?id_rest=${currentUser.id_restaurante}`);
    setBody_meal(response.data);
  } catch (error) {
    console.error('Error', error);
  }
};

// Función que maneja el envío del formulario
export const handleSubmit_meal = (e, nuevaFila_meal, setNuevaFila_meal, editarFila_meal, setEditarFila_meal, setBody_meal) => {
  e.preventDefault();

  if (nuevaFila_meal) {
    // Si hay una nueva fila, enviar los datos por POST
    instance.post('alimentos/', nuevaFila_meal)
      .then(response => {
        setNuevaFila_meal(null); // Limpiar la fila después de registrar
        cargarMeal(setBody_meal);
      })
      .catch(error => console.error("Error al registrar", error));
  }

  if (editarFila_meal) {
    // Si hay una fila en edición, enviar los cambios por PUT
    instance.put(`alimentos/${editarFila_meal.id}/`, editarFila_meal)
    .then(response => {
      setEditarFila_meal(null); // Limpiar la fila después de actualizar
        cargarMeal(setBody_meal);
      })
      .catch(error => console.error("Error al actualizar", error));
  }
};

// Función para manejar el campo de busqueda
export const buscar_meal = (e, setValor_meal) => {
  setValor_meal(e.target.value);
}

// Función para manejar el click en el botón '+'
export function crearFila_meal(nuevaFila_meal, setNuevaFila_meal) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (nuevaFila_meal) {
    setNuevaFila_meal(null);
  } else {
    setNuevaFila_meal({
      nombre: "",
      precio: "",
      id_restaurante: currentUser.id_restaurante
    });
  }
};

// Función para manejar cambios en los inputs de la nueva fila o fila en edición
export function cambios_meal(e, field, editarFila_meal, setEditarFila_meal, nuevaFila_meal, setNuevaFila_meal) {

  if (nuevaFila_meal) {
    setNuevaFila_meal({
      ...nuevaFila_meal,
      [field]: e.target.value
    });
  } else {
    setEditarFila_meal({
      ...editarFila_meal,
      [field]: e.target.value
    });
  }
};

// Función para activar la edición de una fila existente
export function editar_meal(item, setEditarFila_meal) {
  setEditarFila_meal(item);
};

// Función para eliminar un registro de la base de datos
export function eliminar_meal(id, setBody_meal) {
  instance.delete(`alimentos/${id}`)
    .then(response => {
      // Recargar los datos después de eliminar el registro
      cargarMeal(setBody_meal);
    })
    .catch(error => console.error("Error al eliminar", error));
};
