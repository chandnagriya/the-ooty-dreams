import {
  BOOKING_GUEST_NATIONALITY_FILTER,
  BOOKING_SORT,
  BOOKING_STATUS_FILTER,
} from "./BOOKING_CONFIG";

import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={BOOKING_STATUS_FILTER.filterField}
        options={BOOKING_STATUS_FILTER.options}
        defaultValue={BOOKING_STATUS_FILTER.defaultValue}
      />

      <Filter
        filterField={BOOKING_GUEST_NATIONALITY_FILTER.filterField}
        options={BOOKING_GUEST_NATIONALITY_FILTER.options}
        defaultValue={BOOKING_GUEST_NATIONALITY_FILTER.defaultValue}
      />

      <SortBy
        options={BOOKING_SORT.options}
        defaultValue={BOOKING_SORT.defaultValue}
        type="white"
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
