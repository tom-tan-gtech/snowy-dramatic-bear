import { useContext } from "react";
import { AppContext } from "./AppContext";

function StartButton() {
  const { start, setStart } = useContext(AppContext);

  const buttonText = start ? "Pause" : "Start";

  const handleClick = () => {
    setStart(!setStart);
  };

  return (
    <div className={["scoreContainerBox", "startButton"].join(" ")}>
      <button type="button" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}
export default StartButton;
