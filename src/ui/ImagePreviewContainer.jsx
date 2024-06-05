import styled from "styled-components";

const ImagePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  & span {
    border-radius: var(--border-radius-sm);
    padding: 0.6rem;
    display: flex;
    align-items: center;

    & svg {
      width: 2rem;
      height: 2rem;
      color: var(--color-grey-400);
      transition: all 0.3s;

      &:hover {
        color: var(--color-brand-600);
      }
    }

    &:hover {
      cursor: pointer;
      background-color: var(--color-grey-100);
    }
  }
`;

export default ImagePreviewContainer;
