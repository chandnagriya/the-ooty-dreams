import { CABIN_FILTERS, CABIN_SORT } from "./CABIN_FILTERS_AND_SORT";

import AddCabin from "./AddCabin";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={CABIN_FILTERS.filterField}
        options={CABIN_FILTERS.options}
        defaultValue={CABIN_FILTERS.defaultValue}
      />
      <SortBy
        options={CABIN_SORT.options}
        defaultValue={CABIN_SORT.defaultValue}
        type="white"
      />
      <AddCabin />
    </TableOperations>
  );
}

export default CabinTableOperations;
