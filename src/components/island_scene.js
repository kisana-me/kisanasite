import React, { useEffect, useRef, useState, useCallback } from 'react';

const IslandScene = ({ isNight, toggleDayNight }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [transitionProgress, setTransitionProgress] = useState(0);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const drawScene = useCallback((ctx, progress) => {
    const { width, height } = dimensions;
    
    // Sky
    const dayColor = [135, 206, 235]; // Light blue
    const nightColor = [25, 25, 112]; // Midnight blue
    const currentColor = dayColor.map((day, i) => 
      Math.round(day + (nightColor[i] - day) * progress)
    );
    ctx.fillStyle = `rgb(${currentColor.join(',')})`;
    ctx.fillRect(0, 0, width, height);

    // Stars (only visible at night)
    if (progress > 0.5) {
      const starOpacity = (progress - 0.5) * 2;
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Sun/Moon
    const celestialY = height * 0.2;
    const celestialX = width * (0.2 + 0.6 * progress);
    ctx.fillStyle = progress < 0.5 ? 'yellow' : 'white';
    ctx.beginPath();
    ctx.arc(celestialX, celestialY, width * 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Ocean
    ctx.fillStyle = `rgb(0, 0, ${Math.round(128 + 127 * (1 - progress))})`;
    ctx.fillRect(0, height * 0.7, width, height * 0.3);

    // Island
    ctx.fillStyle = `rgb(0, ${Math.round(128 + 127 * (1 - progress))}, 0)`;
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * 0.7);
    ctx.quadraticCurveTo(width * 0.5, height * 0.5, width * 0.9, height * 0.7);
    ctx.lineTo(width * 0.9, height);
    ctx.lineTo(width * 0.1, height);
    ctx.closePath();
    ctx.fill();

    // Buildings (simplified)
    ctx.fillStyle = `rgba(100, 100, 100, ${1 - progress * 0.5})`;
    ctx.fillRect(width * 0.3, height * 0.5, width * 0.1, height * 0.2);
    ctx.fillRect(width * 0.5, height * 0.45, width * 0.15, height * 0.25);
    ctx.fillRect(width * 0.7, height * 0.55, width * 0.1, height * 0.15);

    // Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    [0.2, 0.5, 0.8].forEach(x => {
      ctx.beginPath();
      ctx.arc(width * x, height * 0.2, width * 0.05, 0, Math.PI * 2);
      ctx.arc(width * (x - 0.05), height * 0.2, width * 0.04, 0, Math.PI * 2);
      ctx.arc(width * (x + 0.05), height * 0.2, width * 0.04, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let animationFrameId;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / 2000, 1); // 2 seconds transition

      setTransitionProgress(isNight ? progress : 1 - progress);
      drawScene(ctx, isNight ? progress : 1 - progress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, isNight, drawScene]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      
    </div>
  );
};

export default IslandScene;