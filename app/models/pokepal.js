export default class Pokepal {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.url = data.url
    // this.description = data.description || data.types[0].type.name
    // this.img = data.img || data.sprites.front_default
  }

  getTemplate() {
    return ` <p onclick="app.controllers.pokeController.getDeets('${this.name}')">${this.name.toUpperCase()}</p> 
    `
  }

}
















