import { AppContext } from "./AppContext.js";
import { createBalloon } from "./balloon.js";
import { useEffect, useRef, useState, useContext } from "react";

let canvas;
let canvasContext;

const canvasWidth = 400;
const canvasHeight = 500;

const BLACK_COLOR = "black";
const TOP_PANEL_HEIGHT = 100;

let topPanelPos;
let startButtonPos;
let balloons = [];
let lastBalloonCreation = Date.now();
// let score = 0;

function CanvasArea() {
  const data = useContext(AppContext);

  const canvasRef = useRef(null);

  const [delay, setDelay] = useState(null);
  // const [score, setScore] = useState(0);
  const [framesPerSecond, setFramesPerSecond] = useState(30);
  // const [canvasCanvas, setCanvasCanvas] = useState(null);
  // const [canvasContext, setCanvasContext] = useState(null);

  // useInterval(()=> runGame(),delay)

  // useEffect(()=>{
  //   // let fruit = document.getElementById("fruit") as HTMLCanvasElement
  //   if(canvasRef.current){
  //     const canvas = canvasRef.current
  //     const ctx = canvas.getContext("2d")
  //     if(ctx){
  //       ctx.setTransform(Scale, 0, 0, Scale,0,0)
  //       ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
  //       ctx.fillStyle = "#a3d001";
  //       // snake.forEach(([x,y])=> ctx.fillRect(x,y,1,1))
  //       // ctx.drawImage(fruit,apple[0],apple[1],1,1)
  //     }
  //   }
  // // }, [snake, apple, gameover])
  // }, [])

  useEffect(() => {
    initialise();
    if (canvasRef.current) {
      const canvasCanvas = canvasRef.current;
      const canvasCanvasContext = canvasCanvas.getContext("2d");
      if (canvasCanvasContext) {
        // setCanvasCanvas(canvas);
        // setCanvasContext(canvasContext);
        canvas = canvasCanvas;
        canvasContext = canvasCanvasContext;

        canvas.addEventListener("mousedown", handleMouseClick);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      runGame();
    }, 1000 / framesPerSecond);

    return () => clearInterval(interval);
  }, [framesPerSecond]);

  function initialise() {
    topPanelPos = { x: 0, y: 0, width: canvasWidth, height: 100 };
    startButtonPos = {
      x: topPanelPos.x + 150,
      y: topPanelPos.y + 20,
      width: 100,
      height: 30,
    };

    addBalloon();
  }

  function addBalloon() {
    // if (balloons.length > 1) return;

    if (lastBalloonCreation + 1000 > Date.now()) return;
    // const balloon = createBalloon(canvasContext, 0, canvas.width, topPanelPos.y + topPanelPos.height, canvas.height);
    const balloon = createBalloon(
      canvasContext,
      0,
      canvas.width,
      topPanelPos.height,
      canvas.height
    );
    balloon.initialise();

    balloons.push(balloon);
    lastBalloonCreation = Date.now();
  }

  function handleMouseClick(evt) {
    var mousePos = calculateMousePos(evt);

    for (let i = 0; i < balloons.length; i++) {
      const isHit = balloons[i].clicked(mousePos.x, mousePos.y);
      if (isHit) {
        // score += balloons[i].getValue();
        data.setScore((data.score += balloons[i].getValue()));
      }
    }
  }

  function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY,
    };
  }

  const runGame = () => {
    moveEverything();
    drawEverything();
  };

  function moveEverything() {
    // add new balloon
    addBalloon();

    for (let i = 0; i < balloons.length; i++) {
      // animate all existing balloons
      // loop balloon list, move balloons down a step
      // if a balloon is at bottom edge, delete the balloon
      balloons[i].move();
    }

    // housekeeping
    const keep = balloons.filter((balloon) => !balloon.isOutsideGameArea());
    balloons = keep;

    console.log(balloons.length);

    // create new target if 1 sec has elapsed
  }

  function drawEverything() {
    if (canvasRef.current) {
      const canvasCanvas = canvasRef.current;
      const canvasCanvasContext = canvasCanvas.getContext("2d");
      if (canvasCanvasContext) {
        // setCanvasCanvas(canvas);
        // setCanvasContext(canvasContext);
        canvas = canvasCanvas;
        canvasContext = canvasCanvasContext;
        // clear the canvas
        // drawRect(0, 0, canvasCanvas.width, canvasCanvas.height, "white", true);
        drawRect(0, 0, canvasWidth, canvasHeight, "white", true);

        drawTopPanel();
        drawBottomPanel();
      }
    }
  }

  function drawTopPanel() {
    drawRect(
      topPanelPos.x,
      topPanelPos.y,
      topPanelPos.width,
      topPanelPos.height,
      "white",
      true
    );
    drawScore(data.score);
    drawButton();
  }

  function drawScore(score) {
    canvasContext.fillText(score, topPanelPos.x + 40, topPanelPos.y + 40);
  }

  function drawButton() {
    drawRect(
      startButtonPos.x,
      startButtonPos.y,
      startButtonPos.width,
      startButtonPos.height,
      "green",
      false
    );
    canvasContext.fillText(
      "Start",
      startButtonPos.x + 40,
      startButtonPos.y + 20
    );
    canvasContext.fillText(data.score, topPanelPos.x + 40, topPanelPos.y + 40);
  }

  function drawBottomPanel() {
    drawBalloons();
  }

  function drawBalloons() {
    for (let i = 0; i < balloons.length; i++) {
      balloons[i].draw();
      drawTopPanel();
    }
  }

  function drawRect(x, y, width, height, color, isFill) {
    canvasContext.strokeStyle = color;
    canvasContext.fillStyle = color;
    canvasContext.rect(x, y, width, height);
    if (isFill) {
      canvasContext.fillRect(x, y, width, height);
    } else {
      canvasContext.stroke();
    }
  }

  return (
    <div className="canvasDiv">
      <canvas
        className="canvasArea"
        ref={canvasRef}
        width={`${canvasWidth}px`}
        height={`${canvasHeight}px`}
      />
    </div>
  );
}

export default CanvasArea;
