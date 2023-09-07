const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151;
const limit = 12;
let offset = 0;


function loadPokemonItens(offset, limit) {

    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.pokeType}">
                <span class="number">#${pokemon.pokeId}</span>
                <span class="name">${pokemon.pokeName}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.pokeTypes.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokeId}.png" alt="${pokemon.pokeName}">
                </div>
            </li>
        `}

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHTML
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit) 

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})