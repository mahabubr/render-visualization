import styled from "@emotion/styled";
import React from "react";

const SearchWrapper = styled.input`
  margin-bottom: 20px;
  width: 400px;
  padding: 8px 10px;
  &:focus {
    outline: none;
  }
`;

const Search = ({ setSearch, search }) => {
  return (
    <div>
      <SearchWrapper
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search here"
        value={search}
      />
    </div>
  );
};

export default Search;
