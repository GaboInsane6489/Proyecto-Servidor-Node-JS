const user = JSON.parse(localStorage.getItem('user'))
//console.log(user)



const formulario = document.querySelector('#form-todos')
const lista = document.querySelector('#todos-list')
const InputF = document.querySelector('#form-input')
const cerrarBtn = document.querySelector('#cerrar-btn')

/* 
1. Si usuario no existe (!user) redireccionar a '../home/index.html', sino enviar respuesta (async) a la espera (await) 'http://localhost:3000/tareas', con el metodo GET
2.Hacer que el 'submit' de formulario envie respuesta a la espera 'await' de 'http://localhost:3000/tareas' con el metodo POST
3.body:JSON.stringify({texto:InputF.value,username_id:user.id}) sería el cambio en el body
4.Cada usario registrado con su id, será redireccionado a tareas, y cada tarea enviada, se registrara con un id propio, pero guardado con el id del usuario, para que cada tarea registrada, quede registrada con su respectivo usuario

*/

if (!user) {
    window.location.href = '../home/index.html';
} else {
    const obtenerLista = async () => {
        const respuesta = await fetch(`/api/tareas/${user._id}`);
        const list = await respuesta.json();

        list.forEach(i => {
            const listadoTareas = document.createElement('li');
            listadoTareas.id = i._id;
            listadoTareas.className = 'todo-item';
            listadoTareas.innerHTML = `
                <button class="delete-btn">&#10006;</button>
                <p>${i.texto}</p>
                <button class="check-btn">&#10003;</button>
            `;
            lista.appendChild(listadoTareas);
        });
    };

    obtenerLista();

    formulario.addEventListener('submit', async e => {
        e.preventDefault();

        await fetch('/api/tareas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: InputF.value, username_id: user._id })
        });

        InputF.value = '';
        lista.innerHTML = ''; // Limpia la lista para recargar
        obtenerLista();       // Recarga tareas actualizadas
    });

    lista.addEventListener('click', async e => {
    const tareaElemento = e.target.closest('li');
    const id = tareaElemento.id;

    if (e.target.classList.contains('delete-btn')) {
        await fetch(`/api/tareas/${id}`, {
            method: 'DELETE'
        });
        tareaElemento.remove();
    }

    if (e.target.classList.contains('check-btn')) {
        const completada = tareaElemento.classList.toggle('completada');

        await fetch(`/api/tareas/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completada })
        });
    }

});


    cerrarBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = '../home/index.html';
    });
}
