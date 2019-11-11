import React from "react";
import { hydrate } from "react-dom";
import App from "../shared/App";
import getFacts from "../shared/facts";

getFacts().then(facts =>
  hydrate(<App data={facts} />, document.getElementById("app"))
);
