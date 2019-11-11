import fetch from "isomorphic-fetch";

const getFacts = () =>
  fetch("https://ssr-react.firebaseio.com/facts.json").then(res => res.json());

export default getFacts;
