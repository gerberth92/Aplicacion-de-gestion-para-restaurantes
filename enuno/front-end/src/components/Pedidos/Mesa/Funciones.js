import instance from "../../../conexion";

// Función que maneja el envío del formulario
export const handleSubmit = (e, nuevaFila, setNuevaFila, editarFila, setEditarFila, setBody, estado, setEstado, body) => {
  e.preventDefault();

  if (nuevaFila) {
    if (estado) {
      (async () => {
        try {
          const data = {
            estado: 'procesando',
            id_mesa: localStorage.getItem('id_mesa'),
            id_usuario: JSON.parse(localStorage.getItem('currentUser')).id_mozo,
            id_restaurante: JSON.parse(localStorage.getItem('currentUser')).id_restaurante
          };
    
          const response = await instance.post('pedidos/', data)
          localStorage.setItem('id_pedido', response.data.id);
  
          const filaActualizada = {
            ...nuevaFila,
            id_pedido: response.data.id
          };
  
          // Si hay una nueva fila, enviar los datos por POST
          await instance.post('ordenes/', filaActualizada)
          setNuevaFila(null); // Limpiar la fila después de registrar
          cargarPagina(setBody);

          const put_mesa = {
            estado_enum_ocupada_disponible_field: 'ocupada',
            id_restaurante: JSON.parse(localStorage.getItem('currentUser')).id_restaurante,
            id_mozo: JSON.parse(localStorage.getItem('currentUser')).id_mozo,
            id_pedido: localStorage.getItem('id_pedido')
          };

          await instance.put(`mesas/${localStorage.getItem('id_mesa')}/`, put_mesa)
        } catch (error) {
          console.error('Error post_pedidos:', error);
        }
      })();
      setEstado(false);
    } else {
      (async () => {
        try {
          const filaActualizada = {
            ...nuevaFila,
            id_pedido: localStorage.getItem('id_pedido')
          };
  
          // Si hay una nueva fila, enviar los datos por POST
          await instance.post('ordenes/', filaActualizada)
            .then(response => {
              setNuevaFila(null); // Limpiar la fila después de registrar
              cargarPagina(setBody);
            })
            .catch(error => console.error("Error al registrar", error));
  
        } catch (error) {
          console.error('Error post_pedidos:', error);
        }
      })();
    }
  }

  if (editarFila) {
    // Si hay una fila en edición, enviar los cambios por PUT
    instance.put(`ordenes/${editarFila.id}/`, editarFila)
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
      cantidad: "",
      alimento: null,
      bebida: null,
      id_pedido: '',
      estado: 'preparando'
    });
  }
};

// Función para cargar los datos desde la base de datos
export async function cargarPagina(setBody) {
  try {
    const id_pedido = localStorage.getItem('id_pedido');
    const id_mesa = localStorage.getItem('id_mesa');

    if (id_pedido && id_pedido !== "null") {
      const response = await instance.get(`ordenes/?id_pedido=${id_pedido}&id_mesa=${id_mesa}`);
      setBody(response.data);
    }
  } catch (error) {
    console.error('Error', error);
  }
};

// Función para cargar los platos y bebidas desde la base de datos
export async function platos_bebidas(setPlatos, setBebidas) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  try {
    const [responseP, responseB] = await Promise.all([
      instance.get(`alimentos/?id_rest=${currentUser.id_restaurante}`),
      instance.get(`bebidas/?id_rest=${currentUser.id_restaurante}`)
    ]);

    setPlatos(responseP.data);
    setBebidas(responseB.data);
  } catch (error) {
    console.error('Error', error);
  }
};

// Función para manejar cambios en los inputs de la nueva fila o fila en edición
export function cambios(e, field, editarFila, setEditarFila, nuevaFila, setNuevaFila) {
  let value = e.target.value;

  if (field === 'cantidad') {
    if (nuevaFila) {
      setNuevaFila({
        ...nuevaFila,
        [field]: value
      });
    } else {
      setEditarFila({
        ...editarFila,
        [field]: value
      });
    }
  } else {
    const [nombre, precio] = value.split(',');

    if (nuevaFila) {
      setNuevaFila({
        ...nuevaFila,
        [field]: nombre,
        precio: precio
      });
    } else {
      setEditarFila({
        ...editarFila,
        [field]: nombre,
        precio: precio
      });
    }
  }
};

// Función para activar la edición de una fila existente
export function editar(item, setEditarFila) {
  setEditarFila(item);
};

// Función para eliminar un registro de la base de datos
export function eliminar(id, setBody) {
  instance.delete(`ordenes/${id}`)
    .then(response => {
      cargarPagina(setBody);
    })
    .catch(error => console.error("Error al eliminar", error));
};

