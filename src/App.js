import React, { useState, useRef, useCallback } from "react";

import UserSearch from "./Usersearch";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, hasMore, book } = UserSearch(query, pageNumber);
  const Observer = useRef();
  const lastBookRef = useCallback(
    node => {
      if (loading) return;
      if (Observer.current) Observer.current.disconnect();
      Observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) Observer.current.observe(node);
    },
    [loading, hasMore]
  );
  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <React.Fragment>
      <input type="text" value={query} onChange={handleSearch}></input>
      {book.map((title, i) => {
        if (book.length === i + 1) {
          return (
            <div ref={lastBookRef} key={title}>
              {title}
            </div>
          );
        } else {
          return <div key={title}>{title}</div>;
        }
      })}

      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </React.Fragment>
  );
}

export default App;
