import { useContext } from "react";
import { AppContext } from "./AppContext";

function Score() {
  const data = useContext(AppContext);

  return (
    <div className={["scoreContainerBox", "score"].join(" ")}>{data.score}</div>
  );
}
export default Score;
