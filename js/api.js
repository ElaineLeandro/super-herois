
const api = axios.create({
  baseURL: 'https://akabab.github.io/superhero-api/api'
})

export const getAllSuperHeroes = () => {
  return api.get('/all.json')
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

