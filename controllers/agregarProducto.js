import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Obtener el valor del campo de URL
    const urlInput = document.querySelector("[data-imagen]");
    const url = urlInput.value;

    // Validar la URL usando la expresión regular
    const urlRegex = /^https?:\/\/.+/;  // Expresión regular directamente en el código
    if (!urlRegex.test(url)) {
        alert("Por favor, introduzca una URL válida.");
        return; // Detener la ejecución si la URL no es válida
    }

    const imagen = document.querySelector("[data-imagen]").value;
    const categoria = document.querySelector("[data-categoria]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    clientServices
        .crearCliente(imagen, categoria, nombre, precio, descripcion)
        .then(() => {
            window.location.href = "../screens/productos.html";
        })
        .catch((err) => console.log(err));
});
