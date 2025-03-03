// Importamos express => Esta es la manera definida para hacerlo (Siempre será así)
const express = require('express');
// Creamos una variable llamada app que contiene todo lo que necesitamos de express
const app = express();
// Creamos una variable para nuestro puerto (Nosotros definimos el valor, puede ser 3000, 8000, 5050, etc...)
const PORT = 8000

// Le indicamos a nuestro servidor que debe buscar en la carpeta public para mostrar los archivos que haya dentro
app.use(express.static('public'));
// Habilita la lectura Json
app.use(express.json());

// Renderiza el archivo HTML que esta en la carpeta public
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})



const users = [
    {
        name: 'Andrea',
        age: '22'
    },
    {
        name: 'Carlos',
        age: '33'
    }
]

// Cuando hacemos un fetch a ese endpoint (/users) esta función nos devuelve los usuarios que hayan
app.get('/users', (req, res) => {
    res.send(users)
})

// Cuando hacemos un fetch de tipo post, para agregar un usuario nuevo, esta función agrega el usuario y devuelve un mensaje en consola
app.post('/users', (req, res) => {
    console.log('User created =>', req.body);
    users.push(req.body)
    res.status(201).json({ message: 'User Created', user: req.body })
})

// Aqui el servidor sabe en donde escuchar los cambios y mostrar todo lo que hagamos
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})