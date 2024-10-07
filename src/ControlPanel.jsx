import Score from "./Score";
import SpeedSlider from "./SpeedSlider";
import StartButton from "./StartButton";

function ControlPanel() {
  return (
    <div className="controlPanel">
      <div className="scoreContainer">
        <Score></Score>
        <StartButton></StartButton>
      </div>
      <div className="scoreContainer">
        <SpeedSlider></SpeedSlider>
      </div>
    </div>
  );
}
export default ControlPanel;
