// comicsSearch.js
import { getAllSuperHeroes, getHeroByName, allSuperHeroes } from './api.js';

let charactersPerPage = 30;
let currentPosition = 0;

function clearSuperheroes () {
    const superheroesContainer = document.querySelector('.container-context-list');
    superheroesContainer.innerHTML = '';
}

// Função para criar elementos HTML com as informações do super-herói
function createComicItem (superhero) {
    const comicItem = document.createElement('div');
    comicItem.className = 'shadow-drop-2-center comic-item';

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

    comicItem.addEventListener('click', () => {
        getHeroDetails(superhero.id)
            .then(details => {
                console.log(details);
            })
            .catch(err => {
                console.error(err);
            });
    });

    comicItem.addEventListener('click', () => {
        window.location.href = `comics-page.html?id=${superhero.id}`;
    });

    return comicItem;
}


// Função para adicionar os elementos à página

function displaySuperheroes (superheroes) {
    const containerContextList = document.querySelector('.container-context-list');
    let endPosition = currentPosition + charactersPerPage;

    superheroes.forEach(superhero => {
        const comicItem = createComicItem(superhero);
        containerContextList.appendChild(comicItem);
    });

    currentPosition = endPosition;
}


// Chama a função de busca na API
getAllSuperHeroes()
    .then(superheroes => {
        // Exibe as informações dos super-heróis na página
        displaySuperheroes(superheroes);
    })
    .catch(error => {
        console.error('Erro durante o carregamento:', error);
    });



// Mecanismo de busca

document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    clearSuperheroes();
    if (searchTerm) {
        const filteredSuperheroes = allSuperHeroes.filter(superhero => {
            const superheroName = superhero.name.toLowerCase();
            return superheroName.includes(searchTerm);
        });
        displaySuperheroes(filteredSuperheroes);
    } else {
        // Se a string de pesquisa estiver vazia, exiba apenas um número limitado de super-heróis
        displaySuperheroes(allSuperHeroes.slice(0, charactersPerPage));
    }
});



let currentPage = 1;
const nextPageButton = document.getElementById('nextPage');
const previousPageButton = document.getElementById('previousPage');


nextPageButton.addEventListener('click', () => {
    currentPage++;
    getAllSuperHeroes(currentPage)
        .then(data => {
            data.forEach(hero => {
                if (!allSuperHeroes.find(h => h.id === hero.id)) {
                    allSuperHeroes.push(hero);
                }
            });
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
                data.forEach(hero => {
                    if (!allSuperHeroes.find(h => h.id === hero.id)) {
                        allSuperHeroes.push(hero);
                    }
                });
                clearSuperheroes();
                displaySuperheroes(data);
            })
            .catch(err => {
                console.error(err);
            });
    }
});



