import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export default function useCheckoutBooking() {
  const queryClient = useQueryClient();

  const { isLoading: checkingOut, mutate: checkOutBooking } = useMutation({
    mutationFn: (bookingId) => {
      const checkOutData = {
        status: "checked-out",
        checkOutDate: new Date().toISOString(),
      };

      return updateBooking(bookingId, checkOutData);
    },
    onSuccess: () => {
      toast.success("Checked-out successfully");

      setTimeout(function () {
        queryClient.invalidateQueries({ active: true });
      }, 500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { checkingOut, checkOutBooking };
}
