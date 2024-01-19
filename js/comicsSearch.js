// comicsSearch.js
import { getAllSuperHeroes } from './api.js';

let charactersPerPage = 1;
let currentPosition = 0;
let allSuperHeroes = []

// Função para criar elementos HTML com as informações do super-herói
function createComicItem (superhero) {
    const comicItem = document.createElement('div');
    comicItem.className = 'comic-item shadow-drop-2-center';

    const img = document.createElement('img');
    img.src = superhero.images.sm;
    img.alt = superhero.name;

    const h2 = document.createElement('h2');
    h2.textContent = superhero.name;

    const p = document.createElement('p');
    p.className = 'comic-description';
    p.textContent = superhero.biography.publisher;

    comicItem.appendChild(img);
    comicItem.appendChild(h2);
    comicItem.appendChild(p);

    return comicItem;
}

// Função para adicionar os elementos à página

function displaySuperheroes (superheroes) {
    const containerContextList = document.querySelector('.container-context-list');
    const endPosition = currentPosition + charactersPerPage;

    superheroes.forEach(superhero => {
        const comicItem = createComicItem(superhero);
        containerContextList.appendChild(comicItem);
    });

    currentPosition = endPosition;
}


// Chama a função de busca na API
getAllSuperHeroes()
    .then(superheroes => {
        allSuperHeroes = superheroes; // Adicione esta linha
        // Exibe as informações dos super-heróis na página
        displaySuperheroes(superheroes);
    })
    .catch(error => {
        console.error('Erro durante o carregamento:', error);
    });


// Mecanismo de busca

// document.getElementById('search-input').addEventListener('input', function () {
//     const searchTerm = this.value.toLowerCase();
//     const visibleComicItems = document.querySelectorAll('.comic-item');
//     console.log(visibleComicItems);

//     visibleComicItems.forEach(comicItem => {
//         const superheroElement = comicItem.querySelector('h2');
//         const descriptionElement = comicItem.querySelector('.comic-description');

//         const superheroName = superheroElement ? superheroElement.textContent.toLowerCase() : '';
//         const comicDescription = descriptionElement ? descriptionElement.textContent.toLowerCase() : '';

//         comicItem.style.display = ((superheroName && superheroName.includes(searchTerm)) || (comicDescription && comicDescription.includes(searchTerm))) ? 'block' : 'none';
//     });
// });

document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredSuperheroes = allSuperHeroes.filter(superhero => {
        const superheroName = superhero.name.toLowerCase();
        return superheroName.includes(searchTerm);
    });
    clearSuperheroes();
    displaySuperheroes(filteredSuperheroes);
});

let currentPage = 1;
const nextPageButton = document.getElementById('nextPage');
const previousPageButton = document.getElementById('previousPage');


nextPageButton.addEventListener('click', () => {
    currentPage++;
    getAllSuperHeroes(currentPage)
        .then(data => {
            allSuperHeroes = allSuperHeroes.concat(data); // Adicione esta linha
            clearSuperheroes(); // Função para limpar os super-heróis existentes
            displaySuperheroes(data);
        })
        .catch(err => {
            console.error(err);
        });
});

previousPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getAllSuperHeroes(currentPage)
            .then(data => {
                clearSuperheroes();
                displaySuperheroes(data);
            })
            .catch(err => {
                console.error(err);
            });
    }
}); 

function clearSuperheroes () {
    const superheroesContainer = document.querySelector('.container-context-list');
    superheroesContainer.innerHTML = '';
}
