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
            <img src="${imagen}" alt="${nombre}" class="imagen__producto">
            <p>${nombre}</p>
            <p>$${precio}</p>
            <a href="../screens/productoIndividual.html?id=${id}">
            <p>Ver producto</p>
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

document.addEventListener('DOMContentLoaded', () => {
    const verTodo = document.querySelector("#verTodo");
    const verTodo2 = document.querySelector("#verTodo2");
    const verTodo3 = document.querySelector("#verTodo3");
    const contenido = document.querySelector('.Catalogo__productos');
    const contenido2 = document.querySelector('.Catalogo__productos2');
    const contenido3 = document.querySelector('.Catalogo__productos3');
        
    let estilosCambiados = false;
    let estilosCambiados2 = false;
    let estilosCambiados3 = false;
    
    verTodo.addEventListener('click', () => {
            if (!estilosCambiados) {
                contenido.style.overflow = 'visible';
                contenido.style.textOverflow = 'clip';
                contenido.style.whiteSpace = 'normal';
                contenido.style.maxHeight = 'none';
                contenido.style.display = 'flex';
                contenido.style.flexWrap = 'wrap';
                contenido.style.margin = '0 10% 0 10%';
                contenido.style.gap = '2%';
                
                verTodo.textContent = "Ver menos <-";
                estilosCambiados = true;
            } else {
                // Aplicar estilos originales aquí
                contenido.style.overflow = 'hidden';
                contenido.style.textOverflow = 'ellipsis';
                contenido.style.whiteSpace = 'nowrap';
                contenido.style.maxHeight = '254px';
                contenido.style.display = 'flex';
                contenido.style.flexWrap = 'wrap';
                contenido.style.margin = '0 10% 0 10%';
                contenido.style.gap = '2%';
                
                verTodo.textContent = "Ver todo ->";
                estilosCambiados = false;
            }
        });

    verTodo2.addEventListener('click', () => {
            if (!estilosCambiados2) {
                contenido2.style.overflow = 'visible';
                contenido2.style.textOverflow = 'clip';
                contenido2.style.whiteSpace = 'normal';
                contenido2.style.maxHeight = 'none';
                contenido2.style.display = 'flex';
                contenido2.style.flexWrap = 'wrap';
                contenido2.style.margin = '0 10% 0 10%';
                contenido2.style.gap = '2%';
                
                verTodo2.textContent = "Ver menos <-";
                estilosCambiados2 = true;
            } else {
                contenido2.style.overflow = 'hidden';
                contenido2.style.textOverflow = 'ellipsis';
                contenido2.style.whiteSpace = 'nowrap';
                contenido2.style.maxHeight = '254px';
                contenido2.style.display = 'flex';
                contenido2.style.flexWrap = 'wrap';
                contenido2.style.margin = '0 10% 0 10%';
                contenido2.style.gap = '2%';
                
                verTodo2.textContent = "Ver todo ->";
                estilosCambiados2 = false;
            }
        });

     verTodo3.addEventListener('click', () => {
        if (!estilosCambiados3) {
            contenido3.style.overflow = 'visible';
            contenido3.style.textOverflow = 'clip';
            contenido3.style.whiteSpace = 'normal';
            contenido3.style.maxHeight = 'none';
            contenido3.style.display = 'flex';
            contenido3.style.flexWrap = 'wrap';
            contenido3.style.margin = '0 10% 0 10%';
            contenido3.style.gap = '2%';
            
            verTodo3.textContent = "Ver menos <-";
            estilosCambiados3 = true;
        } else {
            // Aplicar estilos originales aquí
            contenido3.style.overflow = 'hidden';
            contenido3.style.textOverflow = 'ellipsis';
            contenido3.style.whiteSpace = 'nowrap';
            contenido3.style.maxHeight = '254px';
            contenido3.style.display = 'flex';
            contenido3.style.flexWrap = 'wrap';
            contenido3.style.margin = '0 10% 0 10%';
            contenido3.style.gap = '2%';
            
            verTodo3.textContent = "Ver todo ->";
            estilosCambiados3 = false;
        }
    });   
});
    
    


