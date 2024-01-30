import React, { Children, FC, useRef, useState } from "react";
import "./App.css";
import { List } from "./components/List";
import { useDictionary } from "./hooks/useDictionary";
import Search from "./components/Search";
import { useScrollPosition } from "./hooks/useScrollPosition";

function App() {
  const { dictionary, loading } = useDictionary();
  const [search, setSearch] = useState<string>("");

  const linkRef = useRef(null);

  const scrollPosition = useScrollPosition(linkRef);

  return (
    <div className="app">
      <div className="header">
        <div>Render Virtualized</div>
      </div>
      <div className="content">
        <Search setSearch={setSearch} search={search} />
        <List
          items={dictionary}
          loading={loading}
          search={search}
          linkRef={linkRef}
        />
      </div>
      <p style={{ margin: 20, fontSize: 12 }}>
        Scroll Position : {scrollPosition}
      </p>
    </div>
  );
}

export default App;
