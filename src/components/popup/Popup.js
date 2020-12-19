import React from "react";
import "./Popup.scss";

const Popup = ({ message, btnText, btnCallback }) => {
  return (
    <main className="popup-container">
      <section className="popup">
        <div className="popup-message">{message}</div>
        <input
          type="button"
          value={btnText}
          className="ok-btn"
          onClick={btnCallback}
        />
      </section>
    </main>
  );
};

export default Popup;
