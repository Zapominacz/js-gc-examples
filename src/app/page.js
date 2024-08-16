'use client'

import { useState, useCallback, useEffect } from "react";

class BigObject {
  data = new Uint8Array(1024 * 1024 * 10);
}

 // this will event make the error for the first use
const Home = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const weakMap = new WeakMap();
  let key = {}; // unique key
  weakMap.set(key, new BigObject())
  useEffect(() => {
    return () => {
      console.log("cleanup");
      key = null;
      weakMap.delete(key);
    };
  }, [])

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
    console.log(weakMap.get(key)?.data.length);
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