# Hướng Dẫn Đầy Đủ: Đăng Bài Lên Web Gia Đình 222

> Dành cho người mới, từ bước đầu tiên đến khi bài viết xuất hiện trên web.

---

## PHẦN 1: CÀI ĐẶT GIT TRÊN MÁY TÍNH

### 1.1 Tải và cài Git

1. Mở trình duyệt, vào: **https://git-scm.com/download/win**
2. Tải phiên bản mới nhất (file `.exe`)
3. Chạy file `.exe` → nhấn **Next** liên tục → **Install**
4. Sau khi cài xong, **Restart máy tính** (hoặc đóng/mở lại PowerShell)

### 1.2 Kiểm tra Git đã cài thành công

Mở **PowerShell** (nhấn Windows + X → chọn Terminal/PowerShell), gõ:

```powershell
git --version
```

Nếu thấy `git version 2.x.x` là thành công.

### 1.3 Cấu hình tên và email Git (làm 1 lần duy nhất)

```powershell
git config --global user.name "Tên Của Bạn"
git config --global user.email "email@cua-ban.com"
```

---

## PHẦN 2: TẠO TÀI KHOẢN GITHUB VÀ REPO

### 2.1 Tạo tài khoản GitHub

1. Vào **https://github.com** → Sign up
2. Điền email, mật khẩu, username
3. Xác nhận email

### 2.2 Tạo Repository (kho lưu code)

1. Đăng nhập GitHub → nhấn nút **"+"** góc trên phải → **New repository**
2. Điền tên repo, ví dụ: `obsidian-garden`
3. Chọn **Public** (để Vercel đọc được miễn phí) hoặc **Private**
4. **KHÔNG tick** vào "Add a README file"
5. Nhấn **Create repository**

---

## PHẦN 3: THIẾT LẬP DỰ ÁN WEB LẦN ĐẦU

> Làm phần này **1 lần duy nhất** khi mới bắt đầu.

### 3.1 Mở PowerShell và cd vào thư mục my-garden

```powershell
cd "B:\OneDrive - Chonnam National University\3 Resources\Obsidian\Family Knowledge System\my-garden"
```

> Nếu ổ đĩa khác thì thay `B:` bằng ổ đĩa của bạn.

### 3.2 Cài thư viện Node.js (làm 1 lần)

```powershell
npm install
```

Chờ ~2 phút. Thấy chữ `added xxx packages` là xong.

### 3.3 Chạy thử trên máy (kiểm tra trước khi đăng)

```powershell
npm run dev
```

Mở trình duyệt vào `http://localhost:3000` để xem kết quả.
Nhấn **Ctrl+C** để dừng.

### 3.4 Khởi tạo Git và đẩy lên GitHub lần đầu

```powershell
git init
git add .
git commit -m "Khởi tạo dự án"
git branch -M main
git remote add origin https://github.com/TÊN_BẠN/obsidian-garden.git
git push -u origin main
```

> Thay `TÊN_BẠN` bằng username GitHub của bạn.
> Lần đầu Git sẽ mở trình duyệt để xác thực GitHub — đăng nhập và chấp nhận.

---

## PHẦN 4: THIẾT LẬP VERCEL (ĐĂNG WEB LẦN ĐẦU)

> Làm phần này **1 lần duy nhất**.

1. Vào **https://vercel.com** → nhấn **Sign Up**
2. Chọn **Continue with GitHub** → đăng nhập GitHub
3. Nhấn **Add New Project**
4. Tìm repo `obsidian-garden` → nhấn **Import**
5. Vercel tự nhận diện Next.js — **không cần cấu hình gì thêm**
6. Nhấn **Deploy**
7. Chờ ~2 phút → Vercel cho link dạng `https://obsidian-garden-xxx.vercel.app`

**Từ lần sau**, mỗi khi bạn `git push`, Vercel sẽ **tự động deploy** lại — không cần làm gì thêm.

---

## PHẦN 5: VIẾT BÀI TRONG OBSIDIAN

### 5.1 Cấu trúc Vault cần có

```
Obsidian Vault/
├── _Publish/          ← Folder bài viết sẽ được đăng
│   ├── Bài viết 1.md
│   └── Bài viết 2.md
└── my-garden/         ← Code website
    └── content/       ← Copy bài viết vào đây để đăng
```

### 5.2 Properties bắt buộc của mỗi bài viết

Mỗi file `.md` muốn hiển thị lên web **bắt buộc** phải có properties sau (phần nằm giữa `---`):

```yaml
---
title: Tiêu đề bài viết của bạn
date_created: 2026-05-30
last_updated: 2026-05-30
tags:
  - publish/ten-chu-de
topic: Wealth Building
status:
  - Online
description: Mô tả ngắn gọn về bài viết (1-2 câu)
lesson:
apply:
source:
url:
cover: ""
---

Nội dung bài viết bắt đầu từ đây...
```

### 5.3 Giải thích từng field

| Field | Bắt buộc? | Mô tả |
|-------|-----------|-------|
| `title` | ✅ | Tiêu đề hiển thị trên web |
| `date_created` | ✅ | Ngày tạo bài (dùng để sắp xếp và hiện trên lịch) |
| `status: Online` | ✅ | **Bắt buộc** để bài hiện lên web. Đổi thành `Offline` để ẩn |
| `topic` | Nên có | Chủ đề (xem danh sách bên dưới) |
| `description` | Nên có | Mô tả ngắn hiển thị trong danh sách bài |
| `tags` | Tùy chọn | Tags Obsidian nội bộ |

### 5.4 Danh sách topic hợp lệ

Nhập đúng tên (phân biệt hoa thường):

| Topic | Nhóm màu |
|-------|----------|
| `Personal Identity` | 🟣 Indigo |
| `Fitness & Nutrition` | 🟣 Indigo |
| `Mental Models` | 🔵 Blue |
| `High-Order Thinking` | 🔵 Blue |
| `Mindfulness` | 🟢 Teal |
| `Frameworks` | 🟢 Teal |
| `Network` | 🟠 Orange |
| `Projects` | 🟠 Orange |
| `Roadmap` | 🔴 Rose |
| `Wealth Building` | 🔴 Rose |

### 5.5 Cách thêm properties trong Obsidian

**Cách 1 — Dùng Properties panel** (Obsidian mới):
- Mở file → nhấn icon **Properties** (≡) góc trên phải
- Nhấn **Add property** → điền tên và giá trị

**Cách 2 — Viết thẳng vào file**:
- Dòng đầu tiên phải là `---`
- Điền properties
- Kết thúc bằng `---`
- Nội dung bài viết bắt đầu từ dòng sau

---

## PHẦN 6: QUY TRÌNH ĐĂNG BÀI MỚI (làm mỗi ngày)

### Cách nhanh — dùng file .bat (khuyến nghị)

1. Viết bài xong trong Obsidian, lưu vào `_Publish/`
2. Copy file `.md` vào `my-garden/content/`
3. Double-click file **`dang-bai.bat`** trong thư mục `my-garden/`
4. Nhập tên commit (hoặc nhấn Enter để dùng tên mặc định)
5. Chờ ~30 giây → **xong!** Web cập nhật sau ~1 phút

### Cách thủ công — dùng PowerShell

```powershell
# 1. Vào thư mục dự án
cd "B:\OneDrive - Chonnam National University\3 Resources\Obsidian\Family Knowledge System\my-garden"

# 2. Thêm toàn bộ thay đổi
git add .

# 3. Lưu với mô tả
git commit -m "Thêm bài: Tên bài viết của bạn"

# 4. Đẩy lên GitHub → Vercel tự deploy
git push
```

---

## PHẦN 7: CẬP NHẬT BÀI ĐÃ ĐĂNG

1. Sửa file trong `my-garden/content/` (hoặc copy file mới từ `_Publish/`)
2. Chạy `dang-bai.bat` hoặc:

```powershell
git add .
git commit -m "Cập nhật: Tên bài viết"
git push
```

---

## PHẦN 8: ẨN BÀI VIẾT KHỎI WEB

Trong file `.md`, đổi properties:

```yaml
status:
  - Offline
```

Rồi `git push` lại → bài sẽ biến khỏi web.

---

## PHẦN 9: XỬ LÝ LỖI THƯỜNG GẶP

### ❌ "fatal: not a git repository"
→ Chưa `git init`. Chạy lại từ Bước 3.4.

### ❌ "remote: Repository not found"
→ Sai URL. Chạy:
```powershell
git remote set-url origin https://github.com/TÊN_ĐÚNG/obsidian-garden.git
```

### ❌ Bài viết không hiện trên web
Kiểm tra:
- `status: Online` (phải là Online, không phải online hay Published)
- File đã được copy vào `content/` chưa?
- Đã `git push` chưa?
- Chờ Vercel deploy (~1 phút) rồi tải lại trang

### ❌ "npm: command not found"
→ Cài Node.js tại: **https://nodejs.org** → tải bản LTS → cài đặt → restart PowerShell

### ❌ Web báo lỗi sau khi deploy Vercel
→ Vào Vercel dashboard → chọn project → xem tab **Deployments** → xem **Build Logs** → copy lỗi và hỏi AI

---

## TÓM TẮT NHANH (sau khi đã cài đặt xong)

```
Viết bài Obsidian (_Publish/)
    ↓
Copy .md → my-garden/content/
    ↓
Double-click dang-bai.bat
    ↓
Vercel tự deploy (~1 phút)
    ↓
✅ Bài xuất hiện trên web!
```

---

*Cập nhật lần cuối: 2026-05-30*
