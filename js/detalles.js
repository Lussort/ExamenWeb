// Muestra detalles del Poke
document.addEventListener("DOMContentLoaded", async () => {
    const pokemonDetails = document.getElementById("pokemonDetails");
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if (name) {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        try {
            const response = await fetch(url);
            const details = await response.json();
            pokemonDetails.innerHTML = `
                <h2>${details.name}</h2>
                <img src="${details.sprites.front_default}" alt="${details.name}">
                <p><strong>Altura:</strong> ${details.height}</p>
                <p><strong>Peso:</strong> ${details.weight}</p>
                <p><strong>Tipos:</strong> ${details.types.map(t => t.type.name).join(", ")}</p>
                <p><strong>Habilidades:</strong> ${details.abilities.map(a => a.ability.name).join(", ")}</p>
            `;
        } catch (error) {
            pokemonDetails.innerHTML = "<p>Error cargando los detalles.</p>";
        }
    } else {
        pokemonDetails.innerHTML = "<p>No se especificó ningún Pokémon.</p>";
    }
});

// Botonmpara regresar
function goBack() {
    window.history.back();
}