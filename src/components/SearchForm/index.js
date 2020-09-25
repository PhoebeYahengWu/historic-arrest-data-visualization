import React from "react";
import "./style.css";

function SearchForm({ results, handleInputChange }) {
  // const selector = () => {
  //   let obj = {};

  //   if (props.results.length) {
  //     for (let i = 0; i < props.results.length; i++) {
  //       var key = props.results[i].ofns_desc;
  //       if (key) obj[key] = true;
  //     }
  //   }

  //   return (
  //     <div className="input-group mb-3">
  //       <select
  //         className="custom-select"
  //         id="inputGroupSelect01"
  //         onChange={props.handleInputChange}
  //       >
  //         <option value=""> Choose Arrest Type </option>
  //         {Object.keys(obj).sort().map((ele, i) => (
  //           <option key={i + "-el"} value={ele}>
  //             {ele.toLowerCase()}
  //           </option>
  //         ))}
  //       </select>
  //     </div>
  //   );
  // };

  // return <div> {selector()} </div>;

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
