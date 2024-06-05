const CABIN_FILTER_VALUES = {
  ALL: "All",
  WITH_DISCOUNT: "With-discount",
  NO_DISCOUNT: "No-discount",
};

const CABIN_FILTERS = {
  filterField: "discount",
  defaultValue: "All",
  options: [
    { label: "All", value: CABIN_FILTER_VALUES.ALL },
    { label: "With discount", value: CABIN_FILTER_VALUES.WITH_DISCOUNT },
    { label: "No Discount", value: CABIN_FILTER_VALUES.NO_DISCOUNT },
  ],
};

const CABIN_SORT = {
  defaultValue: "name-asc",
  options: [
    { label: "Sort by name (A-Z)", value: "Name-asc" },
    { label: "Sort by name (Z-A)", value: "Name-desc" },
    { label: "Sort by price (low first)", value: "RegularPrice-asc" },
    { label: "Sort by price (high first)", value: "RegularPrice-desc" },
  ],
};

export { CABIN_FILTER_VALUES, CABIN_FILTERS, CABIN_SORT };
