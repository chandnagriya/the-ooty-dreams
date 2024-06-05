import { useEffect, useRef } from "react";

export default function useOutsideClick(handleClose, useCapture = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handleClose();
      }

      document.addEventListener("click", handleClick, useCapture);

      return () =>
        document.removeEventListener("click", handleClick, useCapture);
    },
    [handleClose, useCapture]
  );

  return ref;
}
