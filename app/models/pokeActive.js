export default class PokeActive {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.url = data.url
    this.description = data.description || data.types[0].type.name
    this.img = data.img || data.sprites.front_default
  }

  getCard(button) {
    return `<div class="col-12">
           <div class="card">
             <img class="card-img-top" src="${this.img}">
             <div class="card-body">
               <h5 class="card-title">Name: ${this.name.toUpperCase()}</h5>
               <p class="card-text">Primary Type: ${this.description}</p>
               ${button}
             </div>
           </div>
         </div> `

  }

}
