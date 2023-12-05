// index.js

import axios from 'axios';
import { fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_jJ6GzfXCe64rZjvPBrAJMFEOHCy4vLo3BmZHSlqAp3dSfLoc3Jf3Ae31TG1GBbAJ';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get('/breeds').then(({ data }) => data);
}

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

fetchBreeds().then(data => {
  const html = data.map(
    breed => `<option value="${breed.id}">${breed.name}</option>`
  );
  breedSelect.innerHTML = html.join('');
});

breedSelect.addEventListener('change', ev => {
  const breedId = ev.target.value;
  loader.style.display = 'block';

  fetchCatByBreed(breedId)
    .then(cats => {
      const cat = cats[0];
      const catHtml = `
        <h2>Cat ID: ${cat.id}</h2>
        <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
        <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
        <img width="800" height="600" src="${cat.url}" alt="Cat Image" />
      `;
      catInfo.innerHTML = catHtml;
    })
    .catch(error => {
      console.error('Error fetching cat information', error);
      error.style.display = 'block';
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});
