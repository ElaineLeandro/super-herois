// api.js
// import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://akabab.github.io/superhero-api/api',
});

export function fetchSuperheroes(){
    return instance.get('/all.json')
    .then(response => {
        console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Erro ao obter dados da API:', error);
        throw error;
    })

    
}

