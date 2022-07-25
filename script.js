document.getElementById("checkbtn").addEventListener("click", (e) => {
    e.preventDefault();
    
    let pokemon = document.getElementById("searchPokemon");
    let pokemonLower = pokemon.value = pokemon.value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonLower}`).then(data => {
        return data.json();
    }).then(final => {

        let species = fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonLower}`);
        species.then(x => {
            return x.json();
        }).then(gen => {
                
            let display = document.getElementById("card");
            let type = "";  
            let abilities = "";
            let generation = gen.generation.name;
            console.log(generation);
            // console.log(gen)
    
            if (pokemonLower == "") {
                alert("Type pokemon names");
            }
            else {

                for(let i = 0; i < final.types.length; i++) {
                    let typeList = final.types[i].type.name;
                    type += `<li> ${typeList} </li>`;
                }
                for(let i = 0; i < final.abilities.length; i++) {
                    let abilitiesList = final.abilities[i].ability.name;
                    abilities += `<li> ${abilitiesList} </li>`
                }
                
                display.innerHTML += `
                <div class="card">
                    <img src="${final.sprites.other['official-artwork'].front_default}" class="card-img-top p-3" alt="${final.name}">
                    <div class="card-body p-3">
                        <h5 class="card-title text-center">${final.name}</h5>
                        <h6 class="card-title">Abilities</h6>
                        <p class="card-text mb-1" id="abilities">${abilities}</p>
                        <h6 class="card-title">Type</h6>
                        <p class="card-text mb-1" id="types">${type}</p>
                        <p class="card-text mb-1" id="types">${generation}</p>
                    </div>
                </div>`
            }
            console.log(final);
        })}).catch(err => {
            alert("Not Found");
        console.log("Error: ", err);
    });

    document.getElementById("searchPokemon").value = "";

});