'use client'

import { useState, useCallback, useEffect } from "react";

class BigObject {
  data = new Uint8Array(1024 * 1024 * 10);
}

// out of the scope
const bigObjects = {};
const uniqueKey = "unique"; // can be index, context, etc.

const Home = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  useEffect(() => {
    return () => {
      bigObjects[uniqueKey] = null;
    };
  }, [])
  bigObjects[uniqueKey] = new BigObject();

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
    console.log(bigObjects[uniqueKey].data.length);
  };

  return (
    <div>
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