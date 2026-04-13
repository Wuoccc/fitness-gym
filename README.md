# 🏋️ Fitness Tracker - Ứng dụng theo dõi tập Gym

Một ứng dụng web hiện đại giúp theo dõi quá trình tập luyện gym cho hội viên. Theo dõi tạ, bài tập, volume, set, rep với giao diện đẹp mắt và dễ sử dụng.

## ✨ Tính năng

- 📊 **Dashboard tổng hợp**: Xem thống kê tiến độ tập luyện
- 🏋️ **Quản lý bài tập**: Thêm, xem, xóa các bài tập đã tập
- 👥 **Quản lý hội viên**: Theo dõi lịch sử tập theo từng thành viên
- 📈 **Biểu đồ tiến độ**: Trực quan hóa kết quả tập luyện
- 📝 **Activity Logs**: Lưu lại lịch sử hoạt động
- 📱 **Responsive Design**: Tương thích mọi thiết bị di động và desktop
- 🎨 **Giao diện hiện đại**: Dark theme với hiệu ứng gradient đẹp mắt

## 🛠️ Công nghệ sử dụng

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Chart.js - Thư viện biểu đồ
- Google Fonts (Inter)
- Responsive & Mobile-first design

### Backend (2 lựa chọn)

#### Option 1: Node.js Backend
- Express.js
- CORS
- File-based JSON storage

#### Option 2: Google Apps Script Backend
- Google Sheets làm database
- Serverless architecture
- Miễn phí hosting

## 📁 Cấu trúc dự án

```
fitness-tracker/
├── index.html              # Giao diện chính
├── style.css               # Stylesheet
├── script.js               # Frontend JavaScript logic
├── google-apps-script.js   # Google Apps Script backend code
├── backend/
│   ├── server.js           # Node.js Express server
│   └── package.json        # Node.js dependencies
└── README.md               # Tài liệu này
```

## 🚀 Cài đặt

### Phương án 1: Sử dụng Node.js Backend

#### Yêu cầu hệ thống
- Node.js (phiên bản 14.x trở lên)
- npm hoặc yarn

#### Các bước cài đặt

1. **Clone repository hoặc tải dự án về**

2. **Cài đặt dependencies cho backend**
   ```bash
   cd backend
   npm install
   ```

3. **Khởi động backend server**
   ```bash
   npm start
   ```

   Server sẽ chạy tại: `http://localhost:3000`

4. **Mở frontend**
   - Mở file `index.html` trong trình duyệt
   - Hoặc sử dụng live server extension (VS Code)
   - Hoặc chạy qua một static server bất kỳ

### Phương án 2: Sử dụng Google Apps Script Backend

#### Các bước cài đặt

1. **Tạo Google Sheet mới**
   - Truy cập [sheets.google.com](https://sheets.google.com)
   - Tạo sheet mới
   - Đặt tên sheet đầu tiên là: `Data`

2. **Tạo headers cho sheet Data** (hàng 1):
   ```
   Member | Date | WorkoutType | Exercise | Sets | Reps | Weight | Notes | ID | Timestamp
   ```

3. **Tạo sheet Logs** (tự động hoặc thủ công):
   - Headers: `Timestamp | Member | Action | Details`

4. **Setup Google Apps Script**
   - Vào menu: `Extensions` > `Apps Script`
   - Xóa code mặc định
   - Dán toàn bộ nội dung file `google-apps-script.js` vào
   - Lưu project (đặt tên: Fitness Tracker)

5. **Deploy Web App**
   - Click `Deploy` > `New deployment`
   - Chọn type: `Web app`
   - Configure:
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Click `Deploy`
   - Copy URL của Web App

6. **Cấu hình Frontend**
   - Mở file `script.js`
   - Tìm biến `GOOGLE_SCRIPT_URL`
   - Dán URL Web App vừa copy vào

7. **Mở frontend**
   - Mở file `index.html` trong trình duyệt

## 🔌 API Endpoints (Node.js Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/data` | Lấy toàn bộ dữ liệu (Data & Logs) |
| POST | `/api/add` | Thêm bài tập mới |
| POST | `/api/delete` | Xóa bài tập |

### Ví dụ request body

**Thêm bài tập:**
```json
{
  "member": "Nguyen Van A",
  "entry": {
    "date": "2024-01-15",
    "workoutType": "Push Day",
    "exercise": "Bench Press",
    "sets": 4,
    "reps": 10,
    "weight": 60,
    "notes": "Cảm thấy tốt"
  }
}
```

**Xóa bài tập:**
```json
{
  "member": "Nguyen Van A",
  "id": "abc123xyz"
}
```

## 📱 Sử dụng ứng dụng

1. **Chọn hội viên**: Nhập tên hội viên hoặc chọn từ danh sách
2. **Thêm bài tập**: Điền thông tin buổi tập (ngày, loại bài, sets, reps, weight)
3. **Xem lịch sử**: Tất cả bài tập được lưu và hiển thị theo thứ tự thời gian
4. **Theo dõi tiến độ**: Xem biểu đồ phát triển sức mạnh theo thời gian
5. **Quản lý logs**: Kiểm tra lịch sử hoạt động (thêm/xóa bài tập)

## 🎨 Customization

### Đổi màu sắc
Chỉnh sửa các biến CSS trong `style.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #6C63FF, #E040FB);
  --bg-dark: #07071a;
  /* ... */
}
```

### Đổi port backend
Sửa `PORT` trong `backend/server.js`:
```javascript
const PORT = 3000; // Đổi sang port mong muốn
```

## 🔧 Troubleshooting

### Backend không khởi động
- Kiểm tra Node.js version: `node --version`
- Cài lại dependencies: `npm install`
- Kiểm tra port có đang bị chiếm dụng không

### Không kết nối được Google Sheets
- Kiểm tra URL Web App đã đúng chưa
- Đảm bảo quyền truy cập: "Anyone"
- Kiểm tra sheet name chính xác (case-sensitive)

### Dữ liệu không hiển thị
- Kiểm tra console log trong browser (F12)
- Đảm bảo backend đang chạy
- Kiểm tra CORS settings

## 📄 License

Dự án mã nguồn mở, tự do sử dụng và chỉnh sửa.

## 👤 Tác giả

Fitness Tracker - Ứng dụng theo dõi tập luyện cá nhân

## 🙏 Cảm ơn

Cảm ơn bạn đã sử dụng ứng dụng! Mọi góp ý xin gửi về issue hoặc pull request.

---

**Chúc bạn có những buổi tập hiệu quả! 💪🏋️♂️**
