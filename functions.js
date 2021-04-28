const url = 'https://pokeapi.co/api/v2/pokemon/?limit=200'
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
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then(resp=>resp.json())
        .then(resp2=>{
            newPokeCard.children[1].children[1].src = resp2.sprites.front_default
        })
        pokeLista.appendChild(newPokeCard)
    })
})

document.querySelectorAll('.pokeCard').forEach(card=>{
    card.addEventListener('click',()=>{
        alert('teste')      
    })
})


