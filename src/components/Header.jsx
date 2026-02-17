import { Link } from 'react-router-dom';
import { FaImage, FaVideo, FaBirthdayCake } from 'react-icons/fa';
import { GiGrapes } from 'react-icons/gi';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] bg-purple-600/90 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-pink-400 text-3xl font-bold hover:scale-110 transition-transform"
          >
            <FaBirthdayCake className="text-4xl animate-bounce text-pink-400" />
            <span className="font-galindo text-stroke-black-thin">Nhi Nho</span>
            <GiGrapes className="text-4xl animate-bounce text-green-400" />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link
              to="/photobooth-images"
              className="flex items-center gap-2 px-6 py-3 bg-pink-400 hover:bg-pink-500 rounded-full text-white font-galindo font-bold transition-all hover:scale-105 shadow-lg border-3 border-white text-stroke-black-thin"
            >
              <FaImage className="text-xl" />
              <span>Ảnh Photobooth</span>
            </Link>
            <Link
              to="/photobooth-videos"
              className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-full text-white font-galindo font-bold transition-all hover:scale-105 shadow-lg border-3 border-white text-stroke-black-thin"
            >
              <FaVideo className="text-xl" />
              <span>Video Photobooth</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
