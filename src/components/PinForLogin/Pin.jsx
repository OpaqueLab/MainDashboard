import React, { useState, useEffect, useRef } from "react";

const Pin = () => {
  const [pin, setPin] = useState(["", "", "", ""]);

  const pinContainerRef = useRef(null);

  useEffect(() => {
    const handleKeyUp = (event) => {
      const target = event.target;
      const maxLength = parseInt(target.getAttribute("maxlength"), 10);
      const myLength = target.value.length;

      const newPin = [...pin];

      if (myLength >= maxLength) {
        let next = target;
        while ((next = next.nextElementSibling)) {
          if (next === null) break;
          if (next.classList.contains("pin")) {
            next.focus();
            break;
          }
        }
      }

      if (myLength === 0) {
        let next = target;
        while ((next = next.previousElementSibling)) {
          if (next === null) break;
          if (next.classList.contains("pin")) {
            next.focus();
            break;
          }
        }
      }

      newPin[target.tabIndex] = target.value;
      setPin(newPin);
    };

    const handleKeyDown = (event) => {
      const target = event.target;
      target.value = "";
      const newPin = [...pin];
      newPin[target.tabIndex] = "";
      setPin(newPin);
    };

    const pinContainer = pinContainerRef.current;

    if (pinContainer) {
      pinContainer.addEventListener("keyup", handleKeyUp);
      pinContainer.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (pinContainer) {
        pinContainer.removeEventListener("keyup", handleKeyUp);
        pinContainer.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [pin]);

  return (
    <div>
      <div className="pin-code flex gap-5" ref={pinContainerRef}>
        <input
          className="pin"
          type="number"
          maxLength="1"
          autoFocus
          tabIndex={0}
        />
        <input className="pin" type="number" maxLength="1" tabIndex={1} />
        <input className="pin" type="number" maxLength="1" tabIndex={2} />
        <input className="pin" type="number" maxLength="1" tabIndex={3} />
      </div>
      <div className="text-white">Entered PIN: {pin.join("")}</div>
    </div>
  );
};

export default Pin;
