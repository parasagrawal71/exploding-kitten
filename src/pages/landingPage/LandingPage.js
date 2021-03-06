import React, { useState } from "react";
import "./LandingPage.scss";
import { setCookie } from "../../utils/cookie";
import { toast } from "react-toastify";
import request from "../../apis/request";

import Header from "../../components/header/Header";
import history from "../../routes/history";

const LandingPage = () => {
  const [username, setUsername] = useState("");

  const startGame = async () => {
    if (!username) {
      toast.error("Enter username to start the game");
      return;
    }

    await request("/users", "POST", { username: username.toLowerCase() });
    setCookie("username", username.toLowerCase());
    history.push("home");
  };

  return (
    <main className="landingPage">
      <Header customClass="landingPage-header" />
      <form className="landingPage-form">
        {/* <div className="landingPage-form-header">Already have a username?</div> */}
        <div className="landingPage-form-username">
          <label>Enter username</label> <br />
          <input
            type="text"
            placeholder=""
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <input
          type="button"
          value="START GAME"
          className="landingPage-form-startBtn"
          onClick={() => startGame()}
        />
        {/* <br />
        <input
          type="button"
          value="CREATE USERNAME"
          className="landingPage-form-createBtn"
        /> */}
      </form>
    </main>
  );
};

export default LandingPage;
