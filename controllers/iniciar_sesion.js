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
            const response = await fetch('http://localhost:3000/usuarios');
            const usuarios = await response.json();

            const usuarioEncontrado = usuarios.find(usuario => usuario.correo === correoValue && usuario.password === contraseñaValue);

            if (usuarioEncontrado) {
                window.location.href = "../screens/productos.html";
            } else {
                alert('Credenciales incorrectas. Intente nuevamente.');
            }
        } catch (error) {
            console.error('Error al cargar la base de datos:', error);
        }

        // No se almacenan los valores en el localStorage o sessionStorage
    });
});
