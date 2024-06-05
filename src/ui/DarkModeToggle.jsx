import { LuMoon, LuSun } from "react-icons/lu";

import { useDarkMode } from "../context/DarkModeContext";

import ButtonIcon from "./ButtonIcon";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <LuSun /> : <LuMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
