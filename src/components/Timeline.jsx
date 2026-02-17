import { useEffect, useRef } from 'react';
import { FaHeart, FaCalendar } from 'react-icons/fa';
import { GiGrapes } from 'react-icons/gi';
import anime from 'animejs';

const Timeline = () => {
  const timelineLineRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  const titleRef = useRef(null);

  const milestones = [
    {
      date: "29/03/2024",
      title: "Lần đầu nhận lời yêu 💕",
      color: "purple"
    },
    {
      date: "01/01/2025",
      title: "Lần đầu đón năm mới với nhau 🎉",
      color: "pink"
    },
    {
      date: "29/03/2025",
      title: "Kỉ niệm 1 năm yêu nhau 🎊",
      color: "green"
    },
    {
      date: "06/07/2025",
      title: "Hoàng Hải tốt nghiệp 🎓",
      color: "purple"
    },
    {
      date: "23/08/2025",
      title: "Nhi Nho tốt nghiệp 🎓",
      color: "pink"
    },
    {
      date: "19/02/2026",
      title: "Sinh nhật năm nay 🎂",
      color: "green"
    }
  ];

  useEffect(() => {
    // Animate title
    anime({
      targets: titleRef.current,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutBack'
    });

    // Animate timeline line growing from top to bottom
    anime({
      targets: timelineLineRef.current,
      scaleY: [0, 1],
      duration: 1500,
      delay: 500,
      easing: 'easeOutExpo'
    });

    // Animate dots appearing with stagger
    anime({
      targets: dotRefs.current,
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(200, { start: 800 }),
      duration: 600,
      easing: 'easeOutElastic(1, .6)'
    });

    // Animate cards sliding in from left/right with stagger
    cardRefs.current.forEach((card, index) => {
      const isEven = index % 2 === 0;
      anime({
        targets: card,
        translateX: [isEven ? 100 : -100, 0],
        opacity: [0, 1],
        rotate: [isEven ? 10 : -10, 0],
        delay: 1000 + index * 250,
        duration: 800,
        easing: 'easeOutExpo'
      });
    });
  }, []);

  return (
    <div className="my-16">
      <div ref={titleRef} className="text-center mb-12">
        <h2 className="font-dancing-script text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <GiGrapes className="text-purple-600" />
          Timeline Kỷ Niệm
          <GiGrapes className="text-green-600" />
        </h2>
        <p className="text-gray-700 text-xl">Những khoảnh khắc đáng nhớ của chúng mình</p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div
          ref={timelineLineRef}
          className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-300 via-pink-300 to-green-300"
          style={{ transformOrigin: 'top' }}
        ></div>

        {/* Timeline items */}
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`mb-8 flex items-center w-full ${
              index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className="w-5/12"></div>

            {/* Center dot */}
            <div
              ref={el => dotRefs.current[index] = el}
              className="z-10 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg border-4 border-purple-600 shrink-0"
            >
              <div className={`w-3 h-3 rounded-full ${
                milestone.color === 'purple' ? 'bg-purple-600' :
                milestone.color === 'pink' ? 'bg-pink-500' :
                'bg-green-500'
              }`}></div>
            </div>

            {/* Content card */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <div
                ref={el => cardRefs.current[index] = el}
                className={`bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border-2 ${
                  milestone.color === 'purple' ? 'border-purple-400' :
                  milestone.color === 'pink' ? 'border-pink-400' :
                  'border-green-400'
                } hover:scale-105 transition-transform cursor-pointer`}
                onMouseEnter={(e) => {
                  anime({
                    targets: e.currentTarget,
                    scale: 1.05,
                    rotate: index % 2 === 0 ? 2 : -2,
                    duration: 300,
                    easing: 'easeOutQuad'
                  });
                }}
                onMouseLeave={(e) => {
                  anime({
                    targets: e.currentTarget,
                    scale: 1,
                    rotate: 0,
                    duration: 300,
                    easing: 'easeOutQuad'
                  });
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendar className={`${
                    milestone.color === 'purple' ? 'text-purple-600' :
                    milestone.color === 'pink' ? 'text-pink-500' :
                    'text-green-500'
                  }`} />
                  <span className="text-sm font-semibold text-gray-600">{milestone.date}</span>
                </div>
                <h3 className="font-dancing-script text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {milestone.title}
                </h3>
                <div className="mt-3 flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <FaHeart key={i} className="text-pink-400 text-xs animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
