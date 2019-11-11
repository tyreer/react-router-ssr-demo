import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";
import getFacts from "../shared/facts";
import App from "../shared/App";
import React from "react";

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  getFacts().then(facts => {
    const markup = renderToString(<App data={facts} />);

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
