import { useContext } from "react";
import { AppContext } from "./AppContext";

function Score() {
  const { score } = useContext(AppContext);

  return (
    <div className={["scoreContainerBox", "score"].join(" ")}>{score}</div>
  );
}
export default Score;
