import React from "react";
import "./Rules.scss";

import Header from "../../components/header/Header";

const Rules = () => {
  return (
    <section className="rules">
      <Header isHome isLeaderboard />
      <ul className="rules-list">
        <li>
          If the card drawn from the deck is a cat card, then the card is
          removed from the deck.
        </li>
        <li>
          If the card is exploding kitten (bomb) then the player loses the game.
        </li>
        <li>
          If the card is defusing card, then the card is removed from the deck.
          This card can be used to defuse one bomb that may come in subsequent
          cards drawn from the deck.
        </li>
        <li>
          If the card is shuffle card, then the game is restarted and the deck
          is filled with 5 cards again.
        </li>
      </ul>
    </section>
  );
};

export default Rules;
