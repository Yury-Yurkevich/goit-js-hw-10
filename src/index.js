import './css/styles.css';
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from "./function/fetchCountries";
const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    counrtyInfoEl: document.querySelector('.country-info'),
};

const {inputEl, countryListEl, counrtyInfoEl} = refs;

inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(){
  const name = inputEl.value.trim();
  if(!name.trim()){
    return}
  fetchCountries(name).then(counrties => {
    clearInput();
    inputChecking(counrties)
  })
  .catch(() => {
    Notify.failure("Oops, there is no country with that name");
    clearInput();
  })
  }

function renderCountriesList(counrties){
  return counrties.map(({name, flags}) => {
    return `<li class='country-list__item'>
    <img class="country-list__flag" src="${flags.svg}" alt="${name.official}" width = 30px height = 30px>
    <h2 class="country-list__name">${name.official}</h2></li>`
  }).join('')
}

function renderCountriesInfo(counrties){
  return counrties.map(({capital, population, languages})=>{
return `<ul class='country-list-info'>
<li class='country-list-info__item'>Capital: ${capital}</li>
<li class='country-list-info__item'>Population: ${population}</li>
<li class='country-list-info__item'>Languages: ${Object.values(languages).join(', ')}</li>
</ul>`
  }).join('')
}

function inputChecking(counrties){
  if (counrties.length === 1) {
    countryListEl.insertAdjacentHTML('beforeend', renderCountriesList(counrties));
    counrtyInfoEl.insertAdjacentHTML('beforeend', renderCountriesInfo(counrties));
  } else if (counrties.length > 10) {
    Notify.info("Too many matches found. Please enter a more specific name.")
  }else if (counrties.length >= 2 && counrties.length <= 10) {
    countryListEl.insertAdjacentHTML('beforeend', renderCountriesList(counrties));
  }
}

function clearInput(){
    countryListEl.innerHTML = '';
    counrtyInfoEl.innerHTML = '';
  }























// import './css/styles.css';
// import { fetchCountries } from './partials/fetchCountries';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
// const DEBOUNCE_DELAY = 300;
// const refs = {
//   searchBox: document.querySelector('#search-box'),
//   countryList: document.querySelector('.country-list'),
//   countryInfo: document.querySelector('.country-info')
// };

// refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// function onSearch(e) {
//   e.preventDefault();
//   const countryName = e.target.value.trim();
//   if (!countryName) {
//     clearCountryList();
//     clearCountryInfo();
//     return;
//   }
//   fetchCountries(countryName)
//     .then(renderCountries)
//     .catch(error => {
//       alertNoName(error);
//     });
// }

// function renderCountries(countries) {
//   if (countries.length > 10) {
//     alertMatches()
//     return;
//   };

//   if (countries.length > 1 && countries.length <= 10) {
//     const markupList = countries.map(({ name, flags }) => {
//       return `<li><img src="${flags.svg}" alt="${flags.alt}" width="50">${name.official}</li>`;
//     })
//       .join('');
//     refs.countryList.insertAdjacentHTML('beforeend', markupList)
//     };
    
//   if (countries.length === 1) {
//     clearCountryList();
//     const markupInfo = countries.map(({ name, capital, population, flags, languages }) => {
//       return `<img src="${flags.svg}" alt="${name.official}" width='70'>
//         <h1 class="country-item-name">${name.official}</h1>
//         <p class="country-item-info">Capital: ${capital}</p>
//         <p class="country-item-info">Population: ${population}</p>
//         <p class="country-item-info">Languages: ${Object.values(languages)} </p>`})
//     .join();
//     refs.countryInfo.insertAdjacentHTML('beforeend', markupInfo);
//   };
// }

// function clearCountryList() {
//   refs.countryList.innerHTML = '';
// }

// function clearCountryInfo() {
//   refs.countryInfo.innerHTML = '';
// }

// function alertNoName() {
//   Notiflix.Notify.failure('Oops, there is no country with that name');
// }

// function alertMatches() {
//   Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
// }