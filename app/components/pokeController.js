import PokeService from "./pokeService.js";

//private
let _pokeService = new PokeService()

function drawPokePals() {
  let template = ''
  let pokepals = _pokeService.PokeList
  pokepals.forEach(p => {
    template += p.getTemplate()
  })
  document.getElementById('poke-list').innerHTML = template
}

function drawPokeActive() {
  let poke = _pokeService.PokeActive
  let template = ''
  let button = `<button onclick="app.controllers.pokeController.addPoke()" class="btn btn-primary">Catch 'Em All</button>`
  template = poke.getCard(button)
  document.getElementById('poke-active').innerHTML = template
}

function drawPokeDex() {
  let myPoke = _pokeService.pokeDex
  let template = ''
  myPoke.forEach(p => {
    let button = `<button class="btn btn-danger" onclick="app.controllers.pokeController.removeFromTeam('${p.id}')">Remove From Team</button>`
    template += p.getCard(button)
  })

  document.getElementById('pokedex').innerHTML = template
}

//public
export default class PokeController {
  constructor() {
    _pokeService.addSubscriber('pokeList', drawPokePals)
    _pokeService.addSubscriber('pokeActive', drawPokeActive)
    _pokeService.addSubscriber('pokeDex', drawPokeDex)
    _pokeService.getPokeData()
  }


  getDeets(name) {
    _pokeService.getDeets(name)
  }

  addPoke(name) {
    _pokeService.addPoke()
  }

  removeFromTeam(id) {
    _pokeService.removeFromTeam(id)
  }

}