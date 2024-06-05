import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  LuBedDouble,
  LuCheckCircle2,
  LuMessageCircle,
  LuMoon,
} from "react-icons/lu";

import {
  formatDistanceFromNow,
  formatCurrency,
  pluralize,
} from "../../utils/helpers";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    font-weight: 600;
    font-size: 1.6rem;
  }

  p {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$ispaid ? "var(--color-green-100)" : "var(--color-orange-100)"};
  color: ${(props) =>
    props.$ispaid ? "var(--color-green-700)" : "var(--color-orange-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const MainPriceTag = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: {
      fullName: guestName,
      email,
      nationality: country,
      countryFlag,
      nationalID,
      state: guestState,
    },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <p>
            <LuBedDouble />
            <span>{cabinName}</span>
          </p>
          <p>
            <LuMoon />
            <span>
              {numNights} {pluralize("night", numNights)}
            </span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          )
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName}{" "}
            {numGuests > 1
              ? `+ ${numGuests - 1} ${pluralize("guest", numGuests - 1)}`
              : ""}
          </p>
          <span>&bull;</span>
          <p>{`${guestState ? guestState + ", " : ""}${country}`}</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID - {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem icon={<LuMessageCircle />} label="Observations">
            {observations}
          </DataItem>
        )}

        <DataItem icon={<LuCheckCircle2 />} label="Breakfast included ?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price $ispaid={isPaid}>
          <DataItem label={`Total price at the time of booking `}>
            <MainPriceTag>{formatCurrency(totalPrice)}</MainPriceTag>

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
