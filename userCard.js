class UserCard {
    constructor(id, name, surname, age, email, image, templateSelector) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.age = parseInt(age, 10);
        this.email = email;
        this.image = image;
        this.templateSelector = templateSelector;
    }

    getTemplate() {
        const template = document.querySelector(this.templateSelector).content.querySelector(".user").cloneNode(true);
        return template;
    }

    createUserCard() {
        const cardElement = this.getTemplate();
        cardElement.id = this.id;
        cardElement.querySelector('.user__name').querySelector("label").textContent = `${this.name} ${this.surname}`;
        cardElement.querySelector('.user__age').querySelector("label").textContent = `${this.age} year`;
        cardElement.querySelector('.user__email').querySelector("label").textContent = this.email;

        const userImage = cardElement.querySelector('.user__img');
        userImage.style.backgroundImage = `url(${this.image})`;
        userImage.addEventListener('click', () => createModal(this));
        return cardElement;
    }

}

async function setUser(user) {
    const response = await fetch(`https://66c1e100f83fffcb587a7c22.mockapi.io/users/all/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: user
    })
    if(!response.ok){
        console.error("The image has not been changed");
    }
}

function createModal(user) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const header = document.createElement('div');
    header.classList.add('modal__header');

    const closeCrossContainer = document.createElement('div');
    closeCrossContainer.classList.add('modal__close-cross');
    closeCrossContainer.addEventListener('click', function () {
        modal.remove();
        overlay.remove()
    });

    closeCrossContainer.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve"><g><g id="_x38__41_"><g><path d="M444.644,306l138.644-138.644c38.284-38.284,38.284-100.36,0-138.644c-38.283-38.284-100.359-38.284-138.644,0 L306,167.356L167.356,28.713c-38.284-38.284-100.36-38.284-138.644,0s-38.284,100.36,0,138.644L167.356,306L28.713,444.644 c-38.284,38.283-38.284,100.36,0,138.644c38.284,38.284,100.36,38.284,138.644,0L306,444.644l138.644,138.644 c38.283,38.284,100.36,38.284,138.644,0c38.284-38.283,38.284-100.36,0-138.644L444.644,306z"/></g></g></g></svg>`;
    header.appendChild(closeCrossContainer);

    const body = document.createElement('div');
    body.classList.add('modal__body');

    const label = document.createElement('label');
    label.classList.add('text', 'text400');
    label.textContent = "Paste the link to the picture for " + user.name;

    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.id = 'url';
    urlInput.placeholder = 'Url';

    urlInput.classList.add('large', 'text400');

    body.appendChild(label);
    body.appendChild(urlInput);

    modal.appendChild(header);
    modal.appendChild(body);
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('modal__button-container');

    const button = document.createElement('button');
    button.classList.add('button', 'normal-button');
    button.innerHTML = `<span class="text600 regular">Save</span>`;
    button.addEventListener('click', function () {
        //Здесь по хорошему отправка на бэк и получение ответа, но бэка нет, реализовала замену сразу
        user.image = urlInput.value;
        document.getElementById(user.id).querySelector(".user__img").style.backgroundImage = `url(${user.image})`;
        setUser(user);
        modal.remove();
        overlay.remove()
    });
    buttonContainer.appendChild(button);
    modal.appendChild(buttonContainer);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
}

export function displayUsers(users) {
    const container = document.querySelector('.users');
    container.innerHTML = '';
    users.forEach((user) => {
        const userCard = new UserCard(user.id, user.name, user.surname, user.age, user.email, user.image, '#user-card-template');
        container.appendChild(userCard.createUserCard());
    });
}

