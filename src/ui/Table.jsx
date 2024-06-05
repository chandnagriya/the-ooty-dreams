import { createContext, useContext } from "react";
import styled, { css } from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: ${(props) => props.$rowalignment};
  transition: none;
  text-align: right;
`;

CommonRow.defaultProps = {
  $rowalignment: "center",
};

const StyledHeader = styled.div`
  display: block;
  padding: 0.4rem 0;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledCellData = styled.div`
  ${(props) =>
    props.$movetop &&
    css`
      margin-top: ${props.$movetop};
    `}
`;

const StyledBody = styled.div`
  margin: 0.4rem 0;
  background-color: var(--color-grey-0);
`;

const Footer = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const TableContext = createContext();

function Table({ columns, rowalignment, children }) {
  return (
    <TableContext.Provider value={{ columns, rowalignment }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  return <StyledHeader>{children}</StyledHeader>;
}

function Row({ children }) {
  const { columns, rowalignment } = useContext(TableContext);

  return (
    <StyledRow $columns={columns} $rowalignment={rowalignment}>
      {children}
    </StyledRow>
  );
}

function CellHeader({ children }) {
  return <div>{children}</div>;
}

function CellData({ movetop, children }) {
  return <StyledCellData $movetop={movetop}>{children}</StyledCellData>;
}

function Body({ data, render }) {
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.CellHeader = CellHeader;
Table.CellData = CellData;
Table.Footer = Footer;

export default Table;
