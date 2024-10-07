import "./styles/app.css";
import GameArea from "./GameArea.jsx";
import { AppContext } from "./AppContext.js";
import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState(0);

  return (
    // implementations here
    // <main role="main" className="wrapper" id="root"></main>
    <AppContext.Provider value={{ score, setScore }}>
      <GameArea></GameArea>
    </AppContext.Provider>
  );
}
