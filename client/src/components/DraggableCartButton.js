import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import Cartsvg from './Cartsvg';
import '../styles/index.css';

const DraggableCartButton = ({ cart }) => {
  const [dragging, setDragging] = useState(false);
  const [prevCartLength, setPrevCartLength] = useState(cart.length);
  const [animationClass, setAnimationClass] = useState('');
  const positionRef = useRef(JSON.parse(localStorage.getItem('cartButtonPosition')) || { x: 0, y: 0 });
  const navigate = useNavigate();
  const nodeRef = useRef(null); // Add nodeRef here

  useEffect(() => {
    if (cart.length !== prevCartLength) {
      setAnimationClass('pulse');
      setTimeout(() => {
        setAnimationClass('');
      }, 500);
    }
    setPrevCartLength(cart.length);
  }, [cart.length, prevCartLength]);

  const handleStart = () => {
    setDragging(false);
  };

  const handleDrag = (e, data) => {
    setDragging(true);
    positionRef.current = { x: data.x, y: data.y };
  };

  const handleStop = (e, data) => {
    if (!dragging) {
      navigate('/cart');
    }
    setDragging(false);
    positionRef.current = { x: data.x, y: data.y };
    localStorage.setItem('cartButtonPosition', JSON.stringify(positionRef.current));
  };

  return (
    <Draggable
      bounds="parent"
      position={positionRef.current}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
      nodeRef={nodeRef} 
    >
      <div
        ref={nodeRef} 
        className="cursor-pointer fixed bottom-2 w-20 h-20 rounded-full grid place-items-center bg-slate-200 bg-opacity-45 right-6 z-50"
        style={{ transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px)` }}
      >
        <div className={`bg-zinc-400 rounded-full w-14 h-14 flex justify-center items-center ${animationClass}`}>
          <div className="relative flex justify-center items-center">
            <Cartsvg fillColor="black" width="w-8" />
            <span className="w-4 h-4 flex justify-center items-center rounded-full bg-red-600 text-white absolute text-xs left-5 md:-top-1 -top-1">
              {cart.length}
            </span>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableCartButton;
