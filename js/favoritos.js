// Mostrar foavoritos


document.addEventListener("DOMContentLoaded", () => {
    const favoritesList = document.getElementById("favoritesList");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length > 0) {
        favorites.forEach((pokemon) => {
            const card = document.createElement("div");
            card.className = "pokemon-card";
            card.innerHTML = `
                <img src="${pokemon.img}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
            `;
            favoritesList.appendChild(card);
        });
    } else {
        favoritesList.innerHTML = "<p>No tienes favoritos aún.</p>";
    }
});