
const api = axios.create({
  baseURL: 'https://akabab.github.io/superhero-api/api'
})

export const getAllSuperHeroes = (page = 1, limit = 30) => {
  return api.get('/all.json')
    .then(response => {
      console.log(response.data);
      const start = (page - 1) * limit;
      const end = page * limit;
      return response.data.slice(start, end);
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}


export function getHeroDetails (id) {
  return fetch(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
    .then(response => response.json())
    .then(data => {
      console.log('caiu aqui', data);
      if (Array.isArray(data)) {
        throw new Error('Multiple heroes returned');
      }
      return data;
    });
}
