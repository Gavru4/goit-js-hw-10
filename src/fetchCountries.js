// export default function fetchMovie(query) {
//   const KEY = 'b2c3269bd358b01baf914c84972bca6a';
//   const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';
//   return fetch(
//     `${BASE_URL}api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
//   ).then(response => response.json());
// }
const name = "usa"
export default function fetchCountries(name) {
  const KEY = '';
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    
    return fetch(`${BASE_URL} ${name}`).then(response => response.json());
}
