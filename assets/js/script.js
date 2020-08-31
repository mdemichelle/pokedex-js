
$(function () {
   $("#buscar").click(e=>{
      buscarPersonaje();
     
   });

   $(document).keypress(e => { 
     if(e.which == 13){
      buscarPersonaje();
     }
   });
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
    //Grafico
    var hp =  personaje.stats[0].base_stat;
    var atk = personaje.stats[1].base_stat;
    var def = personaje.stats[2].base_stat;
    var sat = personaje.stats[3].base_stat;
    var sdf = personaje.stats[4].base_stat;
    var spd = personaje.stats[5].base_stat;
    var pokest = [];
     pokest.push(hp, atk, def, sat, sdf, spd);
     


      var chart = new CanvasJS.Chart("pokemon-grafico", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title:{
          text: "Gráfico Pokémon"
        },
        data: [
        {
          // Change type to "bar", "area", "spline", "pie",etc.
          type: "column",
          dataPoints: [
            { label: "HP",  y:parseFloat(hp)  },
            { label: "Ataque", y: parseFloat(atk)  },
            { label: "Defensa", y: parseFloat(def) },
            { label: "Ataque Especial",  y: parseFloat(sat) },
            { label: "Defensa Especial",  y: parseFloat(sdf)  },
            { label: "Velocidad",  y: parseFloat(spd)  }
          ]
        }
        ]
      });
      chart.render();
    return card;
};


 
 

  validacion = (id) =>{
    var expresion = /^\d{1,3}$/;

    if(!expresion.test(id)){
      alert("invalido");
      $("poke-id").focus();
      return false;
    }
      return true;
  }

  buscarPersonaje = () =>{
    var idPokemon = $("#poke-id").val();
        //validacion
        if(validacion(idPokemon) || idPokemon<807 || idPokemon>0){
          traerPersonaje(idPokemon);
         
          $("#poke-id").val("");
          $("#poke-id").focus();
          
        }
  }


   
  
  

  