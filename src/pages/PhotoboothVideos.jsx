import { useState, useEffect } from 'react';
import { FaTimes, FaPlay, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { GiGrapes } from 'react-icons/gi';

const PhotoboothVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [photoboothVideos, setPhotoboothVideos] = useState([]);
  const [zoom, setZoom] = useState(0.8); // Start at 80%

  useEffect(() => {
    // Automatically load all videos from src/assets/photobooth/videos/
    const videoModules = import.meta.glob('../assets/photobooth/videos/*.{mp4,webm,mov,avi}', { eager: true });

    const loadedVideos = Object.entries(videoModules).map(([path, module], index) => {
      const fileName = path.split('/').pop();
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');

      // Use filename as title (remove extension and clean up)
      const title = nameWithoutExt
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return {
        id: index + 1,
        url: module.default,
        thumbnail: module.default, // Use video itself as thumbnail
        title: title || `Video ${index + 1}`,
        description: `Video photobooth: ${title}`,
        fileName: fileName
      };
    });

    // If no videos found, show empty (the UI will show instructions)
    if (loadedVideos.length === 0) {
      setPhotoboothVideos([]);
    } else {
      setPhotoboothVideos(loadedVideos);
    }
  }, []);

  const openVideo = (video) => {
    setSelectedVideo(video);
    setZoom(0.8); // Reset to 80% when opening
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setZoom(0.8);
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2)); // Max 200%
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.4)); // Min 40%
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 bg-gradient-to-br from-yellow-200 to-orange-200 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-4 border-white">
          <div className="flex justify-center items-center gap-4 mb-4">
            <GiGrapes className="text-6xl text-purple-500 animate-bounce" />
            <h1 className="font-galindo text-5xl md:text-7xl font-bold text-orange-400 text-stroke-black">
              Video Photobooth
            </h1>
            <GiGrapes className="text-6xl text-green-500 animate-bounce animation-delay-500" />
          </div>
          <p className="font-galindo text-orange-700 text-2xl font-bold">
            Bộ sưu tập video photobooth của Nhi Nho & Hoàng Hải 🎥💕
          </p>
        </div>

        {/* Video Grid or Empty State */}
        {photoboothVideos.length === 0 ? (
          <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-3xl border-4 border-purple-400">
            <div className="text-6xl mb-6">🎥</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Chưa có video nào</h3>
            <p className="text-gray-600 mb-2">Thêm video vào folder:</p>
            <code className="bg-purple-100 px-4 py-2 rounded text-purple-700 font-mono text-sm">
              src/assets/photobooth/videos/
            </code>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {photoboothVideos.map((video, index) => (
            <div
              key={video.id}
              className="group relative bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-purple-600 hover:border-pink-500 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-gray-200">
                {video.url ? (
                  <video
                    src={video.url}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    muted
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                  <div className="w-20 h-20 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <FaPlay className="text-white text-3xl ml-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeVideo}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10"
            onClick={closeVideo}
          >
            <FaTimes className="text-2xl text-gray-800" />
          </button>

          {/* Zoom controls - Bottom center for better visibility */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-3 z-50 bg-black/50 backdrop-blur-sm px-4 py-3 rounded-full">
            <button
              className="w-14 h-14 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
              onClick={(e) => { e.stopPropagation(); zoomOut(); }}
              title="Thu nhỏ"
            >
              <FaSearchMinus className="text-2xl text-gray-800" />
            </button>
            <div className="bg-white px-6 py-2 rounded-full shadow-2xl flex items-center min-w-[80px] justify-center">
              <span className="text-lg font-bold text-purple-600">{Math.round(zoom * 100)}%</span>
            </div>
            <button
              className="w-14 h-14 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
              onClick={(e) => { e.stopPropagation(); zoomIn(); }}
              title="Phóng to"
            >
              <FaSearchPlus className="text-2xl text-gray-800" />
            </button>
          </div>

          {/* Video player */}
          <div
            className="max-w-5xl w-full animate-scale-in overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-black rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            >
              <video
                className="w-full h-auto"
                controls
                autoPlay
                src={selectedVideo.url}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl p-6 mt-2">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-gray-700 text-lg">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoboothVideos;
