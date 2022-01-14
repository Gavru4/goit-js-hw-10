import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getDataServer from './fetchCountries';
// Notify.info('Cogito ergo sum');
// Notify.failure('Qui timide rogat docet negare');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


input.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY));

function getCountry() {
    const inputValue = input.value;
    getDataServer(inputValue).then(data => console.log(data));
    const markup
}







// function createMarkup(array) {
//     // const list = document.createElement("ul");
//     // document.body.append(list);
//     // const markup = movieItem(array);
//     // document.querySelector("ul").insertAdjacentHTML('beforeend', markup) 

//     const markup = movieItem(array);
//     list.insertAdjacentHTML('beforeend', markup) 
// }
