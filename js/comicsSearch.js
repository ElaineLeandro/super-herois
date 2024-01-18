// comicsSearch.js
import { fetchSuperheroes } from './api.js';

let charactersPerPage = 1; 
let currentPosition = 0;    

// Função para criar elementos HTML com as informações do super-herói
function createComicItem(superhero) {
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

function displaySuperheroes(superheroes) {
    const containerContextList = document.querySelector('.container-context-list');
    const endPosition = currentPosition + charactersPerPage;

    superheroes.slice(currentPosition, endPosition).forEach(superhero => {
        const comicItem = createComicItem(superhero);
        containerContextList.appendChild(comicItem);
    });

    currentPosition = endPosition;
}

// Função para buscar e exibir informações ao clicar no botão
document.getElementById('btn-loading').addEventListener('click', function () {
    alert('Aguarde por favor, enquanto o conteúdo está sendo carregado.');

    // Chama a função de busca na API
    fetchSuperheroes()
        .then(superheroes => {
            // Exibe as informações dos super-heróis na página
            displaySuperheroes(superheroes);
        })
        .catch(error => {
            console.error('Erro durante o carregamento:', error);
        });
});

// Mecanismo de busca

document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const visibleComicItems = document.querySelectorAll('.comic-item:visible');

    visibleComicItems.forEach(comicItem => {
        const superheroName = comicItem.querySelector('h2').textContent.toLowerCase();
        const comicDescription = comicItem.querySelector('.comic-description').textContent.toLowerCase();

        if (superheroName.includes(searchTerm) || comicDescription.includes(searchTerm)) {
            comicItem.style.display = 'block';
        } else {
            comicItem.style.display = 'none';
        }
    });
});
