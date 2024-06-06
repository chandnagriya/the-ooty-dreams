import styled, { css } from "styled-components";

import { useBookingsStats } from "./useBookingsStats";
import useGetCabins from "../cabins/useGetCabins";

import BookingActivities from "../check-in-out/BookingActivities";
import CabinsChart from "./CabinChart";
import GuestsRegionChart from "./GuestsRegionChart";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

const StyledDashboardLayout = styled.div`
  width: 100%;

  ${(props) =>
    props.$dataexists === "true" &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-rows: auto auto 37rem auto;
      gap: 2.4rem;
    `}

  ${(props) =>
    props.$dataexists === "false" &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

function DashboardLayout() {
  const { bookings, numDays, isLoading: isLoading1 } = useBookingsStats();
  const { cabins, gettingCabins: isLoading2 } = useGetCabins();

  if (isLoading1 || isLoading2) return <Spinner />;

  const bookingsExist = Boolean(bookings.length);

  return (
    <StyledDashboardLayout $dataexists={bookingsExist ? "true" : "false"}>
      {!bookingsExist && (
        <Empty message="No bookings exist for the selected time" />
      )}
      {bookingsExist && (
        <>
          <Stats
            bookings={bookings}
            numDays={numDays}
            cabinCount={cabins.length}
          />
          <BookingActivities activities={bookings} />
          <CabinsChart cabins={cabins} bookings={bookings} />
          <GuestsRegionChart bookings={bookings} />
        </>
      )}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
