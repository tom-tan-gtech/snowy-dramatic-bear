// Import and apply CSS stylesheet
import "./styles/app.css";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Food from "./Food.jsx";
import GameArea from "./GameArea.jsx";

// Home function that is reflected across the site
export default function Home() {
  return (
    // implementations here
    // <main role="main" className="wrapper" id="root"></main>
    <GameArea></GameArea>
  );
}
