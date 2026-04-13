/* =============================================
   FITNESS TRACKER — Full App Logic v6
   + Firebase Cloud Firestore (REALTIME SYNC)
   ============================================= */

// IMPORT FIREBASE MODULES
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// ⚠️ COPY VÀ DÁN ĐOẠN FIREBASE_CONFIG CỦA BẠN VÀO ĐÂY:
const firebaseConfig = {
  apiKey: "AIzaSyCmvWnJBRVPkZDH7ya7YnGmIA4yJepgog0",
  authDomain: "fitness-gym2026.firebaseapp.com",
  projectId: "fitness-gym2026",
  storageBucket: "fitness-gym2026.firebasestorage.app",
  messagingSenderId: "320726829445",
  appId: "1:320726829445:web:320573c5c04aaff9fb1cec",
  measurementId: "G-GE007JH64D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const WORKOUTS_COL = collection(db, 'workouts');
const LOGS_COL = collection(db, 'logs');

// Image base URL from free-exercise-db

const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

// ============================================================
// EXERCISE DATABASE — with real images
// ============================================================
const EXERCISES = {
    1: [
        { id:'bp', name:'Bench Press', vi:'Đẩy tạ nằm ngang', icon:'🏋️', muscles:['Ngực giữa','Vai trước','Tay sau'], anim:'push', equip:'Tạ đòn + Ghế phẳng', diff:'Trung bình', desc:'Nằm ngửa trên ghế phẳng, nắm thanh tạ rộng hơn vai, hạ tạ xuống ngực rồi đẩy lên.', gradient:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', imgFolder:'Barbell_Bench_Press_-_Medium_Grip' },
        { id:'ibp', name:'Incline Bench Press', vi:'Đẩy tạ nghiêng', icon:'🏋️', muscles:['Ngực trên','Vai trước'], anim:'push', equip:'Tạ đòn + Ghế nghiêng', diff:'Trung bình', desc:'Ghế nghiêng 30-45°, đẩy tạ lên theo đường thẳng từ ngực trên.', gradient:'linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)', imgFolder:'Barbell_Incline_Bench_Press_-_Medium_Grip' },
        { id:'dbf', name:'Dumbbell Fly', vi:'Bay tạ ngực', icon:'🦅', muscles:['Ngực giữa','Ngực trong'], anim:'raise', equip:'Tạ tay', diff:'Dễ', desc:'Nằm ghế phẳng, hai tay cầm tạ mở rộng ra rồi khép lại như ôm.', gradient:'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', imgFolder:'Dumbbell_Flyes' },
        { id:'cc', name:'Cable Crossover', vi:'Kéo cáp ngực', icon:'🔄', muscles:['Ngực dưới','Ngực trong'], anim:'pull', equip:'Máy cáp đôi', diff:'Dễ', desc:'Đứng giữa hai cáp, kéo tay về phía trước và xuống dưới.', gradient:'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', imgFolder:'Cable_Crossover' },
        { id:'pu', name:'Push Up', vi:'Chống đẩy', icon:'💪', muscles:['Ngực','Vai trước','Tay sau'], anim:'push', equip:'Không cần', diff:'Dễ', desc:'Chống tay xuống sàn, hạ người xuống rồi đẩy lên. Giữ lưng thẳng.', gradient:'linear-gradient(135deg, #2af598 0%, #009efd 100%)', imgFolder:'Pushups' },
        { id:'cpm', name:'Chest Press Machine', vi:'Đẩy ngực máy', icon:'🤖', muscles:['Ngực giữa','Tay sau'], anim:'push', equip:'Máy đẩy ngực', diff:'Dễ', desc:'Ngồi trên máy, đẩy tay về phía trước. Phù hợp người mới.', gradient:'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)', imgFolder:'Machine_Bench_Press' },
        { id:'ohp', name:'Overhead Press', vi:'Đẩy vai qua đầu', icon:'🙆', muscles:['Vai trước','Vai giữa','Tay sau'], anim:'push', equip:'Tạ đòn / Tạ tay', diff:'Khó', desc:'Đứng hoặc ngồi, đẩy tạ từ vai lên qua đầu.', gradient:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', imgFolder:'Standing_Military_Press' },
        { id:'lr', name:'Lateral Raise', vi:'Nâng tạ ngang vai', icon:'🙌', muscles:['Vai giữa'], anim:'raise', equip:'Tạ tay', diff:'Dễ', desc:'Đứng thẳng, hai tay cầm tạ nâng ngang ra hai bên ngang vai.', gradient:'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', imgFolder:'Side_Lateral_Raise' },
        { id:'fr', name:'Front Raise', vi:'Nâng tạ trước', icon:'🤲', muscles:['Vai trước'], anim:'raise', equip:'Tạ tay / Đĩa tạ', diff:'Dễ', desc:'Đứng thẳng, nâng tạ ra phía trước lên ngang mắt.', gradient:'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', imgFolder:'Front_Dumbbell_Raise' },
        { id:'tpd', name:'Tricep Pushdown', vi:'Đẩy tay sau cáp', icon:'💪', muscles:['Tay sau'], anim:'push', equip:'Máy cáp', diff:'Dễ', desc:'Đứng trước máy cáp, đẩy tay xuống dưới giữ khuỷu tay sát người.', gradient:'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', imgFolder:'Triceps_Pushdown' },
        { id:'sc', name:'Skull Crusher', vi:'Nghiền sọ', icon:'💀', muscles:['Tay sau'], anim:'curl', equip:'Tạ đòn EZ / Tạ tay', diff:'Trung bình', desc:'Nằm ghế, hạ tạ xuống gần trán rồi duỗi tay lên.', gradient:'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)', imgFolder:'Lying_Triceps_Press' },
        { id:'dips', name:'Tricep Dips', vi:'Dips tay sau', icon:'🤸', muscles:['Tay sau','Ngực dưới','Vai trước'], anim:'squat', equip:'Xà kép / Ghế', diff:'Khó', desc:'Chống hai tay trên xà kép, hạ người xuống rồi đẩy lên.', gradient:'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', imgFolder:'Dips_-_Triceps_Version' },
        { id:'sdm', name:'Seated Dip Machine', vi:'Máy dip ngồi', icon:'🪑', muscles:['Tay sau','Ngực dưới'], anim:'push', equip:'Máy Dip', diff:'Dễ', desc:'Ngồi trên máy, nắm tay cầm và đẩy xuống bằng lực cơ tay sau.', gradient:'linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)', imgFolder:'Dip_Machine' },
        { id:'rdf', name:'Fly – Rear Delt', vi:'Ép vai sau (Máy)', icon:'🦋', muscles:['Vai sau','Lưng trên'], anim:'pull', equip:'Máy Fly/Rear Delt', diff:'Dễ', desc:'Ngồi úp mặt vào máy, kéo hai tay ra phía sau. Tập trung vào vai sau.', gradient:'linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)', imgFolder:'Reverse_Machine_Flyes' }
    ],
    2: [
        { id:'dl', name:'Deadlift', vi:'Nâng tạ chết', icon:'🏋️', muscles:['Lưng dưới','Đùi sau','Mông'], anim:'squat', equip:'Tạ đòn', diff:'Khó', desc:'Đứng trước tạ, gập hông và đầu gối nâng tạ lên. Giữ lưng thẳng.', gradient:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', imgFolder:'Barbell_Deadlift' },
        { id:'br', name:'Barbell Row', vi:'Chèo tạ đòn', icon:'🚣', muscles:['Lưng giữa','Lưng trên','Tay trước'], anim:'pull', equip:'Tạ đòn', diff:'Trung bình', desc:'Gập người về phía trước, kéo tạ đòn lên bụng dưới.', gradient:'linear-gradient(135deg, #0acffe 0%, #495aff 100%)', imgFolder:'Bent_Over_Barbell_Row' },
        { id:'lpd', name:'Lat Pulldown', vi:'Kéo xà trước', icon:'⬇️', muscles:['Lưng rộng','Tay trước'], anim:'pull', equip:'Máy kéo xà', diff:'Dễ', desc:'Ngồi trên máy, kéo thanh xà xuống trước ngực.', gradient:'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', imgFolder:'Wide-Grip_Lat_Pulldown' },
        { id:'scr', name:'Seated Cable Row', vi:'Chèo cáp ngồi', icon:'🚣', muscles:['Lưng giữa','Lưng dưới'], anim:'pull', equip:'Máy cáp', diff:'Dễ', desc:'Ngồi trên máy, kéo tay cầm về phía bụng, ép xương bả vai.', gradient:'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', imgFolder:'Seated_Cable_Rows' },
        { id:'pullup', name:'Pull Up', vi:'Kéo xà đơn', icon:'🏗️', muscles:['Lưng rộng','Tay trước','Vai sau'], anim:'pull', equip:'Xà đơn', diff:'Khó', desc:'Treo trên xà, kéo người lên cho đến khi cằm qua xà.', gradient:'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', imgFolder:'Pullups' },
        { id:'tbr', name:'T-Bar Row', vi:'Chèo T-Bar', icon:'🔧', muscles:['Lưng giữa','Lưng dưới'], anim:'pull', equip:'T-Bar / Tạ đòn', diff:'Trung bình', desc:'Gập người, kéo thanh T-Bar lên bụng.', gradient:'linear-gradient(135deg, #f5576c 0%, #ff6a88 100%)', imgFolder:'Bent_Over_Two-Arm_Long_Bar_Row' },
        { id:'dbr', name:'Dumbbell Row', vi:'Chèo tạ tay', icon:'💪', muscles:['Lưng rộng','Lưng giữa'], anim:'pull', equip:'Tạ tay + Ghế', diff:'Dễ', desc:'Một tay chống ghế, tay kia kéo tạ lên ngang hông.', gradient:'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)', imgFolder:'One-Arm_Dumbbell_Row' },
        { id:'bcurl', name:'Barbell Curl', vi:'Cuốn tạ đòn', icon:'💪', muscles:['Tay trước'], anim:'curl', equip:'Tạ đòn / EZ bar', diff:'Dễ', desc:'Đứng thẳng, cuốn tạ lên bằng cơ tay trước.', gradient:'linear-gradient(135deg, #6C63FF 0%, #00BCD4 100%)', imgFolder:'Barbell_Curl' },
        { id:'dcurl', name:'Dumbbell Curl', vi:'Cuốn tạ tay', icon:'💪', muscles:['Tay trước'], anim:'curl', equip:'Tạ tay', diff:'Dễ', desc:'Đứng hoặc ngồi, cuốn tạ tay lên vai.', gradient:'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)', imgFolder:'Dumbbell_Bicep_Curl' },
        { id:'hcurl', name:'Hammer Curl', vi:'Cuốn búa', icon:'🔨', muscles:['Tay trước','Cẳng tay'], anim:'curl', equip:'Tạ tay', diff:'Dễ', desc:'Giống Dumbbell Curl nhưng lòng bàn tay hướng vào trong.', gradient:'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', imgFolder:'Alternate_Hammer_Curl' },
        { id:'pcurl', name:'Preacher Curl', vi:'Cuốn ghế Scott', icon:'📖', muscles:['Tay trước'], anim:'curl', equip:'Ghế Scott + Tạ', diff:'Trung bình', desc:'Kê tay lên ghế Scott, cuốn tạ lên. Cô lập tay trước.', gradient:'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', imgFolder:'Preacher_Curl' },
        { id:'wcurl', name:'Wrist Curl', vi:'Cuốn cổ tay', icon:'✊', muscles:['Cẳng tay'], anim:'curl', equip:'Tạ tay / Tạ đòn', diff:'Dễ', desc:'Ngồi, cẳng tay đặt trên đùi, cuốn cổ tay lên xuống.', gradient:'linear-gradient(135deg, #2af598 0%, #009efd 100%)', imgFolder:'Palms-Down_Wrist_Curl_Over_A_Bench' },
        { id:'vrow', name:'Vertical Row', vi:'Kéo dọc (Máy)', icon:'⬆️', muscles:['Lưng giữa','Tay trước'], anim:'pull', equip:'Máy Vertical Row', diff:'Dễ', desc:'Ngồi trên máy, kéo tay cầm xuống bằng lực cơ lưng và tay trước.', gradient:'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', imgFolder:'Leverage_High_Row' }
    ],
    3: [
        { id:'squat', name:'Squat', vi:'Gánh tạ', icon:'🏋️', muscles:['Đùi trước','Mông','Đùi sau'], anim:'squat', equip:'Tạ đòn + Rack', diff:'Khó', desc:'Đặt tạ trên vai, ngồi xuống cho đến khi đùi song song sàn.', gradient:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', imgFolder:'Barbell_Squat' },
        { id:'lp', name:'Leg Press', vi:'Đạp chân máy', icon:'🦶', muscles:['Đùi trước','Mông'], anim:'push', equip:'Máy Leg Press', diff:'Dễ', desc:'Ngồi trên máy, đạp bàn tạ ra xa rồi thu về.', gradient:'linear-gradient(135deg, #0acffe 0%, #495aff 100%)', imgFolder:'Leg_Press' },
        { id:'le', name:'Leg Extension', vi:'Duỗi chân', icon:'🦵', muscles:['Đùi trước'], anim:'raise', equip:'Máy Leg Extension', diff:'Dễ', desc:'Ngồi trên máy, duỗi thẳng chân ra phía trước.', gradient:'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', imgFolder:'Leg_Extensions' },
        { id:'lc', name:'Leg Curl', vi:'Co chân', icon:'🦵', muscles:['Đùi sau'], anim:'curl', equip:'Máy Leg Curl', diff:'Dễ', desc:'Nằm sấp trên máy, co chân lại về phía mông.', gradient:'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', imgFolder:'Lying_Leg_Curls' },
        { id:'rdl', name:'Romanian Deadlift', vi:'RDL', icon:'🏋️', muscles:['Đùi sau','Mông','Lưng dưới'], anim:'squat', equip:'Tạ đòn / Tạ tay', diff:'Trung bình', desc:'Giữ tạ trước người, gập hông đẩy mông ra sau.', gradient:'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', imgFolder:'Romanian_Deadlift' },
        { id:'lunge', name:'Lunges', vi:'Bước lunge', icon:'🚶', muscles:['Đùi trước','Mông','Đùi sau'], anim:'squat', equip:'Tạ tay / Tạ đòn', diff:'Trung bình', desc:'Bước chân ra trước, hạ người xuống.', gradient:'linear-gradient(135deg, #f5576c 0%, #ff6a88 100%)', imgFolder:'Dumbbell_Lunges' },
        { id:'cr', name:'Calf Raise', vi:'Nâng bắp chân', icon:'🦶', muscles:['Bắp chân'], anim:'push', equip:'Máy / Tạ', diff:'Dễ', desc:'Đứng trên bục, kiễng chân lên cao rồi hạ xuống.', gradient:'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)', imgFolder:'Standing_Calf_Raises' },
        { id:'ht', name:'Hip Thrust', vi:'Đẩy hông', icon:'🍑', muscles:['Mông','Đùi sau'], anim:'push', equip:'Tạ đòn + Ghế', diff:'Trung bình', desc:'Lưng tựa ghế, tạ ở hông, đẩy hông lên cao.', gradient:'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', imgFolder:'Barbell_Hip_Thrust' },
        { id:'bss', name:'Bulgarian Split Squat', vi:'Squat Bulgaria', icon:'🏋️', muscles:['Đùi trước','Mông'], anim:'squat', equip:'Tạ tay + Ghế', diff:'Khó', desc:'Một chân đặt lên ghế phía sau, chân trước squat xuống.', gradient:'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', imgFolder:'Single_Leg_Squat' },
        { id:'crunch', name:'Crunch', vi:'Gập bụng', icon:'🔥', muscles:['Bụng trên'], anim:'curl', equip:'Không cần', diff:'Dễ', desc:'Nằm ngửa, gập phần trên cơ thể lên.', gradient:'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)', imgFolder:'Crunches' },
        { id:'plank', name:'Plank', vi:'Plank', icon:'🧘', muscles:['Bụng','Core'], anim:'hold', equip:'Không cần', diff:'Dễ', desc:'Chống khuỷu tay và mũi chân, giữ cơ thể thẳng.', gradient:'linear-gradient(135deg, #2af598 0%, #009efd 100%)', imgFolder:'Plank' },
        { id:'hlr', name:'Hanging Leg Raise', vi:'Nâng chân treo', icon:'🤸', muscles:['Bụng dưới','Core'], anim:'raise', equip:'Xà đơn', diff:'Khó', desc:'Treo trên xà, nâng hai chân thẳng lên.', gradient:'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', imgFolder:'Hanging_Leg_Raise' },
        { id:'iot', name:'Inner/Outer Thigh', vi:'Khép/Mở đùi (Máy)', icon:'🦵', muscles:['Đùi trong','Đùi ngoài'], anim:'raise', equip:'Máy khép/mở đùi', diff:'Dễ', desc:'Ngồi trên máy, khép hoặc mở hai đùi với tạ để tập cơ đùi trong/ngoài.', gradient:'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', imgFolder:'Thigh_Adductor' }
    ]
};

const WORKOUT_TYPES = {
    1: { name:'Ngực - Vai - Tay sau', short:'Bài 1' },
    2: { name:'Lưng - Tay trước - Cẳng', short:'Bài 2' },
    3: { name:'Chân - Bụng', short:'Bài 3' }
};

const MUSCLE_FILTERS = {
    all:      { label:'Tất cả',    keywords:null,                      color:'#6C63FF' },
    chest:    { label:'Ngực',      keywords:['Ngực'],                  color:'#E040FB' },
    shoulder: { label:'Vai',       keywords:['Vai'],                   color:'#FF9800' },
    tricep:   { label:'Tay sau',   keywords:['Tay sau'],               color:'#FF5252' },
    back:     { label:'Lưng',      keywords:['Lưng'],                  color:'#00BCD4' },
    bicep:    { label:'Tay trước', keywords:['Tay trước'],             color:'#4CAF50' },
    forearm:  { label:'Cẳng',      keywords:['Cẳng'],                  color:'#9C27B0' },
    legs:     { label:'Chân',      keywords:['Đùi','Bắp chân','Mông','Đùi trong','Đùi ngoài'],color:'#2196F3' },
    abs:      { label:'Bụng',      keywords:['Bụng','Core'],           color:'#FFC107' }
};

const MEMBERS = ['Quốc','Hiếu','Bảo','An','Madsen'];
const MEMBER_COLORS = { 'Quốc':'#6C63FF','Hiếu':'#E040FB','Bảo':'#00BCD4','An':'#FF9800','Madsen':'#FF5252' };
const DAYS_VI = ['T2','T3','T4','T5','T6','T7','CN'];

const ALL_EXERCISES = [];
for (const type of [1,2,3]) EXERCISES[type].forEach(ex => ALL_EXERCISES.push({ ...ex, workoutType: type }));

// ============================================================
// STATE
// ============================================================
let state = {
    currentPage: 'dashboard',
    currentMember: 'Quốc',
    muscleFilter: 'all',
    selectedExercises: [],
    weekOffset: 0,
    charts: {},
    cloudData: null,       // cached cloud data
    cloudLogs: [],         // cached cloud logs
    isOnline: false,       // true if Google Sheets is configured
    syncing: false,
    syncInterval: null,    // auto-sync polling interval
    lastSyncTime: null     // timestamp of last successful sync
};

// Auto-sync interval (milliseconds) — mỗi 30 giây
const AUTO_SYNC_INTERVAL = 30000;

// ============================================================
// DATA LAYER — Hybrid: Cloud first, localStorage fallback
// ============================================================
const STORAGE_KEY = 'fitness_tracker_data';
const LOGS_STORAGE_KEY = 'fitness_tracker_logs';

function loadDataLocal() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { const d={}; MEMBERS.forEach(m=>d[m]=[]); saveDataLocal(d); return d; }
    return JSON.parse(raw);
}
function saveDataLocal(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

function loadLogsLocal() {
    const raw = localStorage.getItem(LOGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}
function saveLogsLocal(logs) { localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs)); }

// ============================================================
// FIREBASE CLOUD OPERATIONS & SYNC
// ============================================================
function isFirebaseConfigured() {
    return firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY_HERE";
}

function initFirebaseSync() {
    showSyncStatus('🔄 Đang kích hoạt Live Sync...');
    
    // Lắng nghe dữ liệu tập luyện (Workouts)
    const qWorkouts = query(WORKOUTS_COL, orderBy('timestamp', 'desc'));
    onSnapshot(qWorkouts, (snapshot) => {
        const newData = {};
        MEMBERS.forEach(m => newData[m] = []); // Reset groups
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id; // Gắn ID thật từ Firebase
            
            // Xử lý Timestamp Firebase sang Local
            let ts = data.timestamp;
            if (ts && typeof ts.toDate === 'function') ts = ts.toDate();
            // date fallback support for local
            
            if (!newData[data.member]) newData[data.member] = [];
            newData[data.member].push(data);
        });
        
        // Sort
        for(let m in newData) newData[m].sort((a,b) => new Date(b.date) - new Date(a.date));

        state.cloudData = newData;
        saveDataLocal(newData);
        
        // Sync Logs
        const qLogs = query(LOGS_COL, orderBy('timestamp', 'desc'));
        onSnapshot(qLogs, (logSnap) => {
            const logs = [];
            logSnap.forEach(d => {
                const l = d.data();
                l.timestamp = (l.timestamp && l.timestamp.toDate) ? l.timestamp.toDate().toISOString() : new Date().toISOString();
                logs.push(l);
            });
            state.cloudLogs = logs;
            saveLogsLocal(logs);

            state.isOnline = true;
            const t = new Date();
            showSyncStatus(`⚡ Live (${t.getHours()}:${t.getMinutes().toString().padStart(2,'0')})`);
            refreshCurrentPage();
        });
    }, (error) => {
        console.warn('Lỗi Firestore:', error);
        showSyncStatus('⚠️ Lỗi Kết Nối');
        state.isOnline = false;
    });
}

// Refresh whatever page the user is currently viewing
function refreshCurrentPage() {
    if (state.currentPage === 'dashboard') refreshDashboard();
    else if (state.currentPage === 'log') refreshLog();
}

function showSyncStatus(msg) {
    const el = document.getElementById('sync-status');
    if (el) el.textContent = msg;
}

function loadData() {
    if (state.cloudData) return state.cloudData;
    return loadDataLocal();
}
function getMemberEntries(member) { return loadData()[member] || []; }

async function addEntry(member, entry) {
    if (isFirebaseConfigured()) {
        try {
            entry.member = member;
            entry.timestamp = serverTimestamp();
            await addDoc(WORKOUTS_COL, entry);
            
            await addDoc(LOGS_COL, {
                member: member,
                action: 'Thêm mới',
                details: `Thêm bài ${entry.exercise} (${entry.sets}x${entry.reps})`,
                timestamp: serverTimestamp()
            });
        } catch(e) {
            console.error('Firebase save error:', e);
            showToast('Lỗi lưu Firebase! (Kiểm tra lại rule / config)', 'error');
        }
    } else {
        // Fallback local localStorage
        const data = loadDataLocal();
        if (!data[member]) data[member] = [];
        entry.id = Date.now().toString(36) + Math.random().toString(36).substr(2,5);
        data[member].push(entry);
        data[member].sort((a,b) => new Date(b.date)-new Date(a.date));
        saveDataLocal(data);
        if (state.cloudData) { state.cloudData = data; }

        const logs = loadLogsLocal();
        logs.unshift({ timestamp: new Date().toISOString(), member, action: 'Thêm mới', details: `Thêm bài ${entry.exercise}` });
        saveLogsLocal(logs);
        if (state.cloudData) state.cloudLogs = logs;
        refreshCurrentPage();
    }
}

async function deleteEntry(member, id) {
    if (isFirebaseConfigured()) {
        try {
            let exName = 'Bài tập';
            if (state.cloudData && state.cloudData[member]) {
               const found = state.cloudData[member].find(x => x.id === id);
               if (found) exName = found.exercise;
            }

            await deleteDoc(doc(db, 'workouts', id));
            await addDoc(LOGS_COL, {
                member: member,
                action: 'Xóa',
                details: `Xóa bài ${exName}`,
                timestamp: serverTimestamp()
            });
        } catch(e) { console.error('Firebase del error', e); showToast('Xóa thất bại', 'error'); }
    } else {
        const data = loadDataLocal();
        if (!data[member]) return;
        const entryToDel = data[member].find(e => e.id === id);
        data[member] = data[member].filter(e => e.id !== id);
        saveDataLocal(data);
        if (state.cloudData) { state.cloudData = data; }

        if (entryToDel) {
            const logs = loadLogsLocal();
            logs.unshift({ timestamp: new Date().toISOString(), member, action: 'Xóa', details: `Xóa bài ${entryToDel.exercise}` });
            saveLogsLocal(logs);
            if (state.cloudData) state.cloudLogs = logs;
        }
        refreshCurrentPage();
    }
}

// ============================================================
// UTILITIES
// ============================================================
function fmtDate(d) { return new Date(d).toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'}); }
function fmtNum(n) { return new Intl.NumberFormat('vi-VN').format(n); }
function dateToStr(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function todayStr() { return dateToStr(new Date()); }

function showToast(msg, type='success') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icons = { success:'✅', error:'❌', info:'ℹ️' };
    t.innerHTML = `<span>${icons[type]||'✅'}</span><span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 350); }, 3000);
}
function confirmDialog(title, msg) {
    return new Promise(resolve => {
        const ov = document.getElementById('dialog-overlay');
        document.getElementById('dialog-title').textContent = title;
        document.getElementById('dialog-message').textContent = msg;
        ov.style.display = 'flex';
        const cleanup = () => { ov.style.display='none'; };
        document.getElementById('dialog-confirm').onclick = () => { cleanup(); resolve(true); };
        document.getElementById('dialog-cancel').onclick = () => { cleanup(); resolve(false); };
        ov.onclick = e => { if(e.target===ov){cleanup();resolve(false);} };
    });
}
function getWeekDates(offset=0) {
    const now = new Date(); const day = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (day===0?6:day-1) + offset*7);
    monday.setHours(0,0,0,0);
    return Array.from({length:7}, (_,i) => { const d=new Date(monday); d.setDate(monday.getDate()+i); return d; });
}
function exerciseMatchesFilter(ex, group) {
    if (group==='all') return true;
    const f = MUSCLE_FILTERS[group];
    return f && f.keywords && ex.muscles.some(m => f.keywords.some(kw => m.includes(kw)));
}
function getPrimaryMuscleGroup(ex) {
    const pm = ex.muscles[0];
    for (const [key,f] of Object.entries(MUSCLE_FILTERS)) {
        if (key==='all') continue;
        if (f.keywords && f.keywords.some(kw => pm.includes(kw))) return key;
    }
    return 'chest';
}
function findExerciseByName(name) { return ALL_EXERCISES.find(e => e.name===name) || null; }

// Build image URLs (2 poses)
function getExerciseImages(ex) {
    if (!ex.imgFolder) return { img0: null, img1: null };
    return {
        img0: `${IMG_BASE}/${ex.imgFolder}/0.jpg`,
        img1: `${IMG_BASE}/${ex.imgFolder}/1.jpg`
    };
}

// ============================================================
// PAGE NAVIGATION
// ============================================================
function navigateTo(page) {
    state.currentPage = page;
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.page===page));
    document.querySelectorAll('.page').forEach(p => { p.classList.remove('active'); if(p.id===`page-${page}`) p.classList.add('active'); });
    const selBar = document.getElementById('selection-bar');
    if (page==='exercises') { if(state.selectedExercises.length>0) selBar.classList.add('show'); } else { selBar.classList.remove('show'); }
    if (page==='dashboard') refreshDashboard();
    if (page==='exercises') renderExercises();
    if (page==='log') refreshLog();
}

// ============================================================
// PAGE 1: DASHBOARD
// ============================================================
function refreshDashboard() { renderAttendance(); updateDashboardStats(); updateDashboardCharts(); renderDashboardHistory(); renderActivityLogs(); }

function renderActivityLogs() {
    const feed = document.getElementById('activity-log-feed');
    if (!feed) return;
    let logs = state.cloudLogs;
    if (!logs || !logs.length) logs = loadLogsLocal();
    if (!logs || !logs.length) {
        feed.innerHTML = '<div class="empty-state show"><div class="empty-icon">📭</div><p>Chưa có hoạt động nào</p></div>';
        return;
    }
    
    // Take top 30 logs
    feed.innerHTML = logs.slice(0, 30).map(log => {
        const d = new Date(log.timestamp);
        const timeStr = isNaN(d) ? log.timestamp : d.toLocaleTimeString('vi-VN', {hour:'2-digit',minute:'2-digit', day:'2-digit', month:'2-digit'});
        
        let initial = log.member ? log.member.charAt(0).toUpperCase() : '?';
        let bg = MEMBER_COLORS[log.member] || '#6C63FF';
        let actionClass = log.action === 'Xóa' ? 'log-del' : 'log-add';
        
        return `<div class="log-item ${actionClass}">
            <div class="log-avatar" style="background:${bg}">${initial}</div>
            <div class="log-content">
                <header>
                    <strong>${log.member}</strong>
                    <span class="log-action">${log.action}</span>
                    <span class="log-time">${timeStr}</span>
                </header>
                <div class="log-detail">${log.details}</div>
            </div>
        </div>`;
    }).join('');
}

function renderAttendance() {
    const dates = getWeekDates(state.weekOffset); const data = loadData(); const today = dateToStr(new Date());
    const grid = document.getElementById('attendance-grid');
    const s=dates[0], e=dates[6];
    document.getElementById('week-label').textContent = `${s.getDate()}/${s.getMonth()+1} — ${e.getDate()}/${e.getMonth()+1}/${e.getFullYear()}`;
    let html = '<div class="att-cell att-header"></div>';
    dates.forEach((d,i) => { const it=dateToStr(d)===today; html += `<div class="att-cell att-header ${it?'att-today':''}">${DAYS_VI[i]}<br><small>${d.getDate()}/${d.getMonth()+1}</small></div>`; });
    MEMBERS.forEach(member => {
        html += `<div class="att-cell att-name"><span class="pill-dot" style="--dot:${MEMBER_COLORS[member]}"></span>${member}</div>`;
        const entries = data[member]||[]; const loggedDates = new Set(entries.map(x => x.date));
        dates.forEach(d => {
            const ds=dateToStr(d), it=ds===today, isFuture=d>new Date();
            if (isFuture) html += `<div class="att-cell ${it?'att-today':''}" style="color:var(--text-3)">—</div>`;
            else if (loggedDates.has(ds)) html += `<div class="att-cell att-check ${it?'att-today':''}">✅</div>`;
            else html += `<div class="att-cell att-cross ${it?'att-today':''}">❌</div>`;
        });
    });
    grid.innerHTML = html;
}

function updateDashboardStats() {
    const entries = getMemberEntries(state.currentMember);
    document.getElementById('d-total-sessions').textContent = new Set(entries.map(e=>e.date)).size;
    document.getElementById('d-total-volume').textContent = fmtNum(Math.round(entries.reduce((s,e)=>s+e.sets*e.reps*e.weight,0)));
    document.getElementById('d-total-sets').textContent = fmtNum(entries.reduce((s,e)=>s+e.sets,0));
    document.getElementById('d-max-weight').textContent = fmtNum(entries.length?Math.max(...entries.map(e=>e.weight)):0);
    document.getElementById('d-member-badge').textContent = state.currentMember;
}

function updateDashboardCharts() {
    const filter = document.getElementById('chart-filter').value;
    let entries = getMemberEntries(state.currentMember);
    if (filter!=='all') entries = entries.filter(e=>String(e.workoutType)===filter);
    const map = {};
    entries.forEach(e => { if(!map[e.date]) map[e.date]={vol:0,maxW:0,sets:0,reps:0}; map[e.date].vol+=e.sets*e.reps*e.weight; map[e.date].maxW=Math.max(map[e.date].maxW,e.weight); map[e.date].sets+=e.sets; map[e.date].reps+=e.sets*e.reps; });
    const dates=Object.keys(map).sort(), labels=dates.map(fmtDate);
    Object.values(state.charts).forEach(c=>c.destroy()); state.charts={};
    const mk=(id,label,values,color,bg)=>new Chart(document.getElementById(id).getContext('2d'),{type:'line',data:{labels,datasets:[{label,data:values,borderColor:color,backgroundColor:bg,borderWidth:2,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:color,fill:true,tension:.4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'rgba(16,16,42,.95)',titleColor:'#f0f0ff',bodyColor:'#f0f0ff',borderColor:'rgba(108,99,255,.3)',borderWidth:1,padding:10,cornerRadius:8,displayColors:false}},scales:{x:{grid:{color:'rgba(255,255,255,.03)'},ticks:{color:'rgba(240,240,255,.35)',font:{family:'Inter',size:10},maxRotation:45,maxTicksLimit:8}},y:{grid:{color:'rgba(255,255,255,.03)'},ticks:{color:'rgba(240,240,255,.35)',font:{family:'Inter',size:10}},beginAtZero:true}}}});
    state.charts.vol=mk('chart-volume','Volume',dates.map(d=>map[d].vol),'#E040FB','rgba(224,64,251,.08)');
    state.charts.wt=mk('chart-weight','Tạ',dates.map(d=>map[d].maxW),'#FF5252','rgba(255,82,82,.08)');
    state.charts.sets=mk('chart-sets','Sets',dates.map(d=>map[d].sets),'#00BCD4','rgba(0,188,212,.08)');
    state.charts.reps=mk('chart-reps','Reps',dates.map(d=>map[d].reps),'#6C63FF','rgba(108,99,255,.08)');
}

function renderDashboardHistory() {
    const entries = getMemberEntries(state.currentMember).slice(0,20);
    const tbody=document.getElementById('dashboard-tbody'), empty=document.getElementById('dashboard-empty'), table=document.getElementById('dashboard-table');
    if (!entries.length) { table.style.display='none'; empty.classList.add('show'); return; }
    table.style.display='table'; empty.classList.remove('show');
    tbody.innerHTML = entries.map(e => { const vol=e.sets*e.reps*e.weight, wt=WORKOUT_TYPES[e.workoutType]; return `<tr><td>${fmtDate(e.date)}</td><td><span class="type-badge t${e.workoutType}">${wt?wt.short:'?'}</span></td><td>${e.exercise}</td><td>${e.sets}</td><td>${e.reps}</td><td>${e.weight}</td><td><strong>${fmtNum(vol)}</strong></td></tr>`; }).join('');
}

// ============================================================
// PAGE 2: EXERCISE LIBRARY — with IMAGES
// ============================================================
function renderExercises() {
    const group = state.muscleFilter;
    const filtered = ALL_EXERCISES.filter(ex => exerciseMatchesFilter(ex, group));
    const grid = document.getElementById('exercise-grid');

    grid.innerHTML = filtered.map(ex => {
        const isSelected = state.selectedExercises.some(s => s.id===ex.id);
        const muscleTags = ex.muscles.map((m,i) => `<span class="muscle-tag ${i>0?'secondary':''}">${m}</span>`).join('');
        const diffColor = ex.diff==='Dễ'?'var(--green)':ex.diff==='Khó'?'var(--red)':'var(--orange)';
        const imgs = getExerciseImages(ex);

        // Build visual: use real images with crossfade animation if available, else gradient+emoji
        let visualHTML;
        if (imgs.img0) {
            visualHTML = `
            <div class="ex-visual ex-visual-img">
                <img class="ex-img ex-img-a" src="${imgs.img0}" alt="${ex.name} pose 1" loading="lazy" onerror="this.style.display='none'">
                <img class="ex-img ex-img-b" src="${imgs.img1}" alt="${ex.name} pose 2" loading="lazy" onerror="this.style.display='none'">
                <div class="ex-img-fallback" style="--ex-grad:${ex.gradient}">
                    <div class="ex-anim-icon">${ex.icon}</div>
                </div>
            </div>`;
        } else {
            visualHTML = `
            <div class="ex-visual" style="--ex-grad:${ex.gradient}">
                <div class="ex-anim-wrapper anim-${ex.anim}">
                    <div class="ex-anim-icon">${ex.icon}</div>
                </div>
            </div>`;
        }

        return `
        <div class="exercise-card ${isSelected?'selected':''}" data-ex-id="${ex.id}">
            <div class="select-check">${isSelected?'✓':''}</div>
            ${visualHTML}
            <div class="ex-info">
                <div class="ex-name">${ex.name}</div>
                <div class="ex-name-vi">${ex.vi}</div>
                <div class="ex-muscles">${muscleTags}</div>
                <p class="ex-desc">${ex.desc}</p>
                <div class="ex-meta">
                    <span>🔧 ${ex.equip}</span>
                    <span style="color:${diffColor}">⚡ ${ex.diff}</span>
                </div>
                <div class="ex-actions">
                    <a class="btn-video" href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name+' exercise tutorial')}" target="_blank" rel="noopener" onclick="event.stopPropagation()">📺 Video</a>
                </div>
            </div>
        </div>`;
    }).join('');
    updateSelectionBar();
}

function toggleExerciseSelection(exId) {
    const ex = ALL_EXERCISES.find(e => e.id===exId); if (!ex) return;
    const idx = state.selectedExercises.findIndex(s => s.id===exId);
    if (idx>=0) state.selectedExercises.splice(idx,1); else state.selectedExercises.push(ex);
    renderExercises();
}

function updateSelectionBar() {
    const bar = document.getElementById('selection-bar');
    const count = state.selectedExercises.length;
    document.getElementById('selection-count').textContent = count;
    document.getElementById('selection-names').textContent = state.selectedExercises.map(e=>e.name).join(', ');
    if (count>0 && state.currentPage==='exercises') bar.classList.add('show'); else bar.classList.remove('show');
}

function confirmSelection() {
    if (state.selectedExercises.length===0) { showToast('Hãy chọn ít nhất 1 bài tập!','error'); return; }
    showToast(`Đã chọn ${state.selectedExercises.length} bài tập!`,'info');
    navigateTo('log');
}

// ============================================================
// PAGE 3: WORKOUT LOG
// ============================================================
function refreshLog() {
    const hasSelection = state.selectedExercises.length>0;
    document.getElementById('no-exercises-msg').style.display = hasSelection?'none':'flex';
    document.getElementById('completion-section').style.display = hasSelection?'block':'none';
    document.getElementById('muscle-dist-section').style.display = hasSelection?'block':'none';
    document.getElementById('log-form-wrapper').style.display = hasSelection?'block':'none';
    document.getElementById('log-member-badge').textContent = state.currentMember;
    if (hasSelection) { populateExerciseDropdown(); updateProgress(); updateVolumeSummary(); }
    renderLogHistory();
}

function populateExerciseDropdown() {
    const select = document.getElementById('input-exercise');
    const currentVal = select.value;
    select.innerHTML = '<option value="">— Chọn bài tập —</option>';
    const grouped = {};
    state.selectedExercises.forEach(ex => {
        const wt = WORKOUT_TYPES[ex.workoutType];
        if (!grouped[ex.workoutType]) grouped[ex.workoutType]={label:wt?wt.short+': '+wt.name:'Khác',exercises:[]};
        grouped[ex.workoutType].exercises.push(ex);
    });
    for (const [,group] of Object.entries(grouped)) {
        const og = document.createElement('optgroup'); og.label=group.label;
        group.exercises.forEach(ex => {
            const opt = document.createElement('option'); opt.value=ex.name;
            const todayEntries = getTodayEntries();
            opt.textContent = todayEntries.some(e=>e.exercise===ex.name) ? `✅ ${ex.name} (đã tập)` : ex.name;
            og.appendChild(opt);
        });
        select.appendChild(og);
    }
    if (currentVal) select.value = currentVal;
}

function getTodayEntries() { return getMemberEntries(state.currentMember).filter(e=>e.date===todayStr()); }

function updateProgress() {
    const todayEntries = getTodayEntries(); const total = state.selectedExercises.length;
    const loggedNames = new Set(todayEntries.map(e=>e.exercise));
    const completed = state.selectedExercises.filter(ex=>loggedNames.has(ex.name)).length;
    const pct = total>0?Math.round(completed/total*100):0;
    document.getElementById('completion-text').textContent = `${completed} / ${total} bài tập`;
    document.getElementById('completion-pct').textContent = `${pct}%`;
    document.getElementById('completion-fill').style.width = `${pct}%`;

    const groupCounts={}, groupCompleted={};
    state.selectedExercises.forEach(ex => { const g=getPrimaryMuscleGroup(ex); groupCounts[g]=(groupCounts[g]||0)+1; if(loggedNames.has(ex.name)) groupCompleted[g]=(groupCompleted[g]||0)+1; });
    document.getElementById('muscle-dist-bars').innerHTML = Object.entries(groupCounts).sort((a,b)=>b[1]-a[1]).map(([grp,count]) => {
        const f=MUSCLE_FILTERS[grp], p=Math.round(count/total*100), done=groupCompleted[grp]||0;
        return `<div class="muscle-dist-row"><span class="muscle-dist-label">${f.label}</span><div class="muscle-dist-track"><div class="muscle-dist-fill" style="width:${p}%;background:${f.color}"></div></div><span class="muscle-dist-pct">${p}%</span><span class="muscle-dist-done">${done}/${count}</span></div>`;
    }).join('');
}

function updateVolumeSummary() {
    const todayEntries = getTodayEntries();
    const s=parseInt(document.getElementById('input-sets').value)||0, r=parseInt(document.getElementById('input-reps').value)||0, w=parseFloat(document.getElementById('input-weight').value)||0;
    document.getElementById('volume-calc').textContent = fmtNum(Math.round(s*r*w));
    document.getElementById('volume-today-total').textContent = fmtNum(Math.round(todayEntries.reduce((sum,e)=>sum+e.sets*e.reps*e.weight,0)));
    const muscleVol={};
    todayEntries.forEach(entry => {
        const exInfo=findExerciseByName(entry.exercise), grp=exInfo?getPrimaryMuscleGroup(exInfo):'chest', f=MUSCLE_FILTERS[grp];
        if(!muscleVol[grp]) muscleVol[grp]={label:f.label,color:f.color,vol:0};
        muscleVol[grp].vol += entry.sets*entry.reps*entry.weight;
    });
    const musclesDiv = document.getElementById('volume-muscles');
    const chips = Object.values(muscleVol).map(m => `<span class="volume-muscle-chip" style="background:${m.color}22;color:${m.color}">${m.label}: ${fmtNum(Math.round(m.vol))} kg</span>`);
    musclesDiv.innerHTML = chips.length ? chips.join('') : '<span style="color:var(--text-3);font-size:.78rem">Chưa có dữ liệu hôm nay</span>';
}

function renderLogHistory() {
    const entries=getMemberEntries(state.currentMember); const filter=document.getElementById('log-history-filter').value;
    let filtered=entries; if (filter!=='all') filtered=entries.filter(e=>String(e.workoutType)===filter);
    const tbody=document.getElementById('log-tbody'), empty=document.getElementById('log-empty'), table=document.getElementById('log-table');
    if (!filtered.length) { table.style.display='none'; empty.classList.add('show'); return; }
    table.style.display='table'; empty.classList.remove('show');
    tbody.innerHTML = filtered.map(e => { const vol=e.sets*e.reps*e.weight, wt=WORKOUT_TYPES[e.workoutType]; return `<tr><td>${fmtDate(e.date)}</td><td><span class="type-badge t${e.workoutType}">${wt?wt.short:'?'}</span></td><td>${e.exercise}</td><td>${e.sets}</td><td>${e.reps}</td><td>${e.weight}</td><td><strong>${fmtNum(vol)}</strong></td><td>${e.notes||'—'}</td><td><button class="btn-del" data-id="${e.id}">🗑️</button></td></tr>`; }).join('');
}

function exportCSV() {
    const entries=getMemberEntries(state.currentMember);
    if (!entries.length) { showToast('Không có dữ liệu!','error'); return; }
    const headers=['Ngày','Loại bài','Bài tập','Sets','Reps','Tạ (kg)','Volume (kg)','Ghi chú'];
    const rows=entries.map(e=>[fmtDate(e.date),WORKOUT_TYPES[e.workoutType]?.short||'',e.exercise,e.sets,e.reps,e.weight,e.sets*e.reps*e.weight,e.notes||'']);
    const csv='\uFEFF'+[headers.join(','),...rows.map(r=>r.map(c=>`"${c}"`).join(','))].join('\n');
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'}); const a=document.createElement('a');
    a.href=URL.createObjectURL(blob); a.download=`fitness_${state.currentMember}_${todayStr()}.csv`; a.click();
    showToast(`Đã xuất CSV cho ${state.currentMember}!`);
}

// ============================================================
// EVENT LISTENERS
// ============================================================
function initEvents() {
    document.querySelectorAll('.nav-tab').forEach(t => t.addEventListener('click', () => navigateTo(t.dataset.page)));
    document.getElementById('prev-week').addEventListener('click', () => { state.weekOffset--; renderAttendance(); });
    document.getElementById('next-week').addEventListener('click', () => { state.weekOffset++; renderAttendance(); });

    document.getElementById('member-pills').addEventListener('click', e => { const p=e.target.closest('.member-pill'); if(!p) return; state.currentMember=p.dataset.member; syncMemberPills(); refreshDashboard(); });
    document.getElementById('log-member-pills').addEventListener('click', e => { const p=e.target.closest('.member-pill'); if(!p) return; state.currentMember=p.dataset.member; syncMemberPills(); refreshLog(); });

    document.getElementById('muscle-filters').addEventListener('click', e => { const btn=e.target.closest('.muscle-btn'); if(!btn) return; state.muscleFilter=btn.dataset.group; document.querySelectorAll('.muscle-btn').forEach(b=>b.classList.toggle('active',b===btn)); renderExercises(); });

    document.getElementById('exercise-grid').addEventListener('click', e => { if(e.target.closest('.btn-video')) return; const card=e.target.closest('.exercise-card'); if(card) toggleExerciseSelection(card.dataset.exId); });

    document.getElementById('btn-clear-selection').addEventListener('click', () => { state.selectedExercises=[]; renderExercises(); showToast('Đã xóa tất cả','info'); });
    document.getElementById('btn-confirm-selection').addEventListener('click', confirmSelection);

    document.getElementById('btn-goto-exercises').addEventListener('click', () => navigateTo('exercises'));
    document.getElementById('btn-add-more-exercises').addEventListener('click', () => navigateTo('exercises'));

    ['input-sets','input-reps','input-weight'].forEach(id => document.getElementById(id).addEventListener('input', () => updateVolumeSummary()));

    document.getElementById('workout-form').addEventListener('submit', async e => {
        e.preventDefault();
        const exerciseName = document.getElementById('input-exercise').value;
        const exInfo = findExerciseByName(exerciseName);
        const entry = {
            date: document.getElementById('input-date').value,
            workoutType: exInfo?exInfo.workoutType:1,
            exercise: exerciseName,
            sets: parseInt(document.getElementById('input-sets').value),
            reps: parseInt(document.getElementById('input-reps').value),
            weight: parseFloat(document.getElementById('input-weight').value),
            notes: document.getElementById('input-notes').value.trim()
        };
        if (!entry.date||!entry.exercise||!entry.sets||!entry.reps||isNaN(entry.weight)) { showToast('Vui lòng điền đầy đủ!','error'); return; }
        await addEntry(state.currentMember, entry);
        ['input-sets','input-reps','input-weight','input-notes'].forEach(id => document.getElementById(id).value='');
        document.getElementById('input-exercise').value='';
        showToast(`Đã lưu "${entry.exercise}" cho ${state.currentMember}!`);
        refreshLog();
    });

    document.getElementById('log-tbody').addEventListener('click', async e => {
        const btn=e.target.closest('.btn-del'); if(!btn) return;
        if (await confirmDialog('Xác nhận xóa','Bạn có chắc muốn xóa?')) { await deleteEntry(state.currentMember,btn.dataset.id); showToast('Đã xóa!','info'); refreshLog(); }
    });

    document.getElementById('log-history-filter').addEventListener('change', renderLogHistory);
    document.getElementById('chart-filter').addEventListener('change', updateDashboardCharts);
    document.getElementById('btn-export-csv').addEventListener('click', exportCSV);
    document.getElementById('input-date').value = todayStr();
}

function syncMemberPills() {
    ['member-pills','log-member-pills'].forEach(id => {
        document.querySelectorAll(`#${id} .member-pill`).forEach(p => p.classList.toggle('active', p.dataset.member===state.currentMember));
    });
}

// ============================================================
// INIT
// ============================================================
async function init() {
    document.getElementById('nav-date').textContent = new Date().toLocaleDateString('vi-VN',{weekday:'long',day:'2-digit',month:'2-digit',year:'numeric'});
    initEvents();

    // Thay thế nút Sync bằng Firebase
    const syncBtn = document.getElementById('btn-sync');
    if (syncBtn) {
        syncBtn.title = "Firebase Sync Active";
        syncBtn.onclick = () => showToast('Dữ liệu đang được đồng bộ LIVE với Firebase!', 'info');
    }

    // Kết nối Firebase
    if (isFirebaseConfigured()) {
        showToast('Đang kết nối Cloud Base...','info');
        initFirebaseSync();
    } else {
        showSyncStatus('📍 Local Storage Only');
        showToast('Mở script.js dán cấu hình Firebase để xài Online nhé!', 'error');
    }

    navigateTo('dashboard');
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Unsubscribe from snapshot if needed
});

document.addEventListener('DOMContentLoaded', init);
