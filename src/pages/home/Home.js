import React, { useState, useEffect } from "react";
import "./Home.scss";
import Header from "../../components/header/Header";
import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/userActions";

import defuseIcon from "../../assets/img/defuse.png";
import explodeIcon from "../../assets/img/explode.png";
import shuffleIcon from "../../assets/img/shuffle.png";
import catIcon from "../../assets/img/cat.png";

const Home = (props) => {
  // PROPS
  const { getUserData, user } = props;

  // STATE VARIABLES
  const [deck, setDeck] = useState([]);
  const [defuseCards, setDefuseCards] = useState([]);
  const [openedCard, setOpenedCard] = useState("");

  // VARIABLES
  const cards = ["CAT", "DEFUSE", "SHUFFLE", "EXPLODE"];

  useEffect(() => {
    getUserData();
    generateDeck();
  }, []);

  const generateDeck = () => {
    const r1 = Math.floor(Math.random() * 4);
    const r2 = Math.floor(Math.random() * 4);
    const r3 = Math.floor(Math.random() * 4);
    const r4 = Math.floor(Math.random() * 4);
    const r5 = Math.floor(Math.random() * 4);

    let tempDeck = [cards[r1], cards[r2], cards[r3], cards[r4], cards[r5]];

    let shuffle = 0;
    tempDeck = tempDeck.map((card) => {
      if (card === "SHUFFLE") {
        shuffle++;
        if (shuffle > 1) {
          card = "CAT";
        }
      }
      return card;
    });

    setDeck(tempDeck);
  };

  const revealCard = () => {
    const poppedCard = deck.pop();
    if (!deck.length) {
      alert("Game Won");
      resetGame();
      return;
    }

    setOpenedCard(poppedCard);
    if (poppedCard === "DEFUSE") {
      setDefuseCards([...defuseCards, poppedCard]);
    }

    if (poppedCard === "EXPLODE") {
      if (defuseCards.length) {
        defuseCards.pop();
        setDefuseCards([...defuseCards]);
        return;
      }
      alert("Game Over");
      resetGame();
    }

    if (poppedCard === "SHUFFLE") {
      alert("Game Shuffled");
      resetGame();
    }
  };

  const resetGame = () => {
    setDefuseCards([]);
    setOpenedCard("");
    generateDeck();
  };

  const selectCardSrc = () => {
    if (openedCard === "") {
      return "";
    } else if (openedCard === "SHUFFLE") {
      return shuffleIcon;
    } else if (openedCard === "DEFUSE") {
      return defuseIcon;
    } else if (openedCard === "CAT") {
      return catIcon;
    } else if (openedCard === "EXPLODE") {
      return explodeIcon;
    }
  };

  return (
    <main className="home">
      <Header isLeaderboard />
      <section className="content">
        <section className="deck-container">
          <h3>Deck</h3>
          <div className="deck">
            {deck.map((card, index) => {
              return (
                <div
                  key={card + index}
                  onClick={revealCard}
                  className="card"
                ></div>
              );
            })}
          </div>
        </section>

        <section className="openedCard-container">
          <h3>Current Card</h3>
          <div className={`openedCard ${selectCardSrc()}`}>
            <img src={selectCardSrc()} alt={openedCard} />
          </div>
        </section>

        <section className="defuseCards-container">
          <h3>Defuse Cards</h3>
          <div className="defuseCards">
            {defuseCards.map((defuseCard, index) => {
              return (
                <div key={defuseCard + index} className="defuseCard">
                  <img src={defuseIcon} alt="defuse-card" />
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
};

const mapStateToProps = (store) => {
  return { user: store?.data?.user };
};

export default connect(mapStateToProps, { getUserData })(Home);
