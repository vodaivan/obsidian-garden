# Hướng dẫn Deploy lên GitHub + Vercel

## Cấu trúc project

```
my-garden/
├── app/                 # Next.js pages
│   ├── layout.tsx       # Layout chung (header, footer)
│   ├── page.tsx         # Trang chủ: recent posts + calendar
│   ├── globals.css      # CSS styling
│   └── post/[slug]/
│       └── page.tsx     # Trang đọc bài
├── components/
│   └── Calendar.tsx     # Component lịch
├── lib/
│   └── posts.ts         # Logic đọc markdown
├── content/             # ← ĐẶT BÀI VIẾT VÀO ĐÂY
└── package.json
```

---

## Bước 1: Thêm bài viết để đăng

1. Copy file `.md` từ `_Publish/` của Obsidian vào thư mục `content/`
2. Đảm bảo file có properties:
   ```yaml
   ---
   title: "Tiêu đề bài viết"
   date: 2026-05-28
   status: published        ← BẮT BUỘC để hiển thị
   description: "Mô tả ngắn"
   ---
   ```
3. Chỉ file có `status: published` mới được hiển thị lên web

---

## Bước 2: Chạy thử trên máy

Mở Terminal (hoặc PowerShell), cd vào thư mục `my-garden`:

```bash
npm install
npm run dev
```

Mở trình duyệt vào `http://localhost:3000` để xem kết quả.

---

## Bước 3: Đẩy lên GitHub

### 3.1 Tạo repo GitHub

1. Vào [github.com](https://github.com) → **New repository**
2. Đặt tên: `my-garden` (hoặc tên bất kỳ)
3. Chọn **Private** (nếu không muốn lộ code) hoặc **Public**
4. **KHÔNG** tick "Add README" — để trống

### 3.2 Push code

Mở Terminal trong thư mục `my-garden`:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TÊN_BẠN/my-garden.git
git push -u origin main
```

> Thay `TÊN_BẠN` bằng username GitHub của bạn.

---

## Bước 4: Deploy lên Vercel

1. Vào [vercel.com](https://vercel.com) → **Sign up** bằng tài khoản GitHub
2. Click **Add New Project**
3. Chọn repo `my-garden` vừa tạo → **Import**
4. Vercel tự nhận diện Next.js, không cần cấu hình gì thêm
5. Click **Deploy** → Chờ ~2 phút

Sau khi deploy xong, Vercel cho bạn link dạng `https://my-garden-xxx.vercel.app`

---

## Bước 5: Thêm bài mới (workflow hàng ngày)

Mỗi khi muốn đăng bài mới:

1. Viết note trong Obsidian → lưu vào `_Publish/` với `status: published`
2. Copy file đó vào thư mục `content/` trong `my-garden`
3. Mở Terminal:
   ```bash
   git add .
   git commit -m "Thêm bài: Tên bài viết"
   git push
   ```
4. Vercel tự động deploy trong ~1 phút — web cập nhật ngay!

---

## Tùy chỉnh

- **Tên web**: Sửa `"Vườn Kiến Thức"` trong `app/layout.tsx` và `app/page.tsx`
- **Màu sắc**: Sửa trong `app/globals.css`
- **Số bài hiển thị**: Sửa `posts.slice(0, 10)` trong `app/page.tsx`

---

## Lưu ý bảo mật

- Thư mục `content/` chỉ chứa bài bạn muốn **công khai**
- Toàn bộ vault Obsidian (hệ thống riêng) **không bao giờ** được đẩy lên GitHub
- Người đọc chỉ thấy: danh sách bài + lịch + nội dung bài (không thấy properties)
