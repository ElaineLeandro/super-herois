import { getHeroDetails } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Faz uma chamada à API para obter os detalhes do super-herói

getHeroDetails(id)
  .then(superhero => {
    console.log(superhero);
    // Cria e adiciona os elementos HTML para exibir os detalhes do super-herói
    const container = document.querySelector('.container1');


    const backButton = document.createElement('button');
    backButton.textContent = 'Voltar';
    backButton.style.backgroundColor = 'blue'; // Adiciona um fundo azul
    backButton.style.color = 'white'; // Adiciona uma cor de texto branca
    backButton.addEventListener('click', () => {
      window.location.href = 'comics-search.html';
    });

    // Limpa o contêiner
    container.innerHTML = '';

    container.style.width = '350px';
    container.style.height = '350px';

    const img = document.createElement('img');
    img.src = superhero.images.sm;
    img.alt = superhero.name;

    const h2 = document.createElement('h2');
    h2.textContent = superhero.name;

    container.appendChild(img);
    container.appendChild(h2);

    // Itera sobre as chaves do objeto biography
    for (let key in superhero.biography) {
      const p = document.createElement('p');
      p.textContent = `${key}: ${superhero.biography[key]}`;
      container.appendChild(p);
    }

    // Cria o botão de voltar
    backButton.textContent = 'Voltar';
    backButton.addEventListener('click', () => {
      window.history.back();
    });
    container.appendChild(backButton);
  })
  .catch(err => {
    console.error(err);
  });