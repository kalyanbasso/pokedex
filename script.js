const form = document.querySelector("form");
const left = document.getElementById("left");
const rigth = document.getElementById("rigth");
let pokemonId = null

const URL = "https://pokeapi.co/api/v2/pokemon/";


left.addEventListener('click', (e) => getPokemon(pokemonId - 1));
rigth.addEventListener('click', (e) => getPokemon(pokemonId + 1));

function getPokemon(params) {
    const response = document.getElementById("content");
    const image = document.getElementById("imgPokemon");
    const pokemon = document.getElementById("pokemonId");

    fetch(URL + params)
    .then(resp => resp.json())
    .then(resp => {
        response.innerHTML = buildHtml(resp);
        image.innerHTML = buildImg(resp);
        pokemon.innerHTML = resp.id;
        pokemonId = resp.id;
    })
    .catch(err => {
        let text;
        
        if (err == "SyntaxError: Unexpected token N in JSON at position 0") {
            text = "Pokémon não encontrado!";
        } else {
            console.log(err)
            text = "Erro!";
        }

        response.innerHTML = text;
        image.innerHTML = "";
        pokemon.innerHTML = "0";
        pokemonId = 0;
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name");

    if (name.value === ""){
        response.innerHTML = "...";
        image.innerHTML = "";
        return 0
    }
    
    getPokemon(name.value.toLocaleLowerCase())
})

function buildHtml(data) {
    let name = firstUpperCase(data.name);
    let type = firstUpperCase(data.types[0].type.name);

    return `Nome: ${name} <br> Type: ${type}`;
}

function buildImg(data) {
    let front = data.sprites.front_default;
    let back = data.sprites.back_default;
    return `<img src="${front}"> <img src="${back}">`

}

function firstUpperCase(value) {
    return value[0].toUpperCase() + value.substr(1);
}