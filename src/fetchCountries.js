
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  return fetch(`${BASE_URL} ${name}?fields=name,capital,currencies,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        throw new Error( response.status);
      }
      return response.json();
    })
    // .catch(error => {
    //   Notify.failure("Oops, there is no country with that name");
    // })
}