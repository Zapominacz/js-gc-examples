'use client'

import { useState, useCallback } from "react";

class BigObject {
  data = new Uint8Array(1024 * 1024 * 10);
}
const Home = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const bigObject = new BigObject();
  const weakRef = new WeakRef(bigObject);
  const handleClickA = useCallback(() => {
    setCountA(countA + 1);
  }, [countA]);

  const handleClickB = useCallback(() => {
    setCountB(countB + 1);
  }, [countB]);

  // This only exists to demonstrate the problem
  const handleClickBoth = () => {
    handleClickA();
    handleClickB();
    console.log(weakRef.deref()?.data.length); // can be undefined or 10 485 760
  };

  return (
    <div>
      <span>{bigObject.data.length}</span>
      <button onClick={handleClickA}>Increment A</button>
      <button onClick={handleClickB}>Increment B</button>
      <button onClick={handleClickBoth}>Increment Both</button>
      <p>
        A: {countA}, B: {countB}
      </p>
    </div>
  );
};

export default Home;