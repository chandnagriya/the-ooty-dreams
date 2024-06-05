import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookingsWithinRange } from "../../services/apiBookings";

import {
  addExtraDataForDashboardBookings,
  convertToPropertyName,
} from "../../utils/helpers";
import {
  DASHBOARD_TIME_FILTER,
  DASHBOARD_TIME_FILTER_URL_FILED,
  DASHBOARD_TIME_FILTER_VALUES,
} from "./DASHBOARD_CONFIG";

export function useBookingsStats() {
  const [searchParams] = useSearchParams();

  const filter =
    searchParams.get(DASHBOARD_TIME_FILTER_URL_FILED) ||
    DASHBOARD_TIME_FILTER.defaultValue;

  const timeFilterQuery =
    DASHBOARD_TIME_FILTER_VALUES[
      convertToPropertyName(filter.urlValue || filter)
    ].getTimeFilterQuery();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsWithinRange(timeFilterQuery),
    queryKey: ["bookings", filter.urlValue || filter],
    select: (data) =>
      addExtraDataForDashboardBookings(data, filter.urlValue || filter),
  });

  let numDays;

  if (bookings?.length) {
    const filterObj =
      DASHBOARD_TIME_FILTER_VALUES[
        convertToPropertyName(filter.urlValue || filter)
      ];

    if (filterObj.urlValue === DASHBOARD_TIME_FILTER_VALUES.ALL_TIME.urlValue) {
      const allTimeStartDate = bookings[0].startDate;
      const allTimeEndDate = bookings[bookings.length - 1].endDate;
      numDays = Math.abs(
        filterObj.getNumDays(allTimeStartDate, allTimeEndDate)
      );
    } else {
      numDays = Math.abs(filterObj.getNumDays());
    }
  }

  return { isLoading, bookings, numDays };
}
