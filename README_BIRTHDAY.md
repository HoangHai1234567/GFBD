# 🎂 Website Sinh Nhật Trần Châu Nhi (Nhi Nho) 🍇

Trang web sinh nhật được thiết kế đặc biệt với theme quả nho (tím & xanh lá), tràn ngập tình yêu và kỷ niệm! 💕

## ✨ Tính năng

- 🎨 **Theme độc đáo**: Màu tím & xanh lá như quả nho
- 🎆 **Hiệu ứng pháo hoa**: Confetti rực rỡ
- ⏰ **Đếm ngược sinh nhật**: GMT+7 (Việt Nam)
- 💌 **Lời chúc ngọt ngào**: Thư tình ấn tượng
- 📸 **Gallery kỷ niệm**: Ảnh và mô tả
- 🎥 **Photobooth**: Ảnh & video riêng biệt
- 🌳 **Background đẹp**: Cây xanh trên nền tím
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị

## 🚀 Bắt đầu

### Yêu cầu hệ thống
- Node.js v18+
- npm v8+

### Cài đặt

```bash
# Di chuyển vào thư mục project
cd my-react-app

# Cài đặt dependencies (nếu chưa cài)
npm install

# Chạy development server
npm run dev
```

Mở trình duyệt tại: `http://localhost:5173`

## 📁 Cấu trúc thư mục

```
my-react-app/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation bar
│   │   ├── BirthdayTitle.jsx # Tiêu đề sinh nhật
│   │   ├── ProfileImage.jsx  # Ảnh profile tròn
│   │   ├── CountdownTimer.jsx # Đếm ngược
│   │   ├── Fireworks.jsx    # Hiệu ứng pháo hoa
│   │   ├── WishMessage.jsx  # Lời chúc
│   │   ├── MemoryGallery.jsx # Gallery ảnh kỷ niệm
│   │   └── TreeBackground.jsx # Background cây
│   ├── pages/               # Pages
│   │   ├── Home.jsx         # Trang chủ
│   │   ├── PhotoboothImages.jsx # Trang ảnh photobooth
│   │   └── PhotoboothVideos.jsx # Trang video photobooth
│   ├── assets/              # Hình ảnh, icons
│   ├── App.jsx              # Main app với routing
│   ├── App.css              # Custom CSS & animations
│   └── main.jsx             # Entry point
├── public/                  # Static files
├── Improve.md               # Ý tưởng cải tiến
└── README_BIRTHDAY.md       # File này
```

## 🎨 Tùy chỉnh

### 1. Thay đổi ngày sinh nhật

Mở file [src/pages/Home.jsx](src/pages/Home.jsx) và tìm dòng:

```jsx
const birthdayDate = new Date('2025-03-10T00:00:00+07:00');
```

Đổi thành ngày sinh nhật thật của bạn gái (GMT+7).

### 2. Thay đổi ảnh profile

Mở file [src/components/ProfileImage.jsx](src/components/ProfileImage.jsx) và thay URL:

```jsx
src="https://via.placeholder.com/400/9333EA/FFFFFF?text=Nhi+Nho"
```

Thành đường dẫn ảnh thật:

```jsx
src="/src/assets/images/profile.jpg"
```

hoặc URL ảnh trực tuyến.

### 3. Thay đổi lời chúc

Mở file [src/components/WishMessage.jsx](src/components/WishMessage.jsx) và chỉnh sửa nội dung trong phần:

```jsx
<div className="space-y-6 text-gray-700 font-dancing-script text-2xl leading-relaxed">
  <p className="indent-8">
    {/* Viết lời chúc của bạn ở đây */}
  </p>
</div>
```

### 4. Thêm ảnh kỷ niệm

Mở file [src/components/MemoryGallery.jsx](src/components/MemoryGallery.jsx) và thay đổi array `memories`:

```jsx
const memories = [
  {
    id: 1,
    image: '/src/assets/images/memory1.jpg', // Thay bằng ảnh thật
    title: 'Lần đầu gặp nhau',
    description: 'Mô tả kỷ niệm...',
    date: '01/01/2024'
  },
  // Thêm nhiều kỷ niệm khác...
];
```

### 5. Thêm ảnh/video Photobooth

**Ảnh:** Mở [src/pages/PhotoboothImages.jsx](src/pages/PhotoboothImages.jsx)
**Video:** Mở [src/pages/PhotoboothVideos.jsx](src/pages/PhotoboothVideos.jsx)

Thay đổi arrays `photoboothImages` và `photoboothVideos`.

### 6. Thay đổi màu sắc theme

Mở [tailwind.config.js](tailwind.config.js) và thêm custom colors:

```js
theme: {
  extend: {
    colors: {
      'grape-purple': '#9333EA',
      'grape-green': '#22C55E',
    }
  }
}
```

## 🎯 Scripts có sẵn

```bash
# Development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📦 Dependencies chính

- **React 19.2.0** - UI framework
- **React Router DOM** - Routing
- **TailwindCSS** - Styling
- **Bootstrap & React-Bootstrap** - UI components
- **React Confetti** - Hiệu ứng pháo hoa
- **React Icons** - Icons
- **Vite** - Build tool

## 🎁 Deployment

### Deploy lên Vercel (Khuyến nghị)

```bash
# Cài Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy lên Netlify

```bash
# Build
npm run build

# Upload folder dist/ lên Netlify
```

### Deploy lên GitHub Pages

```bash
# Cài gh-pages
npm install --save-dev gh-pages

# Thêm vào package.json
"homepage": "https://<username>.github.io/<repo>",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

## 🐛 Troubleshooting

### Lỗi: Module not found

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Tailwind không hoạt động

Kiểm tra [tailwind.config.js](tailwind.config.js) có đúng content paths:

```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

### Ảnh không hiển thị

- Đảm bảo ảnh nằm trong `/public` hoặc `/src/assets`
- URL ảnh phải đúng
- Với ảnh trong `src/assets`, dùng `import`:

```jsx
import myImage from './assets/images/photo.jpg';
<img src={myImage} alt="..." />
```

## 💡 Ý tưởng cải tiến

Xem file [Improve.md](Improve.md) để có 50+ ý tưởng cải tiến tuyệt vời!

## 📝 TODO

- [ ] Thay tất cả ảnh placeholder bằng ảnh thật
- [ ] Cập nhật ngày sinh nhật chính xác
- [ ] Viết lời chúc cá nhân hóa
- [ ] Thêm ảnh/video photobooth
- [ ] Test trên mobile
- [ ] Deploy lên hosting

## ❤️ Credits

Made with 💜 for **Trần Châu Nhi (Nhi Nho)**

**Theme:** Grape (Purple & Green) 🍇
**Framework:** React + Vite
**Styling:** TailwindCSS + Bootstrap
**Icons:** React Icons

## 📄 License

Personal use only - Made for Nhi Nho's birthday 🎂

---

**🎉 Chúc mừng sinh nhật Nhi Nho! 🎉**

Made with ❤️ by [Your Name]
