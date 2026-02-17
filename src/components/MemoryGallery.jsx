import { useState, useEffect, useMemo, useCallback } from 'react';
import { GiGrapes } from 'react-icons/gi';
import heic2any from 'heic2any';

const MemoryGallery = () => {
  const [displayedImages, setDisplayedImages] = useState([]);
  const [allImages, setAllImages] = useState([]);

  // Load all images from MemoryImage folder (including HEIC)
  const imageModules = import.meta.glob('../assets/MemoryImage/*.{jpg,jpeg,png,gif,webp,heic,JPG,JPEG,PNG,GIF,WEBP,HEIC}', {
    eager: true,
    query: '?url',
    import: 'default'
  });

  // Convert HEIC files and prepare all images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = Object.keys(imageModules).map(async (path, index) => {
        const imageSrc = imageModules[path];

        // Check if it's a HEIC file
        if (path.toLowerCase().endsWith('.heic')) {
          try {
            // Fetch the HEIC file
            const response = await fetch(imageSrc);
            const blob = await response.blob();

            // Convert to JPEG
            const convertedBlob = await heic2any({
              blob,
              toType: 'image/jpeg',
              quality: 0.9
            });

            // Create object URL for the converted image
            const url = URL.createObjectURL(Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob);
            return { id: index, image: url, isConverted: true };
          } catch (error) {
            console.error('Error converting HEIC:', error);
            return null;
          }
        }

        // Regular image formats
        return { id: index, image: imageSrc, isConverted: false };
      });

      const loadedImages = await Promise.all(imagePromises);
      const validImages = loadedImages.filter(img => img !== null);
      setAllImages(validImages);
    };

    loadImages();

    // Cleanup function to revoke object URLs
    return () => {
      allImages.forEach(img => {
        if (img.isConverted) {
          URL.revokeObjectURL(img.image);
        }
      });
    };
  }, []);

  // Function to get 6 random images
  const getRandomImages = useCallback(() => {
    console.log('Total images loaded:', allImages.length);
    if (allImages.length === 0) return [];
    if (allImages.length <= 6) return allImages;

    const shuffled = [...allImages].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);
    console.log('Selected 6 images from', allImages.length, 'total images');
    return selected;
  }, [allImages]);

  // Initialize with random images
  useEffect(() => {
    if (allImages.length > 0) {
      const images = getRandomImages();
      console.log('Setting displayed images:', images.length);
      setDisplayedImages(images);
    }
  }, [allImages, getRandomImages]);

  // Change images every 20 seconds
  useEffect(() => {
    if (allImages.length === 0) return;

    const interval = setInterval(() => {
      const images = getRandomImages();
      console.log('Refreshing images - showing:', images.length);
      setDisplayedImages(images);
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, [allImages, getRandomImages]);

  return (
    <div className="my-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-4 mb-4">
          <GiGrapes className="text-5xl text-purple-600 animate-bounce" />
          <h2 className="font-dancing-script text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Kỷ Niệm Của Chúng Mình
          </h2>
          <GiGrapes className="text-5xl text-green-600 animate-bounce animation-delay-500" />
        </div>
        <p className="text-gray-700 text-xl font-semibold">
          Những khoảnh khắc đẹp nhất bên nhau 💖
        </p>
      </div>

      {/* Memory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {displayedImages.map((memory, index) => (
          <div
            key={memory.id}
            className="group relative bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-purple-600 hover:border-pink-500 transition-all duration-500 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image */}
            <div className="aspect-w-4 aspect-h-3 overflow-hidden">
              <img
                src={memory.image}
                alt="Memory"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MemoryGallery;
