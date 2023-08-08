import { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [h, setH] = useState(0);
  const timerIDRef = useRef(null);

  useEffect(() => {
    setSec(time % 60);
    setMin(Math.floor(time / 60));
    setH(Math.floor(time / 3600));
  }, [time]);

  const handleSubmit = (e) => {
    setTime(e.target.value);
  };

  const startTimer = () => {
    if (!timerIDRef.current) {
      timerIDRef.current = setInterval(() => {
        setTime((pre) => {
          if (pre == 1) {
            clearInterval(timerIDRef.current);
          }
          return pre - 1;
        });
      }, 1000);
    } else {
      return;
    }
  };

  return (
    <div>
      <div>
        {h < 10 ? `0${h}` : h}:{min < 10 ? `0${min}` : min}:
        {sec < 10 ? `0${sec}` : sec}
      </div>

      <button onClick={startTimer}>Start</button>
      <button
        onClick={() => {
          clearInterval(timerIDRef.current);
          timerIDRef.current = null;
        }}
      >
        Stop
      </button>

      <button
        onClick={() => {
          clearInterval(timerIDRef.current);
          timerIDRef.current = null;
          setTime(0);
        }}
      >
        Reset
      </button>

      <br />
      <input
        type="number"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      />
    </div>
  );
};

export default Timer;
