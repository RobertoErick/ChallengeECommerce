const listaClientes = () => 
    fetch("http://localhost:3000/starWars").then((respuesta) => respuesta.json());

const crearCliente = (imagen, categoria, nombre, precio, descripcion) => {
    return fetch("http://localhost:3000/starWars", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagen, categoria, nombre, precio, descripcion}),
    });
};

const eliminarCliente = (id) => {
    return fetch(`http://localhost:3000/starWars/${id}`, {
        method: "DELETE",
    })
}

const detalleCliente = (id) => {
    return fetch(`http://localhost:3000/starWars/${id}`).then((respuesta) =>
        respuesta.json()
    );
};

const actualizarCliente = (imagen, categoria, nombre, precio, descripcion, id) => {
    return fetch(`http://localhost:3000/starWars/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({imagen, categoria, nombre, precio, descripcion}),
    })
        .then((respuesta) => respuesta)
        .catch((err) => console.log(err));
};

export const clientServices = {
    listaClientes,
    crearCliente, 
    eliminarCliente,
    detalleCliente,
    actualizarCliente
};