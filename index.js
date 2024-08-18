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

    const sorted = sortedUsers(filteredUsers);
    displayUsers(sorted);
}

function sortedUsers(filteredUsers) {
    const sortName = document.querySelector('input[name="sortName"]').value;
    const sortOrder = document.querySelector('input[name="sortOrder"]').value;

    return filteredUsers.sort((a, b) => {
        if (sortName === "Name") {
            return sortOrder === "Ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortName === "Surname") {
            return sortOrder === "Ascending" ? a.surname.localeCompare(b.surname) : b.surname.localeCompare(a.surname);
        } else if (sortName === "Age") {
            return sortOrder === "Ascending" ? a.age - b.age : b.age - a.age;
        } else {
            return 0;
        }
    });
}

function focus(event) {
    event.target.nextElementSibling.classList.add('active');
}

function blur(event) {
    event.target.nextElementSibling.classList.remove('active');
    if(event.target === document.querySelector('input[name="sortOrder"]')) filterUsers();
}

document.addEventListener("DOMContentLoaded", async function () {
    displayUsers(await getUsers());

    document.getElementById('name').addEventListener('input', filterUsers);
    document.getElementById('surname').addEventListener('input', filterUsers);
    document.getElementById('email').addEventListener('input', filterUsers);
    document.getElementById('from').addEventListener('input', filterUsers);
    document.getElementById('to').addEventListener('input', filterUsers);
    const sortName = document.querySelector('input[name="sortName"]');
    const dropdownItems1 = sortName.nextElementSibling.querySelectorAll('.dropdown-item');
    dropdownItems1.forEach(item => {
        item.addEventListener('mousedown', () => {
            sortName.value = item.getAttribute('data-value');
            sortOrder.classList.remove("not-display");
        });
    });
    const sortOrder = document.querySelector('input[name="sortOrder"]');
    const dropdownItems2 = sortOrder.nextElementSibling.querySelectorAll('.dropdown-item');
    dropdownItems2.forEach(item => {
        item.addEventListener('mousedown', () => {sortOrder.value = item.getAttribute('data-value');});
    });
    sortName.addEventListener('focus', focus);
    sortOrder.addEventListener('focus', focus);
    sortName.addEventListener('blur', blur);
    sortOrder.addEventListener('blur', blur);
    sortName.addEventListener('input', (event) => {
        if (event.target.value === "") sortOrder.classList.add("not-display");
    });
    sortOrder.addEventListener('blur', blur);
})

