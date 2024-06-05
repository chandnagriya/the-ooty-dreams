import styled, { css } from "styled-components";

const StyledImagePreview = styled.img`
  display: block;
  width: 6.4rem;
  object-fit: cover;
  object-position: center;
  ${(props) =>
    props.$noratio === "false" &&
    css`
      aspect-ratio: 3 / 2;
    `}
  ${(props) =>
    props.$scaleimage == "true" &&
    css`
      transform: scale(1.5) translateX(-7px);
    `};
`;

function ImagePreview({ src, scaleImage = false, noRatio = false }) {
  return (
    <StyledImagePreview
      src={src}
      $scaleimage={scaleImage.toString()}
      $noratio={noRatio.toString()}
    />
  );
}

export default ImagePreview;
