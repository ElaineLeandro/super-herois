// comicsSearch.js
import { getAllSuperHeroes } from './api.js';

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
    containerContextList.innerHTML = '';

    superheroes.forEach(superhero => {
        const comicItem = createComicItem(superhero);
        containerContextList.appendChild(comicItem);
    });
}

// Função para buscar e exibir informações ao clicar no botão
// document.getElementById('btn-loading').addEventListener('click', function () {
//     alert('Aguarde por favor, enquanto o conteúdo está sendo carregado.');

// Chama a função de busca na API
getAllSuperHeroes()
    .then(superheroes => {
        // Exibe as informações dos super-heróis na página
        displaySuperheroes(superheroes);
    })
    .catch(error => {
        console.error('Erro durante o carregamento:', error);
    });
// });

// Mecanismo de busca
document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const allComicItems = document.querySelectorAll('.comic-item');

    allComicItems.forEach(comicItem => {
        const superheroName = comicItem.querySelector('h2').textContent.toLowerCase();
        const comicDescription = comicItem.querySelector('.comic-description').textContent.toLowerCase();

        // if (superheroName.includes(searchTerm) || comicDescription.includes(searchTerm)) {
        //     comicItem.style.display = 'block';
        // } else {
        //     comicItem.style.display = 'none';
        // }
        comicItem.style.display = (superheroName.includes(searchTerm) || comicDescription.includes(searchTerm)) ? 'block' : 'none';
    });
});
