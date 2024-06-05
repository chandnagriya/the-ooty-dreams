import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export default function useCheckinBooking() {
  const queryClient = useQueryClient();

  const { isLoading: checkingIn, mutate: checkInBooking } = useMutation({
    mutationFn: ({ checkInData, bookingId }) =>
      updateBooking(bookingId, checkInData),
    onSuccess: () => {
      toast.success("Checked-in successfully");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkingIn, checkInBooking };
}
