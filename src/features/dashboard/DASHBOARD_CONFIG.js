import {
  addDays,
  differenceInCalendarDays,
  endOfToday,
  startOfToday,
  subDays,
} from "date-fns";

const DASHBOARD_TIME_FILTER_URL_FILED = "bookingStats";

const DASHBOARD_TIME_FILTER_VALUES = {
  PAST_30_DAYS: {
    urlValue: "Past-30-Days",
    getTimeFilterQuery: () => {
      const yestderday = subDays(endOfToday(), 1).toISOString().split("T")[0];
      const past30thDay = subDays(startOfToday(), 30)
        .toISOString()
        .split("T")[0];

      const fromYesterday = `endDate.lte.${yestderday}`;
      const toPast30thDay = `startDate.gte.${past30thDay}`;
      const query = `and(${fromYesterday},${toPast30thDay})`;

      return query;
    },
    getNumDays: () => -30,
  },
  YESTERDAY: {
    urlValue: "Yesterday",
    getTimeFilterQuery: () => {
      const yestderday = subDays(endOfToday(), 1).toISOString().split("T")[0];

      const arrivedYesterday = `startDate.eq.${yestderday}`;
      const departedYesterday = `endDate.eq.${yestderday}`;
      const stayedYesterday = `and(startDate.lte.${yestderday},endDate.gte.${yestderday})`;

      return `${stayedYesterday},${arrivedYesterday},${departedYesterday}`;
    },
    getNumDays: () => -1,
  },
  TODAY: {
    urlValue: "Today",
    getTimeFilterQuery: () => {
      const today = endOfToday().toISOString().split("T")[0];
      const arrivingToday = `startDate.eq.${today}`;
      const departingToday = `endDate.eq.${today}`;
      const stayingToday = `and(startDate.lte.${today},endDate.gte.${today})`;

      return `${stayingToday},${arrivingToday},${departingToday}`;
    },
    getNumDays: () => 1,
  },
  TOMORROW: {
    urlValue: "Tomorrow",
    getTimeFilterQuery: () => {
      const tomorrow = addDays(endOfToday(), 1).toISOString().split("T")[0];

      const arrivingTomorrow = `startDate.eq.${tomorrow}`;
      const departingTomorrow = `endDate.eq.${tomorrow}`;
      const stayingTomorrow = `and(startDate.lte.${tomorrow},endDate.gte.${tomorrow})`;

      return `${stayingTomorrow},${arrivingTomorrow},${departingTomorrow}`;
    },
    getNumDays: () => 1,
  },
  NEXT_30_DAYS: {
    urlValue: "Next-30-Days",
    getTimeFilterQuery: () => {
      const tomorrow = addDays(endOfToday(), 1).toISOString().split("T")[0];
      const _30thDay = addDays(startOfToday(), 30).toISOString().split("T")[0];

      const fromTomorrow = `startDate.gte.${tomorrow}`;
      const to30thDay = `endDate.lte.${_30thDay}`;
      const query = `and(${fromTomorrow},${to30thDay})`;

      return query;
    },
    getNumDays: () => 30,
  },
  ALL_TIME: {
    urlValue: "All-Time",
    getTimeFilterQuery: () => "",
    getNumDays: (startDate, endDate) =>
      differenceInCalendarDays(new Date(startDate), new Date(endDate)) + 1,
  },
};

const DASHBOARD_DAY_FILTERS = [
  DASHBOARD_TIME_FILTER_VALUES.YESTERDAY.urlValue,
  DASHBOARD_TIME_FILTER_VALUES.TODAY.urlValue,
  DASHBOARD_TIME_FILTER_VALUES.TOMORROW.urlValue,
];

const DASHBOARD_TIME_FILTER = {
  filterField: DASHBOARD_TIME_FILTER_URL_FILED,
  defaultValue: DASHBOARD_TIME_FILTER_VALUES.TODAY,
  options: [
    {
      label: "Past 30 days",
      value: DASHBOARD_TIME_FILTER_VALUES.PAST_30_DAYS.urlValue,
    },
    {
      label: "Yesterday",
      value: DASHBOARD_TIME_FILTER_VALUES.YESTERDAY.urlValue,
    },
    {
      label: "Today",
      value: DASHBOARD_TIME_FILTER_VALUES.TODAY.urlValue,
    },
    {
      label: "Tomorrow",
      value: DASHBOARD_TIME_FILTER_VALUES.TOMORROW.urlValue,
    },
    {
      label: "Next 30 days",
      value: DASHBOARD_TIME_FILTER_VALUES.NEXT_30_DAYS.urlValue,
    },
    {
      label: "All time",
      value: DASHBOARD_TIME_FILTER_VALUES.ALL_TIME.urlValue,
    },
  ],
};

export {
  DASHBOARD_TIME_FILTER_URL_FILED,
  DASHBOARD_TIME_FILTER_VALUES,
  DASHBOARD_TIME_FILTER,
  DASHBOARD_DAY_FILTERS,
};
