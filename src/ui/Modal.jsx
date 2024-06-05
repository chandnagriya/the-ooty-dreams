import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { LuX } from "react-icons/lu";

import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openedWindow, setOpenedWindow] = useState("");

  const openWindow = setOpenedWindow;
  const closeWindow = () => setOpenedWindow("");

  return (
    <ModalContext.Provider value={{ openedWindow, openWindow, closeWindow }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: openedWindow }) {
  const { openWindow } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => openWindow(openedWindow) });
}

function Window({ children, name }) {
  const { openedWindow, closeWindow } = useContext(ModalContext);
  const ref = useOutsideClick(closeWindow);

  if (openedWindow !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button>
          <LuX onClick={closeWindow} />
        </Button>
        <div>{cloneElement(children, { closeModal: closeWindow })}</div>
      </StyledModal>
    </Overlay>,
    document.getElementById("root")
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
