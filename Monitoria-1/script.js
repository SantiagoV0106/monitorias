// Como interactuamos con el DOM (Document Object Model) básicamente, con los elementos HTML de nuestro proyecto

const titulo = document.querySelector("h1"); // Selecciona el primer <h1>
const boton = document.querySelector("#miBoton"); // Selecciona el primer elemento con id "miBoton"
const tarjeta = document.querySelector(".card"); // Selecciona el primer elemento con clase "card"

const botones = document.querySelectorAll(".btn"); // Selecciona TODOS los elementos con clase "btn"
const container = document.getElementById("contenedor"); // Selecciona el elemento con id "contenedor"

const tarjetas = document.getElementsByClassName("card"); // Selecciona todos los elementos con clase "card"

// --------------------------------------------------------------------------------------------------------------


// Los arreglos son una "colección de elementos" siempre tendrán el mismo orden. 
// El orden se conoce como index, el primer elemento siempre tendrá un index 0

// En este caso:
//  const nombreVariable = [index[0], index[1], index[2]...]
const pokemons = ['Bulbasaur', 'Charmander', 'Squirtle']

// Métodos para recorrer un arreglo:
for (let i = 1; i < pokemons.length; i++) {
    const pokemon = pokemons[i];
    console.log(pokemon);
    
}

pokemons.forEach(pokemon => {
    // console.log(pokemon);
});

pokemons.map((pokemon) => {
    // console.log(pokemon)
})

// --------------------------------------------------------------------------------------------------------------

// Métodos de validación
let numero = 1

// if (condición)
if (numero === 1) {
    // console.log(`${numero} es igual a 1`);
}
// if else
if (numero === 2) {
     console.log(`${numero} es igual a 1`);

} else {
    console.log(`${numero} no es igual a 1`);
}

// Validación ternaria - condición ? si es verdadero : si es falso;
numero === 1 ? console.log('Sí') : console.log('No');

// --------------------------------------------------------------------------------------------------------------

// Pokedex es un objeto, los objetos son un tipo de dato, se componen de una clave (key) y un valor (value), los valores pueden ser cualquier elemento, incluso otro objeto o arreglo
const pokedex = [
    {
        name: 'Bulbasaur',
        type: 'water',
        sats: [{
            defensa: 1,
            ataque: 2,
            bloqueo: 3
        }]
    },
    {
        name: 'Charmander',
        type: 'fire',
        sats: [{
            defensa: 1,
            ataque: 2,
            bloqueo: 3
        }]
    },
    {
        name: 'Venosaur',
        type: 'water',
        sats: [{
            defensa: 1,
            ataque: 2,
            bloqueo: 3
        }]
    },
    {
        name: 'Charmelon',
        type: 'fire',
        sats: [{
            defensa: 1,
            ataque: 2,
            bloqueo: 3
        }]
    },

]

// Método para filtar
const waterTypePokemons = pokedex.filter(pokemon => pokemon.type === 'water')
console.log(waterTypePokemons);

// --------------------------------------------------------------------------------------------------------------

// Método para hacer un fetch

const fetchPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    try {

        if (res.ok) {
            const data = await res.json()
            // console.log(data);

            // Trae la información de cada pokemon, porque la api devuelve inicialmente solo el nombre y un URL
            data.results.forEach( async (pokemon) => {
                const res = await fetch(pokemon.url)
                const poke = await res.json();
                console.log(poke);       
                pintarPokemon(poke)
            });
        }

    } catch (error) {
        console.error('Error al traer pokemones', error);
    }
}

fetchPokemons()

const contenedor = document.getElementById('container');

const pintarPokemon = (pokemon) => {
    // Creamos la tarjeta para cada pokemon
    const card = document.createElement('article');
    card.className = 'poke-card'
    card.innerHTML = `
    <h2> ${pokemon.name === 'bulbasaur' ? pokemon.name + ' #001' : pokemon.name} </h2>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif"/>
    `
    // Creamos el contenedor para la información extra del pokemon
    console.log(pokemon.stats);
    pokemon.stats.forEach((stat)=> {
        const statContainer = document.createElement('div');
        statContainer.className = 'stat-container';
        statContainer.innerHTML = `
        <p>${stat.stat.name} <span> ${stat.base_stat} </span> </p>
        `
        card.appendChild(statContainer)
    })

    // Le añadimos al contenedor, (mirar linea 137 y archivo html) la tarjeta
    contenedor.appendChild(card)
}
