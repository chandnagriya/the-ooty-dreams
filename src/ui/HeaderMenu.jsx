import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LuUserCog } from "react-icons/lu";

import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";

import ButtonIcon from "./ButtonIcon";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <LuUserCog />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
