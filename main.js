import Pokemon from './modules/pokemon.js'
import Card from './modules/card.js'

const pokeArray = []
const divContainer = document.querySelector('div.container')
const divContainerTypes = document.querySelector('div.container.types')
const toggleButton = document.querySelector('header button')

toggleButton.onclick = () => {
    toggleButton.classList.toggle('selected')
    if (toggleButton.classList.contains('selected')) {
        divContainer.classList.add('hidden')
        divContainerTypes.classList.remove('hidden')
    } else {
        divContainer.classList.remove('hidden')
        divContainerTypes.classList.add('hidden')
    }
}

async function populatePokeArray() {
    const names = await getPokemonName()
    const ids = await getPokemonId()
    const imgsUrl = await getPokemonUrlImg()

    for (let i = 0; i < names.length; i++) {
        const pokemon = new Pokemon(names[i], ids[i], imgsUrl[i])
        pokeArray.push(pokemon)

        const card = new Card(pokemon)
        card.render(divContainer)
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
await populatePokeArray()

//bonus function
async function generateGroupedPokemon(element) {
    async function populatePokeTypes() {
        for (let i = 0; i < pokeArray.length; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeArray[i].id}`)
            const data = await response.json()

            pokeArray[i].types = data.types
        }
    }

    function generateTypesArray() {
        const types = []

        pokeArray.forEach((pokemon) => {
            pokemon.types.forEach(({ type }) => {
                types.push(type.name)
            })
        })

        //set class is for an array that doesn't have elements with repeated values
        return [...new Set(types)]
    }

    function getPokemonOfType(type) {
        return (
            pokeArray.filter((pokemon) => {
                return pokemon.types[0].type.name == type
            }) ?? []
        )
    }

    function renderTypesContainer() {
        for (const type of typesArray) {
            const pokemonsOfType = getPokemonOfType(type)
            if (pokemonsOfType.length == 0) continue

            const typeWrapper = document.createElement('div')
            typeWrapper.classList.add('type-wrapper')

            const wrapperHeader = document.createElement('div')
            wrapperHeader.classList.add('wrapper-header')
            wrapperHeader.textContent = type

            const wrapperContent = document.createElement('div')
            wrapperContent.classList.add('wrapper-content')

            typeWrapper.appendChild(wrapperHeader)
            typeWrapper.appendChild(wrapperContent)

            pokemonsOfType.forEach((pokemon) => {
                const pokemonInstance = new Pokemon(pokemon.name, pokemon.id, pokemon.imgUrl)
                const cardInstance = new Card(pokemonInstance)
                cardInstance.render(wrapperContent)
            })

            element.appendChild(typeWrapper)
        }
    }

    await populatePokeTypes()
    const typesArray = generateTypesArray()
    renderTypesContainer()
}

generateGroupedPokemon(divContainerTypes)
