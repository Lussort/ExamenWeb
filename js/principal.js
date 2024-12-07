// Carga y mostrar la lista de Pokémon
document.addEventListener("DOMContentLoaded", () => {
    const pokemonList = document.getElementById("pokemonList");
    const searchBox = document.getElementById("searchBox");
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");

    let currentPage = 1;
    const limit = 20;
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // lista de Pokemon
    const fetchPokemon = async (page) => {
        const offset = (page - 1) * limit;
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayPokemon(data.results);
        } catch (error) {
            console.error("Error obteniendo datos:", error);
        }
    };

    // mostrar pokeon
    const displayPokemon = (pokemonArray) => {
        pokemonList.innerHTML = "";
        pokemonArray.forEach(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            const card = document.createElement("div");
            card.className = "pokemon-card";
            const isFavorite = favorites.some(fav => fav.name === details.name);
            card.innerHTML = `
                <img src="${details.sprites.front_default}" alt="${details.name}">
                <h3>${details.name}</h3>
                <button class="favorite-btn" data-name="${details.name}" data-img="${details.sprites.front_default}">
                    ${isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                </button>
            `;
            card.querySelector(".favorite-btn").addEventListener("click", (e) => {
                e.stopPropagation();
                toggleFavorite(details.name, details.sprites.front_default);
                fetchPokemon(currentPage);
            });
            card.addEventListener("click", () => {
                window.location.href = `detalles.html?name=${details.name}`;
            });
            pokemonList.appendChild(card);
        });
    };

    //  favoritos
    const toggleFavorite = (name, img) => {
        const index = favorites.findIndex(fav => fav.name === name);
        if (index === -1) {
            favorites.push({ name, img });
        } else {
            favorites.splice(index, 1);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };


    prevPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchPokemon(currentPage);
        }
    });

    nextPageButton.addEventListener("click", () => {
        currentPage++;
        fetchPokemon(currentPage);
    });

    // Busqueda
    searchBox.addEventListener("input", async (e) => {
        const query = e.target.value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
        if (query) {
            try {
                const response = await fetch(url);
                const details = await response.json();
                pokemonList.innerHTML = "";
                const card = document.createElement("div");
                card.className = "pokemon-card";
                const isFavorite = favorites.some(fav => fav.name === details.name);
                card.innerHTML = `
                    <img src="${details.sprites.front_default}" alt="${details.name}">
                    <h3>${details.name}</h3>
                    <button class="favorite-btn" data-name="${details.name}" data-img="${details.sprites.front_default}">
                        ${isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                    </button>
                `;
                card.querySelector(".favorite-btn").addEventListener("click", (e) => {
                    e.stopPropagation();
                    toggleFavorite(details.name, details.sprites.front_default);
                });
                card.addEventListener("click", () => {
                    window.location.href = `detalles.html?name=${details.name}`;
                });
                pokemonList.appendChild(card);
            } catch (error) {
                pokemonList.innerHTML = "<p>No se encontró ningún Pokémon.</p>";
            }
        } else {
            fetchPokemon(currentPage);
        }
    });

    // Inicia con la pagina uno
    fetchPokemon(currentPage);
});