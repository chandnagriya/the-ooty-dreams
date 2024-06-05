import useCheckoutBooking from "./useCheckoutBooking";

import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { checkingOut, checkOutBooking } = useCheckoutBooking();

  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkOutBooking(bookingId)}
      disabled={checkingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
