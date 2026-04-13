const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'database.json');

// Middleware
app.use(cors());
app.use(express.json());

// Hàm đọc dữ liệu từ file
function loadDB() {
    if (!fs.existsSync(DB_FILE)) {
        return { data: {}, logs: [] };
    }
    const raw = fs.readFileSync(DB_FILE);
    try {
        return JSON.parse(raw);
    } catch (e) {
        return { data: {}, logs: [] };
    }
}

// Hàm ghi dữ liệu vào file
function saveDB(db) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Lấy toàn bộ dữ liệu (Data & Logs)
app.get('/api/data', (req, res) => {
    const db = loadDB();
    res.json(db);
});

// 2. Thêm bài tập mới
app.post('/api/add', (req, res) => {
    const { member, entry } = req.body;
    if (!member || !entry) return res.status(400).json({ error: "Missing data" });

    const db = loadDB();
    if (!db.data[member]) db.data[member] = [];
    
    // Tạo ID và Thời gian
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2,5);
    const timestamp = new Date().toISOString();
    
    entry.id = id;
    entry.timestamp = timestamp;
    
    // Lưu bài tập
    db.data[member].push(entry);
    db.data[member].sort((a,b) => new Date(b.date) - new Date(a.date));
    
    // Lưu lịch sử hoạt động
    db.logs.unshift({
        timestamp,
        member,
        action: 'Thêm mới',
        details: `Thêm bài ${entry.exercise} (${entry.sets}x${entry.reps}x${entry.weight}kg)`
    });
    
    // Giơi hạn số lượng logs (giữ 100 log gần nhất cho nhẹ)
    if (db.logs.length > 100) db.logs = db.logs.slice(0, 100);

    saveDB(db);
    res.json({ success: true, id });
});

// 3. Xóa bài tập
app.post('/api/delete', (req, res) => {
    const { member, id } = req.body;
    const db = loadDB();
    
    if (!db.data[member]) return res.status(404).json({ error: "Member not found" });
    
    const entryToDel = db.data[member].find(e => e.id === id);
    if (!entryToDel) return res.status(404).json({ error: "Entry not found" });
    
    // Xóa
    db.data[member] = db.data[member].filter(e => e.id !== id);
    
    // Lưu lịch sử
    db.logs.unshift({
        timestamp: new Date().toISOString(),
        member,
        action: 'Xóa',
        details: `Xóa bài ${entryToDel.exercise}`
    });

    saveDB(db);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`🚀 FITNESS TRACKER BACKEND ĐANG CHẠY!`);
    console.log(`🌐 Máy chủ: http://localhost:${PORT}`);
    console.log(`📂 Lưu trữ tại: ${DB_FILE}`);
    console.log(`========================================\n`);
});
