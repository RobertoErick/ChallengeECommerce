import { clientServices } from "../service/client-service.js";

const Contenido = document.querySelector("[data-div]");
const Similares = document.querySelector("[data-similares]");
let producto = null;

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
         window.location.href = "../screens/error.html";
    }
    try {
        producto = await clientServices.detalleCliente(id);
        if (producto.imagen && producto.categoria && producto.nombre && producto.precio && producto.descripcion) {
            const contenido = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="contenidoIndividual">
                    <h2>${producto.nombre}</h2>
                    <p class="precio">${producto.precio}</p>
                    <p>${producto.descripcion}</p>
                </div>
            `;
            Contenido.innerHTML = contenido;
        } else {
            throw new Error();
        }
    } catch (err) {
        window.location.href = "../screens/error.html";
    }
};

const recomendarProductos = (imagen, nombre, precio, id) => {
    const similar = `
        <div class="productos__caja">
            <img src="${imagen}" alt="${nombre}" class="imagen__producto">
            <p>${nombre}</p>
            <p>${precio}</p>
            <a href="productoIndividual.html?id=${id}">Ver producto</a>
        </div>
    `;
    Similares.innerHTML += similar;
}

obtenerInformacion().then(() => {
    clientServices.listaClientes()
    .then((data) => {
        data.forEach(({ imagen, categoria, nombre, precio, id }) => {
            if (producto && producto.categoria === categoria) {
                recomendarProductos(imagen, nombre, precio, id);
            }
        });
    })
    .catch((error) => alert(`Ocurrió un error: ${error.message}`));
});

