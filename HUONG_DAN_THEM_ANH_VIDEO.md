# 📸🎥 HƯỚNG DẪN THÊM ẢNH VÀ VIDEO PHOTOBOOTH

## ✨ Tính năng tự động

Website đã được cài đặt để **TỰ ĐỘNG** load ảnh và video từ các folder:
- 📸 **Ảnh**: `src/assets/photobooth/images/`
- 🎥 **Video**: `src/assets/photobooth/videos/`

**Bạn không cần chỉnh code gì cả!** Chỉ cần copy file vào folder là xong.

---

## 📸 CÁCH THÊM ẢNH

### Bước 1: Mở folder ảnh
```
Đường dẫn: D:\DemoSNBB\my-react-app\src\assets\photobooth\images\
```

### Bước 2: Copy ảnh vào folder
- Hỗ trợ định dạng: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Có thể copy nhiều ảnh cùng lúc
- Tên file sẽ tự động thành caption (chú thích)

### Bước 3: Xem kết quả
- Mở trình duyệt: http://localhost:5177/photobooth-images
- Ảnh sẽ tự động hiển thị ngay lập tức!

### 💡 Mẹo đặt tên file:

**Cách 1: Tên có ý nghĩa (khuyến nghị)**
```
Ảnh photobooth đầu tiên.jpg
Khoảnh khắc vui vẻ bên nhau.png
Sinh nhật Nhi Nho 2025.jpg
```
→ Tên file sẽ tự động trở thành caption hiển thị dưới ảnh

**Cách 2: Tên ngắn gọn**
```
photo1.jpg
IMG_001.png
DSC_0123.jpg
```
→ Vẫn hiển thị được nhưng caption sẽ đơn giản hơn

---

## 🎥 CÁCH THÊM VIDEO

### Bước 1: Mở folder video
```
Đường dẫn: D:\DemoSNBB\my-react-app\src\assets\photobooth\videos\
```

### Bước 2: Copy video vào folder
- Hỗ trợ định dạng: `.mp4`, `.webm`, `.mov`, `.avi`
- **Khuyến nghị**: Dùng định dạng `.mp4` (tương thích tốt nhất)
- **Lưu ý**: Video nên dưới 50MB mỗi file để load nhanh

### Bước 3: Xem kết quả
- Mở trình duyệt: http://localhost:5177/photobooth-videos
- Video sẽ tự động hiển thị ngay lập tức!

### 💡 Mẹo đặt tên video:

```
Video photobooth đầu tiên.mp4
Kỷ niệm sinh nhật 2025.mp4
Chuyến đi cùng nhau.mp4
```
→ Tên file sẽ tự động trở thành tiêu đề video

---

## 🔄 CẬP NHẬT TỰ ĐỘNG

### ✅ Những gì tự động:
- ✅ Thêm file mới → Tự động hiển thị
- ✅ Xóa file → Tự động biến mất
- ✅ Đổi tên file → Tự động cập nhật caption/title
- ✅ KHÔNG cần restart server
- ✅ KHÔNG cần chỉnh code

### 🔥 Hot Module Replacement (HMR):
- Website sẽ tự động cập nhật khi bạn thêm/xóa file
- Trình duyệt không cần reload (F5)

---

## 📊 THEO DÕI SỐ LƯỢNG

Mỗi trang sẽ hiển thị tổng số file ở cuối trang:
- Trang ảnh: "Tổng số ảnh: X"
- Trang video: "Tổng số video: Y"

---

## ⚠️ LƯU Ý QUAN TRỌNG

### 1. Kích thước file
- **Ảnh**: Nên tối ưu xuống dưới 2MB mỗi ảnh
- **Video**: Nên dưới 50MB mỗi video
- File quá lớn sẽ làm website load chậm

### 2. Tối ưu ảnh trước khi upload
Có thể dùng các công cụ online:
- TinyPNG: https://tinypng.com/
- Compressor.io: https://compressor.io/

### 3. Tối ưu video
- Khuyến nghị: 720p hoặc 1080p
- Frame rate: 30fps là đủ
- Codec: H.264 (MP4)

---

## 🎨 TÙY CHỈNH CAPTION/TITLE

### Cách 1: Đặt tên file có ý nghĩa (Tự động)
```
Ảnh đầu tiên.jpg → "Ảnh Đầu Tiên"
video-vui-ve.mp4 → "Video Vui Ve"
```

### Cách 2: Chỉnh trong code (Nâng cao)
Nếu muốn custom caption chi tiết hơn, có thể tạo file JSON:

**Tạo file**: `src/assets/photobooth/images/captions.json`
```json
{
  "photo1.jpg": "Caption tùy chỉnh cho ảnh 1",
  "photo2.jpg": "Caption tùy chỉnh cho ảnh 2"
}
```

---

## 🆘 XỬ LÝ SỰ CỐ

### Vấn đề: Ảnh/video không hiển thị

**Giải pháp 1: Kiểm tra định dạng file**
```bash
# Chỉ hỗ trợ:
Ảnh: .jpg, .jpeg, .png, .gif, .webp
Video: .mp4, .webm, .mov, .avi
```

**Giải pháp 2: Kiểm tra đường dẫn folder**
```
Đúng: D:\DemoSNBB\my-react-app\src\assets\photobooth\images\
Sai:  D:\DemoSNBB\my-react-app\public\images\
```

**Giải pháp 3: Clear cache và restart**
```bash
# Dừng server (Ctrl+C)
# Xóa cache
rm -rf node_modules/.vite

# Khởi động lại
npm run dev
```

---

## 📖 VÍ DỤ THỰC TẾ

### Ví dụ về cấu trúc folder hoàn chỉnh:

```
src/assets/photobooth/
│
├── images/
│   ├── Ảnh photobooth đầu tiên.jpg        (2.1 MB)
│   ├── Khoảnh khắc vui vẻ.png             (1.8 MB)
│   ├── Sinh nhật 2025.jpg                  (2.5 MB)
│   ├── Tạo dáng siêu cute.jpg              (1.9 MB)
│   └── Chuyến đi biển.webp                 (1.2 MB)
│
├── videos/
│   ├── Video photobooth đầu tiên.mp4      (28 MB)
│   ├── Kỷ niệm đặc biệt.mp4               (35 MB)
│   ├── Sinh nhật năm ngoái.mp4            (42 MB)
│   └── Chuyến đi cùng nhau.mp4            (31 MB)
│
└── README.md
```

Kết quả:
- ✅ 5 ảnh tự động hiển thị tại `/photobooth-images`
- ✅ 4 video tự động hiển thị tại `/photobooth-videos`

---

## 🎯 CHECKLIST NHANH

- [ ] Copy ảnh vào `src/assets/photobooth/images/`
- [ ] Copy video vào `src/assets/photobooth/videos/`
- [ ] Kiểm tra định dạng file (jpg, png, mp4...)
- [ ] Mở trình duyệt xem kết quả
- [ ] Tận hưởng! 🎉

---

## 💝 LỜI KHUYÊN

1. **Chọn ảnh đẹp nhất**: Không cần thêm tất cả ảnh, chỉ chọn những ảnh đẹp nhất
2. **Sắp xếp theo thứ tự**: Đặt tên file có số thứ tự nếu muốn hiển thị theo thứ tự
   ```
   01-Ảnh đầu tiên.jpg
   02-Ảnh thứ hai.jpg
   03-Ảnh thứ ba.jpg
   ```
3. **Backup files**: Nên lưu một bản backup ở nơi khác
4. **Tối ưu trước khi thêm**: Giảm kích thước file để website load nhanh hơn

---

**🎊 Chúc bạn có một trang web sinh nhật tuyệt vời! 🎊**
