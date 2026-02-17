import { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GiGrapes } from 'react-icons/gi';

const PhotoboothImages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoboothImages, setPhotoboothImages] = useState([]);

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
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % photoboothImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(photoboothImages[newIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + photoboothImages.length) % photoboothImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(photoboothImages[newIndex]);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-4 border-purple-600">
          <div className="flex justify-center items-center gap-4 mb-4">
            <GiGrapes className="text-5xl text-purple-600 animate-bounce" />
            <h1 className="font-dancing-script text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Ảnh Photobooth
            </h1>
            <GiGrapes className="text-5xl text-green-600 animate-bounce animation-delay-500" />
          </div>
          <p className="text-gray-700 text-xl font-semibold">
            Bộ sưu tập ảnh photobooth của Nhi Nho & bạn trai 📸💕
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

        {/* Note */}
        <div className="text-center mt-12 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-6 border-2 border-purple-400">
          <p className="text-gray-700 font-semibold mb-2">
            📁 Thêm ảnh photobooth
          </p>
          <p className="text-sm text-gray-600">
            Copy ảnh của bạn vào folder: <code className="bg-purple-100 px-2 py-1 rounded text-purple-700">src/assets/photobooth/images/</code>
          </p>
          <p className="text-xs text-gray-500 mt-2 italic">
            Hỗ trợ: .jpg, .jpeg, .png, .gif, .webp • Tự động cập nhật khi thêm file mới
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Tổng số ảnh: <span className="font-bold text-purple-600">{photoboothImages.length}</span>
          </p>
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

          {/* Image */}
          <div
            className="max-w-5xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={`Photobooth ${selectedImage.id}`}
              className="w-full h-auto rounded-2xl shadow-2xl"
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
