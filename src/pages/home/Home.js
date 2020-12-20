import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// IMPORT USER-DEFINED COMPONENTS HERE
import "./Home.scss";
import Header from "../../components/header/Header";
import Popup from "../../components/popup/Popup";
import { getUserData, editUserData } from "../../redux/actions/userActions";

// IMPORT ASSETS HERE
import defuseIcon from "../../assets/img/defuse.png";
import explodeIcon from "../../assets/img/explode.png";
import shuffleIcon from "../../assets/img/shuffle.png";
import catIcon from "../../assets/img/cat.png";

const Home = (props) => {
  // PROPS
  const { getUserData, user, editUserData } = props;

  // STATE VARIABLES
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [deck, setDeck] = useState([]);
  const [defuseCards, setDefuseCards] = useState([]);
  const [openedCard, setOpenedCard] = useState("");

  // VARIABLES
  const cards = ["CAT", "DEFUSE", "SHUFFLE", "EXPLODE"];

  const elem = document.querySelector("#root");

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    checkAndSetDeck();
  }, [user]);

  useEffect(() => {
    const updateUserState = (e) => {
      const { deck, defuseCards, openedCard, gameStatus } = e?.detail;

      editUserData({
        username: user?.username,
        matchesPlayed:
          gameStatus === "won" || gameStatus === "lost"
            ? user?.matchesPlayed + 1
            : user?.matchesPlayed,
        matchesWon:
          gameStatus === "won" ? user?.matchesWon + 1 : user?.matchesWon,
        deck,
        defuseCards,
        openedCard,
      });
    };
    elem.addEventListener("autoSave", updateUserState, false);

    return () => {
      elem.removeEventListener("autoSave", updateUserState);
    };
  }, [elem]);

  const checkAndSetDeck = () => {
    if (user?.deck.length < 5 && user?.deck.length > 0) {
      setDeck(user?.deck);
      setDefuseCards(new Array(user?.defuseCards).fill("DEFUSE"));
      setOpenedCard(user?.openedCard);
    } else if (user?.deck.length === 5) {
      setDeck(user?.deck);
      setDefuseCards([]);
      setOpenedCard("");
    } else {
      setDeck(generateDeck());
      setDefuseCards([]);
      setOpenedCard("");
    }
  };

  const createCustomEvent = (deck, defuseCards, openedCard, gameStatus) => {
    const customEvent = new window.CustomEvent("autoSave", {
      detail: {
        deck,
        defuseCards,
        openedCard,
        gameStatus,
      },
    });

    elem.dispatchEvent(customEvent);
  };

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
    return tempDeck;
    // return ["CAT", "CAT", "EXPLODE", "SHUFFLE", "CAT"];
  };

  const revealCard = () => {
    const poppedCard = deck.pop();
    setOpenedCard(poppedCard);
    setDeck([...deck]);

    if (!deck.length) {
      createCustomEvent(generateDeck(), 0, "", "won");
      return showMessageAndReset("Game Won", "OK", 0);
    }

    if (poppedCard === "DEFUSE") {
      defuseCards.push(poppedCard);
      setDefuseCards([...defuseCards]);
      return createCustomEvent(deck, defuseCards.length, poppedCard, "none");
    }

    if (poppedCard === "EXPLODE") {
      if (defuseCards.length) {
        defuseCards.pop();
        setDefuseCards([...defuseCards]);
        return createCustomEvent(deck, defuseCards.length, poppedCard, "none");
      }

      createCustomEvent(generateDeck(), 0, "", "lost");
      return showMessageAndReset("Game Over", "OK", 500);
    }

    if (poppedCard === "SHUFFLE") {
      createCustomEvent(generateDeck(), 0, "", "none");
      return showMessageAndReset("Game Shuffled", "OK", 500);
    }

    createCustomEvent(deck, defuseCards.length, poppedCard, "none");
  };

  const showMessageAndReset = (msg, btnText, time) => {
    setTimeout(() => {
      setPopupData({ message: msg, btnText });
      setPopupVisible(true);
    }, time);
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
      {popupVisible && (
        <Popup
          message={popupData?.message}
          btnText={popupData?.btnText}
          btnCallback={() => setPopupVisible(false)}
        />
      )}
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

export default connect(mapStateToProps, { getUserData, editUserData })(Home);
