import Pokemon from './modules/pokemon.js'
import Card from './modules/card.js'

const pokeArray = []

async function populatePokeArray() {
    const names = await getPokemonName()
    const ids = await getPokemonId()
    const imgsUrl = await getPokemonUrlImg()

    for (let i = 0; i < names.length; i++) {
        const pokemon = new Pokemon(names[i], ids[i], imgsUrl[i])
        pokeArray.push(pokemon)

        const card = new Card(pokemon)
        card.render(document.body)
    }
}

async function getPokemonName() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        const data = await response.json()

        return data.results.map((poke) => {
            return poke.name
        })
    } catch (e) {
        console.error(e)
    }
}

async function getPokemonId() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        const data = await response.json()

        return data.results.map((poke) => {
            return poke.url.split('/')[6]
        })
    } catch (e) {
        console.error(e)
    }
}

function getPokemonUrlImg() {
    const imgsUrlArray = []
    for (let i = 1; i <= 100; i++) {
        imgsUrlArray.push(
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
        )
    }
    return imgsUrlArray
}

populatePokeArray()
