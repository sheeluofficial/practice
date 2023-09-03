import React from "react";
import {
    decreaseCount,
    increaseCount,
    resetCount,
  } from "../redux/Counter/action";
import { useDispatch, useSelector } from "react-redux";

export default function Counter() {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log(store, "in app");

  return (
    <div>
      <h3>{store.count.count}</h3>
      <div>
        <button
          onClick={() => {
            dispatch(increaseCount(1));
          }}
        >
          +
        </button>

        <button
          onClick={() => {
            dispatch(decreaseCount(1));
          }}
        >
          -
        </button>

        <button
          onClick={() => {
            dispatch(resetCount(1));
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
