import useGetBookings from "./useGetBookings";

import { BOOKINGS_PAGINATION_QUERY_NAME } from "../../utils/constant";

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { gettingBookings, bookings, bookingsCount } = useGetBookings();

  if (gettingBookings) return <Spinner />;

  if (!bookings.length)
    return <Empty message="No bookings exist for the selected filters" />;

  return (
    <Menus>
      <Table
        columns="2fr 1.9fr 1.9fr 1fr 0.9fr 0.7fr"
        rowalignment="flex-start"
      >
        <Table.Header>
          <Table.Row>
            <Table.CellHeader>Cabin</Table.CellHeader>
            <Table.CellHeader>Guest</Table.CellHeader>
            <Table.CellHeader>Dates</Table.CellHeader>
            <Table.CellHeader>Status</Table.CellHeader>
            <Table.CellHeader>Amount</Table.CellHeader>
            <Table.CellHeader></Table.CellHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination
            results={bookingsCount}
            queryParam={BOOKINGS_PAGINATION_QUERY_NAME}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
