import { useState, useEffect } from 'react';
import { FaHeart, FaPaperPlane, FaTrash } from 'react-icons/fa';
import { GiGrapes } from 'react-icons/gi';

const Guestbook = () => {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Load wishes from localStorage
    const savedWishes = localStorage.getItem('guestbook-wishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    }
  }, []);

  const saveWishes = (newWishes) => {
    localStorage.setItem('guestbook-wishes', JSON.stringify(newWishes));
    setWishes(newWishes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      const newWish = {
        id: Date.now(),
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleString('vi-VN')
      };
      const updatedWishes = [newWish, ...wishes];
      saveWishes(updatedWishes);
      setName('');
      setMessage('');
      setShowForm(false);
    }
  };

  const deleteWish = (id) => {
    const updatedWishes = wishes.filter(wish => wish.id !== id);
    saveWishes(updatedWishes);
  };

  return (
    <div className="my-16">
      <div className="text-center mb-12">
        <h2 className="font-dancing-script text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
          <GiGrapes className="text-purple-600" />
          Sổ Lưu Bút
          <GiGrapes className="text-green-600" />
        </h2>
        <p className="text-gray-700 text-xl mb-6">Để lại lời chúc sinh nhật cho Nhi Nho</p>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <FaPaperPlane />
            <span>Viết lời chúc</span>
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="max-w-2xl mx-auto mb-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border-4 border-purple-400 p-6 animate-scale-in">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                Tên của bạn
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-600"
                placeholder="Nhập tên của bạn..."
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                Lời chúc
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-600 resize-none"
                rows="4"
                placeholder="Viết lời chúc của bạn..."
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
              >
                Gửi lời chúc 💕
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-400 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Wishes list */}
      <div className="max-w-3xl mx-auto space-y-4">
        {wishes.length === 0 ? (
          <div className="text-center py-12 bg-white/40 backdrop-blur-md rounded-2xl border-2 border-purple-300">
            <p className="text-gray-600 text-lg">Chưa có lời chúc nào. Hãy là người đầu tiên! 🎉</p>
          </div>
        ) : (
          wishes.map((wish, index) => (
            <div
              key={wish.id}
              className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border-2 border-purple-300 p-6 hover:shadow-xl transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-purple-600 text-xl flex items-center gap-2">
                    <FaHeart className="text-pink-500" />
                    {wish.name}
                  </h3>
                  <p className="text-sm text-gray-500">{wish.timestamp}</p>
                </div>
                <button
                  onClick={() => deleteWish(wish.id)}
                  className="text-red-500 hover:text-red-700 hover:scale-110 transition-all"
                  title="Xóa lời chúc"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed font-dancing-script text-lg">
                {wish.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Guestbook;
