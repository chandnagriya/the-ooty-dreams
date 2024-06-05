import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBookings";

export default function useGetBooking() {
  const { bookingId } = useParams();

  const { isLoading: gettingBooking, data: booking } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { gettingBooking, booking };
}
