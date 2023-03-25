const BASE_URL = 'https://restcountries.com/v3.1/';
const ENDPOINT = 'name/';

export const fetchCountries = name => {
  const URL = `${BASE_URL}${ENDPOINT}${name}?fields=name,capital,population,flags,languages`;

  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
