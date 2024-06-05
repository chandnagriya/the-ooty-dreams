import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { GLOBAL_PAGINATION_RESULTS } from "../utils/constant";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  &:disabled {
    color: var(--color-grey-400);
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({
  results,
  resultsPerPage = GLOBAL_PAGINATION_RESULTS,
  queryParam = "page",
}) {
  const totalPages = Math.ceil(results / resultsPerPage);

  const [searchParams, setSearchParams] = useSearchParams();

  const currPage = Number(searchParams.get(queryParam)) || 1;

  const minResult = (currPage - 1) * resultsPerPage + 1;
  const maxResult =
    currPage === totalPages ? results : currPage * resultsPerPage;

  function handlePrevious() {
    if (currPage === 1) return;

    searchParams.set(queryParam, currPage - 1);
    setSearchParams(searchParams);
  }

  function handleNext() {
    if (currPage === totalPages) return;

    searchParams.set(queryParam, currPage + 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>{minResult}</span> to <span>{maxResult}</span> results of{" "}
        <span>{results}</span> results.
      </P>
      <Buttons>
        <PaginationButton onClick={handlePrevious} disabled={currPage === 1}>
          <LuChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={handleNext}
          disabled={currPage === totalPages}
        >
          <span>Next</span>
          <LuChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
