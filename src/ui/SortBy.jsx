import { useSearchParams } from "react-router-dom";

import Select from "./Select";

function SortBy({ options, defaultValue, type }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || defaultValue;

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      type={type}
    ></Select>
  );
}

export default SortBy;
