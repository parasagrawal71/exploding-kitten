import React from "react";
import "./Header.scss";
import history from "../../routes/history";

import laughingKitten from "../../assets/img/laughing-kitten.png";

const Header = ({ customClass, isLeaderboard, isHome }) => {
  const navigateTo = (route) => {
    history.push(route);
  };

  return (
    <section className={`mainHeader ${customClass}`}>
      <div className="mainHeader--left">
        <img src={laughingKitten} />
        <h2>Exploding Kitten</h2>
      </div>

      <div className="mainHeader--right">
        {isLeaderboard && (
          <div onClick={() => navigateTo("/leaderboard")}>Leaderboard</div>
        )}

        {isHome && <div onClick={() => navigateTo("/home")}>Home</div>}
      </div>
    </section>
  );
};

export default Header;
