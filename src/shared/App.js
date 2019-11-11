import React from "react";

const App = ({ data }) => {
  const factsListItems = data.map((fact, i) => <li key={i}>{fact.text}</li>);
  return <ul>{factsListItems}</ul>;
};

export default App;
