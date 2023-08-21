import { clientServices } from "../service/client-service.js";

const crearNuevoProducto = (imagen, categoria, nombre, precio, id) => {
    const contenedorMapping = {
        "videojuegos": "#videojuegos",
        "consolas": "#consolas",
        "diversos": "#diversos"
    };

    if (contenedorMapping.hasOwnProperty(categoria)) {
        const productoDiv = document.createElement("div");
        productoDiv.className = "productos__caja";

        const contenido = `
            <a href="../screens/productoIndividual.html?id=${id}">
            <img src="${imagen}" alt="${nombre}" class="imagen__producto">
            <p>${nombre}</p>
            <p>$${precio}</p>
            <p>#${id}</p>
            </a>
        `;
        productoDiv.innerHTML = contenido;

        const contenedorSelector = contenedorMapping[categoria];
        const contenedor = document.querySelector(contenedorSelector);
        contenedor.appendChild(productoDiv);

        return productoDiv;
    }
    
    return null;
};

clientServices.listaClientes()
    .then((data) => {
        data.forEach(({ imagen, categoria, nombre, precio, id }) => {
            crearNuevoProducto(imagen, categoria, nombre, precio, id);
        });
    })
    .catch((error) => alert(`Ocurrió un error: ${error.message}`));
