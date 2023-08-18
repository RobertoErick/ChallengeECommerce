import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");
console.log("atraccion de datos exitoso");

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
         window.location.href = "../screens/error.html";
    }

    const imagen = document.querySelector("[data-imagen]");
    const categoria = document.querySelector("[data-categoria]");
    const nombre = document.querySelector("[data-nombre]");
    const precio = document.querySelector("[data-precio]");
    const descripcion = document.querySelector("[data-descripcion]");

    try{
        const starWars = await clientServices.detalleCliente(id);
        if(starWars.imagen && starWars.categoria && starWars.nombre && starWars.precio && starWars.descripcion) {
            imagen.value = starWars.imagen;
            categoria.value = starWars.categoria;
            nombre.value = starWars.nombre;
            precio.value = starWars.precio;
            descripcion.value = starWars.descripcion;

        } else {
            throw new Error();
        }
    }catch(err){
        window.location.href = "../screens/error.html";
    }
};

obtenerInformacion(); 

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    const imagen = document.querySelector("[data-imagen]").value;
    const categoria = document.querySelector("[data-categoria]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;
    clientServices.actualizarCliente(imagen, categoria,nombre, precio, descripcion, id).then(() => {
        window.location.href = "/screens/productos.html";
    });
});