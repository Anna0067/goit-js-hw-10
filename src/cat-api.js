import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_jJ6GzfXCe64rZjvPBrAJMFEOHCy4vLo3BmZHSlqAp3dSfLoc3Jf3Ae31TG1GBbAJ';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(({ data }) => data);
}

export function fetchBreeds() {
  return axios.get('/breeds').then(({ data }) => data);
}
