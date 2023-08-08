import { useState } from "react";
import StopWatch from "./components/StopWatch";
import Timer from "./components/Timer";
import "./styles.css";

export default function App() {
  const [toggle, setToggle] = useState("timer");
  return (
    <div className="App">
      {toggle == "timer" ? <Timer /> : <StopWatch />}

      <button
        onClick={() => {
          setToggle((pre) => {
            return pre == "timer" ? "stopwatch" : "timer";
          });
        }}
      >
        {" "}
        {toggle == "timer" ? "StopWatch" : "Timer"}
      </button>
    </div>
  );
}
