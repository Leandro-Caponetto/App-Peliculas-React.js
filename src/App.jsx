/** @format */

import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Movies } from "./components/Movies";

import { useMovies } from "./hook/useMovies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("No se puede buscar una pelicula vacía");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un número");
      return;
    }
    if (search.length < 3) {
      setError("La pelicula debe tener al menos 3 caracter");
      return;
    }
    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const { movies } = useMovies();
  const { search, updateSearch, error } = useSearch();
  // const inputRef = useRef();
  // const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO se debe a la propiedad current.value
    // const value = inputRef.current.value;
    // console.log(value);
    console.log(search);
  };
  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "green",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Avenger, Star Wars..."
          />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
