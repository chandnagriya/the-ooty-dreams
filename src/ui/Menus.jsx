import { createContext, useContext, useState } from "react";
import styled from "styled-components";

import useOutsideClick from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  padding: 0.2rem;
  border: none;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-200);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
  }
`;

const StyledList = styled.ul`
  position: absolute;
  z-index: 1;
  width: max-content;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const GAP_IN_RIGHT_OF_TOGGLE = -7;
const GAP_BELOW_TOGGLE = 40;

const MenuContext = createContext();

function Menus({ children }) {
  const [openedMenu, setOpenedMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({});

  const closeMenu = () => setOpenedMenu(null);
  const openMenu = setOpenedMenu;

  return (
    <MenuContext.Provider
      value={{ openedMenu, openMenu, closeMenu, menuPosition, setMenuPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function ToggleMenu({ id, children }) {
  const { openedMenu, openMenu, closeMenu, setMenuPosition } =
    useContext(MenuContext);

  function handleClick(e) {
    if (id == openedMenu) {
      closeMenu();
      return;
    }

    e.stopPropagation();

    setMenuPosition({
      x: GAP_IN_RIGHT_OF_TOGGLE,
      y: GAP_BELOW_TOGGLE,
    });

    openMenu(id);
  }

  return <StyledToggle onClick={handleClick}>{children}</StyledToggle>;
}

function MenuList({ id, children }) {
  const { openedMenu, closeMenu, menuPosition } = useContext(MenuContext);
  const ref = useOutsideClick(closeMenu, false);

  if (openedMenu !== id) return null;

  return (
    <StyledList position={menuPosition} ref={ref}>
      {children}
    </StyledList>
  );
}

function MenuListItem({ icon, onClick, disabled, children }) {
  const { closeMenu } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    closeMenu();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.ToggleMenu = ToggleMenu;
Menus.MenuList = MenuList;
Menus.MenuListItem = MenuListItem;

export default Menus;
