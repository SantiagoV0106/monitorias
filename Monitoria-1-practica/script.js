// Crear un dashboard con la api de rick y morty

// Para cada personaje, tienes que pintar su nombre, su imagen, si el genero del personaje es femenino el nombre debe ser de color rosa. También, debes pintar la cantidad de episodios en los que sale.

// Link para llamar a los personajes: https://rickandmortyapi.com/api/character

let personajes = []

async function getCharacters() {
    const res = await fetch('https://rickandmortyapi.com/api/character');

    try {
        if (res.ok) {
            const data = await res.json()

            personajes = data.results
            renderPersonajes(personajes)


        }

    } catch (error) {
        console.error(error);

    }

}


getCharacters()


const renderPersonajes = (personajes) => {
    const body = document.querySelector('body')

    personajes.forEach(personaje => {

        const card = document.createElement('div');
        card.innerHTML = `
        <p> ${personaje.name}</p>
        <img src='${personaje.image}'/>
        `

        const episodes = personaje.episode

        episodes.slice(0, 5).forEach(async (episode) => {
            const res = await fetch(episode)
            const data = await res.json()


            const episodesContainer = document.createElement('div')
            episodesContainer.innerHTML = `
            <p> Episode: ${data.name} </p>
            `
            card.appendChild(episodesContainer);

        });

        body.appendChild(card)

    });

    personajes.forEach(personaje => {


    });

}


// Opción para traer los episodios, por personaje, con el método for. Recuerden, como es por personaje esta función debería ir dentro de la función que pinta cada personaje renderPersonajes()

const getEpisodes = async () => {

    for (let i = 0; i < episodes.length; i++) {
        // Le decimos que cuando i sea igual a 5, deje de sumar. Es decir, que si el arrgelo tiene Xs cantidad de datos, solo llega hasta el quinto
        if (i === 5) break;

        const element = episodes[i];

        const res = await fetch(element)

        const data = await res.json()

        console.log(data);

        const episodesContainer = document.createElement('div')

        episodesContainer.innerHTML = `
        <p> Episode: ${data.name} </p>
        `
        card.appendChild(episodesContainer);
    }
}

// getEpisodes()
