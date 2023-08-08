import { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [count, setCount] = useState(0);
  const [mil, setMil] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [h, setH] = useState(0);
  const timerIDRef = useRef(null);

  useEffect(() => {
    setMil(count % 1000);
    setSec(Math.floor(count / 1000));
    setMin(Math.floor(count / 60000));
    setH(Math.floor(count / 3600000));
  }, [count]);

  const startTimer = () => {
    if (!timerIDRef.current) {
      timerIDRef.current = setInterval(() => {
        setCount((pre) => {
          return pre + 1;
        });
      }, 1);
    } else {
      return;
    }
  };

  return (
    <div>
      <div>
        {h < 10 ? `0${h}` : h}:{min < 10 ? `0${min}` : min}:
        {sec < 10 ? `0${sec}` : sec}:{mil < 10 ? `0${mil}` : mil}
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
          setCount(0);
          timerIDRef.current = null;
        }}
      >
        Reset
      </button>
      <br />
    </div>
  );
};

export default StopWatch;
