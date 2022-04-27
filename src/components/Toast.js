import { useEffect, useState } from "react";
import Portal from "./Portal";

function Toast({ text, type = "error", destroyAfterMs = 5000, className }) {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      clearTimeout(t);
      setHide(true);
    }, destroyAfterMs);
  }, []);

  return !hide ? (
    <Portal to="#notification-layer">
      <div className={`${className ? className : ""} toast toast-type-${type}`}>
        <p>{text}</p>
      </div>
    </Portal>
  ) : null;
}

export default Toast;
