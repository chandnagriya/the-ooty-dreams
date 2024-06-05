import { useSearchParams } from "react-router-dom";
import {
  LuBriefcase,
  LuIndianRupee,
  LuKeySquare,
  LuSofa,
  LuTags,
  LuUsers,
  LuUtensils,
  LuUtensilsCrossed,
} from "react-icons/lu";

import { formatCurrency } from "../../utils/helpers";

import {
  DASHBOARD_DAY_FILTERS,
  DASHBOARD_TIME_FILTER,
  DASHBOARD_TIME_FILTER_URL_FILED,
} from "./DASHBOARD_CONFIG";
import { BOOKING_STATUS_TAGS_DETAILED } from "../bookings/BOOKING_CONFIG";

import Stat from "./Stat";

function Stats({ bookings, numDays, cabinCount }) {
  const [searchParams] = useSearchParams();

  const filter =
    searchParams.get(DASHBOARD_TIME_FILTER_URL_FILED) ||
    DASHBOARD_TIME_FILTER.defaultValue;

  const isDayFilter = DASHBOARD_DAY_FILTERS.includes(filter.urlValue || filter);

  const numBookings = bookings.length;

  const expectedGuests = bookings.reduce((acc, cur) => acc + cur.numGuests, 0);

  const expectedBreakfastGuests = bookings.reduce(
    (acc, cur) => (cur.hasBreakfast ? acc + cur.numGuests : acc),
    0
  );

  const nonOccupancyStatuses = [
    BOOKING_STATUS_TAGS_DETAILED.CHECKED_OUT_TODAY,
    BOOKING_STATUS_TAGS_DETAILED.WILL_DEPART,
  ];

  let bookingNightsSum;

  if (isDayFilter) {
    bookingNightsSum = bookings.filter(
      (booking) => !nonOccupancyStatuses.includes(booking.tag.status)
    ).length;
    numDays = 1;
  } else {
    bookingNightsSum = bookings.reduce((acc, cur) => acc + cur.numNights, 0);
  }

  const cabinOccupancy = Math.round(
    (bookingNightsSum / (numDays * cabinCount)) * 100
  );

  const expectedCabinRevenue = bookings.reduce(
    (acc, cur) => acc + cur.cabinPrice,
    0
  );

  const expectedBreakfastRevenue = bookings.reduce(
    (acc, cur) => acc + cur.extrasPrice,
    0
  );

  const expectedRevenue = bookings.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0
  );

  const totalDiscounts = bookings.reduce(
    (acc, cur) => acc + cur.cabins.discount * cur.numNights,
    0
  );

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<LuBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Expected Guests"
        color="orchid"
        icon={<LuUsers />}
        value={expectedGuests}
      />
      <Stat
        title="Expected Breakfast Guests"
        color="green"
        icon={<LuUtensilsCrossed />}
        value={expectedBreakfastGuests}
      />
      <Stat
        title="Expected Cabin Occupancy"
        color="pink"
        icon={<LuKeySquare />}
        value={cabinOccupancy + "%"}
      />
      <Stat
        title="Expected Total Revenue"
        color="yellow"
        icon={<LuIndianRupee />}
        value={formatCurrency(expectedRevenue)}
      />
      <Stat
        title="Expected Cabins Revenue"
        color="indigo"
        icon={<LuSofa />}
        value={formatCurrency(expectedCabinRevenue)}
      />
      <Stat
        title="Expected Breakfast Revenue"
        color="orange"
        icon={<LuUtensils />}
        value={formatCurrency(expectedBreakfastRevenue)}
      />

      <Stat
        title="Total Discounts"
        color="maroon"
        icon={<LuTags />}
        value={formatCurrency(totalDiscounts)}
      />
    </>
  );
}

export default Stats;
