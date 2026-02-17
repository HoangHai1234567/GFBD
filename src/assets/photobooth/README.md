# Hướng dẫn thêm ảnh và video Photobooth

## 📸 Thêm ảnh

1. Copy các file ảnh của bạn vào folder: `src/assets/photobooth/images/`
2. Hỗ trợ định dạng: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
3. Ảnh sẽ tự động xuất hiện trên trang `/photobooth-images`

### Đặt tên file (tùy chọn):
- Bạn có thể đặt caption trong tên file, ví dụ:
  - `Ảnh photobooth đầu tiên.jpg`
  - `Khoảnh khắc vui vẻ.png`
- Hoặc đặt tên bình thường: `photo1.jpg`, `IMG_001.jpg`

## 🎥 Thêm video

1. Copy các file video của bạn vào folder: `src/assets/photobooth/videos/`
2. Hỗ trợ định dạng: `.mp4`, `.webm`, `.mov`
3. Video sẽ tự động xuất hiện trên trang `/photobooth-videos`

### Lưu ý về video:
- Video nên có kích thước hợp lý (khuyến nghị dưới 50MB mỗi file)
- Định dạng `.mp4` hoạt động tốt nhất trên mọi trình duyệt

## 🔄 Tự động cập nhật

- Khi bạn thêm/xóa file, website sẽ tự động cập nhật (Hot Module Replacement)
- Không cần restart server
- Không cần chỉnh code!

## 📁 Cấu trúc folder

```
src/assets/photobooth/
├── images/          ← Đặt ảnh vào đây
│   ├── photo1.jpg
│   ├── photo2.png
│   └── ...
├── videos/          ← Đặt video vào đây
│   ├── video1.mp4
│   ├── video2.mp4
│   └── ...
└── README.md        ← File này
```
