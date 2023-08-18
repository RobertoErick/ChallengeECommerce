import { clientServices } from "../service/client-service.js";

const crearNuevoProducto = (imagen, categoria, nombre, precio, descripcion, id) => {
    const productoDiv = document.createElement("div");

    productoDiv.className = "productos__caja";

    const contenido = `
        <img src="${imagen}" alt="${nombre}" class="imagen__producto">
        <img src="../img/icono_basura.png" alt="icono basura" class="iconoBasura" id="${id}" data-btn>
        <a href="../screens/editarProducto.html?id=${id}">
        <img src="../img/icono__editar.png" alt="icono editar" class="iconoEditar">
        </a>
        <p>${nombre}</p>
        <p>${precio}</p>
        <p>${descripcion}</p>
    `;
    productoDiv.innerHTML = contenido;

    const btn = productoDiv.querySelector("[data-btn]");
    btn.addEventListener("click", () => {
        const id = btn.id;
        clientServices.eliminarCliente(id).then((respuesta) => {
            console.log(respuesta);
        })
        .catch((err) => alert ("Ocurrio un error"));
    });

    return productoDiv;
};

const contenedorProductos = document.querySelector(".Catalogo__productos");

clientServices.listaClientes().then((data) => {
    data.forEach(({ imagen, categoria, nombre, precio, descripcion, id }) => {
        const nuevoProducto = crearNuevoProducto(imagen, categoria, nombre, precio, descripcion, id);
        contenedorProductos.appendChild(nuevoProducto);
    });
}).catch((error) => alert("Ocurrió un error"));
