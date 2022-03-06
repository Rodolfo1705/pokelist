export default class Card {
    pokemon

    constructor(pokemon) {
        this.pokemon = pokemon
    }

    render(element) {
        const divContainer = document.createElement('div')
        divContainer.classList.add('.container')

        const divCard = document.createElement('div')
        divCard.classList.add('card')

        const img = new Image()
        img.src = this.pokemon.imgUrl

        const pPokeId = document.createElement('p')
        pPokeId.innerText = `ID: ${this.pokemon.id}`

        const pName = document.createElement('p')
        pName.innerText = `Nome: ${this.pokemon.name}`

        const aImgUrl = document.createElement('a')
        aImgUrl.innerText = img.src
        aImgUrl.href = img.src
        aImgUrl.target = '_blank'

        divContainer.appendChild(divCard)
        divCard.appendChild(img)
        divCard.appendChild(pPokeId)
        divCard.appendChild(pName)
        divCard.appendChild(aImgUrl)

        element.appendChild(divContainer)

        divCard.onclick = (event) => {
            if (event.target == aImgUrl) return
            this.showDetails()
        }
    }

    async showDetails() {}
}
