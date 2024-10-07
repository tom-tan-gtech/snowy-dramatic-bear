import CanvasArea from "./CanvasArea.jsx";
import ControlPanel from "./ControlPanel.jsx";
import "./styles/app.css";

function GameArea() {
  return (
    <div className="gameArea">
      {/* <h1>Game Area</h1> */}
      <ControlPanel></ControlPanel>
      <CanvasArea></CanvasArea>
    </div>
  );
}
export default GameArea;
