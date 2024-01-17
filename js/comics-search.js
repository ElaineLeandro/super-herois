import { getAllSuperHeroes } from './api.js';

// document.getElementById('btn-loading').addEventListener('click', function () {
//     alert('Aguarde por favor, enquanto o conteúdo está sendo carregado.');

// });

let dataContainer = document.querySelector('#data-container1');

getAllSuperHeroes()
    .then(data => {
        // Para cada item de dados, cria um novo elemento p e adiciona ao dataContainer
        data.forEach(item => {
            console.log(item);
            let card = document.createElement('div');
            card.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.biography.fullName}</p>
                <img src="${item.images.md}" alt="${item.name}">    
                <p>${item.biography.publisher}</p>        
                `
            card.classList.add('card');
            dataContainer.appendChild(card);
        });
    })
    .catch(err => console.error(err));