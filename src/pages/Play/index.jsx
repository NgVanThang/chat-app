import React, { useRef, useEffect, useState } from 'react';
import cl from '~/assets/css/style.module.scss';

function PlayPage() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [fruit, setFruit] = useState({ x: 15, y: 15 });
  const [scale] = useState(20);
  const [speed] = useState(100);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    const interval = setInterval(() => {
      if (isRunning) {
        update();
        draw(ctx);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [snake, direction, fruit, isRunning]);

  const update = () => {
    const newSnake = [...snake];
    const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

    // Check if snake eats the fruit
    if (head.x === fruit.x && head.y === fruit.y) {
      setFruit({
        x: Math.floor(Math.random() * 25),
        y: Math.floor(Math.random() * 25),
      });
    } else {
      newSnake.pop();
    }

    newSnake.unshift(head);
    setSnake(newSnake);
    checkCollision(newSnake);
  };

  const checkCollision = (newSnake) => {
    let hitWall = newSnake[0].x < 0 || newSnake[0].x >= 25 || newSnake[0].y < 0 || newSnake[0].y >= 25;
    let hitSelf = newSnake.slice(1).some((segment) => segment.x === newSnake[0].x && segment.y === newSnake[0].y);

    if (hitWall || hitSelf) {
      setIsRunning(false);
    }
  };

  const draw = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.fillStyle = 'green';
    snake.forEach((segment) => ctx.fillRect(segment.x, segment.y, 1, 1));
    ctx.fillStyle = 'red';
    ctx.fillRect(fruit.x, fruit.y, 1, 1);
  };

  const handleKeydown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [direction]);

  return (
    <>
      <canvas ref={canvasRef} width="500px" height="500px" id={cl['gameCanvas']}></canvas>
    </>
  );
}
export default PlayPage;
