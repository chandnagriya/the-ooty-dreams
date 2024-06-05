import styled from "styled-components";
import { Link } from "react-router-dom";

import CheckoutButton from "./CheckoutButton";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";

const StyledBookingActivityItem = styled.li`
  display: grid;
  grid-template-columns: 22rem 20rem auto;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 1.2rem 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media (min-width: 1601px) {
    grid-template-columns: 23rem 18rem 12rem;
  }

  @media (max-width: 1600px) {
    grid-template-columns: 21.5rem 16rem 10rem;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

const Guest = styled.div`
  width: 75%;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function BookingActivityItem({ activity }) {
  const { id, status, guests, tag } = activity;

  return (
    <StyledBookingActivityItem>
      <Tag type={tag.color}>{tag.text}</Tag>

      <StyledContainer>
        <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
        <Guest>{guests.fullName}</Guest>
      </StyledContainer>

      {status === "unconfirmed" && (
        <Button
          $size="small"
          $variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledBookingActivityItem>
  );
}

export default BookingActivityItem;
