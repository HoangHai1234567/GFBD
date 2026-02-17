import { useState } from 'react';
import BirthdayTitle from '../components/BirthdayTitle';
import ProfileImage from '../components/ProfileImage';
import CountdownTimer from '../components/CountdownTimer';
import Fireworks from '../components/Fireworks';
import WishMessage from '../components/WishMessage';
import MemoryGallery from '../components/MemoryGallery';
import Timeline from '../components/Timeline';
import Guestbook from '../components/Guestbook';
import MemoryGame from '../components/MemoryGame';

const Home = () => {
  const [showFireworks, setShowFireworks] = useState(true);

  // Set your girlfriend's birthday here (GMT+7)
  const birthdayDate = new Date('2026-02-19T00:00:00+07:00'); // Sinh nhật Nhi Nho: 19/2/2026

  return (
    <div className="min-h-screen pt-24 pb-16 bg-transparent">
      {/* Fireworks effect */}
      {showFireworks && <Fireworks run={showFireworks} />}

      {/* Main content container with semi-transparent white background */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Content panel */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-purple-600">
          {/* Birthday Title */}
          <BirthdayTitle />

          {/* Profile Image */}
          <ProfileImage />

          {/* Countdown Timer */}
          <CountdownTimer targetDate={birthdayDate} />

          {/* Toggle Fireworks Button */}
          <div className="text-center my-8">
            <button
              onClick={() => setShowFireworks(!showFireworks)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
            >
              {showFireworks ? '✨ Tắt pháo hoa' : '🎆 Bật pháo hoa'}
            </button>
          </div>

          {/* Wish Message */}
          <WishMessage />

          {/* Timeline */}
          <Timeline />

          {/* Guestbook */}
          <Guestbook />

          {/* Memory Game */}
          <MemoryGame />

          {/* Memory Gallery */}
          <MemoryGallery />
        </div>
      </div>
    </div>
  );
};

export default Home;
