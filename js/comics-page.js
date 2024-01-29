import { getHeroDetails } from './api.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Faz uma chamada à API para obter os detalhes do super-herói

getHeroDetails(id)
  .then(superhero => {
    console.log(superhero);
    // Cria e adiciona os elementos HTML para exibir os detalhes do super-herói
    const container = document.querySelector('.container1');

    const containerContextList = document.querySelector('.container-context-list');



    const backButton = document.createElement('button');
    backButton.style.backgroundColor = '#ed1d24'; // Cor de fundo
    backButton.style.color = '#fff'; // Cor do texto
    backButton.style.border = 'none'; // Sem borda
    backButton.style.borderRadius = '30px'; // Raio da borda
    backButton.style.cursor = 'pointer'; // Cursor do mouse
    backButton.style.padding = '10px 20px'; // Padding
    backButton.style.fontFamily = "'Bebas Neue', sans-serif"; // Fonte
    backButton.style.margin = "2em"; // Fonte

    // Adiciona estilo hover
    backButton.addEventListener('mouseover', function () {
      backButton.style.backgroundColor = '#cc0000'; // Cor de fundo no hover
    });

    // Remove estilo hover
    backButton.addEventListener('mouseout', function () {
      backButton.style.backgroundColor = '#ed1d24'; // Restaura a cor de fundo padrão
    });


    backButton.addEventListener('click', () => {
      window.location.href = 'comics-search.html';
    });

    // Limpa o contêiner
    container.innerHTML = '';

    container.style.width = '100%';
    container.style.height = 'auto';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';


    const img = document.createElement('img');
    img.src = superhero.images.sm;
    img.alt = superhero.name;
    img.style.width = '250px'
    img.style.height = 'auto'
    img.style.margin = '2em'

    const h2 = document.createElement('h2');
    h2.textContent = superhero.name;
    h2.style.fontFamily = 'Bebas Neue';
    h2.style.fontWeight = 'bold';

    container.appendChild(img);
    container.appendChild(h2);

    // Itera sobre as chaves do objeto biography
    for (let key in superhero.biography) {
      const p = document.createElement('p');
      p.style.fontFamily = 'Bebas Neue';
      p.style.margin = '0';
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