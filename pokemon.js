document.getElementById("search-btn").addEventListener("click", () => { 
    const pokemonName = document.getElementById("pokemon-input").value.toLowerCase().trim();

    if (pokemonName === "") {
        alert("Por favor, ingresa el nombre de un Pokémon. ( T.T )");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon no encontrado. ( >.< )");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("pokemon-image").src = data.sprites.front_default;
            document.getElementById("pokemon-name").textContent = `Nombre: ${data.name}`;
            document.getElementById("base-experience").textContent = `Experiencia base: ${data.base_experience}`;
            document.getElementById("height").textContent = `Altura: ${data.height / 10} m`;
            document.getElementById("weight").textContent = `Peso: ${data.weight / 10} kg`;

            highlightIfFilled("pokemon-name");
            highlightIfFilled("base-experience");
            highlightIfFilled("height");
            highlightIfFilled("weight");
            

            const abilitiesList = data.abilities.map(ability => {
                return `<p>${ability.ability.name}</p>`;
            }).join("");

            document.getElementById("abilities-list").innerHTML = abilitiesList;
          
            highlightIfFilled("abilities-list");
          
        })
        .catch(error => {
            alert(error.message);
            resetPokemonInfo();
        });
});

function highlightIfFilled(elementId) {
    const element = document.getElementById(elementId);
    if (element.textContent.trim() !== "") {
        element.classList.add("highlight");
    } else {
        element.classList.remove("highlight");
    }
}

function resetPokemonInfo() {
    document.getElementById("pokemon-image").src = "image.png";
    document.getElementById("pokemon-name").textContent = "";
    document.getElementById("abilities-list").innerHTML = "";
    document.getElementById("base-experience").textContent = "";
    document.getElementById("height").textContent = "";
    document.getElementById("weight").textContent = "";

    document.getElementById("base-experience").classList.remove("highlight");
    document.getElementById("height").classList.remove("highlight");
    document.getElementById("weight").classList.remove("highlight");
    document.getElementById("abilities-list").classList.remove("highlight");
    document.getElementById("pokemon-name").classList.remove("highlight");
}
