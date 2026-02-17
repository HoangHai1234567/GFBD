import { useCallback, useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const Fireworks = ({ run = true }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={run}
      numberOfPieces={run ? 200 : 0}
      colors={['#9333EA', '#A855F7', '#22C55E', '#4ADE80', '#EC4899', '#F472B6']}
      gravity={0.15}
    />
  );
};

export default Fireworks;
