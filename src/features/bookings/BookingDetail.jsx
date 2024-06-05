import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBooking from "./useGetBooking";
import useCheckoutBooking from "../check-in-out/useCheckoutBooking";
import useDeleteBooking from "./useDeleteBooking";

import { BOOKING_STATUS_TAGS } from "./BOOKING_CONFIG";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  const { gettingBooking, booking = {} } = useGetBooking();
  const { checkingOut, checkOutBooking } = useCheckoutBooking();
  const { deletingBooking, deleteBooking } = useDeleteBooking();

  if (gettingBooking) return <Spinner />;

  if (!gettingBooking && !Object.keys(booking).length)
    return <Empty message="Requested booking does not exist" />;

  const { id: bookingId, status, checkOutDate } = booking;

  function handleCheckIn() {
    navigate(`/checkin/${bookingId}`);
  }

  function handleCheckout() {
    checkOutBooking(bookingId, {
      onSuccess: () => moveBack(),
    });
  }

  function handleDelete() {
    deleteBooking(bookingId, {
      onSuccess: () => moveBack(),
    });
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={BOOKING_STATUS_TAGS[status]}>
            {status.replace("-", " ")}{" "}
            {status === "checked-out" &&
              `at ${format(new Date(checkOutDate), "EEE, MMM dd yyyy")}`}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            $variation="primary"
            onClick={handleCheckout}
            disabled={checkingOut}
          >
            Check out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button $variation="primary" onClick={handleCheckIn}>
            Check in
          </Button>
        )}
        <Modal>
          <Modal.Open opens="confirm-delete">
            <Button
              $variation="danger"
              onClick={handleDelete}
              disabled={deletingBooking}
            >
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={handleDelete}
              disabled={deletingBooking}
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
