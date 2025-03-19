const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io')

const PORT = 8080;

const app = express();
app.use(express.static('public'));
app.use(express.json());


const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

const users = []
const roles = ['Marco', 'Especial Polo'];

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id} `);

    socket.on('marco-scream', (message)=> {
        io.emit('marco-screamed', message)
    })

    socket.on('polo-scream', (message)=> {
        io.emit('polo-screamed', message)
    })
})


app.post('/join-game', (req, res) => {

    const { name, id } = req.body

    let rol = 'Polo'

    if (roles.length > 0) {
        const randomRole = Math.floor(Math.random() * roles.length);
        rol = roles.splice(randomRole, 1)[0];
    }

    const user = {
        name,
        id,
        rol
    }

    console.log(`user with name ${name} and id ${id} join the game`);

    users.push(user)

    res.status(200).send({ result: user, message: 'join' });

    console.log(users);

    if (users.length >= 3) {
        io.emit('play-game', 'play');
    }

})


app.post('/end-game', (req, res)=> {

    const {result} = req.body;

    if (result === 'lost') {
        res.status(200).send({message : 'Marco lost'})
    } else {
        res.status(200).send({message : 'Marco won'})
    }

    io.emit('end-game', result);
    
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})

