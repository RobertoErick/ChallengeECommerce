import { clientServices } from "../service/client-service.js";

document.addEventListener('DOMContentLoaded', function() {
    const correoInput = document.getElementById('correo');
    const contraseñaInput = document.getElementById('contraseña');

    correoInput.value = '';
    contraseñaInput.value = '';

    document.querySelector('[data-form]').addEventListener('submit', async function(event) {
        event.preventDefault();

        const correoValue = correoInput.value;
        const contraseñaValue = contraseñaInput.value;

        try {

            const usuarios = await clientServices.listaUsuarios();

            const usuarioEncontrado = usuarios.find(usuario => usuario.correo === correoValue && usuario.password === contraseñaValue);

            if (usuarioEncontrado) {
                window.location.href = "../screens/productos.html";
            } else {
                alert('Credenciales incorrectas. Intente nuevamente.');
            }
        } catch (error) {
            console.error('Error al cargar la base de datos:', error);
        }
    });
});
