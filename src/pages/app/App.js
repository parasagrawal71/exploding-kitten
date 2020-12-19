import React from "react";
import { Router } from "react-router-dom";

// IMPORT USER-DEFINED COMPONENTS HERE //
import history from "../../routes/history";
import Routes from "../../routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router history={history}>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        limit={1}
      />
      <Routes />
    </Router>
  );
};

export default App;
