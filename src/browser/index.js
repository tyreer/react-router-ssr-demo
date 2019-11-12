import React from "react";
import { hydrate } from "react-dom";
import App from "../shared/App";
import { fetchPopularRepos } from "../shared/api";

fetchPopularRepos().then(data =>
  hydrate(<App data={data} />, document.getElementById("app"))
);
