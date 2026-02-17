import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showClickPrompt, setShowClickPrompt] = useState(true);
  const audioRef = useRef(null);

  // Happy Birthday instrumental music (loop enabled)
  const audioSrc = '/music/happy-birthday.mp3';

  // Start music on first user interaction
  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = volume;
      await audio.play();
      setIsPlaying(true);
      setShowClickPrompt(false);
      console.log('Music started playing!');
    } catch (error) {
      console.error('Failed to start music:', error);
    }
  };

  // Setup audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleError = (e) => {
      console.error('Audio loading error:', e);
      console.error('Audio error details:', audio.error);
    };

    audio.addEventListener('error', handleError);
    audio.load();

    return () => {
      audio.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <>
      {/* Click Overlay - Auto-start music on first click */}
      {showClickPrompt && (
        <div
          onClick={startMusic}
          className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center cursor-pointer animate-fade-in"
        >
          <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-3xl shadow-2xl border-4 border-purple-500 animate-bounce">
            <p className="font-galindo text-2xl text-purple-600 text-center">
              🎵 Click để bắt đầu nhạc 🎵
            </p>
          </div>
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-[9998] bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-2xl p-4 flex items-center gap-3 backdrop-blur-sm">
        {/* Audio element */}
        <audio ref={audioRef} loop>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <FaPause className="text-purple-600 text-xl" />
          ) : (
            <FaPlay className="text-purple-600 text-xl ml-1" />
          )}
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-2">
          <button
            onClick={toggleMute}
            className="text-white hover:scale-110 transition-transform"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <FaVolumeMute className="text-xl" />
            ) : (
              <FaVolumeUp className="text-xl" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%)`,
            }}
          />
        </div>

        {/* Music Note Icon */}
        <div className="text-white text-sm font-semibold animate-bounce">
          🎵
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
