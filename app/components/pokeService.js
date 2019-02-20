import Pokepal from "../models/pokepal.js"
import PokeActive from "../models/pokeActive.js"
//private

let _pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Buergel/heroes'
})

let _state = {
  pokeList: [],
  pokeActive: {},
  pokeDex: []
}

let _subscribers = {
  pokeList: [],
  pokeDex: [],
  pokeActive: []
}

function setState(prop, value) {
  _state[prop] = value
  _subscribers[prop].forEach(fn => fn());
}

//public
export default class PokeService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get PokeList() {
    return _state.pokeList.map(p => new Pokepal(p));
  }
  get PokeActive() {
    return new PokeActive(_state.pokeActive)
  }

  get pokeDex() {
    return _state.pokeDex.map(p => new PokeActive(p))
  }

  getPokeData() {
    _pokeApi.get()
      .then(res => {
        let data = res.data.results.map(d => new Pokepal(d))
        setState('pokeList', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  getMyPokeApi() {
    _sandbox.get()
      .then(res => {
        let data = res.data.data.map(p => new PokeActive(p))
        setState('pokeDex', data)
      })

  }

  getDeets(name) {
    _pokeApi.get(name)
      .then(res => {
        let data = new PokeActive(res.data)
        setState('pokeActive', data)
      })
  }



  addPoke() {
    let poke = _state.pokeActive
    _sandbox.post('', poke)
      .then(res => {
        this.getMyPokeApi()
      })


  }

  removeFromTeam(id) {
    debugger
    _sandbox.delete(id)
      .then(res => {
        console.log(res.data)
        this.getMyPokeApi()
      })
      .catch(err => {
        console.error(err)
      })
  }

}


