import React from "react";
import "./Header.scss";
import history from "../../routes/history";

import laughingKitten from "../../assets/img/laughing-kitten.png";
import loader from "../../assets/img/loader.svg";

const Header = ({
  customClass,
  isLeaderboard,
  isHome,
  isRules,
  isSpin,
  spinText,
}) => {
  const navigateTo = (route) => {
    history.push(route);
  };

  return (
    <section className={`mainHeader ${customClass}`}>
      <div className="mainHeader--left">
        <img src={laughingKitten} />
        <h2>Exploding Kitten</h2>
      </div>

      {window.location.pathname === "/home" && (
        <div className="autosave-loader">
          <img src={loader} className={isSpin ? "rotate" : ""} />
          <div className="spinText">{spinText}</div>
        </div>
      )}

      <div className="mainHeader--right">
        {isRules && <div onClick={() => navigateTo("/rules")}>Rules</div>}

        {isLeaderboard && (
          <div onClick={() => navigateTo("/leaderboard")}>Leaderboard</div>
        )}

        {isHome && <div onClick={() => navigateTo("/home")}>Home</div>}
      </div>
    </section>
  );
};

export default Header;
