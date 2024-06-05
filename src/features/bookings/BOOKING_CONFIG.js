const BOOKING_STATUS_FILTER_URL_FILED = "status";
const BOOKING_GUEST_NATIONALITY_FILTER_URL_FIELD = "guest-nationality";

const BOOKING_STATUS_FILTER_VALUES = {
  ALL: {
    urlValue: "All",
    dbFilterField: null,
  },
  CHECKED_OUT: {
    urlValue: "Checked-out",
    dbFilterField: "status",
    dbValue: "checked-out",
    dbMethod: "eq",
  },
  CHECKED_IN: {
    urlValue: "Checked-in",
    dbFilterField: "status",
    dbValue: "checked-in",
    dbMethod: "eq",
  },
  UNCONFIRMED: {
    urlValue: "Unconfirmed",
    dbFilterField: "status",
    dbValue: "unconfirmed",
    dbMethod: "eq",
  },
};

const BOOKING_GUEST_NATIONALITY_FILTER_VALUES = {
  ALL: {
    urlValue: "All",
    dbFilterField: null,
  },
  INDIANS: {
    urlValue: "Indians",
    dbFilterField: "guests.nationality",
    dbValue: "India",
    dbMethod: "eq",
  },
  FOREIGNERS: {
    urlValue: "Foreigners",
    dbFilterField: "guests.nationality",
    dbValue: "India",
    dbMethod: "neq",
  },
};

const BOOKING_FILTERS = [
  {
    urlFieldName: BOOKING_STATUS_FILTER_URL_FILED,
    values: BOOKING_STATUS_FILTER_VALUES,
  },
  {
    urlFieldName: BOOKING_GUEST_NATIONALITY_FILTER_URL_FIELD,
    values: BOOKING_GUEST_NATIONALITY_FILTER_VALUES,
  },
];

const BOOKING_STATUS_FILTER = {
  filterField: BOOKING_STATUS_FILTER_URL_FILED,
  defaultValue: BOOKING_STATUS_FILTER_VALUES.ALL,
  options: [
    { label: "All Status", value: BOOKING_STATUS_FILTER_VALUES.ALL.urlValue },
    {
      label: "Checked-out",
      value: BOOKING_STATUS_FILTER_VALUES.CHECKED_OUT.urlValue,
    },
    {
      label: "Checked-in",
      value: BOOKING_STATUS_FILTER_VALUES.CHECKED_IN.urlValue,
    },
    {
      label: "Unconfirmed",
      value: BOOKING_STATUS_FILTER_VALUES.UNCONFIRMED.urlValue,
    },
  ],
};

const BOOKING_GUEST_NATIONALITY_FILTER = {
  filterField: BOOKING_GUEST_NATIONALITY_FILTER_URL_FIELD,
  defaultValue: BOOKING_GUEST_NATIONALITY_FILTER_VALUES.ALL,
  options: [
    {
      label: "All Nationals",
      value: BOOKING_GUEST_NATIONALITY_FILTER_VALUES.ALL.urlValue,
    },
    {
      label: "Indians",
      value: BOOKING_GUEST_NATIONALITY_FILTER_VALUES.INDIANS.urlValue,
    },
    {
      label: "Foreigners",
      value: BOOKING_GUEST_NATIONALITY_FILTER_VALUES.FOREIGNERS.urlValue,
    },
  ],
};

const BOOKING_SORT = {
  defaultValue: "StartDate-desc",
  options: [
    { label: "Sort by date (newer first)", value: "StartDate-desc" },
    { label: "Sort by date (older first)", value: "StartDate-asc" },
    { label: "Sort by amount (high first)", value: "TotalPrice-desc" },
    { label: "Sort by amount (low first)", value: "TotalPrice-asc" },
  ],
};

const BOOKING_STATUS_TAGS = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

const BOOKING_STATUS_TAGS_DETAILED = {
  CHECKED_OUT: "CHECKED_OUT",
  CHECKED_OUT_TODAY: "CHECKED_OUT_TODAY",
  STAYED: "STAYED",
  STAYING: "STAYING",
  WILL_DEPART: "WILL_DEPART",
  ARRIVED_TODAY: "ARRIVED_TODAY",
  WILL_ARRIVE: "WILL_ARRIVE",
  WILL_BE_ARRIVING: "WILL_BE_ARRIVING",
};

export {
  BOOKING_FILTERS,
  BOOKING_STATUS_FILTER,
  BOOKING_GUEST_NATIONALITY_FILTER,
  BOOKING_SORT,
  BOOKING_STATUS_TAGS,
  BOOKING_STATUS_TAGS_DETAILED,
};
