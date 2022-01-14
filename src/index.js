import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
import _ from 'lodash';


const DEBOUNCE_DELAY = 300;
// Notify.info('Cogito ergo sum');

const input = document.querySelector("#search-box")
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")
let markup = null;
input.addEventListener('input', debounce(getCountry, 500));
  
function getCountry() {
    const inputValue = input.value.trim();
console.log(input.value=== '');
    if (!inputValue) return;

    fetchCountries(inputValue).then(data => {
        if (data.length === 1) {
             
            renderMarkup(data);
              countryList.innerHTML = "";
             renderCountryInfo(data);
           
         }
        if (data.length <= 10 && data.length > 1) {
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
      countryList.innerHTML = "";
    const markup = data.map(item => {
          return `<li class="contry-list"><img src="${item.flags.svg}" width ="100"><p class ="country-name">${item.name.common}</p></li>`
    }).join() 
    countryList.insertAdjacentHTML('afterbegin', markup);
}

function renderCountryInfo(data) {
    const countryDescr = data.map(({ capital, population, languages, flags, name }) => {
        // return `<li>
        //         <img src="${flags.svg}" width ="100">
        //         <p class ="country-name">${name.common}</p>
            return    `<ul>
                    <li>Capital:<span>${capital}</span></li>
                    <li>Population:<span>${population}</span></li>
                    <li>Languages:<span>${Object.values(languages).join(',')}</span></li>
                </ul>
        </li>`
    }).join()

    countryInfo.insertAdjacentHTML("afterbegin",countryDescr);
}





