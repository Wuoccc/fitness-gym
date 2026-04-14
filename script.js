/* =============================================
   FITNESS TRACKER — Full App Logic v6
   + Firebase Cloud Firestore (REALTIME SYNC)
   ============================================= */

// IMPORT FIREBASE MODULES
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({tabManager: persistentMultipleTabManager()})
});

const WORKOUTS_COL = collection(db, 'workouts');
const LOGS_COL = collection(db, 'logs');

// Image base URL from free-exercise-db

const IMG_BASE = 'https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises';

// ============================================================
// EXERCISE DATABASE — with real images
// ============================================================
const EXERCISES = {
  "1": [
    {
      "id": "Barbell_Bench_Press_-_Medium_Grip",
      "name": "Barbell Bench Press - Medium Grip",
      "vi": "Barbell Bench Press - Medium Grip",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên một chiếc ghế phẳng. Sử dụng tay cầm có chiều rộng vừa phải (tay cầm tạo góc 90 độ ở giữa chuyển động giữa cẳng tay và ...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Barbell_Bench_Press_-_Medium_Grip"
    },
    {
      "id": "Barbell_Incline_Bench_Press_-_Medium_Grip",
      "name": "Barbell Incline Bench Press - Medium Grip",
      "vi": "Barbell Incline Bench Press - Medium Grip",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên một chiếc ghế nghiêng. Sử dụng tay cầm có chiều rộng vừa phải (tay cầm tạo góc 90 độ ở giữa chuyển động giữa cẳng tay và ...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Barbell_Incline_Bench_Press_-_Medium_Grip"
    },
    {
      "id": "Bench_Dips",
      "name": "Bench Dips",
      "vi": "Bench Dips",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đối với bài tập này, bạn sẽ cần đặt một chiếc ghế dài phía sau lưng. Đặt băng ghế vuông góc với cơ thể của bạn và trong khi nhìn ra xa, hãy giữ ...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Bench_Dips"
    },
    {
      "id": "Butterfly",
      "name": "Butterfly",
      "vi": "Butterfly",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Ngồi trên máy, lưng phẳng trên tấm đệm. Hãy nắm lấy tay cầm. Mẹo: Cánh tay trên của bạn phải được đặt song song với sàn; điều chỉnh...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Butterfly"
    },
    {
      "id": "Cable_Crossover",
      "name": "Cable Crossover",
      "vi": "Cable Crossover",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Để vào vị trí ban đầu, đặt ròng rọc lên vị trí cao (trên đầu), chọn lực cản cần sử dụng và giữ lực kéo...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Cable_Crossover"
    },
    {
      "id": "Dumbbell_Bench_Press",
      "name": "Dumbbell Bench Press",
      "vi": "Dumbbell Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nằm xuống một chiếc ghế phẳng với một quả tạ ở mỗi tay đặt trên đùi. Lòng bàn tay của bạn sẽ hướng vào nhau. Sau đó, sử dụng yo...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Dumbbell_Bench_Press"
    },
    {
      "id": "Seated_Dumbbell_Press",
      "name": "Seated Dumbbell Press",
      "vi": "Seated Dumbbell Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Lấy một vài quả tạ và ngồi trên ghế tập quân sự hoặc ghế tiện ích có tựa lưng khi bạn đặt các quả tạ thẳng đứng lên...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Seated_Dumbbell_Press"
    },
    {
      "id": "Side_Lateral_Raise",
      "name": "Side Lateral Raise",
      "vi": "Side Lateral Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Chọn một vài quả tạ và đứng thẳng thân và các quả tạ ở bên cạnh bạn dài bằng sải tay với lòng bàn tay hướng về phía bạn. Đây là...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Side_Lateral_Raise"
    }
  ],
  "2": [
    {
      "id": "Barbell_Curl",
      "name": "Barbell Curl",
      "vi": "Barbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với thân mình thẳng trong khi cầm một thanh tạ ở độ rộng ngang vai. Lòng bàn tay của bạn phải hướng về phía trước và khuỷu tay phải...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Barbell_Curl"
    },
    {
      "id": "Barbell_Deadlift",
      "name": "Barbell Deadlift",
      "vi": "Barbell Deadlift",
      "icon": "🏋️",
      "muscles": [
        "Lưng dưới"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đứng trước một thanh tạ đã được nạp sẵn. Trong khi giữ lưng càng thẳng càng tốt, uốn cong đầu gối, uốn cong về phía trước và nắm lấy thanh bằng phương tiện (sh...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Barbell_Deadlift"
    },
    {
      "id": "Bent_Over_Barbell_Row",
      "name": "Bent Over Barbell Row",
      "vi": "Bent Over Barbell Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Giữ một thanh tạ với tay cầm quay sấp (lòng bàn tay hướng xuống), hơi cong đầu gối và đưa thân về phía trước, bằng cách uốn cong ở thắt lưng, đồng thời giữ...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Bent_Over_Barbell_Row"
    },
    {
      "id": "Dumbbell_Bicep_Curl",
      "name": "Dumbbell Bicep Curl",
      "vi": "Dumbbell Bicep Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với một quả tạ ở mỗi tay dài bằng cánh tay. Giữ khuỷu tay của bạn gần với thân mình và xoay lòng bàn tay cho đến khi chúng...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Dumbbell_Bicep_Curl"
    },
    {
      "id": "Pullups",
      "name": "Pullups",
      "vi": "Pullups",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nắm lấy thanh kéo với lòng bàn tay hướng về phía trước bằng cách cầm theo quy định. Lưu ý khi cầm vợt: Để cầm vợt rộng, hai tay của bạn cần đặt cách nhau một khoảng...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Pullups"
    },
    {
      "id": "Seated_Cable_Rows",
      "name": "Seated Cable Rows",
      "vi": "Seated Cable Rows",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đối với bài tập này, bạn sẽ cần sử dụng máy tập ròng rọc thấp có thanh chữ V. Lưu ý: Thanh chữ V sẽ cho phép bạn có cách cầm trung tính ở nơi lòng bàn tay...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Seated_Cable_Rows"
    },
    {
      "id": "Straight-Arm_Pulldown",
      "name": "Straight-Arm Pulldown",
      "vi": "Straight-Arm Pulldown",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Nằm úp mặt trên ghế phẳng, một tay cầm tạ và tay kia gập lại trên ghế để bạn có thể tựa đầu vào đó. Uốn cong...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Straight-Arm_Pulldown"
    },
    {
      "id": "Wide-Grip_Lat_Pulldown",
      "name": "Wide-Grip Lat Pulldown",
      "vi": "Wide-Grip Lat Pulldown",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt hai quả tạ ở một bên của một chiếc ghế phẳng. Quỳ xuống bằng cả hai đầu gối sao cho cơ thể hướng về phía băng ghế phẳng. Sử dụng ...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Wide-Grip_Lat_Pulldown"
    }
  ],
  "3": [
    {
      "id": "Barbell_Squat",
      "name": "Barbell Squat",
      "vi": "Barbell Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn trên giá ngay dưới mức vai. Một khi...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Barbell_Squat"
    },
    {
      "id": "Crunches",
      "name": "Crunches",
      "vi": "Crunches",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm ngửa, đặt bàn chân phẳng trên mặt đất hoặc tựa trên ghế với đầu gối cong một góc 90 độ. Nếu bạn đang nghỉ ngơi đôi chân của bạn...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Crunches"
    },
    {
      "id": "Hack_Squat",
      "name": "Hack Squat",
      "vi": "Hack Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh ghế phù hợp với chiều cao của bạn. Tay cầm phải ở gần đỉnh ngực khi bắt đầu ...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Hack_Squat"
    },
    {
      "id": "Leg_Extensions",
      "name": "Leg Extensions",
      "vi": "Leg Extensions",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đối với bài tập này, bạn sẽ cần sử dụng máy kéo dài chân. Trước tiên, hãy chọn trọng lượng của bạn và ngồi lên máy với hai chân đặt dưới tấm đệm (bàn chân đặt...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Leg_Extensions"
    },
    {
      "id": "Leg_Press",
      "name": "Leg Press",
      "vi": "Leg Press",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Sử dụng máy ép chân, ngồi xuống máy và đặt chân lên bệ ngay trước mặt bạn với khoảng cách chân vừa phải (rộng vai).",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Leg_Press"
    },
    {
      "id": "Plank",
      "name": "Plank",
      "vi": "Plank",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "static",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Vào tư thế nằm sấp trên sàn, đỡ trọng lượng cơ thể trên ngón chân và cẳng tay. Cánh tay của bạn uốn cong và ngay dưới vai. Kee...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Plank"
    },
    {
      "id": "Seated_Leg_Curl",
      "name": "Seated Leg Curl",
      "vi": "Seated Leg Curl",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Điều chỉnh cần gạt của máy để phù hợp với chiều cao của bạn và ngồi lên máy, lưng dựa vào tấm đỡ phía sau. Đặt mặt sau của cẳng chân lên trên ...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Seated_Leg_Curl"
    },
    {
      "id": "Standing_Calf_Raises",
      "name": "Standing Calf Raises",
      "vi": "Standing Calf Raises",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Nằm thẳng trên ghế trong khi cầm một quả tạ ở độ dài cánh tay. Cánh tay của bạn phải vuông góc với cơ thể. Lòng bàn tay của bạn phải hướng về phía...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Standing_Calf_Raises"
    }
  ]
};const WORKOUT_TYPES = {
    1: { name:'Ngực - Vai - Tay sau', short:'Bài 1' },
    2: { name:'Lưng - Tay trước - Cẳng', short:'Bài 2' },
    3: { name:'Chân - Bụng', short:'Bài 3' }
};


const SUB_FILTERS = {
    chest: [
        { id: 'all', label: 'Tất cả Ngực', matcher: ex => true },
        { id: 'upper', label: 'Ngực trên', matcher: ex => /incline|upper/i.test(ex.name) },
        { id: 'lower', label: 'Ngực dưới', matcher: ex => /decline|dip/i.test(ex.name) },
        { id: 'middle', label: 'Ngực giữa', matcher: ex => !/incline|upper|decline|dip/i.test(ex.name) }
    ],
    shoulder: [
        { id: 'all', label: 'Tất cả Vai', matcher: ex => true },
        { id: 'front', label: 'Vai trước', matcher: ex => /front|press|military|arnold|anterior|raise/i.test(ex.name) && !/rear|reverse|lateral|side/i.test(ex.name) },
        { id: 'side', label: 'Vai giữa', matcher: ex => /lateral|side/i.test(ex.name) },
        { id: 'rear', label: 'Vai sau', matcher: ex => /rear|reverse|face/i.test(ex.name) }
    ]
};
const MUSCLE_FILTERS = {
    all:      { label:'Tất cả',    keywords:null,                      color:'#6C63FF' },
    chest:    { label:'Ngực',      keywords:['Ngực', 'Chest'],                  color:'#E040FB' },
    shoulder: { label:'Vai',       keywords:['Vai', 'Shoulders'],                   color:'#FF9800' },
    tricep:   { label:'Tay sau',   keywords:['Tay sau', 'Triceps'],               color:'#FF5252' },
    back:     { label:'Lưng',      keywords:['Lưng', 'Lats', 'Middle back', 'Lower back', 'Traps'],                  color:'#00BCD4' },
    bicep:    { label:'Tay trước', keywords:['Tay trước', 'Biceps'],             color:'#4CAF50' },
    forearm:  { label:'Cẳng',      keywords:['Cẳng', 'Forearms'],                  color:'#9C27B0' },
    legs:     { label:'Chân',      keywords:['Đùi','Bắp chân','Mông','Đùi trong','Đùi ngoài', 'Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Abductors', 'Adductors'],color:'#2196F3' },
    abs:      { label:'Bụng',      keywords:['Bụng','Core', 'Abdominals'],           color:'#FFC107' },
    neck:     { label:'Cổ',      keywords:['Neck'],color:'#9E9E9E' }
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
    subFilter: 'all',
    difficultySort: 'default',
    searchQuery: '',
    selectedExercises: [],
    weekOffset: 0,
    charts: {},
    analysisCharts: {},
    progressionExercise: '',
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
            data.id = doc.id;
            let ts = data.timestamp;
            if (ts && typeof ts.toDate === 'function') ts = ts.toDate();
            
            if (!newData[data.member]) newData[data.member] = [];
            newData[data.member].push(data);
        });
        
        for(let m in newData) newData[m].sort((a,b) => new Date(b.date) - new Date(a.date));

        state.cloudData = newData;
        saveDataLocal(newData);
        
        state.isOnline = true;
        updateSyncClock();
        refreshCurrentPage();
    }, (error) => {
        console.warn('Lỗi Firestore Workouts:', error);
        showSyncStatus('⚠️ Lỗi Kết Nối');
        state.isOnline = false;
    });

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
        updateSyncClock();
        refreshCurrentPage();
    }, (error) => {
        console.warn('Lỗi Firestore Logs:', error);
    });
}

function updateSyncClock() {
    const t = new Date();
    showSyncStatus(`⚡ Live (${t.getHours()}:${t.getMinutes().toString().padStart(2,'0')})`);
}

// Refresh whatever page the user is currently viewing
function refreshCurrentPage() {
    if (state.currentPage === 'dashboard') refreshDashboard();
    else if (state.currentPage === 'log') refreshLog();
    else if (state.currentPage === 'analysis') refreshAnalysis();
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
function calcVol(e) { if(e.setsData) return e.setsData.reduce((s,r) => s+(r.completed?r.reps*(r.weight||0):0),0); return (e.sets||0)*(e.reps||0)*(e.weight||0); }
function calcSets(e) { if(e.setsData) return e.setsData.filter(r=>r.completed).length; return e.sets||0; }
function calcReps(e) { if(e.setsData) return e.setsData.reduce((s,r) => s+(r.completed?r.reps:0),0); return (e.sets||0)*(e.reps||0); }
function calcMaxW(e) { if(e.setsData) return Math.max(0, ...e.setsData.filter(r=>r.completed).map(r=>Number(r.weight)||0)); return e.weight||0; }

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
    let match = f && f.keywords && ex.muscles.some(m => f.keywords.some(kw => m.toLowerCase().includes(kw.toLowerCase())));
    if (match && state.subFilter && state.subFilter !== 'all' && SUB_FILTERS[group]) {
        const sub = SUB_FILTERS[group].find(s => s.id === state.subFilter);
        if (sub && sub.matcher && !sub.matcher(ex)) match = false;
    }
    return match;
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
    if (page==='analysis') refreshAnalysis();
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
    document.getElementById('d-total-volume').textContent = fmtNum(Math.round(entries.reduce((s,e)=>s+calcVol(e),0)));
    document.getElementById('d-total-sets').textContent = fmtNum(entries.reduce((s,e)=>s+calcSets(e),0));
    document.getElementById('d-max-weight').textContent = fmtNum(entries.length?Math.max(...entries.map(e=>calcMaxW(e))):0);
    document.getElementById('d-member-badge').textContent = state.currentMember;
}

function updateDashboardCharts() {
    const filter = document.getElementById('chart-filter').value;
    let entries = getMemberEntries(state.currentMember);
    if (filter!=='all') entries = entries.filter(e=>String(e.workoutType)===filter);
    const map = {};
    entries.forEach(e => { if(!map[e.date]) map[e.date]={vol:0,maxW:0,sets:0,reps:0}; map[e.date].vol+=calcVol(e); map[e.date].maxW=Math.max(map[e.date].maxW,calcMaxW(e)); map[e.date].sets+=calcSets(e); map[e.date].reps+=calcReps(e); });
    const dates=Object.keys(map).sort(), labels=dates.map(fmtDate);
    Object.values(state.charts).forEach(c=>c.destroy()); state.charts={};
    const mk=(id,label,values,color,bg)=>new Chart(document.getElementById(id).getContext('2d'),{type:'line',data:{labels,datasets:[{label,data:values,borderColor:color,backgroundColor:bg,borderWidth:2,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:color,fill:true,tension:.4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'rgba(16,16,42,.95)',titleColor:'#f0f0ff',bodyColor:'#f0f0ff',borderColor:'rgba(108,99,255,.3)',borderWidth:1,padding:10,cornerRadius:8,displayColors:false}},scales:{x:{grid:{color:'rgba(255,255,255,.03)'},ticks:{color:'rgba(240,240,255,.35)',font:{family:'Inter',size:10},maxRotation:45,maxTicksLimit:8}},y:{grid:{color:'rgba(255,255,255,.03)'},ticks:{color:'rgba(240,240,255,.35)',font:{family:'Inter',size:10}},beginAtZero:true}}}});
    state.charts.vol=mk('chart-volume','Volume',dates.map(d=>map[d].vol),'#E040FB','rgba(224,64,251,.08)');
    state.charts.wt=mk('chart-weight','Tạ',dates.map(d=>map[d].maxW),'#FF5252','rgba(255,82,82,.08)');
    state.charts.sets=mk('chart-sets','Sets',dates.map(d=>map[d].sets),'#00BCD4','rgba(0,188,212,.08)');
    state.charts.reps=mk('chart-reps','Reps',dates.map(d=>map[d].reps),'#6C63FF','rgba(108,99,255,.08)');
}

function renderDashboardHistory() {
    const entries = getMemberEntries(state.currentMember).slice(0, 20);
    const tbody = document.getElementById('dashboard-tbody');
    const empty = document.getElementById('dashboard-empty');
    const table = document.getElementById('dashboard-table');
    if (!entries.length) { table.style.display='none'; empty.classList.add('show'); return; }
    table.style.display='table'; empty.classList.remove('show');
    tbody.innerHTML = entries.map(e => {
        const vol = calcVol(e), wt = WORKOUT_TYPES[e.workoutType];
        const sets = calcSets(e), maxW = calcMaxW(e), reps = calcReps(e);
        return `<tr class="dash-hist-row" style="cursor:pointer" onclick="window.openEntryModal && window.openEntryModal('${e.id}')">
            <td>${fmtDate(e.date)}</td>
            <td><span class="type-badge t${e.workoutType}">${wt ? wt.short : '?'}</span></td>
            <td><strong>${e.exercise}</strong></td>
            <td>${sets}</td>
            <td>${reps}</td>
            <td>${maxW}</td>
            <td><strong>${fmtNum(vol)}</strong></td>
            <td>
                <button class="btn-del-dash" title="Xóa" onclick="event.stopPropagation(); window.deleteDashEntry('${e.id}', '${e.exercise.replace(/'/g, "'")}')">🗑️</button>
            </td>
        </tr>`;
    }).join('');
}

// ============================================================
// PAGE 2: EXERCISE LIBRARY — with IMAGES
// ============================================================
function renderExercises() {
    const group = state.muscleFilter;
    let filtered = ALL_EXERCISES.filter(ex => exerciseMatchesFilter(ex, group));
    
    // Áp dụng bộ lọc tìm kiếm
    if (state.searchQuery) {
        const sq = state.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(ex => 
            (ex.name && ex.name.toLowerCase().includes(sq)) || 
            (ex.vi && ex.vi.toLowerCase().includes(sq))
        );
    }
    
    // Sort logic
    const diffWeight = { 'Dễ': 1, 'Trung bình': 2, 'Khó': 3 };
    if (state.difficultySort === 'asc') {
        filtered.sort((a,b) => (diffWeight[a.diff] || 0) - (diffWeight[b.diff] || 0));
    } else if (state.difficultySort === 'desc') {
        filtered.sort((a,b) => (diffWeight[b.diff] || 0) - (diffWeight[a.diff] || 0));
    }

    const grid = document.getElementById('exercise-grid');

    grid.innerHTML = filtered.map(ex => {
        const isSelected = state.selectedExercises.some(s => s.id===ex.id);
        const muscleTags = ex.muscles.map((m,i) => `<span class="muscle-tag ${i>0?'secondary':''}">${m}</span>`).join('');
        const diffColor = ex.diff==='Dễ'?'var(--green)':ex.diff==='Khó'?'var(--red)':'var(--orange)';
        const imgs = getExerciseImages(ex);

        // Build visual: use static real image if available, else gradient+emoji
        let visualHTML;
        if (imgs.img0) {
            visualHTML = `
            <div class="ex-visual ex-visual-img">
                <img class="ex-img" src="${imgs.img0}" alt="${ex.name}" loading="lazy" onerror="this.style.display='none'">
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
    document.getElementById('volume-summary-wrapper').style.display = hasSelection?'block':'none';
    const badge = document.getElementById('log-member-badge');
    if (badge) badge.textContent = state.currentMember;
    
    if (hasSelection) { renderDynamicLogList(); updateProgress(); updateVolumeSummary(); }
    else { document.getElementById('dynamic-log-list').innerHTML=''; }
    renderLogHistory();
}

function renderDynamicLogList() {
    const list = document.getElementById('dynamic-log-list');
    const todayEntries = getTodayEntries();
    
    const pending = state.selectedExercises.filter(ex => !todayEntries.some(e => e.exercise === ex.name));
    const done = state.selectedExercises.filter(ex => todayEntries.some(e => e.exercise === ex.name));
    
    if (pending.length === 0 && done.length === 0) { list.innerHTML = ''; return; }
    
    let html = '';
    
    if (pending.length > 0) {
        html += `<div class="log-table-wrap">
            <table class="log-workout-table">
                <thead><tr>
                    <th class="col-num">#</th>
                    <th>Bài tập</th>
                    <th class="col-input">Set</th>
                    <th class="col-input">Rep</th>
                    <th class="col-action"></th>
                </tr></thead>
                <tbody id="log-ex-tbody">`;
        
        pending.forEach((ex, idx) => {
            html += `<tr class="log-ex-row" data-ex-id="${ex.id}" data-ex-name="${ex.name}">
                <td class="col-num"><span class="ex-idx">${idx + 1}</span></td>
                <td class="ex-name-cell">
                    <span class="ex-tbl-name">${ex.name}</span>
                    <span class="ex-tbl-muscle">${ex.muscles ? ex.muscles[0] : ''}</span>
                </td>
                <td><input type="number" class="tbl-input setup-sets" placeholder="4" min="1" max="20"></td>
                <td><input type="number" class="tbl-input setup-reps" placeholder="12" min="1" max="100"></td>
                <td><button type="button" class="btn-gen-sets-sm" onclick="window.genSets(this)">▶ Tạo</button></td>
            </tr>`;
        });
        
        html += `</tbody></table></div>`;
    }
    
    if (done.length > 0) {
        html += `<div class="log-done-section">${done.map(ex => `
            <div class="log-done-row">
                <span>✅ <strong>${ex.name}</strong></span>
                <span class="done-tag">Đã hoàn thành</span>
            </div>`).join('')}
        </div>`;
    }
    
    list.innerHTML = html;
}

function getSelectedDate() {
    const dp = document.getElementById('log-date-picker');
    return dp && dp.value ? dp.value : todayStr();
}
function getTodayEntries() { return getMemberEntries(state.currentMember).filter(e=>e.date===getSelectedDate()); }

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
    document.getElementById('volume-today-total').textContent = fmtNum(Math.round(todayEntries.reduce((sum,e)=>sum+calcVol(e),0)));
    const muscleVol={};
    todayEntries.forEach(entry => {
        const exInfo=findExerciseByName(entry.exercise), grp=exInfo?getPrimaryMuscleGroup(exInfo):'chest', f=MUSCLE_FILTERS[grp];
        if(!muscleVol[grp]) muscleVol[grp]={label:f.label,color:f.color,vol:0};
        muscleVol[grp].vol += calcVol(entry);
    });
    const musclesDiv = document.getElementById('volume-muscles');
    const chips = Object.values(muscleVol).map(m => `<span class="volume-muscle-chip" style="background:${m.color}22;color:${m.color}">${m.label}: ${fmtNum(Math.round(m.vol))} kg</span>`);
    musclesDiv.innerHTML = chips.length ? chips.join('') : '<span style="color:var(--text-3);font-size:.78rem">Chưa có dữ liệu trong ngày</span>';
}

function renderLogHistory() {
    const entries = getMemberEntries(state.currentMember);
    const filter = document.getElementById('log-history-filter').value;
    let filtered = entries;
    if (filter !== 'all') filtered = entries.filter(e => String(e.workoutType) === filter);
    
    const list = document.getElementById('history-list');
    const empty = document.getElementById('log-empty');
    
    if (!list) return;
    
    if (!filtered.length) {
        list.innerHTML = '';
        if (empty) empty.classList.add('show');
        return;
    }
    if (empty) empty.classList.remove('show');
    
    // Group by date
    const byDate = {};
    filtered.forEach(e => {
        if (!byDate[e.date]) byDate[e.date] = [];
        byDate[e.date].push(e);
    });
    
    const sortedDates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));
    
    list.innerHTML = sortedDates.map(date => {
        const dayItems = byDate[date];
        const totalVol = dayItems.reduce((s, e) => s + calcVol(e), 0);
        const itemsHtml = dayItems.map(e => {
            const vol = calcVol(e);
            const sets = calcSets(e);
            const maxW = calcMaxW(e);
            const wt = WORKOUT_TYPES[e.workoutType];
            const completion = e.setsData
                ? `${e.setsData.filter(s => s.completed).length}/${e.setsData.length} set`
                : `${sets} set`;
            return `
            <div class="history-item" onclick="window.openEntryModal('${e.id}')">
                <div class="history-item-left">
                    <span class="history-ex-name">${e.exercise}</span>
                    <span class="history-meta">${completion} &middot; max ${maxW}kg &middot; ${fmtNum(Math.round(vol))} kg</span>
                </div>
                <div class="history-item-right">
                    <span class="type-badge t${e.workoutType}">${wt ? wt.short : '?'}</span>
                    <span class="history-arrow">&rsaquo;</span>
                </div>
            </div>`;
        }).join('');
        return `
        <div class="history-date-group">
            <div class="history-date-header">
                <span>${fmtDate(date)}</span>
                <span class="history-date-vol">${fmtNum(Math.round(totalVol))} kg</span>
            </div>
            ${itemsHtml}
        </div>`;
    }).join('');
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
// PAGE 4: ANALYSIS — PR Tracking + Progression + Weak Points
// ============================================================

function computePRs(member) {
    const entries = getMemberEntries(member);
    const prMap = {};
    [...entries].reverse().forEach(e => {
        const maxW = calcMaxW(e);
        const vol = calcVol(e);
        const reps = calcReps(e);
        if (!prMap[e.exercise]) {
            prMap[e.exercise] = { maxWeight: maxW, maxVolume: vol, maxReps: reps, sessions: 1, lastDate: e.date };
        } else {
            const pr = prMap[e.exercise];
            pr.sessions++;
            pr.lastDate = e.date;
            if (maxW > pr.maxWeight) pr.maxWeight = maxW;
            if (vol > pr.maxVolume) pr.maxVolume = vol;
            if (reps > pr.maxReps) pr.maxReps = reps;
        }
    });
    return prMap;
}

function renderPRBoard() {
    const member = state.currentMember;
    const prMap = computePRs(member);
    document.getElementById('pr-member-badge').textContent = member;
    const exercises = Object.keys(prMap);
    if (!exercises.length) {
        document.getElementById('pr-stats-row').innerHTML = '';
        document.getElementById('pr-board').innerHTML = '<div class="empty-state show"><div class="empty-icon">🏆</div><p>Chưa có dữ liệu PR</p><span>Hãy ghi nhận buổi tập đầu tiên!</span></div>';
        return;
    }
    exercises.sort((a, b) => prMap[b].maxWeight - prMap[a].maxWeight);
    const totalSessions = exercises.reduce((s, n) => s + prMap[n].sessions, 0);
    const topWeight = prMap[exercises[0]].maxWeight;
    document.getElementById('pr-stats-row').innerHTML =
        '<div class="stat-card"><div class="stat-icon-box" style="--sc:#FFD700">🏆</div><div class="stat-detail"><span class="stat-val">' + exercises.length + '</span><span class="stat-lbl">Bài đã tập</span></div></div>' +
        '<div class="stat-card"><div class="stat-icon-box" style="--sc:#FF9800">📅</div><div class="stat-detail"><span class="stat-val">' + totalSessions + '</span><span class="stat-lbl">Tổng buổi</span></div></div>' +
        '<div class="stat-card"><div class="stat-icon-box" style="--sc:#FF5252">💪</div><div class="stat-detail"><span class="stat-val">' + topWeight + 'kg</span><span class="stat-lbl">Tạ PR cao nhất</span></div></div>';
    document.getElementById('pr-board').innerHTML = exercises.map((name, i) => {
        const pr = prMap[name];
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
        return '<div class="pr-card ' + (i === 0 ? 'gold' : '') + '">' +
            '<div class="pr-exercise-name">' + medal + ' ' + name + '</div>' +
            '<div class="pr-stats">' +
                '<div class="pr-stat"><span class="pr-stat-val">' + pr.maxWeight + '</span><div class="pr-stat-lbl">Max Tạ (kg)</div></div>' +
                '<div class="pr-stat"><span class="pr-stat-val">' + Math.round(pr.maxVolume) + '</span><div class="pr-stat-lbl">Max Vol (kg)</div></div>' +
                '<div class="pr-stat"><span class="pr-stat-val">' + pr.sessions + '</span><div class="pr-stat-lbl">Buổi tập</div></div>' +
            '</div>' +
            '<div class="pr-date">Gần nhất: ' + fmtDate(pr.lastDate) + '</div>' +
        '</div>';
    }).join('');
}

function renderProgression() {
    const member = state.currentMember;
    const entries = getMemberEntries(member);
    const select = document.getElementById('progression-exercise-select');
    const exerciseNames = [...new Set(entries.map(e => e.exercise))].sort();
    const prev = state.progressionExercise || select.value;
    select.innerHTML = '<option value="">Chọn bài tập...</option>' +
        exerciseNames.map(n => '<option value="' + n + '"' + (n === prev ? ' selected' : '') + '>' + n + '</option>').join('');
    const selectedEx = select.value;
    const empty = document.getElementById('progression-empty');
    const wrap = document.getElementById('progression-chart-wrap');
    if (!selectedEx) {
        empty.classList.add('show');
        wrap.style.display = 'none';
        if (state.analysisCharts.progression) { state.analysisCharts.progression.destroy(); state.analysisCharts.progression = null; }
        return;
    }
    empty.classList.remove('show');
    wrap.style.display = 'block';
    const exEntries = entries.filter(e => e.exercise === selectedEx).sort((a, b) => a.date.localeCompare(b.date));
    const labels = exEntries.map(e => fmtDate(e.date));
    const weights = exEntries.map(e => calcMaxW(e));
    const volumes = exEntries.map(e => Math.round(calcVol(e)));
    const allW = weights.filter(w => w > 0);
    const prW = allW.length ? Math.max(...allW) : 0;
    const firstW = allW[0] || 0;
    const improvement = firstW > 0 ? Math.round((prW - firstW) / firstW * 100) : 0;
    const statsEl = document.getElementById('progression-stats');
    if (statsEl) statsEl.innerHTML =
        '<div class="pr-stat"><span class="pr-stat-val" style="color:#FFD700">' + prW + 'kg</span><div class="pr-stat-lbl">PR Tạ Max</div></div>' +
        '<div class="pr-stat"><span class="pr-stat-val" style="color:#4CAF50">' + (improvement >= 0 ? '+' : '') + improvement + '%</span><div class="pr-stat-lbl">Tiến bộ</div></div>' +
        '<div class="pr-stat"><span class="pr-stat-val" style="color:#00BCD4">' + exEntries.length + '</span><div class="pr-stat-lbl">Số buổi</div></div>';
    if (state.analysisCharts.progression) state.analysisCharts.progression.destroy();
    state.analysisCharts.progression = new Chart(document.getElementById('chart-progression').getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'Tạ max (kg)', data: weights, borderColor: '#FFD700', backgroundColor: 'rgba(255,215,0,0.1)', borderWidth: 2, pointRadius: 4, fill: true, tension: 0.4, yAxisID: 'y' },
                { label: 'Volume (kg)', data: volumes, borderColor: '#6C63FF', backgroundColor: 'rgba(108,99,255,0.08)', borderWidth: 2, pointRadius: 4, fill: true, tension: 0.4, yAxisID: 'y1' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, labels: { color: '#f0f0ff', font: { family: 'Inter', size: 11 } } }, tooltip: { backgroundColor: 'rgba(16,16,42,.95)', titleColor: '#f0f0ff', bodyColor: '#f0f0ff' } }, scales: { x: { grid: { color: 'rgba(255,255,255,.03)' }, ticks: { color: 'rgba(240,240,255,.4)', maxTicksLimit: 8 } }, y: { grid: { color: 'rgba(255,255,255,.03)' }, ticks: { color: '#FFD700' }, position: 'left' }, y1: { grid: { drawOnChartArea: false }, ticks: { color: '#6C63FF' }, position: 'right' } } }
    });
}

function renderWeakPoints() {
    const member = state.currentMember;
    const entries = getMemberEntries(member);
    const groupVol = {};
    entries.forEach(e => {
        const exInfo = findExerciseByName(e.exercise);
        if (!exInfo) return;
        const grp = getPrimaryMuscleGroup(exInfo);
        const f = MUSCLE_FILTERS[grp];
        if (!f) return;
        groupVol[grp] = (groupVol[grp] || 0) + calcVol(e);
    });
    const container = document.getElementById('weak-points-container');
    if (!Object.keys(groupVol).length) {
        container.innerHTML = '<div class="empty-state show" style="padding:24px 0"><div class="empty-icon">🎯</div><p>Chưa có dữ liệu</p><span>Hãy ghi nhận một vài buổi tập trước!</span></div>';
        if (state.analysisCharts.radar) { state.analysisCharts.radar.destroy(); state.analysisCharts.radar = null; }
        return;
    }
    const total = Object.values(groupVol).reduce((s, v) => s + v, 0);
    const sorted = Object.entries(groupVol).sort((a, b) => b[1] - a[1]);
    const maxVol = sorted[0][1];
    const radarLabels = sorted.map(x => MUSCLE_FILTERS[x[0]].label);
    const radarData = sorted.map(x => Math.round(x[1] / maxVol * 100));
    const radarColors = sorted.map(x => MUSCLE_FILTERS[x[0]].color);
    if (state.analysisCharts.radar) state.analysisCharts.radar.destroy();
    state.analysisCharts.radar = new Chart(document.getElementById('chart-muscle-radar').getContext('2d'), {
        type: 'radar',
        data: { labels: radarLabels, datasets: [{ label: member, data: radarData, borderColor: '#6C63FF', backgroundColor: 'rgba(108,99,255,0.2)', borderWidth: 2, pointBackgroundColor: radarColors, pointRadius: 5 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(16,16,42,.95)', titleColor: '#f0f0ff', bodyColor: '#f0f0ff' } }, scales: { r: { grid: { color: 'rgba(255,255,255,.08)' }, angleLines: { color: 'rgba(255,255,255,.08)' }, pointLabels: { color: 'rgba(240,240,255,.7)', font: { family: 'Inter', size: 11 } }, ticks: { color: 'rgba(240,240,255,.3)', backdropColor: 'transparent', stepSize: 25 }, min: 0, max: 100 } } }
    });
    const weakThreshold = Math.ceil(sorted.length / 3);
    const weakGroups = sorted.slice(-weakThreshold);
    let html = '<p class="weak-point-heading">Phân bổ Volume theo nhóm cơ</p>';
    sorted.forEach(item => {
        const grp = item[0], vol = item[1];
        const f = MUSCLE_FILTERS[grp];
        const pct = Math.round(vol / total * 100);
        const isWeak = weakGroups.some(w => w[0] === grp);
        html += '<div class="weak-point-row"><span class="weak-point-label">' + f.label + '</span><div class="weak-point-bar-bg"><div class="weak-point-bar" style="width:' + pct + '%;background:' + f.color + '"></div></div><span class="weak-point-pct">' + pct + '%</span>' + (isWeak ? '<span class="weak-point-warn">⚠️</span>' : '') + '</div>';
    });
    if (weakGroups.length) {
        html += '<div class="analysis-alert"><strong>⚠️ Nhóm cơ cần tăng cường:</strong><ul>' +
            weakGroups.map(item => '<li><strong>' + MUSCLE_FILTERS[item[0]].label + '</strong> — chỉ chiếm ' + Math.round(item[1] / total * 100) + '% tổng volume</li>').join('') +
            '</ul></div>';
    }
    container.innerHTML = html;
}

/* Gemini AI Analysis Logic */
async function runGeminiAnalysis() {
    const btn = document.getElementById('btn-run-gemini-analysis');
    const resultDiv = document.getElementById('gemini-analysis-result');
    const apiKey = 'AIzaSyDYA0rjpVhvTLnCF1U52Y6sMo9mWiMfTXM';

    const member = state.currentMember;
    const entries = getMemberEntries(member);
    if (!entries.length) {
        showToast('Chưa có dữ liệu tập luyện để phân tích.', 'error');
        return;
    }

    // Summary logic
    const recent = entries.slice(0, 40);
    const groupVol = {};
    const exMax = {};
    recent.forEach(e => {
        const exInfo = findExerciseByName(e.exercise);
        const grp = exInfo ? getPrimaryMuscleGroup(exInfo) : 'other';
        const label = MUSCLE_FILTERS[grp] ? MUSCLE_FILTERS[grp].label : 'Khác';
        groupVol[label] = (groupVol[label] || 0) + calcVol(e);
        
        e.setsData.forEach(s => {
            if(s.completed && s.w) {
                exMax[e.exercise] = Math.max(exMax[e.exercise] || 0, s.w);
            }
        });
    });

    let promptText = `Bạn là HLV (Gym Coach) chuyên nghiệp. Hãy phân tích ngắn gọn, súc tích (tối đa 250 từ) bằng tiếng Việt dựa trên dữ liệu 40 bài tập gần đây của hội viên tên ${member}.\n\n`;
    promptText += `- Phân bổ Volume: ${Object.entries(groupVol).map(([k,v])=>`${k}: ${Math.round(v)}kg`).join(', ')}\n`;
    promptText += `- Thành tích Tạ nặng nhất (Max/PR): ${Object.entries(exMax).map(([k,v])=>`${k}: ${v}kg`).join(', ')}\n\n`;
    promptText += `Yêu cầu:\n1. Đánh giá nhanh điểm mạnh (dựa trên mức tạ và volume).\n2. Phân tích điểm yếu/mất cân bằng cơ bắp nếu có.\n3. Gợi ý 1-2 bài tập thiết thực nên bổ sung vào lịch tập tiếp theo để cải thiện điểm yếu.`;

    btn.disabled = true;
    btn.innerHTML = `⏳ Đang kết nối Gemini AI...`;
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });
        
        if (response.status === 400 || response.status === 403) {
            throw new Error('API Key bị chặn hoặc đã giới hạn.');
        }
        if (!response.ok) throw new Error(`Lỗi HTTP ${response.status}`);
        
        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;
        
        resultDiv.style.display = 'block';
        
        // Simple Markdown parser for basic formatting
        let html = content
            .replace(/### (.*)/g, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\* (.*)/g, '\n<li>$1</li>')
            .replace(/\n- (.*)/g, '\n<li>$1</li>')
            .replace(/\n\n/g, '<br><br>');
            
        resultDiv.innerHTML = html;
        showToast('Phân tích hoàn tất!', 'success');
        
    } catch (e) {
        showToast('Lỗi AI: ' + e.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<span>✨ Phân tích lại bằng Gemini</span>`;
    }
}

function refreshAnalysis() {
    renderPRBoard();
    renderProgression();
    renderWeakPoints();
}

// ============================================================
// EVENT LISTENERS
// ============================================================
window.deleteDashEntry = async function(id, name) {
    if (await confirmDialog('Xác nhận xóa', `Xóa bài "${name}"?`)) {
        await deleteEntry(state.currentMember, id);
        showToast('Đã xóa!', 'info');
        refreshDashboard();
    }
};

window.genSets = function(btn) {
    const exRow = btn.closest('tr.log-ex-row');
    const exId = exRow.dataset.exId;
    const sets = parseInt(exRow.querySelector('.setup-sets').value) || 0;
    const reps = parseInt(exRow.querySelector('.setup-reps').value) || 0;
    if (sets <= 0 || reps <= 0) { showToast('Vui lòng nhập số Set và Rep!', 'error'); return; }
    
    document.querySelectorAll(`tr[data-parent-ex="${exId}"]`).forEach(r => r.remove());
    
    let html = '';
    for (let i = 1; i <= sets; i++) {
        html += `<tr class="set-detail-row" data-parent-ex="${exId}">
            <td class="col-num"><span class="set-num-badge">${i}</span></td>
            <td class="set-label-td">Set ${i}</td>
            <td><input type="number" class="tbl-input set-rep-val" value="${reps}" min="1"></td>
            <td><input type="number" class="tbl-input set-weight-val" placeholder="kg" min="0" step="0.5"></td>
            <td><button type="button" class="btn-tick-set" onclick="this.closest('tr').classList.toggle('completed'); this.textContent = this.closest('tr').classList.contains('completed') ? '✅' : '○'">○</button></td>
        </tr>`;
    }
    html += `<tr class="set-save-row" data-parent-ex="${exId}">
        <td colspan="5">
            <button type="button" class="btn-save-row-ex" data-ex-id="${exId}" onclick="window.saveSets(this)">
                💾 Lưu bài: <em>${exRow.dataset.exName}</em>
            </button>
        </td>
    </tr>`;
    
    exRow.insertAdjacentHTML('afterend', html);
    btn.textContent = '↺ Cập nhật';
};

window.saveSets = async function(btn) {
    const exId = btn.dataset.exId;
    const exRow = document.querySelector(`tr.log-ex-row[data-ex-id="${exId}"]`);
    if (!exRow) { showToast('Không tìm thấy bài tập!', 'error'); return; }
    
    const exName = exRow.dataset.exName;
    const exInfo = findExerciseByName(exName);
    const targetSets = parseInt(exRow.querySelector('.setup-sets').value) || 0;
    const targetReps = parseInt(exRow.querySelector('.setup-reps').value) || 0;
    const setRows = document.querySelectorAll(`tr.set-detail-row[data-parent-ex="${exId}"]`);
    
    if (setRows.length === 0) { showToast('Chưa tạo Set!', 'error'); return; }
    
    const setsData = [];
    setRows.forEach((row, idx) => {
        setsData.push({
            setNo: idx + 1,
            reps: parseInt(row.querySelector('.set-rep-val').value) || 0,
            weight: parseFloat(row.querySelector('.set-weight-val').value) || 0,
            completed: row.classList.contains('completed')
        });
    });
    
    if (!setsData.some(s => s.completed)) { showToast('Tick ít nhất 1 Set hoàn thành!', 'error'); return; }
    
    const entry = {
        date: getSelectedDate(),
        workoutType: exInfo ? exInfo.workoutType : 1,
        exercise: exName,
        targetSets, targetReps, setsData, notes: ''
    };
    
    btn.disabled = true;
    btn.innerHTML = '✅ Đã lưu!';
    
    await addEntry(state.currentMember, entry);
    // Auto-detect PR
    setTimeout(() => {
        const allEx = getMemberEntries(state.currentMember).filter(e => e.exercise === exName);
        if (allEx.length >= 2) {
            const prevEntries = allEx.slice(1);
            const prevMaxW = Math.max(0, ...prevEntries.map(e => calcMaxW(e)));
            const prevMaxVol = Math.max(0, ...prevEntries.map(e => calcVol(e)));
            const newMaxW = calcMaxW(allEx[0]);
            const newVol = calcVol(allEx[0]);
            if (newMaxW > prevMaxW) showToast('\uD83C\uDFC6 K\u1ef7 l\u1ee5c m\u1edbi! ' + exName + ': ' + newMaxW + 'kg!', 'success');
            else if (newVol > prevMaxVol) showToast('\uD83C\uDFC6 K\u1ef7 l\u1ee5c Volume m\u1edbi! ' + exName + '!', 'success');
        }
    }, 800);

    showToast(`Đã lưu "${exName}"!`);
    
    // Gather all rows belonging to this exercise and animate them out
    const rowsToRemove = [exRow, ...Array.from(document.querySelectorAll(`tr[data-parent-ex="${exId}"]`))];
    rowsToRemove.forEach(r => {
        r.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        r.style.opacity = '0';
        r.style.transform = 'translateX(16px)';
    });
    setTimeout(() => {
        rowsToRemove.forEach(r => r.remove());
        updateProgress();
        updateVolumeSummary();
        renderLogHistory();
        // If no exercises left: show done banner
        const tbody = document.getElementById('log-ex-tbody');
        if (tbody && tbody.querySelectorAll('tr.log-ex-row').length === 0) {
            const wrap = document.getElementById('dynamic-log-list');
            if (wrap && !wrap.querySelector('.all-done-msg')) {
                const msg = document.createElement('div');
                msg.className = 'all-done-msg';
                msg.innerHTML = '🎉 Xong buổi tập! Chào mừng!';
                wrap.prepend(msg);
            }
        }
    }, 380);
};

window.openEntryModal = function(entryId) {
    const allEntries = getMemberEntries(state.currentMember);
    const entry = allEntries.find(e => e.id === entryId);
    if (!entry) return;
    
    document.getElementById('modal-ex-name').textContent = entry.exercise;
    document.getElementById('modal-ex-date').textContent = fmtDate(entry.date);
    
    // Summary stats
    const totalSets = calcSets(entry);
    const totalVol = calcVol(entry);
    const maxW = calcMaxW(entry);
    const targetSets = entry.targetSets || totalSets;
    const targetReps = entry.targetReps || 0;
    
    document.getElementById('modal-summary').innerHTML = `
        <div class="modal-stat"><span>🎯 Mục tiêu</span><strong>${targetSets} set × ${targetReps} rep</strong></div>
        <div class="modal-stat"><span>✅ Hoàn thành</span><strong>${totalSets} / ${targetSets} set</strong></div>
        <div class="modal-stat"><span>💪 Tạ tối đa</span><strong>${maxW} kg</strong></div>
        <div class="modal-stat"><span>⚡ Volume</span><strong>${fmtNum(Math.round(totalVol))} kg</strong></div>
    `;
    
    // Per-set detail
    if (entry.setsData && entry.setsData.length > 0) {
        document.getElementById('modal-sets').innerHTML = `
            <h4 style="color:var(--text-2); margin-bottom:12px; font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em;">Chi tiết từng Set</h4>
            ${entry.setsData.map(s => `
                <div class="modal-set-row ${s.completed ? 'done' : 'skipped'}">
                    <span class="modal-set-label">Set ${s.setNo}</span>
                    <span>${s.reps} rep</span>
                    <span>${s.weight > 0 ? s.weight + ' kg' : '—'}</span>
                    <span class="modal-set-badge">${s.completed ? '✅ Đạt' : '❌ Bỏ'}</span>
                </div>
            `).join('')}
        `;
    } else {
        // Old format: single entry
        document.getElementById('modal-sets').innerHTML = `
            <div class="modal-set-row done">
                <span class="modal-set-label">Tổng cộng</span>
                <span>${entry.reps || calcReps(entry)} rep</span>
                <span>${entry.weight || maxW} kg</span>
                <span class="modal-set-badge">✅ Đạt</span>
            </div>
        `;
    }
    
    // Delete button inside modal
    const existing = document.getElementById('modal-delete-btn');
    if (existing) existing.remove();
    const delBtn = document.createElement('button');
    delBtn.id = 'modal-delete-btn';
    delBtn.className = 'btn-danger';
    delBtn.style.cssText = 'width:100%; margin-top:20px; padding:12px;';
    delBtn.textContent = '🗑️ Xóa bài tập này';
    delBtn.onclick = async () => {
        if (await confirmDialog('Xác nhận xóa', 'Bạn có chắc muốn xóa bài này?')) {
            await deleteEntry(state.currentMember, entryId);
            document.getElementById('entry-modal-overlay').style.display = 'none';
            showToast('Đã xóa!', 'info');
            refreshLog();
        }
    };
    document.getElementById('entry-modal-box').appendChild(delBtn);
    
    document.getElementById('entry-modal-overlay').style.display = 'flex';
};

// ============================================================
// RENDER SUB-FILTERS
// ============================================================
function renderSubFilters() {
    const container = document.getElementById('sub-muscle-filters');
    const subs = SUB_FILTERS[state.muscleFilter] || null;
    if (!subs) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }
    container.style.display = 'flex';
    container.innerHTML = subs.map(s =>
        `<button class="sub-muscle-btn ${state.subFilter===s.id?'active':''}" data-sub="${s.id}">${s.label}</button>`
    ).join('');
    // Re-sync active state
    container.querySelectorAll('.sub-muscle-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.sub === state.subFilter)
    );
}

function initEvents() {
    const datePicker = document.getElementById('log-date-picker');
    if (datePicker) {
        datePicker.value = todayStr();
        datePicker.addEventListener('change', refreshLog);
    }
    document.getElementById('exercise-search').addEventListener('input', e => {
        state.searchQuery = e.target.value;
        renderExercises();
    });
    document.querySelectorAll('.nav-tab').forEach(t => t.addEventListener('click', () => navigateTo(t.dataset.page)));
    document.getElementById('prev-week').addEventListener('click', () => { state.weekOffset--; renderAttendance(); });
    document.getElementById('next-week').addEventListener('click', () => { state.weekOffset++; renderAttendance(); });

    document.getElementById('member-pills').addEventListener('click', e => { const p=e.target.closest('.member-pill'); if(!p) return; state.currentMember=p.dataset.member; syncMemberPills(); refreshDashboard(); });
    document.getElementById('log-member-pills').addEventListener('click', e => { const p=e.target.closest('.member-pill'); if(!p) return; state.currentMember=p.dataset.member; syncMemberPills(); refreshLog(); });

    document.getElementById('muscle-filters').addEventListener('click', e => { const btn=e.target.closest('.muscle-btn'); if(!btn) return; state.muscleFilter=btn.dataset.group; state.subFilter='all'; document.querySelectorAll('.muscle-btn').forEach(b=>b.classList.toggle('active',b===btn)); renderSubFilters(); renderExercises(); });
    document.getElementById('sub-muscle-filters').addEventListener('click', e => { const btn=e.target.closest('.sub-muscle-btn'); if(!btn) return; state.subFilter=btn.dataset.sub; renderSubFilters(); renderExercises(); });

    document.getElementById('sort-difficulty').addEventListener('change', e => { state.difficultySort = e.target.value; renderExercises(); });

    document.getElementById('progression-exercise-select').addEventListener('change', e => {
        state.progressionExercise = e.target.value;
        renderProgression();
    });

    document.getElementById('btn-run-gemini-analysis').addEventListener('click', runGeminiAnalysis);


    document.getElementById('exercise-grid').addEventListener('click', e => { if(e.target.closest('.btn-video')) return; const card=e.target.closest('.exercise-card'); if(card) toggleExerciseSelection(card.dataset.exId); });

    document.getElementById('btn-clear-selection').addEventListener('click', () => { state.selectedExercises=[]; renderExercises(); showToast('Đã xóa tất cả','info'); });
    document.getElementById('btn-confirm-selection').addEventListener('click', confirmSelection);

    document.getElementById('btn-goto-exercises').addEventListener('click', () => navigateTo('exercises'));
    const addMoreBtn = document.getElementById('btn-add-more-exercises');
    if (addMoreBtn) addMoreBtn.addEventListener('click', () => navigateTo('exercises'));

    // History list events handled by openEntryModal inline
    const histList = document.getElementById('history-list');
    if (histList) histList.addEventListener('click', () => {});

    document.getElementById('log-history-filter').addEventListener('change', renderLogHistory);
    document.getElementById('chart-filter').addEventListener('change', updateDashboardCharts);
    document.getElementById('btn-export-csv').addEventListener('click', exportCSV);

    document.getElementById('btn-delete-latest').addEventListener('click', async () => {
        const entries = getMemberEntries(state.currentMember);
        if (!entries.length) { showToast('Không có bài tập nào!', 'error'); return; }
        const latest = entries[0];
        if (await confirmDialog('Xóa bài gần nhất', `Xóa "${latest.exercise}" ngày ${fmtDate(latest.date)}?`)) {
            await deleteEntry(state.currentMember, latest.id);
            showToast('Đã xóa bài gần nhất!', 'info');
            refreshDashboard();
        }
    });
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

// ES Modules are deferred — DOM is always ready by the time this runs.
// Using readyState check as a safe fallback to ensure init() is always called.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

