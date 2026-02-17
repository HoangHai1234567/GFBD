import { useState, useEffect, useRef } from 'react';
import { GiGrapes } from 'react-icons/gi';
import { FaHeart, FaStar, FaGem, FaCrown, FaMusic, FaCamera } from 'react-icons/fa';
import anime from 'animejs';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const cardRefs = useRef([]);
  const victoryRef = useRef(null);

  const cardIcons = [
    { id: 1, icon: <GiGrapes />, color: 'text-purple-600' },
    { id: 2, icon: <FaHeart />, color: 'text-pink-500' },
    { id: 3, icon: <FaStar />, color: 'text-yellow-500' },
    { id: 4, icon: <FaGem />, color: 'text-blue-500' },
    { id: 5, icon: <FaCrown />, color: 'text-yellow-600' },
    { id: 6, icon: <FaMusic />, color: 'text-green-500' },
    { id: 7, icon: <FaCamera />, color: 'text-purple-500' },
    { id: 8, icon: <FaHeart />, color: 'text-red-500' }
  ];

  const initializeGame = () => {
    const duplicatedCards = [...cardIcons, ...cardIcons].map((card, index) => ({
      ...card,
      uniqueId: index
    }));
    const shuffled = duplicatedCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
    setGameStarted(true);

    // Reset all card transforms before entrance animation
    setTimeout(() => {
      cardRefs.current.forEach(card => {
        if (card) {
          card.style.transform = '';
          card.style.opacity = '1';
        }
      });

      // Entrance animation for cards
      anime({
        targets: cardRefs.current.filter(Boolean),
        scale: [0, 1],
        rotate: [180, 0],
        rotateY: 0,
        opacity: [0, 1],
        delay: anime.stagger(80),
        duration: 600,
        easing: 'easeOutElastic(1, .6)'
      });
    }, 100);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;

      // Wait for the second card's flip animation to complete (400ms)
      setTimeout(() => {
        if (cards[first].id === cards[second].id) {
          // MATCH: Both cards slowly disappear together
          anime({
            targets: [cardRefs.current[first], cardRefs.current[second]],
            scale: [1, 1.15, 0],
            opacity: [1, 1, 0],
            rotate: [0, 5, 0],
            duration: 800,
            easing: 'easeInOutQuad',
            complete: () => {
              setMatched(prev => [...prev, cards[first].id]);
              setFlipped([]);
              setDisabled(false);
              setMoves(prev => prev + 1);
            }
          });
        } else {
          // MISMATCH: Shake both cards, then flip both back together
          anime({
            targets: [cardRefs.current[first], cardRefs.current[second]],
            translateX: [
              { value: -10, duration: 100 },
              { value: 10, duration: 100 },
              { value: -10, duration: 100 },
              { value: 10, duration: 100 },
              { value: 0, duration: 100 }
            ],
            easing: 'easeInOutQuad',
            complete: () => {
              // After shake, flip both cards back down together
              anime({
                targets: [cardRefs.current[first], cardRefs.current[second]],
                rotateY: 0,
                duration: 400,
                easing: 'easeOutQuad',
                complete: () => {
                  setFlipped([]);
                  setDisabled(false);
                  setMoves(prev => prev + 1);
                }
              });
            }
          });
        }
      }, 450); // Wait slightly longer than flip duration to ensure both cards are face-up
    }
  }, [flipped, cards]);

  // Victory animation
  useEffect(() => {
    if (matched.length === cardIcons.length && gameStarted && victoryRef.current) {
      anime({
        targets: victoryRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .6)'
      });

      // Confetti effect on cards
      anime({
        targets: cardRefs.current.filter(Boolean),
        translateY: [0, -20, 0],
        rotate: [0, 360],
        delay: anime.stagger(50),
        duration: 1000,
        easing: 'easeOutElastic(1, .5)'
      });
    }
  }, [matched, gameStarted]);

  const handleCardClick = (index) => {
    // Prevent clicking when disabled, already flipped, or already matched
    if (disabled || flipped.includes(index) || matched.includes(cards[index]?.id)) {
      return;
    }

    // Manually flip the card with animation
    anime({
      targets: cardRefs.current[index],
      rotateY: 180,
      duration: 400,
      easing: 'easeOutQuad'
    });

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // If this is the second card, disable further clicks
    if (newFlipped.length === 2) {
      setDisabled(true);
    }
  };

  return (
    <div className="my-16">
      <div className="text-center mb-8">
        <h2 className="font-dancing-script text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
          Memory Game 🎮
        </h2>
        <p className="text-gray-700 text-xl mb-6">Tìm các cặp thẻ giống nhau!</p>

        {!gameStarted ? (
          <button
            onClick={initializeGame}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
          >
            Bắt đầu chơi 🎲
          </button>
        ) : (
          <div className="flex justify-center gap-8 mb-6">
            <div className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border-2 border-purple-400">
              <span className="font-bold text-purple-600">Số nước: {moves}</span>
            </div>
            <div className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border-2 border-green-400">
              <span className="font-bold text-green-600">Đã ghép: {matched.length}/{cardIcons.length}</span>
            </div>
            <button
              onClick={initializeGame}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
            >
              Chơi lại
            </button>
          </div>
        )}
      </div>

      {gameStarted && (
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={card.uniqueId}
              ref={el => cardRefs.current[index] = el}
              onClick={() => handleCardClick(index)}
              className="relative aspect-square cursor-pointer"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Card back */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg border-4 border-purple-700"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <GiGrapes className="text-6xl text-white" />
              </div>

              {/* Card front */}
              <div
                className="absolute inset-0 bg-white rounded-xl flex items-center justify-center shadow-lg border-4 border-purple-400"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className={`text-6xl ${card.color}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {matched.length === cardIcons.length && gameStarted && (
        <div
          ref={victoryRef}
          className="mt-8 text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-4 border-green-500"
        >
          <h3 className="font-dancing-script text-4xl font-bold text-green-600 mb-4">
            🎉 Chúc mừng! Bạn đã hoàn thành! 🎉
          </h3>
          <p className="text-xl text-gray-700">
            Hoàn thành với <span className="font-bold text-purple-600">{moves}</span> nước đi!
          </p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
