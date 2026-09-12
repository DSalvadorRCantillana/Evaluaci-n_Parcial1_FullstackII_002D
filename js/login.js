const formularioLogin = document.getElementById("formulario-login");
const correoLogin = document.getElementById("correo-login");
const contrasenaLogin = document.getElementById("contrasena-login");
const mensajeLogin = document.getElementById("mensaje-login");

function mostrarErrorLogin(campo, idMensaje, mensaje) {
    document.getElementById(idMensaje).textContent = mensaje;
    campo.classList.add("campo-error");
}

function limpiarErrorLogin(campo, idMensaje) {
    document.getElementById(idMensaje).textContent = "";
    campo.classList.remove("campo-error");
}

formularioLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let formularioValido = true;

    mensajeLogin.textContent = "";
    mensajeLogin.classList.remove("mensaje-exito", "mensaje-error");

    const correoIngresado =
        correoLogin.value.trim().toLowerCase();

    const dominioValido =
        correoIngresado.endsWith("@duoc.cl") ||
        correoIngresado.endsWith("@profesor.duoc.cl") ||
        correoIngresado.endsWith("@gmail.com");

    if (correoIngresado === "") {
        mostrarErrorLogin(
            correoLogin,
            "error-correo-login",
            "El correo electrónico es obligatorio."
        );

        formularioValido = false;
    } else if (!dominioValido) {
        mostrarErrorLogin(
            correoLogin,
            "error-correo-login",
            "Utiliza un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );

        formularioValido = false;
    } else {
        limpiarErrorLogin(
            correoLogin,
            "error-correo-login"
        );
    }

    if (contrasenaLogin.value === "") {
        mostrarErrorLogin(
            contrasenaLogin,
            "error-contrasena-login",
            "La contraseña es obligatoria."
        );

        formularioValido = false;
    } else if (contrasenaLogin.value.length < 10) {
        mostrarErrorLogin(
            contrasenaLogin,
            "error-contrasena-login",
            "La contraseña debe tener al menos 10 caracteres."
        );

        formularioValido = false;
    } else {
        limpiarErrorLogin(
            contrasenaLogin,
            "error-contrasena-login"
        );
    }

    if (formularioValido) {
        const usuariosRegistrados =
            JSON.parse(localStorage.getItem("usuariosGourmetHub")) || [];

        const usuarioValido = usuariosRegistrados.some(function (usuario) {
            return (
                usuario.correo === correoIngresado &&
                usuario.contrasena === contrasenaLogin.value
            );
        });

        if (usuarioValido) {
            mensajeLogin.textContent =
                "Inicio de sesión realizado correctamente.";
            mensajeLogin.classList.add("mensaje-exito");

            formularioLogin.reset();
        } else {
            mensajeLogin.textContent =
                "Correo o contraseña incorrectos.";
            mensajeLogin.classList.add("mensaje-error");
        }
    }
});