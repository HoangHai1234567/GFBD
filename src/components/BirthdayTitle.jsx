import { useEffect, useRef } from 'react';
import { FaBirthdayCake, FaHeart } from 'react-icons/fa';
import anime from 'animejs';

const BirthdayTitle = () => {
  const happyRef = useRef(null);
  const birthdayRef = useRef(null);
  const cakeRef = useRef(null);
  const nameRef = useRef(null);
  const heart1Ref = useRef(null);
  const heart2Ref = useRef(null);

  useEffect(() => {
    // Animate "Happy" text with stagger
    anime({
      targets: happyRef.current.children,
      translateY: [-100, 0],
      opacity: [0, 1],
      rotate: [45, 0],
      scale: [0, 1],
      delay: anime.stagger(100),
      duration: 1000,
      easing: 'easeOutElastic(1, .8)'
    });

    // Animate "Birthday" text with stagger
    anime({
      targets: birthdayRef.current.children,
      translateY: [-100, 0],
      opacity: [0, 1],
      rotate: [-45, 0],
      scale: [0, 1],
      delay: anime.stagger(100, { start: 600 }),
      duration: 1000,
      easing: 'easeOutElastic(1, .8)'
    });

    // Animate cake with bounce
    anime({
      targets: cakeRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      scale: [0, 1],
      rotate: [0, 360, 0],
      delay: 1500,
      duration: 1500,
      easing: 'easeOutElastic(1, .6)'
    });

    // Continuous cake bounce
    anime({
      targets: cakeRef.current,
      translateY: [0, -20, 0],
      duration: 2000,
      delay: 3000,
      loop: true,
      easing: 'easeInOutQuad'
    });

    // Animate name badge
    anime({
      targets: nameRef.current,
      scale: [0, 1],
      opacity: [0, 1],
      rotate: [-10, 0],
      delay: 2000,
      duration: 800,
      easing: 'easeOutBack'
    });

    // Floating hearts animation
    anime({
      targets: [heart1Ref.current, heart2Ref.current],
      translateY: [
        { value: -10, duration: 1500 },
        { value: 0, duration: 1500 }
      ],
      scale: [
        { value: 1.2, duration: 1500 },
        { value: 1, duration: 1500 }
      ],
      opacity: [0.6, 0.8, 0.6],
      loop: true,
      easing: 'easeInOutQuad',
      delay: anime.stagger(800)
    });
  }, []);

  return (
    <div className="text-center py-8 relative">
      {/* Decorative hearts */}
      <div ref={heart1Ref} className="absolute top-0 left-1/4">
        <FaHeart className="text-pink-400 text-3xl opacity-60" />
      </div>
      <div ref={heart2Ref} className="absolute top-0 right-1/4">
        <FaHeart className="text-purple-400 text-3xl opacity-60" />
      </div>

      {/* Happy Text */}
      <h1 ref={happyRef} className="font-galindo text-7xl md:text-9xl font-bold mb-2">
        {'Happy'.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block text-green-400 text-stroke-black text-shadow-cartoon"
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Birthday Text */}
      <h1 ref={birthdayRef} className="font-galindo text-7xl md:text-9xl font-bold mb-4">
        {'Birthday'.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block text-pink-400 text-stroke-black text-shadow-cartoon"
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Birthday Cake Icon */}
      <div className="flex justify-center mt-4">
        <FaBirthdayCake
          ref={cakeRef}
          className="text-6xl text-pink-500"
        />
      </div>

      {/* Name */}
      <div
        ref={nameRef}
        className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg border-4 border-white"
      >
        <FaHeart className="text-yellow-300 text-3xl animate-pulse" />
        <span className="font-galindo text-4xl font-bold text-pink-300 text-stroke-black-thin">
          Trần Châu Nhi
        </span>
        <FaHeart className="text-yellow-300 text-3xl animate-pulse" />
      </div>
    </div>
  );
};

export default BirthdayTitle;
