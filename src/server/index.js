import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import getFacts from "../shared/facts";

import App from "../shared/App";
import { fetchPopularRepos } from "../shared/api";

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  fetchPopularRepos().then(data => {
    const markup = renderToString(<App data={data} />);

    res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>SSR with RR</title>
            <script src="/bundle.js" defer></script>
          </head>

          <body>
            <div id="app">${markup}</div>
          </body>
        </html>
      `);
  });
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});
