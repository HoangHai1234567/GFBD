import { useEffect, useRef } from 'react';
import anime from 'animejs';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over clickable elements
      const target = e.target;
      const isClickable =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A';

      if (isClickable) {
        anime({
          targets: cursorRef.current,
          scale: 1.5,
          rotate: 360,
          duration: 300,
          easing: 'easeOutExpo'
        });
        anime({
          targets: trailRef.current,
          scale: 1.3,
          duration: 300,
          easing: 'easeOutExpo'
        });
      } else {
        anime({
          targets: cursorRef.current,
          scale: 1,
          rotate: 0,
          duration: 300,
          easing: 'easeOutExpo'
        });
        anime({
          targets: trailRef.current,
          scale: 1,
          duration: 300,
          easing: 'easeOutExpo'
        });
      }
    };

    const handleClick = () => {
      anime({
        targets: cursorRef.current,
        scale: [1.5, 0.8, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .6)'
      });

      anime({
        targets: trailRef.current,
        scale: [1.5, 1],
        opacity: [1, 0.3, 1],
        duration: 600,
        easing: 'easeOutElastic(1, .6)'
      });
    };

    // Smooth cursor movement with anime.js
    const animateCursor = () => {
      const dx = targetRef.current.x - positionRef.current.x;
      const dy = targetRef.current.y - positionRef.current.y;

      positionRef.current.x += dx * 0.15;
      positionRef.current.y += dy * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${positionRef.current.x}px`;
        cursorRef.current.style.top = `${positionRef.current.y}px`;
      }

      if (trailRef.current) {
        trailRef.current.style.left = `${positionRef.current.x}px`;
        trailRef.current.style.top = `${positionRef.current.y}px`;
      }

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('click', handleClick);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
      >
        🍇
      </div>

      {/* Cursor trail */}
      <div
        ref={trailRef}
        className="custom-cursor-trail"
      />
    </>
  );
};

export default CustomCursor;
