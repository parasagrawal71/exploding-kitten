import React from "react";
import "./Header.scss";

import laughingKitten from "../../assets/img/laughing-kitten.png";

const Header = ({ customClass }) => {
  return (
    <section className={`mainHeader ${customClass}`}>
      <img src={laughingKitten} />
      <h2>Exploding Kitten</h2>
    </section>
  );
};

export default Header;
