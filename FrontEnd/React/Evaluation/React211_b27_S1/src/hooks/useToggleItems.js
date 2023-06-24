import { useState } from 'react';

function useToggleItems(initialValue, initialPosition = 0) {
  const [position, setPosition] = useState(initialPosition);
  const [items, setItems] = useState(initialValue);

  const toggleState = () => {
    setPosition((prevPosition) => (prevPosition + 1) % items.length);
  };

  const state = items[position];

  return [state, toggleState];
}

export { useToggleItems };
