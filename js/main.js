document.addEventListener("DOMContentLoaded", function () {

    // Contador de caracteres del formulario de contacto
    const mensaje = document.getElementById("mensaje");
    const contador = document.getElementById("contador");

    if (mensaje && contador) {
        mensaje.addEventListener("input", function () {
            contador.textContent = mensaje.value.length;
        });
    }

    // Formulario de contacto
    const formContacto = document.getElementById("formContacto");

    if (formContacto) {
        formContacto.addEventListener("submit", function (event) {
            event.preventDefault();

            const texto = mensaje.value.trim();

            if (texto.length > 100) {
                document.getElementById("resultadoContacto").textContent =
                    "El mensaje no puede superar 100 caracteres.";
                return;
            }

            document.getElementById("resultadoContacto").textContent =
                "Formulario validado. Para enviar los datos realmente, " +
                "es necesario conectar un servidor.";

            formContacto.reset();

            if (contador) {
                contador.textContent = "0";
            }
        });
    }

    // Comentarios guardados en el navegador actual
    const formComentarios = document.getElementById("formComentarios");
    const listaComentarios = document.getElementById("listaComentarios");

    function obtenerComentarios() {
        try {
            return JSON.parse(
                localStorage.getItem("royalEssenceComentarios") || "[]"
            );
        } catch (error) {
            return [];
        }
    }

    function mostrarComentarios() {
        if (!listaComentarios) return;

        listaComentarios.replaceChildren();

        const comentarios = obtenerComentarios();

        if (comentarios.length === 0) {
            const p = document.createElement("p");
            p.textContent = "Todavía no hay comentarios.";
            listaComentarios.appendChild(p);
            return;
        }

        comentarios.slice().reverse().forEach(function (comentario) {
            const article = document.createElement("article");
            article.className = "comentario";

            const nombre = document.createElement("h3");
            nombre.textContent = comentario.nombre;

            const texto = document.createElement("p");
            texto.textContent = comentario.texto;

            const fecha = document.createElement("small");
            fecha.textContent = comentario.fecha;

            article.append(nombre, texto, fecha);
            listaComentarios.appendChild(article);
        });
    }

    if (formComentarios) {
        mostrarComentarios();

        formComentarios.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombre = formComentarios.elements.nombre.value.trim();
            const texto = formComentarios.elements.comentario.value.trim();

            if (!nombre || !texto) return;

            const comentarios = obtenerComentarios();

            comentarios.push({
                nombre: nombre,
                texto: texto,
                fecha: new Date().toLocaleString("es-CO")
            });

            try {
                // Conserva los 100 comentarios más recientes
                localStorage.setItem(
                    "royalEssenceComentarios",
                    JSON.stringify(comentarios.slice(-100))
                );

                document.getElementById("resultadoComentario").textContent =
                    "Comentario guardado en este navegador.";

                formComentarios.reset();
                mostrarComentarios();

            } catch (error) {
                document.getElementById("resultadoComentario").textContent =
                    "No se pudo guardar el comentario.";
            }
        });
    }

    

        });
    

   


