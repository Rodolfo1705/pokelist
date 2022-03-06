export default class Card {
    pokemon

    constructor(pokemon) {
        this.pokemon = pokemon
    }

    render(element) {
        const div = document.createElement('div')
        div.classList.add('card')

        const img = new Image()
        img.src = this.pokemon.imgUrl

        const pPokeId = document.createElement('p')
        pPokeId.innerText = `ID: ${this.pokemon.id}`

        const pName = document.createElement('p')
        pName.innerText = `Nome: ${this.pokemon.name}`

        const pImgUrl = document.createElement('p')
        pImgUrl.innerText = img.src

        div.appendChild(img)
        div.appendChild(pPokeId)
        div.appendChild(pName)
        div.appendChild(pImgUrl)

        element.appendChild(div)
    }
}
