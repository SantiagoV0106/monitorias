let socket = io('http://localhost:8080');
const joinGameForm = document.getElementById('join-game-form');
const joinGameSection = document.getElementById('join-game');
const GameSection = document.getElementById('game');
const userName = document.getElementById('user-name');

joinGameForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const nameInput = document.getElementById('name');

    const user = {
        id: socket.id,
        name: nameInput.value
    }

    const res = await fetch('/join-game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const data = await res.json();
    const message = data.message
    const result = data.result
    console.log(result);

    if (message === 'join') {
        renderStartGame(result)
    } else {
        return
    }

    joinGameForm.reset()

})


function renderStartGame(user) {
    const playBtn = document.getElementById('play-btn');

    joinGameSection.style.display = 'none'
    GameSection.style.display = 'block'

    const { name } = user

    userName.innerText = `${name}`

    socket.on('play-game', (message) => {
        alert(message);
        playBtn.removeAttribute('disabled');
    })

    playBtn.addEventListener('click', () => renderGame(user))
}


function renderGame(user) {
    const marcoScreen = document.getElementById('marco');
    const poloScreen = document.getElementById('polo');
    const poloEspecialScreen = document.getElementById('polo-especial')
    const rolTag = document.createElement('h3')

    const { name, rol } = user

    GameSection.style.display = 'none'
    rolTag.innerText = `Your role is ${rol}`

    socket.on('end-game', (result)=> {
        alert(`Marco ${result}`)
        joinGameSection.style.display = 'block'
        marcoScreen.style.display = 'none'
        poloScreen.style.display = 'none'
        poloEspecialScreen.style.display = 'none'
    })

    if (rol === 'Marco') {
        marcoScreen.style.display = 'block';
        const marcoName = document.getElementById('marco-name');
        const marcoRoleContainer = document.getElementById('rol-marco-container');
        marcoName.innerText = `${name}`
        marcoRoleContainer.appendChild(rolTag);

        const marcoBtn = document.getElementById('marco-btn');

        marcoBtn.addEventListener('click', () => {
            socket.emit('marco-scream', 'Marcoo');
            console.log('Marcooo');
        })

        const PolosContainer = document.getElementById('polos-container');

        socket.on('polo-screamed', (scream) => {
            console.log(scream);
            const poloPlayer = document.createElement('p');
            poloPlayer.innerText = `${scream.message}`
            poloPlayer.style.cursor = 'pointer';
            PolosContainer.appendChild(poloPlayer);
            poloPlayer.addEventListener('click', ()=> {
                if (scream.rol === 'Polo') {
                    const fetchLost = async ()=> {
                        const res = await fetch('/end-game', {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json'
                            }, 
                            body : JSON.stringify({result : 'lost'})
                        })
                        const data = await res.json()
                       console.log(data);
                    }
                    fetchLost()
                } else {
                    const fetchWon = async ()=> {
                        const res = await fetch('/end-game', {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json'
                            }, 
                            body : JSON.stringify({result : 'won'})
                        })
                        const data = await res.json()
                       console.log(data);
                    }
                    fetchWon()
                }
            })
        })

    } else if (rol === 'Polo') {
        poloScreen.style.display = 'block'
        const poloName = document.getElementById('polo-name');
        const poloRoleContainer = document.getElementById('rol-polo-container');
        poloName.innerText = `${name}`
        poloRoleContainer.appendChild(rolTag);

        const poloBtn = document.getElementById('polo-btn');

        socket.on('marco-screamed', (message) => {
            console.log(message);
            poloBtn.removeAttribute('disabled')
            const marcoMsg = document.createElement('p');
            marcoMsg.innerText = 'Marco Screamed';
            poloRoleContainer.appendChild(marcoMsg);
        })

        poloBtn.addEventListener('click', () => {
            const scream = {
                rol,
                message : 'Polo'
            }
            socket.emit('polo-scream', scream);
            console.log('clicked');

        })

    } else {
        poloEspecialScreen.style.display = 'block'
        const poloEspecialName = document.getElementById('polo-especial-name');
        const poloEspecialRoleContainer = document.getElementById('rol-polo-especial-container');
        poloEspecialName.innerText = `${name}`
        poloEspecialRoleContainer.appendChild(rolTag);

        const poloEBtn = document.getElementById('polo-especial-btn');


        socket.on('marco-screamed', (message) => {
            console.log(message);
            poloEBtn.removeAttribute('disabled');
            const marcoMsg = document.createElement('p');
            marcoMsg.innerText = 'Marco Screamed';
            poloEspecialRoleContainer.appendChild(marcoMsg);
        })

        poloEBtn.addEventListener('click', () => {
            const scream = {
                rol,
                message : 'Polo'
            }
            socket.emit('polo-scream', scream);
            console.log('clicked');

        })
    }
}



