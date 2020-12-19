import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { readCookie } from "../utils/cookie";

const RouteWrapper = ({ component: Component, isPrivate, ...rest }) => {
  const username = readCookie("username");
  let signed = false;
  if (username) {
    signed = true;
  }

  if (isPrivate && !signed) {
    return <Redirect to="/" />;
  }

  const { path } = rest;
  if (path === "/" && signed) {
    return <Redirect to="/home" />;
  }

  return <Route {...rest} component={Component} />;
};

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.elementType,
  ]).isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

export default RouteWrapper;
