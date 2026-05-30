# Đăng Bài Không Cần Mở Obsidian

Bạn hoàn toàn có thể viết và đăng bài mà không cần mở Obsidian.  
Chỉ cần một trình soạn thảo văn bản bình thường (Notepad, VS Code, Typora...).

---

## Cách 1 — Dùng Notepad (đơn giản nhất)

### Bước 1: Tạo file bài viết

1. Mở **Notepad** (gõ `notepad` vào Windows Search)
2. Viết nội dung theo mẫu dưới đây
3. **File → Save As** → đặt tên file, chọn **Save as type: All Files**, đuôi `.md`  
   Ví dụ: `bai-viet-moi.md`
4. Lưu vào thư mục `_Publish`

### Mẫu file bài viết:

```
---
title: Tiêu đề bài viết của bạn
date_created: 2026-06-01
status:
  - Online
topic: Wealth Building
description: Mô tả ngắn 1-2 câu về bài viết
---

Nội dung bài viết bắt đầu từ đây...

## Tiêu đề phần 1

Viết nội dung bình thường. Xuống dòng bình thường.

## Tiêu đề phần 2

- Bullet point 1
- Bullet point 2

**Chữ đậm** và *chữ nghiêng* dùng dấu sao.
```

> **Lưu ý encoding:** Khi Save As trong Notepad, chọn **UTF-8** ở ô Encoding để hiển thị đúng tiếng Việt.

---

## Cách 2 — Dùng VS Code (khuyến nghị, miễn phí)

VS Code hiển thị markdown preview đẹp, dễ viết hơn Notepad nhiều.

1. Tải tại: **https://code.visualstudio.com**
2. Mở thư mục `_Publish` → **File → Open Folder**
3. Tạo file mới `.md`, viết theo mẫu trên
4. Nhấn **Ctrl+Shift+V** để xem preview bài viết

---

## Đăng Bài Có Hình Ảnh (không dùng Obsidian)

### Bước 1: Chuẩn bị ảnh

- Đặt file ảnh vào thư mục:  
  `my-garden\public\images\`
- Tên file không dấu, không khoảng trắng  
  ✅ `anh-bai-viet.webp`  
  ❌ `ảnh bài viết.webp`

### Bước 2: Chèn ảnh vào bài viết

Trong file `.md`, dùng cú pháp markdown chuẩn:

```markdown
![Mô tả ảnh](/images/ten-file-anh.webp)
```

Ví dụ:

```markdown
## Hình minh họa

![Bãi cỏ xanh buổi sáng](/images/bai-co-sang.webp)

Đây là bức ảnh tôi chụp vào buổi sáng sớm...
```

### Bước 3: Đăng bài

Chạy `dang-bai.bat` như bình thường — script tự copy `.md` từ `_Publish` và ảnh từ `public/images` lên GitHub.

---

## Cú Pháp Markdown Cơ Bản

| Muốn viết | Cú pháp |
|-----------|---------|
| **Chữ đậm** | `**chữ đậm**` |
| *Chữ nghiêng* | `*chữ nghiêng*` |
| # Tiêu đề lớn | `# Tiêu đề` |
| ## Tiêu đề nhỏ | `## Tiêu đề` |
| - Danh sách | `- mục 1` |
| 1. Danh sách số | `1. mục 1` |
| > Trích dẫn | `> nội dung` |
| `code` | `` `code` `` |
| [Link](url) | `[tên](https://...)` |
| ![Ảnh](url) | `![mô tả](/images/file.webp)` |
| Đường kẻ ngang | `---` |

---

## Quy Trình Đầy Đủ (Không Cần Obsidian)

```
1. Mở Notepad hoặc VS Code
      ↓
2. Viết file .md theo mẫu trên
      ↓
3. Lưu vào _Publish/ (encoding UTF-8)
      ↓
4. Nếu có ảnh → copy ảnh vào my-garden/public/images/
      ↓
5. Double-click dang-bai.bat
      ↓
6. Nhấn Enter hoặc nhập tên commit
      ↓
✅ Bài xuất hiện trên web sau ~1 phút
```

---

## Lưu Ý Quan Trọng

- File `.md` phải có `status: - Online` mới hiển thị lên web
- Tên file ảnh **không dấu, không khoảng trắng** khi dùng cú pháp `![](/images/...)`
- Nếu dùng Obsidian thì `dang-bai.bat` tự xử lý ảnh — nhưng nếu không dùng Obsidian thì bạn phải tự copy ảnh vào `public/images/` như hướng dẫn trên
- `date_created` định dạng `YYYY-MM-DD` (năm-tháng-ngày)

---

*Cập nhật: 2026-05-30*
