const formulario = document.getElementById("formulario-registro");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById(
    "confirmar-contrasena"
);

const botonAgregarReceta = document.getElementById("agregar-receta");
const contenedorRecetas = document.getElementById("contenedor-recetas");
const mensajeExito = document.getElementById("mensaje-exito");
const restriccionNinguna = document.getElementById(
    "restriccion-ninguna"
);

let cantidadRecetas = 0;

function mostrarError(campo, idMensaje, mensaje) {
    document.getElementById(idMensaje).textContent = mensaje;
    campo.classList.add("campo-error");
}

function limpiarError(campo, idMensaje) {
    document.getElementById(idMensaje).textContent = "";
    campo.classList.remove("campo-error");
}

function agregarReceta() {
    cantidadRecetas = cantidadRecetas + 1;

    const nuevaReceta = document.createElement("div");
    nuevaReceta.classList.add("receta-item");

    nuevaReceta.innerHTML = `
        <h3>Receta o curso ${cantidadRecetas}</h3>

        <label for="categoria-${cantidadRecetas}">
            Categoría *
        </label>

        <select
            id="categoria-${cantidadRecetas}"
            class="categoria-receta"
        >
            <option value="">Seleccione una categoría</option>
            <option value="Pastelería">Pastelería</option>
            <option value="Cocina Italiana">
                Cocina Italiana
            </option>
            <option value="Repostería">Repostería</option>
            <option value="Cocina Oriental">
                Cocina Oriental
            </option>
            <option value="Barismo">Barismo</option>
        </select>

        <div class="opciones-nivel">
            <p>Nivel de experiencia *</p>

            <label>
                <input
                    type="radio"
                    name="nivel-${cantidadRecetas}"
                    value="Principiante"
                >
                Principiante
            </label>

            <label>
                <input
                    type="radio"
                    name="nivel-${cantidadRecetas}"
                    value="Intermedio"
                >
                Intermedio
            </label>

            <label>
                <input
                    type="radio"
                    name="nivel-${cantidadRecetas}"
                    value="Avanzado"
                >
                Avanzado
            </label>
        </div>

        <button type="button" class="boton-eliminar">
            Eliminar
        </button>

        <small class="mensaje-error error-receta"></small>
    `;

    const botonEliminar = nuevaReceta.querySelector(
        ".boton-eliminar"
    );

    botonEliminar.addEventListener("click", function () {
        nuevaReceta.remove();
    });

    contenedorRecetas.appendChild(nuevaReceta);
}

restriccionNinguna.addEventListener("change", function () {
    const restricciones = document.querySelectorAll(
        'input[name="restricciones"]'
    );

    if (restriccionNinguna.checked) {
        restricciones.forEach(function (restriccion) {
            if (restriccion !== restriccionNinguna) {
                restriccion.checked = false;
            }
        });
    }
});

const restricciones = document.querySelectorAll(
    'input[name="restricciones"]'
);

restricciones.forEach(function (restriccion) {
    restriccion.addEventListener("change", function () {
        if (
            restriccion !== restriccionNinguna &&
            restriccion.checked
        ) {
            restriccionNinguna.checked = false;
        }
    });
});

botonAgregarReceta.addEventListener("click", agregarReceta);

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let formularioValido = true;
    mensajeExito.textContent = "";

    const patronNombre =
        /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$/;

    if (nombre.value.trim().length < 3) {
        mostrarError(
            nombre,
            "error-nombre",
            "El nombre debe tener al menos 3 caracteres."
        );

        formularioValido = false;
    } else if (!patronNombre.test(nombre.value.trim())) {
        mostrarError(
            nombre,
            "error-nombre",
            "El nombre solo puede contener letras y espacios."
        );

        formularioValido = false;
    } else {
        limpiarError(nombre, "error-nombre");
    }

    const correoIngresado = correo.value.trim().toLowerCase();

    if (correoIngresado === "") {
        mostrarError(
            correo,
            "error-correo",
            "El correo electrónico es obligatorio."
        );

        formularioValido = false;
    } else if (!correoIngresado.endsWith("@duoc.cl")) {
        mostrarError(
            correo,
            "error-correo",
            "Debes utilizar un correo terminado en @duoc.cl."
        );

        formularioValido = false;
    } else {
        limpiarError(correo, "error-correo");
    }

    const textoContrasena = contrasena.value;
    const mayusculas = textoContrasena.match(/[A-ZÁÉÍÓÚÑ]/g);
    const minusculas = textoContrasena.match(/[a-záéíóúñ]/g);
    const numeros = textoContrasena.match(/[0-9]/g);
    const simbolos = textoContrasena.match(/[!#$%]/g);

    let cantidadMayusculas = 0;
    let cantidadMinusculas = 0;
    let cantidadNumeros = 0;
    let cantidadSimbolos = 0;

    if (mayusculas !== null) {
        cantidadMayusculas = mayusculas.length;
    }

    if (minusculas !== null) {
        cantidadMinusculas = minusculas.length;
    }

    if (numeros !== null) {
        cantidadNumeros = numeros.length;
    }

    if (simbolos !== null) {
        cantidadSimbolos = simbolos.length;
    }

    if (textoContrasena.length < 10) {
        mostrarError(
            contrasena,
            "error-contrasena",
            "La contraseña debe tener como mínimo 10 caracteres."
        );

        formularioValido = false;
    } else if (cantidadMayusculas < 2) {
        mostrarError(
            contrasena,
            "error-contrasena",
            "La contraseña debe contener dos letras mayúsculas."
        );

        formularioValido = false;
    } else if (cantidadMinusculas < 1) {
        mostrarError(
            contrasena,
            "error-contrasena",
            "La contraseña debe contener una letra minúscula."
        );

        formularioValido = false;
    } else if (cantidadNumeros < 1) {
        mostrarError(
            contrasena,
            "error-contrasena",
            "La contraseña debe contener un número."
        );

        formularioValido = false;
    } else if (cantidadSimbolos < 1) {
        mostrarError(
            contrasena,
            "error-contrasena",
            "La contraseña debe contener !, #, $ o %."
        );

        formularioValido = false;
    } else {
        limpiarError(contrasena, "error-contrasena");
    }

    if (confirmarContrasena.value === "") {
        mostrarError(
            confirmarContrasena,
            "error-confirmar-contrasena",
            "Debes repetir la contraseña."
        );

        formularioValido = false;
    } else if (
        confirmarContrasena.value !== contrasena.value
    ) {
        mostrarError(
            confirmarContrasena,
            "error-confirmar-contrasena",
            "Las contraseñas no coinciden."
        );

        formularioValido = false;
    } else {
        limpiarError(
            confirmarContrasena,
            "error-confirmar-contrasena"
        );
    }

    const restriccionesSeleccionadas =
        document.querySelectorAll(
            'input[name="restricciones"]:checked'
        );

    if (restriccionesSeleccionadas.length === 0) {
        document.getElementById(
            "error-restricciones"
        ).textContent =
            "Debes seleccionar una restricción o la opción Ninguna.";

        formularioValido = false;
    } else {
        document.getElementById(
            "error-restricciones"
        ).textContent = "";
    }

    const recetas = document.querySelectorAll(".receta-item");

    if (recetas.length === 0) {
        document.getElementById(
            "error-recetas"
        ).textContent =
            "Debes agregar al menos una receta o curso.";

        formularioValido = false;
    } else {
        document.getElementById(
            "error-recetas"
        ).textContent = "";

        recetas.forEach(function (receta) {
            const categoria = receta.querySelector(
                ".categoria-receta"
            );

            const nivelSeleccionado = receta.querySelector(
                'input[type="radio"]:checked'
            );

            const errorReceta = receta.querySelector(
                ".error-receta"
            );

            if (
                categoria.value === "" ||
                nivelSeleccionado === null
            ) {
                errorReceta.textContent =
                    "Selecciona una categoría y un nivel.";

                formularioValido = false;
            } else {
                errorReceta.textContent = "";
            }
        });
    }

    if (formularioValido) {
        const usuariosRegistrados =
            JSON.parse(localStorage.getItem("usuariosGourmetHub")) || [];

        usuariosRegistrados.push({
            nombre: nombre.value.trim(),
            correo: correoIngresado,
            contrasena: contrasena.value
        });

        localStorage.setItem(
            "usuariosGourmetHub",
            JSON.stringify(usuariosRegistrados)
        );

        mensajeExito.textContent =
            "Registro realizado correctamente.";

        formulario.reset();
        contenedorRecetas.innerHTML = "";
        cantidadRecetas = 0;
        agregarReceta();
    }
});


agregarReceta();