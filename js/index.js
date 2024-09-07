// Se ejecuta cuando todo el contenido de la página ha sido cargado
document.addEventListener("DOMContentLoaded", function () {
  // Fetch para obtener los datos del archivo recetas.json
  fetch("json/recetas.json")
    .then((response) => response.json()) // Parsear la respuesta en JSON
    .then((data) => {
      const recetas = data.recetas; // Almacenar las recetas obtenidas
      const container = document.getElementById("recipe-container"); // Contenedor donde se insertarán las tarjetas de recetas

      // Iterar sobre las recetas para generar tarjetas dinámicas
      recetas.forEach((receta) => {
        const card = document.createElement("div"); // Crear un div para cada tarjeta de receta
        card.className = "col"; // Agregar la clase CSS para las columnas
        card.innerHTML = `
                    <div class="card h-100">
                        <img src="${receta.imagen}" class="card-img-top" 
                             alt="${receta.titulo}" data-bs-toggle="modal" 
                             data-bs-target="#recipeModal" 
                             data-title="${receta.titulo}" 
                             data-ingredients='${JSON.stringify(
                               receta.ingredientes
                             )}'>
                        <div class="card-body">
                            <h3 class="card-title">${receta.titulo}</h3>
                        </div>
                    </div>
                `; // Generar el HTML de la tarjeta de receta
        container.appendChild(card); // Agregar la tarjeta generada al contenedor
      });

      /* Evento para abrir el modal y cargar los ingredientes de cada receta */
      const recipeModal = document.getElementById("recipeModal");

      recipeModal.addEventListener("show.bs.modal", function (event) {
        const img = event.relatedTarget; // Obtener la imagen que disparó el modal
        const title = img.getAttribute("data-title"); // Obtener el título de la receta
        const ingredients = JSON.parse(img.getAttribute("data-ingredients")); // Obtener los ingredientes en formato JSON

        document.getElementById("recipeModalLabel").textContent = title; // Actualizar el título del modal

        // Obtener las listas de ingredientes y pesos por porción
        const listaIngredientes = document.getElementById("ingredients-list");
        const listaPorciones = document.getElementById("weights-list");
        const inputComensales = document.getElementById("comensales-input");

        // Limpiar las listas antes de mostrar nueva información
        listaIngredientes.innerHTML = "";
        listaPorciones.innerHTML = "";

        let porcionesOriginales = []; // Array para almacenar las porciones originales de los ingredientes

        // Iterar sobre los ingredientes y agregar cada uno a la lista
        ingredients.forEach((item, index) => {
          // Crear y agregar el nombre del ingrediente a la lista
          const nombreIngrediente = document.createElement("li");
          nombreIngrediente.textContent = item.nombre;
          listaIngredientes.appendChild(nombreIngrediente);

          // Crear y agregar el peso por porción del ingrediente a la lista
          const porcion = document.createElement("li");
          porcion.textContent = item.peso_por_porcion;
          listaPorciones.appendChild(porcion);

          // Almacenar la porción original para futuros cálculos
          porcionesOriginales.push(item.peso_por_porcion);
        });

        // Evento para actualizar las porciones según la cantidad de comensales
        inputComensales.addEventListener("input", function () {
          const cantidadComensales = parseInt(inputComensales.value, 10); // Obtener el número de comensales del input

          listaPorciones.innerHTML = ""; // Limpiar la lista de porciones para recalcular

          // Iterar sobre los ingredientes y recalcular el peso por porción según la cantidad de comensales
          ingredients.forEach((item, index) => {
            const nuevaPorcion =
              porcionesOriginales[index] * cantidadComensales; // Calcular la nueva porción
            const porcion = document.createElement("li");

            // Usamos parseFloat para eliminar los ceros innecesarios
            porcion.textContent = parseFloat(nuevaPorcion.toFixed(2));

            listaPorciones.appendChild(porcion); // Agregar la nueva porción a la lista
          });
        });
      });
    });
});
