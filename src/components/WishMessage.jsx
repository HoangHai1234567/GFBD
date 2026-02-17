import { useState, useEffect } from 'react';
import { FaHeart, FaEnvelope, FaRandom } from 'react-icons/fa';
import { GiGrapes } from 'react-icons/gi';

const WishMessage = () => {
  const [showLetter, setShowLetter] = useState(false);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);

  const wishes = [
    {
      title: "Gửi Nhi Nho yêu quý 💕",
      paragraphs: [
        "Chúc mừng sinh nhật em yêu! 🎂 Hôm nay là ngày đặc biệt nhất trong năm, là ngày anh được chúc mừng cô gái tuyệt vời nhất trên đời.",
        "Nhi Nho à, em biết không? Em giống như một chùm nho ngọt ngào - ngọt ngào, đáng yêu và luôn mang lại niềm vui cho anh mỗi ngày. Màu tím của quả nho cũng như tình yêu của anh dành cho em - sâu sắc, chân thành và mãi mãi không thay đổi. 🍇",
        "Anh chúc em luôn tươi trẻ, xinh đẹp, vui vẻ và hạnh phúc. Chúc tất cả ước mơ của em đều trở thành hiện thực. Chúc chúng mình sẽ còn được ăn mừng nhiều sinh nhật bên nhau nữa! ✨"
      ]
    },
    {
      title: "Happy Birthday, Nhi Nho! 🎉",
      paragraphs: [
        "Mỗi năm trôi qua, em lại thêm một tuổi mới, nhưng với anh, em vẫn luôn là cô gái xinh đẹp và đáng yêu nhất! 💕",
        "Cảm ơn em đã luôn ở bên anh, đã chia sẻ những khoảnh khắc vui buồn, đã làm cuộc sống của anh trở nên ý nghĩa hơn rất nhiều. 🌟",
        "Sinh nhật này, anh chúc em sức khỏe dồi dào, luôn tràn đầy năng lượng tích cực, và mãi mãi giữ được nụ cười tươi rói đó nhé! 😊"
      ]
    },
    {
      title: "Món quà đặc biệt dành cho em 🎁",
      paragraphs: [
        "Năm nay em đã trưởng thành hơn, xinh đẹp hơn và đáng yêu hơn rất nhiều (mặc dù anh vẫn nghĩ em đã hoàn hảo từ trước rồi 😄)",
        "Những gì anh muốn tặng em không chỉ là những món quà vật chất, mà là những kỷ niệm đẹp, những khoảnh khắc ngọt ngào mà chúng mình sẽ cùng nhau tạo nên. 💖",
        "Chúc em sinh nhật thật vui vẻ, thật nhiều niềm vui và hạnh phúc! Anh sẽ luôn ở bên cạnh em trong mọi chặng đường! 🌈"
      ]
    },
    {
      title: "Em là ánh sáng của anh ✨",
      paragraphs: [
        "Sinh nhật vui vẻ, Nhi Nho của anh! Em biết không, mỗi ngày được gặp em là một ngày hạnh phúc với anh. 🥰",
        "Em như một tia nắng ấm áp, xua tan mọi u buồn, làm mọi thứ trở nên tươi sáng và tràn đầy hy vọng. Em là lý do anh mỉm cười mỗi sáng thức dậy. ☀️",
        "Chúc em tuổi mới này sẽ gặp được nhiều may mắn, thành công trong công việc, và quan trọng nhất là luôn vui vẻ, hạnh phúc bên anh nhé! 💕"
      ]
    }
  ];

  useEffect(() => {
    // Random select a wish on component mount
    setCurrentWishIndex(Math.floor(Math.random() * wishes.length));
  }, []);

  const randomizeWish = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * wishes.length);
    } while (newIndex === currentWishIndex && wishes.length > 1);
    setCurrentWishIndex(newIndex);
  };

  const currentWish = wishes[currentWishIndex];

  return (
    <div className="my-16 relative">
      {/* Button to show letter */}
      {!showLetter && (
        <div className="text-center">
          <button
            onClick={() => setShowLetter(true)}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xl rounded-full shadow-2xl border-4 border-gray-800 hover:scale-110 transition-all duration-300 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-2xl group-hover:rotate-12 transition-transform" />
              <span>Nhấn để đọc lời chúc</span>
              <FaHeart className="text-2xl group-hover:animate-bounce" />
            </div>
          </button>
        </div>
      )}

      {/* Letter content */}
      {showLetter && (
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-purple-600 p-8 md:p-12 relative animate-scale-in">
          {/* Close button */}
          <button
            onClick={() => setShowLetter(false)}
            className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
          >
            ✕
          </button>

          {/* Decorative grapes */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <GiGrapes className="text-6xl text-purple-600 animate-bounce" />
          </div>

          {/* Letter header */}
          <div className="text-center mb-8 mt-6">
            <h2 className="font-dancing-script text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
              {currentWish.title}
            </h2>
            <div className="flex justify-center gap-2">
              <FaHeart className="text-pink-500 text-2xl animate-pulse" />
              <FaHeart className="text-purple-500 text-2xl animate-pulse animation-delay-300" />
              <FaHeart className="text-pink-500 text-2xl animate-pulse animation-delay-600" />
            </div>
          </div>

          {/* Letter body */}
          <div className="space-y-6 text-gray-700 font-dancing-script text-2xl leading-relaxed">
            {currentWish.paragraphs.map((paragraph, index) => (
              <p key={index} className="indent-8">
                {paragraph}
              </p>
            ))}
            <p className="text-right font-bold text-purple-600 mt-8">
              Yêu em nhiều lắm! 💖<br />
              - Người yêu em -
            </p>
          </div>

          {/* Random wish button */}
          <div className="mt-6 text-center">
            <button
              onClick={randomizeWish}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <FaRandom />
              <span>Xem lời chúc khác</span>
            </button>
          </div>

          {/* Decorative hearts */}
          <div className="mt-8 flex justify-center gap-3">
            {[...Array(7)].map((_, i) => (
              <FaHeart
                key={i}
                className="text-pink-500 text-xl animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishMessage;
