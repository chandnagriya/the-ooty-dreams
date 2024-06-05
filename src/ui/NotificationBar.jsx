import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import { CRUD_ALLOWED_USER_EMAIL } from "../utils/constant";

const StyledNotificationBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  background-color: var(--color--notificationbar);
  font-weight: 500;
  color: var(--color-grey-700);
  font-size: 1.8rem;

  a {
    color: var(--color-brand-900);
    text-decoration: underline;
    margin-left: 3px;
  }
`;

function NotificationBar() {
  const { user, isLoading } = useUser();

  if (isLoading || !user || user.email === CRUD_ALLOWED_USER_EMAIL) {
    return null;
  }

  return (
    <StyledNotificationBar>
      CREATE, UPDATE and DELETE operations are disabled for this live app. Check
      here to see demo with this operations ➡️{" "}
      <a href="https://github.com/" target="_blank" rel="noreferrer">
        GITHUB
      </a>
    </StyledNotificationBar>
  );
}

export default NotificationBar;
