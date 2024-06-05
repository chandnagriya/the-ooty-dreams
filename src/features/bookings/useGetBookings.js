import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings as getBookingsAPI } from "../../services/apiBookings";

import { convertToPropertyName, getSortByDetails } from "../../utils/helpers";

import { BOOKING_FILTERS, BOOKING_SORT } from "./BOOKING_CONFIG";
import { BOOKINGS_PAGINATION_RESULTS } from "../../utils/constant";

export default function useGetBookings() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  let filters = [];

  for (const filterObj of BOOKING_FILTERS) {
    const filterValue = searchParams.get(filterObj.urlFieldName);

    if (filterValue) {
      const filterFieldDetails =
        filterObj.values[convertToPropertyName(filterValue)];

      if (filterFieldDetails.dbFilterField) {
        filters.push({
          dbField: filterFieldDetails.dbFilterField,
          dbValue: filterFieldDetails.dbValue,
          dbMethod: filterFieldDetails.dbMethod,
        });
      }
    }
  }

  const sortBy = searchParams.get("sortBy") || BOOKING_SORT.defaultValue;
  let [sortField, sortDirection] = getSortByDetails(sortBy);

  const sort = {
    field: sortField,
    direction: {
      ascending: sortDirection === "asc",
    },
  };

  const page = Number(searchParams.get("page")) || 1;

  const {
    isLoading: gettingBookings,
    data: { data: bookings, count: bookingsCount } = {},
  } = useQuery({
    queryKey: ["bookings", filters, sort, page],
    queryFn: () => getBookingsAPI(filters, sort, page),
  });

  if (bookings === null && bookingsCount === null) {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const totalPages = Math.ceil(bookingsCount / BOOKINGS_PAGINATION_RESULTS);

  if (page + 1 < totalPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sort, page + 1],
      queryFn: () => getBookingsAPI(filters, sort, page + 1),
    });

  if (page - 1 > 0) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sort, page - 1],
      queryFn: () => getBookingsAPI(filters, sort, page - 1),
    });
  }

  return { gettingBookings, bookings, bookingsCount };
}
