import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import {
  getCharacters,
  getCharactersAsyncAwait,
  getCharacterByIdAsyncAwait,
  getCharacterBySearchingAsyncAwait,
} from './services';

export default function App() {
  const inputSearch = useRef(null);
  const [data, setData] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [detailsSelectedCharacter, setDetailsSelectedCharacter] = useState({});
  const [errorState, setErrorState] = useState({
    hasError: false,
  });
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = 'https://swapi.dev/api/people';
    getCharactersAsyncAwait()
      .then((characters) => {
        setData([...characters]);
      })
      .catch(handleError);
  }, []);

  useEffect(() => {
    console.log('test');
    getCharacterByIdAsyncAwait(currentCharacter)
      .then((character) => {
        console.log('characters', character);
        setDetailsSelectedCharacter({
          ...character,
        });
      })
      .catch(handleError);
  }, [currentCharacter]);

  const handleError = () => {
    setErrorState({
      hasError: true,
      message: err.message,
    });
  };

  const handleOnClickItem = (url) => {
    const characterId = Number(url.split('/').slice(-2)[0]);
    setCurrentCharacter(characterId);
  };

  const onChangeTextSearch = (e) => {
    e.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  };

  const onSearchSubmit = (e) => {
    if (event.key !== 'Enter') return;
    console.log('buscamos por el search');
    console.log(textSearch);
    getCharacterBySearchingAsyncAwait(textSearch).then((data) => {
      console.log(data);
    });
  };

  const modifyPage = (numberToAdd) => {
    if( (page >= 1 && numberToAdd > 0)
      || (page > 1 && numberToAdd < 0 )
    ) {// estoy en la primer pagina solo permito sumar no restar
      setPage(previousPage => previousPage + numberToAdd)  
    }
  }

  return (
    <div>
      <input
        ref={inputSearch}
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
        type="text"
        placeholder="Buscar un personaje..."
      />
      <ul>
        {/* {errorState.hasError && <div>{errorState.message}</div>} */}
        {data.map((character) => {
          return (
            <li onClick={() => handleOnClickItem(character.url)}>
              {character.name}
            </li>
          );
        })}
      </ul>
      <section>
        <button
          onClick={() => modifyPage(-1)}
        >previous</button>
        {page}
        <button
          onClick={() => modifyPage(+1)}
        >next</button>
      </section>
      <div>
        <h1>{detailsSelectedCharacter.name}</h1>
        <p>{detailsSelectedCharacter.mass}</p>
        <p>{detailsSelectedCharacter.height}</p>
      </div>
    </div>
  );
}
