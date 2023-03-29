import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY));

function onInputHandler(e) {
  e.preventDefault();
  let inputValue = input.value.trim();
  if (!inputValue) {
    return;
  }
  fetchCountries(inputValue)
    .then(data => {
      choseCountrys(data);
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
    });
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function choseCountrys(countrysArray) {
  if (countrysArray.length === 1) {
    countryList.innerHTML = '';
    return markupCountry(countrysArray);
  }
  if (countrysArray.length >= 2 && countryArray.length <= 10) {
    countryInfo.innerHTML = '';
    return markupCountryItem(countrysArray);
  }

  return Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
console.log(choseCountrys());
function markupCountryItem(data) {
  const markup = data
    .map(el => {
      return `<li class="country-item">
            <img src="${el.flags.svg}" alt="${el.name.official}" width="40" height="20" /> 
            <p>${el.name.official}</p>
            </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function markupCountry(data) {
  const markup = data
    .map(el => {
      return `<h1>
       <img src="${el.flags.svg}" alt="${
        el.name.official
      }" width="40" height="20" /> 
            
        ${el.name.official}
      </h1>
      <ul class="country-info_list">
        <li class="country-info_item">
          <h2>Capital:</h2>
          <p>${el.capital}</p>
        </li>
        <li class="country-info_item">
          <h2>Population:</h2>
          <p>${el.population}</p>
        </li>
        <li class="country-info_item">
          <h2>Languages:</h2>
          <p>${Object.values(el.languages).join(', ')}</p>
        </li>
      </ul>`;
    })
    .join('');

  countryInfo.innerHTML = markup;
}
