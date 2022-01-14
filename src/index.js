import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
import _ from 'lodash';


const DEBOUNCE_DELAY = 300;


const input = document.querySelector("#search-box")
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")

input.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY));
  
function getCountry() {
    const inputValue = input.value.trim();

    if (!inputValue) {
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }

    fetchCountries(inputValue).then(data => {
        if (data.length === 1) {
             countryList.innerHTML = '';
             renderCountryInfo(data);
        }
        if (data.length <= 10 && data.length > 1) {
            countryInfo.innerHTML = ""
            countryList.innerHTML = "";
            renderMarkup(data);
           
        }
        if (data.length > 10) {
             Notify.info("Too many matches found. Please enter a more specific name.");
           countryList.innerHTML = "";
         }
     }).catch(error => {
         Notify.failure("Oops, there is no country with that name");
         
    })
}
 

function renderMarkup(data) {
    countryList.innerHTML = '';
    const markup = data
        .map(({flags, name}) => {
        return`<li class="contry-list">
                    <img src="${flags.svg}" alt="img" width="100">
                    <p class="country-name">${name.common}</p>
                </li>`}).join('');
    countryList.innerHTML = markup;
}

function renderCountryInfo(data) {
      countryList.innerHTML = '';
    const countryDescr = data
        .map(({ capital, population, languages, flags, name }) => {
            return `<div class ="wrapper">
                <img src="${flags.svg}" alt="img" width="100">
                <h1>${name.common}</h1></div>
            <ul class="country-description">
                <li class="contry-info">
                    <p><b>Capital:</b>${capital}</p>
                    <p><b>Population:</b>${population}</p>
                    <p><b>Languages:</b>${Object.values(languages).join(',')}</p>
                </li>
            </ul>`;
    }).join();

    countryInfo.innerHTML = countryDescr;
}





