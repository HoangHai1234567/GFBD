import { useEffect, useState, useRef } from 'react';
import anime from 'animejs';

const ParticleEffects = () => {
  const [particles, setParticles] = useState([]);
  const particleRefs = useRef([]);

  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const newParticles = [];
      const particleTypes = ['🍇', '🍃', '💜', '💕', '🌿', '✨'];

      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          emoji: particleTypes[Math.floor(Math.random() * particleTypes.length)],
          startX: Math.random() * 100,
          size: 20 + Math.random() * 20,
          delay: Math.random() * 5000,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  useEffect(() => {
    if (particles.length > 0 && particleRefs.current.length > 0) {
      particleRefs.current.forEach((particle, index) => {
        if (!particle) return;

        const duration = 15000 + Math.random() * 10000;
        const drift = (Math.random() - 0.5) * 200; // Horizontal drift

        // Falling animation with curved path
        anime({
          targets: particle,
          translateY: [
            { value: -100, duration: 0 },
            { value: window.innerHeight + 100, duration: duration }
          ],
          translateX: [
            { value: 0, duration: 0 },
            { value: drift, duration: duration, easing: 'easeInOutSine' }
          ],
          opacity: [
            { value: 0, duration: 500 },
            { value: 0.7, duration: 1000 },
            { value: 0.7, duration: duration - 2000 },
            { value: 0, duration: 500 }
          ],
          rotate: {
            value: 360 * (Math.random() > 0.5 ? 1 : -1),
            duration: duration,
            easing: 'linear'
          },
          scale: [
            { value: 0.8, duration: duration / 2, easing: 'easeInOutQuad' },
            { value: 1.2, duration: duration / 2, easing: 'easeInOutQuad' }
          ],
          loop: true,
          delay: particles[index].delay,
          easing: 'linear'
        });

        // Add pulsing glow effect
        anime({
          targets: particle,
          filter: [
            'drop-shadow(0 0 5px rgba(147, 51, 234, 0.3))',
            'drop-shadow(0 0 15px rgba(147, 51, 234, 0.6))',
            'drop-shadow(0 0 5px rgba(147, 51, 234, 0.3))'
          ],
          duration: 2000,
          loop: true,
          delay: particles[index].delay,
          easing: 'easeInOutQuad'
        });
      });
    }
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          ref={el => particleRefs.current[index] = el}
          className="absolute"
          style={{
            left: `${particle.startX}%`,
            top: '-100px',
            fontSize: `${particle.size}px`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

export default ParticleEffects;
