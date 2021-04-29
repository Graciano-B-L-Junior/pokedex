const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151'
let dados
async function geraPokeCard() {
    let req = await fetch(url)
    let rep = await req.json()
    return rep.results
}

dados = geraPokeCard()

dados.then(pokeCard => {
    let pokeLista = document.querySelector('.pokemonLista')
    let card = document.querySelector('.pokeCard')
    //card.children[1].children[0].innerHTML="Pichu"
    pokeCard.forEach(pokemon => {
        let newPokeCard = card.cloneNode(true)
        newPokeCard.children[1].children[0].innerHTML = `${pokemon.name}`
        newPokeCard.children[1].children[0].setAttribute('pokemonNome', pokemon.name)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then(resp => resp.json())
            .then(resp2 => {
                newPokeCard.children[1].children[1].src = resp2.sprites.front_default
            })
        pokeLista.appendChild(newPokeCard)
    })
})
.then(adicionEvento => {
    document.querySelectorAll('.pokeCard').forEach(card => {
        card.addEventListener('click', () => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${card.children[1].children[0].getAttribute('pokemonNome')}`)
                .then(resp => resp.json())
                .then(resp2 => {
                    const img = document.querySelector('img[pokemon]')
                    img.src = resp2.sprites.front_default
                    const nome = document.querySelector('[pokeName]')
                    nome.innerHTML = card.children[1].children[0].getAttribute('pokemonNome')
                    const id = document.querySelector('[pokeId]')
                    id.innerHTML = resp2.id
                    const weight = document.querySelector('[pokeWeight]')
                    weight.innerHTML = resp2.weight
                    const move = document.querySelector('.info2').cloneNode(true)
                    const pokemonInfo = document.querySelector('.pokemonInfo')
                    document.querySelectorAll('.info').forEach(e => {
                        e.style.display = 'block'
                    })
                    if (document.querySelectorAll('.info2').length >= 1) {
                        document.querySelectorAll('.info2').forEach(e => {
                            e.remove()
                        })
                    }
                    for (let i = 0; i <= 3; i++) {
                        if (resp2.moves[i] != undefined) {
                            let newMove = move.cloneNode(true)
                            newMove.children[0].innerHTML = `Move ${i + 1}:`
                            newMove.children[1].innerHTML = resp2.moves[i].move.name
                            newMove.style.display = 'block'
                            pokemonInfo.appendChild(newMove)
                        }
                    }
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
                })

        })
    })
})


