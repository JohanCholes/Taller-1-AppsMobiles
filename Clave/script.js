window.onload = init;

function init() {
  const teclas = document.querySelectorAll(".tecla");
  const inputClave = document.querySelector(".clave");
  const botonEnviar = document.querySelector(".enviar");

  // Inicializar el teclado con números aleatorios
  mezclarTeclado(teclas);

  teclas.forEach((tecla) => {
    // Ocultar el número al pasar el mouse
    tecla.addEventListener("mouseover", () => {
      if (!tecla.classList.contains("borrar") && !tecla.classList.contains("enviar")) {
        ocultarTodosLosNumeros(teclas);
      }
    });

    // Mostrar el número de nuevo al salir del mouse
    tecla.addEventListener("mouseout", () => {
      if (!tecla.classList.contains("borrar") && !tecla.classList.contains("enviar")) {
        mostrarTodosLosNumeros(teclas);
      }
    });

    // Al hacer clic en una tecla
    tecla.addEventListener("click", () => {
      if (tecla.classList.contains("borrar")) {
        // Eliminar el último carácter del campo de texto
        inputClave.value = inputClave.value.slice(0, -1);
        actualizarEstadoBotonEnviar();
      } else if (tecla.classList.contains("enviar")) {
        // Mostrar la clave ingresada en una alerta
        alert(`Clave ingresada: ${inputClave.value}`);
        inputClave.value = ""; // Reiniciar el campo de texto
        actualizarEstadoBotonEnviar();
      } else {

        //MODIFICADO
        // Agregar el valor real al campo de texto si no hay más de 4 caracteres
        if (inputClave.value.length < 4) {
          inputClave.value += tecla.dataset.realValue || tecla.value;
          mezclarTeclado(teclas); // Reorganizar los números
          actualizarEstadoBotonEnviar();
        }
      }
    });
  });

  // MODIFICADO
  // Función para habilitar/deshabilitar el botón Enviar
  function actualizarEstadoBotonEnviar() {
    botonEnviar.disabled = inputClave.value.length !== 4;
  }

  // Función para mezclar el teclado
  function mezclarTeclado(teclas) {
    const numeros = Array.from({ length: 10 }, (_, i) => i); // [0, 1, 2, ..., 9]
    numeros.sort(() => Math.random() - 0.5); // Mezclar números

    // Asignar los números mezclados a las teclas
    let index = 0;
    teclas.forEach((tecla) => {
      if (!tecla.classList.contains("borrar") && !tecla.classList.contains("enviar")) {
        tecla.value = numeros[index];
        tecla.dataset.realValue = numeros[index];
        index++;
      }
    });
  }

  // Función para ocultar todos los números (cambiar por *)
  function ocultarTodosLosNumeros(teclas) {
    teclas.forEach((tecla) => {
      if (!tecla.classList.contains("borrar") && !tecla.classList.contains("enviar")) {
        tecla.dataset.realValue = tecla.value; // Guardar el valor real
        tecla.value = "*"; // Mostrar *
      }
    });
  }

  // Función para restaurar todos los números
  function mostrarTodosLosNumeros(teclas) {
    teclas.forEach((tecla) => {
      if (!tecla.classList.contains("borrar") && !tecla.classList.contains("enviar")) {
        tecla.value = tecla.dataset.realValue; // Restaurar el valor real
      }
    });
  }
}