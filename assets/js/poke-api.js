
const pokeApi = {}

function ConvertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.pokeId = pokeDetail.id
    pokemon.pokeName = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.pokeTypes = types
    pokemon.pokeType = type
    
    return pokemon
}


pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(ConvertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 12) => {

    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    
    // busca a lista
    return fetch(url)
        .then ((response) => response.json()) //response através de um json
        .then ((jsonBody) => jsonBody.results) // lista de pokemons
        .then ((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) // lista mapeada em uma lista em detalhes dos pokemons .json
        .then ((detailRequests) => Promise.all(detailRequests)) // lista com os detalhes .json
        .then ((pokemonDetails) => pokemonDetails)
}