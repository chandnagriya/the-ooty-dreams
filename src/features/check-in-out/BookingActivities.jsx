import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  DASHBOARD_TIME_FILTER,
  DASHBOARD_TIME_FILTER_URL_FILED,
  DASHBOARD_TIME_FILTER_VALUES,
} from "../dashboard/DASHBOARD_CONFIG";

import BookingActivityItem from "./BookingActivityItem";

import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

const StyledBookingActivities = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const ActivitiesList = styled.ul`
  overflow-y: auto;
`;

function BookingActivities({ activities }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activityDay =
    searchParams.get(DASHBOARD_TIME_FILTER_URL_FILED) ||
    DASHBOARD_TIME_FILTER.defaultValue;

  const timeFilterValue = activityDay.urlValue || activityDay;

  const activityTag = `${timeFilterValue
    .split("-")
    .map((part, index) => (index === 0 ? part : part.toLowerCase()))
    .join(" ")}'s activities`;

  const totalActivities = activities.length;
  const trimmedActivities = totalActivities > 10 ? totalActivities - 10 : 0;

  if (
    trimmedActivities &&
    timeFilterValue === DASHBOARD_TIME_FILTER_VALUES.ALL_TIME.urlValue
  ) {
    activities = activities
      .slice(totalActivities - 10, totalActivities)
      .reverse();
  } else if (trimmedActivities) {
    activities = activities.slice(0, 10);
  }

  return (
    <StyledBookingActivities>
      <Row type="horizontal">
        <Heading as="h2">{activityTag}</Heading>
      </Row>

      <>
        <ActivitiesList>
          {activities.map((activity) => (
            <BookingActivityItem activity={activity} key={activity.id} />
          ))}
        </ActivitiesList>
        {trimmedActivities > 0 && (
          <Button onClick={() => navigate("/bookings")} $variation="secondary">
            See {trimmedActivities} more on bookings page
          </Button>
        )}
      </>
    </StyledBookingActivities>
  );
}

export default BookingActivities;
