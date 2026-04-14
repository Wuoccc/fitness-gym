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

const IMG_BASE = 'https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises';

// ============================================================
// EXERCISE DATABASE — with real images
// ============================================================
const EXERCISES = {
  "1": [
    {
      "id": "Anti-Gravity_Press",
      "name": "Anti-Gravity Press",
      "vi": "Anti-Gravity Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đặt một thanh trên mặt đất phía sau đầu ghế nghiêng. Nằm úp mặt xuống ghế. Với tư thế cầm chắc chắn, nhấc thanh tạ lên khỏi sàn. F...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Anti-Gravity_Press"
    },
    {
      "id": "Arnold_Dumbbell_Press",
      "name": "Arnold Dumbbell Press",
      "vi": "Arnold Dumbbell Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Ngồi trên ghế tập có tựa lưng và giữ hai quả tạ trước mặt, ngang ngực với lòng bàn tay hướng về phía cơ thể và...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Arnold_Dumbbell_Press"
    },
    {
      "id": "Around_The_Worlds",
      "name": "Around The Worlds",
      "vi": "Around The Worlds",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Nằm xuống một chiếc ghế phẳng, mỗi tay cầm một quả tạ với lòng bàn tay hướng lên trần nhà. Mẹo: Cánh tay của bạn phải song song với ...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Around_The_Worlds"
    },
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
      "id": "Barbell_Guillotine_Bench_Press",
      "name": "Barbell Guillotine Bench Press",
      "vi": "Barbell Guillotine Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Dùng tay cầm có chiều rộng vừa phải (tay cầm tạo góc 90 độ ở giữa chuyển động giữa cẳng tay và bắp tay), nâng thanh đòn lên...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Barbell_Guillotine_Bench_Press"
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
      "id": "Barbell_Incline_Shoulder_Raise",
      "name": "Barbell Incline Shoulder Raise",
      "vi": "Barbell Incline Shoulder Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên Ghế nghiêng. Sử dụng tay cầm có chiều rộng trung bình (tay cầm rộng hơn một chút so với chiều rộng vai), nhấc thanh ra khỏi giá và giữ thẳng...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Barbell_Incline_Shoulder_Raise"
    },
    {
      "id": "Barbell_Rear_Delt_Row",
      "name": "Barbell Rear Delt Row",
      "vi": "Barbell Rear Delt Row",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đứng thẳng trong khi cầm thanh tạ với tay cầm rộng (cao hơn chiều rộng vai) và bằng tay (lòng bàn tay hướng vào cơ thể). Cong đầu gối một chút và...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Barbell_Rear_Delt_Row"
    },
    {
      "id": "Barbell_Shoulder_Press",
      "name": "Barbell Shoulder Press",
      "vi": "Barbell Shoulder Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Ngồi trên một chiếc ghế dài có tựa lưng trên giá ngồi xổm. Đặt thanh tạ ở độ cao vừa phải trên đầu của bạn. Nắm lấy thanh tạ bằng tay cầm thẳng (...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Barbell_Shoulder_Press"
    },
    {
      "id": "Battling_Ropes",
      "name": "Battling Ropes",
      "vi": "Battling Ropes",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Đối với bài tập này, bạn sẽ cần một sợi dây nặng neo ở tâm cách đó 15-20 feet. Đứng trước sợi dây, mỗi tay cầm một đầu sợi dây...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Battling_Ropes"
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
      "id": "Bent-Arm_Dumbbell_Pullover",
      "name": "Bent-Arm Dumbbell Pullover",
      "vi": "Bent-Arm Dumbbell Pullover",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Chọn một vài quả tạ và đứng thẳng thân và các quả tạ ở bên cạnh bạn dài bằng sải tay với lòng bàn tay hướng về phía bạn. Đây là...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Bent-Arm_Dumbbell_Pullover"
    },
    {
      "id": "Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench",
      "name": "Bent Over Dumbbell Rear Delt Raise With Head On Bench",
      "vi": "Bent Over Dumbbell Rear Delt Raise With Head On Bench",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng thẳng, mỗi tay cầm một quả tạ và đặt một chiếc ghế nghiêng trước mặt. Trong khi giữ thẳng lưng và duy trì...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench"
    },
    {
      "id": "Bent_Over_Low-Pulley_Side_Lateral",
      "name": "Bent Over Low-Pulley Side Lateral",
      "vi": "Bent Over Low-Pulley Side Lateral",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Chọn trọng lượng và giữ tay cầm của ròng rọc thấp bằng tay phải. Gập người ở thắt lưng cho đến khi thân mình gần như song song với sàn. Tôi của bạn...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Bent_Over_Low-Pulley_Side_Lateral"
    },
    {
      "id": "Body-Up",
      "name": "Body-Up",
      "vi": "Body-Up",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Giả sử tư thế plank trên mặt đất. Bạn nên dồn trọng lượng cơ thể lên ngón chân và cẳng tay, giữ thẳng thân. Cẳng tay của bạn...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Body-Up"
    },
    {
      "id": "Body_Tricep_Press",
      "name": "Body Tricep Press",
      "vi": "Body Tricep Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đặt thanh tạ vào giá ở độ cao ngang ngực. Đứng, nắm chặt thanh rộng bằng vai và bước lùi lại một hoặc hai thước, hai chân khép vào nhau và hai tay dang rộng...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Body_Tricep_Press"
    },
    {
      "id": "Bodyweight_Flyes",
      "name": "Bodyweight Flyes",
      "vi": "Bodyweight Flyes",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ chữ z",
      "diff": "Trung bình",
      "desc": "Đặt hai thanh EZ chịu tải bằng nhau trên mặt đất cạnh nhau. Đảm bảo họ có thể lăn. Giả sử tư thế chống đẩy trên các thanh, hỗ trợ...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Bodyweight_Flyes"
    },
    {
      "id": "Bradford_Rocky_Presses",
      "name": "Bradford/Rocky Presses",
      "vi": "Bradford/Rocky Presses",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Ngồi trên Ghế tập quân sự với một thanh ngang ngang vai và tay cầm hướng ra ngoài (lòng bàn tay hướng về phía trước). Mẹo: Tay cầm của bạn phải rộng hơn vai ...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Bradford_Rocky_Presses"
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
      "id": "Cable_Chest_Press",
      "name": "Cable Chest Press",
      "vi": "Cable Chest Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Điều chỉnh trọng lượng đến mức thích hợp và ngồi xuống, nắm lấy tay cầm. Cánh tay trên của bạn phải tạo một góc khoảng 45 độ so với cơ thể, với đầu...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Cable_Chest_Press"
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
      "id": "Cable_Incline_Triceps_Extension",
      "name": "Cable Incline Triceps Extension",
      "vi": "Cable Incline Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Nằm nghiêng trên một chiếc ghế dài quay mặt về phía máy ròng rọc cao có gắn thanh thẳng trên đó. Nắm chặt thanh gắn thẳng phía trên bằng...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Cable_Incline_Triceps_Extension"
    },
    {
      "id": "Cable_Internal_Rotation",
      "name": "Cable Internal Rotation",
      "vi": "Cable Internal Rotation",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Ngồi cạnh một ròng rọc thấp sang một bên (hai chân duỗi thẳng trước mặt hoặc bắt chéo) và nắm lấy phần gắn cáp bằng một tay bằng cánh tay gần nhất với ...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Cable_Internal_Rotation"
    },
    {
      "id": "Cable_Iron_Cross",
      "name": "Cable Iron Cross",
      "vi": "Cable Iron Cross",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách di chuyển các ròng rọc lên vị trí cao, chọn lực cản cần sử dụng và cầm một tay cầm ở mỗi tay. Đứng trực tiếp giữa cả hai ròng rọc...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Cable_Iron_Cross"
    },
    {
      "id": "Cable_Lying_Triceps_Extension",
      "name": "Cable Lying Triceps Extension",
      "vi": "Cable Lying Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Nằm trên một chiếc ghế phẳng và nắm thanh gắn thẳng của ròng rọc thấp với tay nắm hẹp. Mẹo: Cách dễ nhất để làm điều này là có một số...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Cable_Lying_Triceps_Extension"
    },
    {
      "id": "Cable_Rear_Delt_Fly",
      "name": "Cable Rear Delt Fly",
      "vi": "Cable Rear Delt Fly",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Điều chỉnh ròng rọc đến độ cao thích hợp và điều chỉnh trọng lượng. Các ròng rọc phải ở phía trên đầu của bạn. Lấy ròng rọc bên trái bằng tay phải của bạn...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Cable_Rear_Delt_Fly"
    },
    {
      "id": "Cable_Rope_Overhead_Triceps_Extension",
      "name": "Cable Rope Overhead Triceps Extension",
      "vi": "Cable Rope Overhead Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Gắn một sợi dây vào ròng rọc phía dưới của máy ròng rọc. Nắm chặt sợi dây bằng cả hai tay, đưa hai tay ra thẳng phía trên đầu...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Cable_Rope_Overhead_Triceps_Extension"
    },
    {
      "id": "Cable_Rope_Rear-Delt_Rows",
      "name": "Cable Rope Rear-Delt Rows",
      "vi": "Cable Rope Rear-Delt Rows",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Ngồi ở vị trí tương tự trên trạm hàng ròng rọc thấp giống như khi bạn ngồi xếp dây cáp cho lưng. Gắn một sợi dây vào ròng rọc và...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Cable_Rope_Rear-Delt_Rows"
    },
    {
      "id": "Cable_Seated_Lateral_Raise",
      "name": "Cable Seated Lateral Raise",
      "vi": "Cable Seated Lateral Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đặt một chiếc ghế phẳng giữa hai ròng rọc thấp sao cho khi bạn nằm trên đó, ngực của bạn sẽ thẳng hàng với các ròng rọc cáp. Nằm phẳng trên b...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Cable_Seated_Lateral_Raise"
    },
    {
      "id": "Cable_Shoulder_Press",
      "name": "Cable Shoulder Press",
      "vi": "Cable Shoulder Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Di chuyển dây cáp xuống đáy tháp và chọn trọng lượng phù hợp. Đứng trực tiếp giữa những người đứng thẳng. Nắm chặt các dây cáp và giữ chúng...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Cable_Shoulder_Press"
    },
    {
      "id": "Car_Drivers",
      "name": "Car Drivers",
      "vi": "Car Drivers",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Khi đứng thẳng, hai tay cầm đĩa tạ ở vị trí 3 và 9 giờ. Lòng bàn tay của bạn phải hướng vào nhau và cánh tay của bạn phải...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Car_Drivers"
    },
    {
      "id": "Clean_and_Press",
      "name": "Clean and Press",
      "vi": "Clean and Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Giữ tư thế rộng bằng vai, đầu gối ở trong cánh tay. Bây giờ, trong khi giữ lưng thẳng, uốn cong đầu gối và hông để bạn có thể nắm lấy thanh đòn...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Clean_and_Press"
    },
    {
      "id": "Clock_Push-Up",
      "name": "Clock Push-Up",
      "vi": "Clock Push-Up",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Di chuyển vào tư thế nằm sấp trên sàn, đỡ trọng lượng của bạn trên tay và ngón chân. Cánh tay của bạn phải được mở rộng hoàn toàn với bàn tay ôm lấy vai...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Clock_Push-Up"
    },
    {
      "id": "Close-Grip_Barbell_Bench_Press",
      "name": "Close-Grip Barbell Bench Press",
      "vi": "Close-Grip Barbell Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên một chiếc ghế phẳng. Dùng tay nắm chặt (khoảng rộng bằng vai), nhấc thanh đòn ra khỏi giá và giữ thẳng qua người với cánh tay khóa chặt. ...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Close-Grip_Barbell_Bench_Press"
    },
    {
      "id": "Close-Grip_Dumbbell_Press",
      "name": "Close-Grip Dumbbell Press",
      "vi": "Close-Grip Dumbbell Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Chọn một vài quả tạ và đứng thẳng thân và các quả tạ ở bên cạnh bạn dài bằng sải tay với lòng bàn tay hướng về phía bạn. Đây là...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Close-Grip_Dumbbell_Press"
    },
    {
      "id": "Close-Grip_EZ-Bar_Press",
      "name": "Close-Grip EZ-Bar Press",
      "vi": "Close-Grip EZ-Bar Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ chữ z",
      "diff": "Dễ",
      "desc": "Nằm trên ghế phẳng với thanh EZ có trọng lượng phù hợp. Dùng một tay cầm hẹp nâng thanh đòn lên và giữ thẳng trên thân mình bằng...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Close-Grip_EZ-Bar_Press"
    },
    {
      "id": "Close-Grip_Push-Up_off_of_a_Dumbbell",
      "name": "Close-Grip Push-Up off of a Dumbbell",
      "vi": "Close-Grip Push-Up off of a Dumbbell",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Nằm trên sàn và đặt tay lên một quả tạ thẳng đứng. Hỗ trợ trọng lượng của bạn trên ngón chân và bàn tay, giữ cho thân mình cứng và khuỷu tay của bạn ở ...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Close-Grip_Push-Up_off_of_a_Dumbbell"
    },
    {
      "id": "Cuban_Press",
      "name": "Cuban Press",
      "vi": "Cuban Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Mỗi tay cầm một quả tạ với tay cầm phát âm ở tư thế đứng. Nâng cánh tay trên của bạn lên sao cho chúng song song với sàn, cho phép bạn ...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Cuban_Press"
    },
    {
      "id": "Decline_Barbell_Bench_Press",
      "name": "Decline Barbell Bench Press",
      "vi": "Decline Barbell Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Cố định chân của bạn ở cuối băng ghế và từ từ nằm xuống băng ghế. Sử dụng tay cầm có chiều rộng trung bình (tay cầm tạo góc 90 độ trong...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Decline_Barbell_Bench_Press"
    },
    {
      "id": "Decline_Close-Grip_Bench_To_Skull_Crusher",
      "name": "Decline Close-Grip Bench To Skull Crusher",
      "vi": "Decline Close-Grip Bench To Skull Crusher",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Cố định chân của bạn ở cuối băng ghế và từ từ nằm xuống băng ghế. Sử dụng tay cầm gần (tay cầm hơi nhỏ hơn chiều rộng vai...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Decline_Close-Grip_Bench_To_Skull_Crusher"
    },
    {
      "id": "Decline_Dumbbell_Bench_Press",
      "name": "Decline Dumbbell Bench Press",
      "vi": "Decline Dumbbell Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Cố định hai chân của bạn ở cuối băng ghế và nằm xuống với một quả tạ ở mỗi tay trên đùi. Lòng bàn tay của bạn sẽ hướng về phía...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Decline_Dumbbell_Bench_Press"
    },
    {
      "id": "Decline_Dumbbell_Flyes",
      "name": "Decline Dumbbell Flyes",
      "vi": "Decline Dumbbell Flyes",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Cố định hai chân của bạn ở cuối băng ghế và nằm xuống với một quả tạ ở mỗi tay trên đùi. Lòng bàn tay của bạn sẽ hướng về phía...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Decline_Dumbbell_Flyes"
    },
    {
      "id": "Decline_Dumbbell_Triceps_Extension",
      "name": "Decline Dumbbell Triceps Extension",
      "vi": "Decline Dumbbell Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Cố định hai chân của bạn ở cuối băng ghế và nằm xuống với một quả tạ ở mỗi tay trên đùi. Lòng bàn tay của bạn sẽ hướng về phía...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Decline_Dumbbell_Triceps_Extension"
    },
    {
      "id": "Decline_EZ_Bar_Triceps_Extension",
      "name": "Decline EZ Bar Triceps Extension",
      "vi": "Decline EZ Bar Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Cố định chân của bạn ở cuối băng ghế và từ từ nằm xuống băng ghế. Sử dụng tay cầm gần (tay cầm hơi nhỏ hơn chiều rộng vai...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Decline_EZ_Bar_Triceps_Extension"
    },
    {
      "id": "Decline_Push-Up",
      "name": "Decline Push-Up",
      "vi": "Decline Push-Up",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm úp mặt xuống sàn và đặt hai tay cách nhau khoảng 36 inch trong khi giữ thân mình cao bằng chiều dài của cánh tay. Di chuyển chân của bạn lên một cái hộp hoặc băng ghế....",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Decline_Push-Up"
    },
    {
      "id": "Decline_Smith_Press",
      "name": "Decline Smith Press",
      "vi": "Decline Smith Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đặt một chiếc ghế dài bên dưới máy Smith. Bây giờ hãy đặt thanh tạ ở độ cao mà bạn có thể với tới khi nằm và cánh tay của bạn gần như đã căng đầy...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Decline_Smith_Press"
    },
    {
      "id": "Dip_Machine",
      "name": "Dip Machine",
      "vi": "Dip Machine",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Ngồi chắc chắn trong máy nhúng, chọn trọng lượng và nắm chắc tay cầm. Bây giờ giữ khuỷu tay của bạn ở hai bên để tập trung vào...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Dip_Machine"
    },
    {
      "id": "Dips_-_Chest_Version",
      "name": "Dips - Chest Version",
      "vi": "Dips - Chest Version",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Đối với bài tập này, bạn sẽ cần sử dụng các thanh song song. Để vào vị trí ban đầu, hãy giữ cơ thể ở độ dài sải tay (khóa cánh tay) phía trên...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Dips_-_Chest_Version"
    },
    {
      "id": "Dips_-_Triceps_Version",
      "name": "Dips - Triceps Version",
      "vi": "Dips - Triceps Version",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Để vào vị trí bắt đầu, hãy giữ cơ thể ở độ dài một cánh tay với cánh tay gần như khóa chặt phía trên các thanh. Bây giờ, hít vào và từ từ hạ người xuống...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Dips_-_Triceps_Version"
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
      "id": "Dumbbell_Bench_Press_with_Neutral_Grip",
      "name": "Dumbbell Bench Press with Neutral Grip",
      "vi": "Dumbbell Bench Press with Neutral Grip",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi tay cầm một quả tạ và nằm ngửa trên ghế phẳng. Bàn chân của bạn phải đặt phẳng trên sàn và xương bả vai của bạn rút lại. Duy trì một n...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Dumbbell_Bench_Press_with_Neutral_Grip"
    },
    {
      "id": "Dumbbell_Flyes",
      "name": "Dumbbell Flyes",
      "vi": "Dumbbell Flyes",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nằm xuống một chiếc ghế phẳng với một quả tạ ở mỗi tay đặt trên đùi. Lòng bàn tay của bạn sẽ hướng vào nhau. Sau đó, sử dụng...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Dumbbell_Flyes"
    },
    {
      "id": "Dumbbell_Incline_Shoulder_Raise",
      "name": "Dumbbell Incline Shoulder Raise",
      "vi": "Dumbbell Incline Shoulder Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ngồi trên Ghế nghiêng trong khi mỗi tay cầm một quả tạ ở phía trên đùi. Nhấc chân lên để đá tạ lên vai và nghiêng người...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Dumbbell_Incline_Shoulder_Raise"
    },
    {
      "id": "Dumbbell_Lying_Rear_Lateral_Raise",
      "name": "Dumbbell Lying Rear Lateral Raise",
      "vi": "Dumbbell Lying Rear Lateral Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Trong khi cầm một quả tạ ở mỗi tay, hãy đặt ngực xuống trên một ghế hơi nghiêng (khoảng 15 độ khi đo so với sàn) và có thể điều chỉnh được...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Dumbbell_Lying_Rear_Lateral_Raise"
    },
    {
      "id": "Dumbbell_Raise",
      "name": "Dumbbell Raise",
      "vi": "Dumbbell Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi tay cầm một quả tạ và đứng thẳng, hai tay dang rộng sang hai bên, khuỷu tay hơi cong và lưng thẳng. Cái này ...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Dumbbell_Raise"
    },
    {
      "id": "Dumbbell_Scaption",
      "name": "Dumbbell Scaption",
      "vi": "Dumbbell Scaption",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Bài tập khắc phục này giúp tăng cường cơ bắp giúp ổn định xương bả vai của bạn. Giữ một trọng lượng nhẹ trong mỗi tay, treo ở hai bên. Thu của bạn...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Dumbbell_Scaption"
    },
    {
      "id": "Dumbbell_Shoulder_Press",
      "name": "Dumbbell Shoulder Press",
      "vi": "Dumbbell Shoulder Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Trong khi mỗi tay cầm một quả tạ, hãy ngồi trên ghế ép quân sự hoặc ghế tiện ích có hỗ trợ lưng. Đặt tạ thẳng lên trên người bạn...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Dumbbell_Shoulder_Press"
    },
    {
      "id": "Dumbbell_Tricep_Extension_-Pronated_Grip",
      "name": "Dumbbell Tricep Extension -Pronated Grip",
      "vi": "Dumbbell Tricep Extension -Pronated Grip",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nằm xuống một chiếc ghế phẳng, cầm hai quả tạ ngay trên vai. Cánh tay của bạn phải được mở rộng hoàn toàn và tạo thành một góc 90 độ so với ...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Dumbbell_Tricep_Extension_-Pronated_Grip"
    },
    {
      "id": "EZ-Bar_Skullcrusher",
      "name": "EZ-Bar Skullcrusher",
      "vi": "EZ-Bar Skullcrusher",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ chữ z",
      "diff": "Dễ",
      "desc": "Chạy một dải xung quanh một trụ cố định giống như một giá đỡ ngồi xổm. Nắm lấy tay cầm của dây đeo và lùi lại để độ căng của dây đeo tăng lên. Mở rộng...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "EZ-Bar_Skullcrusher"
    },
    {
      "id": "External_Rotation",
      "name": "External Rotation",
      "vi": "External Rotation",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nằm nghiêng trên ghế phẳng, một tay cầm tạ và tay kia gập lại trên ghế để bạn có thể tựa đầu vào đó. Uốn cong ...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "External_Rotation"
    },
    {
      "id": "External_Rotation_with_Cable",
      "name": "External Rotation with Cable",
      "vi": "External Rotation with Cable",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Điều chỉnh cáp có cùng độ cao với khuỷu tay của bạn. Đứng nghiêng bên trái về phía ban nhạc cách ban nhạc vài bước chân. Nắm chặt tay cầm bằng tay phải,...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "External_Rotation_with_Cable"
    },
    {
      "id": "Face_Pull",
      "name": "Face Pull",
      "vi": "Face Pull",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Đối mặt với một ròng rọc cao có gắn một sợi dây hoặc tay cầm kép, kéo vật nặng thẳng về phía mặt, tách hai tay ra khi làm như vậy. Hãy giữ lấy bạn...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Face_Pull"
    },
    {
      "id": "Flat_Bench_Cable_Flyes",
      "name": "Flat Bench Cable Flyes",
      "vi": "Flat Bench Cable Flyes",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Đặt một chiếc ghế phẳng giữa hai ròng rọc thấp sao cho khi bạn nằm trên đó, ngực của bạn sẽ thẳng hàng với các ròng rọc cáp. Nằm phẳng trên b...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Flat_Bench_Cable_Flyes"
    },
    {
      "id": "Front_Cable_Raise",
      "name": "Front Cable Raise",
      "vi": "Front Cable Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Chọn trọng lượng trên máy ròng rọc thấp và nắm phần đính kèm cáp bằng một tay được gắn vào ròng rọc thấp bằng tay trái của bạn. Hãy quay mặt đi...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Front_Cable_Raise"
    },
    {
      "id": "Front_Dumbbell_Raise",
      "name": "Front Dumbbell Raise",
      "vi": "Front Dumbbell Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Chọn một vài quả tạ và đứng thẳng thân mình và các quả tạ ở phía trước đùi của bạn dài bằng sải tay với lòng bàn tay hướng về phía ...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Front_Dumbbell_Raise"
    },
    {
      "id": "Front_Incline_Dumbbell_Raise",
      "name": "Front Incline Dumbbell Raise",
      "vi": "Front Incline Dumbbell Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ngồi xuống một chiếc ghế nghiêng với độ nghiêng được đặt ở bất kỳ đâu trong khoảng từ 30 đến 60 độ trong khi mỗi tay cầm một quả tạ. Mẹo: Bạn có thể thay đổi...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Front_Incline_Dumbbell_Raise"
    },
    {
      "id": "Front_Plate_Raise",
      "name": "Front Plate Raise",
      "vi": "Front Plate Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Trong khi đứng thẳng, hai tay cầm đĩa tạ ở vị trí 3 và 9 giờ. Lòng bàn tay của bạn phải hướng vào nhau và cánh tay của bạn phải ...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Front_Plate_Raise"
    },
    {
      "id": "Front_Raise_And_Pullover",
      "name": "Front Raise And Pullover",
      "vi": "Front Raise And Pullover",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Nằm trên một chiếc ghế phẳng trong khi cầm một thanh tạ bằng lòng bàn tay hướng xuống cách nhau khoảng 15 inch. Đặt thanh đòn lên đùi trên, duỗi thẳng cánh tay...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Front_Raise_And_Pullover"
    },
    {
      "id": "Front_Two-Dumbbell_Raise",
      "name": "Front Two-Dumbbell Raise",
      "vi": "Front Two-Dumbbell Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Chọn một vài quả tạ và đứng thẳng thân mình và các quả tạ ở phía trước đùi của bạn dài bằng sải tay với lòng bàn tay hướng về phía ...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Front_Two-Dumbbell_Raise"
    },
    {
      "id": "Hammer_Grip_Incline_DB_Bench_Press",
      "name": "Hammer Grip Incline DB Bench Press",
      "vi": "Hammer Grip Incline DB Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nằm phẳng trên sàn với hai cánh tay đặt dọc theo hai bên. Bây giờ uốn cong đầu gối của bạn một góc 75 độ và nhấc chân lên khỏi sàn khoảng 2 ...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Hammer_Grip_Incline_DB_Bench_Press"
    },
    {
      "id": "Handstand_Push-Ups",
      "name": "Handstand Push-Ups",
      "vi": "Handstand Push-Ups",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Khó",
      "desc": "Dựa lưng vào tường, uốn cong ở thắt lưng và đặt cả hai tay xuống sàn rộng bằng vai. Tự mình dựa vào tường bằng cánh tay của bạn...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Handstand_Push-Ups"
    },
    {
      "id": "Incline_Barbell_Triceps_Extension",
      "name": "Incline Barbell Triceps Extension",
      "vi": "Incline Barbell Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Giữ một thanh tạ bằng tay cầm (lòng bàn tay hướng xuống) gần nhau hơn một chút so với chiều rộng của vai. Nằm ngửa trên ghế nghiêng đặt ở một góc nào đó ...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Incline_Barbell_Triceps_Extension"
    },
    {
      "id": "Incline_Cable_Chest_Press",
      "name": "Incline Cable Chest Press",
      "vi": "Incline Cable Chest Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Điều chỉnh trọng lượng đến mức thích hợp và ngồi xuống, nắm lấy tay cầm. Cánh tay trên của bạn phải tạo một góc khoảng 45 độ so với cơ thể, với đầu...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Incline_Cable_Chest_Press"
    },
    {
      "id": "Incline_Cable_Flye",
      "name": "Incline Cable Flye",
      "vi": "Incline Cable Flye",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Để vào vị trí bắt đầu, hãy đặt ròng rọc ở mức sàn (mức thấp nhất có thể trên máy nằm dưới thân của bạn). Địa điểm ...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Incline_Cable_Flye"
    },
    {
      "id": "Incline_Dumbbell_Bench_With_Palms_Facing_In",
      "name": "Incline Dumbbell Bench With Palms Facing In",
      "vi": "Incline Dumbbell Bench With Palms Facing In",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nằm phẳng trên sàn với hai cánh tay đặt dọc theo hai bên. Bây giờ uốn cong đầu gối của bạn một góc 75 độ và nhấc chân lên khỏi sàn khoảng 2 ...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Incline_Dumbbell_Bench_With_Palms_Facing_In"
    },
    {
      "id": "Incline_Dumbbell_Flyes",
      "name": "Incline Dumbbell Flyes",
      "vi": "Incline Dumbbell Flyes",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi tay cầm một quả tạ và nằm trên ghế nghiêng được đặt ở góc nghiêng không quá 30 độ. Mở rộng cánh tay của bạn phía trên bạn bằng một...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Incline_Dumbbell_Flyes"
    },
    {
      "id": "Incline_Dumbbell_Flyes_-_With_A_Twist",
      "name": "Incline Dumbbell Flyes - With A Twist",
      "vi": "Incline Dumbbell Flyes - With A Twist",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi tay cầm một quả tạ và nằm trên ghế nghiêng được đặt ở góc nghiêng không quá 30 độ. Mở rộng cánh tay của bạn phía trên bạn bằng một...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Incline_Dumbbell_Flyes_-_With_A_Twist"
    },
    {
      "id": "Incline_Dumbbell_Press",
      "name": "Incline Dumbbell Press",
      "vi": "Incline Dumbbell Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên ghế nghiêng với một quả tạ ở mỗi tay đặt trên đùi. Lòng bàn tay của bạn sẽ hướng vào nhau. Sau đó dùng đùi...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Incline_Dumbbell_Press"
    },
    {
      "id": "Incline_Push-Up",
      "name": "Incline Push-Up",
      "vi": "Incline Push-Up",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đứng đối diện với băng ghế hoặc bục cao vững chắc. Đặt tay lên mép ghế hoặc bục, rộng hơn vai một chút. Đặt bàn chân trước về phía sau...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Incline_Push-Up"
    },
    {
      "id": "Incline_Push-Up_Close-Grip",
      "name": "Incline Push-Up Close-Grip",
      "vi": "Incline Push-Up Close-Grip",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đứng đối diện với thanh máy Smith hoặc bệ nâng chắc chắn ở độ cao thích hợp. Đặt hai tay cạnh nhau trên thanh. Định vị ...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Incline_Push-Up_Close-Grip"
    },
    {
      "id": "Incline_Push-Up_Medium",
      "name": "Incline Push-Up Medium",
      "vi": "Incline Push-Up Medium",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đứng đối diện với thanh máy Smith hoặc bệ nâng chắc chắn ở độ cao thích hợp. Đặt hai tay lên xà, hai tay rộng bằng vai...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Incline_Push-Up_Medium"
    },
    {
      "id": "Incline_Push-Up_Reverse_Grip",
      "name": "Incline Push-Up Reverse Grip",
      "vi": "Incline Push-Up Reverse Grip",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đứng đối diện với thanh máy Smith hoặc bệ nâng chắc chắn ở độ cao thích hợp. Đặt tay lên thanh, lòng bàn tay ngửa lên, tay hướng về phía...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Incline_Push-Up_Reverse_Grip"
    },
    {
      "id": "Incline_Push-Up_Wide",
      "name": "Incline Push-Up Wide",
      "vi": "Incline Push-Up Wide",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đứng đối diện với thanh máy Smith hoặc bệ nâng chắc chắn ở độ cao thích hợp. Đặt tay lên xà, tay rộng hơn vai...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Incline_Push-Up_Wide"
    },
    {
      "id": "Iron_Cross",
      "name": "Iron Cross",
      "vi": "Iron Cross",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": null,
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Iron_Cross"
    },
    {
      "id": "JM_Press",
      "name": "JM Press",
      "vi": "JM Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bắt đầu bài tập giống như cách bạn thực hiện động tác bấm máy trên băng ghế. Bạn sẽ nằm trên một chiếc ghế phẳng trong khi cầm một thanh tạ ở độ dài sải tay (mở rộng hoàn toàn...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "JM_Press"
    },
    {
      "id": "Kneeling_Cable_Triceps_Extension",
      "name": "Kneeling Cable Triceps Extension",
      "vi": "Kneeling Cable Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Đặt một chiếc ghế dài sang một bên trước máy có ròng rọc cao. Giữ thanh thanh thẳng phía trên đầu bằng hai tay cách nhau khoảng 6 inch...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Kneeling_Cable_Triceps_Extension"
    },
    {
      "id": "Leg-Over_Floor_Press",
      "name": "Leg-Over Floor Press",
      "vi": "Leg-Over Floor Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "tạ ấm",
      "diff": "Trung bình",
      "desc": "Nằm trên sàn với một chiếc chuông ấm đặt trên ngực, giữ nó bằng tay cầm. Duỗi chân ở bên làm việc lên chân ở bên không làm việc. Bạn của bạn...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Leg-Over_Floor_Press"
    },
    {
      "id": "Leverage_Chest_Press",
      "name": "Leverage Chest Press",
      "vi": "Leverage Chest Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh ghế phù hợp với chiều cao của bạn. Tay cầm phải ở gần đáy hoặc giữa ngực ở ...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Leverage_Chest_Press"
    },
    {
      "id": "Leverage_Decline_Chest_Press",
      "name": "Leverage Decline Chest Press",
      "vi": "Leverage Decline Chest Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh ghế phù hợp với chiều cao của bạn. Lúc đầu tay cầm phải ở gần đáy ngực ...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Leverage_Decline_Chest_Press"
    },
    {
      "id": "Leverage_Incline_Chest_Press",
      "name": "Leverage Incline Chest Press",
      "vi": "Leverage Incline Chest Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh ghế phù hợp với chiều cao của bạn. Tay cầm phải ở gần đỉnh ngực khi bắt đầu ...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Leverage_Incline_Chest_Press"
    },
    {
      "id": "Leverage_Shoulder_Press",
      "name": "Leverage Shoulder Press",
      "vi": "Leverage Shoulder Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh ghế phù hợp với chiều cao của bạn. Tay cầm phải ở gần đỉnh vai khi bắt đầu ...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Leverage_Shoulder_Press"
    },
    {
      "id": "Low_Cable_Crossover",
      "name": "Low Cable Crossover",
      "vi": "Low Cable Crossover",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đứng giữa một tập hợp các thanh song song. Đặt một tay lên mỗi thanh, sau đó thực hiện một bước nhảy nhỏ để giúp bạn vào vị trí ban đầu bằng cánh tay của mình...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Low_Cable_Crossover"
    },
    {
      "id": "Low_Cable_Triceps_Extension",
      "name": "Low Cable Triceps Extension",
      "vi": "Low Cable Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Chọn mức tạ mong muốn và nằm ngửa trên băng ghế của máy tập chèo thuyền có gắn dây. Đầu của bạn nên hướng về phía...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Low_Cable_Triceps_Extension"
    },
    {
      "id": "Low_Pulley_Row_To_Neck",
      "name": "Low Pulley Row To Neck",
      "vi": "Low Pulley Row To Neck",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Ngồi trên máy tập ròng rọc thấp có gắn dây. Nắm lấy hai đầu sợi dây bằng lòng bàn tay hướng xuống và ngồi thẳng lưng và đầu gối...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Low_Pulley_Row_To_Neck"
    },
    {
      "id": "Lying_Close-Grip_Barbell_Triceps_Extension_Behind_The_Head",
      "name": "Lying Close-Grip Barbell Triceps Extension Behind The Head",
      "vi": "Lying Close-Grip Barbell Triceps Extension Behind The Head",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Trong khi cầm thanh tạ hoặc thanh EZ Curl với tay cầm hướng về phía trước (lòng bàn tay hướng về phía trước), hãy nằm ngửa trên một chiếc ghế phẳng với đầu sát vào đầu...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Lying_Close-Grip_Barbell_Triceps_Extension_Behind_The_Head"
    },
    {
      "id": "Lying_Close-Grip_Barbell_Triceps_Press_To_Chin",
      "name": "Lying Close-Grip Barbell Triceps Press To Chin",
      "vi": "Lying Close-Grip Barbell Triceps Press To Chin",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ chữ z",
      "diff": "Trung bình",
      "desc": "Trong khi cầm thanh tạ hoặc thanh EZ Curl có tay cầm hướng về phía trước (lòng bàn tay hướng về phía trước), hãy nằm ngửa trên một chiếc ghế phẳng với đầu hướng ra khỏi đầu...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Lying_Close-Grip_Barbell_Triceps_Press_To_Chin"
    },
    {
      "id": "Lying_Dumbbell_Tricep_Extension",
      "name": "Lying Dumbbell Tricep Extension",
      "vi": "Lying Dumbbell Tricep Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Mỗi tay cầm một quả tạ và nằm úp mặt trên ghế nghiêng được đặt nghiêng một góc khoảng 30 độ. Hãy để vòng tay ôm lấy bạn...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Lying_Dumbbell_Tricep_Extension"
    },
    {
      "id": "Lying_Face_Down_Plate_Neck_Resistance",
      "name": "Lying Face Down Plate Neck Resistance",
      "vi": "Lying Face Down Plate Neck Resistance",
      "icon": "🏋️",
      "muscles": [
        "Cổ"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Nằm úp mặt, toàn bộ cơ thể thẳng trên một chiếc ghế phẳng trong khi giữ một đĩa tạ phía sau đầu. Mẹo: Bạn sẽ cần phải định vị bản thân sao cho...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Lying_Face_Down_Plate_Neck_Resistance"
    },
    {
      "id": "Lying_Face_Up_Plate_Neck_Resistance",
      "name": "Lying Face Up Plate Neck Resistance",
      "vi": "Lying Face Up Plate Neck Resistance",
      "icon": "🏋️",
      "muscles": [
        "Cổ"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Nằm ngửa trên Ghế nghiêng. Sử dụng tay cầm có chiều rộng trung bình (tay cầm rộng hơn một chút so với chiều rộng vai), nhấc thanh ra khỏi giá và giữ thẳng...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Lying_Face_Up_Plate_Neck_Resistance"
    },
    {
      "id": "Lying_Rear_Delt_Raise",
      "name": "Lying Rear Delt Raise",
      "vi": "Lying Rear Delt Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Trong khi giữ một quả tạ ở mỗi tay, hãy đặt ngực xuống một chiếc ghế phẳng. Đặt lòng bàn tay ở tư thế trung lập (lòng bàn tay hướng về phía bạn...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Lying_Rear_Delt_Raise"
    },
    {
      "id": "Lying_Triceps_Press",
      "name": "Lying Triceps Press",
      "vi": "Lying Triceps Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ chữ z",
      "diff": "Trung bình",
      "desc": "Nằm trên một chiếc ghế phẳng với thanh e-z (sở thích của tôi) hoặc một thanh thẳng đặt trên sàn phía sau đầu và bàn chân của bạn trên sàn. Hãy nắm lấy...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Lying_Triceps_Press"
    },
    {
      "id": "Machine_Bench_Press",
      "name": "Machine Bench Press",
      "vi": "Machine Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Ngồi xuống Máy ép ngực và chọn mức tạ. Bước lên cần gạt do máy cung cấp vì nó sẽ giúp bạn đưa tay cầm về phía trước...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Machine_Bench_Press"
    },
    {
      "id": "Machine_Shoulder_Military_Press",
      "name": "Machine Shoulder (Military) Press",
      "vi": "Machine Shoulder (Military) Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Ngồi xuống Máy ép vai và chọn mức tạ. Nắm tay cầm sang hai bên khi bạn giữ khuỷu tay cong và thẳng hàng với thân mình. ...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Machine_Shoulder_Military_Press"
    },
    {
      "id": "Machine_Triceps_Extension",
      "name": "Machine Triceps Extension",
      "vi": "Machine Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Điều chỉnh ghế đến độ cao thích hợp và lựa chọn trọng lượng của bạn. Đặt cánh tay trên của bạn tựa vào miếng đệm và nắm lấy tay cầm. Đây sẽ là...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Machine_Triceps_Extension"
    },
    {
      "id": "Neck_Press",
      "name": "Neck Press",
      "vi": "Neck Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Nằm ngửa trên một chiếc ghế phẳng. Sử dụng tay cầm có chiều rộng vừa phải (tay cầm tạo góc 90 độ ở giữa chuyển động giữa cẳng tay và ...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Neck_Press"
    },
    {
      "id": "Parallel_Bar_Dip",
      "name": "Parallel Bar Dip",
      "vi": "Parallel Bar Dip",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Đứng giữa một tập hợp các thanh song song. Đặt một tay lên mỗi thanh, sau đó thực hiện một bước nhảy nhỏ để giúp bạn vào vị trí ban đầu bằng cánh tay của mình...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Parallel_Bar_Dip"
    },
    {
      "id": "Power_Partials",
      "name": "Power Partials",
      "vi": "Power Partials",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với thân mình thẳng và một quả tạ trên mỗi tay được giữ ở độ dài cánh tay. Khuỷu tay phải sát với thân mình. Lòng bàn tay...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Power_Partials"
    },
    {
      "id": "Push-Up_Wide",
      "name": "Push-Up Wide",
      "vi": "Push-Up Wide",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "squat",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Hai tay dang rộng, đỡ cơ thể trên ngón chân và tay trong tư thế plank. Khuỷu tay của bạn phải được mở rộng và cơ thể của bạn thẳng. Đừng...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Push-Up_Wide"
    },
    {
      "id": "Push-Ups_-_Close_Triceps_Position",
      "name": "Push-Ups - Close Triceps Position",
      "vi": "Push-Ups - Close Triceps Position",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Nằm úp mặt xuống sàn và đặt hai tay gần hơn chiều rộng vai để có tư thế tay gần. Hãy chắc chắn rằng bạn đang giữ thân mình ở mức ...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Push-Ups_-_Close_Triceps_Position"
    },
    {
      "id": "Push-Ups_With_Feet_Elevated",
      "name": "Push-Ups With Feet Elevated",
      "vi": "Push-Ups With Feet Elevated",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm úp mặt xuống sàn và đặt hai tay cách nhau khoảng 36 inch, giữ thân mình ở độ dài cánh tay. Đặt ngón chân của bạn lên trên ...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Push-Ups_With_Feet_Elevated"
    },
    {
      "id": "Push-Ups_With_Feet_On_An_Exercise_Ball",
      "name": "Push-Ups With Feet On An Exercise Ball",
      "vi": "Push-Ups With Feet On An Exercise Ball",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "bóng tập",
      "diff": "Trung bình",
      "desc": "Nằm úp mặt xuống sàn và đặt hai tay cách nhau khoảng 36 inch, giữ thân mình ở độ dài cánh tay. Đặt ngón chân của bạn lên trên ...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Push-Ups_With_Feet_On_An_Exercise_Ball"
    },
    {
      "id": "Push_Up_to_Side_Plank",
      "name": "Push Up to Side Plank",
      "vi": "Push Up to Side Plank",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Vào tư thế chống đẩy trên các ngón chân với hai tay ngay ngoài chiều rộng của vai. Thực hiện động tác chống đẩy bằng cách cho phép khuỷu tay uốn cong. Khi bạn đi xuống, ...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Push_Up_to_Side_Plank"
    },
    {
      "id": "Pushups",
      "name": "Pushups",
      "vi": "Pushups",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm úp mặt xuống sàn và đặt hai tay cách nhau khoảng 36 inch trong khi giữ thân mình cao bằng chiều dài của cánh tay. Tiếp theo, hạ người xuống cho đến khi...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Pushups"
    },
    {
      "id": "Pushups_Close_and_Wide_Hand_Positions",
      "name": "Pushups (Close and Wide Hand Positions)",
      "vi": "Pushups (Close and Wide Hand Positions)",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm úp mặt xuống sàn và thẳng người với các ngón chân đặt trên sàn và hai tay rộng hơn chiều rộng vai để có tư thế tay rộng và gần hơn...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Pushups_Close_and_Wide_Hand_Positions"
    },
    {
      "id": "Reverse_Flyes",
      "name": "Reverse Flyes",
      "vi": "Reverse Flyes",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy nằm xuống một chiếc ghế nghiêng với ngực và bụng ép vào mặt nghiêng. Mỗi tay cầm hai quả tạ với lòng bàn tay hướng vào ...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Reverse_Flyes"
    },
    {
      "id": "Reverse_Flyes_With_External_Rotation",
      "name": "Reverse Flyes With External Rotation",
      "vi": "Reverse Flyes With External Rotation",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Để bắt đầu, hãy nằm xuống ghế nghiêng đặt nghiêng một góc 30 độ, ngực và bụng ép vào mặt nghiêng. Có tạ ở mỗi ha...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Reverse_Flyes_With_External_Rotation"
    },
    {
      "id": "Reverse_Grip_Triceps_Pushdown",
      "name": "Reverse Grip Triceps Pushdown",
      "vi": "Reverse Grip Triceps Pushdown",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt thanh đính kèm (thẳng hoặc e-z) trên máy ròng rọc cao. Đối mặt với thanh đính kèm, nắm lấy nó với lòng bàn tay hướng lên (ngửa...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Reverse_Grip_Triceps_Pushdown"
    },
    {
      "id": "Reverse_Machine_Flyes",
      "name": "Reverse Machine Flyes",
      "vi": "Reverse Machine Flyes",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Điều chỉnh tay cầm sao cho chúng hoàn toàn hướng về phía sau. Hãy lựa chọn trọng lượng phù hợp và điều chỉnh chiều cao ghế sao cho tay cầm ngang vai…",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Reverse_Machine_Flyes"
    },
    {
      "id": "Reverse_Triceps_Bench_Press",
      "name": "Reverse Triceps Bench Press",
      "vi": "Reverse Triceps Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Nằm ngửa trên một chiếc ghế phẳng. Sử dụng một tay cầm gần, ngửa (khoảng rộng bằng vai), nhấc thanh đòn ra khỏi giá và giữ thẳng qua người bạn bằng...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Reverse_Triceps_Bench_Press"
    },
    {
      "id": "Ring_Dips",
      "name": "Ring Dips",
      "vi": "Ring Dips",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Nắm chặt một chiếc nhẫn ở mỗi tay, sau đó thực hiện một bước nhảy nhỏ để giúp bạn về vị trí ban đầu với cánh tay bị khóa. Bắt đầu bằng cách uốn cong khuỷu tay,...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Ring_Dips"
    },
    {
      "id": "Seated_Barbell_Military_Press",
      "name": "Seated Barbell Military Press",
      "vi": "Seated Barbell Military Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Ngồi trên Ghế tập quân sự với một thanh phía sau đầu của bạn và nhờ người giám sát đưa cho bạn thanh này (tốt hơn là trên vòng bít xoay theo cách này) hoặc nhặt nó ...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Seated_Barbell_Military_Press"
    },
    {
      "id": "Seated_Bent-Over_Rear_Delt_Raise",
      "name": "Seated Bent-Over Rear Delt Raise",
      "vi": "Seated Bent-Over Rear Delt Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Đặt một vài quả tạ hướng về phía trước một chiếc ghế phẳng. Ngồi ở cuối ghế với hai chân khép lại và tạ ở phía sau...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Seated_Bent-Over_Rear_Delt_Raise"
    },
    {
      "id": "Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
      "name": "Seated Bent-Over Two-Arm Dumbbell Triceps Extension",
      "vi": "Seated Bent-Over Two-Arm Dumbbell Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Ngồi xuống ở cuối một chiếc ghế phẳng với một quả tạ ở cả hai tay, sử dụng tay cầm trung tính (lòng bàn tay hướng về phía bạn). Cong đầu gối của bạn một chút và ...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension"
    },
    {
      "id": "Seated_Cable_Shoulder_Press",
      "name": "Seated Cable Shoulder Press",
      "vi": "Seated Cable Shoulder Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Điều chỉnh trọng lượng đến mức thích hợp và ngồi xuống, nắm lấy tay cầm. Cánh tay trên của bạn phải tạo một góc khoảng 90 độ so với cơ thể, với đầu...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Seated_Cable_Shoulder_Press"
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
      "id": "Seated_Head_Harness_Neck_Resistance",
      "name": "Seated Head Harness Neck Resistance",
      "vi": "Seated Head Harness Neck Resistance",
      "icon": "🏋️",
      "muscles": [
        "Cổ"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Đặt dây đeo cổ trên sàn ở cuối băng ghế phẳng. Khi bạn đã chọn được trọng lượng, hãy ngồi ở cuối băng ghế phẳng với chân rộng hơn ...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Seated_Head_Harness_Neck_Resistance"
    },
    {
      "id": "Seated_Side_Lateral_Raise",
      "name": "Seated Side Lateral Raise",
      "vi": "Seated Side Lateral Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Chọn một vài quả tạ và ngồi ở cuối một chiếc ghế phẳng với đôi chân vững chắc trên sàn. Giữ tạ với lòng bàn tay hướng vào trong và bạn...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Seated_Side_Lateral_Raise"
    },
    {
      "id": "Seated_Triceps_Press",
      "name": "Seated Triceps Press",
      "vi": "Seated Triceps Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ngồi xuống một chiếc ghế dài có tựa lưng và nắm một quả tạ bằng cả hai tay và giữ nó qua đầu ở độ dài cánh tay. Mẹo: cách tốt hơn là nhờ ai đó...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Seated_Triceps_Press"
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
    },
    {
      "id": "Side_Laterals_to_Front_Raise",
      "name": "Side Laterals to Front Raise",
      "vi": "Side Laterals to Front Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ở tư thế đứng, giữ một cặp tạ ở bên cạnh. Đây sẽ là vị trí bắt đầu của bạn. Giữ khuỷu tay hơi cong, nâng tạ lên...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Side_Laterals_to_Front_Raise"
    },
    {
      "id": "Smith_Incline_Shoulder_Raise",
      "name": "Smith Incline Shoulder Raise",
      "vi": "Smith Incline Shoulder Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đặt một băng ghế nghiêng bên dưới máy rèn. Đặt thanh tạ ở độ cao mà bạn có thể với tới khi nằm và cánh tay của bạn gần như hoàn toàn ...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Smith_Incline_Shoulder_Raise"
    },
    {
      "id": "Smith_Machine_Bench_Press",
      "name": "Smith Machine Bench Press",
      "vi": "Smith Machine Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đặt một chiếc ghế phẳng bên dưới máy rèn. Bây giờ hãy đặt thanh tạ ở độ cao mà bạn có thể với tới khi nằm và cánh tay của bạn gần như hoàn toàn ...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Smith_Machine_Bench_Press"
    },
    {
      "id": "Smith_Machine_Close-Grip_Bench_Press",
      "name": "Smith Machine Close-Grip Bench Press",
      "vi": "Smith Machine Close-Grip Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đặt một chiếc ghế phẳng bên dưới máy rèn. Đặt thanh tạ ở độ cao mà bạn có thể với tới khi nằm và cánh tay của bạn gần như duỗi thẳng hoàn toàn...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Smith_Machine_Close-Grip_Bench_Press"
    },
    {
      "id": "Smith_Machine_Decline_Press",
      "name": "Smith Machine Decline Press",
      "vi": "Smith Machine Decline Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "squat",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đặt một chiếc ghế dài vào giá sao cho thanh đòn ở phía trên ngực của bạn. Tải một trọng lượng thích hợp và ngồi trên băng ghế. Xoay cái...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Smith_Machine_Decline_Press"
    },
    {
      "id": "Smith_Machine_Incline_Bench_Press",
      "name": "Smith Machine Incline Bench Press",
      "vi": "Smith Machine Incline Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đặt một băng ghế nghiêng bên dưới máy rèn. Đặt thanh tạ ở độ cao mà bạn có thể với tới khi nằm và cánh tay của bạn gần như hoàn toàn ...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Smith_Machine_Incline_Bench_Press"
    },
    {
      "id": "Smith_Machine_Overhead_Shoulder_Press",
      "name": "Smith Machine Overhead Shoulder Press",
      "vi": "Smith Machine Overhead Shoulder Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy đặt một chiếc ghế phẳng (hoặc tốt nhất là một chiếc ghế có tựa lưng) bên dưới máy rèn. Đặt thanh tạ ở độ cao sao cho khi ngồi lên...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Smith_Machine_Overhead_Shoulder_Press"
    },
    {
      "id": "Standing_Barbell_Press_Behind_Neck",
      "name": "Standing Barbell Press Behind Neck",
      "vi": "Standing Barbell Press Behind Neck",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Bài tập này được thực hiện tốt nhất trong giá ngồi xổm để dễ dàng lấy thanh hơn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá phù hợp nhất với chiều cao của bạn...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Standing_Barbell_Press_Behind_Neck"
    },
    {
      "id": "Standing_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
      "name": "Standing Bent-Over Two-Arm Dumbbell Triceps Extension",
      "vi": "Standing Bent-Over Two-Arm Dumbbell Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi tay cầm một quả tạ và lòng bàn tay hướng về phía thân mình, hơi cong đầu gối và đưa thân mình về phía trước, bằng cách uốn cong ở thắt lưng, đồng thời...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Standing_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension"
    },
    {
      "id": "Standing_Bradford_Press",
      "name": "Standing Bradford Press",
      "vi": "Standing Bradford Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đặt một thanh đã tải ngang tầm vai trong giá đỡ. Với tư thế cầm vợt nghiêng rộng bằng vai, bắt đầu với thanh đòn vắt ngang phía trước vai của bạn. ...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Standing_Bradford_Press"
    },
    {
      "id": "Standing_Cable_Chest_Press",
      "name": "Standing Cable Chest Press",
      "vi": "Standing Cable Chest Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đặt ròng rọc kép ngang ngực và chọn trọng lượng phù hợp. Đứng trước dây cáp một hoặc hai chân, mỗi tay cầm một chân. Bạn có thể...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Standing_Cable_Chest_Press"
    },
    {
      "id": "Standing_Dumbbell_Press",
      "name": "Standing Dumbbell Press",
      "vi": "Standing Dumbbell Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng hai chân rộng bằng vai, mỗi tay cầm một quả tạ. Nâng tạ lên cao ngang đầu, khuỷu tay hướng ra ngoài và tạo góc 90 độ. T...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Standing_Dumbbell_Press"
    },
    {
      "id": "Standing_Dumbbell_Straight-Arm_Front_Delt_Raise_Above_Head",
      "name": "Standing Dumbbell Straight-Arm Front Delt Raise Above Head",
      "vi": "Standing Dumbbell Straight-Arm Front Delt Raise Above Head",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Giữ tạ ở phía trước đùi, lòng bàn tay hướng vào đùi. Giữ cánh tay của bạn thẳng với một chút uốn cong ở khuỷu tay nhưng giữ chúng khóa. T...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Standing_Dumbbell_Straight-Arm_Front_Delt_Raise_Above_Head"
    },
    {
      "id": "Standing_Dumbbell_Triceps_Extension",
      "name": "Standing Dumbbell Triceps Extension",
      "vi": "Standing Dumbbell Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy đứng lên với một quả tạ được giữ bằng cả hai tay. Hai bàn chân của bạn phải cách nhau khoảng rộng bằng vai. Dùng hai tay từ từ nắm lấy...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Standing_Dumbbell_Triceps_Extension"
    },
    {
      "id": "Standing_Front_Barbell_Raise_Over_Head",
      "name": "Standing Front Barbell Raise Over Head",
      "vi": "Standing Front Barbell Raise Over Head",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Để bắt đầu, hãy đứng thẳng với một thanh tạ trên tay. Bạn nên cầm thanh đòn với lòng bàn tay úp xuống và nắm gần hơn chiều rộng vai ngoài...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Standing_Front_Barbell_Raise_Over_Head"
    },
    {
      "id": "Standing_Low-Pulley_Deltoid_Raise",
      "name": "Standing Low-Pulley Deltoid Raise",
      "vi": "Standing Low-Pulley Deltoid Raise",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đứng về phía bên phải của hàng ròng rọc thấp. Sử dụng tay trái của bạn để ngang qua cơ thể và nắm lấy một tay cầm gắn vào ròng rọc thấp...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Standing_Low-Pulley_Deltoid_Raise"
    },
    {
      "id": "Standing_Military_Press",
      "name": "Standing Military Press",
      "vi": "Standing Military Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt một thanh tạ cao ngang ngực trên giá ngồi xổm. Sau khi bạn đã chọn mức tạ, hãy nắm lấy thanh tạ bằng cách sử dụng thiết bị quay sấp (lòng bàn tay)...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Standing_Military_Press"
    },
    {
      "id": "Standing_Overhead_Barbell_Triceps_Extension",
      "name": "Standing Overhead Barbell Triceps Extension",
      "vi": "Standing Overhead Barbell Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy đứng lên cầm một thanh tạ hoặc thanh e-z bằng cách cầm nắm thẳng (lòng bàn tay hướng về phía trước) với hai bàn tay của bạn gần hơn chiều rộng vai, ngoài mỗi ...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Standing_Overhead_Barbell_Triceps_Extension"
    },
    {
      "id": "Standing_Palms-In_Dumbbell_Press",
      "name": "Standing Palms-In Dumbbell Press",
      "vi": "Standing Palms-In Dumbbell Press",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Bắt đầu bằng cách cầm một quả tạ ở mỗi tay với cánh tay mở rộng hoàn toàn sang một bên bằng cách cầm trung tính. Bàn chân của bạn phải rộng bằng vai và...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Standing_Palms-In_Dumbbell_Press"
    },
    {
      "id": "Standing_Towel_Triceps_Extension",
      "name": "Standing Towel Triceps Extension",
      "vi": "Standing Towel Triceps Extension",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy đứng lên với cả hai tay duỗi thẳng hoàn toàn phía trên đầu, giữ một đầu khăn bằng cả hai tay. Khuỷu tay của bạn phải ở trong và cánh tay ...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Standing_Towel_Triceps_Extension"
    },
    {
      "id": "Straight-Arm_Dumbbell_Pullover",
      "name": "Straight-Arm Dumbbell Pullover",
      "vi": "Straight-Arm Dumbbell Pullover",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Chọn một vài quả tạ và đứng thẳng thân và các quả tạ ở bên cạnh bạn dài bằng sải tay với lòng bàn tay hướng về phía bạn. Đây là...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Straight-Arm_Dumbbell_Pullover"
    },
    {
      "id": "Straight_Raises_on_Incline_Bench",
      "name": "Straight Raises on Incline Bench",
      "vi": "Straight Raises on Incline Bench",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đặt một thanh trên mặt đất phía sau đầu ghế nghiêng. Nằm úp mặt xuống ghế. Với tư thế cầm chắc chắn, nhấc thanh tạ lên khỏi sàn, k...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Straight_Raises_on_Incline_Bench"
    },
    {
      "id": "Suspended_Push-Up",
      "name": "Suspended Push-Up",
      "vi": "Suspended Push-Up",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Neo chặt dây treo của bạn vào đầu giá hoặc vật khác. Dựa vào dây đai, mỗi tay nắm lấy một tay cầm và chuyển sang dạng đẩy-...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Suspended_Push-Up"
    },
    {
      "id": "Svend_Press",
      "name": "Svend Press",
      "vi": "Svend Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Bắt đầu ở tư thế đứng. Dùng tay ấn hai tấm nhẹ vào nhau. Giữ các tấm lại gần với ngực của bạn để tạo ra một đường đẳng cự...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Svend_Press"
    },
    {
      "id": "Tate_Press",
      "name": "Tate Press",
      "vi": "Tate Press",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Nằm xuống một chiếc ghế phẳng với một quả tạ ở mỗi tay đặt trên đùi. Lòng bàn tay của bạn sẽ hướng vào nhau. Bằng cách sử dụng đùi của bạn để...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Tate_Press"
    },
    {
      "id": "Tricep_Dumbbell_Kickback",
      "name": "Tricep Dumbbell Kickback",
      "vi": "Tricep Dumbbell Kickback",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nắm lấy thanh kéo với lòng bàn tay hướng về phía trước bằng tay cầm rộng. Khi bạn dang cả hai tay ra phía trước và giữ thanh đòn ở vị trí đã chọn...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Tricep_Dumbbell_Kickback"
    },
    {
      "id": "Triceps_Overhead_Extension_with_Rope",
      "name": "Triceps Overhead Extension with Rope",
      "vi": "Triceps Overhead Extension with Rope",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Điều chỉnh tay cầm sao cho chúng hoàn toàn hướng về phía sau. Hãy lựa chọn trọng lượng phù hợp và điều chỉnh chiều cao ghế sao cho tay cầm ngang vai…",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Triceps_Overhead_Extension_with_Rope"
    },
    {
      "id": "Triceps_Pushdown",
      "name": "Triceps Pushdown",
      "vi": "Triceps Pushdown",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Gắn một thanh thẳng hoặc góc vào một ròng rọc cao và nắm bằng tay cầm quá mức (lòng bàn tay hướng xuống) rộng bằng vai. Đứng thẳng với thân mình...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Triceps_Pushdown"
    },
    {
      "id": "Triceps_Pushdown_-_Rope_Attachment",
      "name": "Triceps Pushdown - Rope Attachment",
      "vi": "Triceps Pushdown - Rope Attachment",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Gắn dây nối vào ròng rọc cao và nắm bằng tay cầm trung tính (lòng bàn tay hướng vào nhau). Đứng thẳng với thân mình thẳng và rất ...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Triceps_Pushdown_-_Rope_Attachment"
    },
    {
      "id": "Triceps_Pushdown_-_V-Bar_Attachment",
      "name": "Triceps Pushdown - V-Bar Attachment",
      "vi": "Triceps Pushdown - V-Bar Attachment",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Để bắt đầu, đặt một chiếc ghế phẳng phía sau máy rèn 2-3 feet. Sau đó, đặt thanh ở độ cao phù hợp nhất với chiều cao của bạn. Khi đã có chiều cao chính xác...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Triceps_Pushdown_-_V-Bar_Attachment"
    },
    {
      "id": "Upright_Barbell_Row",
      "name": "Upright Barbell Row",
      "vi": "Upright Barbell Row",
      "icon": "🏋️",
      "muscles": [
        "Vai"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Nắm thanh tạ bằng tay có chiều rộng nhỏ hơn vai một chút. Thanh đòn phải nằm trên đùi của bạn với cánh tay duỗi ra...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Upright_Barbell_Row"
    },
    {
      "id": "Weighted_Bench_Dip",
      "name": "Weighted Bench Dip",
      "vi": "Weighted Bench Dip",
      "icon": "🏋️",
      "muscles": [
        "Tay sau"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Đối với bài tập này, bạn sẽ cần đặt một chiếc ghế dài phía sau lưng và một chiếc ghế khác ở phía trước bạn. Với băng ghế vuông góc với cơ thể của bạn, giữ ...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Weighted_Bench_Dip"
    },
    {
      "id": "Wide-Grip_Barbell_Bench_Press",
      "name": "Wide-Grip Barbell Bench Press",
      "vi": "Wide-Grip Barbell Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Nằm ngửa trên một chiếc ghế phẳng với bàn chân vững chắc trên sàn. Sử dụng tay cầm rộng, nghiêng (lòng bàn tay hướng về phía trước), cách chiều rộng vai khoảng 3 inch (cho...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Wide-Grip_Barbell_Bench_Press"
    },
    {
      "id": "Wide-Grip_Decline_Barbell_Bench_Press",
      "name": "Wide-Grip Decline Barbell Bench Press",
      "vi": "Wide-Grip Decline Barbell Bench Press",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Nằm ngửa trên ghế dài với hai chân khóa chắc chắn ở phía trước ghế. Sử dụng tay cầm rộng, nghiêng (lòng bàn tay hướng về phía trước) khoảng 3 inch...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Wide-Grip_Decline_Barbell_Bench_Press"
    },
    {
      "id": "Wide-Grip_Decline_Barbell_Pullover",
      "name": "Wide-Grip Decline Barbell Pullover",
      "vi": "Wide-Grip Decline Barbell Pullover",
      "icon": "🏋️",
      "muscles": [
        "Ngực"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Nằm xuống một chiếc ghế dài với cả hai chân được cố định chắc chắn. Với tay cầm thanh tạ phía sau đầu bằng cách cầm nắm thẳng (lòng bàn tay hướng ra ngoài)...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Wide-Grip_Decline_Barbell_Pullover"
    }
  ],
  "2": [
    {
      "id": "Alternate_Hammer_Curl",
      "name": "Alternate Hammer Curl",
      "vi": "Alternate Hammer Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với thân mình thẳng và một quả tạ ở mỗi tay được giữ ở độ dài cánh tay. Khuỷu tay phải sát với thân mình. Lòng bàn tay...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Alternate_Hammer_Curl"
    },
    {
      "id": "Alternate_Incline_Dumbbell_Curl",
      "name": "Alternate Incline Dumbbell Curl",
      "vi": "Alternate Incline Dumbbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ngồi xuống trên một chiếc ghế nghiêng với một quả tạ ở mỗi tay được giữ dài bằng cánh tay. Mẹo: Giữ khuỷu tay gần với thân mình. Đây sẽ là bước khởi đầu của bạn...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Alternate_Incline_Dumbbell_Curl"
    },
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
      "id": "Barbell_Curls_Lying_Against_An_Incline",
      "name": "Barbell Curls Lying Against An Incline",
      "vi": "Barbell Curls Lying Against An Incline",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Nằm tựa lưng vào ghế nghiêng, hai tay cầm thanh tạ và thõng xuống thành một đường ngang. Đây sẽ là vị trí bắt đầu của bạn. Trong khi giữ...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Barbell_Curls_Lying_Against_An_Incline"
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
      "id": "Barbell_Shrug",
      "name": "Barbell Shrug",
      "vi": "Barbell Shrug",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với hai chân rộng bằng vai khi bạn cầm một thanh tạ bằng cả hai tay ở phía trước bằng cách cầm nắm (lòng bàn tay hướng vào đùi...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Barbell_Shrug"
    },
    {
      "id": "Barbell_Shrug_Behind_The_Back",
      "name": "Barbell Shrug Behind The Back",
      "vi": "Barbell Shrug Behind The Back",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với hai chân rộng bằng vai khi bạn cầm một thanh tạ bằng cả hai tay sau lưng bằng cách cầm nắm (lòng bàn tay hướng về phía sau). T...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Barbell_Shrug_Behind_The_Back"
    },
    {
      "id": "Bent-Arm_Barbell_Pullover",
      "name": "Bent-Arm Barbell Pullover",
      "vi": "Bent-Arm Barbell Pullover",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Nằm trên một chiếc ghế phẳng với một thanh tạ có độ rộng bằng vai. Giữ thanh thẳng trên ngực và uốn cong cánh tay. Đây sẽ là ngôi sao của bạn...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Bent-Arm_Barbell_Pullover"
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
      "id": "Bent_Over_Two-Arm_Long_Bar_Row",
      "name": "Bent Over Two-Arm Long Bar Row",
      "vi": "Bent Over Two-Arm Long Bar Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đặt trọng lượng lên một trong hai đầu của thanh tạ Olympic. Đảm bảo rằng bạn đặt đầu kia của thanh tạ vào góc của hai bức tường; hoặc đặt một...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Bent_Over_Two-Arm_Long_Bar_Row"
    },
    {
      "id": "Bent_Over_Two-Dumbbell_Row",
      "name": "Bent Over Two-Dumbbell Row",
      "vi": "Bent Over Two-Dumbbell Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi tay cầm một quả tạ (lòng bàn tay hướng vào thân), hơi cong đầu gối và đưa thân về phía trước bằng cách uốn cong ở thắt lưng; khi bạn uốn cong...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Bent_Over_Two-Dumbbell_Row"
    },
    {
      "id": "Bent_Over_Two-Dumbbell_Row_With_Palms_In",
      "name": "Bent Over Two-Dumbbell Row With Palms In",
      "vi": "Bent Over Two-Dumbbell Row With Palms In",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi tay cầm một quả tạ (lòng bàn tay hướng vào nhau), hơi cong đầu gối và đưa thân về phía trước, bằng cách uốn cong ở thắt lưng, đồng thời giữ ...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Bent_Over_Two-Dumbbell_Row_With_Palms_In"
    },
    {
      "id": "Bodyweight_Mid_Row",
      "name": "Bodyweight Mid Row",
      "vi": "Bodyweight Mid Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Bắt đầu bằng cách cầm nắm từ trung bình đến rộng trên thiết bị kéo lên với lòng bàn tay hướng ra xa bạn. Từ tư thế treo người, thu đầu gối của bạn vào ch...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Bodyweight_Mid_Row"
    },
    {
      "id": "Bottoms-Up_Clean_From_The_Hang_Position",
      "name": "Bottoms-Up Clean From The Hang Position",
      "vi": "Bottoms-Up Clean From The Hang Position",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "tạ ấm",
      "diff": "Trung bình",
      "desc": "Ngồi trên máy kéo có thanh rộng gắn vào ròng rọc phía trên. Điều chỉnh miếng đệm đầu gối của máy cho phù hợp với chiều cao của bạn. Những miếng đệm này sẽ...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Bottoms-Up_Clean_From_The_Hang_Position"
    },
    {
      "id": "Cable_Hammer_Curls_-_Rope_Attachment",
      "name": "Cable Hammer Curls - Rope Attachment",
      "vi": "Cable Hammer Curls - Rope Attachment",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Gắn dây nối vào ròng rọc thấp và đứng đối diện với máy cách nó khoảng 12 inch. Nắm chặt dây bằng tay cầm trung tính (lòng bàn tay) và ...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Cable_Hammer_Curls_-_Rope_Attachment"
    },
    {
      "id": "Cable_Incline_Pushdown",
      "name": "Cable Incline Pushdown",
      "vi": "Cable Incline Pushdown",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Nằm nghiêng trên một chiếc ghế dài quay mặt về phía máy ròng rọc cao có gắn thanh thẳng trên đó. Nắm chặt thanh gắn thẳng phía trên bằng...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Cable_Incline_Pushdown"
    },
    {
      "id": "Cable_Preacher_Curl",
      "name": "Cable Preacher Curl",
      "vi": "Cable Preacher Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đặt một chiếc ghế dài khoảng 2 feet phía trước máy ròng rọc. Gắn một thanh thẳng vào ròng rọc thấp. Ngồi ở ghế thuyết giáo với khuỷu tay của bạn...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Cable_Preacher_Curl"
    },
    {
      "id": "Cable_Shrugs",
      "name": "Cable Shrugs",
      "vi": "Cable Shrugs",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Nắm một phụ kiện thanh cáp được gắn vào một ròng rọc thấp có độ rộng bằng vai hoặc tay cầm rộng hơn một chút (lòng bàn tay hướng xuống). Đứng thẳng t...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Cable_Shrugs"
    },
    {
      "id": "Cable_Wrist_Curl",
      "name": "Cable Wrist Curl",
      "vi": "Cable Wrist Curl",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt một chiếc ghế phẳng phía trước cáp ròng rọc thấp có gắn thanh thẳng. Dùng cánh tay của bạn để nắm lấy thanh cáp với một khoảng hẹp...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Cable_Wrist_Curl"
    },
    {
      "id": "Calf-Machine_Shoulder_Shrug",
      "name": "Calf-Machine Shoulder Shrug",
      "vi": "Calf-Machine Shoulder Shrug",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đặt mình trên máy tập bắp chân sao cho miếng đệm vai ở phía trên vai của bạn. Thân mình phải thẳng với cánh tay duỗi thẳng bình thường...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Calf-Machine_Shoulder_Shrug"
    },
    {
      "id": "Chin-Up",
      "name": "Chin-Up",
      "vi": "Chin-Up",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nắm lấy thanh kéo với lòng bàn tay hướng vào thân mình và nắm gần hơn chiều rộng của vai. Khi bạn dang cả hai tay ra phía trước và giữ...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Chin-Up"
    },
    {
      "id": "Close-Grip_EZ_Bar_Curl",
      "name": "Close-Grip EZ Bar Curl",
      "vi": "Close-Grip EZ Bar Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với thân mình trong khi giữ Thanh uốn cong E-Z ở tay cầm bên trong gần hơn. Lòng bàn tay của bạn phải hướng về phía trước và chúng...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Close-Grip_EZ_Bar_Curl"
    },
    {
      "id": "Close-Grip_Front_Lat_Pulldown",
      "name": "Close-Grip Front Lat Pulldown",
      "vi": "Close-Grip Front Lat Pulldown",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt hai quả tạ ở một bên của một chiếc ghế phẳng. Quỳ xuống bằng cả hai đầu gối sao cho cơ thể hướng về phía băng ghế phẳng. Sử dụng ...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Close-Grip_Front_Lat_Pulldown"
    },
    {
      "id": "Close-Grip_Standing_Barbell_Curl",
      "name": "Close-Grip Standing Barbell Curl",
      "vi": "Close-Grip Standing Barbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Giữ một thanh tạ bằng cả hai tay, lòng bàn tay hướng lên và cách nhau vài inch. Đứng thẳng thân mình và ngẩng cao đầu. Bàn chân của bạn phải ngang vai...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Close-Grip_Standing_Barbell_Curl"
    },
    {
      "id": "Concentration_Curls",
      "name": "Concentration Curls",
      "vi": "Concentration Curls",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ngồi xuống một chiếc ghế phẳng với một quả tạ đặt trước mặt giữa hai chân. Chân của bạn phải dang rộng với đầu gối cong và bàn chân đặt trên sàn. bạn...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Concentration_Curls"
    },
    {
      "id": "Cross_Body_Hammer_Curl",
      "name": "Cross Body Hammer Curl",
      "vi": "Cross Body Hammer Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với một quả tạ ở mỗi tay. Tay của bạn phải đặt xuống bên cạnh với lòng bàn tay hướng vào trong. Trong khi giữ lòng bàn tay hướng vào...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Cross_Body_Hammer_Curl"
    },
    {
      "id": "Drag_Curl",
      "name": "Drag Curl",
      "vi": "Drag Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đối với bài tập này, bạn sẽ cần sử dụng các thanh song song. Để vào vị trí ban đầu, hãy giữ cơ thể ở độ dài sải tay (khóa cánh tay) phía trên...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Drag_Curl"
    },
    {
      "id": "Dumbbell_Alternate_Bicep_Curl",
      "name": "Dumbbell Alternate Bicep Curl",
      "vi": "Dumbbell Alternate Bicep Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng (thân thẳng) với một quả tạ ở mỗi tay giữ ở độ dài cánh tay. Khuỷu tay phải sát với thân mình và lòng bàn tay phải hướng về phía...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Dumbbell_Alternate_Bicep_Curl"
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
      "id": "Dumbbell_Incline_Row",
      "name": "Dumbbell Incline Row",
      "vi": "Dumbbell Incline Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Sử dụng tay cầm trung tính, tựa vào ghế nghiêng. Mỗi tay cầm một quả tạ với tư thế cầm trung tính, bắt đầu với cánh tay duỗi thẳng. Đây sẽ là bạn...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Dumbbell_Incline_Row"
    },
    {
      "id": "Dumbbell_Lying_Pronation",
      "name": "Dumbbell Lying Pronation",
      "vi": "Dumbbell Lying Pronation",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Nằm úp mặt trên ghế phẳng, một tay cầm tạ và tay kia gập lại trên ghế để bạn có thể tựa đầu vào đó. Uốn cong...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Dumbbell_Lying_Pronation"
    },
    {
      "id": "Dumbbell_Lying_Supination",
      "name": "Dumbbell Lying Supination",
      "vi": "Dumbbell Lying Supination",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Nằm nghiêng trên ghế phẳng, một tay cầm tạ và tay kia gập lại trên ghế để bạn có thể tựa đầu vào đó. Uốn cong ...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Dumbbell_Lying_Supination"
    },
    {
      "id": "Dumbbell_Shrug",
      "name": "Dumbbell Shrug",
      "vi": "Dumbbell Shrug",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Chạy một dải xung quanh một trụ cố định giống như một giá đỡ ngồi xổm. Nắm lấy tay cầm của dây đeo và lùi lại để độ căng của dây đeo tăng lên. Mở rộng...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Dumbbell_Shrug"
    },
    {
      "id": "EZ-Bar_Curl",
      "name": "EZ-Bar Curl",
      "vi": "EZ-Bar Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ chữ z",
      "diff": "Dễ",
      "desc": "Đứng thẳng trong khi cầm thanh uốn EZ ở tay cầm rộng bên ngoài. Lòng bàn tay của bạn phải hướng về phía trước và hơi nghiêng vào trong...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "EZ-Bar_Curl"
    },
    {
      "id": "Elevated_Cable_Rows",
      "name": "Elevated Cable Rows",
      "vi": "Elevated Cable Rows",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Lấy một loại bệ nào đó (có thể là bệ tập thể dục nhịp điệu hoặc bệ nâng bắp chân) có chiều cao khoảng 4-6 inch. Đặt nó trên ghế của hàng cáp ...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Elevated_Cable_Rows"
    },
    {
      "id": "Finger_Curls",
      "name": "Finger Curls",
      "vi": "Finger Curls",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Giữ một thanh tạ bằng cả hai tay và lòng bàn tay hướng lên trên; hai tay dang rộng bằng vai. Đặt bàn chân phẳng trên sàn, ở khoảng cách s...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Finger_Curls"
    },
    {
      "id": "Flexor_Incline_Dumbbell_Curls",
      "name": "Flexor Incline Dumbbell Curls",
      "vi": "Flexor Incline Dumbbell Curls",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Giữ quả tạ về phía xa bạn hơn để bạn có nhiều trọng lượng hơn ở bên gần bạn nhất. (Điều này có thể được thực hiện để mang lại hiệu quả tốt cho tất cả...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Flexor_Incline_Dumbbell_Curls"
    },
    {
      "id": "Full_Range-Of-Motion_Lat_Pulldown",
      "name": "Full Range-Of-Motion Lat Pulldown",
      "vi": "Full Range-Of-Motion Lat Pulldown",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Chạy một dải xung quanh một trụ cố định giống như một giá đỡ ngồi xổm. Nắm lấy tay cầm của dây đeo và lùi lại để độ căng của dây đeo tăng lên. Mở rộng...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Full_Range-Of-Motion_Lat_Pulldown"
    },
    {
      "id": "Gironda_Sternum_Chins",
      "name": "Gironda Sternum Chins",
      "vi": "Gironda Sternum Chins",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Nắm chặt thanh kéo bằng tay cầm rộng bằng vai. Bây giờ hãy dang rộng cánh tay của bạn hoàn toàn và ưỡn ngực ra sau. Mẹo: Bạn sẽ...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Gironda_Sternum_Chins"
    },
    {
      "id": "Hammer_Curls",
      "name": "Hammer Curls",
      "vi": "Hammer Curls",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với thân mình thẳng và một quả tạ trên mỗi tay được giữ ở độ dài cánh tay. Khuỷu tay phải sát với thân mình. Lòng bàn tay...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Hammer_Curls"
    },
    {
      "id": "High_Cable_Curls",
      "name": "High Cable Curls",
      "vi": "High Cable Curls",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Đứng giữa một vài ròng rọc cao và nắm lấy một tay cầm ở mỗi cánh tay. Đặt cánh tay trên của bạn sao cho chúng song song với sàn với ...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "High_Cable_Curls"
    },
    {
      "id": "Hyperextensions_Back_Extensions",
      "name": "Hyperextensions (Back Extensions)",
      "vi": "Hyperextensions (Back Extensions)",
      "icon": "🏋️",
      "muscles": [
        "Lưng dưới"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Nằm úp mặt trên băng ghế có độ giãn cao, nhét mắt cá chân của bạn an toàn dưới miếng đệm chân. Điều chỉnh miếng đệm trên nếu có thể để đùi trên của bạn nằm thẳng...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Hyperextensions_Back_Extensions"
    },
    {
      "id": "Hyperextensions_With_No_Hyperextension_Bench",
      "name": "Hyperextensions With No Hyperextension Bench",
      "vi": "Hyperextensions With No Hyperextension Bench",
      "icon": "🏋️",
      "muscles": [
        "Lưng dưới"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Nhờ ai đó giữ chân bạn, hãy trượt người xuống mép một chiếc ghế dài phẳng cho đến khi hông của bạn chạm vào đầu ghế. Mẹo: Toàn bộ chi phí của bạn...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Hyperextensions_With_No_Hyperextension_Bench"
    },
    {
      "id": "Incline_Bench_Pull",
      "name": "Incline Bench Pull",
      "vi": "Incline Bench Pull",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Mỗi tay cầm một quả tạ và nằm úp mặt trên ghế nghiêng được đặt nghiêng một góc khoảng 30 độ. Hãy để vòng tay ôm lấy bạn...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Incline_Bench_Pull"
    },
    {
      "id": "Incline_Dumbbell_Curl",
      "name": "Incline Dumbbell Curl",
      "vi": "Incline Dumbbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ngồi ngả lưng trên ghế nghiêng với một quả tạ ở mỗi tay dài bằng cánh tay. Giữ khuỷu tay của bạn gần với thân mình và xoay lòng bàn tay của bạn...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Incline_Dumbbell_Curl"
    },
    {
      "id": "Incline_Hammer_Curls",
      "name": "Incline Hammer Curls",
      "vi": "Incline Hammer Curls",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ngồi trên ghế nghiêng với một quả tạ ở mỗi tay. Bạn nên ép chặt vào lưng anh ấy bằng hai chân của bạn. Cho phép quả tạ...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Incline_Hammer_Curls"
    },
    {
      "id": "Incline_Inner_Biceps_Curl",
      "name": "Incline Inner Biceps Curl",
      "vi": "Incline Inner Biceps Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "squat",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên một chiếc ghế phẳng. Sử dụng một tay cầm gần, ngửa (khoảng rộng bằng vai), nhấc thanh đòn ra khỏi giá và giữ thẳng qua người bạn bằng...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Incline_Inner_Biceps_Curl"
    },
    {
      "id": "Inverted_Row",
      "name": "Inverted Row",
      "vi": "Inverted Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đặt thanh trong giá ở độ cao ngang eo. Bạn cũng có thể sử dụng máy rèn. Nắm thanh đòn rộng hơn chiều rộng vai và đặt vị trí của bạn...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Inverted_Row"
    },
    {
      "id": "Inverted_Row_with_Straps",
      "name": "Inverted Row with Straps",
      "vi": "Inverted Row with Straps",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Treo một sợi dây hoặc dây treo từ giá đỡ hoặc vật ổn định khác. Nắm chặt các đầu và đặt mình ở tư thế nằm ngửa treo mình trên dây....",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Inverted_Row_with_Straps"
    },
    {
      "id": "Kipping_Muscle_Up",
      "name": "Kipping Muscle Up",
      "vi": "Kipping Muscle Up",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh ghế phù hợp với chiều cao của bạn. Tay cầm phải ở gần đỉnh ngực khi bắt đầu ...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Kipping_Muscle_Up"
    },
    {
      "id": "Kneeling_High_Pulley_Row",
      "name": "Kneeling High Pulley Row",
      "vi": "Kneeling High Pulley Row",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Chọn trọng lượng phù hợp bằng cách sử dụng ròng rọc phía trên đầu của bạn. Gắn một sợi dây vào sợi cáp và quỳ cách đó vài feet, giữ sợi dây ra...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Kneeling_High_Pulley_Row"
    },
    {
      "id": "Leverage_High_Row",
      "name": "Leverage High Row",
      "vi": "Leverage High Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh độ cao của ghế sao cho bạn có thể chạm tới tay cầm phía trên mình. Điều chỉnh miếng đệm đầu gối để giúp giữ...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Leverage_High_Row"
    },
    {
      "id": "Leverage_Iso_Row",
      "name": "Leverage Iso Row",
      "vi": "Leverage Iso Row",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh độ cao của ghế sao cho tay cầm ngang ngực. Nắm chặt tay cầm bằng dây trung tính hoặc...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Leverage_Iso_Row"
    },
    {
      "id": "Leverage_Shrug",
      "name": "Leverage Shrug",
      "vi": "Leverage Shrug",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Tải các chân đến trọng lượng thích hợp. Định vị bản thân trực tiếp giữa các tay cầm. Nắm chặt các tay cầm trên cùng một cách thoải mái, sau đó hạ xuống ...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Leverage_Shrug"
    },
    {
      "id": "London_Bridges",
      "name": "London Bridges",
      "vi": "London Bridges",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Gắn dây leo vào xà cao hoặc thanh ngang. Bên dưới nó, đảm bảo rằng thanh máy rèn được khóa đúng vị trí bằng các chốt an toàn và không thể di chuyển...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "London_Bridges"
    },
    {
      "id": "Lying_Cable_Curl",
      "name": "Lying Cable Curl",
      "vi": "Lying Cable Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Nắm thanh thẳng hoặc phụ kiện thanh E-Z được gắn vào ròng rọc thấp bằng cả hai tay, sử dụng tay cầm phía dưới (lòng bàn tay hướng lên) rộng bằng vai...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Lying_Cable_Curl"
    },
    {
      "id": "Lying_Cambered_Barbell_Row",
      "name": "Lying Cambered Barbell Row",
      "vi": "Lying Cambered Barbell Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đặt một thanh khum bên dưới ghế tập thể dục. Nằm úp mặt trên ghế tập và nắm lấy thanh đòn bằng lòng bàn tay úp xuống (tay nắm hình sấp) rộng...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Lying_Cambered_Barbell_Row"
    },
    {
      "id": "Lying_Close-Grip_Bar_Curl_On_High_Pulley",
      "name": "Lying Close-Grip Bar Curl On High Pulley",
      "vi": "Lying Close-Grip Bar Curl On High Pulley",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đặt một băng ghế phẳng phía trước máy kéo ròng rọc cao hoặc lat. Giữ phần đính kèm thanh thẳng bằng cách sử dụng tay cầm phía dưới (lòng bàn tay hướng lên) khoảng...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Lying_Close-Grip_Bar_Curl_On_High_Pulley"
    },
    {
      "id": "Lying_High_Bench_Barbell_Curl",
      "name": "Lying High Bench Barbell Curl",
      "vi": "Lying High Bench Barbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Nằm quay mặt về phía trước trên một chiếc ghế dài phẳng trong khi cầm một thanh tạ có tay cầm ngửa (lòng bàn tay hướng lên). Mẹo: Nếu bạn đang cầm một thanh tạ, hãy cầm nó bằng...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Lying_High_Bench_Barbell_Curl"
    },
    {
      "id": "Lying_Supine_Dumbbell_Curl",
      "name": "Lying Supine Dumbbell Curl",
      "vi": "Lying Supine Dumbbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên một chiếc ghế phẳng trong khi giữ một quả tạ ở mỗi cánh tay trên đùi. Đưa tạ sang hai bên với cánh tay duỗi thẳng...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Lying_Supine_Dumbbell_Curl"
    },
    {
      "id": "Lying_T-Bar_Row",
      "name": "Lying T-Bar Row",
      "vi": "Lying T-Bar Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Tải lên Máy tập thanh chữ T với trọng lượng mong muốn và điều chỉnh độ cao của chân sao cho ngực trên của bạn ở trên cùng của tấm đệm. Mẹo: Ở một số máy...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Lying_T-Bar_Row"
    },
    {
      "id": "Machine_Bicep_Curl",
      "name": "Machine Bicep Curl",
      "vi": "Machine Bicep Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Điều chỉnh ghế đến độ cao thích hợp và lựa chọn trọng lượng của bạn. Đặt cánh tay trên của bạn tựa vào miếng đệm và nắm lấy tay cầm. Đây sẽ là...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Machine_Bicep_Curl"
    },
    {
      "id": "Machine_Preacher_Curls",
      "name": "Machine Preacher Curls",
      "vi": "Machine Preacher Curls",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Ngồi xuống Máy uốn tóc Preacher và chọn trọng lượng. Đặt mặt sau của cánh tay trên (cơ tam đầu) lên miếng đệm được cung cấp và nắm lấy...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Machine_Preacher_Curls"
    },
    {
      "id": "Middle_Back_Shrug",
      "name": "Middle Back Shrug",
      "vi": "Middle Back Shrug",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Nằm úp mặt trên ghế nghiêng, mỗi tay cầm một quả tạ. Cánh tay của bạn phải duỗi thẳng hoàn toàn và hướng xuống sàn...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Middle_Back_Shrug"
    },
    {
      "id": "Mixed_Grip_Chin",
      "name": "Mixed Grip Chin",
      "vi": "Mixed Grip Chin",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Khó",
      "desc": "Sử dụng khoảng cách chỉ rộng hơn chiều rộng vai khoảng 1 inch, nắm lấy thanh kéo với lòng bàn tay một tay hướng về phía trước và lòng bàn tay của...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Mixed_Grip_Chin"
    },
    {
      "id": "Muscle_Up",
      "name": "Muscle Up",
      "vi": "Muscle Up",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Nắm chặt các vòng bằng tay cầm giả, đặt lòng bàn tay lên trên các vòng. Bắt đầu kéo lên bằng cách kéo khuỷu tay xuống bên cạnh, uốn cong...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Muscle_Up"
    },
    {
      "id": "Overhead_Cable_Curl",
      "name": "Overhead Cable Curl",
      "vi": "Overhead Cable Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Để bắt đầu, hãy đặt trọng lượng thoải mái ở mỗi bên của máy ròng rọc. Lưu ý: Đảm bảo rằng trọng lượng được chọn giống nhau trên mỗi ...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Overhead_Cable_Curl"
    },
    {
      "id": "Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench",
      "name": "Palms-Down Dumbbell Wrist Curl Over A Bench",
      "vi": "Palms-Down Dumbbell Wrist Curl Over A Bench",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt hai quả tạ ở một bên của một chiếc ghế phẳng. Quỳ xuống bằng cả hai đầu gối sao cho cơ thể hướng về phía băng ghế phẳng. Sử dụng ...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench"
    },
    {
      "id": "Palms-Down_Wrist_Curl_Over_A_Bench",
      "name": "Palms-Down Wrist Curl Over A Bench",
      "vi": "Palms-Down Wrist Curl Over A Bench",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt một thanh tạ ở một bên của một chiếc ghế phẳng. Quỳ xuống bằng cả hai đầu gối sao cho cơ thể hướng về phía băng ghế phẳng. Hãy sử dụng cánh tay của bạn...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Palms-Down_Wrist_Curl_Over_A_Bench"
    },
    {
      "id": "Palms-Up_Barbell_Wrist_Curl_Over_A_Bench",
      "name": "Palms-Up Barbell Wrist Curl Over A Bench",
      "vi": "Palms-Up Barbell Wrist Curl Over A Bench",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt một thanh tạ ở một bên của một chiếc ghế phẳng. Quỳ xuống bằng cả hai đầu gối sao cho cơ thể hướng về phía băng ghế phẳng. Hãy sử dụng cánh tay của bạn...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Palms-Up_Barbell_Wrist_Curl_Over_A_Bench"
    },
    {
      "id": "Palms-Up_Dumbbell_Wrist_Curl_Over_A_Bench",
      "name": "Palms-Up Dumbbell Wrist Curl Over A Bench",
      "vi": "Palms-Up Dumbbell Wrist Curl Over A Bench",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt hai quả tạ ở một bên của một chiếc ghế phẳng. Quỳ xuống bằng cả hai đầu gối sao cho cơ thể hướng về phía băng ghế phẳng. Sử dụng ...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Palms-Up_Dumbbell_Wrist_Curl_Over_A_Bench"
    },
    {
      "id": "Plate_Pinch",
      "name": "Plate Pinch",
      "vi": "Plate Pinch",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "static",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Lấy hai chiếc đĩa có vành rộng và đặt chúng lại với nhau sao cho mặt nhẵn hướng ra ngoài. Dùng ngón tay để giữ chặt phần bên ngoài của đĩa và...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Plate_Pinch"
    },
    {
      "id": "Preacher_Curl",
      "name": "Preacher Curl",
      "vi": "Preacher Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đặt thanh đòn ở ngang đùi, tải trọng lượng phù hợp. Nắm rộng thanh và tháo vật nặng, bỏ tay ra khỏi thanh. Của bạn ...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Preacher_Curl"
    },
    {
      "id": "Preacher_Hammer_Dumbbell_Curl",
      "name": "Preacher Hammer Dumbbell Curl",
      "vi": "Preacher Hammer Dumbbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đặt phần trên của cả hai cánh tay lên trên băng ghế thuyết giảng khi bạn cầm một quả tạ ở mỗi tay với lòng bàn tay hướng vào nhau (tay cầm trung tính). BẰNG...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Preacher_Hammer_Dumbbell_Curl"
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
      "id": "Reverse_Barbell_Curl",
      "name": "Reverse Barbell Curl",
      "vi": "Reverse Barbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Điều chỉnh dây đai sao cho tay cầm ở độ cao thích hợp, dưới mức thắt lưng. Bắt đầu đứng và nắm lấy tay cầm. Dựa vào dây đai, di chuyển...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Reverse_Barbell_Curl"
    },
    {
      "id": "Reverse_Barbell_Preacher_Curls",
      "name": "Reverse Barbell Preacher Curls",
      "vi": "Reverse Barbell Preacher Curls",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ chữ z",
      "diff": "Trung bình",
      "desc": "Nắm lấy thanh EZ bằng chiều rộng vai và lòng bàn tay hướng xuống (hướng). Bây giờ đặt phần trên của cả hai cánh tay lên trên băng ghế thuyết giáo và...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Reverse_Barbell_Preacher_Curls"
    },
    {
      "id": "Reverse_Cable_Curl",
      "name": "Reverse Cable Curl",
      "vi": "Reverse Cable Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đứng thẳng với thân mình trong khi giữ một thanh gắn được gắn vào một ròng rọc thấp bằng cách sử dụng tay cầm quay sấp (lòng bàn tay hướng xuống) và rộng bằng vai...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Reverse_Cable_Curl"
    },
    {
      "id": "Reverse_Grip_Bent-Over_Rows",
      "name": "Reverse Grip Bent-Over Rows",
      "vi": "Reverse Grip Bent-Over Rows",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đứng thẳng trong khi cầm một thanh tạ với tay cầm ngửa (lòng bàn tay hướng lên). Cong đầu gối của bạn một chút và đưa thân mình về phía trước, bằng cách uốn cong ở ...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Reverse_Grip_Bent-Over_Rows"
    },
    {
      "id": "Reverse_Plate_Curls",
      "name": "Reverse Plate Curls",
      "vi": "Reverse Plate Curls",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đứng thẳng với một tấm tạ được giữ bằng cả hai tay và cánh tay duỗi thẳng hoàn toàn. Sử dụng cách cầm vợt nghiêng (lòng bàn tay úp xuống) và đảm bảo bạn...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Reverse_Plate_Curls"
    },
    {
      "id": "Rocky_Pull-Ups_Pulldowns",
      "name": "Rocky Pull-Ups/Pulldowns",
      "vi": "Rocky Pull-Ups/Pulldowns",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Đứng giữa hai ròng rọc thấp đối diện nhau và đặt một chiếc ghế phẳng ngay phía sau bạn (vuông góc với bạn; n...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Rocky_Pull-Ups_Pulldowns"
    },
    {
      "id": "Rope_Climb",
      "name": "Rope Climb",
      "vi": "Rope Climb",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Đứng thẳng với thân mình thẳng và một quả tạ ở mỗi tay được giữ ở độ dài cánh tay. Khuỷu tay phải sát với thân mình. Lòng bàn tay...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Rope_Climb"
    },
    {
      "id": "Rope_Straight-Arm_Pulldown",
      "name": "Rope Straight-Arm Pulldown",
      "vi": "Rope Straight-Arm Pulldown",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Gắn một sợi dây vào một ròng rọc cao và lựa chọn trọng lượng của bạn. Đứng cách ròng rọc vài feet với đôi chân loạng choạng và cầm lấy sợi dây...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Rope_Straight-Arm_Pulldown"
    },
    {
      "id": "Scapular_Pull-Up",
      "name": "Scapular Pull-Up",
      "vi": "Scapular Pull-Up",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Lấy một vài quả tạ và ngồi trên ghế tập quân sự hoặc ghế tiện ích có tựa lưng khi bạn đặt các quả tạ thẳng đứng lên...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Scapular_Pull-Up"
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
      "id": "Seated_Close-Grip_Concentration_Barbell_Curl",
      "name": "Seated Close-Grip Concentration Barbell Curl",
      "vi": "Seated Close-Grip Concentration Barbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh ghế phù hợp với chiều cao của bạn. Tay cầm phải ở gần đỉnh ngực khi bắt đầu ...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Seated_Close-Grip_Concentration_Barbell_Curl"
    },
    {
      "id": "Seated_Dumbbell_Curl",
      "name": "Seated Dumbbell Curl",
      "vi": "Seated Dumbbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ngồi trên một chiếc ghế phẳng với một quả tạ ở mỗi tay được giữ dài bằng cánh tay. Khuỷu tay phải sát với thân mình. Xoay lòng bàn tay sao cho...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Seated_Dumbbell_Curl"
    },
    {
      "id": "Seated_Dumbbell_Inner_Biceps_Curl",
      "name": "Seated Dumbbell Inner Biceps Curl",
      "vi": "Seated Dumbbell Inner Biceps Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Ngồi ở cuối một chiếc ghế phẳng với một quả tạ ở mỗi tay được giữ ở độ dài cánh tay. Khuỷu tay phải sát với thân mình. Xoay lòng bàn tay của...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Seated_Dumbbell_Inner_Biceps_Curl"
    },
    {
      "id": "Seated_Dumbbell_Palms-Down_Wrist_Curl",
      "name": "Seated Dumbbell Palms-Down Wrist Curl",
      "vi": "Seated Dumbbell Palms-Down Wrist Curl",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt hai quả tạ trên sàn trước một chiếc ghế phẳng. Ngồi xuống mép ghế phẳng với hai chân rộng bằng vai...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Seated_Dumbbell_Palms-Down_Wrist_Curl"
    },
    {
      "id": "Seated_Dumbbell_Palms-Up_Wrist_Curl",
      "name": "Seated Dumbbell Palms-Up Wrist Curl",
      "vi": "Seated Dumbbell Palms-Up Wrist Curl",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt hai quả tạ trên sàn trước một chiếc ghế phẳng. Ngồi xuống mép ghế phẳng với hai chân rộng bằng vai...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Seated_Dumbbell_Palms-Up_Wrist_Curl"
    },
    {
      "id": "Seated_Palm-Up_Barbell_Wrist_Curl",
      "name": "Seated Palm-Up Barbell Wrist Curl",
      "vi": "Seated Palm-Up Barbell Wrist Curl",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Giữ một thanh tạ bằng cả hai tay và lòng bàn tay hướng lên trên; hai tay dang rộng bằng vai. Đặt bàn chân phẳng trên sàn, ở khoảng cách s...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Seated_Palm-Up_Barbell_Wrist_Curl"
    },
    {
      "id": "Seated_Palms-Down_Barbell_Wrist_Curl",
      "name": "Seated Palms-Down Barbell Wrist Curl",
      "vi": "Seated Palms-Down Barbell Wrist Curl",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Giữ một thanh tạ bằng cả hai tay và lòng bàn tay úp xuống; hai tay dang rộng bằng vai. Đặt bàn chân của bạn bằng phẳng trên sàn, ở khoảng cách...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Seated_Palms-Down_Barbell_Wrist_Curl"
    },
    {
      "id": "Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl",
      "name": "Seated Two-Arm Palms-Up Low-Pulley Wrist Curl",
      "vi": "Seated Two-Arm Palms-Up Low-Pulley Wrist Curl",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đặt một chiếc ghế dài phía trước máy ròng rọc thấp có gắn thanh tạ hoặc EZ Curl trên đó. Di chuyển băng ghế đủ xa để khi bạn mang...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl"
    },
    {
      "id": "Shotgun_Row",
      "name": "Shotgun Row",
      "vi": "Shotgun Row",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Gắn một tay cầm vào cáp thấp. Sau khi chọn mức tạ phù hợp, hãy đứng lùi lại vài bước với tư thế dang rộng. Cánh tay của bạn nên được mở rộng ...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Shotgun_Row"
    },
    {
      "id": "Side_To_Side_Chins",
      "name": "Side To Side Chins",
      "vi": "Side To Side Chins",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Nắm lấy thanh kéo với lòng bàn tay hướng về phía trước bằng tay cầm rộng. Khi bạn dang cả hai tay ra phía trước và giữ thanh đòn ở độ bám rộng, ...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Side_To_Side_Chins"
    },
    {
      "id": "Smith_Machine_Behind_the_Back_Shrug",
      "name": "Smith Machine Behind the Back Shrug",
      "vi": "Smith Machine Behind the Back Shrug",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy đứng thẳng với một thanh tạ trên tay. Bạn nên cầm thanh đòn với lòng bàn tay úp xuống và nắm gần hơn chiều rộng vai ngoài...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Smith_Machine_Behind_the_Back_Shrug"
    },
    {
      "id": "Smith_Machine_Bent_Over_Row",
      "name": "Smith Machine Bent Over Row",
      "vi": "Smith Machine Bent Over Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đặt thanh tạ gắn vào máy rèn ở độ cao khoảng 2 inch dưới đầu gối của bạn. Cong đầu gối của bạn một chút và đưa thân mình về phía trước...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Smith_Machine_Bent_Over_Row"
    },
    {
      "id": "Smith_Machine_Upright_Row",
      "name": "Smith Machine Upright Row",
      "vi": "Smith Machine Upright Row",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy đặt thanh trên máy rèn ở độ cao ngang giữa đùi của bạn. Khi chiều cao chính xác được chọn và thanh được tải...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Smith_Machine_Upright_Row"
    },
    {
      "id": "Spider_Curl",
      "name": "Spider Curl",
      "vi": "Spider Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ chữ z",
      "diff": "Dễ",
      "desc": "Điều chỉnh cáp có cùng độ cao với khuỷu tay của bạn. Đứng nghiêng bên trái về phía ban nhạc cách ban nhạc vài bước chân. Nắm chặt tay cầm bằng tay phải,...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Spider_Curl"
    },
    {
      "id": "Standing_Biceps_Cable_Curl",
      "name": "Standing Biceps Cable Curl",
      "vi": "Standing Biceps Cable Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đứng thẳng thân mình trong khi giữ thanh cuộn cáp được gắn vào ròng rọc thấp. Nắm lấy thanh cáp rộng bằng vai và giữ...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Standing_Biceps_Cable_Curl"
    },
    {
      "id": "Standing_Concentration_Curl",
      "name": "Standing Concentration Curl",
      "vi": "Standing Concentration Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đặt một thanh tạ được tải nhẹ qua phía sau vai của bạn. Bạn cũng có thể sử dụng áo vest có trọng lượng, bao cát hoặc loại vật cản khác cho việc này...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Standing_Concentration_Curl"
    },
    {
      "id": "Standing_Dumbbell_Reverse_Curl",
      "name": "Standing Dumbbell Reverse Curl",
      "vi": "Standing Dumbbell Reverse Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Để bắt đầu, hãy đứng thẳng với một quả tạ ở mỗi tay và cầm theo kiểu phát âm (lòng bàn tay úp xuống). Cánh tay của bạn phải được mở rộng hoàn toàn trong khi bàn chân của bạn ...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Standing_Dumbbell_Reverse_Curl"
    },
    {
      "id": "Standing_Dumbbell_Upright_Row",
      "name": "Standing Dumbbell Upright Row",
      "vi": "Standing Dumbbell Upright Row",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi tay nắm một quả tạ với tư thế cầm hướng về phía trước (lòng bàn tay hướng về phía trước) hơi nhỏ hơn chiều rộng của vai. Quả tạ phải nằm trên...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Standing_Dumbbell_Upright_Row"
    },
    {
      "id": "Standing_Inner-Biceps_Curl",
      "name": "Standing Inner-Biceps Curl",
      "vi": "Standing Inner-Biceps Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Đứng lên với một quả tạ ở mỗi tay được giữ ở độ dài cánh tay. Khuỷu tay phải sát với thân mình. Chân của bạn nên rộng bằng vai...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Standing_Inner-Biceps_Curl"
    },
    {
      "id": "Standing_Olympic_Plate_Hand_Squeeze",
      "name": "Standing Olympic Plate Hand Squeeze",
      "vi": "Standing Olympic Plate Hand Squeeze",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "static",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy đứng thẳng trong khi giữ một đĩa tạ ở cạnh sườn ở độ dài sải tay ở mỗi tay bằng cách cầm trung tính (lòng bàn tay hướng vào trong). Đôi chân của bạn nên...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Standing_Olympic_Plate_Hand_Squeeze"
    },
    {
      "id": "Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl",
      "name": "Standing Palms-Up Barbell Behind The Back Wrist Curl",
      "vi": "Standing Palms-Up Barbell Behind The Back Wrist Curl",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đứng thẳng và giữ một thanh tạ phía sau mông của bạn với độ dài bằng sải tay trong khi sử dụng tay cầm phát âm (lòng bàn tay sẽ hướng ra xa khỏi ...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl"
    },
    {
      "id": "Stiff_Leg_Barbell_Good_Morning",
      "name": "Stiff Leg Barbell Good Morning",
      "vi": "Stiff Leg Barbell Good Morning",
      "icon": "🏋️",
      "muscles": [
        "Lưng dưới"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá phù hợp nhất với chiều cao của bạn. Một khi...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Stiff_Leg_Barbell_Good_Morning"
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
      "id": "Straight_Bar_Bench_Mid_Rows",
      "name": "Straight Bar Bench Mid Rows",
      "vi": "Straight Bar Bench Mid Rows",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đặt một thanh tạ đã được nạp vào cuối băng ghế. Đứng trên băng ghế phía sau quầy bar, cầm nắm vừa phải, nghiêng về phía trước. Đứng với hông ra sau và ngực ...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Straight_Bar_Bench_Mid_Rows"
    },
    {
      "id": "Suspended_Row",
      "name": "Suspended Row",
      "vi": "Suspended Row",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Treo dây đai của bạn ở độ cao ngang ngực. Mỗi tay cầm một tay và ngả người ra sau. Giữ cơ thể thẳng, đầu và ngực hướng lên. Cánh tay của bạn phải...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Suspended_Row"
    },
    {
      "id": "T-Bar_Row_with_Handle",
      "name": "T-Bar Row with Handle",
      "vi": "T-Bar Row with Handle",
      "icon": "🏋️",
      "muscles": [
        "Lưng giữa"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đặt thanh vào bãi mìn hoặc vào một góc để giữ cho nó không bị di chuyển. Tải một trọng lượng thích hợp lên đầu của bạn. Đứng trên quầy bar và đặt Dou...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "T-Bar_Row_with_Handle"
    },
    {
      "id": "Two-Arm_Dumbbell_Preacher_Curl",
      "name": "Two-Arm Dumbbell Preacher Curl",
      "vi": "Two-Arm Dumbbell Preacher Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi cánh tay cầm một quả tạ và đặt hai cánh tay trên lên trên băng ghế thuyết giảng hoặc băng ghế nghiêng. Quả tạ nên được giữ ở độ dài ngang vai...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Two-Arm_Dumbbell_Preacher_Curl"
    },
    {
      "id": "Underhand_Cable_Pulldowns",
      "name": "Underhand Cable Pulldowns",
      "vi": "Underhand Cable Pulldowns",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Ngồi trên máy kéo có thanh rộng gắn vào ròng rọc phía trên. Điều chỉnh miếng đệm đầu gối của máy cho phù hợp với chiều cao của bạn. Những miếng đệm này sẽ...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Underhand_Cable_Pulldowns"
    },
    {
      "id": "Upright_Cable_Row",
      "name": "Upright Cable Row",
      "vi": "Upright Cable Row",
      "icon": "🏋️",
      "muscles": [
        "Cầu vai"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Nắm chặt một phụ kiện cáp thanh thẳng được gắn vào một ròng rọc thấp với tay cầm nghiêng (lòng bàn tay hướng vào đùi của bạn) nhỏ hơn một chút so với...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Upright_Cable_Row"
    },
    {
      "id": "V-Bar_Pulldown",
      "name": "V-Bar Pulldown",
      "vi": "V-Bar Pulldown",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Ngồi xuống máy kéo có thanh chữ V gắn vào ròng rọc phía trên. Điều chỉnh miếng đệm đầu gối của máy cho phù hợp với chiều cao của bạn. Những miếng đệm này sẽ ngăn chặn...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "V-Bar_Pulldown"
    },
    {
      "id": "V-Bar_Pullup",
      "name": "V-Bar Pullup",
      "vi": "V-Bar Pullup",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách đặt điểm giữa của thanh chữ V vào giữa thanh kéo (giả sử rằng trạm kéo bạn đang sử dụng không có tay cầm trung tính ...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "V-Bar_Pullup"
    },
    {
      "id": "Weighted_Ball_Hyperextension",
      "name": "Weighted Ball Hyperextension",
      "vi": "Weighted Ball Hyperextension",
      "icon": "🏋️",
      "muscles": [
        "Lưng dưới"
      ],
      "anim": "kéo",
      "equip": "bóng tập",
      "diff": "Trung bình",
      "desc": "Để bắt đầu, hãy nằm xuống một quả bóng tập với thân mình ấn vào quả bóng và song song với sàn. Quả bóng của bàn chân của bạn phải được ép chặt...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Weighted_Ball_Hyperextension"
    },
    {
      "id": "Weighted_Pull_Ups",
      "name": "Weighted Pull Ups",
      "vi": "Weighted Pull Ups",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Gắn vật nặng vào đai nhúng và cố định nó quanh eo của bạn. Nắm lấy thanh kéo với lòng bàn tay hướng về phía trước. Để có độ bám vừa phải, yo...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Weighted_Pull_Ups"
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
    },
    {
      "id": "Wide-Grip_Pulldown_Behind_The_Neck",
      "name": "Wide-Grip Pulldown Behind The Neck",
      "vi": "Wide-Grip Pulldown Behind The Neck",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Trung bình",
      "desc": "Bắt đầu bằng cách đặt hai quả tạ ở một bên của một chiếc ghế phẳng. Quỳ xuống bằng cả hai đầu gối sao cho cơ thể hướng về phía băng ghế phẳng. Sử dụng ...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Wide-Grip_Pulldown_Behind_The_Neck"
    },
    {
      "id": "Wide-Grip_Rear_Pull-Up",
      "name": "Wide-Grip Rear Pull-Up",
      "vi": "Wide-Grip Rear Pull-Up",
      "icon": "🏋️",
      "muscles": [
        "Xô"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Nắm lấy thanh kéo với lòng bàn tay hướng về phía trước bằng tay cầm rộng. Khi bạn dang cả hai tay ra phía trước để giữ thanh đòn, hãy đưa thân mình...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Wide-Grip_Rear_Pull-Up"
    },
    {
      "id": "Wide-Grip_Standing_Barbell_Curl",
      "name": "Wide-Grip Standing Barbell Curl",
      "vi": "Wide-Grip Standing Barbell Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đứng thẳng với thân mình thẳng trong khi cầm một thanh tạ ở tay cầm rộng bên ngoài. Lòng bàn tay của bạn phải hướng về phía trước. Khuỷu tay nên...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Wide-Grip_Standing_Barbell_Curl"
    },
    {
      "id": "Wrist_Roller",
      "name": "Wrist Roller",
      "vi": "Wrist Roller",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy đứng thẳng lên, nắm lấy con lăn cổ tay bằng cách cầm vợt nghiêng (lòng bàn tay úp xuống). Bàn chân của bạn phải rộng bằng vai. Từ từ nhấc b...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Wrist_Roller"
    },
    {
      "id": "Wrist_Rotations_with_Straight_Bar",
      "name": "Wrist Rotations with Straight Bar",
      "vi": "Wrist Rotations with Straight Bar",
      "icon": "🏋️",
      "muscles": [
        "Cẳng tay"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Giữ một thanh tạ bằng cả hai tay và lòng bàn tay úp xuống; hai tay dang rộng bằng vai. Đây sẽ là vị trí bắt đầu của bạn. Luân phiên giữa...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Wrist_Rotations_with_Straight_Bar"
    },
    {
      "id": "Zottman_Curl",
      "name": "Zottman Curl",
      "vi": "Zottman Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Đứng thẳng với thân mình thẳng và một quả tạ ở mỗi tay được giữ ở độ dài cánh tay. Khuỷu tay phải sát với thân mình. Hãy chắc chắn rằng lòng bàn tay...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Zottman_Curl"
    },
    {
      "id": "Zottman_Preacher_Curl",
      "name": "Zottman Preacher Curl",
      "vi": "Zottman Preacher Curl",
      "icon": "🏋️",
      "muscles": [
        "Tay trước"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Mỗi tay cầm một quả tạ và đặt cánh tay trên của bạn lên trên ghế thuyết giáo hoặc ghế nghiêng. Quả tạ nên được giữ ở vai hei...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Zottman_Preacher_Curl"
    }
  ],
  "3": [
    {
      "id": "Bulgarian_Split_Squat",
      "name": "Bulgarian Split Squat",
      "vi": "Squat Bulgaria",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước",
        "Mông"
      ],
      "anim": "squat",
      "equip": "Ghế + tạ",
      "diff": "Khó",
      "desc": "Một chân đặt lên ghế phía sau, chân trước squat xuống. Cô lập cơ đùi trước.",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Single_Leg_Squat",
      "workoutType": 3
    },
    {
      "id": "3_4_Sit-Up",
      "name": "3/4 Sit-Up",
      "vi": "3/4 Sit-Up",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm xuống sàn và cố định chân. Chân của bạn nên được uốn cong ở đầu gối. Đặt tay của bạn phía sau hoặc sang một bên đầu. Bạn sẽ bắt đầu...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "3_4_Sit-Up"
    },
    {
      "id": "Ab_Crunch_Machine",
      "name": "Ab Crunch Machine",
      "vi": "Ab Crunch Machine",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Chọn lực cản nhẹ và ngồi xuống máy tập bụng, đặt chân dưới các miếng đệm được cung cấp và nắm lấy tay cầm phía trên. Cánh tay của bạn phải...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Ab_Crunch_Machine"
    },
    {
      "id": "Ab_Roller",
      "name": "Ab Roller",
      "vi": "Ab Roller",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Giữ con lăn Ab bằng cả hai tay và quỳ trên sàn. Bây giờ đặt con lăn tập bụng trên sàn trước mặt bạn sao cho bạn hoàn toàn chống tay và ...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Ab_Roller"
    },
    {
      "id": "Air_Bike",
      "name": "Air Bike",
      "vi": "Air Bike",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên sàn, lưng dưới ấn xuống đất. Đối với bài tập này, bạn sẽ cần đặt hai tay bên cạnh đầu. Hãy cẩn thận nhé...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Air_Bike"
    },
    {
      "id": "Alternate_Heel_Touchers",
      "name": "Alternate Heel Touchers",
      "vi": "Alternate Heel Touchers",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm trên sàn với đầu gối cong và bàn chân đặt trên sàn cách nhau khoảng 18-24 inch. Cánh tay của bạn nên được mở rộng ở bên cạnh bạn. Đây sẽ là của bạn...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Alternate_Heel_Touchers"
    },
    {
      "id": "Balance_Board",
      "name": "Balance Board",
      "vi": "Balance Board",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "squat",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Đặt một bảng cân đối trước mặt bạn. Hãy đứng lên và cố gắng giữ thăng bằng. Giữ thăng bằng bao lâu tùy thích....",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Balance_Board"
    },
    {
      "id": "Ball_Leg_Curl",
      "name": "Ball Leg Curl",
      "vi": "Ball Leg Curl",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "bóng tập",
      "diff": "Dễ",
      "desc": "Bắt đầu trên sàn, nằm ngửa với hai chân đặt trên quả bóng. Đặt bóng sao cho khi duỗi chân, mắt cá chân của bạn ở trên...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Ball_Leg_Curl"
    },
    {
      "id": "Barbell_Ab_Rollout",
      "name": "Barbell Ab Rollout",
      "vi": "Barbell Ab Rollout",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đối với bài tập này, bạn sẽ cần vào tư thế chống đẩy, nhưng thay vì chống tay xuống sàn, bạn sẽ nắm lấy một quả bóng Olympic...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Barbell_Ab_Rollout"
    },
    {
      "id": "Barbell_Ab_Rollout_-_On_Knees",
      "name": "Barbell Ab Rollout - On Knees",
      "vi": "Barbell Ab Rollout - On Knees",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Giữ một thanh tạ Olympic có trọng lượng 5-10 pound mỗi bên và quỳ trên sàn. Bây giờ đặt thanh tạ xuống sàn trước mặt bạn để bạn ở trên...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Barbell_Ab_Rollout_-_On_Knees"
    },
    {
      "id": "Barbell_Full_Squat",
      "name": "Barbell Full Squat",
      "vi": "Barbell Full Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh tạ lên giá ngay trên vai. Một khi ...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Barbell_Full_Squat"
    },
    {
      "id": "Barbell_Hack_Squat",
      "name": "Barbell Hack Squat",
      "vi": "Barbell Hack Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đứng thẳng trong khi giữ một thanh tạ phía sau bạn với chiều dài bằng cánh tay và bàn chân rộng bằng vai. Mẹo: Cách cầm rộng bằng vai là tốt nhất với lòng bàn tay...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Barbell_Hack_Squat"
    },
    {
      "id": "Barbell_Lunge",
      "name": "Barbell Lunge",
      "vi": "Barbell Lunge",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá ngay dưới mức vai. Một khi ...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Barbell_Lunge"
    },
    {
      "id": "Barbell_Rollout_from_Bench",
      "name": "Barbell Rollout from Bench",
      "vi": "Barbell Rollout from Bench",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đặt một thanh tạ đã được nạp tải trên mặt đất, gần cuối băng ghế. Quỳ cả hai chân trên băng ghế và nắm chặt thanh tạ ở mức trung bình đến hẹp. Thị...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Barbell_Rollout_from_Bench"
    },
    {
      "id": "Barbell_Seated_Calf_Raise",
      "name": "Barbell Seated Calf Raise",
      "vi": "Barbell Seated Calf Raise",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đặt một khối khoảng 12 inch trước một chiếc ghế phẳng. Ngồi trên băng ghế và đặt bóng của bàn chân lên khối. Nhờ ai đó đặt một thanh tạ lên...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Barbell_Seated_Calf_Raise"
    },
    {
      "id": "Barbell_Side_Bend",
      "name": "Barbell Side Bend",
      "vi": "Barbell Side Bend",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đứng thẳng đồng thời cầm một thanh tạ đặt sau vai (hơi dưới cổ). Bàn chân của bạn phải rộng bằng vai. Th...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Barbell_Side_Bend"
    },
    {
      "id": "Barbell_Side_Split_Squat",
      "name": "Barbell Side Split Squat",
      "vi": "Barbell Side Split Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Đứng thẳng đồng thời cầm một thanh tạ đặt sau vai (hơi dưới cổ). Bàn chân của bạn nên được đặt rộng rãi với ...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Barbell_Side_Split_Squat"
    },
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
      "id": "Barbell_Squat_To_A_Bench",
      "name": "Barbell Squat To A Bench",
      "vi": "Barbell Squat To A Bench",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt một chiếc ghế phẳng hoặc một chiếc hộp phía sau bạn. Băng ghế phẳng được sử dụng...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Barbell_Squat_To_A_Bench"
    },
    {
      "id": "Barbell_Step_Ups",
      "name": "Barbell Step Ups",
      "vi": "Barbell Step Ups",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đứng thẳng đồng thời cầm một thanh tạ đặt sau vai (hơi dưới cổ) và đứng thẳng sau một bục cao...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Barbell_Step_Ups"
    },
    {
      "id": "Barbell_Walking_Lunge",
      "name": "Barbell Walking Lunge",
      "vi": "Barbell Walking Lunge",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bắt đầu đứng với hai chân rộng bằng vai và một thanh tạ ngang lưng trên. Bước một chân về phía trước, gập đầu gối để thả hông xuống...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Barbell_Walking_Lunge"
    },
    {
      "id": "Bent-Knee_Hip_Raise",
      "name": "Bent-Knee Hip Raise",
      "vi": "Bent-Knee Hip Raise",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm phẳng trên sàn với hai cánh tay đặt dọc theo hai bên. Bây giờ uốn cong đầu gối của bạn một góc 75 độ và nhấc chân lên khỏi sàn khoảng 2 ...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Bent-Knee_Hip_Raise"
    },
    {
      "id": "Bent_Press",
      "name": "Bent Press",
      "vi": "Bent Press",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "tạ ấm",
      "diff": "Khó",
      "desc": "Làm sạch một chiếc chuông ấm trên vai của bạn. Làm sạch chuông ấm đến vai của bạn bằng cách kéo dài qua chân và hông khi bạn nâng chuông ấm về phía...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Bent_Press"
    },
    {
      "id": "Bodyweight_Squat",
      "name": "Bodyweight Squat",
      "vi": "Bodyweight Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đứng hai chân rộng bằng vai. Bạn có thể đặt tay ra sau đầu. Đây sẽ là vị trí bắt đầu của bạn. Bắt đầu chuyển động bằng tư thế linh hoạt...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Bodyweight_Squat"
    },
    {
      "id": "Bodyweight_Walking_Lunge",
      "name": "Bodyweight Walking Lunge",
      "vi": "Bodyweight Walking Lunge",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Bắt đầu đứng với hai chân rộng bằng vai và hai tay chống hông. Bước một chân về phía trước, gập đầu gối để thả hông xuống. Đi xuống...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Bodyweight_Walking_Lunge"
    },
    {
      "id": "Bottoms_Up",
      "name": "Bottoms Up",
      "vi": "Bottoms Up",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách nằm ngửa trên mặt đất. Chân của bạn phải thẳng và cánh tay của bạn ở bên cạnh bạn. Đây sẽ là vị trí bắt đầu của bạn. Để thực hiện điều...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Bottoms_Up"
    },
    {
      "id": "Box_Squat_with_Chains",
      "name": "Box Squat with Chains",
      "vi": "Box Squat with Chains",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Ngồi trên máy kéo có thanh rộng gắn vào ròng rọc phía trên. Điều chỉnh miếng đệm đầu gối của máy cho phù hợp với chiều cao của bạn. Những miếng đệm này sẽ...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Box_Squat_with_Chains"
    },
    {
      "id": "Butt-Ups",
      "name": "Butt-Ups",
      "vi": "Butt-Ups",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Bắt đầu ở tư thế chống đẩy nhưng khuỷu tay đặt trên mặt đất và đặt trên cẳng tay. Cánh tay của bạn phải uốn cong một góc 90 độ. Cong lưng lại...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Butt-Ups"
    },
    {
      "id": "Butt_Lift_Bridge",
      "name": "Butt Lift (Bridge)",
      "vi": "Butt Lift (Bridge)",
      "icon": "🏋️",
      "muscles": [
        "Mông"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đối với bài tập này, bạn sẽ cần sử dụng máy nâng bắp chân lừa. Bắt đầu bằng cách đặt lưng dưới và hông của bạn dưới cần đệm được cung cấp. ...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Butt_Lift_Bridge"
    },
    {
      "id": "Cable_Crunch",
      "name": "Cable Crunch",
      "vi": "Cable Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Quỳ dưới một ròng rọc cao có gắn dây thừng. Nắm chặt phần đính kèm của dây cáp và hạ dây xuống cho đến khi tay bạn đặt cạnh mặt...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Cable_Crunch"
    },
    {
      "id": "Cable_Deadlifts",
      "name": "Cable Deadlifts",
      "vi": "Cable Deadlifts",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Di chuyển dây cáp xuống đáy tháp và chọn trọng lượng phù hợp. Đứng trực tiếp giữa những người đứng thẳng. Để bắt đầu, ngồi xổm xuống và uốn cong ...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Cable_Deadlifts"
    },
    {
      "id": "Cable_Hip_Adduction",
      "name": "Cable Hip Adduction",
      "vi": "Cable Hip Adduction",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Đứng trước một ròng rọc thấp hướng về phía trước, một chân cạnh ròng rọc và chân còn lại hướng ra ngoài. Gắn vòng bít vào mắt cá chân vào dây cáp và cả vào...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Cable_Hip_Adduction"
    },
    {
      "id": "Cable_Judo_Flip",
      "name": "Cable Judo Flip",
      "vi": "Cable Judo Flip",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Nối dây vào tháp và di chuyển cáp đến vị trí ròng rọc thấp nhất. Đứng nghiêng về phía dây cáp với tư thế rộng và nắm lấy...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Cable_Judo_Flip"
    },
    {
      "id": "Cable_Reverse_Crunch",
      "name": "Cable Reverse Crunch",
      "vi": "Cable Reverse Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Kết nối phụ kiện dây đeo mắt cá chân với cáp ròng rọc thấp và đặt một tấm thảm trên sàn phía trước nó. Ngồi xuống, đưa chân về phía ròng rọc và ...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Cable_Reverse_Crunch"
    },
    {
      "id": "Cable_Russian_Twists",
      "name": "Cable Russian Twists",
      "vi": "Cable Russian Twists",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Kết nối phụ kiện tay cầm tiêu chuẩn và đặt cáp vào vị trí ròng rọc ở giữa. Nằm trên một quả bóng ổn định vuông góc với dây cáp và nắm lấy ...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Cable_Russian_Twists"
    },
    {
      "id": "Cable_Seated_Crunch",
      "name": "Cable Seated Crunch",
      "vi": "Cable Seated Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Ngồi trên ghế phẳng, lưng quay về phía ròng rọc cao. Nắm chặt phần gắn dây cáp bằng cả hai tay (với lòng bàn tay hướng vào nhau...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Cable_Seated_Crunch"
    },
    {
      "id": "Calf_Press",
      "name": "Calf Press",
      "vi": "Calf Press",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Điều chỉnh ghế sao cho chân của bạn chỉ hơi cong ở vị trí bắt đầu. Các quả bóng của bàn chân của bạn phải vững chắc trên nền tảng. Chọn một ứng dụng...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Calf_Press"
    },
    {
      "id": "Calf_Press_On_The_Leg_Press_Machine",
      "name": "Calf Press On The Leg Press Machine",
      "vi": "Calf Press On The Leg Press Machine",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Sử dụng máy ép chân, ngồi xuống máy và đặt chân lên bệ ngay trước mặt bạn với khoảng cách chân vừa phải (rộng vai).",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Calf_Press_On_The_Leg_Press_Machine"
    },
    {
      "id": "Calf_Raise_On_A_Dumbbell",
      "name": "Calf Raise On A Dumbbell",
      "vi": "Calf Raise On A Dumbbell",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Bám vào một vật chắc chắn để giữ thăng bằng và đứng trên tay cầm quả tạ, tốt nhất là loại có đĩa tròn để nó lăn như cách này bạn phải...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Calf_Raise_On_A_Dumbbell"
    },
    {
      "id": "Chair_Squat",
      "name": "Chair Squat",
      "vi": "Chair Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Để bắt đầu, trước tiên hãy đặt thanh ở vị trí phù hợp nhất với chiều cao của bạn. Sau khi thanh đã được tải xong, hãy bước xuống dưới thanh đó và đặt nó ở phía sau...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Chair_Squat"
    },
    {
      "id": "Cocoons",
      "name": "Cocoons",
      "vi": "Cocoons",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách nằm ngửa trên mặt đất. Chân của bạn phải thẳng và cánh tay của bạn mở rộng ra phía sau đầu. Đây sẽ là vị trí bắt đầu của bạn. ...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Cocoons"
    },
    {
      "id": "Cross-Body_Crunch",
      "name": "Cross-Body Crunch",
      "vi": "Cross-Body Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm ngửa và uốn cong đầu gối khoảng 60 độ. Giữ bàn chân phẳng trên sàn và đặt hai tay thoải mái sau đầu. Điều này sẽ...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Cross-Body_Crunch"
    },
    {
      "id": "Crunch_-_Hands_Overhead",
      "name": "Crunch - Hands Overhead",
      "vi": "Crunch - Hands Overhead",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm trên sàn với lưng phẳng và đầu gối cong một góc khoảng 60 độ giữa gân kheo và bắp chân. Giữ bàn chân của bạn phẳng trên sàn...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Crunch_-_Hands_Overhead"
    },
    {
      "id": "Crunch_-_Legs_On_Exercise_Ball",
      "name": "Crunch - Legs On Exercise Ball",
      "vi": "Crunch - Legs On Exercise Ball",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm ngửa, hai chân đặt trên một quả bóng tập thể dục và đầu gối cong một góc 90 độ. Đặt hai bàn chân của bạn cách nhau ba đến bốn inch ...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Crunch_-_Legs_On_Exercise_Ball"
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
      "id": "Dead_Bug",
      "name": "Dead Bug",
      "vi": "Dead Bug",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Bắt đầu nằm ngửa với hai tay duỗi thẳng phía trên bạn về phía trần nhà. Đưa bàn chân, đầu gối và hông của bạn lên tới 90 độ. Thở ra thật mạnh để...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Dead_Bug"
    },
    {
      "id": "Decline_Crunch",
      "name": "Decline Crunch",
      "vi": "Decline Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Cố định chân của bạn ở cuối băng ghế và nằm xuống. Bây giờ đặt nhẹ hai tay ở hai bên đầu, giữ khuỷu tay hướng vào trong. Mẹo: D...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Decline_Crunch"
    },
    {
      "id": "Decline_Oblique_Crunch",
      "name": "Decline Oblique Crunch",
      "vi": "Decline Oblique Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Cố định chân của bạn ở cuối băng ghế và từ từ nằm xuống băng ghế. Nâng phần thân trên của bạn lên khỏi ghế cho đến khi thân mình cao khoảng 35-45...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Decline_Oblique_Crunch"
    },
    {
      "id": "Decline_Reverse_Crunch",
      "name": "Decline Reverse Crunch",
      "vi": "Decline Reverse Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên ghế dài và giữ chặt đầu ghế bằng cả hai tay. Đừng để cơ thể bạn trượt xuống từ vị trí này. Hãy giữ lấy...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Decline_Reverse_Crunch"
    },
    {
      "id": "Donkey_Calf_Raises",
      "name": "Donkey Calf Raises",
      "vi": "Donkey Calf Raises",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Đối với bài tập này, bạn sẽ cần sử dụng máy nâng bắp chân lừa. Bắt đầu bằng cách đặt lưng dưới và hông của bạn dưới cần đệm được cung cấp. ...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Donkey_Calf_Raises"
    },
    {
      "id": "Downward_Facing_Balance",
      "name": "Downward Facing Balance",
      "vi": "Downward Facing Balance",
      "icon": "🏋️",
      "muscles": [
        "Mông"
      ],
      "anim": "static",
      "equip": "bóng tập",
      "diff": "Trung bình",
      "desc": "Nằm úp mặt lên trên một quả bóng tập thể dục. Trong khi nằm sấp trên quả bóng, đưa hai tay về phía trước dọc theo sàn và nhấc chân lên, duỗi thẳng...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Downward_Facing_Balance"
    },
    {
      "id": "Dumbbell_Clean",
      "name": "Dumbbell Clean",
      "vi": "Dumbbell Clean",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Bắt đầu đứng với một quả tạ ở mỗi tay với hai chân rộng bằng vai. Hạ tạ xuống sàn bằng cách gập hông và đầu gối, đẩy...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Dumbbell_Clean"
    },
    {
      "id": "Dumbbell_Lunges",
      "name": "Dumbbell Lunges",
      "vi": "Dumbbell Lunges",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng thẳng thân mình, cầm hai quả tạ trên tay ở hai bên. Đây sẽ là vị trí bắt đầu của bạn. Bước chân phải về phía trước...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Dumbbell_Lunges"
    },
    {
      "id": "Dumbbell_Rear_Lunge",
      "name": "Dumbbell Rear Lunge",
      "vi": "Dumbbell Rear Lunge",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Đứng thẳng thân mình, cầm hai quả tạ trên tay ở hai bên. Đây sẽ là vị trí bắt đầu của bạn. Bước lùi lại bằng chân phải...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Dumbbell_Rear_Lunge"
    },
    {
      "id": "Dumbbell_Side_Bend",
      "name": "Dumbbell Side Bend",
      "vi": "Dumbbell Side Bend",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đứng thẳng trong khi tay trái cầm một quả tạ (lòng bàn tay hướng vào thân) trong khi tay phải giữ eo. Bàn chân của bạn nên...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Dumbbell_Side_Bend"
    },
    {
      "id": "Dumbbell_Squat",
      "name": "Dumbbell Squat",
      "vi": "Dumbbell Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đặt một thanh tạ được tải nhẹ qua phía sau vai của bạn. Bạn cũng có thể sử dụng áo vest có trọng lượng, bao cát hoặc loại vật cản khác cho việc này...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Dumbbell_Squat"
    },
    {
      "id": "Dumbbell_Squat_To_A_Bench",
      "name": "Dumbbell Squat To A Bench",
      "vi": "Dumbbell Squat To A Bench",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Đứng thẳng với một chiếc ghế phẳng phía sau, đồng thời cầm một quả tạ ở mỗi tay (lòng bàn tay hướng vào một bên chân). Định vị chân của bạn bằng cách sử dụng ...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Dumbbell_Squat_To_A_Bench"
    },
    {
      "id": "Dumbbell_Step_Ups",
      "name": "Dumbbell Step Ups",
      "vi": "Dumbbell Step Ups",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Đứng thẳng, mỗi tay cầm một quả tạ (lòng bàn tay hướng vào một bên chân). Đặt chân phải lên bục cao. Bước lên...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Dumbbell_Step_Ups"
    },
    {
      "id": "Elbow_to_Knee",
      "name": "Elbow to Knee",
      "vi": "Elbow to Knee",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm trên sàn, bắt chéo chân phải qua đầu gối trái cong. Chắp hai tay ra sau đầu, bắt đầu bằng xương bả vai trên ...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Elbow_to_Knee"
    },
    {
      "id": "Elevated_Back_Lunge",
      "name": "Elevated Back Lunge",
      "vi": "Elevated Back Lunge",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đặt thanh lên giá ở độ cao ngang vai với trọng lượng thích hợp. Đặt một bệ ngắn, cao phía sau bạn. Đặt thanh lên phía trên của bạn...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Elevated_Back_Lunge"
    },
    {
      "id": "Exercise_Ball_Crunch",
      "name": "Exercise Ball Crunch",
      "vi": "Exercise Ball Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "bóng tập",
      "diff": "Dễ",
      "desc": "Nằm trên một quả bóng tập với độ cong của lưng dưới ép vào bề mặt hình cầu của quả bóng. Bàn chân của bạn phải cong ở đầu gối và...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Exercise_Ball_Crunch"
    },
    {
      "id": "Exercise_Ball_Pull-In",
      "name": "Exercise Ball Pull-In",
      "vi": "Exercise Ball Pull-In",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "bóng tập",
      "diff": "Dễ",
      "desc": "Đặt một quả bóng tập thể dục gần đó và nằm trên sàn phía trước nó với hai tay đặt trên sàn rộng bằng vai trong tư thế chống đẩy. Bây giờ hãy đặt bạn...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Exercise_Ball_Pull-In"
    },
    {
      "id": "Flat_Bench_Leg_Pull-In",
      "name": "Flat Bench Leg Pull-In",
      "vi": "Flat Bench Leg Pull-In",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm trên thảm tập thể dục hoặc ghế phẳng, hai chân duỗi thẳng. Đặt bàn tay của bạn dưới mông với lòng bàn tay hướng xuống hoặc hai bên giữ...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Flat_Bench_Leg_Pull-In"
    },
    {
      "id": "Flat_Bench_Lying_Leg_Raise",
      "name": "Flat Bench Lying Leg Raise",
      "vi": "Flat Bench Lying Leg Raise",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên ghế dài và hai chân duỗi thẳng về phía trước. Đặt bàn tay của bạn dưới mông với lòng bàn tay úp xuống ...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Flat_Bench_Lying_Leg_Raise"
    },
    {
      "id": "Floor_Glute-Ham_Raise",
      "name": "Floor Glute-Ham Raise",
      "vi": "Floor Glute-Ham Raise",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Bạn có thể nhờ một người cùng tập cho bài tập này hoặc đặt chân dưới một vật gì đó ổn định. Bắt đầu quỳ gối với chân trên và thân thẳng. Nếu sử dụng...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Floor_Glute-Ham_Raise"
    },
    {
      "id": "Flutter_Kicks",
      "name": "Flutter Kicks",
      "vi": "Flutter Kicks",
      "icon": "🏋️",
      "muscles": [
        "Mông"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Trên ghế phẳng, nằm úp mặt, hông áp vào mép ghế, hai chân duỗi thẳng, mũi chân cao khỏi sàn và hai tay đặt trên thành ghế...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Flutter_Kicks"
    },
    {
      "id": "Freehand_Jump_Squat",
      "name": "Freehand Jump Squat",
      "vi": "Freehand Jump Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Khoanh tay trước ngực. Ngẩng đầu và thẳng lưng, đặt hai chân rộng bằng vai. Giữ lưng thẳng và ngực...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Freehand_Jump_Squat"
    },
    {
      "id": "Frog_Sit-Ups",
      "name": "Frog Sit-Ups",
      "vi": "Frog Sit-Ups",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Nằm ngửa lưng trên sàn (hoặc thảm tập) và hai chân duỗi thẳng về phía trước. Bây giờ uốn cong đầu gối và đặt đùi ngoài của bạn bằng ...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Frog_Sit-Ups"
    },
    {
      "id": "Front_Barbell_Squat",
      "name": "Front Barbell Squat",
      "vi": "Front Barbell Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá phù hợp nhất với chiều cao của bạn. Một khi...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Front_Barbell_Squat"
    },
    {
      "id": "Front_Barbell_Squat_To_A_Bench",
      "name": "Front Barbell Squat To A Bench",
      "vi": "Front Barbell Squat To A Bench",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt một chiếc ghế phẳng phía sau bạn và đặt thanh đòn lên giá...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Front_Barbell_Squat_To_A_Bench"
    },
    {
      "id": "Front_Squat_Clean_Grip",
      "name": "Front Squat (Clean Grip)",
      "vi": "Front Squat (Clean Grip)",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Để bắt đầu, trước tiên hãy đặt thanh tạ vào giá thấp hơn vai một chút. Đặt thanh đòn lên trên cơ delta, đẩy vào xương đòn và chạm nhẹ...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Front_Squat_Clean_Grip"
    },
    {
      "id": "Glute_Kickback",
      "name": "Glute Kickback",
      "vi": "Glute Kickback",
      "icon": "🏋️",
      "muscles": [
        "Mông"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Quỳ trên sàn hoặc thảm tập và uốn cong ở thắt lưng với hai cánh tay dang rộng trước mặt (vuông góc với thân) để vào ...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Glute_Kickback"
    },
    {
      "id": "Goblet_Squat",
      "name": "Goblet Squat",
      "vi": "Goblet Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "tạ ấm",
      "diff": "Dễ",
      "desc": "Đứng cầm một chiếc chuông ấm nhẹ cạnh sừng gần ngực. Đây sẽ là vị trí bắt đầu của bạn. Ngồi xổm xuống giữa hai chân cho đến khi gân kheo của bạn...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Goblet_Squat"
    },
    {
      "id": "Gorilla_Chin_Crunch",
      "name": "Gorilla Chin/Crunch",
      "vi": "Gorilla Chin/Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Treo người trên thanh chống cằm bằng cách cầm nắm dưới tay (lòng bàn tay hướng về phía bạn) rộng hơn một chút so với chiều rộng của vai. Bây giờ uốn cong đầu gối của bạn một góc 90 độ...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Gorilla_Chin_Crunch"
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
      "id": "Hanging_Leg_Raise",
      "name": "Hanging Leg Raise",
      "vi": "Hanging Leg Raise",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Khó",
      "desc": "Treo người trên thanh chống cằm với cả hai cánh tay dang rộng bằng cánh tay ở phía trên người bằng cách sử dụng tay nắm rộng hoặc tay cầm vừa. Chân phải thẳng...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Hanging_Leg_Raise"
    },
    {
      "id": "Hanging_Pike",
      "name": "Hanging Pike",
      "vi": "Hanging Pike",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Khó",
      "desc": "Treo mình trên thanh chống cằm với hai chân và bàn chân khép vào nhau bằng cách cầm nắm quá tay (lòng bàn tay hướng ra xa bạn) rộng hơn một chút so với chiều rộng vai...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Hanging_Pike"
    },
    {
      "id": "Jackknife_Sit-Up",
      "name": "Jackknife Sit-Up",
      "vi": "Jackknife Sit-Up",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên sàn (hoặc thảm tập), hai tay duỗi thẳng ra sau đầu và hai chân cũng duỗi thẳng. Đây sẽ là...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Jackknife_Sit-Up"
    },
    {
      "id": "Janda_Sit-Up",
      "name": "Janda Sit-Up",
      "vi": "Janda Sit-Up",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đặt cơ thể của bạn trên sàn ở tư thế ngồi dậy cơ bản; đầu gối tạo thành một góc 90 độ, bàn chân đặt phẳng trên sàn và hai tay bắt chéo nhau ...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Janda_Sit-Up"
    },
    {
      "id": "Jefferson_Squats",
      "name": "Jefferson Squats",
      "vi": "Jefferson Squats",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đặt một thanh tạ trên sàn. Đứng ở giữa chiều dài thanh một cách khôn ngoan. Cúi xuống bằng cách uốn cong đầu gối và giữ thẳng lưng và nắm lấy...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Jefferson_Squats"
    },
    {
      "id": "Knee_Hip_Raise_On_Parallel_Bars",
      "name": "Knee/Hip Raise On Parallel Bars",
      "vi": "Knee/Hip Raise On Parallel Bars",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Đặt cơ thể của bạn trên ghế nâng chân thẳng đứng sao cho cẳng tay của bạn nằm trên miếng đệm cạnh thân và giữ chặt vào tay cầm. Của bạn...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Knee_Hip_Raise_On_Parallel_Bars"
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
      "id": "Leg_Lift",
      "name": "Leg Lift",
      "vi": "Leg Lift",
      "icon": "🏋️",
      "muscles": [
        "Mông"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Trong khi đứng thẳng với cả hai chân cạnh nhau rộng bằng vai, hãy bám vào một bề mặt chắc chắn như hai bên của giá ngồi xổm hoặc ...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Leg_Lift"
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
      "id": "Leg_Pull-In",
      "name": "Leg Pull-In",
      "vi": "Leg Pull-In",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm trên thảm tập, hai chân duỗi thẳng và lòng bàn tay úp xuống cạnh bạn hoặc dưới mông. Mẹo: Sở thích của tôi là với ...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Leg_Pull-In"
    },
    {
      "id": "Leverage_Deadlift",
      "name": "Leverage Deadlift",
      "vi": "Leverage Deadlift",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Tải các chân đến trọng lượng thích hợp. Định vị bản thân trực tiếp giữa các tay cầm. Nắm chặt tay cầm phía dưới bằng cách cầm thoải mái, rồi hạ thấp...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Leverage_Deadlift"
    },
    {
      "id": "Lunge_Pass_Through",
      "name": "Lunge Pass Through",
      "vi": "Lunge Pass Through",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "đẩy",
      "equip": "tạ ấm",
      "diff": "Trung bình",
      "desc": "Đứng thẳng thân mình, cầm một chiếc chuông ấm trong tay phải. Đây sẽ là vị trí bắt đầu của bạn. Bước chân trái về phía trước và hạ thấp...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Lunge_Pass_Through"
    },
    {
      "id": "Lunge_Sprint",
      "name": "Lunge Sprint",
      "vi": "Lunge Sprint",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Điều chỉnh thanh trong máy Smith đến độ cao thích hợp. Đặt mình dưới thanh đòn, đặt nó ngang sau vai. Mở khóa ba...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Lunge_Sprint"
    },
    {
      "id": "Lying_Leg_Curls",
      "name": "Lying Leg Curls",
      "vi": "Lying Leg Curls",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Điều chỉnh cần máy cho phù hợp với chiều cao của bạn và nằm úp mặt xuống máy uốn chân với phần đệm của cần ở phía sau chân (chỉ vài...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Lying_Leg_Curls"
    },
    {
      "id": "Lying_Machine_Squat",
      "name": "Lying Machine Squat",
      "vi": "Lying Machine Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Điều chỉnh máy tập chân ở độ cao cho phép bạn vào trong máy với đầu gối cong và đùi hơi song song. Một khi bạn chọn t...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Lying_Machine_Squat"
    },
    {
      "id": "Monster_Walk",
      "name": "Monster Walk",
      "vi": "Monster Walk",
      "icon": "🏋️",
      "muscles": [
        "Abductors"
      ],
      "anim": "kéo",
      "equip": "dây kháng lực",
      "diff": "Dễ",
      "desc": "Đặt một dải băng quanh cả hai mắt cá chân và một dải khác quanh cả hai đầu gối. Phải có đủ lực căng để chúng bó chặt khi bàn chân của bạn rộng bằng vai...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Monster_Walk"
    },
    {
      "id": "Narrow_Stance_Hack_Squats",
      "name": "Narrow Stance Hack Squats",
      "vi": "Narrow Stance Hack Squats",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Tải trọng lượng thích hợp lên các chốt và điều chỉnh ghế phù hợp với chiều cao của bạn. Tay cầm phải ở gần đỉnh ngực khi bắt đầu ...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Narrow_Stance_Hack_Squats"
    },
    {
      "id": "Narrow_Stance_Leg_Press",
      "name": "Narrow Stance Leg Press",
      "vi": "Narrow Stance Leg Press",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Sử dụng máy ép chân, ngồi xuống máy và đặt chân lên bệ ngay trước mặt bạn với chiều rộng hẹp hơn vai...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Narrow_Stance_Leg_Press"
    },
    {
      "id": "Narrow_Stance_Squats",
      "name": "Narrow Stance Squats",
      "vi": "Narrow Stance Squats",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá phù hợp nhất với chiều cao của bạn. Một khi...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Narrow_Stance_Squats"
    },
    {
      "id": "Natural_Glute_Ham_Raise",
      "name": "Natural Glute Ham Raise",
      "vi": "Natural Glute Ham Raise",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Sử dụng miếng đệm chân của máy kéo xô hoặc ghế dài, định vị bản thân sao cho mắt cá chân của bạn nằm dưới miếng đệm, đầu gối đặt trên ghế và bạn ...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Natural_Glute_Ham_Raise"
    },
    {
      "id": "Oblique_Crunches",
      "name": "Oblique Crunches",
      "vi": "Oblique Crunches",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm ngửa trên sàn, lưng dưới ấn xuống đất. Đối với bài tập này, bạn sẽ cần đặt một tay bên cạnh đầu và tay kia để...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Oblique_Crunches"
    },
    {
      "id": "Oblique_Crunches_-_On_The_Floor",
      "name": "Oblique Crunches - On The Floor",
      "vi": "Oblique Crunches - On The Floor",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách nằm nghiêng về bên phải với hai chân chồng lên nhau. Hãy chắc chắn rằng đầu gối của bạn hơi cong một chút. Đặt tay trái của bạn ở phía sau...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Oblique_Crunches_-_On_The_Floor"
    },
    {
      "id": "Otis-Up",
      "name": "Otis-Up",
      "vi": "Otis-Up",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Cố định chân và nằm ngửa trên sàn. Đầu gối của bạn nên được uốn cong. Giữ một vật nặng bằng cả hai tay vào ngực. Đây sẽ là vị trí khởi đầu của bạn...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Otis-Up"
    },
    {
      "id": "Pallof_Press",
      "name": "Pallof Press",
      "vi": "Pallof Press",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Kết nối tay cầm tiêu chuẩn với tháp và—nếu có thể—đặt cáp ở độ cao ngang vai. Nếu không, một ròng rọc thấp sẽ đủ. Cùng bên bạn ...",
      "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
      "imgFolder": "Pallof_Press"
    },
    {
      "id": "Pallof_Press_With_Rotation",
      "name": "Pallof Press With Rotation",
      "vi": "Pallof Press With Rotation",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Ngồi trên sàn và dang rộng hai chân một cách thoải mái. Đặt một chiếc chuông ấm lên vai của bạn. Nhấn chuông ấm lên và ra cho đến khi nó khóa...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Pallof_Press_With_Rotation"
    },
    {
      "id": "Physioball_Hip_Bridge",
      "name": "Physioball Hip Bridge",
      "vi": "Physioball Hip Bridge",
      "icon": "🏋️",
      "muscles": [
        "Mông"
      ],
      "anim": "đẩy",
      "equip": "bóng tập",
      "diff": "Dễ",
      "desc": "Nằm trên một quả bóng sao cho lưng trên của bạn nằm trên quả bóng và hông không được hỗ trợ. Cả hai bàn chân phải đặt phẳng trên sàn, rộng bằng hông hoặc rộng hơn. Cái này...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Physioball_Hip_Bridge"
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
      "id": "Plate_Twist",
      "name": "Plate Twist",
      "vi": "Plate Twist",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Nằm xuống sàn hoặc thảm tập, hai chân duỗi thẳng và phần thân trên thẳng đứng. Nắm lấy chiếc đĩa ở hai bên bằng cả hai tay...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Plate_Twist"
    },
    {
      "id": "Platform_Hamstring_Slides",
      "name": "Platform Hamstring Slides",
      "vi": "Platform Hamstring Slides",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Đối với phong trào này, cần có sàn gỗ hoặc tương tự. Nằm ngửa với hai chân duỗi thẳng. Đặt một chiếc khăn tập thể dục hoặc một vật nặng nhẹ bên dưới...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Platform_Hamstring_Slides"
    },
    {
      "id": "Plie_Dumbbell_Squat",
      "name": "Plie Dumbbell Squat",
      "vi": "Plie Dumbbell Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Giữ một quả tạ ở chân đế bằng cả hai tay và đứng thẳng. Di chuyển hai chân của bạn sao cho chúng rộng hơn chiều rộng của vai và...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Plie_Dumbbell_Squat"
    },
    {
      "id": "Power_Clean",
      "name": "Power Clean",
      "vi": "Power Clean",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đứng với hai chân rộng hơn vai một chút và ngón chân hơi hướng ra ngoài. Ngồi xổm xuống và nắm thanh đòn với tay cầm khép và nghiêng. Vâng...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Power_Clean"
    },
    {
      "id": "Press_Sit-Up",
      "name": "Press Sit-Up",
      "vi": "Press Sit-Up",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Để bắt đầu, hãy nằm xuống ghế với thanh tạ đặt trên ngực. Đặt chân của bạn sao cho chúng được cố định chắc chắn trên phần mở rộng của ghế tập bụng. Thị...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Press_Sit-Up"
    },
    {
      "id": "Pull_Through",
      "name": "Pull Through",
      "vi": "Pull Through",
      "icon": "🏋️",
      "muscles": [
        "Mông"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Bắt đầu đứng cách một ròng rọc thấp vài feet có gắn dây hoặc tay cầm. Quay mặt ra khỏi máy, dang chân trên dây cáp, đặt chân...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Pull_Through"
    },
    {
      "id": "Reverse_Crunch",
      "name": "Reverse Crunch",
      "vi": "Reverse Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm xuống sàn với hai chân duỗi thẳng hoàn toàn và hai tay đặt ngang thân mình với lòng bàn tay đặt trên sàn. Cánh tay của bạn phải đứng yên trong...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Reverse_Crunch"
    },
    {
      "id": "Reverse_Hyperextension",
      "name": "Reverse Hyperextension",
      "vi": "Reverse Hyperextension",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Đặt chân của bạn vào giữa các miếng đệm sau khi tải trọng lượng thích hợp. Nằm trên miếng đệm trên cùng, để hông của bạn thõng ra phía sau, đồng thời nắm lấy ...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Reverse_Hyperextension"
    },
    {
      "id": "Rocking_Standing_Calf_Raise",
      "name": "Rocking Standing Calf Raise",
      "vi": "Rocking Standing Calf Raise",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá phù hợp nhất với chiều cao của bạn. Một khi...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Rocking_Standing_Calf_Raise"
    },
    {
      "id": "Romanian_Deadlift",
      "name": "Romanian Deadlift",
      "vi": "Romanian Deadlift",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đặt một thanh tạ trên mặt đất trước mặt bạn và nắm lấy nó bằng tay cầm phát âm (lòng bàn tay úp xuống) rộng hơn một chút so với chiều rộng vai. Mẹo: Tùy thuộc...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Romanian_Deadlift"
    },
    {
      "id": "Rope_Crunch",
      "name": "Rope Crunch",
      "vi": "Rope Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Quỳ 1-2 feet trước hệ thống cáp có gắn dây. Sau khi chọn được trọng lượng phù hợp, hãy nắm lấy sợi dây bằng cả hai tay vươn quá cao...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Rope_Crunch"
    },
    {
      "id": "Russian_Twist",
      "name": "Russian Twist",
      "vi": "Russian Twist",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Trung bình",
      "desc": "Nằm xuống sàn đặt chân của bạn dưới một vật gì đó không di chuyển hoặc nhờ đối tác giữ chúng. Chân của bạn nên được uốn cong ở đầu gối...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Russian_Twist"
    },
    {
      "id": "Seated_Barbell_Twist",
      "name": "Seated Barbell Twist",
      "vi": "Seated Barbell Twist",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bắt đầu bằng cách ngồi ở cuối một chiếc ghế phẳng với một thanh tạ đặt trên đùi. Hai chân của bạn phải rộng bằng vai nhau....",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Seated_Barbell_Twist"
    },
    {
      "id": "Seated_Calf_Raise",
      "name": "Seated Calf Raise",
      "vi": "Seated Calf Raise",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Ngồi trên máy và đặt ngón chân của bạn lên phần dưới của bệ có gót chân duỗi ra. Chọn vị trí ngón chân của ...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Seated_Calf_Raise"
    },
    {
      "id": "Seated_Flat_Bench_Leg_Pull-In",
      "name": "Seated Flat Bench Leg Pull-In",
      "vi": "Seated Flat Bench Leg Pull-In",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Ngồi trên một chiếc ghế dài với hai chân duỗi thẳng về phía trước hơi thấp hơn song song và hai tay giữ hai bên ghế. Thân của bạn phải...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Seated_Flat_Bench_Leg_Pull-In"
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
      "id": "Seated_Leg_Tucks",
      "name": "Seated Leg Tucks",
      "vi": "Seated Leg Tucks",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Ngồi trên một chiếc ghế dài với hai chân duỗi thẳng về phía trước hơi thấp hơn song song và hai tay giữ hai bên ghế. Thân của bạn phải...",
      "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
      "imgFolder": "Seated_Leg_Tucks"
    },
    {
      "id": "Side_Bridge",
      "name": "Side Bridge",
      "vi": "Side Bridge",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "static",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": null,
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Side_Bridge"
    },
    {
      "id": "Side_Jackknife",
      "name": "Side Jackknife",
      "vi": "Side Jackknife",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": null,
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Side_Jackknife"
    },
    {
      "id": "Sit-Up",
      "name": "Sit-Up",
      "vi": "Sit-Up",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Nằm xuống sàn đặt chân của bạn dưới một vật gì đó không di chuyển hoặc nhờ đối tác giữ chúng. Chân của bạn nên được uốn cong ở đầu gối...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Sit-Up"
    },
    {
      "id": "Smith_Machine_Calf_Raise",
      "name": "Smith Machine Calf Raise",
      "vi": "Smith Machine Calf Raise",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đặt một khối hoặc đĩa cân bên dưới thanh trên máy Smith. Đặt thanh ở vị trí phù hợp nhất với chiều cao của bạn. Khi chiều cao chính xác là ...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Smith_Machine_Calf_Raise"
    },
    {
      "id": "Smith_Machine_Hang_Power_Clean",
      "name": "Smith Machine Hang Power Clean",
      "vi": "Smith Machine Hang Power Clean",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Đặt thanh ở độ cao đầu gối và tải nó đến trọng lượng thích hợp. Nắm chặt vào thanh nằm ngoài chiều rộng của vai và tháo móc ra khỏi...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Smith_Machine_Hang_Power_Clean"
    },
    {
      "id": "Smith_Machine_Hip_Raise",
      "name": "Smith Machine Hip Raise",
      "vi": "Smith Machine Hip Raise",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Đặt một băng ghế vào giá và tải thanh đến trọng lượng thích hợp. Nằm ngửa trên ghế, đặt lòng bàn chân lên thanh đòn. Mở khóa...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Smith_Machine_Hip_Raise"
    },
    {
      "id": "Smith_Machine_Leg_Press",
      "name": "Smith Machine Leg Press",
      "vi": "Smith Machine Leg Press",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Đặt thanh máy Smith cách mặt đất vài feet. Đảm bảo rằng nó đang nằm trên các chốt an toàn. Sau khi tải thanh đến mức cân thích hợp...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Smith_Machine_Leg_Press"
    },
    {
      "id": "Smith_Machine_Pistol_Squat",
      "name": "Smith Machine Pistol Squat",
      "vi": "Smith Machine Pistol Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Trung bình",
      "desc": "Để bắt đầu, trước tiên hãy đặt thanh ở vị trí phù hợp nhất với chiều cao của bạn. Bước xuống dưới và đặt thanh đòn ngang phía sau vai của bạn. Lấy cái...",
      "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      "imgFolder": "Smith_Machine_Pistol_Squat"
    },
    {
      "id": "Smith_Machine_Reverse_Calf_Raises",
      "name": "Smith Machine Reverse Calf Raises",
      "vi": "Smith Machine Reverse Calf Raises",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Điều chỉnh thanh tạ trên máy smith để phù hợp với chiều cao của bạn và căn chỉnh một bệ nâng ngay dưới thanh. Đứng trên bục bằng gót chân của bạn...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Smith_Machine_Reverse_Calf_Raises"
    },
    {
      "id": "Smith_Machine_Squat",
      "name": "Smith Machine Squat",
      "vi": "Smith Machine Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Để bắt đầu, trước tiên hãy đặt thanh ở độ cao phù hợp nhất với chiều cao của bạn. Khi chiều cao chính xác được chọn và thanh được tải, hãy bước dưới thanh...",
      "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      "imgFolder": "Smith_Machine_Squat"
    },
    {
      "id": "Smith_Machine_Stiff-Legged_Deadlift",
      "name": "Smith Machine Stiff-Legged Deadlift",
      "vi": "Smith Machine Stiff-Legged Deadlift",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy đặt thanh trên máy rèn ở độ cao ngang giữa đùi của bạn. Khi chiều cao chính xác được chọn và thanh được tải...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Smith_Machine_Stiff-Legged_Deadlift"
    },
    {
      "id": "Snatch_Pull",
      "name": "Snatch Pull",
      "vi": "Snatch Pull",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Đặt một thanh tạ trên sàn gần cẳng chân, hãy nắm chặt tay rộng. Hạ hông xuống, trọng lượng tập trung vào gót chân, lưng thẳng, mặt hướng về phía đầu...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Snatch_Pull"
    },
    {
      "id": "Speed_Squats",
      "name": "Speed Squats",
      "vi": "Speed Squats",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá phù hợp nhất với chiều cao của bạn. Một khi...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Speed_Squats"
    },
    {
      "id": "Spell_Caster",
      "name": "Spell Caster",
      "vi": "Spell Caster",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Mỗi tay cầm một quả tạ với tư thế cầm chắc chắn. Bàn chân của bạn phải rộng với hông và đầu gối mở rộng. Đây sẽ là vị trí bắt đầu của bạn. Là...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Spell_Caster"
    },
    {
      "id": "Spider_Crawl",
      "name": "Spider Crawl",
      "vi": "Spider Crawl",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Bắt đầu ở tư thế nằm sấp trên sàn. Hỗ trợ trọng lượng của bạn trên bàn tay và ngón chân, hai chân khép lại và cơ thể thẳng. Cánh tay của bạn nên...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Spider_Crawl"
    },
    {
      "id": "Split_Squat_with_Dumbbells",
      "name": "Split Squat with Dumbbells",
      "vi": "Split Squat with Dumbbells",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Đặt mình vào tư thế so le với chân sau nâng cao và chân trước hướng về phía trước. Mỗi tay cầm một quả tạ và để chúng lơ lửng ở...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Split_Squat_with_Dumbbells"
    },
    {
      "id": "Squat_Jerk",
      "name": "Squat Jerk",
      "vi": "Squat Jerk",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Đứng với trọng lượng dồn lên phía trước vai, bắt đầu với động tác ngâm mình. Đặt bàn chân ngay dưới hông, gập đầu gối mà không di chuyển...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Squat_Jerk"
    },
    {
      "id": "Squat_with_Plate_Movers",
      "name": "Squat with Plate Movers",
      "vi": "Squat with Plate Movers",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Để bắt đầu, trước tiên hãy đặt thanh đòn trên giá ngay dưới mức vai. Đặt một đĩa tạ trên mặt đất cách giá đỡ vài feet. Một khi ...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Squat_with_Plate_Movers"
    },
    {
      "id": "Standing_Barbell_Calf_Raise",
      "name": "Standing Barbell Calf Raise",
      "vi": "Standing Barbell Calf Raise",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Dễ",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá phù hợp nhất với chiều cao của bạn. Một khi...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Standing_Barbell_Calf_Raise"
    },
    {
      "id": "Standing_Cable_Lift",
      "name": "Standing Cable Lift",
      "vi": "Standing Cable Lift",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Kết nối tay cầm tiêu chuẩn trên tháp và di chuyển cáp đến vị trí ròng rọc thấp nhất. Nằm nghiêng về phía dây cáp, nắm lấy tay cầm bằng một tay và...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Standing_Cable_Lift"
    },
    {
      "id": "Standing_Cable_Wood_Chop",
      "name": "Standing Cable Wood Chop",
      "vi": "Standing Cable Wood Chop",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Chạy một dải xung quanh một trụ cố định giống như một giá đỡ ngồi xổm. Nắm lấy tay cầm của dây đeo và lùi lại để độ căng của dây đeo tăng lên. Mở rộng...",
      "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      "imgFolder": "Standing_Cable_Wood_Chop"
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
    },
    {
      "id": "Standing_Dumbbell_Calf_Raise",
      "name": "Standing Dumbbell Calf Raise",
      "vi": "Standing Dumbbell Calf Raise",
      "icon": "🏋️",
      "muscles": [
        "Bắp chân"
      ],
      "anim": "đẩy",
      "equip": "tạ đơn",
      "diff": "Trung bình",
      "desc": "Đứng thẳng thân mình, cầm hai quả tạ trên tay ở hai bên. Đặt phần bóng của bàn chân lên một tấm gỗ chắc chắn và ổn định (đó ...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Standing_Dumbbell_Calf_Raise"
    },
    {
      "id": "Standing_Leg_Curl",
      "name": "Standing Leg Curl",
      "vi": "Standing Leg Curl",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Điều chỉnh cần gạt máy để phù hợp với chiều cao của bạn và nằm với thân mình uốn cong ở thắt lưng hướng về phía trước khoảng 30-45 độ (vì tư thế nghiêng là...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Standing_Leg_Curl"
    },
    {
      "id": "Standing_Rope_Crunch",
      "name": "Standing Rope Crunch",
      "vi": "Standing Rope Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "cáp",
      "diff": "Dễ",
      "desc": "Gắn một sợi dây vào ròng rọc cao và chọn trọng lượng phù hợp. Đứng quay lưng về phía tháp cáp. Nắm lấy sợi dây bằng cả hai tay trên người bạn...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Standing_Rope_Crunch"
    },
    {
      "id": "Step-up_with_Knee_Raise",
      "name": "Step-up with Knee Raise",
      "vi": "Step-up with Knee Raise",
      "icon": "🏋️",
      "muscles": [
        "Mông"
      ],
      "anim": "đẩy",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Đứng đối diện với một chiếc hộp hoặc một chiếc ghế dài có chiều cao thích hợp và chụm hai chân lại. Đây sẽ là vị trí bắt đầu của bạn. Bắt đầu chuyển động bằng cách bước lên, ...",
      "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      "imgFolder": "Step-up_with_Knee_Raise"
    },
    {
      "id": "Stiff-Legged_Barbell_Deadlift",
      "name": "Stiff-Legged Barbell Deadlift",
      "vi": "Stiff-Legged Barbell Deadlift",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Nắm thanh đòn bằng cách cầm quá tay (lòng bàn tay úp xuống). Bạn có thể cần quấn cổ tay nếu sử dụng một lượng tạ nặng đáng kể. Đứng với thân mình ...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Stiff-Legged_Barbell_Deadlift"
    },
    {
      "id": "Stiff-Legged_Dumbbell_Deadlift",
      "name": "Stiff-Legged Dumbbell Deadlift",
      "vi": "Stiff-Legged Dumbbell Deadlift",
      "icon": "🏋️",
      "muscles": [
        "Đùi sau"
      ],
      "anim": "kéo",
      "equip": "tạ đơn",
      "diff": "Dễ",
      "desc": "Nắm một vài quả tạ giữ chúng ở bên cạnh bạn với chiều dài bằng sải tay. Đứng thẳng thân mình và hai chân cách nhau rộng bằng vai hoặc...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Stiff-Legged_Dumbbell_Deadlift"
    },
    {
      "id": "Suspended_Fallout",
      "name": "Suspended Fallout",
      "vi": "Suspended Fallout",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Điều chỉnh dây đai sao cho tay cầm ở độ cao thích hợp, dưới mức thắt lưng. Bắt đầu đứng và nắm lấy tay cầm. Dựa vào dây đai, di chuyển...",
      "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      "imgFolder": "Suspended_Fallout"
    },
    {
      "id": "Suspended_Reverse_Crunch",
      "name": "Suspended Reverse Crunch",
      "vi": "Suspended Reverse Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Cố định một bộ dây treo với tay cầm treo cách mặt đất khoảng một foot. Di chuyển bản thân vào tư thế plank chống đẩy, quay mặt ra xa...",
      "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "imgFolder": "Suspended_Reverse_Crunch"
    },
    {
      "id": "Suspended_Split_Squat",
      "name": "Suspended Split Squat",
      "vi": "Suspended Split Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Treo dây đai của bạn sao cho tay cầm cách sàn 18-30 inch. Quay mặt ra khỏi thiết lập, đặt chân sau của bạn vào tay cầm phía sau bạn. Giữ ...",
      "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
      "imgFolder": "Suspended_Split_Squat"
    },
    {
      "id": "Thigh_Abductor",
      "name": "Thigh Abductor",
      "vi": "Thigh Abductor",
      "icon": "🏋️",
      "muscles": [
        "Abductors"
      ],
      "anim": "đẩy",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy ngồi xuống máy bắt cóc và chọn mức tạ mà bạn cảm thấy thoải mái. Khi chân của bạn đã được đặt đúng vị trí, hãy nắm chặt tay cầm trên...",
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "imgFolder": "Thigh_Abductor"
    },
    {
      "id": "Thigh_Adductor",
      "name": "Thigh Adductor",
      "vi": "Thigh Adductor",
      "icon": "🏋️",
      "muscles": [
        "Adductors"
      ],
      "anim": "kéo",
      "equip": "máy tập",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy ngồi xuống máy phụ trợ và chọn trọng lượng mà bạn cảm thấy thoải mái. Khi chân của bạn được đặt đúng vị trí trên miếng đệm chân của...",
      "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      "imgFolder": "Thigh_Adductor"
    },
    {
      "id": "Trap_Bar_Deadlift",
      "name": "Trap Bar Deadlift",
      "vi": "Trap Bar Deadlift",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "kéo",
      "equip": "khác",
      "diff": "Dễ",
      "desc": "Đối với bài tập này, hãy đặt một thanh bẫy, còn được gọi là thanh lục giác, lên một vật nặng thích hợp đặt trên mặt đất. Đứng ở trung tâm của bộ máy và...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Trap_Bar_Deadlift"
    },
    {
      "id": "Tuck_Crunch",
      "name": "Tuck Crunch",
      "vi": "Tuck Crunch",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Để bắt đầu, hãy nằm xuống sàn hoặc thảm tập, lưng áp xuống sàn. Cánh tay của bạn phải nằm ngang với lòng bàn tay...",
      "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
      "imgFolder": "Tuck_Crunch"
    },
    {
      "id": "Weighted_Ball_Side_Bend",
      "name": "Weighted Ball Side Bend",
      "vi": "Weighted Ball Side Bend",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "bóng tập",
      "diff": "Trung bình",
      "desc": "Để bắt đầu, hãy nằm xuống một quả bóng tập thể dục với phần thân bên trái (eo, hông và vai) ép vào quả bóng. Đôi chân của bạn phải đặt trên...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Weighted_Ball_Side_Bend"
    },
    {
      "id": "Weighted_Crunches",
      "name": "Weighted Crunches",
      "vi": "Weighted Crunches",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "bóng tạ",
      "diff": "Dễ",
      "desc": "Nằm ngửa, đặt bàn chân phẳng trên mặt đất hoặc tựa trên ghế với đầu gối cong một góc 90 độ. Ôm một vật nặng vào ngực,...",
      "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      "imgFolder": "Weighted_Crunches"
    },
    {
      "id": "Weighted_Jump_Squat",
      "name": "Weighted Jump Squat",
      "vi": "Weighted Jump Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Nằm úp mặt xuống sàn và đặt hai tay gần hơn chiều rộng vai để có tư thế tay gần. Hãy chắc chắn rằng bạn đang giữ thân mình ở mức ...",
      "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
      "imgFolder": "Weighted_Jump_Squat"
    },
    {
      "id": "Weighted_Sissy_Squat",
      "name": "Weighted Sissy Squat",
      "vi": "Weighted Sissy Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Đứng thẳng, hai chân rộng bằng vai, mũi chân giơ lên, dùng một tay giữ vào xà của giá ngồi xổm và tay còn lại để giữ đĩa...",
      "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
      "imgFolder": "Weighted_Sissy_Squat"
    },
    {
      "id": "Weighted_Squat",
      "name": "Weighted Squat",
      "vi": "Weighted Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "khác",
      "diff": "Trung bình",
      "desc": "Bắt đầu bằng cách đặt hai băng ghế phẳng rộng bằng vai cách nhau. Đứng lên trên chúng và quấn đai có trọng lượng quanh eo bằng...",
      "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "imgFolder": "Weighted_Squat"
    },
    {
      "id": "Wide_Stance_Barbell_Squat",
      "name": "Wide Stance Barbell Squat",
      "vi": "Wide Stance Barbell Squat",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Trung bình",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá phù hợp nhất với chiều cao của bạn. Một khi...",
      "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
      "imgFolder": "Wide_Stance_Barbell_Squat"
    },
    {
      "id": "Wind_Sprints",
      "name": "Wind Sprints",
      "vi": "Wind Sprints",
      "icon": "🏋️",
      "muscles": [
        "Bụng"
      ],
      "anim": "kéo",
      "equip": "trọng lượng cơ thể",
      "diff": "Dễ",
      "desc": "Treo người trên thanh kéo bằng cách sử dụng tay cầm có hình dạng nghiêng. Cánh tay và chân của bạn nên được mở rộng. Đây sẽ là vị trí bắt đầu của bạn. Bắt đầu bằng cách nhanh chóng nâng cao...",
      "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
      "imgFolder": "Wind_Sprints"
    },
    {
      "id": "Zercher_Squats",
      "name": "Zercher Squats",
      "vi": "Zercher Squats",
      "icon": "🏋️",
      "muscles": [
        "Đùi trước"
      ],
      "anim": "đẩy",
      "equip": "thanh tạ đòn",
      "diff": "Khó",
      "desc": "Bài tập này được thực hiện tốt nhất bên trong giá ngồi xổm vì mục đích an toàn. Để bắt đầu, trước tiên hãy đặt thanh đòn lên giá phù hợp nhất với chiều cao của bạn. Đúng...",
      "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
      "imgFolder": "Zercher_Squats"
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

/* AI Analysis Logic */
async function runAIAnalysis() {
    const btn = document.getElementById('btn-run-ai-analysis');
    const resultDiv = document.getElementById('ai-analysis-result');
    const keyInput = document.getElementById('ai-api-key');
    const keyContainer = document.getElementById('ai-api-key-container');
    let apiKey = localStorage.getItem('fitness_deepseek_key');
    
    if (!apiKey) {
        keyContainer.style.display = 'flex';
        apiKey = keyInput.value.trim();
        if (!apiKey) {
            showToast('Bạn cần nhập DeepSeek API Key trước!', 'error');
            return;
        }
        localStorage.setItem('fitness_deepseek_key', apiKey);
        keyContainer.style.display = 'none';
    } else {
        keyInput.value = apiKey;
    }

    const member = state.currentMember;
    const entries = getMemberEntries(member);
    if (!entries.length) {
        showToast('Chưa có dữ liệu tập luyện để phân tích.', 'error');
        return;
    }

    // Summary logic
    const recent = entries.slice(0, 30);
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

    let promptText = `Bạn là HLV Gym chuyên nghiệp. Phân tích dữ liệu 30 bài tập gần đây của hội viên tên ${member} (trả lời tối đa 200 chữ bằng tiếng Việt).\n\n`;
    promptText += `- Phân bổ Volume: ${Object.entries(groupVol).map(([k,v])=>\`${k}: ${v}kg\`).join(', ')}\n`;
    promptText += `- Tạ nặng nhất: ${Object.entries(exMax).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>\`${k} (${v}kg)\`).join(', ')}\n\n`;
    promptText += `Yêu cầu:\n1. Khen ngợi điểm mạnh (nhóm cơ tập nhiều/tạ tốt).\n2. Chỉ ra điểm yếu (nhóm cơ bị bỏ quên/tập ít).\n3. Đề xuất một định hướng ngắn gọn.`;

    btn.disabled = true;
    btn.innerHTML = `⏳ Đang kết nối DeepSeek...`;
    
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: promptText }]
            })
        });
        
        if (response.status === 401) {
            localStorage.removeItem('fitness_deepseek_key');
            keyContainer.style.display = 'flex';
            throw new Error('API Key không hợp lệ hoặc đã bị chặn.');
        }
        if (!response.ok) throw new Error(`Lỗi HTTP ${response.status}`);
        
        const data = await response.json();
        const content = data.choices[0].message.content;
        
        resultDiv.style.display = 'block';
        
        // Simple Markdown parser for basic formatting
        let html = content
            .replace(/### (.*)/g, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n- (.*)/g, '\n<li>$1</li>')
            .replace(/\n\n/g, '<br><br>');
            
        resultDiv.innerHTML = html;
        showToast('Phân tích hoàn tất!', 'success');
        
    } catch (e) {
        showToast('Lỗi AI: ' + e.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<span>✨ Phân tích lại</span>`;
    }
}

function refreshAnalysis() {
    renderPRBoard();
    renderProgression();
    // renderWeakPoints removed
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
    
    document.getElementById('btn-run-ai-analysis').addEventListener('click', runAIAnalysis);
    document.getElementById('btn-save-ai-key').addEventListener('click', () => {
        const k = document.getElementById('ai-api-key').value.trim();
        if(k) { localStorage.setItem('fitness_deepseek_key', k); showToast('Đã lưu API Key', 'success'); document.getElementById('ai-api-key-container').style.display = 'none'; }
    });

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

