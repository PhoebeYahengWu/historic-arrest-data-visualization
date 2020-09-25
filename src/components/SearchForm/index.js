import React from "react";
import "./style.css";

function SearchForm({ results, handleInputChange }) {
  return (
    <div className="input-group mb-3">
      <select
        className="custom-select"
        id="inputGroupSelect01"
        onChange={handleInputChange}
      >
        <option value=""> Choose Arrest Type </option>
        {results.map((ele, i) => (
          <option key={i + "-el"} value={ele}>
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
}

SearchForm.defaulProps = {
  results: [],
};

export default SearchForm;
