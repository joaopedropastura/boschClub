'use client'

import { useState, useEffect } from "react";


export default function Width() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
      const handleResize = () => {
        setWidth(document.documentElement.clientWidth);

      }

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }, [])


    const [state, setState] = useState(false);
    
  return (
    <div>
      <h2 style={{color: state ? "#680" : "#b00"}}>Width: {width}</h2>
      <button onClick={() => setState(b => !b)}> ativar </button>
    </div>
  );
}