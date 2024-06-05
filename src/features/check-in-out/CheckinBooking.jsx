import { useEffect, useState } from "react";
import styled from "styled-components";
import { format, isToday } from "date-fns";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBooking from "../bookings/useGetBooking";
import useGetSettings from "../settings/useGetSettings";
import useCheckinBooking from "./useCheckinBooking";

import { formatCurrency, updateDatesToToday } from "../../utils/helpers";
import { BOOKING_STATUS_TAGS } from "../bookings/BOOKING_CONFIG";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import Checkbox from "../../ui/Checkbox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;

  p {
    margin-left: 4rem;
    font-size: 1.4rem;
    color: var(--color-grey-500);
  }

  span {
    color: var(--color-grey-900);
    font-weight: 500;
  }
`;

const PriceTag = styled.span`
  font-size: 1.8rem;
  color: var(--color-grey-900);
  font-weight: 700;
`;

const CheckBoxActionInfo = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  border-top: 1px solid var(--color-grey-200);
  padding-top: 1.2rem;
`;

function CheckinBooking() {
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);

  const moveBack = useMoveBack();
  const { gettingBooking, booking = {} } = useGetBooking();
  const { gettingSettings, settings = {} } = useGetSettings();
  const { checkingIn, checkInBooking } = useCheckinBooking();

  const { breakfastPrice } = settings;

  const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
    startDate,
    endDate,
    isPaid,
  } = booking;

  useEffect(
    function () {
      if (booking.isPaid && (booking.hasBreakfast || !addBreakfast)) {
        setConfirmPayment(true);
      } else {
        setConfirmPayment(false);
      }
    },
    [booking, addBreakfast]
  );

  if (gettingBooking || gettingSettings) return <Spinner />;

  const isBookingForToday = isToday(new Date(startDate));
  let newStartDate, newEndDate;

  if (!isBookingForToday) {
    [newStartDate, newEndDate] = updateDatesToToday(startDate, endDate);
  }

  function handleAddBreakfast() {
    setAddBreakfast((breakfast) => !breakfast);
  }

  function handleConfirmPayment() {
    setConfirmPayment(true);
  }

  function handleCheckin() {
    if (!confirmPayment) return;

    const checkInData = {
      status: "checked-in",
      isPaid: true,
      startDate: newStartDate,
      endDate: newEndDate,
    };

    if (addBreakfast) {
      checkInData.hasBreakfast = true;
      checkInData.extrasPrice = numNights * numGuests * breakfastPrice;
      checkInData.totalPrice =
        totalPrice + numNights * numGuests * breakfastPrice;
    }

    checkInBooking(
      { checkInData, bookingId },
      {
        onSuccess: function () {
          moveBack();
        },
      }
    );
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Check in booking #{bookingId}</Heading>
          <Tag type={BOOKING_STATUS_TAGS[status]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <>
            <Checkbox
              checked={addBreakfast}
              onChange={handleAddBreakfast}
              id="add-breakfast"
            >
              Add breakfast for{" "}
              <PriceTag>
                {formatCurrency(numNights * numGuests * breakfastPrice)}
              </PriceTag>
            </Checkbox>
            <CheckBoxActionInfo>
              <p>
                {formatCurrency(breakfastPrice)} Breakfast * {numNights} Nights
                *{numGuests} Guests
              </p>
            </CheckBoxActionInfo>
          </>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPayment}
          onChange={handleConfirmPayment}
          disabled={confirmPayment}
          id="confirm-payment"
        >
          {isPaid && (hasBreakfast || !addBreakfast)
            ? "Guest has already paid"
            : "I confirm that the guest has paid"}
          <PriceTag>
            {addBreakfast
              ? formatCurrency(
                  numNights * numGuests * breakfastPrice + totalPrice
                )
              : formatCurrency(totalPrice)}
          </PriceTag>
        </Checkbox>
        {!isBookingForToday && (
          <CheckBoxActionInfo>
            <p>
              Please note that the guest has originally not booked for today but
              since they have arrived today so we will start their stay from
              today.
            </p>
            <p>
              New checked-in date:{" "}
              <span>{format(new Date(newStartDate), "EEE, MMM dd yyyy")}</span>{" "}
            </p>{" "}
            <p>
              New check-out date:{" "}
              <span>{format(new Date(newEndDate), "EEE, MMM dd yyyy")}</span>
            </p>
          </CheckBoxActionInfo>
        )}
      </Box>
      <ButtonGroup>
        <Button
          disabled={!confirmPayment || checkingIn}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
