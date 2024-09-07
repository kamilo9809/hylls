import { useState } from "react";
import Search from "./../assets/icons/search.png";
import Filter from "./../assets/icons/Filter.svg";
import Line from "./../assets/icons/line.svg";
import VerticalLine from "./../assets/icons/vertical-line.svg";

const SearchBar = ({ onSearch, placeholderText }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    // Verificar si la tecla presionada es 'Enter'
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="items-center justify-center flex gap-4 pt-6">
        <button>
          <img loading="lazy" src={Search} alt="Search" />
        </button>
        <img loading="lazy" src={VerticalLine} alt="" />
        <input
          type="text"
          placeholder={placeholderText}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Agregar el manejador de eventos para 'Enter'
          className="border-none bg-transparent text-white w-1/"
        />
        <button onClick={handleSearch}>
          {" "}
          <img loading="lazy" src={Filter} alt="Filter" />
        </button>
      </div>
      <div className="items-center justify-center bg-transparent pt-0 flex">
      <img loading="lazy" src={Line} alt="Filter" className="w-4/5 pr-4 sm:w-4/12 sm:pr-14 sm:pl-8" />
      </div>
    </div>
  );
};

export default SearchBar;
