const listaUsuarios = () => 
    fetch("https://fake-api-green.vercel.app/usuarios").then((respuesta) => respuesta.json());

const listaClientes = () => 
    fetch("https://fake-api-green.vercel.app/productos").then((respuesta) => respuesta.json());

const crearCliente = (imagen, categoria, nombre, precio, descripcion) => {
    return fetch("https://fake-api-green.vercel.app/productos", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagen, categoria, nombre, precio, descripcion}),
    });
};

const eliminarCliente = (id) => {
    return fetch(`https://fake-api-green.vercel.app/productos/${id}`, {
        method: "DELETE",
    })
}

const detalleCliente = (id) => {
    return fetch(`https://fake-api-green.vercel.app/productos/${id}`).then((respuesta) =>
        respuesta.json()
    );
};

const actualizarCliente = (imagen, categoria, nombre, precio, descripcion, id) => {
    return fetch(`https://fake-api-green.vercel.app/productos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({imagen, categoria, nombre, precio, descripcion}),
    })
        .then((respuesta) => respuesta)
        .catch((err) => console.log(err));
};

const obtenerCarrito = (userId) => 
    fetch(`https://fake-api-green.vercel.app/carrito?userId=${userId}`).then((respuesta) => respuesta.json());

const agregarProductoAlCarrito = (producto, userId) => {
    // Generar un nuevo ID único para el producto en el carrito
    const carritoItemId = generateUniqueId();

    // Crear el objeto a enviar al servidor con el nuevo ID único
    const carritoProducto = {
        ...producto,
        userId,
        carritoItemId,
    };

    return fetch("https://fake-api-green.vercel.app/carrito", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(carritoProducto),
    });
};

// Función para generar un ID único simple
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const eliminar_producto_carrito = (id) => {
    return fetch(`https://fake-api-green.vercel.app/carrito/${id}`, {
        method: "DELETE",
    })
};

const realizarCompra = (userId, productos) => {
    return fetch("https://fake-api-green.vercel.app/compras", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            productos: productos.map(producto => ({ id: producto.id }))
        }),
    });
};

const limpiarCarrito = (userId) => {
    return fetch(`https://fake-api-green.vercel.app/carrito/?userId=${userId}`, {
        method: "DELETE",
    });
};

export const clientServices = {
    listaUsuarios,
    listaClientes,
    crearCliente, 
    eliminarCliente,
    eliminar_producto_carrito,
    detalleCliente,
    actualizarCliente,
    obtenerCarrito,
    agregarProductoAlCarrito,
    realizarCompra,
    limpiarCarrito
};