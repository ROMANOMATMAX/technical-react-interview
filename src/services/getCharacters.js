const URL = 'https://swapi.dev/api/people';

export const getCharacters = () => {
  return fetch(URL)
    .then((res) => res.json())
    .then(({ results }) => {
      console.log('response', results);
      return results;
    });
};

class NetworkError extends Error {
  constructor() {
    super('Network Error');
  }
}

export const getCharactersAsyncAwait = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new NetworkError();
    }
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw err;
  }
};

export const getCharacterByIdAsyncAwait = async (id = 1) => {
  try {
    const response = await fetch(`${URL}/${id}`);
    if (!response.ok) {
      throw new NetworkError();
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getCharacterBySearchingAsyncAwait = async (keyword = 1) => {
  try {
    const response = await fetch(`${URL}/?search=${keyword}`);
    if (!response.ok) {
      throw new NetworkError();
    }
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw err;
  }
};
