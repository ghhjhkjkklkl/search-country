const url = 'https://restcountries.com/v3.1/name';
const fields = `name,capital,population,flags,languages`;

export function fetchCountries(name) {
  return fetch(`${url}/${name}?fields=${fields}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
