$(function () {
   $("#buscar").click(e=>{
      var idPokemon = $("#poke-id").val();
      //validacion
      console.log(idPokemon);
      traerPersonaje(idPokemon);

   })
});

traerPersonaje = (id) =>{
    $.ajax({
        type: "GET",
        url:  `https://pokeapi.co/api/v2/pokemon/${id}/`,
        success: function (response) {
            console.log("response ", response);
            //imprimir data
                $("#pokemon-card").empty(generarCard(response));
                $("#pokemon-card").append(generarCard(response));
            
            
           
           
        }
    });
}

generarCard = (personaje) => {
    var card = `
    <div class="card horizontal">
      <div class="card-image">
      <img class="foto-poke" src="${personaje.sprites.front_default}">
      
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <p><span>Altura: &nbsp;</span>${personaje.height}</p>
        <p><span>Peso: &nbsp;</span>${personaje.weight}</p>
        <p><span>Tipo: &nbsp;</span>${personaje.types[0].type.name}</p>
        <p><span>Habilidad: &nbsp;</span>${personaje.abilities[0].ability.name}</p>
        </div>
        <div class="card-action">
          <h4>${personaje.name}</h4>
        </div>
      </div>
    </div>`

    return card;
}