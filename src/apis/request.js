import axios from "axios";

// IMPORTS //
import { GET, POST, PUT, DELETE } from "./httpConstants";
import handleError from "./handleError";

const HOST_URL = "https://exploding-kitten-server.herokuapp.com/api";

const request = (
  endpoint,
  method,
  reqBody = null,
  queryParams = {},
  headerObj = {}
) => {
  // REQUEST PROMISE
  const requestPromise = (httpsMethod) =>
    axios.request({
      url: HOST_URL + endpoint,
      method: httpsMethod,
      headers: {
        "Content-Type": "application/json",
        ...headerObj,
      },
      params: {
        ...queryParams,
      },
      data: reqBody,
    });

  switch (method.toUpperCase()) {
    case GET:
      return requestPromise(GET)
        .then((response) => response.data)
        .catch((e) => handleError(e));

    case POST:
      return requestPromise(POST)
        .then((response) => response.data)
        .catch((e) => handleError(e));

    case PUT:
      return requestPromise(PUT)
        .then((response) => response.data)
        .catch((e) => handleError(e));

    case DELETE:
      return requestPromise(DELETE)
        .then((response) => response.data)
        .catch((e) => handleError(e));

    default:
      return "Wrong call";
  }
};

export default request;
