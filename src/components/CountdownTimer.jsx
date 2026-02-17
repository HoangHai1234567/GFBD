import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // GMT+7 (Vietnam timezone)
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-4 border-purple-600 min-w-[100px] hover:scale-110 transition-transform">
      <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <div className="my-12 relative">
      {/* Decorative stars */}
      <FaStar className="absolute -top-4 left-1/4 text-yellow-400 text-2xl animate-spin-slow" />
      <FaStar className="absolute -top-4 right-1/4 text-yellow-400 text-2xl animate-spin-slow animation-delay-1000" />

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <TimeBlock value={timeLeft.days} label="Ngày" />
        <TimeBlock value={timeLeft.hours} label="Giờ" />
        <TimeBlock value={timeLeft.minutes} label="Phút" />
        <TimeBlock value={timeLeft.seconds} label="Giây" />
      </div>

      <p className="text-center mt-6 text-gray-700 font-semibold text-lg">
        ⏰ Đếm ngược đến sinh nhật Nhi Nho (GMT+7)
      </p>
    </div>
  );
};

export default CountdownTimer;
