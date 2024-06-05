import styled from "styled-components";
import { LuFileMinus } from "react-icons/lu";

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  height: 40rem;
  width: 100%;

  div {
    aspect-ratio: 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: var(--color-grey-200);

    & svg {
      width: 4.8rem;
      height: 4.8rem;
      color: var(--color-grey-400);
    }
  }

  p {
    font-size: 1.8rem;
    letter-spacing: 0.2px;
    color: var(--color-grey-400);
  }
`;

function Empty({ message }) {
  return (
    <EmptyContainer>
      <div>
        <LuFileMinus />
      </div>
      <p>{message}</p>
    </EmptyContainer>
  );
}

export default Empty;
