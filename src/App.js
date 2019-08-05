import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchInputRef = useRef();

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    fetchData();
  };

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-200 shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-10"
      />
      <h1 className="text-gray-900 font-thin text-3xl mb-1">Hooks News</h1>
      <form onSubmit={handleSearch} className="mb-2 ">
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange-400 rounded m-1 px-2 py-1">
          Search
        </button>
        <button
          type="button"
          onClick={handleClearSearch}
          className="bg-teal-400 text-white px-2 py-1 rounded">
          Clear
        </button>
      </form>
      {loading ? (
        <div className="font-bold text-orange-700">Loading results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a
                href="{result.url}"
                className="text-indigo-700 hover:text-indigo-900">
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red-600 font-bold">{error.message}</div>}
    </div>
  );
}
