# 📚 Hướng Dẫn Sử Dụng TailwindCSS + Bootstrap

## 🎨 Frameworks Đã Cài Đặt

- **TailwindCSS v4.1.18** - Utility-first CSS framework
- **Bootstrap v5.3.8** - Component-based CSS framework
- **React-Bootstrap v2.10.10** - Bootstrap components cho React

---

## 🚀 Cách Sử Dụng

### 1️⃣ TailwindCSS (Utility Classes)

Sử dụng các utility classes trực tiếp trong JSX:

```jsx
function Example() {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">Hello Tailwind!</h1>
      <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100">
        Click me
      </button>
    </div>
  )
}
```

**Ưu điểm:**
- ✅ Viết CSS nhanh chóng với utility classes
- ✅ Không cần viết CSS riêng
- ✅ Responsive dễ dàng với `sm:`, `md:`, `lg:`
- ✅ Dark mode: `dark:bg-gray-800`

---

### 2️⃣ Bootstrap (Components)

Import và sử dụng React-Bootstrap components:

```jsx
import { Button, Card, Alert } from 'react-bootstrap'

function Example() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Hello Bootstrap!</Card.Title>
        <Card.Text>This is a Bootstrap card</Card.Text>
        <Button variant="primary">Click me</Button>
      </Card.Body>
    </Card>
  )
}
```

**Ưu điểm:**
- ✅ Components có sẵn (Modal, Navbar, Dropdown...)
- ✅ Responsive grid system
- ✅ Accessibility built-in
- ✅ Familiar cho dev đã biết Bootstrap

---

## 🎯 Khi Nào Dùng Framework Nào?

### Dùng **TailwindCSS** khi:
- 🎨 Cần custom design độc đáo
- ⚡ Muốn viết CSS nhanh trong JSX
- 🎭 Cần kiểm soát hoàn toàn styling
- 📱 Responsive design phức tạp

### Dùng **Bootstrap** khi:
- 📦 Cần components phức tạp có sẵn (Modals, Dropdowns)
- 🏗️ Muốn dùng Grid system của Bootstrap
- ⏱️ Cần prototype nhanh
- 👥 Team quen thuộc với Bootstrap

---

## ⚠️ Lưu Ý Khi Dùng Cả Hai

### Tránh Xung Đột:
Cả Tailwind và Bootstrap đều có các classes giống nhau, ví dụ: `container`, `row`, `col`

**Giải pháp:**

1. **Sử dụng prefix cho Tailwind** (khuyên dùng):
```js
// tailwind.config.js
export default {
  prefix: 'tw-', // Tất cả class Tailwind sẽ có prefix 'tw-'
  // ...
}
```

Sau đó dùng: `className="tw-bg-blue-500 tw-text-white"`

2. **Tắt preflight của Tailwind** (nếu muốn dùng reset của Bootstrap):
```js
// tailwind.config.js
export default {
  corePlugins: {
    preflight: false,
  },
  // ...
}
```

---

## 📖 Ví Dụ Kết Hợp

```jsx
import { Container, Row, Col } from 'react-bootstrap'

function App() {
  return (
    {/* Bootstrap Grid */}
    <Container>
      <Row>
        {/* Bootstrap Col + Tailwind styling */}
        <Col md={6} className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg">
          <h2 className="text-white text-2xl font-bold">
            Best of both worlds! 🎉
          </h2>
        </Col>
      </Row>
    </Container>
  )
}
```

---

## 🔗 Tài Liệu Tham Khảo

- **TailwindCSS:** https://tailwindcss.com/docs
- **Bootstrap:** https://getbootstrap.com/docs/5.3
- **React-Bootstrap:** https://react-bootstrap.github.io/

---

## 💡 Tips

1. **Tailwind IntelliSense**: Cài extension "Tailwind CSS IntelliSense" trong VSCode
2. **Bootstrap Icons**: Cài thêm `npm install bootstrap-icons` nếu cần icons
3. **Prettier Tailwind**: Cài `prettier-plugin-tailwindcss` để format classes

---

Chúc bạn code vui vẻ! 🚀
