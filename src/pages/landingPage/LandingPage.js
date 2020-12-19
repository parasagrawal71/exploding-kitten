import React from "react";
import "./LandingPage.scss";

import Header from "../../components/header/Header";
import history from "../../routes/history";

const LandingPage = () => {
  return (
    <main className="landingPage">
      <Header customClass="landingPage-header" />
      <form className="landingPage-form">
        <div className="landingPage-form-header">Already have a username?</div>
        <div className="landingPage-form-username">
          <label>Enter username</label> <br />
          <input type="text" placeholder="" />
        </div>
        <input
          type="button"
          value="START GAME"
          className="landingPage-form-startBtn"
          onClick={() => history.push("home")}
        />
        <br />
        <input
          type="button"
          value="CREATE USERNAME"
          className="landingPage-form-createBtn"
        />
      </form>
    </main>
  );
};

export default LandingPage;
