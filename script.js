const form = document.querySelector("form");

const URL = "https://pokeapi.co/api/v2/pokemon/";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.getElementById("name");
    let response = document.getElementById("content");
    let image = document.getElementById("imgPokemon");

    if (name.value === ""){
        response.innerHTML = "...";
        image.innerHTML = "";
        return 0
    }
    
    fetch(URL + name.value.toLocaleLowerCase())
        .then(resp => resp.json())
        .then(resp => {
            response.innerHTML = buildHtml(resp);
            image.innerHTML = buildImg(resp);
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
        })
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