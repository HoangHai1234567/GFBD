import { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { GiGrapes } from 'react-icons/gi';

const PhotoboothImages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoboothImages, setPhotoboothImages] = useState([]);
  const [zoom, setZoom] = useState(0.8); // Start at 80%

  useEffect(() => {
    // Automatically load all images from src/assets/photobooth/images/
    const imageModules = import.meta.glob('../assets/photobooth/images/*.{jpg,jpeg,png,gif,webp}', { eager: true });

    const loadedImages = Object.entries(imageModules).map(([path, module], index) => {
      const fileName = path.split('/').pop();
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');

      // Use filename as caption (remove extension and clean up)
      const caption = nameWithoutExt
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

      return {
        id: index + 1,
        url: module.default,
        caption: caption || `Ảnh photobooth ${index + 1}`,
        fileName: fileName
      };
    });

    // Set images (empty array if none found)
    setPhotoboothImages(loadedImages);
  }, []);

  const openImage = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setZoom(0.8); // Reset to 80% when opening
  };

  const closeImage = () => {
    setSelectedImage(null);
    setZoom(0.8);
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2)); // Max 200%
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.4)); // Min 40%
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % photoboothImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(photoboothImages[newIndex]);
    setZoom(0.8); // Reset zoom when changing image
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + photoboothImages.length) % photoboothImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(photoboothImages[newIndex]);
    setZoom(0.8); // Reset zoom when changing image
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 bg-gradient-to-br from-pink-200 to-purple-200 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-4 border-white">
          <div className="flex justify-center items-center gap-4 mb-4">
            <GiGrapes className="text-6xl text-purple-500 animate-bounce" />
            <h1 className="font-galindo text-5xl md:text-7xl font-bold text-pink-400 text-stroke-black">
              Ảnh Photobooth
            </h1>
            <GiGrapes className="text-6xl text-green-500 animate-bounce animation-delay-500" />
          </div>
          <p className="font-galindo text-purple-700 text-2xl font-bold">
            Bộ sưu tập ảnh photobooth của Nhi Nho & Hoàng Hải 📸💕
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photoboothImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-purple-600 hover:border-pink-500 transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => openImage(image, index)}
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={image.url}
                  alt={`Photobooth ${image.id}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-sm font-semibold">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeImage}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 w-12 h-12 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10"
            onClick={closeImage}
          >
            <FaTimes className="text-2xl text-gray-800" />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 w-12 h-12 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10"
            onClick={prevImage}
          >
            <FaChevronLeft className="text-2xl text-gray-800" />
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 w-12 h-12 bg-white hover:bg-gray-200 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10"
            onClick={nextImage}
          >
            <FaChevronRight className="text-2xl text-gray-800" />
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

          {/* Image */}
          <div
            className="max-w-5xl w-full animate-scale-in overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={`Photobooth ${selectedImage.id}`}
              className="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-300"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            />
            <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl p-6 mt-2">
              <p className="text-center text-gray-700 text-lg font-semibold">
                {selectedImage.caption}
              </p>
              <p className="text-center text-gray-500 text-sm mt-2">
                {currentIndex + 1} / {photoboothImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoboothImages;
