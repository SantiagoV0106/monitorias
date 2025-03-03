const body = document.querySelector('body');
const form = document.getElementById('userForm')
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');

const fetchData = async () => {
    const res = await fetch('/users');
    const data = await res.json();
    console.log(data);
    const users = data
    renderUsers(users)
}

fetchData()

const createUser = async (e) => {
e.preventDefault();
    const newUser = {
        name: nameInput.value,
        age: ageInput.value
    }
    console.log(newUser);

    const res = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    const data = await res.json()
    console.log(data.message);

}

form.addEventListener('submit', createUser);

const renderUsers = (users) => {
    if (users.length > 0) {
        users.forEach(user => {
            const card = document.createElement('div')
            const name = document.createElement('p')

            name.innerText = `${user.name}`;
            card.appendChild(name)

            body.appendChild(card)

        });
    } else {
        const msg = document.createElement('p')
        msg.innerText = 'No users'

        body.appendChild(msg)
    }
}