 //ESPERAR EL DOM ESTE CARGADO
 //-----------------------------------------
 document.addEventListener('DOMContentLoaded', function() {

    const emails = [];

    //FUNCION PARA VALIDAD EDAD
    function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        return edad;
    }

    //LISTENER DE SUBMIT PARA VALIDAR FORMULARIO Y MOSTRAR MODALES
    document.getElementById('form').addEventListener('submit', function(event) { 
        event.preventDefault();
        const nombre = document.getElementById('Nombre').value;
        const apellidos = document.getElementById('Apellidos').value;
        const f_nacimiento = document.getElementById('f_nacimiento').value;
        const email = document.getElementById('email').value;
        const cargo = document.getElementById('cargo').value;
        const f_ingreso = document.getElementById('f_ingreso').value;

        // si algun campo esta vacio, muestra modal
        const campos = [nombre, apellidos, f_nacimiento, email, cargo, f_ingreso];
        if (campos.some(campo => campo === '')) {
            const modal = new bootstrap.Modal(document.getElementById('modalIncompleto'));
            modal.show();
            return;
        }  

        //Si persona es menor de 18 años, muestra modal
        const edad = calcularEdad(f_nacimiento);
        if ((edad < 18) || (f_ingreso < f_nacimiento)) {
            const modal = new bootstrap.Modal(document.getElementById('modalErrorEdad'));
            modal.show();
            return;
        }
        
        // Verifica si el correo electrónico ya existe en el array
        if (emails.includes(email)) {
            alert('Correo ya existente.');
            return;
        }

        //Muestra modal con datos ingresados
        //-----------------------------------------
        const modalEnvio = new bootstrap.Modal(document.getElementById('modalEnvio'));
        modalEnvio.show();
        document.getElementById("nombremodal").textContent = nombre;
        document.getElementById("apellidosmodal").textContent = apellidos;
        document.getElementById("f_nacimiento_modal").textContent = f_nacimiento;
        document.getElementById("emailmodal").textContent = email;

        // var cargo = document.getElementById('cargo').value; 
        document.getElementById("cargomodal").textContent = cargo;

        // var fechaIngreso = document.getElementById('f_ingreso').value;
        document.getElementById("f_ingreso_modal").textContent = f_ingreso;

        event.preventDefault(); // Evitar que se envíe el formulario
        return false;
    });

    //LISTENER DE BOTON CONFIRMAR EN MODAL DE CONFIRMACION DE DATOS INGRESADOS 
    //-----------------------------------------
    document.getElementById('confirmButton').addEventListener('click', function() { 
        const nombre = document.getElementById('nombremodal').textContent;
        const apellidos = document.getElementById('apellidosmodal').textContent;
        const email = document.getElementById('emailmodal').textContent;
        const cargo = document.getElementById('cargomodal').textContent;
        const f_ingreso = document.getElementById('f_ingreso_modal').textContent;

        emails.push(email);

        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add("col-lg-3", "col-md-4", "col-sm-6", "card-wrapper", "color_modal");

        // cardWrapper.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12", "mb-4", "card-wrapper", "color_modal");
        const userCard = document.createElement('div');
        userCard.classList.add('card-content');
        userCard.innerHTML = `
                <p><strong>${nombre} ${apellidos}</strong></p>
                <p>${email}</p>
                <p>${cargo}</p>
                <p>${f_ingreso}</p>
                <button class="btn btn-danger btn-sm">Eliminar</button>
            `;

        cardWrapper.appendChild(userCard);
        document.getElementById('user-list').appendChild(cardWrapper);
        
        userCard.querySelector('button').addEventListener('click', function() {
            // Cuando se elimina una tarjeta, también se elimina el correo electrónico del array
            const index = emails.indexOf(email);
            if (index !== -1) emails.splice(index, 1);
            cardWrapper.remove();
        });

        document.getElementById('form').reset();
        $('#modalEnvio').modal('hide');

    });


});