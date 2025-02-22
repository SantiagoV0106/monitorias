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

    }

}


getCharacters()


const renderPersonajes = (personajes) => {
    const body = document.querySelector('body')


    personajes.forEach(personaje => {

        const episodes = personaje.episode
        console.log(episodes);

        episodes.forEach(async (episode) => {
            const res = await fetch(episode)
            const data = await res.json()
            console.log(personaje.name, data);

        });
    });

    personajes.forEach(personaje => {
        const card = document.createElement('div');
        card.innerHTML = `
        <p> ${personaje.name}</p>
        <img src='${personaje.image}'/>
        `

        body.appendChild(card)

    });

}
