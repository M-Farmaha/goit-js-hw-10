import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const searchInputEl = document.querySelector('#search-box');
const countrylistEl = document.querySelector('.country-list');
const countryinfoEl = document.querySelector('.country-info');

searchInputEl.addEventListener(
  'input',
  debounce(handleSearchInput, DEBOUNCE_DELAY)
);

function handleSearchInput(event) {
  const searchInputValue = event.target.value.trim();
  clearMarkup();

  if (searchInputValue) {
    fetchCountries(searchInputValue)
      .then(data => {
        clearMarkup();
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length > 1 && data.length < 11) {
          clearMarkup();
          countrylistEl.innerHTML = createCountriesSearchMarkup(data);
        } else if (data.length === 1) {
          clearMarkup();
          countryinfoEl.innerHTML = createCountryMarkup(data);
        } else {
          clearMarkup();
        }
      })
      .catch(error => {
        clearMarkup();
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}

function createCountriesSearchMarkup(contries) {
  return contries
    .map(({ name, capital, population, flags, languages }) => {
      return `<li class="country-item">
        <img src="${flags.svg}" alt="flag" width=50 height=30>
        <p>${name.official}</p>
      </li>`;
    })
    .join('');
}

function createCountryMarkup([country]) {
  const { name, capital, population, flags, languages } = country;
  return `<img src="${flags.svg}" alt="flag" width=100 height=60>
        <h1>${name.official}</h1>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>`;
}

function clearMarkup() {
  countrylistEl.innerHTML = '';
  countryinfoEl.innerHTML = '';
}
