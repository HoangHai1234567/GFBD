import { FaHeart } from 'react-icons/fa';
import { GiGrapes } from 'react-icons/gi';
import avatarImage from '../assets/AvatarIcon.jpg';

const ProfileImage = () => {
  return (
    <div className="flex justify-center my-12 relative">
      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 animate-float">
        <GiGrapes className="text-6xl text-purple-600" />
      </div>
      <div className="absolute -top-10 -right-10 animate-float animation-delay-1000">
        <GiGrapes className="text-6xl text-green-600" />
      </div>

      {/* Main profile container */}
      <div className="relative group">
        {/* Rotating circle text */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-spin-slow z-10">
          <FaHeart className="text-white text-3xl" />
        </div>

        {/* Profile image */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-purple-600 shadow-2xl hover:scale-105 transition-transform duration-500">
          <img
            src={avatarImage}
            alt="Trần Châu Nhi"
            className="w-full h-full object-cover"
          />

          {/* Overlay effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
            <p className="text-white font-bold text-2xl font-dancing-script">
              Nhi Nho 💕
            </p>
          </div>
        </div>

        {/* Decorative hearts */}
        <FaHeart className="absolute -bottom-4 -left-4 text-5xl text-pink-500 animate-pulse" />
        <FaHeart className="absolute -bottom-4 -right-4 text-5xl text-purple-500 animate-pulse animation-delay-500" />
      </div>
    </div>
  );
};

export default ProfileImage;
