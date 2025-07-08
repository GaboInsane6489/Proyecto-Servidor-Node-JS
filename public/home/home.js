const formL = document.querySelector('#form-login');
const formC = document.querySelector('#form-create');
const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');
const notification = document.querySelector(".notification");

// Función para mostrar notificaciones
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show-notification');
    setTimeout(() => {
        notification.classList.remove('show-notification');
    }, 3000);
}

// Registro de usuario
formC.addEventListener('submit', async e => {
    e.preventDefault();

    const username = createInput.value.trim();

    if (!username) {
        showNotification('El campo de usuario no puede estar vacío');
        return;
    }

    try {
        const respuesta = await fetch('/api/usuarios');
        const users = await respuesta.json();

        const userExists = users.some(user => user.username === username);

        if (userExists) {
            showNotification('El usuario ya se encuentra registrado');
            } else {
                const nuevoUsuario = await fetch('/api/usuarios', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username })
                });

            if (nuevoUsuario.ok) {
                showNotification(`El usuario ${username} se registró satisfactoriamente`);
                createInput.value = '';
            } else {
                showNotification('No se pudo registrar el usuario');
            }
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        showNotification('Error al conectar con el servidor');
    }
});

// Inicio de sesión
formL.addEventListener('submit', async e => {
    e.preventDefault();

    const username = loginInput.value.trim();

    if (!username) {
        showNotification('El campo de usuario no puede estar vacío');
        return;
    }

    try {
        const respuesta = await fetch('/api/usuarios');
        const users = await respuesta.json();

        const userFound = users.find(user => user.username === username);

        if (!userFound) {
            showNotification('El usuario no existe');
        } else {
            localStorage.setItem('user', JSON.stringify(userFound));
            window.location.href = '/tareas/tareas.html';
        }

        loginInput.value = '';
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        showNotification('Error al conectar con el servidor');
    }
});
