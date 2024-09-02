document.addEventListener("DOMContentLoaded", function () {
  // Traemos data del archivo JSON futura base de datos
  fetch("json/recetas.json")
    .then((response) => response.json())
    .then((data) => {
      const recetas = data.recetas;
      /* este div esta en el index.html y va contener todas las recetas de primera vista */
      const container = document.getElementById("recipe-container");

      /* cargamos recorriendo una a una las recetas desde la base de datos JSON */
      recetas.forEach((receta) => {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
                    <div class="card h-100">
                        <img src="${receta.imagen}" class="card-img-top" 
                             alt="${
                               receta.titulo
                             }" data-bs-toggle="modal" data-bs-target="#recipeModal" 
                             data-title="${receta.titulo}" 
                             data-ingredients='${JSON.stringify(
                               receta.ingredientes
                             )}'>
                        <div class="card-body">
                            <h3 class="card-title">${receta.titulo}</h3>
                            <p class="card-text">${receta.descripcion}</p>
                        </div>
                    </div>
                `;
        container.appendChild(card);
      });

      /* Evento para abrir el modal y cargar los ingredientes de cada receta */
      const recipeModal = document.getElementById("recipeModal");
      /* Se agrega un listener para el evento show.bs.modal. 
      Este evento es emitido por Bootstrap cuando el modal está a punto de mostrarse. 
      La función de callback se ejecutará en ese momento. */
      recipeModal.addEventListener("show.bs.modal", function (event) {
        /**event.relatedTarget hace referencia al elemento que activó el modal, en este caso, 
         la imagen de la receta que se hizo clic. */
        const img = event.relatedTarget;
        /**title obtiene el título de la receta del atributo data-title del elemento de la imagen. */
        const title = img.getAttribute("data-title");
        const ingredients = JSON.parse(img.getAttribute("data-ingredients"));

        document.getElementById("recipeModalLabel").textContent = title;

        const listaIngredientes = document.getElementById("ingredients-list");
        const listaPorciones = document.getElementById("weights-list");

        listaIngredientes.innerHTML = "";
        listaPorciones.innerHTML = "";

        ingredients.forEach((item) => {
          const nombreIngrediente = document.createElement("li");
          nombreIngrediente.textContent = item.nombre;
          listaIngredientes.appendChild(nombreIngrediente);

          const porcion = document.createElement("li");
          porcion.textContent = item.peso_por_porcion;
          listaPorciones.appendChild(porcion);
        });
      });
    });
});
