import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import {
  LuArrowLeftFromLine,
  LuArrowRightToLine,
  LuEye,
  LuMoreVertical,
  LuTrash2,
} from "react-icons/lu";

import useCheckoutBooking from "../check-in-out/useCheckoutBooking";
import useDeleteBooking from "./useDeleteBooking";

import { formatCurrency, pluralize } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import { BOOKING_STATUS_TAGS } from "./BOOKING_CONFIG";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:nth-child(2) {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const CountryStateContainer = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 4px;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  font-weight: 600;
`;

const CountryFlag = styled.img`
  display: block;

  width: 35px;
  aspect-ratio: 3 / 2;
  object-position: center;
  border: 1px solid var(--color-grey-300);
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: {
      fullName: guestName,
      email,
      nationality,
      countryFlag,
      state: guestState,
    },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();

  const { checkingOut, checkOutBooking } = useCheckoutBooking();
  const { deletingBooking, deleteBooking } = useDeleteBooking();

  function handleShowDetails() {
    navigate(`/bookings/${bookingId}`);
  }

  function handleCheckIn() {
    navigate(`/checkin/${bookingId}`);
  }

  function handleCheckout() {
    checkOutBooking(bookingId);
  }

  function handleDelete() {
    deleteBooking(bookingId);
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
        <CountryStateContainer>
          {`${guestState ? guestState + "," : ""} ${nationality}`}
          <CountryFlag src={countryFlag} alt={nationality + " flag"} />
        </CountryStateContainer>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} {pluralize("night", numNights)} stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={BOOKING_STATUS_TAGS[status]} $movetoright="true">
        {status.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Table.CellData movetop="-4px">
        <Modal>
          <Menus.Menu>
            <Menus.ToggleMenu id={bookingId}>
              <LuMoreVertical />
            </Menus.ToggleMenu>
            <Menus.MenuList id={bookingId}>
              <Menus.MenuListItem icon={<LuEye />} onClick={handleShowDetails}>
                Show details
              </Menus.MenuListItem>

              {status === "unconfirmed" && (
                <Menus.MenuListItem
                  icon={<LuArrowRightToLine />}
                  onClick={handleCheckIn}
                >
                  Check in
                </Menus.MenuListItem>
              )}

              {status === "checked-in" && (
                <Menus.MenuListItem
                  icon={<LuArrowLeftFromLine />}
                  onClick={handleCheckout}
                  disabled={checkingOut}
                >
                  Check out
                </Menus.MenuListItem>
              )}

              <Modal.Open opens="confirm-delete">
                <Menus.MenuListItem icon={<LuTrash2 />}>
                  Delete
                </Menus.MenuListItem>
              </Modal.Open>
            </Menus.MenuList>
          </Menus.Menu>

          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={handleDelete}
              disabled={deletingBooking}
            />
          </Modal.Window>
        </Modal>
      </Table.CellData>
    </Table.Row>
  );
}

export default BookingRow;
