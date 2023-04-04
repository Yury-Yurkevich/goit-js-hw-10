import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from "./function/fetchCountries";

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info')
};

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function resetRenderCountries() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function onSearch(e) {
  resetRenderCountries();
  e.preventDefault();
  
  const countryName = e.target.value.trim();
  if (!countryName) {
    clearCountryList();
    clearCountryInfo();
    return;
  }
  fetchCountries(countryName)
    .then(renderCountries)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
}

function renderCountries(countries) {

  if (countries.length > 10) {
    alertMatches()
    return;
  };

  if (countries.length > 1 && countries.length <= 10) {
  
    const markupList = countries.map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${flags.alt}" width="50">${name.official}</li>`;
    })
    .join('');
    refs.countryList.insertAdjacentHTML('beforeend', markupList)
    .filter(
    (country, index, array) => array.indexOf(country) === index);
  };

  if (countries.length === 1) {
    const markupInfo = countries.map(({ name, capital, population, flags, languages }) => {
      return `<img src="${flags.svg}" alt="${name.official}" width='70'>
        <h1 class="country-item-name">${name.official}</h1>
        <p class="country-item-info">Capital: ${capital}</p>
        <p class="country-item-info">Population: ${population}</p>
        <p class="country-item-info">Languages: ${Object.values(languages)} </p>`})
    .join();
    refs.countryInfo.insertAdjacentHTML('beforeend', markupInfo);
  };
  refs.countryList.innerHTML = '';

  if (!countries.length) {
    alertNoName()
    return
  };
 
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

function alertNoName() {
  Notiflix.Notify.failure('Oops!!!!!!!!, there is no country with that name');
}

function alertMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}


// import './css/styles.css';
// import { fetchCountries } from "./function/fetchCountries";
// import debounce from "lodash.debounce";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const DEBOUNCE_DELAY = 300;

// const input = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

// function onSearchCountry(evt) {
//     evt.preventDefault();
//     const searchValue = input.value.trim();
//     console.log(searchValue)
//     if (searchValue != '') {
//         fetchCountries(searchValue)
//         .then(renderCountry)
//         .catch(onFetchError);
//     }
// };

// function createCountryList(countries) {
//     return countries.map(({name, flags}) => {
//         return `
//         <li class="card-item">
//         <img class="card-img" src="${flags.svg}" alt="${flags.alt}">
//         <h2 class="card-title">${name.official}</h2>
//        </li>
//        `
//     }).join('')
// };

// function createCountryInfo(countries) {
//     return countries.map(({name, flags, capital, population, languages}) => {
//         return `
//         <div class="card-heading">
//             <img class="card-img card-img--big" src="${flags.svg}" alt="${flags.alt}">
//             <h2 class="card-title">${name.official}</h2>
//         </div>
//         <div class="card-body">
//             <p class="card-text"><b>Capital:</b> ${capital}</p>
//             <p class="card-text"><b>Population:</b> ${population}</p>
//             <p class="card-text"><b>Languages:</b> ${Object.values(languages).join(', ')}</p>
//         </div>
//         `
//     }).join('')
// };

// function renderCountry(countries) {
//         countryList.innerHTML = '';
//         countryInfo.innerHTML = '';
//     if (countries.length > 10) {
//         Notify.info("Too many matches found. Please enter a more specific name.")
//     } else if (countries.length >= 2 && countries.length <= 10) {
//         countryList.insertAdjacentHTML('beforeend', createCountryList(countries))
//     } else if (countries.length === 1) {
//         countryInfo.insertAdjacentHTML('beforeend', createCountryInfo(countries))
//     }    
// };

// function onFetchError() {
//     Notify.failure("Oops, there is no country with that name");
// }
