import { useEffect, useState, useRef } from 'react';
import { GiGrapes } from 'react-icons/gi';
import anime from 'animejs';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const grapeRef = useRef(null);
  const spinnerRef = useRef(null);
  const textRef = useRef(null);
  const progressBarRef = useRef(null);
  const percentageRef = useRef(null);
  const heartRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Entrance animation for container
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad'
    });

    // Grape bounce animation
    anime({
      targets: grapeRef.current,
      translateY: [
        { value: -30, duration: 600 },
        { value: 0, duration: 600 }
      ],
      scale: [
        { value: 0.8, duration: 600 },
        { value: 1, duration: 600 }
      ],
      loop: true,
      easing: 'easeInOutQuad'
    });

    // Smooth spinner rotation
    anime({
      targets: spinnerRef.current,
      rotate: 360,
      duration: 1500,
      loop: true,
      easing: 'linear'
    });

    // Text pulsing animation
    anime({
      targets: textRef.current,
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      duration: 2000,
      loop: true,
      easing: 'easeInOutQuad'
    });

    // Percentage number animation
    anime({
      targets: percentageRef.current,
      scale: [1, 1.1, 1],
      duration: 500,
      loop: true,
      easing: 'easeInOutQuad'
    });

    // Floating hearts with random paths
    heartRefs.current.forEach((heart, i) => {
      if (!heart) return;

      anime({
        targets: heart,
        translateY: [
          { value: -20, duration: 2000 + i * 200 },
          { value: 20, duration: 2000 + i * 200 }
        ],
        translateX: [
          { value: -15, duration: 1500 + i * 150 },
          { value: 15, duration: 1500 + i * 150 }
        ],
        rotate: [
          { value: -10, duration: 1800 + i * 180 },
          { value: 10, duration: 1800 + i * 180 }
        ],
        scale: [
          { value: 0.9, duration: 1600 + i * 160 },
          { value: 1.1, duration: 1600 + i * 160 }
        ],
        loop: true,
        easing: 'easeInOutSine',
        direction: 'alternate'
      });
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          // Exit animation
          anime({
            targets: containerRef.current,
            opacity: 0,
            scale: 0.95,
            duration: 500,
            easing: 'easeInQuad',
            complete: () => {
              onLoadingComplete();
            }
          });

          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  // Animate progress bar when progress changes
  useEffect(() => {
    if (progressBarRef.current) {
      anime({
        targets: progressBarRef.current,
        width: `${progress}%`,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-gradient-to-br from-purple-200 via-purple-100 to-green-100 flex flex-col items-center justify-center"
    >
      {/* Animated Grape Icon */}
      <div className="relative mb-8">
        <GiGrapes ref={grapeRef} className="text-9xl text-purple-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={spinnerRef}
            className="w-32 h-32 border-8 border-purple-300 border-t-purple-600 rounded-full"
          ></div>
        </div>
      </div>

      {/* Loading Text */}
      <h2
        ref={textRef}
        className="font-dancing-script text-4xl font-bold text-purple-600 mb-4"
      >
        Đang chuẩn bị bữa tiệc sinh nhật...
      </h2>

      {/* Progress Bar */}
      <div className="w-80 h-3 bg-purple-200 rounded-full overflow-hidden shadow-lg">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
          style={{ width: '0%' }}
        ></div>
      </div>

      {/* Progress Percentage */}
      <p ref={percentageRef} className="mt-4 text-purple-700 font-semibold text-lg">
        {progress}%
      </p>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            ref={el => heartRefs.current[i] = el}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
          >
            {i % 3 === 0 ? '💜' : i % 3 === 1 ? '🍇' : '💕'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
