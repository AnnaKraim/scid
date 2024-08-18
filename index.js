import { displayUsers } from "./userCard.js";

let users = [];

async function getUsers() {
    const response = await fetch("https://66c1e100f83fffcb587a7c22.mockapi.io/users/all", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    users = await response.json()
    return users
}

function filterUsers() {
    const name = document.getElementById('name').value.toLowerCase();
    const surname = document.getElementById('surname').value.toLowerCase();
    const email = document.getElementById('email').value.toLowerCase();
    const fromFilter = parseInt(document.getElementById('from').value === "" ? 0 : document.getElementById('from').value, 10);
    const toFilter = parseInt(document.getElementById('to').value === "" ? 0 : document.getElementById('to').value, 10);

    const filteredUsers = users.filter(user => {
        return (
            (name === "" || user.name.toLowerCase().includes(name)) &&
            (surname === "" || user.surname.toLowerCase().includes(surname)) &&
            (email === "" || user.email.toLowerCase().includes(email)) &&
            (fromFilter === 0 || fromFilter <= user.age) &&
            (toFilter === 0 || toFilter >= user.age)
        );
    });

    displayUsers(filteredUsers);
}

document.addEventListener("DOMContentLoaded", async function(){
    displayUsers(await getUsers());

    document.getElementById('name').addEventListener('input', filterUsers);
    document.getElementById('surname').addEventListener('input', filterUsers);
    document.getElementById('email').addEventListener('input', filterUsers);
    document.getElementById('from').addEventListener('input', filterUsers);
    document.getElementById('to').addEventListener('input', filterUsers);
})

