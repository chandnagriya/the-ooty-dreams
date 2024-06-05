import { LuLogOut } from "react-icons/lu";

import { useLogout } from "./useLogout";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <LuLogOut /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
