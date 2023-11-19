import { clientServices } from "../service/client-service.js";

const crearNuevoProducto = (imagen, nombre, precio, id) => {
    const productoDiv = document.createElement("div");

    productoDiv.className = "productos__caja";

    const contenido = `
        <img src="${imagen}" alt="${nombre}" class="imagen__producto">
        <img src="../img/icono_basura.png" alt="icono basura" class="iconoBasura" id="${id}" data-btn>
        <p>${nombre}</p>
        <p>${precio}</p>
        <a href="../screens/productoIndividual.html?id=${id}">
            <p>Ver producto</p>
        </a>
        <p>id: ${id}</p>
    `;
    productoDiv.innerHTML = contenido;

    const btn = productoDiv.querySelector("[data-btn]");
    btn.addEventListener("click", () => {
        const id = btn.id;
        clientServices.eliminar_producto_carrito(id).then((respuesta) => {
            console.log(respuesta);
            location.reload();
        })
        .catch((err) => alert ("Ocurrio un error"));
    });

    return productoDiv;
};

const contenedorProductos = document.querySelector(".Catalogo__productos");

// Obtener el ID del cliente desde Local Storage
const userId = localStorage.getItem('userId');

if (userId) {
    // Realizar la solicitud al servidor para obtener el carrito del cliente
    clientServices.obtenerCarrito(userId)
        .then((data) => {
            data.forEach(({ imagen, nombre, precio, id }) => {
                const nuevoProducto = crearNuevoProducto(imagen, nombre, precio, id);
                contenedorProductos.appendChild(nuevoProducto);
            });
        })
        .catch((error) => alert("Ocurrió un error al obtener el carrito"));
} else {
    alert("No se encontró el ID del usuario en el Local Storage");
}

// Manejar la acción de "comprar"
const comprarBtn = document.querySelector("#comprarBtn");
comprarBtn.addEventListener("click", () => {
    // Obtener la lista de productos en el carrito
    const productosEnCarrito = document.querySelectorAll(".productos__caja");

    // Realizar la compra
    if (userId && productosEnCarrito.length > 0) {
        const productosParaCompra = Array.from(productosEnCarrito).map(productoDiv => {
            const id = productoDiv.querySelector("[data-btn]").id;
            const nombre = productoDiv.querySelector("p").innerText;
            const precio = productoDiv.querySelector("p:last-child").innerText;

            return { id, nombre, precio };
        });

        clientServices.realizarCompra(userId, productosParaCompra)
            .then(() => {
                // Limpiar el carrito después de la compra
                alert("Compra realizada con éxito");
                clientServices.limpiarCarrito(userId);
                window.location.href = "../screens/comprar_productos.html";
            })
            .catch(error => alert(`Error al realizar la compra: ${error.message}`));
    } else {
        alert("No hay productos en el carrito o no se encontró el ID del usuario");
    }
});
