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
  const [spinLoader, setSpinLoader] = useState(false);
  const [spinText, setSpinText] = useState("");

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
      const { deck, defuseCards, openedCard, gameStatus, userData } = e?.detail;

      editUserData({
        username: userData?.username,
        matchesPlayed:
          gameStatus === "won" || gameStatus === "lost"
            ? Number(userData?.matchesPlayed) + 1
            : userData?.matchesPlayed,
        matchesWon:
          gameStatus === "won"
            ? Number(userData?.matchesWon + 1)
            : userData?.matchesWon,
        deck,
        defuseCards,
        openedCard,
      });

      setTimeout(() => {
        setSpinLoader(false);
        setSpinText("");
      }, 500);
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

  const createCustomEvent = (
    deck,
    defuseCards,
    openedCard,
    gameStatus,
    userData
  ) => {
    setSpinLoader(true);
    setSpinText("Saving...");
    const customEvent = new window.CustomEvent("autoSave", {
      detail: {
        deck,
        defuseCards,
        openedCard,
        gameStatus,
        userData,
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
  };

  const revealCard = () => {
    const poppedCard = deck.pop();
    setOpenedCard(poppedCard);
    setDeck([...deck]);

    if (poppedCard === "DEFUSE") {
      defuseCards.push(poppedCard);
      setDefuseCards([...defuseCards]);
      if (!deck.length) {
        createCustomEvent(generateDeck(), 0, "", "won", user);
        showMessageAndReset("You won", "Play Again", 0);
      } else {
        createCustomEvent(deck, defuseCards.length, poppedCard, "none", user);
      }
    }

    if (poppedCard === "EXPLODE") {
      defuseCards.pop();
      setDefuseCards([...defuseCards]);
      if (defuseCards.length) {
        if (!deck.length) {
          createCustomEvent(generateDeck(), 0, "", "won", user);
          showMessageAndReset("You won", "Play Again", 0);
        } else {
          createCustomEvent(deck, defuseCards.length, poppedCard, "none", user);
        }
      } else {
        createCustomEvent(generateDeck(), 0, "", "lost", user);
        showMessageAndReset("Game Over", "Play Again", 500);
      }
    }

    if (poppedCard === "SHUFFLE") {
      createCustomEvent(generateDeck(), 0, "", "none", user);
      showMessageAndReset("Game Shuffled", "Continue", 500);
    }

    if (poppedCard === "CAT") {
      if (!deck.length) {
        createCustomEvent(generateDeck(), 0, "", "won", user);
        showMessageAndReset("You won", "Play Again", 0);
      } else {
        createCustomEvent(deck, defuseCards.length, poppedCard, "none", user);
      }
    }
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
      <Header isLeaderboard isRules isSpin={spinLoader} spinText={spinText} />
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
          <div className="deck-msg">Click on the deck to open a card</div>
        </section>

        <section className="openedCard-container">
          <h3>Current Card</h3>
          <div
            className={`openedCard ${selectCardSrc()} ${
              selectCardSrc() === "" ? "card-zeroState" : ""
            }`}
          >
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
            {!defuseCards?.length && (
              <div className={`openedCard ${"card-zeroState"}`}></div>
            )}
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
