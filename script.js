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
    "1": [
        {
            "id": "Alternating_Cable_Shoulder_Press",
            "name": "Alternating Cable Shoulder Press",
            "vi": "Alternating Cable Shoulder Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Move the cables to the bottom of the tower and select an appropriate weight. Grasp the cables and hold them at shoulder height, palms facing forward. ...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Alternating_Cable_Shoulder_Press"
        },
        {
            "id": "Alternating_Deltoid_Raise",
            "name": "Alternating Deltoid Raise",
            "vi": "Alternating Deltoid Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "In a standing position, hold a pair of dumbbells at your side. Keeping your elbows slightly bent, raise the weights directly in front of you to should...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Alternating_Deltoid_Raise"
        },
        {
            "id": "Alternating_Floor_Press",
            "name": "Alternating Floor Press",
            "vi": "Alternating Floor Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Dễ",
            "desc": "Lie on the floor with two kettlebells next to your shoulders. Position one in place on your chest and then the other, gripping the kettlebells on the ...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Alternating_Floor_Press"
        },
        {
            "id": "Alternating_Kettlebell_Press",
            "name": "Alternating Kettlebell Press",
            "vi": "Alternating Kettlebell Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean two kettlebells to your shoulders. Clean the kettlebells to your shoulders by extending through the legs and hips as you pull the kettlebells to...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Alternating_Kettlebell_Press"
        },
        {
            "id": "Anti-Gravity_Press",
            "name": "Anti-Gravity Press",
            "vi": "Anti-Gravity Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Place a bar on the ground behind the head of an incline bench. Lay on the bench face down. With a pronated grip, pick the barbell up from the floor. F...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Anti-Gravity_Press"
        },
        {
            "id": "Arnold_Dumbbell_Press",
            "name": "Arnold Dumbbell Press",
            "vi": "Arnold Dumbbell Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Sit on an exercise bench with back support and hold two dumbbells in front of you at about upper chest level with your palms facing your body and your...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Arnold_Dumbbell_Press"
        },
        {
            "id": "Around_The_Worlds",
            "name": "Around The Worlds",
            "vi": "Around The Worlds",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Lay down on a flat bench holding a dumbbell in each hand with the palms of the hands facing towards the ceiling. Tip: Your arms should be parallel to ...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Around_The_Worlds"
        },
        {
            "id": "Back_Flyes_-_With_Bands",
            "name": "Back Flyes - With Bands",
            "vi": "Back Flyes - With Bands",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Run a band around a stationary post like that of a squat rack. Grab the band by the handles and stand back so that the tension in the band rises. Exte...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Back_Flyes_-_With_Bands"
        },
        {
            "id": "Band_Pull_Apart",
            "name": "Band Pull Apart",
            "vi": "Band Pull Apart",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Begin with your arms extended straight out in front of you, holding the band with both hands. Initiate the movement by performing a reverse fly motion...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Band_Pull_Apart"
        },
        {
            "id": "Band_Skull_Crusher",
            "name": "Band Skull Crusher",
            "vi": "Band Skull Crusher",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Secure a band to the base of a rack or the bench. Lay on the bench so that the band is lined up with your head. Take hold of the band, raising your el...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Band_Skull_Crusher"
        },
        {
            "id": "Barbell_Bench_Press_-_Medium_Grip",
            "name": "Barbell Bench Press - Medium Grip",
            "vi": "Barbell Bench Press - Medium Grip",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Lie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the ...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Barbell_Bench_Press_-_Medium_Grip"
        },
        {
            "id": "Barbell_Guillotine_Bench_Press",
            "name": "Barbell Guillotine Bench Press",
            "vi": "Barbell Guillotine Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar ...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Barbell_Guillotine_Bench_Press"
        },
        {
            "id": "Barbell_Incline_Bench_Press_-_Medium_Grip",
            "name": "Barbell Incline Bench Press - Medium Grip",
            "vi": "Barbell Incline Bench Press - Medium Grip",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Lie back on an incline bench. Using a medium-width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and ...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Barbell_Incline_Bench_Press_-_Medium_Grip"
        },
        {
            "id": "Barbell_Incline_Shoulder_Raise",
            "name": "Barbell Incline Shoulder Raise",
            "vi": "Barbell Incline Shoulder Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Lie back on an Incline Bench. Using a medium width grip (a grip that is slightly wider than shoulder width), lift the bar from the rack and hold it st...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Barbell_Incline_Shoulder_Raise"
        },
        {
            "id": "Barbell_Rear_Delt_Row",
            "name": "Barbell Rear Delt Row",
            "vi": "Barbell Rear Delt Row",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Stand up straight while holding a barbell using a wide (higher than shoulder width) and overhand (palms facing your body) grip. Bend knees slightly an...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Barbell_Rear_Delt_Row"
        },
        {
            "id": "Barbell_Shoulder_Press",
            "name": "Barbell Shoulder Press",
            "vi": "Barbell Shoulder Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Sit on a bench with back support in a squat rack. Position a barbell at a height that is just above your head. Grab the barbell with a pronated grip (...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Barbell_Shoulder_Press"
        },
        {
            "id": "Battling_Ropes",
            "name": "Battling Ropes",
            "vi": "Battling Ropes",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Dễ",
            "desc": "For this exercise you will need a heavy rope anchored at its center 15-20 feet away. Standing in front of the rope, take an end in each hand with your...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Battling_Ropes"
        },
        {
            "id": "Bench_Dips",
            "name": "Bench Dips",
            "vi": "Bench Dips",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "For this exercise you will need to place a bench behind your back. With the bench perpendicular to your body, and while looking away from it, hold on ...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Bench_Dips"
        },
        {
            "id": "Bench_Press_-_With_Bands",
            "name": "Bench Press - With Bands",
            "vi": "Bench Press - With Bands",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Using a flat bench secure a band under the leg of the bench that is nearest to your head. Once the band is secure, grab it by both handles and lie dow...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Bench_Press_-_With_Bands"
        },
        {
            "id": "Bent-Arm_Dumbbell_Pullover",
            "name": "Bent-Arm Dumbbell Pullover",
            "vi": "Bent-Arm Dumbbell Pullover",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Place a dumbbell standing up on a flat bench. Ensuring that the dumbbell stays securely placed at the top of the bench, lie perpendicular to the bench...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Bent-Arm_Dumbbell_Pullover"
        },
        {
            "id": "Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench",
            "name": "Bent Over Dumbbell Rear Delt Raise With Head On Bench",
            "vi": "Bent Over Dumbbell Rear Delt Raise With Head On Bench",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand up straight while holding a dumbbell in each hand and with an incline bench in front of you. While keeping your back straight and maintaining th...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench"
        },
        {
            "id": "Bent_Over_Low-Pulley_Side_Lateral",
            "name": "Bent Over Low-Pulley Side Lateral",
            "vi": "Bent Over Low-Pulley Side Lateral",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Select a weight and hold the handle of the low pulley with your right hand. Bend at the waist until your torso is nearly parallel to the floor. Your l...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Bent_Over_Low-Pulley_Side_Lateral"
        },
        {
            "id": "Body-Up",
            "name": "Body-Up",
            "vi": "Body-Up",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Assume a plank position on the ground. You should be supporting your bodyweight on your toes and forearms, keeping your torso straight. Your forearms ...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Body-Up"
        },
        {
            "id": "Body_Tricep_Press",
            "name": "Body Tricep Press",
            "vi": "Body Tricep Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Position a bar in a rack at chest height. Standing, take a shoulder width grip on the bar and step a yard or two back, feet together and arms extended...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Body_Tricep_Press"
        },
        {
            "id": "Bodyweight_Flyes",
            "name": "Bodyweight Flyes",
            "vi": "Bodyweight Flyes",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "e-z curl bar",
            "diff": "Trung bình",
            "desc": "Position two equally loaded EZ bars on the ground next to each other. Ensure they are able to roll. Assume a push-up position over the bars, supportin...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Bodyweight_Flyes"
        },
        {
            "id": "Bradford_Rocky_Presses",
            "name": "Bradford/Rocky Presses",
            "vi": "Bradford/Rocky Presses",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Sit on a Military Press Bench with a bar at shoulder level with a pronated grip (palms facing forward). Tip: Your grip should be wider than shoulder w...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Bradford_Rocky_Presses"
        },
        {
            "id": "Butterfly",
            "name": "Butterfly",
            "vi": "Butterfly",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Sit on the machine with your back flat on the pad. Take hold of the handles. Tip: Your upper arms should be positioned parallel to the floor; adjust t...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Butterfly"
        },
        {
            "id": "Cable_Chest_Press",
            "name": "Cable Chest Press",
            "vi": "Cable Chest Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Adjust the weight to an appropriate amount and be seated, grasping the handles. Your upper arms should be about 45 degrees to the body, with your head...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Cable_Chest_Press"
        },
        {
            "id": "Cable_Crossover",
            "name": "Cable Crossover",
            "vi": "Cable Crossover",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "To get yourself into the starting position, place the pulleys on a high position (above your head), select the resistance to be used and hold the pull...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Cable_Crossover"
        },
        {
            "id": "Cable_Incline_Triceps_Extension",
            "name": "Cable Incline Triceps Extension",
            "vi": "Cable Incline Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Lie on incline an bench facing away from a high pulley machine that has a straight bar attachment on it. Grasp the straight bar attachment overhead wi...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Cable_Incline_Triceps_Extension"
        },
        {
            "id": "Cable_Internal_Rotation",
            "name": "Cable Internal Rotation",
            "vi": "Cable Internal Rotation",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Sit next to a low pulley sideways (with legs stretched in front of you or crossed) and grasp the single hand cable attachment with the arm nearest to ...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Cable_Internal_Rotation"
        },
        {
            "id": "Cable_Iron_Cross",
            "name": "Cable Iron Cross",
            "vi": "Cable Iron Cross",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Begin by moving the pulleys to the high position, select the resistance to be used, and take a handle in each hand. Stand directly between both pulley...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Cable_Iron_Cross"
        },
        {
            "id": "Cable_Lying_Triceps_Extension",
            "name": "Cable Lying Triceps Extension",
            "vi": "Cable Lying Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Lie on a flat bench and grasp the straight bar attachment of a low pulley with a narrow overhand grip. Tip: The easiest way to do this is to have some...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Cable_Lying_Triceps_Extension"
        },
        {
            "id": "Cable_One_Arm_Tricep_Extension",
            "name": "Cable One Arm Tricep Extension",
            "vi": "Cable One Arm Tricep Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "With your right hand, grasp a single handle attached to the high-cable pulley using a supinated (underhand; palms facing up) grip. You should be stand...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Cable_One_Arm_Tricep_Extension"
        },
        {
            "id": "Cable_Rear_Delt_Fly",
            "name": "Cable Rear Delt Fly",
            "vi": "Cable Rear Delt Fly",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Adjust the pulleys to the appropriate height and adjust the weight. The pulleys should be above your head. Grab the left pulley with your right hand a...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Cable_Rear_Delt_Fly"
        },
        {
            "id": "Cable_Rope_Overhead_Triceps_Extension",
            "name": "Cable Rope Overhead Triceps Extension",
            "vi": "Cable Rope Overhead Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a rope to the bottom pulley of the pulley machine. Grasping the rope with both hands, extend your arms with your hands directly above your head...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Cable_Rope_Overhead_Triceps_Extension"
        },
        {
            "id": "Cable_Rope_Rear-Delt_Rows",
            "name": "Cable Rope Rear-Delt Rows",
            "vi": "Cable Rope Rear-Delt Rows",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Sit in the same position on a low pulley row station as you would if you were doing seated cable rows for the back. Attach a rope to the pulley and gr...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Cable_Rope_Rear-Delt_Rows"
        },
        {
            "id": "Cable_Seated_Lateral_Raise",
            "name": "Cable Seated Lateral Raise",
            "vi": "Cable Seated Lateral Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Stand in the middle of two low pulleys that are opposite to each other and place a flat bench right behind you (in perpendicular fashion to you; the n...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Cable_Seated_Lateral_Raise"
        },
        {
            "id": "Cable_Shoulder_Press",
            "name": "Cable Shoulder Press",
            "vi": "Cable Shoulder Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Move the cables to the bottom of the towers and select an appropriate weight. Stand directly in between the uprights. Grasp the cables and hold them a...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Cable_Shoulder_Press"
        },
        {
            "id": "Car_Drivers",
            "name": "Car Drivers",
            "vi": "Car Drivers",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "While standing upright, hold a barbell plate in both hands at the 3 and 9 o'clock positions. Your palms should be facing each other and your arms shou...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Car_Drivers"
        },
        {
            "id": "Clean_and_Press",
            "name": "Clean and Press",
            "vi": "Clean and Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Assume a shoulder-width stance, with knees inside the arms. Now while keeping the back flat, bend at the knees and hips so that you can grab the bar w...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Clean_and_Press"
        },
        {
            "id": "Clock_Push-Up",
            "name": "Clock Push-Up",
            "vi": "Clock Push-Up",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Move into a prone position on the floor, supporting your weight on your hands and toes. Your arms should be fully extended with the hands around shoul...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Clock_Push-Up"
        },
        {
            "id": "Close-Grip_Barbell_Bench_Press",
            "name": "Close-Grip Barbell Bench Press",
            "vi": "Close-Grip Barbell Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Lie back on a flat bench. Using a close grip (around shoulder width), lift the bar from the rack and hold it straight over you with your arms locked. ...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Close-Grip_Barbell_Bench_Press"
        },
        {
            "id": "Close-Grip_Dumbbell_Press",
            "name": "Close-Grip Dumbbell Press",
            "vi": "Close-Grip Dumbbell Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Place a dumbbell standing up on a flat bench. Ensuring that the dumbbell stays securely placed at the top of the bench, lie perpendicular to the bench...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Close-Grip_Dumbbell_Press"
        },
        {
            "id": "Close-Grip_EZ-Bar_Press",
            "name": "Close-Grip EZ-Bar Press",
            "vi": "Close-Grip EZ-Bar Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "e-z curl bar",
            "diff": "Dễ",
            "desc": "Lie on a flat bench with an EZ bar loaded to an appropriate weight. Using a narrow grip lift the bar and hold it straight over your torso with your el...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Close-Grip_EZ-Bar_Press"
        },
        {
            "id": "Close-Grip_Push-Up_off_of_a_Dumbbell",
            "name": "Close-Grip Push-Up off of a Dumbbell",
            "vi": "Close-Grip Push-Up off of a Dumbbell",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Lie on the floor and place your hands on an upright dumbbell. Supporting your weight on your toes and hands, keep your torso rigid and your elbows in ...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Close-Grip_Push-Up_off_of_a_Dumbbell"
        },
        {
            "id": "Cross_Over_-_With_Bands",
            "name": "Cross Over - With Bands",
            "vi": "Cross Over - With Bands",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Secure an exercise band around a stationary post. While facing away from the post, grab the handles on both ends of the band and step forward enough t...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Cross_Over_-_With_Bands"
        },
        {
            "id": "Cuban_Press",
            "name": "Cuban Press",
            "vi": "Cuban Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Take a dumbbell in each hand with a pronated grip in a standing position. Raise your upper arms so that they are parallel to the floor, allowing your ...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Cuban_Press"
        },
        {
            "id": "Decline_Barbell_Bench_Press",
            "name": "Decline Barbell Bench Press",
            "vi": "Decline Barbell Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Secure your legs at the end of the decline bench and slowly lay down on the bench. Using a medium width grip (a grip that creates a 90-degree angle in...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Decline_Barbell_Bench_Press"
        },
        {
            "id": "Decline_Close-Grip_Bench_To_Skull_Crusher",
            "name": "Decline Close-Grip Bench To Skull Crusher",
            "vi": "Decline Close-Grip Bench To Skull Crusher",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Secure your legs at the end of the decline bench and slowly lay down on the bench. Using a close grip (a grip that is slightly less than shoulder widt...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Decline_Close-Grip_Bench_To_Skull_Crusher"
        },
        {
            "id": "Decline_Dumbbell_Bench_Press",
            "name": "Decline Dumbbell Bench Press",
            "vi": "Decline Dumbbell Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Secure your legs at the end of the decline bench and lie down with a dumbbell on each hand on top of your thighs. The palms of your hand will be facin...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Decline_Dumbbell_Bench_Press"
        },
        {
            "id": "Decline_Dumbbell_Flyes",
            "name": "Decline Dumbbell Flyes",
            "vi": "Decline Dumbbell Flyes",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Secure your legs at the end of the decline bench and lie down with a dumbbell on each hand on top of your thighs. The palms of your hand will be facin...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Decline_Dumbbell_Flyes"
        },
        {
            "id": "Decline_Dumbbell_Triceps_Extension",
            "name": "Decline Dumbbell Triceps Extension",
            "vi": "Decline Dumbbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Secure your legs at the end of the decline bench and lie down with a dumbbell on each hand on top of your thighs. The palms of your hand will be facin...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Decline_Dumbbell_Triceps_Extension"
        },
        {
            "id": "Decline_EZ_Bar_Triceps_Extension",
            "name": "Decline EZ Bar Triceps Extension",
            "vi": "Decline EZ Bar Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Secure your legs at the end of the decline bench and slowly lay down on the bench. Using a close grip (a grip that is slightly less than shoulder widt...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Decline_EZ_Bar_Triceps_Extension"
        },
        {
            "id": "Decline_Push-Up",
            "name": "Decline Push-Up",
            "vi": "Decline Push-Up",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on the floor face down and place your hands about 36 inches apart while holding your torso up at arms length. Move your feet up to a box or bench....",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Decline_Push-Up"
        },
        {
            "id": "Decline_Smith_Press",
            "name": "Decline Smith Press",
            "vi": "Decline Smith Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Place a decline bench underneath the Smith machine. Now place the barbell at a height that you can reach when lying down and your arms are almost full...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Decline_Smith_Press"
        },
        {
            "id": "Dip_Machine",
            "name": "Dip Machine",
            "vi": "Dip Machine",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Sit securely in a dip machine, select the weight and firmly grasp the handles. Now keep your elbows in at your sides in order to place emphasis on the...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Dip_Machine"
        },
        {
            "id": "Dips_-_Chest_Version",
            "name": "Dips - Chest Version",
            "vi": "Dips - Chest Version",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "For this exercise you will need access to parallel bars. To get yourself into the starting position, hold your body at arms length (arms locked) above...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Dips_-_Chest_Version"
        },
        {
            "id": "Dips_-_Triceps_Version",
            "name": "Dips - Triceps Version",
            "vi": "Dips - Triceps Version",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "To get into the starting position, hold your body at arm's length with your arms nearly locked above the bars. Now, inhale and slowly lower yourself d...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Dips_-_Triceps_Version"
        },
        {
            "id": "Double_Kettlebell_Jerk",
            "name": "Double Kettlebell Jerk",
            "vi": "Double Kettlebell Jerk",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Hold a kettlebell by the handle in each hand. Clean the kettlebells to your shoulders by extending through the legs and hips as you pull the kettlebel...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Double_Kettlebell_Jerk"
        },
        {
            "id": "Double_Kettlebell_Push_Press",
            "name": "Double Kettlebell Push Press",
            "vi": "Double Kettlebell Push Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean two kettlebells to your shoulders. Squat down a few inches and reverse the motion rapidly. Use the momentum from the legs to drive the kettlebel...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Double_Kettlebell_Push_Press"
        },
        {
            "id": "Double_Kettlebell_Snatch",
            "name": "Double Kettlebell Snatch",
            "vi": "Double Kettlebell Snatch",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Khó",
            "desc": "Place two kettlebells behind your feet. Bend your knees and sit back to pick up the kettlebells. Swing the kettlebells between your legs forcefully an...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Double_Kettlebell_Snatch"
        },
        {
            "id": "Dumbbell_Bench_Press",
            "name": "Dumbbell Bench Press",
            "vi": "Dumbbell Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie down on a flat bench with a dumbbell in each hand resting on top of your thighs. The palms of your hands will be facing each other. Then, using yo...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Dumbbell_Bench_Press"
        },
        {
            "id": "Dumbbell_Bench_Press_with_Neutral_Grip",
            "name": "Dumbbell Bench Press with Neutral Grip",
            "vi": "Dumbbell Bench Press with Neutral Grip",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Take a dumbbell in each hand and lay back onto a flat bench. Your feet should be flat on the floor and your shoulder blades retracted. Maintaining a n...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Dumbbell_Bench_Press_with_Neutral_Grip"
        },
        {
            "id": "Dumbbell_Flyes",
            "name": "Dumbbell Flyes",
            "vi": "Dumbbell Flyes",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie down on a flat bench with a dumbbell on each hand resting on top of your thighs. The palms of your hand will be facing each other. Then using your...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Dumbbell_Flyes"
        },
        {
            "id": "Dumbbell_Incline_Shoulder_Raise",
            "name": "Dumbbell Incline Shoulder Raise",
            "vi": "Dumbbell Incline Shoulder Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit on an Incline Bench while holding a dumbbell on each hand on top of your thighs. Lift your legs up to kick the weights to your shoulders and lean ...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Dumbbell_Incline_Shoulder_Raise"
        },
        {
            "id": "Dumbbell_Lying_One-Arm_Rear_Lateral_Raise",
            "name": "Dumbbell Lying One-Arm Rear Lateral Raise",
            "vi": "Dumbbell Lying One-Arm Rear Lateral Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "While holding a dumbbell in one hand, lay with your chest down on a slightly inclined (around 15 degrees when measured from the floor) adjustable benc...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Dumbbell_Lying_One-Arm_Rear_Lateral_Raise"
        },
        {
            "id": "Dumbbell_Lying_Rear_Lateral_Raise",
            "name": "Dumbbell Lying Rear Lateral Raise",
            "vi": "Dumbbell Lying Rear Lateral Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "While holding a dumbbell in each hand, lay with your chest down on a slightly inclined (around 15 degrees when measured from the floor) adjustable ben...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Dumbbell_Lying_Rear_Lateral_Raise"
        },
        {
            "id": "Dumbbell_One-Arm_Shoulder_Press",
            "name": "Dumbbell One-Arm Shoulder Press",
            "vi": "Dumbbell One-Arm Shoulder Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Grab a dumbbell and either sit on a military press bench or a utility bench that has a back support on it as you place the dumbbells upright on top of...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Dumbbell_One-Arm_Shoulder_Press"
        },
        {
            "id": "Dumbbell_One-Arm_Triceps_Extension",
            "name": "Dumbbell One-Arm Triceps Extension",
            "vi": "Dumbbell One-Arm Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Grab a dumbbell and either sit on a military press bench or a utility bench that has a back support on it as you place the dumbbells upright on top of...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Dumbbell_One-Arm_Triceps_Extension"
        },
        {
            "id": "Dumbbell_One-Arm_Upright_Row",
            "name": "Dumbbell One-Arm Upright Row",
            "vi": "Dumbbell One-Arm Upright Row",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Grab a dumbbell and stand up straight with your arm extended in front of you with a slight bend at the elbows and your back straight. This will be you...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Dumbbell_One-Arm_Upright_Row"
        },
        {
            "id": "Dumbbell_Raise",
            "name": "Dumbbell Raise",
            "vi": "Dumbbell Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Grab a dumbbell in each arm and stand up straight with your arms extended by your sides with a slight bend at the elbows and your back straight. This ...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Dumbbell_Raise"
        },
        {
            "id": "Dumbbell_Scaption",
            "name": "Dumbbell Scaption",
            "vi": "Dumbbell Scaption",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "This corrective exercise strengthens the muscles that stabilize your shoulder blade. Hold a light weight in each hand, hanging at your sides. Your thu...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Dumbbell_Scaption"
        },
        {
            "id": "Dumbbell_Shoulder_Press",
            "name": "Dumbbell Shoulder Press",
            "vi": "Dumbbell Shoulder Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "While holding a dumbbell in each hand, sit on a military press bench or utility bench that has back support. Place the dumbbells upright on top of you...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Dumbbell_Shoulder_Press"
        },
        {
            "id": "Dumbbell_Tricep_Extension_-Pronated_Grip",
            "name": "Dumbbell Tricep Extension -Pronated Grip",
            "vi": "Dumbbell Tricep Extension -Pronated Grip",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie down on a flat bench holding two dumbbells directly above your shoulders. Your arms should be fully extended and form a 90 degree angle from your ...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Dumbbell_Tricep_Extension_-Pronated_Grip"
        },
        {
            "id": "EZ-Bar_Skullcrusher",
            "name": "EZ-Bar Skullcrusher",
            "vi": "EZ-Bar Skullcrusher",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "e-z curl bar",
            "diff": "Dễ",
            "desc": "Using a close grip, lift the EZ bar and hold it with your elbows in as you lie on the bench. Your arms should be perpendicular to the floor. This will...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "EZ-Bar_Skullcrusher"
        },
        {
            "id": "Extended_Range_One-Arm_Kettlebell_Floor_Press",
            "name": "Extended Range One-Arm Kettlebell Floor Press",
            "vi": "Extended Range One-Arm Kettlebell Floor Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Dễ",
            "desc": "Lie on the floor and position a kettlebell for one arm to press. The kettlebell should be held by the handle. The leg on the same side that you are pr...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Extended_Range_One-Arm_Kettlebell_Floor_Press"
        },
        {
            "id": "External_Rotation",
            "name": "External Rotation",
            "vi": "External Rotation",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie sideways on a flat bench with one arm holding a dumbbell and the other hand on top of the bench folded so that you can rest your head on it. Bend ...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "External_Rotation"
        },
        {
            "id": "External_Rotation_with_Band",
            "name": "External Rotation with Band",
            "vi": "External Rotation with Band",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Choke the band around a post. The band should be at the same height as your elbow. Stand with your left side to the band a couple of feet away. Grasp ...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "External_Rotation_with_Band"
        },
        {
            "id": "External_Rotation_with_Cable",
            "name": "External Rotation with Cable",
            "vi": "External Rotation with Cable",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Adjust the cable to the same height as your elbow. Stand with your left side to the band a couple of feet away. Grasp the handle with your right hand,...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "External_Rotation_with_Cable"
        },
        {
            "id": "Face_Pull",
            "name": "Face Pull",
            "vi": "Face Pull",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Facing a high pulley with a rope or dual handles attached, pull the weight directly towards your face, separating your hands as you do so. Keep your u...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Face_Pull"
        },
        {
            "id": "Flat_Bench_Cable_Flyes",
            "name": "Flat Bench Cable Flyes",
            "vi": "Flat Bench Cable Flyes",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Position a flat bench between two low pulleys so that when you are laying on it, your chest will be lined up with the cable pulleys. Lay flat on the b...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Flat_Bench_Cable_Flyes"
        },
        {
            "id": "Front_Cable_Raise",
            "name": "Front Cable Raise",
            "vi": "Front Cable Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Select the weight on a low pulley machine and grasp the single hand cable attachment that is attached to the low pulley with your left hand. Face away...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Front_Cable_Raise"
        },
        {
            "id": "Front_Dumbbell_Raise",
            "name": "Front Dumbbell Raise",
            "vi": "Front Dumbbell Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Pick a couple of dumbbells and stand with a straight torso and the dumbbells on front of your thighs at arms length with the palms of the hand facing ...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Front_Dumbbell_Raise"
        },
        {
            "id": "Front_Incline_Dumbbell_Raise",
            "name": "Front Incline Dumbbell Raise",
            "vi": "Front Incline Dumbbell Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit down on an incline bench with the incline set anywhere between 30 to 60 degrees while holding a dumbbell on each hand. Tip: You can change the ang...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Front_Incline_Dumbbell_Raise"
        },
        {
            "id": "Front_Plate_Raise",
            "name": "Front Plate Raise",
            "vi": "Front Plate Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "While standing straight, hold a barbell plate in both hands at the 3 and 9 o'clock positions. Your palms should be facing each other and your arms sho...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Front_Plate_Raise"
        },
        {
            "id": "Front_Raise_And_Pullover",
            "name": "Front Raise And Pullover",
            "vi": "Front Raise And Pullover",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Lie on a flat bench while holding a barbell using a palms down grip that is about 15 inches apart. Place the bar on your upper thighs, extend your arm...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Front_Raise_And_Pullover"
        },
        {
            "id": "Front_Two-Dumbbell_Raise",
            "name": "Front Two-Dumbbell Raise",
            "vi": "Front Two-Dumbbell Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Pick a couple of dumbbells and stand with a straight torso and the dumbbells on front of your thighs at arms length with the palms of the hand facing ...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Front_Two-Dumbbell_Raise"
        },
        {
            "id": "Hammer_Grip_Incline_DB_Bench_Press",
            "name": "Hammer Grip Incline DB Bench Press",
            "vi": "Hammer Grip Incline DB Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie back on an incline bench with a dumbbell on each hand on top of your thighs. The palms of your hand will be facing each other. By using your thigh...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Hammer_Grip_Incline_DB_Bench_Press"
        },
        {
            "id": "Handstand_Push-Ups",
            "name": "Handstand Push-Ups",
            "vi": "Handstand Push-Ups",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Khó",
            "desc": "With your back to the wall bend at the waist and place both hands on the floor at shoulder width. Kick yourself up against the wall with your arms str...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Handstand_Push-Ups"
        },
        {
            "id": "Incline_Barbell_Triceps_Extension",
            "name": "Incline Barbell Triceps Extension",
            "vi": "Incline Barbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Hold a barbell with an overhand grip (palms down) that is a little closer together than shoulder width. Lie back on an incline bench set at any angle ...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Incline_Barbell_Triceps_Extension"
        },
        {
            "id": "Incline_Cable_Chest_Press",
            "name": "Incline Cable Chest Press",
            "vi": "Incline Cable Chest Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Adjust the weight to an appropriate amount and be seated, grasping the handles. Your upper arms should be about 45 degrees to the body, with your head...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Incline_Cable_Chest_Press"
        },
        {
            "id": "Incline_Cable_Flye",
            "name": "Incline Cable Flye",
            "vi": "Incline Cable Flye",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "To get yourself into the starting position, set the pulleys at the floor level (lowest level possible on the machine that is below your torso). Place ...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Incline_Cable_Flye"
        },
        {
            "id": "Incline_Dumbbell_Bench_With_Palms_Facing_In",
            "name": "Incline Dumbbell Bench With Palms Facing In",
            "vi": "Incline Dumbbell Bench With Palms Facing In",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie back on an incline bench with a dumbbell on each hand on top of your thighs. The palms of your hand will be facing each other. By using your thigh...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Incline_Dumbbell_Bench_With_Palms_Facing_In"
        },
        {
            "id": "Incline_Dumbbell_Flyes",
            "name": "Incline Dumbbell Flyes",
            "vi": "Incline Dumbbell Flyes",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Hold a dumbbell on each hand and lie on an incline bench that is set to an incline angle of no more than 30 degrees. Extend your arms above you with a...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Incline_Dumbbell_Flyes"
        },
        {
            "id": "Incline_Dumbbell_Flyes_-_With_A_Twist",
            "name": "Incline Dumbbell Flyes - With A Twist",
            "vi": "Incline Dumbbell Flyes - With A Twist",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Hold a dumbbell in each hand and lie on an incline bench that is set to an incline angle of no more than 30 degrees. Extend your arms above you with a...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Incline_Dumbbell_Flyes_-_With_A_Twist"
        },
        {
            "id": "Incline_Dumbbell_Press",
            "name": "Incline Dumbbell Press",
            "vi": "Incline Dumbbell Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie back on an incline bench with a dumbbell in each hand atop your thighs. The palms of your hands will be facing each other. Then, using your thighs...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Incline_Dumbbell_Press"
        },
        {
            "id": "Incline_Push-Up",
            "name": "Incline Push-Up",
            "vi": "Incline Push-Up",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Stand facing bench or sturdy elevated platform. Place hands on edge of bench or platform, slightly wider than shoulder width. Position forefoot back f...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Incline_Push-Up"
        },
        {
            "id": "Incline_Push-Up_Close-Grip",
            "name": "Incline Push-Up Close-Grip",
            "vi": "Incline Push-Up Close-Grip",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Stand facing a Smith machine bar or sturdy elevated platform at an appropriate height. Place your hands next to one another on the bar. Position your ...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Incline_Push-Up_Close-Grip"
        },
        {
            "id": "Incline_Push-Up_Medium",
            "name": "Incline Push-Up Medium",
            "vi": "Incline Push-Up Medium",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Stand facing a Smith machine bar or sturdy elevated platform at an appropriate height. Place your hands on the bar, with your hands about shoulder wid...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Incline_Push-Up_Medium"
        },
        {
            "id": "Incline_Push-Up_Reverse_Grip",
            "name": "Incline Push-Up Reverse Grip",
            "vi": "Incline Push-Up Reverse Grip",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Stand facing a Smith machine bar or sturdy elevated platform at an appropriate height. Place your hands on the bar palms up, with your hands about sho...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Incline_Push-Up_Reverse_Grip"
        },
        {
            "id": "Incline_Push-Up_Wide",
            "name": "Incline Push-Up Wide",
            "vi": "Incline Push-Up Wide",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Stand facing a Smith machine bar or sturdy elevated platform at an appropriate height. Place your hands on the bar, with your hands wider than shoulde...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Incline_Push-Up_Wide"
        },
        {
            "id": "Internal_Rotation_with_Band",
            "name": "Internal Rotation with Band",
            "vi": "Internal Rotation with Band",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "squat",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Choke the band around a post. The band should be at the same height as your elbow. Stand with your right side to the band a couple of feet away. Grasp...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Internal_Rotation_with_Band"
        },
        {
            "id": "Iron_Cross",
            "name": "Iron Cross",
            "vi": "Iron Cross",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Iron_Cross"
        },
        {
            "id": "Isometric_Neck_Exercise_-_Front_And_Back",
            "name": "Isometric Neck Exercise - Front And Back",
            "vi": "Isometric Neck Exercise - Front And Back",
            "icon": "🏋️",
            "muscles": [
                "Neck"
            ],
            "anim": "static",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "With your head and neck in a neutral position (normal position with head erect facing forward), place both of your hands on the front side of your hea...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Isometric_Neck_Exercise_-_Front_And_Back"
        },
        {
            "id": "Isometric_Neck_Exercise_-_Sides",
            "name": "Isometric Neck Exercise - Sides",
            "vi": "Isometric Neck Exercise - Sides",
            "icon": "🏋️",
            "muscles": [
                "Neck"
            ],
            "anim": "static",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "With your head and neck in a neutral position (normal position with head erect facing forward), place your left hand on the left side of your head. No...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Isometric_Neck_Exercise_-_Sides"
        },
        {
            "id": "Isometric_Wipers",
            "name": "Isometric Wipers",
            "vi": "Isometric Wipers",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Assume a push-up position, supporting your weight on your hands and toes while keeping your body straight. Your hands should be just outside of should...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Isometric_Wipers"
        },
        {
            "id": "JM_Press",
            "name": "JM Press",
            "vi": "JM Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Start the exercise the same way you would a close grip bench press. You will lie on a flat bench while holding a barbell at arms length (fully extende...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "JM_Press"
        },
        {
            "id": "Kettlebell_Arnold_Press",
            "name": "Kettlebell Arnold Press",
            "vi": "Kettlebell Arnold Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean a kettlebell to your shoulder. Clean the kettlebell to your shoulder by extending through the legs and hips as you raise the kettlebell towards ...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Kettlebell_Arnold_Press"
        },
        {
            "id": "Kettlebell_Pirate_Ships",
            "name": "Kettlebell Pirate Ships",
            "vi": "Kettlebell Pirate Ships",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Dễ",
            "desc": "With a wide stance, hold a kettlebell with both hands. Allow it to hang at waist level with your arms extended. This will be your starting position. I...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Kettlebell_Pirate_Ships"
        },
        {
            "id": "Kettlebell_Seated_Press",
            "name": "Kettlebell Seated Press",
            "vi": "Kettlebell Seated Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Sit on the floor and spread your legs out comfortably. Clean one kettlebell to your shoulder. Press the kettlebell up and out until it is locked out o...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Kettlebell_Seated_Press"
        },
        {
            "id": "Kettlebell_Seesaw_Press",
            "name": "Kettlebell Seesaw Press",
            "vi": "Kettlebell Seesaw Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean two kettlebells two your shoulders. Press one kettlebell. Lower the kettlebell and immediately press the other kettlebell. Make sure to do the s...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Kettlebell_Seesaw_Press"
        },
        {
            "id": "Kettlebell_Thruster",
            "name": "Kettlebell Thruster",
            "vi": "Kettlebell Thruster",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean two kettlebells to your shoulders. Clean the kettlebells to your shoulders by extending through the legs and hips as you pull the kettlebells to...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Kettlebell_Thruster"
        },
        {
            "id": "Kettlebell_Turkish_Get-Up_Lunge_style",
            "name": "Kettlebell Turkish Get-Up (Lunge style)",
            "vi": "Kettlebell Turkish Get-Up (Lunge style)",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Lie on your back on the floor and press a kettlebell to the top position by extending the elbow. Bend the knee on the same side as the kettlebell. Kee...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Kettlebell_Turkish_Get-Up_Lunge_style"
        },
        {
            "id": "Kettlebell_Turkish_Get-Up_Squat_style",
            "name": "Kettlebell Turkish Get-Up (Squat style)",
            "vi": "Kettlebell Turkish Get-Up (Squat style)",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Lie on your back on the floor and press a kettlebell to the top position by extending the elbow. Bend the knee on the same side as the kettlebell. Kee...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Kettlebell_Turkish_Get-Up_Squat_style"
        },
        {
            "id": "Kneeling_Cable_Triceps_Extension",
            "name": "Kneeling Cable Triceps Extension",
            "vi": "Kneeling Cable Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Place a bench sideways in front of a high pulley machine. Hold a straight bar attachment above your head with your hands about 6 inches apart with you...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Kneeling_Cable_Triceps_Extension"
        },
        {
            "id": "Landmine_Linear_Jammer",
            "name": "Landmine Linear Jammer",
            "vi": "Landmine Linear Jammer",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Position a bar into landmine or, lacking one, securely anchor it in a corner. Load the bar to an appropriate weight and position the handle attachment...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Landmine_Linear_Jammer"
        },
        {
            "id": "Lateral_Raise_-_With_Bands",
            "name": "Lateral Raise - With Bands",
            "vi": "Lateral Raise - With Bands",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "To begin, stand on an exercise band so that tension begins at arm's length. Grasp the handles using a pronated (palms facing your thighs) grip that is...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Lateral_Raise_-_With_Bands"
        },
        {
            "id": "Leg-Over_Floor_Press",
            "name": "Leg-Over Floor Press",
            "vi": "Leg-Over Floor Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Lie on the floor with one kettlebell in place on your chest, holding it by the handle. Extend leg on working side over leg on non-working side.Your fr...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Leg-Over_Floor_Press"
        },
        {
            "id": "Leverage_Chest_Press",
            "name": "Leverage Chest Press",
            "vi": "Leverage Chest Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Load an appropriate weight onto the pins and adjust the seat for your height. The handles should be near the bottom or middle of the pectorals at the ...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Leverage_Chest_Press"
        },
        {
            "id": "Leverage_Decline_Chest_Press",
            "name": "Leverage Decline Chest Press",
            "vi": "Leverage Decline Chest Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Load an appropriate weight onto the pins and adjust the seat for your height. The handles should be near the bottom of the pectorals at the beginning ...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Leverage_Decline_Chest_Press"
        },
        {
            "id": "Leverage_Incline_Chest_Press",
            "name": "Leverage Incline Chest Press",
            "vi": "Leverage Incline Chest Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Load an appropriate weight onto the pins and adjust the seat for your height. The handles should be near the top of the pectorals at the beginning of ...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Leverage_Incline_Chest_Press"
        },
        {
            "id": "Leverage_Shoulder_Press",
            "name": "Leverage Shoulder Press",
            "vi": "Leverage Shoulder Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Load an appropriate weight onto the pins and adjust the seat for your height. The handles should be near the top of the shoulders at the beginning of ...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Leverage_Shoulder_Press"
        },
        {
            "id": "Low_Cable_Crossover",
            "name": "Low Cable Crossover",
            "vi": "Low Cable Crossover",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "To move into the starting position, place the pulleys at the low position, select the resistance to be used and grasp a handle in each hand. Step forw...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Low_Cable_Crossover"
        },
        {
            "id": "Low_Cable_Triceps_Extension",
            "name": "Low Cable Triceps Extension",
            "vi": "Low Cable Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Select the desired weight and lay down face up on the bench of a seated row machine that has a rope attached to it. Your head should be pointing towar...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Low_Cable_Triceps_Extension"
        },
        {
            "id": "Low_Pulley_Row_To_Neck",
            "name": "Low Pulley Row To Neck",
            "vi": "Low Pulley Row To Neck",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Sit on a low pulley row machine with a rope attachment. Grab the ends of the rope using a palms-down grip and sit with your back straight and your kne...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Low_Pulley_Row_To_Neck"
        },
        {
            "id": "Lying_Close-Grip_Barbell_Triceps_Extension_Behind_The_Head",
            "name": "Lying Close-Grip Barbell Triceps Extension Behind The Head",
            "vi": "Lying Close-Grip Barbell Triceps Extension Behind The Head",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "While holding a barbell or EZ Curl bar with a pronated grip (palms facing forward), lie on your back on a flat bench with your head close to the end o...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Lying_Close-Grip_Barbell_Triceps_Extension_Behind_The_Head"
        },
        {
            "id": "Lying_Close-Grip_Barbell_Triceps_Press_To_Chin",
            "name": "Lying Close-Grip Barbell Triceps Press To Chin",
            "vi": "Lying Close-Grip Barbell Triceps Press To Chin",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "e-z curl bar",
            "diff": "Trung bình",
            "desc": "While holding a barbell or EZ Curl bar with a pronated grip (palms facing forward), lie on your back on a flat bench with your head off the end of the...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Lying_Close-Grip_Barbell_Triceps_Press_To_Chin"
        },
        {
            "id": "Lying_Dumbbell_Tricep_Extension",
            "name": "Lying Dumbbell Tricep Extension",
            "vi": "Lying Dumbbell Tricep Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Lie on a flat bench while holding two dumbbells directly in front of you. Your arms should be fully extended at a 90-degree angle from your torso and ...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Lying_Dumbbell_Tricep_Extension"
        },
        {
            "id": "Lying_Face_Down_Plate_Neck_Resistance",
            "name": "Lying Face Down Plate Neck Resistance",
            "vi": "Lying Face Down Plate Neck Resistance",
            "icon": "🏋️",
            "muscles": [
                "Neck"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Lie face down with your whole body straight on a flat bench while holding a weight plate behind your head. Tip: You will need to position yourself so ...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Lying_Face_Down_Plate_Neck_Resistance"
        },
        {
            "id": "Lying_Face_Up_Plate_Neck_Resistance",
            "name": "Lying Face Up Plate Neck Resistance",
            "vi": "Lying Face Up Plate Neck Resistance",
            "icon": "🏋️",
            "muscles": [
                "Neck"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Lie face up with your whole body straight on a flat bench while holding a weight plate on top of your forehead. Tip: You will need to position yoursel...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Lying_Face_Up_Plate_Neck_Resistance"
        },
        {
            "id": "Lying_One-Arm_Lateral_Raise",
            "name": "Lying One-Arm Lateral Raise",
            "vi": "Lying One-Arm Lateral Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "While holding a dumbbell in one hand, lay with your chest down on a flat bench. The other hand can be used to hold to the leg of the bench for stabili...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Lying_One-Arm_Lateral_Raise"
        },
        {
            "id": "Lying_Rear_Delt_Raise",
            "name": "Lying Rear Delt Raise",
            "vi": "Lying Rear Delt Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "While holding a dumbbell in each hand, lay with your chest down on a flat bench. Position the palms of the hands in a neutral manner (palms facing you...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Lying_Rear_Delt_Raise"
        },
        {
            "id": "Lying_Triceps_Press",
            "name": "Lying Triceps Press",
            "vi": "Lying Triceps Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "e-z curl bar",
            "diff": "Trung bình",
            "desc": "Lie on a flat bench with either an e-z bar (my preference) or a straight bar placed on the floor behind your head and your feet on the floor. Grab the...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Lying_Triceps_Press"
        },
        {
            "id": "Machine_Bench_Press",
            "name": "Machine Bench Press",
            "vi": "Machine Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Sit down on the Chest Press Machine and select the weight. Step on the lever provided by the machine since it will help you to bring the handles forwa...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Machine_Bench_Press"
        },
        {
            "id": "Machine_Shoulder_Military_Press",
            "name": "Machine Shoulder (Military) Press",
            "vi": "Machine Shoulder (Military) Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Sit down on the Shoulder Press Machine and select the weight. Grab the handles to your sides as you keep the elbows bent and in line with your torso. ...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Machine_Shoulder_Military_Press"
        },
        {
            "id": "Machine_Triceps_Extension",
            "name": "Machine Triceps Extension",
            "vi": "Machine Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Adjust the seat to the appropriate height and make your weight selection. Place your upper arms against the pads and grasp the handles. This will be y...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Machine_Triceps_Extension"
        },
        {
            "id": "Neck_Press",
            "name": "Neck Press",
            "vi": "Neck Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Lie back on a flat bench. Using a medium-width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the ...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Neck_Press"
        },
        {
            "id": "One-Arm_Flat_Bench_Dumbbell_Flye",
            "name": "One-Arm Flat Bench Dumbbell Flye",
            "vi": "One-Arm Flat Bench Dumbbell Flye",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie down on a flat bench with a dumbbell in one hand resting on top of your thigh. The palm of your hand with the dumbbell in it should be at a neutra...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "One-Arm_Flat_Bench_Dumbbell_Flye"
        },
        {
            "id": "One-Arm_Incline_Lateral_Raise",
            "name": "One-Arm Incline Lateral Raise",
            "vi": "One-Arm Incline Lateral Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie down sideways on an incline bench press with a dumbbell in the hand. Make sure the shoulder is pressing against the incline bench and the arm is l...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "One-Arm_Incline_Lateral_Raise"
        },
        {
            "id": "One-Arm_Kettlebell_Clean_and_Jerk",
            "name": "One-Arm Kettlebell Clean and Jerk",
            "vi": "One-Arm Kettlebell Clean and Jerk",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Hold a kettlebell by the handle. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell towards your ...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "One-Arm_Kettlebell_Clean_and_Jerk"
        },
        {
            "id": "One-Arm_Kettlebell_Floor_Press",
            "name": "One-Arm Kettlebell Floor Press",
            "vi": "One-Arm Kettlebell Floor Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Lie on the floor holding a kettlebell with one hand, with your upper arm supported by the floor. The palm should be facing in. Press the kettlebell st...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "One-Arm_Kettlebell_Floor_Press"
        },
        {
            "id": "One-Arm_Kettlebell_Jerk",
            "name": "One-Arm Kettlebell Jerk",
            "vi": "One-Arm Kettlebell Jerk",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Hold a kettlebell by the handle. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell towards your ...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "One-Arm_Kettlebell_Jerk"
        },
        {
            "id": "One-Arm_Kettlebell_Military_Press_To_The_Side",
            "name": "One-Arm Kettlebell Military Press To The Side",
            "vi": "One-Arm Kettlebell Military Press To The Side",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean a kettlebell to your shoulder. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell towards y...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "One-Arm_Kettlebell_Military_Press_To_The_Side"
        },
        {
            "id": "One-Arm_Kettlebell_Para_Press",
            "name": "One-Arm Kettlebell Para Press",
            "vi": "One-Arm Kettlebell Para Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean a kettlebell to your shoulder. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell towards y...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "One-Arm_Kettlebell_Para_Press"
        },
        {
            "id": "One-Arm_Kettlebell_Push_Press",
            "name": "One-Arm Kettlebell Push Press",
            "vi": "One-Arm Kettlebell Push Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Hold a kettlebell by the handle. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell towards your ...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "One-Arm_Kettlebell_Push_Press"
        },
        {
            "id": "One-Arm_Kettlebell_Snatch",
            "name": "One-Arm Kettlebell Snatch",
            "vi": "One-Arm Kettlebell Snatch",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Khó",
            "desc": "Place a kettlebell between your feet. Bend your knees and push your butt back to get in the proper starting position. Look straight ahead and swing th...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "One-Arm_Kettlebell_Snatch"
        },
        {
            "id": "One-Arm_Kettlebell_Split_Jerk",
            "name": "One-Arm Kettlebell Split Jerk",
            "vi": "One-Arm Kettlebell Split Jerk",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Hold a kettlebell by the handle. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell towards your ...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "One-Arm_Kettlebell_Split_Jerk"
        },
        {
            "id": "One-Arm_Kettlebell_Split_Snatch",
            "name": "One-Arm Kettlebell Split Snatch",
            "vi": "One-Arm Kettlebell Split Snatch",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Khó",
            "desc": "Hold a kettlebell in one hand by the handle. Squat towards the floor, and then reverse the motion, extending the hips, knees, and finally the ankles, ...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "One-Arm_Kettlebell_Split_Snatch"
        },
        {
            "id": "One-Arm_Side_Laterals",
            "name": "One-Arm Side Laterals",
            "vi": "One-Arm Side Laterals",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Pick a dumbbell and place it in one of your hands. Your non lifting hand should be used to grab something steady such as an incline bench press. Lean ...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "One-Arm_Side_Laterals"
        },
        {
            "id": "One_Arm_Dumbbell_Bench_Press",
            "name": "One Arm Dumbbell Bench Press",
            "vi": "One Arm Dumbbell Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie down on a flat bench with a dumbbell in one hand on top of your thigh. By using your thigh to help you get the dumbbell up, clean the dumbbell up ...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "One_Arm_Dumbbell_Bench_Press"
        },
        {
            "id": "One_Arm_Floor_Press",
            "name": "One Arm Floor Press",
            "vi": "One Arm Floor Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Lie down on a flat surface with your back pressing against the floor or an exercise mat. Make sure your knees are bent. Have a partner hand you the ba...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "One_Arm_Floor_Press"
        },
        {
            "id": "One_Arm_Pronated_Dumbbell_Triceps_Extension",
            "name": "One Arm Pronated Dumbbell Triceps Extension",
            "vi": "One Arm Pronated Dumbbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie flat on a bench while holding a dumbbell at arms length. Your arm should be perpendicular to your body. The palm of your hand should be facing tow...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "One_Arm_Pronated_Dumbbell_Triceps_Extension"
        },
        {
            "id": "One_Arm_Supinated_Dumbbell_Triceps_Extension",
            "name": "One Arm Supinated Dumbbell Triceps Extension",
            "vi": "One Arm Supinated Dumbbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie flat on a bench while holding a dumbbell at arms length. Your arm should be perpendicular to your body. The palm of your hand should be facing tow...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "One_Arm_Supinated_Dumbbell_Triceps_Extension"
        },
        {
            "id": "Parallel_Bar_Dip",
            "name": "Parallel Bar Dip",
            "vi": "Parallel Bar Dip",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Stand between a set of parallel bars. Place a hand on each bar, and then take a small jump to help you get into the starting position with your arms l...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Parallel_Bar_Dip"
        },
        {
            "id": "Plyo_Kettlebell_Pushups",
            "name": "Plyo Kettlebell Pushups",
            "vi": "Plyo Kettlebell Pushups",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Khó",
            "desc": "Place a kettlebell on the floor. Place yourself in a pushup position, on your toes with one hand on the ground and one hand holding the kettlebell, wi...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Plyo_Kettlebell_Pushups"
        },
        {
            "id": "Power_Partials",
            "name": "Power Partials",
            "vi": "Power Partials",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand up with your torso upright and a dumbbell on each hand being held at arms length. The elbows should be close to the torso. The palms of the hand...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Power_Partials"
        },
        {
            "id": "Push-Up_Wide",
            "name": "Push-Up Wide",
            "vi": "Push-Up Wide",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "squat",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "With your hands wide apart, support your body on your toes and hands in a plank position. Your elbows should be extended and your body straight. Do no...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Push-Up_Wide"
        },
        {
            "id": "Push-Ups_-_Close_Triceps_Position",
            "name": "Push-Ups - Close Triceps Position",
            "vi": "Push-Ups - Close Triceps Position",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Lie on the floor face down and place your hands closer than shoulder width for a close hand position. Make sure that you are holding your torso up at ...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Push-Ups_-_Close_Triceps_Position"
        },
        {
            "id": "Push-Ups_With_Feet_Elevated",
            "name": "Push-Ups With Feet Elevated",
            "vi": "Push-Ups With Feet Elevated",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on the floor face down and place your hands about 36 inches apart from each other holding your torso up at arms length. Place your toes on top of ...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Push-Ups_With_Feet_Elevated"
        },
        {
            "id": "Push-Ups_With_Feet_On_An_Exercise_Ball",
            "name": "Push-Ups With Feet On An Exercise Ball",
            "vi": "Push-Ups With Feet On An Exercise Ball",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "exercise ball",
            "diff": "Trung bình",
            "desc": "Lie on the floor face down and place your hands about 36 inches apart from each other holding your torso up at arms length. Place your toes on top of ...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Push-Ups_With_Feet_On_An_Exercise_Ball"
        },
        {
            "id": "Push_Up_to_Side_Plank",
            "name": "Push Up to Side Plank",
            "vi": "Push Up to Side Plank",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Get into pushup position on the toes with your hands just outside of shoulder width. Perform a pushup by allowing the elbows to flex. As you descend, ...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Push_Up_to_Side_Plank"
        },
        {
            "id": "Pushups",
            "name": "Pushups",
            "vi": "Pushups",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on the floor face down and place your hands about 36 inches apart while holding your torso up at arms length. Next, lower yourself downward until ...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Pushups"
        },
        {
            "id": "Pushups_Close_and_Wide_Hand_Positions",
            "name": "Pushups (Close and Wide Hand Positions)",
            "vi": "Pushups (Close and Wide Hand Positions)",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on the floor face down and body straight with your toes on the floor and the hands wider than shoulder width for a wide hand position and closer t...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Pushups_Close_and_Wide_Hand_Positions"
        },
        {
            "id": "Reverse_Flyes",
            "name": "Reverse Flyes",
            "vi": "Reverse Flyes",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "To begin, lie down on an incline bench with the chest and stomach pressing against the incline. Have the dumbbells in each hand with the palms facing ...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Reverse_Flyes"
        },
        {
            "id": "Reverse_Flyes_With_External_Rotation",
            "name": "Reverse Flyes With External Rotation",
            "vi": "Reverse Flyes With External Rotation",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "To begin, lie down on an incline bench set at a 30-degree angle with the chest and stomach pressing against the incline. Have the dumbbells in each ha...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Reverse_Flyes_With_External_Rotation"
        },
        {
            "id": "Reverse_Grip_Triceps_Pushdown",
            "name": "Reverse Grip Triceps Pushdown",
            "vi": "Reverse Grip Triceps Pushdown",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Start by setting a bar attachment (straight or e-z) on a high pulley machine. Facing the bar attachment, grab it with the palms facing up (supinated g...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Reverse_Grip_Triceps_Pushdown"
        },
        {
            "id": "Reverse_Machine_Flyes",
            "name": "Reverse Machine Flyes",
            "vi": "Reverse Machine Flyes",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Adjust the handles so that they are fully to the rear. Make an appropriate weight selection and adjust the seat height so the handles are at shoulder ...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Reverse_Machine_Flyes"
        },
        {
            "id": "Reverse_Triceps_Bench_Press",
            "name": "Reverse Triceps Bench Press",
            "vi": "Reverse Triceps Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Lie back on a flat bench. Using a close, supinated grip (around shoulder width), lift the bar from the rack and hold it straight over you with your ar...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Reverse_Triceps_Bench_Press"
        },
        {
            "id": "Ring_Dips",
            "name": "Ring Dips",
            "vi": "Ring Dips",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Grip a ring in each hand, and then take a small jump to help you get into the starting position with your arms locked out. Begin by flexing the elbow,...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Ring_Dips"
        },
        {
            "id": "Seated_Barbell_Military_Press",
            "name": "Seated Barbell Military Press",
            "vi": "Seated Barbell Military Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Sit on a Military Press Bench with a bar behind your head and either have a spotter give you the bar (better on the rotator cuff this way) or pick it ...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Seated_Barbell_Military_Press"
        },
        {
            "id": "Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension",
            "name": "Seated Bent-Over One-Arm Dumbbell Triceps Extension",
            "vi": "Seated Bent-Over One-Arm Dumbbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit down at the end of a flat bench with a dumbbell in one arm using a neutral grip (palms of the hand facing you). Bend your knees slightly and bring...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension"
        },
        {
            "id": "Seated_Bent-Over_Rear_Delt_Raise",
            "name": "Seated Bent-Over Rear Delt Raise",
            "vi": "Seated Bent-Over Rear Delt Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Place a couple of dumbbells looking forward in front of a flat bench. Sit on the end of the bench with your legs together and the dumbbells behind you...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Seated_Bent-Over_Rear_Delt_Raise"
        },
        {
            "id": "Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
            "name": "Seated Bent-Over Two-Arm Dumbbell Triceps Extension",
            "vi": "Seated Bent-Over Two-Arm Dumbbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Sit down at the end of a flat bench with a dumbbell in both arms using a neutral grip (palms of the hand facing you). Bend your knees slightly and bri...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension"
        },
        {
            "id": "Seated_Cable_Shoulder_Press",
            "name": "Seated Cable Shoulder Press",
            "vi": "Seated Cable Shoulder Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Adjust the weight to an appropriate amount and be seated, grasping the handles. Your upper arms should be about 90 degrees to the body, with your head...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Seated_Cable_Shoulder_Press"
        },
        {
            "id": "Seated_Dumbbell_Press",
            "name": "Seated Dumbbell Press",
            "vi": "Seated Dumbbell Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Grab a couple of dumbbells and sit on a military press bench or a utility bench that has a back support on it as you place the dumbbells upright on to...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Seated_Dumbbell_Press"
        },
        {
            "id": "Seated_Head_Harness_Neck_Resistance",
            "name": "Seated Head Harness Neck Resistance",
            "vi": "Seated Head Harness Neck Resistance",
            "icon": "🏋️",
            "muscles": [
                "Neck"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Place a neck strap on the floor at the end of a flat bench. Once you have selected the weights, sit at the end of the flat bench with your feet wider ...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Seated_Head_Harness_Neck_Resistance"
        },
        {
            "id": "Seated_Side_Lateral_Raise",
            "name": "Seated Side Lateral Raise",
            "vi": "Seated Side Lateral Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Pick a couple of dumbbells and sit at the end of a flat bench with your feet firmly on the floor. Hold the dumbbells with your palms facing in and you...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Seated_Side_Lateral_Raise"
        },
        {
            "id": "Seated_Triceps_Press",
            "name": "Seated Triceps Press",
            "vi": "Seated Triceps Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit down on a bench with back support and grasp a dumbbell with both hands and hold it overhead at arm's length. Tip: a better way is to have somebody...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Seated_Triceps_Press"
        },
        {
            "id": "See-Saw_Press_Alternating_Side_Press",
            "name": "See-Saw Press (Alternating Side Press)",
            "vi": "See-Saw Press (Alternating Side Press)",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Grab a dumbbell with each hand and stand up erect. Clean (lift) the dumbbells to the chest/shoulder level and then rotate your wrists so that your pal...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "See-Saw_Press_Alternating_Side_Press"
        },
        {
            "id": "Shoulder_Press_-_With_Bands",
            "name": "Shoulder Press - With Bands",
            "vi": "Shoulder Press - With Bands",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "To begin, stand on an exercise band so that tension begins at arm's length. Grasp the handles and lift them so that the hands are at shoulder height a...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Shoulder_Press_-_With_Bands"
        },
        {
            "id": "Side_Lateral_Raise",
            "name": "Side Lateral Raise",
            "vi": "Side Lateral Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Pick a couple of dumbbells and stand with a straight torso and the dumbbells by your side at arms length with the palms of the hand facing you. This w...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Side_Lateral_Raise"
        },
        {
            "id": "Side_Laterals_to_Front_Raise",
            "name": "Side Laterals to Front Raise",
            "vi": "Side Laterals to Front Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "In a standing position, hold a pair of dumbbells at your side. This will be your starting position. Keeping your elbows slightly bent, raise the weigh...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Side_Laterals_to_Front_Raise"
        },
        {
            "id": "Single-Arm_Cable_Crossover",
            "name": "Single-Arm Cable Crossover",
            "vi": "Single-Arm Cable Crossover",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Begin by moving the pulleys to the high position, select the resistance to be used, and take a handle in each hand. Step forward in front of both pull...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Single-Arm_Cable_Crossover"
        },
        {
            "id": "Single-Arm_Linear_Jammer",
            "name": "Single-Arm Linear Jammer",
            "vi": "Single-Arm Linear Jammer",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to yo...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Single-Arm_Linear_Jammer"
        },
        {
            "id": "Single-Arm_Push-Up",
            "name": "Single-Arm Push-Up",
            "vi": "Single-Arm Push-Up",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Begin laying prone on the ground. Move yourself into a position supporting your weight on your toes and one arm. Your working arm should be placed dir...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Single-Arm_Push-Up"
        },
        {
            "id": "Single_Dumbbell_Raise",
            "name": "Single Dumbbell Raise",
            "vi": "Single Dumbbell Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "squat",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "With a wide stance, hold a dumbell with both hands, grasping the head of the dumbbell instead of the handle. Your arms should be extended and hanging ...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Single_Dumbbell_Raise"
        },
        {
            "id": "Sled_Overhead_Backward_Walk",
            "name": "Sled Overhead Backward Walk",
            "vi": "Sled Overhead Backward Walk",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Attach dual handles to a sled connected by a rope or chain. Load the sled to a light weight. Face the sled, backing up until there is some tension in ...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Sled_Overhead_Backward_Walk"
        },
        {
            "id": "Sled_Overhead_Triceps_Extension",
            "name": "Sled Overhead Triceps Extension",
            "vi": "Sled Overhead Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Attach dual handles to a sled using a chain or rope. Load the sled to an appropriate load. Facing away from the sled, step away until there is tension...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Sled_Overhead_Triceps_Extension"
        },
        {
            "id": "Sled_Reverse_Flye",
            "name": "Sled Reverse Flye",
            "vi": "Sled Reverse Flye",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Attach dual handles to a sled connected by a rope or chain. Load the sled to a light weight. Face the sled, backing up until there is some tension in ...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Sled_Reverse_Flye"
        },
        {
            "id": "Smith_Incline_Shoulder_Raise",
            "name": "Smith Incline Shoulder Raise",
            "vi": "Smith Incline Shoulder Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Place an incline bench underneath the smith machine. Place the barbell at a height that you can reach when lying down and your arms are almost fully e...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Smith_Incline_Shoulder_Raise"
        },
        {
            "id": "Smith_Machine_Bench_Press",
            "name": "Smith Machine Bench Press",
            "vi": "Smith Machine Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Place a flat bench underneath the smith machine. Now place the barbell at a height that you can reach when lying down and your arms are almost fully e...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Smith_Machine_Bench_Press"
        },
        {
            "id": "Smith_Machine_Close-Grip_Bench_Press",
            "name": "Smith Machine Close-Grip Bench Press",
            "vi": "Smith Machine Close-Grip Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Place a flat bench underneath the smith machine. Place the barbell at a height that you can reach when lying down and your arms are almost fully exten...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Smith_Machine_Close-Grip_Bench_Press"
        },
        {
            "id": "Smith_Machine_Decline_Press",
            "name": "Smith Machine Decline Press",
            "vi": "Smith Machine Decline Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "squat",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Position a decline bench in the rack so that the bar will be above your chest. Load an appropriate weight and take your place on the bench. Rotate the...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Smith_Machine_Decline_Press"
        },
        {
            "id": "Smith_Machine_Incline_Bench_Press",
            "name": "Smith Machine Incline Bench Press",
            "vi": "Smith Machine Incline Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Place an incline bench underneath the smith machine. Place the barbell at a height that you can reach when lying down and your arms are almost fully e...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Smith_Machine_Incline_Bench_Press"
        },
        {
            "id": "Smith_Machine_One-Arm_Upright_Row",
            "name": "Smith Machine One-Arm Upright Row",
            "vi": "Smith Machine One-Arm Upright Row",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "With the bar at thigh level, load an appropriate weight. Take a wide grip on the bar and unhook the weight, removing your off hand from the bar. Your ...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Smith_Machine_One-Arm_Upright_Row"
        },
        {
            "id": "Smith_Machine_Overhead_Shoulder_Press",
            "name": "Smith Machine Overhead Shoulder Press",
            "vi": "Smith Machine Overhead Shoulder Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "To begin, place a flat bench (or preferably one with back support) underneath a smith machine. Position the barbell at a height so that when seated on...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Smith_Machine_Overhead_Shoulder_Press"
        },
        {
            "id": "Speed_Band_Overhead_Triceps",
            "name": "Speed Band Overhead Triceps",
            "vi": "Speed Band Overhead Triceps",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "For this exercise anchor a band to the ground. We used an incline bench and anchored the band to the base, standing over the bench. Alternatively, thi...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Speed_Band_Overhead_Triceps"
        },
        {
            "id": "Standing_Alternating_Dumbbell_Press",
            "name": "Standing Alternating Dumbbell Press",
            "vi": "Standing Alternating Dumbbell Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand with a dumbbell in each hand. Raise the dumbbells to your shoulders with your palms facing forward and your elbows pointed out. This will be you...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Standing_Alternating_Dumbbell_Press"
        },
        {
            "id": "Standing_Barbell_Press_Behind_Neck",
            "name": "Standing Barbell Press Behind Neck",
            "vi": "Standing Barbell Press Behind Neck",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "This exercise is best performed inside a squat rack for easier pick up of the bar. To begin, first set the bar on a rack that best matches your height...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Standing_Barbell_Press_Behind_Neck"
        },
        {
            "id": "Standing_Bent-Over_One-Arm_Dumbbell_Triceps_Extension",
            "name": "Standing Bent-Over One-Arm Dumbbell Triceps Extension",
            "vi": "Standing Bent-Over One-Arm Dumbbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "With a dumbbell in one hand and the palm facing your torso, bend your knees slightly and bring your torso forward, by bending at the waist, while keep...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Standing_Bent-Over_One-Arm_Dumbbell_Triceps_Extension"
        },
        {
            "id": "Standing_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
            "name": "Standing Bent-Over Two-Arm Dumbbell Triceps Extension",
            "vi": "Standing Bent-Over Two-Arm Dumbbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "With a dumbbell in each hand and the palms facing your torso, bend your knees slightly and bring your torso forward, by bending at the waist, while ke...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Standing_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension"
        },
        {
            "id": "Standing_Bradford_Press",
            "name": "Standing Bradford Press",
            "vi": "Standing Bradford Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Place a loaded bar at shoulder level in a rack. With a pronated grip at shoulder width, begin with the bar racked across the front of your shoulders. ...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Standing_Bradford_Press"
        },
        {
            "id": "Standing_Cable_Chest_Press",
            "name": "Standing Cable Chest Press",
            "vi": "Standing Cable Chest Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Position dual pulleys to chest height and select an appropriate weight. Stand a foot or two in front of the cables, holding one in each hand. You can ...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Standing_Cable_Chest_Press"
        },
        {
            "id": "Standing_Dumbbell_Press",
            "name": "Standing Dumbbell Press",
            "vi": "Standing Dumbbell Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Standing with your feet shoulder width apart, take a dumbbell in each hand. Raise the dumbbells to head height, the elbows out and about 90 degrees. T...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Standing_Dumbbell_Press"
        },
        {
            "id": "Standing_Dumbbell_Straight-Arm_Front_Delt_Raise_Above_Head",
            "name": "Standing Dumbbell Straight-Arm Front Delt Raise Above Head",
            "vi": "Standing Dumbbell Straight-Arm Front Delt Raise Above Head",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Hold the dumbbells in front of your thighs, palms facing your thighs. Keep your arms straight with a slight bend at the elbows but keep them locked. T...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Standing_Dumbbell_Straight-Arm_Front_Delt_Raise_Above_Head"
        },
        {
            "id": "Standing_Dumbbell_Triceps_Extension",
            "name": "Standing Dumbbell Triceps Extension",
            "vi": "Standing Dumbbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "To begin, stand up with a dumbbell held by both hands. Your feet should be about shoulder width apart from each other. Slowly use both hands to grab t...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Standing_Dumbbell_Triceps_Extension"
        },
        {
            "id": "Standing_Front_Barbell_Raise_Over_Head",
            "name": "Standing Front Barbell Raise Over Head",
            "vi": "Standing Front Barbell Raise Over Head",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "To begin, stand straight with a barbell in your hands. You should grip the bar with palms facing down and a closer than shoulder width grip apart from...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Standing_Front_Barbell_Raise_Over_Head"
        },
        {
            "id": "Standing_Low-Pulley_Deltoid_Raise",
            "name": "Standing Low-Pulley Deltoid Raise",
            "vi": "Standing Low-Pulley Deltoid Raise",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Start by standing to the right side of a low pulley row. Use your left hand to come across the body and grab a single handle attached to the low pulle...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Standing_Low-Pulley_Deltoid_Raise"
        },
        {
            "id": "Standing_Low-Pulley_One-Arm_Triceps_Extension",
            "name": "Standing Low-Pulley One-Arm Triceps Extension",
            "vi": "Standing Low-Pulley One-Arm Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Grab a single handle with your left arm next to the low pulley machine. Turn away from the machine keeping the handle to the side of your body with yo...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Standing_Low-Pulley_One-Arm_Triceps_Extension"
        },
        {
            "id": "Standing_Military_Press",
            "name": "Standing Military Press",
            "vi": "Standing Military Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Start by placing a barbell that is about chest high on a squat rack. Once you have selected the weights, grab the barbell using a pronated (palms faci...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Standing_Military_Press"
        },
        {
            "id": "Standing_One-Arm_Dumbbell_Triceps_Extension",
            "name": "Standing One-Arm Dumbbell Triceps Extension",
            "vi": "Standing One-Arm Dumbbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "To begin, stand up with a dumbbell held in one hand. Your feet should be about shoulder width apart from each other. Now fully extend the arm with the...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Standing_One-Arm_Dumbbell_Triceps_Extension"
        },
        {
            "id": "Standing_Overhead_Barbell_Triceps_Extension",
            "name": "Standing Overhead Barbell Triceps Extension",
            "vi": "Standing Overhead Barbell Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "To begin, stand up holding a barbell or e-z bar using a pronated grip (palms facing forward) with your hands closer than shoulder width apart from eac...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Standing_Overhead_Barbell_Triceps_Extension"
        },
        {
            "id": "Standing_Palm-In_One-Arm_Dumbbell_Press",
            "name": "Standing Palm-In One-Arm Dumbbell Press",
            "vi": "Standing Palm-In One-Arm Dumbbell Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Start by having a dumbbell in one hand with your arm fully extended to the side using a neutral grip. Use your other arm to hold on to an incline benc...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Standing_Palm-In_One-Arm_Dumbbell_Press"
        },
        {
            "id": "Standing_Palms-In_Dumbbell_Press",
            "name": "Standing Palms-In Dumbbell Press",
            "vi": "Standing Palms-In Dumbbell Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Start by having a dumbbell in each hand with your arm fully extended to the side using a neutral grip. Your feet should be shoulder width apart from e...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Standing_Palms-In_Dumbbell_Press"
        },
        {
            "id": "Standing_Towel_Triceps_Extension",
            "name": "Standing Towel Triceps Extension",
            "vi": "Standing Towel Triceps Extension",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "To begin, stand up with both arms fully extended above the head holding one end of a towel with both hands. Your elbows should be in and the arms perp...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Standing_Towel_Triceps_Extension"
        },
        {
            "id": "Straight-Arm_Dumbbell_Pullover",
            "name": "Straight-Arm Dumbbell Pullover",
            "vi": "Straight-Arm Dumbbell Pullover",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Place a dumbbell standing up on a flat bench. Ensuring that the dumbbell stays securely placed at the top of the bench, lie perpendicular to the bench...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Straight-Arm_Dumbbell_Pullover"
        },
        {
            "id": "Straight_Raises_on_Incline_Bench",
            "name": "Straight Raises on Incline Bench",
            "vi": "Straight Raises on Incline Bench",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Place a bar on the ground behind the head of an incline bench. Lay on the bench face down. With a pronated grip, pick the barbell up from the floor, k...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Straight_Raises_on_Incline_Bench"
        },
        {
            "id": "Suspended_Push-Up",
            "name": "Suspended Push-Up",
            "vi": "Suspended Push-Up",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Anchor your suspension straps securely to the top of a rack or other object. Leaning into the straps, take a handle in each hand and move into a push-...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Suspended_Push-Up"
        },
        {
            "id": "Svend_Press",
            "name": "Svend Press",
            "vi": "Svend Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Begin in a standing position. Press two lightweight plates together with your hands. Hold the plates together close to your chest to create an isometr...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Svend_Press"
        },
        {
            "id": "Tate_Press",
            "name": "Tate Press",
            "vi": "Tate Press",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Lie down on a flat bench with a dumbbell in each hand on top of your thighs. The palms of your hand will be facing each other. By using your thighs to...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Tate_Press"
        },
        {
            "id": "Tricep_Dumbbell_Kickback",
            "name": "Tricep Dumbbell Kickback",
            "vi": "Tricep Dumbbell Kickback",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Start with a dumbbell in each hand and your palms facing your torso. Keep your back straight with a slight bend in the knees and bend forward at the w...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Tricep_Dumbbell_Kickback"
        },
        {
            "id": "Triceps_Overhead_Extension_with_Rope",
            "name": "Triceps Overhead Extension with Rope",
            "vi": "Triceps Overhead Extension with Rope",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a rope to a low pulley. After selecting an appropriate weight, grasp the rope with both hands and face away from the cable. Position your hands...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Triceps_Overhead_Extension_with_Rope"
        },
        {
            "id": "Triceps_Pushdown",
            "name": "Triceps Pushdown",
            "vi": "Triceps Pushdown",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a straight or angled bar to a high pulley and grab with an overhand grip (palms facing down) at shoulder width. Standing upright with the torso...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Triceps_Pushdown"
        },
        {
            "id": "Triceps_Pushdown_-_Rope_Attachment",
            "name": "Triceps Pushdown - Rope Attachment",
            "vi": "Triceps Pushdown - Rope Attachment",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a rope attachment to a high pulley and grab with a neutral grip (palms facing each other). Standing upright with the torso straight and a very ...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Triceps_Pushdown_-_Rope_Attachment"
        },
        {
            "id": "Triceps_Pushdown_-_V-Bar_Attachment",
            "name": "Triceps Pushdown - V-Bar Attachment",
            "vi": "Triceps Pushdown - V-Bar Attachment",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a V-Bar to a high pulley and grab with an overhand grip (palms facing down) at shoulder width. Standing upright with the torso straight and a v...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Triceps_Pushdown_-_V-Bar_Attachment"
        },
        {
            "id": "Two-Arm_Kettlebell_Clean",
            "name": "Two-Arm Kettlebell Clean",
            "vi": "Two-Arm Kettlebell Clean",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place two kettlebells between your feet. To get in the starting position, push your butt back and look straight ahead. Clean the kettlebells to your s...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Two-Arm_Kettlebell_Clean"
        },
        {
            "id": "Two-Arm_Kettlebell_Jerk",
            "name": "Two-Arm Kettlebell Jerk",
            "vi": "Two-Arm Kettlebell Jerk",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean two kettlebells to your shoulders. Clean the kettlebells to your shoulders by extending through the legs and hips as you swing the kettlebells t...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Two-Arm_Kettlebell_Jerk"
        },
        {
            "id": "Two-Arm_Kettlebell_Military_Press",
            "name": "Two-Arm Kettlebell Military Press",
            "vi": "Two-Arm Kettlebell Military Press",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean two kettlebells to your shoulders. Clean the kettlebells to your shoulders by extending through the legs and hips as you swing the kettlebells t...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Two-Arm_Kettlebell_Military_Press"
        },
        {
            "id": "Upright_Barbell_Row",
            "name": "Upright Barbell Row",
            "vi": "Upright Barbell Row",
            "icon": "🏋️",
            "muscles": [
                "Shoulders"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Grasp a barbell with an overhand grip that is slightly less than shoulder width. The bar should be resting on the top of your thighs with your arms ex...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Upright_Barbell_Row"
        },
        {
            "id": "Weighted_Bench_Dip",
            "name": "Weighted Bench Dip",
            "vi": "Weighted Bench Dip",
            "icon": "🏋️",
            "muscles": [
                "Triceps"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "For this exercise you will need to place a bench behind your back and another one in front of you. With the benches perpendicular to your body, hold o...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Weighted_Bench_Dip"
        },
        {
            "id": "Wide-Grip_Barbell_Bench_Press",
            "name": "Wide-Grip Barbell Bench Press",
            "vi": "Wide-Grip Barbell Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Lie back on a flat bench with feet firm on the floor. Using a wide, pronated (palms forward) grip that is around 3 inches away from shoulder width (fo...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Wide-Grip_Barbell_Bench_Press"
        },
        {
            "id": "Wide-Grip_Decline_Barbell_Bench_Press",
            "name": "Wide-Grip Decline Barbell Bench Press",
            "vi": "Wide-Grip Decline Barbell Bench Press",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Lie back on a decline bench with the feet securely locked at the front of the bench. Using a wide, pronated (palms forward) grip that is around 3 inch...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Wide-Grip_Decline_Barbell_Bench_Press"
        },
        {
            "id": "Wide-Grip_Decline_Barbell_Pullover",
            "name": "Wide-Grip Decline Barbell Pullover",
            "vi": "Wide-Grip Decline Barbell Pullover",
            "icon": "🏋️",
            "muscles": [
                "Chest"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Lie down on a decline bench with both legs securely locked in position. Reach for the barbell behind the head using a pronated grip (palms facing out)...",
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
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand up with your torso upright and a dumbbell in each hand being held at arms length. The elbows should be close to the torso. The palms of the hand...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Alternate_Hammer_Curl"
        },
        {
            "id": "Alternate_Incline_Dumbbell_Curl",
            "name": "Alternate Incline Dumbbell Curl",
            "vi": "Alternate Incline Dumbbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit down on an incline bench with a dumbbell in each hand being held at arms length. Tip: Keep the elbows close to the torso.This will be your startin...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Alternate_Incline_Dumbbell_Curl"
        },
        {
            "id": "Alternating_Kettlebell_Row",
            "name": "Alternating Kettlebell Row",
            "vi": "Alternating Kettlebell Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place two kettlebells in front of your feet. Bend your knees slightly and push your butt out as much as possible. As you bend over to get into the sta...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Alternating_Kettlebell_Row"
        },
        {
            "id": "Alternating_Renegade_Row",
            "name": "Alternating Renegade Row",
            "vi": "Alternating Renegade Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Khó",
            "desc": "Place two kettlebells on the floor about shoulder width apart. Position yourself on your toes and your hands as though you were doing a pushup, with t...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Alternating_Renegade_Row"
        },
        {
            "id": "Band_Assisted_Pull-Up",
            "name": "Band Assisted Pull-Up",
            "vi": "Band Assisted Pull-Up",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "squat",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Choke the band around the center of the pullup bar. You can use different bands to provide varying levels of assistance. Pull the end of the band down...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Band_Assisted_Pull-Up"
        },
        {
            "id": "Barbell_Curl",
            "name": "Barbell Curl",
            "vi": "Barbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Stand up with your torso upright while holding a barbell at a shoulder-width grip. The palm of your hands should be facing forward and the elbows shou...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Barbell_Curl"
        },
        {
            "id": "Barbell_Curls_Lying_Against_An_Incline",
            "name": "Barbell Curls Lying Against An Incline",
            "vi": "Barbell Curls Lying Against An Incline",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Lie against an incline bench, with your arms holding a barbell and hanging down in a horizontal line. This will be your starting position. While keepi...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Barbell_Curls_Lying_Against_An_Incline"
        },
        {
            "id": "Barbell_Deadlift",
            "name": "Barbell Deadlift",
            "vi": "Barbell Deadlift",
            "icon": "🏋️",
            "muscles": [
                "Lower back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Stand in front of a loaded barbell. While keeping the back as straight as possible, bend your knees, bend forward and grasp the bar using a medium (sh...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Barbell_Deadlift"
        },
        {
            "id": "Barbell_Shrug",
            "name": "Barbell Shrug",
            "vi": "Barbell Shrug",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Stand up straight with your feet at shoulder width as you hold a barbell with both hands in front of you using a pronated grip (palms facing the thigh...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Barbell_Shrug"
        },
        {
            "id": "Barbell_Shrug_Behind_The_Back",
            "name": "Barbell Shrug Behind The Back",
            "vi": "Barbell Shrug Behind The Back",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Stand up straight with your feet at shoulder width as you hold a barbell with both hands behind your back using a pronated grip (palms facing back). T...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Barbell_Shrug_Behind_The_Back"
        },
        {
            "id": "Bent-Arm_Barbell_Pullover",
            "name": "Bent-Arm Barbell Pullover",
            "vi": "Bent-Arm Barbell Pullover",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Lie on a flat bench with a barbell using a shoulder grip width. Hold the bar straight over your chest with a bend in your arms. This will be your star...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Bent-Arm_Barbell_Pullover"
        },
        {
            "id": "Bent_Over_Barbell_Row",
            "name": "Bent Over Barbell Row",
            "vi": "Bent Over Barbell Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Holding a barbell with a pronated grip (palms facing down), bend your knees slightly and bring your torso forward, by bending at the waist, while keep...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Bent_Over_Barbell_Row"
        },
        {
            "id": "Bent_Over_One-Arm_Long_Bar_Row",
            "name": "Bent Over One-Arm Long Bar Row",
            "vi": "Bent Over One-Arm Long Bar Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Put weight on one of the ends of an Olympic barbell. Make sure that you either place the other end of the barbell in the corner of two walls; or put a...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Bent_Over_One-Arm_Long_Bar_Row"
        },
        {
            "id": "Bent_Over_Two-Arm_Long_Bar_Row",
            "name": "Bent Over Two-Arm Long Bar Row",
            "vi": "Bent Over Two-Arm Long Bar Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Put weight on one of the ends of an Olympic barbell. Make sure that you either place the other end of the barbell in the corner of two walls; or put a...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Bent_Over_Two-Arm_Long_Bar_Row"
        },
        {
            "id": "Bent_Over_Two-Dumbbell_Row",
            "name": "Bent Over Two-Dumbbell Row",
            "vi": "Bent Over Two-Dumbbell Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "With a dumbbell in each hand (palms facing your torso), bend your knees slightly and bring your torso forward by bending at the waist; as you bend mak...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Bent_Over_Two-Dumbbell_Row"
        },
        {
            "id": "Bent_Over_Two-Dumbbell_Row_With_Palms_In",
            "name": "Bent Over Two-Dumbbell Row With Palms In",
            "vi": "Bent Over Two-Dumbbell Row With Palms In",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "With a dumbbell in each hand (palms facing each other), bend your knees slightly and bring your torso forward, by bending at the waist, while keeping ...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Bent_Over_Two-Dumbbell_Row_With_Palms_In"
        },
        {
            "id": "Bodyweight_Mid_Row",
            "name": "Bodyweight Mid Row",
            "vi": "Bodyweight Mid Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Begin by taking a medium to wide grip on a pull-up apparatus with your palms facing away from you. From a hanging position, tuck your knees to your ch...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Bodyweight_Mid_Row"
        },
        {
            "id": "Bottoms-Up_Clean_From_The_Hang_Position",
            "name": "Bottoms-Up Clean From The Hang Position",
            "vi": "Bottoms-Up Clean From The Hang Position",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Initiate the exercise by standing upright with a kettlebell in one hand. Swing the kettlebell back forcefully and then reverse the motion forcefully. ...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Bottoms-Up_Clean_From_The_Hang_Position"
        },
        {
            "id": "Cable_Hammer_Curls_-_Rope_Attachment",
            "name": "Cable Hammer Curls - Rope Attachment",
            "vi": "Cable Hammer Curls - Rope Attachment",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a rope attachment to a low pulley and stand facing the machine about 12 inches away from it. Grasp the rope with a neutral (palms-in) grip and ...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Cable_Hammer_Curls_-_Rope_Attachment"
        },
        {
            "id": "Cable_Incline_Pushdown",
            "name": "Cable Incline Pushdown",
            "vi": "Cable Incline Pushdown",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Lie on incline an bench facing away from a high pulley machine that has a straight bar attachment on it. Grasp the straight bar attachment overhead wi...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Cable_Incline_Pushdown"
        },
        {
            "id": "Cable_Preacher_Curl",
            "name": "Cable Preacher Curl",
            "vi": "Cable Preacher Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Place a preacher bench about 2 feet in front of a pulley machine. Attach a straight bar to the low pulley. Sit at the preacher bench with your elbow a...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Cable_Preacher_Curl"
        },
        {
            "id": "Cable_Shrugs",
            "name": "Cable Shrugs",
            "vi": "Cable Shrugs",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Grasp a cable bar attachment that is attached to a low pulley with a shoulder width or slightly wider overhand (palms facing down) grip. Stand erect c...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Cable_Shrugs"
        },
        {
            "id": "Cable_Wrist_Curl",
            "name": "Cable Wrist Curl",
            "vi": "Cable Wrist Curl",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Start out by placing a flat bench in front of a low pulley cable that has a straight bar attachment. Use your arms to grab the cable bar with a narrow...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Cable_Wrist_Curl"
        },
        {
            "id": "Calf-Machine_Shoulder_Shrug",
            "name": "Calf-Machine Shoulder Shrug",
            "vi": "Calf-Machine Shoulder Shrug",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Position yourself on the calf machine so that the shoulder pads are above your shoulders. Your torso should be straight with the arms extended normall...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Calf-Machine_Shoulder_Shrug"
        },
        {
            "id": "Chin-Up",
            "name": "Chin-Up",
            "vi": "Chin-Up",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Grab the pull-up bar with the palms facing your torso and a grip closer than the shoulder width. As you have both arms extended in front of you holdin...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Chin-Up"
        },
        {
            "id": "Close-Grip_EZ-Bar_Curl_with_Band",
            "name": "Close-Grip EZ-Bar Curl with Band",
            "vi": "Close-Grip EZ-Bar Curl with Band",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "e-z curl bar",
            "diff": "Dễ",
            "desc": "Attach a band to each end of the bar. Take the bar, placing a foot on the middle of the band. Stand upright with a narrow, supinated grip on the EZ ba...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Close-Grip_EZ-Bar_Curl_with_Band"
        },
        {
            "id": "Close-Grip_EZ_Bar_Curl",
            "name": "Close-Grip EZ Bar Curl",
            "vi": "Close-Grip EZ Bar Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Stand up with your torso upright while holding an E-Z Curl Bar at the closer inner handle. The palm of your hands should be facing forward and they sh...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Close-Grip_EZ_Bar_Curl"
        },
        {
            "id": "Close-Grip_Front_Lat_Pulldown",
            "name": "Close-Grip Front Lat Pulldown",
            "vi": "Close-Grip Front Lat Pulldown",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Sit down on a pull-down machine with a wide bar attached to the top pulley. Make sure that you adjust the knee pad of the machine to fit your height. ...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Close-Grip_Front_Lat_Pulldown"
        },
        {
            "id": "Close-Grip_Standing_Barbell_Curl",
            "name": "Close-Grip Standing Barbell Curl",
            "vi": "Close-Grip Standing Barbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Hold a barbell with both hands, palms up and a few inches apart. Stand with your torso straight and your head up. Your feet should be about shoulder w...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Close-Grip_Standing_Barbell_Curl"
        },
        {
            "id": "Concentration_Curls",
            "name": "Concentration Curls",
            "vi": "Concentration Curls",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit down on a flat bench with one dumbbell in front of you between your legs. Your legs should be spread with your knees bent and feet on the floor. U...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Concentration_Curls"
        },
        {
            "id": "Cross_Body_Hammer_Curl",
            "name": "Cross Body Hammer Curl",
            "vi": "Cross Body Hammer Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand up straight with a dumbbell in each hand. Your hands should be down at your side with your palms facing in. While keeping your palms facing in a...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Cross_Body_Hammer_Curl"
        },
        {
            "id": "Drag_Curl",
            "name": "Drag Curl",
            "vi": "Drag Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Grab a barbell with a supinated grip (palms facing forward) and get your elbows close to your torso and back. This will be your starting position. As ...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Drag_Curl"
        },
        {
            "id": "Dumbbell_Alternate_Bicep_Curl",
            "name": "Dumbbell Alternate Bicep Curl",
            "vi": "Dumbbell Alternate Bicep Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand (torso upright) with a dumbbell in each hand held at arms length. The elbows should be close to the torso and the palms of your hand should be f...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Dumbbell_Alternate_Bicep_Curl"
        },
        {
            "id": "Dumbbell_Bicep_Curl",
            "name": "Dumbbell Bicep Curl",
            "vi": "Dumbbell Bicep Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand up straight with a dumbbell in each hand at arm's length. Keep your elbows close to your torso and rotate the palms of your hands until they are...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Dumbbell_Bicep_Curl"
        },
        {
            "id": "Dumbbell_Incline_Row",
            "name": "Dumbbell Incline Row",
            "vi": "Dumbbell Incline Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Using a neutral grip, lean into an incline bench. Take a dumbbell in each hand with a neutral grip, beginning with the arms straight. This will be you...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Dumbbell_Incline_Row"
        },
        {
            "id": "Dumbbell_Lying_Pronation",
            "name": "Dumbbell Lying Pronation",
            "vi": "Dumbbell Lying Pronation",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Lie on a flat bench face down with one arm holding a dumbbell and the other hand on top of the bench folded so that you can rest your head on it. Bend...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Dumbbell_Lying_Pronation"
        },
        {
            "id": "Dumbbell_Lying_Supination",
            "name": "Dumbbell Lying Supination",
            "vi": "Dumbbell Lying Supination",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Lie sideways on a flat bench with one arm holding a dumbbell and the other hand on top of the bench folded so that you can rest your head on it. Bend ...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Dumbbell_Lying_Supination"
        },
        {
            "id": "Dumbbell_Prone_Incline_Curl",
            "name": "Dumbbell Prone Incline Curl",
            "vi": "Dumbbell Prone Incline Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Grab a dumbbell on each hand and lie face down on an incline bench with your shoulders near top of the incline. Your knees can rest on the seat or you...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Dumbbell_Prone_Incline_Curl"
        },
        {
            "id": "Dumbbell_Shrug",
            "name": "Dumbbell Shrug",
            "vi": "Dumbbell Shrug",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand erect with a dumbbell on each hand (palms facing your torso), arms extended on the sides. Lift the dumbbells by elevating the shoulders as high ...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Dumbbell_Shrug"
        },
        {
            "id": "EZ-Bar_Curl",
            "name": "EZ-Bar Curl",
            "vi": "EZ-Bar Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "e-z curl bar",
            "diff": "Dễ",
            "desc": "Stand up straight while holding an EZ curl bar at the wide outer handle. The palms of your hands should be facing forward and slightly tilted inward d...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "EZ-Bar_Curl"
        },
        {
            "id": "Elevated_Cable_Rows",
            "name": "Elevated Cable Rows",
            "vi": "Elevated Cable Rows",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Get a platform of some sort (it can be an aerobics or calf raise platform) that is around 4-6 inches in height. Place it on the seat of the cable row ...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Elevated_Cable_Rows"
        },
        {
            "id": "Finger_Curls",
            "name": "Finger Curls",
            "vi": "Finger Curls",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Hold a barbell with both hands and your palms facing up; hands spaced about shoulder width. Place your feet flat on the floor, at a distance that is s...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Finger_Curls"
        },
        {
            "id": "Flexor_Incline_Dumbbell_Curls",
            "name": "Flexor Incline Dumbbell Curls",
            "vi": "Flexor Incline Dumbbell Curls",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Hold the dumbbell towards the side farther from you so that you have more weight on the side closest to you. (This can be done for a good effect on al...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Flexor_Incline_Dumbbell_Curls"
        },
        {
            "id": "Full_Range-Of-Motion_Lat_Pulldown",
            "name": "Full Range-Of-Motion Lat Pulldown",
            "vi": "Full Range-Of-Motion Lat Pulldown",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Either standing or seated on a high bench, grasp two stirrup cables that are attached to the high pulleys. Grab with the opposing hand so your arms ar...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Full_Range-Of-Motion_Lat_Pulldown"
        },
        {
            "id": "Gironda_Sternum_Chins",
            "name": "Gironda Sternum Chins",
            "vi": "Gironda Sternum Chins",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Grasp the pull-up bar with a shoulder width underhand grip. Now hang with your arms fully extended and stick your chest out and lean back. Tip: You wi...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Gironda_Sternum_Chins"
        },
        {
            "id": "Hammer_Curls",
            "name": "Hammer Curls",
            "vi": "Hammer Curls",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand up with your torso upright and a dumbbell on each hand being held at arms length. The elbows should be close to the torso. The palms of the hand...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Hammer_Curls"
        },
        {
            "id": "High_Cable_Curls",
            "name": "High Cable Curls",
            "vi": "High Cable Curls",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Stand between a couple of high pulleys and grab a handle in each arm. Position your upper arms in a way that they are parallel to the floor with the p...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "High_Cable_Curls"
        },
        {
            "id": "Hyperextensions_Back_Extensions",
            "name": "Hyperextensions (Back Extensions)",
            "vi": "Hyperextensions (Back Extensions)",
            "icon": "🏋️",
            "muscles": [
                "Lower back"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Lie face down on a hyperextension bench, tucking your ankles securely under the footpads. Adjust the upper pad if possible so your upper thighs lie fl...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Hyperextensions_Back_Extensions"
        },
        {
            "id": "Hyperextensions_With_No_Hyperextension_Bench",
            "name": "Hyperextensions With No Hyperextension Bench",
            "vi": "Hyperextensions With No Hyperextension Bench",
            "icon": "🏋️",
            "muscles": [
                "Lower back"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "With someone holding down your legs, slide yourself down to the edge a flat bench until your hips hang off the end of the bench. Tip: Your entire uppe...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Hyperextensions_With_No_Hyperextension_Bench"
        },
        {
            "id": "Incline_Bench_Pull",
            "name": "Incline Bench Pull",
            "vi": "Incline Bench Pull",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Grab a dumbbell in each hand and lie face down on an incline bench that is set to an incline that is approximately 30 degrees. Let the arms hang to yo...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Incline_Bench_Pull"
        },
        {
            "id": "Incline_Dumbbell_Curl",
            "name": "Incline Dumbbell Curl",
            "vi": "Incline Dumbbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit back on an incline bench with a dumbbell in each hand held at arms length. Keep your elbows close to your torso and rotate the palms of your hands...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Incline_Dumbbell_Curl"
        },
        {
            "id": "Incline_Hammer_Curls",
            "name": "Incline Hammer Curls",
            "vi": "Incline Hammer Curls",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Incline_Hammer_Curls"
        },
        {
            "id": "Incline_Inner_Biceps_Curl",
            "name": "Incline Inner Biceps Curl",
            "vi": "Incline Inner Biceps Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "squat",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Hold a dumbbell in each hand and lie back on an incline bench. The dumbbells should be at arm's length hanging at your sides and your palms should be ...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Incline_Inner_Biceps_Curl"
        },
        {
            "id": "Inverted_Row",
            "name": "Inverted Row",
            "vi": "Inverted Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Position a bar in a rack to about waist height. You can also use a smith machine. Take a wider than shoulder width grip on the bar and position yourse...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Inverted_Row"
        },
        {
            "id": "Inverted_Row_with_Straps",
            "name": "Inverted Row with Straps",
            "vi": "Inverted Row with Straps",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Hang a rope or suspension straps from a rack or other stable object. Grasp the ends and position yourself in a supine position hanging from the ropes....",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Inverted_Row_with_Straps"
        },
        {
            "id": "Kettlebell_Sumo_High_Pull",
            "name": "Kettlebell Sumo High Pull",
            "vi": "Kettlebell Sumo High Pull",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place a kettlebell on the ground between your feet. Position your feet in a wide stance, and grasp the kettlebell with two hands. Set your hips back a...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Kettlebell_Sumo_High_Pull"
        },
        {
            "id": "Kipping_Muscle_Up",
            "name": "Kipping Muscle Up",
            "vi": "Kipping Muscle Up",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Grip the rings using a false grip, with the base of your palms on top of the rings. Begin with a movement swinging your legs backward slightly. Counte...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Kipping_Muscle_Up"
        },
        {
            "id": "Kneeling_High_Pulley_Row",
            "name": "Kneeling High Pulley Row",
            "vi": "Kneeling High Pulley Row",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Select the appropriate weight using a pulley that is above your head. Attach a rope to the cable and kneel a couple of feet away, holding the rope out...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Kneeling_High_Pulley_Row"
        },
        {
            "id": "Kneeling_Single-Arm_High_Pulley_Row",
            "name": "Kneeling Single-Arm High Pulley Row",
            "vi": "Kneeling Single-Arm High Pulley Row",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a single handle to a high pulley and make your weight selection. Kneel in front of the cable tower, taking the cable with one hand with your ar...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Kneeling_Single-Arm_High_Pulley_Row"
        },
        {
            "id": "Leverage_High_Row",
            "name": "Leverage High Row",
            "vi": "Leverage High Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Load an appropriate weight onto the pins and adjust the seat height so that you can just reach the handles above you. Adjust the knee pad to help keep...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Leverage_High_Row"
        },
        {
            "id": "Leverage_Iso_Row",
            "name": "Leverage Iso Row",
            "vi": "Leverage Iso Row",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Load an appropriate weight onto the pins and adjust the seat height so that the handles are at chest level. Grasp the handles with either a neutral or...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Leverage_Iso_Row"
        },
        {
            "id": "Leverage_Shrug",
            "name": "Leverage Shrug",
            "vi": "Leverage Shrug",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Load the pins to an appropriate weight. Position yourself directly between the handles. Grasp the top handles with a comfortable grip, and then lower ...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Leverage_Shrug"
        },
        {
            "id": "London_Bridges",
            "name": "London Bridges",
            "vi": "London Bridges",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Attach a climbing rope to a high beam or cross member. Below it, ensure that the smith machine bar is locked in place with the safeties and cannot mov...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "London_Bridges"
        },
        {
            "id": "Lying_Cable_Curl",
            "name": "Lying Cable Curl",
            "vi": "Lying Cable Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Grab a straight bar or E-Z bar attachment that is attached to the low pulley with both hands, using an underhand (palms facing up) shoulder-width grip...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Lying_Cable_Curl"
        },
        {
            "id": "Lying_Cambered_Barbell_Row",
            "name": "Lying Cambered Barbell Row",
            "vi": "Lying Cambered Barbell Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Place a cambered bar underneath an exercise bench. Lie face down on the exercise bench and grab the bar using a palms down (pronated grip) that is wid...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Lying_Cambered_Barbell_Row"
        },
        {
            "id": "Lying_Close-Grip_Bar_Curl_On_High_Pulley",
            "name": "Lying Close-Grip Bar Curl On High Pulley",
            "vi": "Lying Close-Grip Bar Curl On High Pulley",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Place a flat bench in front of a high pulley or lat pulldown machine. Hold the straight bar attachment using an underhand grip (palms up) that is abou...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Lying_Close-Grip_Bar_Curl_On_High_Pulley"
        },
        {
            "id": "Lying_High_Bench_Barbell_Curl",
            "name": "Lying High Bench Barbell Curl",
            "vi": "Lying High Bench Barbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Lie face forward on a tall flat bench while holding a barbell with a supinated grip (palms facing up). Tip: If you are holding a barbell grab it using...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Lying_High_Bench_Barbell_Curl"
        },
        {
            "id": "Lying_Supine_Dumbbell_Curl",
            "name": "Lying Supine Dumbbell Curl",
            "vi": "Lying Supine Dumbbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Lie down on a flat bench face up while holding a dumbbell in each arm on top of your thighs. Bring the dumbbells to the sides with the arms extended a...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Lying_Supine_Dumbbell_Curl"
        },
        {
            "id": "Lying_T-Bar_Row",
            "name": "Lying T-Bar Row",
            "vi": "Lying T-Bar Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "Load up the T-bar Row Machine with the desired weight and adjust the leg height so that your upper chest is at the top of the pad. Tip: In some machin...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Lying_T-Bar_Row"
        },
        {
            "id": "Machine_Bicep_Curl",
            "name": "Machine Bicep Curl",
            "vi": "Machine Bicep Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Adjust the seat to the appropriate height and make your weight selection. Place your upper arms against the pads and grasp the handles. This will be y...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Machine_Bicep_Curl"
        },
        {
            "id": "Machine_Preacher_Curls",
            "name": "Machine Preacher Curls",
            "vi": "Machine Preacher Curls",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Sit down on the Preacher Curl Machine and select the weight. Place the back of your upper arms (your triceps) on the preacher pad provided and grab th...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Machine_Preacher_Curls"
        },
        {
            "id": "Middle_Back_Shrug",
            "name": "Middle Back Shrug",
            "vi": "Middle Back Shrug",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Lie facedown on an incline bench while holding a dumbbell in each hand. Your arms should be fully extended hanging down and pointing towards the floor...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Middle_Back_Shrug"
        },
        {
            "id": "Mixed_Grip_Chin",
            "name": "Mixed Grip Chin",
            "vi": "Mixed Grip Chin",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Khó",
            "desc": "Using a spacing that is just about 1 inch wider than shoulder width, grab a pull-up bar with the palms of one hand facing forward and the palms of the...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Mixed_Grip_Chin"
        },
        {
            "id": "Muscle_Up",
            "name": "Muscle Up",
            "vi": "Muscle Up",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Grip the rings using a false grip, with the base of your palms on top of the rings. Initiate a pull up by pulling the elbows down to your side, flexin...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Muscle_Up"
        },
        {
            "id": "One-Arm_Dumbbell_Row",
            "name": "One-Arm Dumbbell Row",
            "vi": "One-Arm Dumbbell Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Choose a flat bench and place a dumbbell on each side of it. Place the right leg on top of the end of the bench, bend your torso forward from the wais...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "One-Arm_Dumbbell_Row"
        },
        {
            "id": "One-Arm_Kettlebell_Row",
            "name": "One-Arm Kettlebell Row",
            "vi": "One-Arm Kettlebell Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place a kettlebell in front of your feet. Bend your knees slightly and then push your butt out as much as possible as you bend over to get in the star...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "One-Arm_Kettlebell_Row"
        },
        {
            "id": "One-Arm_Long_Bar_Row",
            "name": "One-Arm Long Bar Row",
            "vi": "One-Arm Long Bar Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Position a bar into a landmine or in a corner to keep it from moving. Load an appropriate weight onto your end. Stand next to the bar, and take a grip...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "One-Arm_Long_Bar_Row"
        },
        {
            "id": "One_Arm_Chin-Up",
            "name": "One Arm Chin-Up",
            "vi": "One Arm Chin-Up",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Khó",
            "desc": "For this exercise, start out by placing a towel around a chin up bar. Grab the chin-up bar with your palm facing you. One hand will be grabbing the ch...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "One_Arm_Chin-Up"
        },
        {
            "id": "One_Arm_Dumbbell_Preacher_Curl",
            "name": "One Arm Dumbbell Preacher Curl",
            "vi": "One Arm Dumbbell Preacher Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Grab a dumbbell with the right arm and place the upper arm on top of the preacher bench or the incline bench. The dumbbell should be held at shoulder ...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "One_Arm_Dumbbell_Preacher_Curl"
        },
        {
            "id": "One_Arm_Lat_Pulldown",
            "name": "One Arm Lat Pulldown",
            "vi": "One Arm Lat Pulldown",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Select an appropriate weight and adjust the knee pad to help keep you down. Grasp the handle with a pronated grip. This will be your starting position...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "One_Arm_Lat_Pulldown"
        },
        {
            "id": "Overhead_Cable_Curl",
            "name": "Overhead Cable Curl",
            "vi": "Overhead Cable Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "To begin, set a weight that is comfortable on each side of the pulley machine. Note: Make sure that the amount of weight selected is the same on each ...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Overhead_Cable_Curl"
        },
        {
            "id": "Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench",
            "name": "Palms-Down Dumbbell Wrist Curl Over A Bench",
            "vi": "Palms-Down Dumbbell Wrist Curl Over A Bench",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Start out by placing two dumbbells on one side of a flat bench. Kneel down on both of your knees so that your body is facing the flat bench. Use your ...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench"
        },
        {
            "id": "Palms-Down_Wrist_Curl_Over_A_Bench",
            "name": "Palms-Down Wrist Curl Over A Bench",
            "vi": "Palms-Down Wrist Curl Over A Bench",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Start out by placing a barbell on one side of a flat bench. Kneel down on both of your knees so that your body is facing the flat bench. Use your arms...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Palms-Down_Wrist_Curl_Over_A_Bench"
        },
        {
            "id": "Palms-Up_Barbell_Wrist_Curl_Over_A_Bench",
            "name": "Palms-Up Barbell Wrist Curl Over A Bench",
            "vi": "Palms-Up Barbell Wrist Curl Over A Bench",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Start out by placing a barbell on one side of a flat bench. Kneel down on both of your knees so that your body is facing the flat bench. Use your arms...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Palms-Up_Barbell_Wrist_Curl_Over_A_Bench"
        },
        {
            "id": "Palms-Up_Dumbbell_Wrist_Curl_Over_A_Bench",
            "name": "Palms-Up Dumbbell Wrist Curl Over A Bench",
            "vi": "Palms-Up Dumbbell Wrist Curl Over A Bench",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Start out by placing two dumbbells on one side of a flat bench. Kneel down on both of your knees so that your body is facing the flat bench. Use your ...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Palms-Up_Dumbbell_Wrist_Curl_Over_A_Bench"
        },
        {
            "id": "Plate_Pinch",
            "name": "Plate Pinch",
            "vi": "Plate Pinch",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "static",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Grab two wide-rimmed plates and put them together with the smooth sides facing outward Use your fingers to grip the outside part of the plate and your...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Plate_Pinch"
        },
        {
            "id": "Preacher_Curl",
            "name": "Preacher Curl",
            "vi": "Preacher Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "To perform this movement you will need a preacher bench and an E-Z bar. Grab the E-Z curl bar at the close inner handle (either have someone hand you ...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Preacher_Curl"
        },
        {
            "id": "Preacher_Hammer_Dumbbell_Curl",
            "name": "Preacher Hammer Dumbbell Curl",
            "vi": "Preacher Hammer Dumbbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Place the upper part of both arms on top of the preacher bench as you hold a dumbbell in each hand with the palms facing each other (neutral grip). As...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Preacher_Hammer_Dumbbell_Curl"
        },
        {
            "id": "Pullups",
            "name": "Pullups",
            "vi": "Pullups",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Grab the pull-up bar with the palms facing forward using the prescribed grip. Note on grips: For a wide grip, your hands need to be spaced out at a di...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Pullups"
        },
        {
            "id": "Reverse_Barbell_Curl",
            "name": "Reverse Barbell Curl",
            "vi": "Reverse Barbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Stand up with your torso upright while holding a barbell at shoulder width with the elbows close to the torso. The palm of your hands should be facing...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Reverse_Barbell_Curl"
        },
        {
            "id": "Reverse_Barbell_Preacher_Curls",
            "name": "Reverse Barbell Preacher Curls",
            "vi": "Reverse Barbell Preacher Curls",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "e-z curl bar",
            "diff": "Trung bình",
            "desc": "Grab an EZ-bar using a shoulder width and palms down (pronated) grip. Now place the upper part of both arms on top of the preacher bench and have your...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Reverse_Barbell_Preacher_Curls"
        },
        {
            "id": "Reverse_Cable_Curl",
            "name": "Reverse Cable Curl",
            "vi": "Reverse Cable Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Stand up with your torso upright while holding a bar attachment that is attached to a low pulley using a pronated (palms down) and shoulder width grip...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Reverse_Cable_Curl"
        },
        {
            "id": "Reverse_Grip_Bent-Over_Rows",
            "name": "Reverse Grip Bent-Over Rows",
            "vi": "Reverse Grip Bent-Over Rows",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Stand erect while holding a barbell with a supinated grip (palms facing up). Bend your knees slightly and bring your torso forward, by bending at the ...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Reverse_Grip_Bent-Over_Rows"
        },
        {
            "id": "Reverse_Plate_Curls",
            "name": "Reverse Plate Curls",
            "vi": "Reverse Plate Curls",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Start by standing straight with a weighted plate held by both hands and arms fully extended. Use a pronated grip (palms facing down) and make sure you...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Reverse_Plate_Curls"
        },
        {
            "id": "Rocky_Pull-Ups_Pulldowns",
            "name": "Rocky Pull-Ups/Pulldowns",
            "vi": "Rocky Pull-Ups/Pulldowns",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Grab the pull-up bar with the palms facing forward using a wide grip. As you have both arms extended in front of you holding the bar at the chosen gri...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Rocky_Pull-Ups_Pulldowns"
        },
        {
            "id": "Rope_Climb",
            "name": "Rope Climb",
            "vi": "Rope Climb",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Grab the rope with both hands above your head. Pull down on the rope as you take a small jump. Wrap the rope around one leg, using your feet to pinch ...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Rope_Climb"
        },
        {
            "id": "Rope_Straight-Arm_Pulldown",
            "name": "Rope Straight-Arm Pulldown",
            "vi": "Rope Straight-Arm Pulldown",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a rope to a high pulley and make your weight selection. Stand a couple feet back from the pulley with your feet staggered and take the rope wit...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Rope_Straight-Arm_Pulldown"
        },
        {
            "id": "Scapular_Pull-Up",
            "name": "Scapular Pull-Up",
            "vi": "Scapular Pull-Up",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Take a pronated grip on a pull-up bar. From a hanging position, raise yourself a few inches without using your arms. Do this by depressing your should...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Scapular_Pull-Up"
        },
        {
            "id": "Seated_Cable_Rows",
            "name": "Seated Cable Rows",
            "vi": "Seated Cable Rows",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "For this exercise you will need access to a low pulley row machine with a V-bar. Note: The V-bar will enable you to have a neutral grip where the palm...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Seated_Cable_Rows"
        },
        {
            "id": "Seated_Close-Grip_Concentration_Barbell_Curl",
            "name": "Seated Close-Grip Concentration Barbell Curl",
            "vi": "Seated Close-Grip Concentration Barbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Sit down on a flat bench with a barbell or E-Z Bar in front of you in between your legs. Your legs should be spread with the knees bent and the feet o...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Seated_Close-Grip_Concentration_Barbell_Curl"
        },
        {
            "id": "Seated_Dumbbell_Curl",
            "name": "Seated Dumbbell Curl",
            "vi": "Seated Dumbbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit on a flat bench with a dumbbell on each hand being held at arms length. The elbows should be close to the torso. Rotate the palms of the hands so ...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Seated_Dumbbell_Curl"
        },
        {
            "id": "Seated_Dumbbell_Inner_Biceps_Curl",
            "name": "Seated Dumbbell Inner Biceps Curl",
            "vi": "Seated Dumbbell Inner Biceps Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit on the end of a flat bench with a dumbbell in each hand being held at arms length. The elbows should be close to the torso. Rotate the palms of th...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Seated_Dumbbell_Inner_Biceps_Curl"
        },
        {
            "id": "Seated_Dumbbell_Palms-Down_Wrist_Curl",
            "name": "Seated Dumbbell Palms-Down Wrist Curl",
            "vi": "Seated Dumbbell Palms-Down Wrist Curl",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Start out by placing two dumbbells on the floor in front of a flat bench. Sit down on the edge of the flat bench with your legs at about shoulder widt...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Seated_Dumbbell_Palms-Down_Wrist_Curl"
        },
        {
            "id": "Seated_Dumbbell_Palms-Up_Wrist_Curl",
            "name": "Seated Dumbbell Palms-Up Wrist Curl",
            "vi": "Seated Dumbbell Palms-Up Wrist Curl",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Start out by placing two dumbbells on the floor in front of a flat bench. Sit down on the edge of the flat bench with your legs at about shoulder widt...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Seated_Dumbbell_Palms-Up_Wrist_Curl"
        },
        {
            "id": "Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl",
            "name": "Seated One-Arm Dumbbell Palms-Down Wrist Curl",
            "vi": "Seated One-Arm Dumbbell Palms-Down Wrist Curl",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Sit on a flat bench with a dumbbell in your right hand. Place your feet flat on the floor, at a distance that is slightly wider than shoulder width ap...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl"
        },
        {
            "id": "Seated_One-Arm_Dumbbell_Palms-Up_Wrist_Curl",
            "name": "Seated One-Arm Dumbbell Palms-Up Wrist Curl",
            "vi": "Seated One-Arm Dumbbell Palms-Up Wrist Curl",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Sit on a flat bench with a dumbbell in your right hand. Place your feet flat on the floor, at a distance that is slightly wider than shoulder width ap...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Seated_One-Arm_Dumbbell_Palms-Up_Wrist_Curl"
        },
        {
            "id": "Seated_One-arm_Cable_Pulley_Rows",
            "name": "Seated One-arm Cable Pulley Rows",
            "vi": "Seated One-arm Cable Pulley Rows",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "To get into the starting position, first sit down on the machine and place your feet on the front platform or crossbar provided making sure that your ...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Seated_One-arm_Cable_Pulley_Rows"
        },
        {
            "id": "Seated_Palm-Up_Barbell_Wrist_Curl",
            "name": "Seated Palm-Up Barbell Wrist Curl",
            "vi": "Seated Palm-Up Barbell Wrist Curl",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Hold a barbell with both hands and your palms facing up; hands spaced about shoulder width. Place your feet flat on the floor, at a distance that is s...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Seated_Palm-Up_Barbell_Wrist_Curl"
        },
        {
            "id": "Seated_Palms-Down_Barbell_Wrist_Curl",
            "name": "Seated Palms-Down Barbell Wrist Curl",
            "vi": "Seated Palms-Down Barbell Wrist Curl",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Hold a barbell with both hands and your palms facing down; hands spaced about shoulder width. Place your feet flat on the floor, at a distance that is...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Seated_Palms-Down_Barbell_Wrist_Curl"
        },
        {
            "id": "Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl",
            "name": "Seated Two-Arm Palms-Up Low-Pulley Wrist Curl",
            "vi": "Seated Two-Arm Palms-Up Low-Pulley Wrist Curl",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Put a bench in front of a low pulley machine that has a barbell or EZ Curl attachment on it. Move the bench far enough away so that when you bring the...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl"
        },
        {
            "id": "Shotgun_Row",
            "name": "Shotgun Row",
            "vi": "Shotgun Row",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a single handle to a low cable. After selecting the correct weight, stand a couple feet back with a wide-split stance. Your arm should be exten...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Shotgun_Row"
        },
        {
            "id": "Side_To_Side_Chins",
            "name": "Side To Side Chins",
            "vi": "Side To Side Chins",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Grab the pull-up bar with the palms facing forward using a wide grip. As you have both arms extended in front of you holding the bar at a wide grip, b...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Side_To_Side_Chins"
        },
        {
            "id": "Sled_Row",
            "name": "Sled Row",
            "vi": "Sled Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Attach dual handles to a sled connected by a rope or chain. Load the sled to an appropriate weight. Face the sled, backing up until there is some tens...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Sled_Row"
        },
        {
            "id": "Smith_Machine_Behind_the_Back_Shrug",
            "name": "Smith Machine Behind the Back Shrug",
            "vi": "Smith Machine Behind the Back Shrug",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "With the bar at thigh level, load an appropriate weight. Stand with the bar behind you, taking a shoulder-width, pronated grip on the bar and unhook t...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Smith_Machine_Behind_the_Back_Shrug"
        },
        {
            "id": "Smith_Machine_Bent_Over_Row",
            "name": "Smith Machine Bent Over Row",
            "vi": "Smith Machine Bent Over Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Set the barbell attached to the smith machine to a height that is about 2 inches below your knees. Bend your knees slightly and bring your torso forwa...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Smith_Machine_Bent_Over_Row"
        },
        {
            "id": "Smith_Machine_Upright_Row",
            "name": "Smith Machine Upright Row",
            "vi": "Smith Machine Upright Row",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "To begin, set the bar on the smith machine to a height that is around the middle of your thighs. Once the correct height is chosen and the bar is load...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Smith_Machine_Upright_Row"
        },
        {
            "id": "Spider_Curl",
            "name": "Spider Curl",
            "vi": "Spider Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "e-z curl bar",
            "diff": "Dễ",
            "desc": "Start out by setting the bar on the part of the preacher bench that you would normally sit on. Make sure to align the barbell properly so that it is b...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Spider_Curl"
        },
        {
            "id": "Standing_Biceps_Cable_Curl",
            "name": "Standing Biceps Cable Curl",
            "vi": "Standing Biceps Cable Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Stand up with your torso upright while holding a cable curl bar that is attached to a low pulley. Grab the cable bar at shoulder width and keep the el...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Standing_Biceps_Cable_Curl"
        },
        {
            "id": "Standing_Concentration_Curl",
            "name": "Standing Concentration Curl",
            "vi": "Standing Concentration Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Taking a dumbbell in your working hand, lean forward. Allow your working arm to hang perpendicular to the ground with the elbow pointing out. This wil...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Standing_Concentration_Curl"
        },
        {
            "id": "Standing_Dumbbell_Reverse_Curl",
            "name": "Standing Dumbbell Reverse Curl",
            "vi": "Standing Dumbbell Reverse Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "To begin, stand straight with a dumbbell in each hand using a pronated grip (palms facing down). Your arms should be fully extended while your feet ar...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Standing_Dumbbell_Reverse_Curl"
        },
        {
            "id": "Standing_Dumbbell_Upright_Row",
            "name": "Standing Dumbbell Upright Row",
            "vi": "Standing Dumbbell Upright Row",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Grasp a dumbbell in each hand with a pronated (palms forward) grip that is slightly less than shoulder width. The dumbbells should be resting on top o...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Standing_Dumbbell_Upright_Row"
        },
        {
            "id": "Standing_Inner-Biceps_Curl",
            "name": "Standing Inner-Biceps Curl",
            "vi": "Standing Inner-Biceps Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Stand up with a dumbbell in each hand being held at arms length. The elbows should be close to the torso. Your legs should be at about shoulder's widt...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Standing_Inner-Biceps_Curl"
        },
        {
            "id": "Standing_Olympic_Plate_Hand_Squeeze",
            "name": "Standing Olympic Plate Hand Squeeze",
            "vi": "Standing Olympic Plate Hand Squeeze",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "static",
            "equip": "other",
            "diff": "Dễ",
            "desc": "To begin, stand straight while holding a weight plate by the ridge at arm's length in each hand using a neutral grip (palms facing in). You feet shoul...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Standing_Olympic_Plate_Hand_Squeeze"
        },
        {
            "id": "Standing_One-Arm_Cable_Curl",
            "name": "Standing One-Arm Cable Curl",
            "vi": "Standing One-Arm Cable Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Start out by grabbing single handle next to the low pulley machine. Make sure you are far enough from the machine so that your arm is supporting the w...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Standing_One-Arm_Cable_Curl"
        },
        {
            "id": "Standing_One-Arm_Dumbbell_Curl_Over_Incline_Bench",
            "name": "Standing One-Arm Dumbbell Curl Over Incline Bench",
            "vi": "Standing One-Arm Dumbbell Curl Over Incline Bench",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand on the back side of an incline bench as if you were going to be a spotter for someone. Have a dumbbell in one hand and rest it across the inclin...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Standing_One-Arm_Dumbbell_Curl_Over_Incline_Bench"
        },
        {
            "id": "Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl",
            "name": "Standing Palms-Up Barbell Behind The Back Wrist Curl",
            "vi": "Standing Palms-Up Barbell Behind The Back Wrist Curl",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Start by standing straight and holding a barbell behind your glutes at arm's length while using a pronated grip (palms will be facing back away from t...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl"
        },
        {
            "id": "Stiff_Leg_Barbell_Good_Morning",
            "name": "Stiff Leg Barbell Good Morning",
            "vi": "Stiff Leg Barbell Good Morning",
            "icon": "🏋️",
            "muscles": [
                "Lower back"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Stiff_Leg_Barbell_Good_Morning"
        },
        {
            "id": "Straight-Arm_Pulldown",
            "name": "Straight-Arm Pulldown",
            "vi": "Straight-Arm Pulldown",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "You will start by grabbing the wide bar from the top pulley of a pulldown machine and using a wider than shoulder-width pronated (palms down) grip. St...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Straight-Arm_Pulldown"
        },
        {
            "id": "Straight_Bar_Bench_Mid_Rows",
            "name": "Straight Bar Bench Mid Rows",
            "vi": "Straight Bar Bench Mid Rows",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Place a loaded barbell on the end of a bench. Standing on the bench behind the bar, take a medium, pronated grip. Stand with your hips back and chest ...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Straight_Bar_Bench_Mid_Rows"
        },
        {
            "id": "Suspended_Row",
            "name": "Suspended Row",
            "vi": "Suspended Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Suspend your straps at around chest height. Take a handle in each hand and lean back. Keep your body erect and your head and chest up. Your arms shoul...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Suspended_Row"
        },
        {
            "id": "T-Bar_Row_with_Handle",
            "name": "T-Bar Row with Handle",
            "vi": "T-Bar Row with Handle",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Position a bar into a landmine or in a corner to keep it from moving. Load an appropriate weight onto your end. Stand over the bar, and position a Dou...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "T-Bar_Row_with_Handle"
        },
        {
            "id": "Two-Arm_Dumbbell_Preacher_Curl",
            "name": "Two-Arm Dumbbell Preacher Curl",
            "vi": "Two-Arm Dumbbell Preacher Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Grab a dumbbell with each arm and place the upper arms on top of the preacher bench or the incline bench. The dumbbell should be held at shoulder leng...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Two-Arm_Dumbbell_Preacher_Curl"
        },
        {
            "id": "Two-Arm_Kettlebell_Row",
            "name": "Two-Arm Kettlebell Row",
            "vi": "Two-Arm Kettlebell Row",
            "icon": "🏋️",
            "muscles": [
                "Middle back"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place two kettlebells in front of your feet. Bend your knees slightly and then push your butt out as much as possible as you bend over to get in the s...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Two-Arm_Kettlebell_Row"
        },
        {
            "id": "Underhand_Cable_Pulldowns",
            "name": "Underhand Cable Pulldowns",
            "vi": "Underhand Cable Pulldowns",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Sit down on a pull-down machine with a wide bar attached to the top pulley. Adjust the knee pad of the machine to fit your height. These pads will pre...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Underhand_Cable_Pulldowns"
        },
        {
            "id": "Upright_Cable_Row",
            "name": "Upright Cable Row",
            "vi": "Upright Cable Row",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Grasp a straight bar cable attachment that is attached to a low pulley with a pronated (palms facing your thighs) grip that is slightly less than shou...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Upright_Cable_Row"
        },
        {
            "id": "Upright_Row_-_With_Bands",
            "name": "Upright Row - With Bands",
            "vi": "Upright Row - With Bands",
            "icon": "🏋️",
            "muscles": [
                "Traps"
            ],
            "anim": "pull",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "To begin, stand on an exercise band so that tension begins at arm's length. Grasp the handles using a pronated (palms facing your thighs) grip that is...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Upright_Row_-_With_Bands"
        },
        {
            "id": "V-Bar_Pulldown",
            "name": "V-Bar Pulldown",
            "vi": "V-Bar Pulldown",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Sit down on a pull-down machine with a V-Bar attached to the top pulley. Adjust the knee pad of the machine to fit your height. These pads will preven...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "V-Bar_Pulldown"
        },
        {
            "id": "V-Bar_Pullup",
            "name": "V-Bar Pullup",
            "vi": "V-Bar Pullup",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Start by placing the middle of the V-bar in the middle of the pull-up bar (assuming that the pull-up station you are using does not have neutral grip ...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "V-Bar_Pullup"
        },
        {
            "id": "Weighted_Ball_Hyperextension",
            "name": "Weighted Ball Hyperextension",
            "vi": "Weighted Ball Hyperextension",
            "icon": "🏋️",
            "muscles": [
                "Lower back"
            ],
            "anim": "pull",
            "equip": "exercise ball",
            "diff": "Trung bình",
            "desc": "To begin, lie down on an exercise ball with your torso pressing against the ball and parallel to the floor. The ball of your feet should be pressed ag...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Weighted_Ball_Hyperextension"
        },
        {
            "id": "Weighted_Pull_Ups",
            "name": "Weighted Pull Ups",
            "vi": "Weighted Pull Ups",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Attach a weight to a dip belt and secure it around your waist. Grab the pull-up bar with the palms of your hands facing forward. For a medium grip, yo...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Weighted_Pull_Ups"
        },
        {
            "id": "Wide-Grip_Lat_Pulldown",
            "name": "Wide-Grip Lat Pulldown",
            "vi": "Wide-Grip Lat Pulldown",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Sit down on a pull-down machine with a wide bar attached to the top pulley. Make sure that you adjust the knee pad of the machine to fit your height. ...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Wide-Grip_Lat_Pulldown"
        },
        {
            "id": "Wide-Grip_Pulldown_Behind_The_Neck",
            "name": "Wide-Grip Pulldown Behind The Neck",
            "vi": "Wide-Grip Pulldown Behind The Neck",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Sit down on a pull-down machine with a wide bar attached to the top pulley. Make sure that you adjust the knee pad of the machine to fit your height. ...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Wide-Grip_Pulldown_Behind_The_Neck"
        },
        {
            "id": "Wide-Grip_Rear_Pull-Up",
            "name": "Wide-Grip Rear Pull-Up",
            "vi": "Wide-Grip Rear Pull-Up",
            "icon": "🏋️",
            "muscles": [
                "Lats"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Grab the pull-up bar with the palms facing forward using a wide grip. As you have both arms extended in front of you holding the bar, bring your torso...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Wide-Grip_Rear_Pull-Up"
        },
        {
            "id": "Wide-Grip_Standing_Barbell_Curl",
            "name": "Wide-Grip Standing Barbell Curl",
            "vi": "Wide-Grip Standing Barbell Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Stand up with your torso upright while holding a barbell at the wide outer handle. The palm of your hands should be facing forward. The elbows should ...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Wide-Grip_Standing_Barbell_Curl"
        },
        {
            "id": "Wrist_Roller",
            "name": "Wrist Roller",
            "vi": "Wrist Roller",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "To begin, stand straight up grabbing a wrist roller using a pronated grip (palms facing down). Your feet should be shoulder width apart. Slowly lift b...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Wrist_Roller"
        },
        {
            "id": "Wrist_Rotations_with_Straight_Bar",
            "name": "Wrist Rotations with Straight Bar",
            "vi": "Wrist Rotations with Straight Bar",
            "icon": "🏋️",
            "muscles": [
                "Forearms"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Hold a barbell with both hands and your palms facing down; hands spaced about shoulder width. This will be your starting position. Alternating between...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Wrist_Rotations_with_Straight_Bar"
        },
        {
            "id": "Zottman_Curl",
            "name": "Zottman Curl",
            "vi": "Zottman Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Stand up with your torso upright and a dumbbell in each hand being held at arms length. The elbows should be close to the torso. Make sure the palms o...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Zottman_Curl"
        },
        {
            "id": "Zottman_Preacher_Curl",
            "name": "Zottman Preacher Curl",
            "vi": "Zottman Preacher Curl",
            "icon": "🏋️",
            "muscles": [
                "Biceps"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Grab a dumbbell in each hand and place your upper arms on top of the preacher bench or the incline bench. The dumbbells should be held at shoulder hei...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Zottman_Preacher_Curl"
        }
    ],
    "3": [
        {
            "id": "3_4_Sit-Up",
            "name": "3/4 Sit-Up",
            "vi": "3/4 Sit-Up",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie down on the floor and secure your feet. Your legs should be bent at the knees. Place your hands behind or to the side of your head. You will begin...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "3_4_Sit-Up"
        },
        {
            "id": "Ab_Crunch_Machine",
            "name": "Ab Crunch Machine",
            "vi": "Ab Crunch Machine",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "Select a light resistance and sit down on the ab machine placing your feet under the pads provided and grabbing the top handles. Your arms should be b...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Ab_Crunch_Machine"
        },
        {
            "id": "Ab_Roller",
            "name": "Ab Roller",
            "vi": "Ab Roller",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Hold the Ab Roller with both hands and kneel on the floor. Now place the ab roller on the floor in front of you so that you are on all your hands and ...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Ab_Roller"
        },
        {
            "id": "Advanced_Kettlebell_Windmill",
            "name": "Advanced Kettlebell Windmill",
            "vi": "Advanced Kettlebell Windmill",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean and press a kettlebell overhead with one arm. Keeping the kettlebell locked out at all times, push your butt out in the direction of the locked ...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Advanced_Kettlebell_Windmill"
        },
        {
            "id": "Air_Bike",
            "name": "Air Bike",
            "vi": "Air Bike",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie flat on the floor with your lower back pressed to the ground. For this exercise, you will need to put your hands beside your head. Be careful howe...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Air_Bike"
        },
        {
            "id": "Alternate_Heel_Touchers",
            "name": "Alternate Heel Touchers",
            "vi": "Alternate Heel Touchers",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on the floor with the knees bent and the feet on the floor around 18-24 inches apart. Your arms should be extended by your side. This will be your...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Alternate_Heel_Touchers"
        },
        {
            "id": "Alternating_Hang_Clean",
            "name": "Alternating Hang Clean",
            "vi": "Alternating Hang Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place two kettlebells between your feet. To get in the starting position, push your butt back and look straight ahead. Clean one kettlebell to your sh...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Alternating_Hang_Clean"
        },
        {
            "id": "Balance_Board",
            "name": "Balance Board",
            "vi": "Balance Board",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "squat",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Place a balance board in front of you. Stand up on it and try to balance yourself. Hold the balance for as long as desired....",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Balance_Board"
        },
        {
            "id": "Ball_Leg_Curl",
            "name": "Ball Leg Curl",
            "vi": "Ball Leg Curl",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "exercise ball",
            "diff": "Dễ",
            "desc": "Begin on the floor laying on your back with your feet on top of the ball. Position the ball so that when your legs are extended your ankles are on top...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Ball_Leg_Curl"
        },
        {
            "id": "Band_Hip_Adductions",
            "name": "Band Hip Adductions",
            "vi": "Band Hip Adductions",
            "icon": "🏋️",
            "muscles": [
                "Adductors"
            ],
            "anim": "pull",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Anchor a band around a solid post or other object. Stand with your left side to the post, and put your right foot through the band, getting it around ...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Band_Hip_Adductions"
        },
        {
            "id": "Barbell_Ab_Rollout",
            "name": "Barbell Ab Rollout",
            "vi": "Barbell Ab Rollout",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "For this exercise you will need to get into a pushup position, but instead of having your hands of the floor, you will be grabbing on to an Olympic ba...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Barbell_Ab_Rollout"
        },
        {
            "id": "Barbell_Ab_Rollout_-_On_Knees",
            "name": "Barbell Ab Rollout - On Knees",
            "vi": "Barbell Ab Rollout - On Knees",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "Hold an Olympic barbell loaded with 5-10lbs on each side and kneel on the floor. Now place the barbell on the floor in front of you so that you are on...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Barbell_Ab_Rollout_-_On_Knees"
        },
        {
            "id": "Barbell_Full_Squat",
            "name": "Barbell Full Squat",
            "vi": "Barbell Full Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack just above shoulder level. Once the cor...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Barbell_Full_Squat"
        },
        {
            "id": "Barbell_Hack_Squat",
            "name": "Barbell Hack Squat",
            "vi": "Barbell Hack Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Stand up straight while holding a barbell behind you at arms length and your feet at shoulder width. Tip: A shoulder width grip is best with the palms...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Barbell_Hack_Squat"
        },
        {
            "id": "Barbell_Lunge",
            "name": "Barbell Lunge",
            "vi": "Barbell Lunge",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack just below shoulder level. Once the cor...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Barbell_Lunge"
        },
        {
            "id": "Barbell_Rollout_from_Bench",
            "name": "Barbell Rollout from Bench",
            "vi": "Barbell Rollout from Bench",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Place a loaded barbell on the ground, near the end of a bench. Kneel with both legs on the bench, and take a medium to narrow grip on the barbell. Thi...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Barbell_Rollout_from_Bench"
        },
        {
            "id": "Barbell_Seated_Calf_Raise",
            "name": "Barbell Seated Calf Raise",
            "vi": "Barbell Seated Calf Raise",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Place a block about 12 inches in front of a flat bench. Sit on the bench and place the ball of your feet on the block. Have someone place a barbell ov...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Barbell_Seated_Calf_Raise"
        },
        {
            "id": "Barbell_Side_Bend",
            "name": "Barbell Side Bend",
            "vi": "Barbell Side Bend",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Stand up straight while holding a barbell placed on the back of your shoulders (slightly below the neck). Your feet should be shoulder width apart. Th...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Barbell_Side_Bend"
        },
        {
            "id": "Barbell_Side_Split_Squat",
            "name": "Barbell Side Split Squat",
            "vi": "Barbell Side Split Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Stand up straight while holding a barbell placed on the back of your shoulders (slightly below the neck). Your feet should be placed wide apart with t...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Barbell_Side_Split_Squat"
        },
        {
            "id": "Barbell_Squat",
            "name": "Barbell Squat",
            "vi": "Barbell Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack to just below shoulder level. Once the ...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Barbell_Squat"
        },
        {
            "id": "Barbell_Squat_To_A_Bench",
            "name": "Barbell Squat To A Bench",
            "vi": "Barbell Squat To A Bench",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first place a flat bench or a box behind you. The flat bench is use...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Barbell_Squat_To_A_Bench"
        },
        {
            "id": "Barbell_Step_Ups",
            "name": "Barbell Step Ups",
            "vi": "Barbell Step Ups",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Stand up straight while holding a barbell placed on the back of your shoulders (slightly below the neck) and stand upright behind an elevated platform...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Barbell_Step_Ups"
        },
        {
            "id": "Barbell_Walking_Lunge",
            "name": "Barbell Walking Lunge",
            "vi": "Barbell Walking Lunge",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Begin standing with your feet shoulder width apart and a barbell across your upper back. Step forward with one leg, flexing the knees to drop your hip...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Barbell_Walking_Lunge"
        },
        {
            "id": "Bent-Knee_Hip_Raise",
            "name": "Bent-Knee Hip Raise",
            "vi": "Bent-Knee Hip Raise",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lay flat on the floor with your arms next to your sides. Now bend your knees at around a 75 degree angle and lift your feet off the floor by around 2 ...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Bent-Knee_Hip_Raise"
        },
        {
            "id": "Bent_Press",
            "name": "Bent Press",
            "vi": "Bent Press",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Khó",
            "desc": "Clean a kettlebell to your shoulder. Clean the kettlebell to your shoulders by extending through the legs and hips as you raise the kettlebell towards...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Bent_Press"
        },
        {
            "id": "Bodyweight_Squat",
            "name": "Bodyweight Squat",
            "vi": "Bodyweight Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Stand with your feet shoulder width apart. You can place your hands behind your head. This will be your starting position. Begin the movement by flexi...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Bodyweight_Squat"
        },
        {
            "id": "Bodyweight_Walking_Lunge",
            "name": "Bodyweight Walking Lunge",
            "vi": "Bodyweight Walking Lunge",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Begin standing with your feet shoulder width apart and your hands on your hips. Step forward with one leg, flexing the knees to drop your hips. Descen...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Bodyweight_Walking_Lunge"
        },
        {
            "id": "Bosu_Ball_Cable_Crunch_With_Side_Bends",
            "name": "Bosu Ball Cable Crunch With Side Bends",
            "vi": "Bosu Ball Cable Crunch With Side Bends",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect a standard handle to each arm of a cable machine, and position them in the most downward position. Grab a Bosu Ball and position it in front a...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Bosu_Ball_Cable_Crunch_With_Side_Bends"
        },
        {
            "id": "Bottoms_Up",
            "name": "Bottoms Up",
            "vi": "Bottoms Up",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Begin by lying on your back on the ground. Your legs should be straight and your arms at your side. This will be your starting position. To perform th...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Bottoms_Up"
        },
        {
            "id": "Box_Squat_with_Chains",
            "name": "Box Squat with Chains",
            "vi": "Box Squat with Chains",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "Begin in a power rack with a box at the appropriate height behind you. Typically, you would aim for a box height that brings you to a parallel squat, ...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Box_Squat_with_Chains"
        },
        {
            "id": "Butt-Ups",
            "name": "Butt-Ups",
            "vi": "Butt-Ups",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Begin a pushup position but with your elbows on the ground and resting on your forearms. Your arms should be bent at a 90 degree angle. Arch your back...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Butt-Ups"
        },
        {
            "id": "Butt_Lift_Bridge",
            "name": "Butt Lift (Bridge)",
            "vi": "Butt Lift (Bridge)",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie flat on the floor on your back with the hands by your side and your knees bent. Your feet should be placed around shoulder width. This will be you...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Butt_Lift_Bridge"
        },
        {
            "id": "Cable_Crunch",
            "name": "Cable Crunch",
            "vi": "Cable Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Kneel below a high pulley that contains a rope attachment. Grasp cable rope attachment and lower the rope until your hands are placed next to your fac...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Cable_Crunch"
        },
        {
            "id": "Cable_Deadlifts",
            "name": "Cable Deadlifts",
            "vi": "Cable Deadlifts",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Move the cables to the bottom of the towers and select an appropriate weight. Stand directly in between the uprights. To begin, squat down be flexing ...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Cable_Deadlifts"
        },
        {
            "id": "Cable_Hip_Adduction",
            "name": "Cable Hip Adduction",
            "vi": "Cable Hip Adduction",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Stand in front of a low pulley facing forward with one leg next to the pulley and the other one away. Attach the ankle cuff to the cable and also to t...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Cable_Hip_Adduction"
        },
        {
            "id": "Cable_Judo_Flip",
            "name": "Cable Judo Flip",
            "vi": "Cable Judo Flip",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect a rope attachment to a tower, and move the cable to the lowest pulley position. Stand with your side to the cable with a wide stance, and grab...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Cable_Judo_Flip"
        },
        {
            "id": "Cable_Reverse_Crunch",
            "name": "Cable Reverse Crunch",
            "vi": "Cable Reverse Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect an ankle strap attachment to a low pulley cable and position a mat on the floor in front of it. Sit down with your feet toward the pulley and ...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Cable_Reverse_Crunch"
        },
        {
            "id": "Cable_Russian_Twists",
            "name": "Cable Russian Twists",
            "vi": "Cable Russian Twists",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect a standard handle attachment, and position the cable to a middle pulley position. Lie on a stability ball perpendicular to the cable and grab ...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Cable_Russian_Twists"
        },
        {
            "id": "Cable_Seated_Crunch",
            "name": "Cable Seated Crunch",
            "vi": "Cable Seated Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Seat on a flat bench with your back facing a high pulley. Grasp the cable rope attachment with both hands (with the palms of the hands facing each oth...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Cable_Seated_Crunch"
        },
        {
            "id": "Calf_Press",
            "name": "Calf Press",
            "vi": "Calf Press",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Adjust the seat so that your legs are only slightly bent in the start position. The balls of your feet should be firmly on the platform. Select an app...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Calf_Press"
        },
        {
            "id": "Calf_Press_On_The_Leg_Press_Machine",
            "name": "Calf Press On The Leg Press Machine",
            "vi": "Calf Press On The Leg Press Machine",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Using a leg press machine, sit down on the machine and place your legs on the platform directly in front of you at a medium (shoulder width) foot stan...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Calf_Press_On_The_Leg_Press_Machine"
        },
        {
            "id": "Calf_Raise_On_A_Dumbbell",
            "name": "Calf Raise On A Dumbbell",
            "vi": "Calf Raise On A Dumbbell",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Hang on to a sturdy object for balance and stand on a dumbbell handle, preferably one with round plates so that it rolls as in this manner you have to...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Calf_Raise_On_A_Dumbbell"
        },
        {
            "id": "Calf_Raises_-_With_Bands",
            "name": "Calf Raises - With Bands",
            "vi": "Calf Raises - With Bands",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Grab an exercise band and stand on it with your toes making sure that the length of the band between the foot and the arms is the same for both sides....",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Calf_Raises_-_With_Bands"
        },
        {
            "id": "Chair_Squat",
            "name": "Chair Squat",
            "vi": "Chair Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "To begin, first set the bar to a position that best matches your height. Once the bar is loaded, step under it and position it across the back of your...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Chair_Squat"
        },
        {
            "id": "Cocoons",
            "name": "Cocoons",
            "vi": "Cocoons",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Begin by lying on your back on the ground. Your legs should be straight and your arms extended behind your head. This will be your starting position. ...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Cocoons"
        },
        {
            "id": "Cross-Body_Crunch",
            "name": "Cross-Body Crunch",
            "vi": "Cross-Body Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie flat on your back and bend your knees about 60 degrees. Keep your feet flat on the floor and place your hands loosely behind your head. This will ...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Cross-Body_Crunch"
        },
        {
            "id": "Crunch_-_Hands_Overhead",
            "name": "Crunch - Hands Overhead",
            "vi": "Crunch - Hands Overhead",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on the floor with your back flat and knees bent with around a 60-degree angle between the hamstrings and the calves. Keep your feet flat on the fl...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Crunch_-_Hands_Overhead"
        },
        {
            "id": "Crunch_-_Legs_On_Exercise_Ball",
            "name": "Crunch - Legs On Exercise Ball",
            "vi": "Crunch - Legs On Exercise Ball",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie flat on your back with your feet resting on an exercise ball and your knees bent at a 90 degree angle. Place your feet three to four inches apart ...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Crunch_-_Legs_On_Exercise_Ball"
        },
        {
            "id": "Crunches",
            "name": "Crunches",
            "vi": "Crunches",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie flat on your back with your feet flat on the ground, or resting on a bench with your knees bent at a 90 degree angle. If you are resting your feet...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Crunches"
        },
        {
            "id": "Dead_Bug",
            "name": "Dead Bug",
            "vi": "Dead Bug",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Begin lying on your back with your hands extended above you toward the ceiling. Bring your feet, knees, and hips up to 90 degrees. Exhale hard to brin...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Dead_Bug"
        },
        {
            "id": "Decline_Crunch",
            "name": "Decline Crunch",
            "vi": "Decline Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Secure your legs at the end of the decline bench and lie down. Now place your hands lightly on either side of your head keeping your elbows in. Tip: D...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Decline_Crunch"
        },
        {
            "id": "Decline_Oblique_Crunch",
            "name": "Decline Oblique Crunch",
            "vi": "Decline Oblique Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Secure your legs at the end of the decline bench and slowly lay down on the bench. Raise your upper body off the bench until your torso is about 35-45...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Decline_Oblique_Crunch"
        },
        {
            "id": "Decline_Reverse_Crunch",
            "name": "Decline Reverse Crunch",
            "vi": "Decline Reverse Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on your back on a decline bench and hold on to the top of the bench with both hands. Don't let your body slip down from this position. Hold your l...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Decline_Reverse_Crunch"
        },
        {
            "id": "Donkey_Calf_Raises",
            "name": "Donkey Calf Raises",
            "vi": "Donkey Calf Raises",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "For this exercise you will need access to a donkey calf raise machine. Start by positioning your lower back and hips under the padded lever provided. ...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Donkey_Calf_Raises"
        },
        {
            "id": "Double_Kettlebell_Alternating_Hang_Clean",
            "name": "Double Kettlebell Alternating Hang Clean",
            "vi": "Double Kettlebell Alternating Hang Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place two kettlebells between your feet. To get in the starting position, push your butt back and look straight ahead. Clean one kettlebell to your sh...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Double_Kettlebell_Alternating_Hang_Clean"
        },
        {
            "id": "Double_Kettlebell_Windmill",
            "name": "Double Kettlebell Windmill",
            "vi": "Double Kettlebell Windmill",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place a kettlebell in front of your front foot and clean and press a kettlebell overhead with your opposite arm. Clean the kettlebell to your shoulder...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Double_Kettlebell_Windmill"
        },
        {
            "id": "Downward_Facing_Balance",
            "name": "Downward Facing Balance",
            "vi": "Downward Facing Balance",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "static",
            "equip": "exercise ball",
            "diff": "Trung bình",
            "desc": "Lie facedown on top of an exercise ball. While resting on your stomach on the ball, walk your hands forward along the floor and lift your legs, extend...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Downward_Facing_Balance"
        },
        {
            "id": "Dumbbell_Clean",
            "name": "Dumbbell Clean",
            "vi": "Dumbbell Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Begin standing with a dumbbell in each hand with your feet shoulder width apart. Lower the weights to the floor by flexing at the hips and knees, push...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Dumbbell_Clean"
        },
        {
            "id": "Dumbbell_Lunges",
            "name": "Dumbbell Lunges",
            "vi": "Dumbbell Lunges",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand with your torso upright holding two dumbbells in your hands by your sides. This will be your starting position. Step forward with your right leg...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Dumbbell_Lunges"
        },
        {
            "id": "Dumbbell_Rear_Lunge",
            "name": "Dumbbell Rear Lunge",
            "vi": "Dumbbell Rear Lunge",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Stand with your torso upright holding two dumbbells in your hands by your sides. This will be your starting position. Step backward with your right le...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Dumbbell_Rear_Lunge"
        },
        {
            "id": "Dumbbell_Seated_One-Leg_Calf_Raise",
            "name": "Dumbbell Seated One-Leg Calf Raise",
            "vi": "Dumbbell Seated One-Leg Calf Raise",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Place a block on the floor about 12 inches from a flat bench. Sit on a flat bench and place a dumbbell on your upper left thigh about 3 inches above y...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Dumbbell_Seated_One-Leg_Calf_Raise"
        },
        {
            "id": "Dumbbell_Side_Bend",
            "name": "Dumbbell Side Bend",
            "vi": "Dumbbell Side Bend",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand up straight while holding a dumbbell on the left hand (palms facing the torso) as you have the right hand holding your waist. Your feet should b...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Dumbbell_Side_Bend"
        },
        {
            "id": "Dumbbell_Squat",
            "name": "Dumbbell Squat",
            "vi": "Dumbbell Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Stand up straight while holding a dumbbell on each hand (palms facing the side of your legs). Position your legs using a shoulder width medium stance ...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Dumbbell_Squat"
        },
        {
            "id": "Dumbbell_Squat_To_A_Bench",
            "name": "Dumbbell Squat To A Bench",
            "vi": "Dumbbell Squat To A Bench",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Stand up straight with a flat bench behind you while holding a dumbbell on each hand (palms facing the side of your legs). Position your legs using a ...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Dumbbell_Squat_To_A_Bench"
        },
        {
            "id": "Dumbbell_Step_Ups",
            "name": "Dumbbell Step Ups",
            "vi": "Dumbbell Step Ups",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Stand up straight while holding a dumbbell on each hand (palms facing the side of your legs). Place the right foot on the elevated platform. Step on t...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Dumbbell_Step_Ups"
        },
        {
            "id": "Elbow_to_Knee",
            "name": "Elbow to Knee",
            "vi": "Elbow to Knee",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on the floor, crossing your right leg across your bent left knee. Clasp your hands behind your head, beginning with your shoulder blades on the gr...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Elbow_to_Knee"
        },
        {
            "id": "Elevated_Back_Lunge",
            "name": "Elevated Back Lunge",
            "vi": "Elevated Back Lunge",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Position a bar onto a rack at shoulder height loaded to an appropriate weight. Place a short, raised platform behind you. Rack the bar onto your upper...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Elevated_Back_Lunge"
        },
        {
            "id": "Exercise_Ball_Crunch",
            "name": "Exercise Ball Crunch",
            "vi": "Exercise Ball Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "exercise ball",
            "diff": "Dễ",
            "desc": "Lie on an exercise ball with your lower back curvature pressed against the spherical surface of the ball. Your feet should be bent at the knee and pre...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Exercise_Ball_Crunch"
        },
        {
            "id": "Exercise_Ball_Pull-In",
            "name": "Exercise Ball Pull-In",
            "vi": "Exercise Ball Pull-In",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "exercise ball",
            "diff": "Dễ",
            "desc": "Place an exercise ball nearby and lay on the floor in front of it with your hands on the floor shoulder width apart in a push-up position. Now place y...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Exercise_Ball_Pull-In"
        },
        {
            "id": "Flat_Bench_Leg_Pull-In",
            "name": "Flat Bench Leg Pull-In",
            "vi": "Flat Bench Leg Pull-In",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on an exercise mat or a flat bench with your legs off the end. Place your hands either under your glutes with your palms down or by the sides hold...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Flat_Bench_Leg_Pull-In"
        },
        {
            "id": "Flat_Bench_Lying_Leg_Raise",
            "name": "Flat Bench Lying Leg Raise",
            "vi": "Flat Bench Lying Leg Raise",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie with your back flat on a bench and your legs extended in front of you off the end. Place your hands either under your glutes with your palms down ...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Flat_Bench_Lying_Leg_Raise"
        },
        {
            "id": "Floor_Glute-Ham_Raise",
            "name": "Floor Glute-Ham Raise",
            "vi": "Floor Glute-Ham Raise",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "You can use a partner for this exercise or brace your feet under something stable. Begin on your knees with your upper legs and torso upright. If usin...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Floor_Glute-Ham_Raise"
        },
        {
            "id": "Flutter_Kicks",
            "name": "Flutter Kicks",
            "vi": "Flutter Kicks",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "On a flat bench lie facedown with the hips on the edge of the bench, the legs straight with toes high off the floor and with the arms on top of the be...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Flutter_Kicks"
        },
        {
            "id": "Freehand_Jump_Squat",
            "name": "Freehand Jump Squat",
            "vi": "Freehand Jump Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Cross your arms over your chest. With your head up and your back straight, position your feet at shoulder width. Keeping your back straight and chest ...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Freehand_Jump_Squat"
        },
        {
            "id": "Frog_Sit-Ups",
            "name": "Frog Sit-Ups",
            "vi": "Frog Sit-Ups",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Lie with your back flat on the floor (or exercise mat) and your legs extended in front of you. Now bend at the knees and place your outer thighs by th...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Frog_Sit-Ups"
        },
        {
            "id": "Front_Barbell_Squat",
            "name": "Front Barbell Squat",
            "vi": "Front Barbell Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Front_Barbell_Squat"
        },
        {
            "id": "Front_Barbell_Squat_To_A_Bench",
            "name": "Front Barbell Squat To A Bench",
            "vi": "Front Barbell Squat To A Bench",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set a flat bench behind you and set the bar on a rack that be...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Front_Barbell_Squat_To_A_Bench"
        },
        {
            "id": "Front_Squat_Clean_Grip",
            "name": "Front Squat (Clean Grip)",
            "vi": "Front Squat (Clean Grip)",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "To begin, first set the bar in a rack slightly below shoulder level. Rest the bar on top of the deltoids, pushing into the clavicles, and lightly touc...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Front_Squat_Clean_Grip"
        },
        {
            "id": "Front_Squats_With_Two_Kettlebells",
            "name": "Front Squats With Two Kettlebells",
            "vi": "Front Squats With Two Kettlebells",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Clean two kettlebells to your shoulders. Clean the kettlebells to your shoulders by extending through the legs and hips as you pull the kettlebells to...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Front_Squats_With_Two_Kettlebells"
        },
        {
            "id": "Glute_Kickback",
            "name": "Glute Kickback",
            "vi": "Glute Kickback",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Kneel on the floor or an exercise mat and bend at the waist with your arms extended in front of you (perpendicular to the torso) in order to get into ...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Glute_Kickback"
        },
        {
            "id": "Goblet_Squat",
            "name": "Goblet Squat",
            "vi": "Goblet Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Dễ",
            "desc": "Stand holding a light kettlebell by the horns close to your chest. This will be your starting position. Squat down between your legs until your hamstr...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Goblet_Squat"
        },
        {
            "id": "Gorilla_Chin_Crunch",
            "name": "Gorilla Chin/Crunch",
            "vi": "Gorilla Chin/Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Hang from a chin-up bar using an underhand grip (palms facing you) that is slightly wider than shoulder width. Now bend your knees at a 90 degree angl...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Gorilla_Chin_Crunch"
        },
        {
            "id": "Hack_Squat",
            "name": "Hack Squat",
            "vi": "Hack Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Place the back of your torso against the back pad of the machine and hook your shoulders under the shoulder pads provided. Position your legs in the p...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Hack_Squat"
        },
        {
            "id": "Hanging_Leg_Raise",
            "name": "Hanging Leg Raise",
            "vi": "Hanging Leg Raise",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Khó",
            "desc": "Hang from a chin-up bar with both arms extended at arms length in top of you using either a wide grip or a medium grip. The legs should be straight do...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Hanging_Leg_Raise"
        },
        {
            "id": "Hanging_Pike",
            "name": "Hanging Pike",
            "vi": "Hanging Pike",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Khó",
            "desc": "Hang from a chin-up bar with your legs and feet together using an overhand grip (palms facing away from you) that is slightly wider than shoulder widt...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Hanging_Pike"
        },
        {
            "id": "Hip_Extension_with_Bands",
            "name": "Hip Extension with Bands",
            "vi": "Hip Extension with Bands",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "push",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Secure one end of the band to the lower portion of a post and attach the other to one ankle. Facing the attachment point of the band, hold on to the c...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Hip_Extension_with_Bands"
        },
        {
            "id": "Hip_Flexion_with_Band",
            "name": "Hip Flexion with Band",
            "vi": "Hip Flexion with Band",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "pull",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Secure one end of the band to the lower portion of a post and attach the other to one ankle. Face away from the attachment point of the band. Keeping ...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Hip_Flexion_with_Band"
        },
        {
            "id": "Jackknife_Sit-Up",
            "name": "Jackknife Sit-Up",
            "vi": "Jackknife Sit-Up",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie flat on the floor (or exercise mat) on your back with your arms extended straight back behind your head and your legs extended also. This will be ...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Jackknife_Sit-Up"
        },
        {
            "id": "Janda_Sit-Up",
            "name": "Janda Sit-Up",
            "vi": "Janda Sit-Up",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Position your body on the floor in the basic sit-up position; knees to a ninety degree angle with feet flat on the floor and arms either crossed over ...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Janda_Sit-Up"
        },
        {
            "id": "Jefferson_Squats",
            "name": "Jefferson Squats",
            "vi": "Jefferson Squats",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Place a barbell on the floor. Stand in the middle of the bar length wise. Bend down by bending at the knees and keeping your back straight and grasp t...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Jefferson_Squats"
        },
        {
            "id": "Kettlebell_Dead_Clean",
            "name": "Kettlebell Dead Clean",
            "vi": "Kettlebell Dead Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place kettlebell between your feet. To get in the starting position, push your butt back and look straight ahead. Clean the kettlebell to your shoulde...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Kettlebell_Dead_Clean"
        },
        {
            "id": "Kettlebell_Figure_8",
            "name": "Kettlebell Figure 8",
            "vi": "Kettlebell Figure 8",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place one kettlebell between your legs and take a wider than shoulder width stance. Bend over by pushing your butt out and keeping your back flat. Pic...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Kettlebell_Figure_8"
        },
        {
            "id": "Kettlebell_Hang_Clean",
            "name": "Kettlebell Hang Clean",
            "vi": "Kettlebell Hang Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place kettlebell between your feet. To get in the starting position, push your butt back and look straight ahead. Clean kettlebell to your shoulder. C...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Kettlebell_Hang_Clean"
        },
        {
            "id": "Kettlebell_One-Legged_Deadlift",
            "name": "Kettlebell One-Legged Deadlift",
            "vi": "Kettlebell One-Legged Deadlift",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Hold a kettlebell by the handle in one hand. Stand on one leg, on the same side that you hold the kettlebell. Keeping that knee slightly bent, perform...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Kettlebell_One-Legged_Deadlift"
        },
        {
            "id": "Kettlebell_Pass_Between_The_Legs",
            "name": "Kettlebell Pass Between The Legs",
            "vi": "Kettlebell Pass Between The Legs",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place one kettlebell between your legs and take a comfortable stance. Bend over by pushing your butt out and keeping your back flat. Pick up a kettleb...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Kettlebell_Pass_Between_The_Legs"
        },
        {
            "id": "Kettlebell_Pistol_Squat",
            "name": "Kettlebell Pistol Squat",
            "vi": "Kettlebell Pistol Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Khó",
            "desc": "Pick up a kettlebell with two hands and hold it by the horns. Hold one leg off of the floor and squat down on the other. Squat down by flexing the kne...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Kettlebell_Pistol_Squat"
        },
        {
            "id": "Kettlebell_Windmill",
            "name": "Kettlebell Windmill",
            "vi": "Kettlebell Windmill",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place a kettlebell in front of your lead foot and clean and press it overhead with your opposite arm. Clean the kettlebell to your shoulder by extendi...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Kettlebell_Windmill"
        },
        {
            "id": "Knee_Hip_Raise_On_Parallel_Bars",
            "name": "Knee/Hip Raise On Parallel Bars",
            "vi": "Knee/Hip Raise On Parallel Bars",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Position your body on the vertical leg raise bench so that your forearms are resting on the pads next to the torso and holding on to the handles. Your...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Knee_Hip_Raise_On_Parallel_Bars"
        },
        {
            "id": "Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists",
            "name": "Kneeling Cable Crunch With Alternating Oblique Twists",
            "vi": "Kneeling Cable Crunch With Alternating Oblique Twists",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect a rope attachment to a high pulley cable and position a mat on the floor in front of it. Grab the rope with both hands and kneel approximately...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists"
        },
        {
            "id": "Landmine_180s",
            "name": "Landmine 180's",
            "vi": "Landmine 180's",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to sh...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Landmine_180s"
        },
        {
            "id": "Leg_Extensions",
            "name": "Leg Extensions",
            "vi": "Leg Extensions",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "For this exercise you will need to use a leg extension machine. First choose your weight and sit on the machine with your legs under the pad (feet poi...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Leg_Extensions"
        },
        {
            "id": "Leg_Lift",
            "name": "Leg Lift",
            "vi": "Leg Lift",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "While standing up straight with both feet next to each other at around shoulder width, grab a sturdy surface such as the sides of a squat rack or the ...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Leg_Lift"
        },
        {
            "id": "Leg_Press",
            "name": "Leg Press",
            "vi": "Leg Press",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Using a leg press machine, sit down on the machine and place your legs on the platform directly in front of you at a medium (shoulder width) foot stan...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Leg_Press"
        },
        {
            "id": "Leg_Pull-In",
            "name": "Leg Pull-In",
            "vi": "Leg Pull-In",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie on an exercise mat with your legs extended and your hands either palms facing down next to you or under your glutes. Tip: My preference is with th...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Leg_Pull-In"
        },
        {
            "id": "Leverage_Deadlift",
            "name": "Leverage Deadlift",
            "vi": "Leverage Deadlift",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Load the pins to an appropriate weight. Position yourself directly between the handles. Grasp the bottom handles with a comfortable grip, and then low...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Leverage_Deadlift"
        },
        {
            "id": "Lunge_Pass_Through",
            "name": "Lunge Pass Through",
            "vi": "Lunge Pass Through",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Stand with your torso upright holding a kettlebell in your right hand. This will be your starting position. Step forward with your left foot and lower...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Lunge_Pass_Through"
        },
        {
            "id": "Lunge_Sprint",
            "name": "Lunge Sprint",
            "vi": "Lunge Sprint",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "Adjust a bar in a Smith machine to an appropriate height. Position yourself under the bar, racking it across the back of your shoulders. Unrack the ba...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Lunge_Sprint"
        },
        {
            "id": "Lying_Leg_Curls",
            "name": "Lying Leg Curls",
            "vi": "Lying Leg Curls",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Adjust the machine lever to fit your height and lie face down on the leg curl machine with the pad of the lever on the back of your legs (just a few i...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Lying_Leg_Curls"
        },
        {
            "id": "Lying_Machine_Squat",
            "name": "Lying Machine Squat",
            "vi": "Lying Machine Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "Adjust the leg machine to a height that will allow you to get inside it with your knees bent and the thighs slightly below parallel. Once you select t...",
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
            "anim": "pull",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "Place a band around both ankles and another around both knees. There should be enough tension that they are tight when your feet are shoulder width ap...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Monster_Walk"
        },
        {
            "id": "Narrow_Stance_Hack_Squats",
            "name": "Narrow Stance Hack Squats",
            "vi": "Narrow Stance Hack Squats",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "Place the back of your torso against the back pad of the machine and hook your shoulders under the shoulder pads provided. Position your legs in the p...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Narrow_Stance_Hack_Squats"
        },
        {
            "id": "Narrow_Stance_Leg_Press",
            "name": "Narrow Stance Leg Press",
            "vi": "Narrow Stance Leg Press",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "Using a leg press machine, sit down on the machine and place your legs on the platform directly in front of you at a less-than-shoulder-width narrow s...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Narrow_Stance_Leg_Press"
        },
        {
            "id": "Narrow_Stance_Squats",
            "name": "Narrow Stance Squats",
            "vi": "Narrow Stance Squats",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Narrow_Stance_Squats"
        },
        {
            "id": "Natural_Glute_Ham_Raise",
            "name": "Natural Glute Ham Raise",
            "vi": "Natural Glute Ham Raise",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Using the leg pad of a lat pulldown machine or a preacher bench, position yourself so that your ankles are under the pads, knees on the seat, and you ...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Natural_Glute_Ham_Raise"
        },
        {
            "id": "Oblique_Crunches",
            "name": "Oblique Crunches",
            "vi": "Oblique Crunches",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie flat on the floor with your lower back pressed to the ground. For this exercise, you will need to put one hand beside your head and the other to t...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Oblique_Crunches"
        },
        {
            "id": "Oblique_Crunches_-_On_The_Floor",
            "name": "Oblique Crunches - On The Floor",
            "vi": "Oblique Crunches - On The Floor",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Start out by lying on your right side with your legs lying on top of each other. Make sure your knees are bent a little bit. Place your left hand behi...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Oblique_Crunches_-_On_The_Floor"
        },
        {
            "id": "One-Arm_High-Pulley_Cable_Side_Bends",
            "name": "One-Arm High-Pulley Cable Side Bends",
            "vi": "One-Arm High-Pulley Cable Side Bends",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect a standard handle to a tower. Move cable to highest pulley position. Stand with side to cable. With one hand, reach up and grab handle with un...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "One-Arm_High-Pulley_Cable_Side_Bends"
        },
        {
            "id": "One-Arm_Kettlebell_Clean",
            "name": "One-Arm Kettlebell Clean",
            "vi": "One-Arm Kettlebell Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place a kettlebell between your feet. As you bend down to grab the kettlebell, push your butt back and keep your eyes looking forward. Clean the kettl...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "One-Arm_Kettlebell_Clean"
        },
        {
            "id": "One-Arm_Kettlebell_Swings",
            "name": "One-Arm Kettlebell Swings",
            "vi": "One-Arm Kettlebell Swings",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "One-Arm_Kettlebell_Swings"
        },
        {
            "id": "One-Arm_Medicine_Ball_Slam",
            "name": "One-Arm Medicine Ball Slam",
            "vi": "One-Arm Medicine Ball Slam",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "medicine ball",
            "diff": "Dễ",
            "desc": "Start in a standing position with a staggered, athletic stance. Hold a medicine ball in one hand, on the same side as your back leg. This will be your...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "One-Arm_Medicine_Ball_Slam"
        },
        {
            "id": "One-Arm_Open_Palm_Kettlebell_Clean",
            "name": "One-Arm Open Palm Kettlebell Clean",
            "vi": "One-Arm Open Palm Kettlebell Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Trung bình",
            "desc": "Place one kettlebell between your feet. Grab the handle with one hand and raise the kettlebell rapidly, let it flip so that the ball of the kettlebell...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "One-Arm_Open_Palm_Kettlebell_Clean"
        },
        {
            "id": "One-Arm_Overhead_Kettlebell_Squats",
            "name": "One-Arm Overhead Kettlebell Squats",
            "vi": "One-Arm Overhead Kettlebell Squats",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "kettlebells",
            "diff": "Khó",
            "desc": "Clean and press a kettlebell with one arm. Clean the kettlebell to your shoulder by extending through the legs and hips as you pull the kettlebell tow...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "One-Arm_Overhead_Kettlebell_Squats"
        },
        {
            "id": "One-Arm_Side_Deadlift",
            "name": "One-Arm Side Deadlift",
            "vi": "One-Arm Side Deadlift",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "Stand to the side of a barbell next to its center. Bend your knees and lower your body until you are able to reach the barbell. Grasp the bar as if yo...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "One-Arm_Side_Deadlift"
        },
        {
            "id": "One-Legged_Cable_Kickback",
            "name": "One-Legged Cable Kickback",
            "vi": "One-Legged Cable Kickback",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "push",
            "equip": "cable",
            "diff": "Trung bình",
            "desc": "Hook a leather ankle cuff to a low cable pulley and then attach the cuff to your ankle. Face the weight stack from a distance of about two feet, grasp...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "One-Legged_Cable_Kickback"
        },
        {
            "id": "One_Leg_Barbell_Squat",
            "name": "One Leg Barbell Squat",
            "vi": "One Leg Barbell Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "Start by standing about 2 to 3 feet in front of a flat bench with your back facing the bench. Have a barbell in front of you on the floor. Tip: Your f...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "One_Leg_Barbell_Squat"
        },
        {
            "id": "Open_Palm_Kettlebell_Clean",
            "name": "Open Palm Kettlebell Clean",
            "vi": "Open Palm Kettlebell Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "kettlebells",
            "diff": "Khó",
            "desc": "Place one kettlebell between your feet. Clean the kettlebell by extending through the legs and hips as you raise the kettlebell towards your shoulders...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Open_Palm_Kettlebell_Clean"
        },
        {
            "id": "Otis-Up",
            "name": "Otis-Up",
            "vi": "Otis-Up",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Secure your feet and lay back on the floor. Your knees should be bent. Hold a weight with both hands to your chest. This will be your starting positio...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Otis-Up"
        },
        {
            "id": "Pallof_Press",
            "name": "Pallof Press",
            "vi": "Pallof Press",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect a standard handle to a tower, and—if possible—position the cable to shoulder height. If not, a low pulley will suffice. With your side to the ...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Pallof_Press"
        },
        {
            "id": "Pallof_Press_With_Rotation",
            "name": "Pallof Press With Rotation",
            "vi": "Pallof Press With Rotation",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect a standard handle to a tower, and position the cable to shoulder height. With your side to the cable, grab the handle with one hand and step a...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Pallof_Press_With_Rotation"
        },
        {
            "id": "Physioball_Hip_Bridge",
            "name": "Physioball Hip Bridge",
            "vi": "Physioball Hip Bridge",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "push",
            "equip": "exercise ball",
            "diff": "Dễ",
            "desc": "Lay on a ball so that your upper back is on the ball with your hips unsupported. Both feet should be flat on the floor, hip width apart or wider. This...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Physioball_Hip_Bridge"
        },
        {
            "id": "Plank",
            "name": "Plank",
            "vi": "Plank",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "static",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Get into a prone position on the floor, supporting your weight on your toes and your forearms. Your arms are bent and directly below the shoulder. Kee...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Plank"
        },
        {
            "id": "Plate_Twist",
            "name": "Plate Twist",
            "vi": "Plate Twist",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Lie down on the floor or an exercise mat with your legs fully extended and your upper body upright. Grab the plate by its sides with both hands out in...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Plate_Twist"
        },
        {
            "id": "Platform_Hamstring_Slides",
            "name": "Platform Hamstring Slides",
            "vi": "Platform Hamstring Slides",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "For this movement a wooden floor or similar is needed. Lay on your back with your legs extended. Place a gym towel or a light weight underneath your h...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Platform_Hamstring_Slides"
        },
        {
            "id": "Plie_Dumbbell_Squat",
            "name": "Plie Dumbbell Squat",
            "vi": "Plie Dumbbell Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Hold a dumbbell at the base with both hands and stand straight up. Move your legs so that they are wider than shoulder width apart from each other wit...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Plie_Dumbbell_Squat"
        },
        {
            "id": "Power_Clean",
            "name": "Power Clean",
            "vi": "Power Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Stand with your feet slightly wider than shoulder width apart and toes pointing out slightly. Squat down and grasp bar with a closed, pronated grip. Y...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Power_Clean"
        },
        {
            "id": "Press_Sit-Up",
            "name": "Press Sit-Up",
            "vi": "Press Sit-Up",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "To begin, lie down on a bench with a barbell resting on your chest. Position your legs so they are secure on the extension of the abdominal bench. Thi...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Press_Sit-Up"
        },
        {
            "id": "Prone_Manual_Hamstring",
            "name": "Prone Manual Hamstring",
            "vi": "Prone Manual Hamstring",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "static",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "You will need a partner for this exercise. Lay face down with your legs straight. Your assistant will place their hand on your heel. To begin, flex th...",
            "gradient": "linear-gradient(135deg, #6C63FF 0%, #E040FB 100%)",
            "imgFolder": "Prone_Manual_Hamstring"
        },
        {
            "id": "Pull_Through",
            "name": "Pull Through",
            "vi": "Pull Through",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Begin standing a few feet in front of a low pulley with a rope or handle attached. Face away from the machine, straddling the cable, with your feet se...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Pull_Through"
        },
        {
            "id": "Reverse_Crunch",
            "name": "Reverse Crunch",
            "vi": "Reverse Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie down on the floor with your legs fully extended and arms to the side of your torso with the palms on the floor. Your arms should be stationary for...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Reverse_Crunch"
        },
        {
            "id": "Reverse_Hyperextension",
            "name": "Reverse Hyperextension",
            "vi": "Reverse Hyperextension",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "Place your feet between the pads after loading an appropriate weight. Lay on the top pad, allowing your hips to hang off the back, while grasping the ...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Reverse_Hyperextension"
        },
        {
            "id": "Rocking_Standing_Calf_Raise",
            "name": "Rocking Standing Calf Raise",
            "vi": "Rocking Standing Calf Raise",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Rocking_Standing_Calf_Raise"
        },
        {
            "id": "Romanian_Deadlift",
            "name": "Romanian Deadlift",
            "vi": "Romanian Deadlift",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Put a barbell in front of you on the ground and grab it using a pronated (palms facing down) grip that a little wider than shoulder width. Tip: Depend...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Romanian_Deadlift"
        },
        {
            "id": "Rope_Crunch",
            "name": "Rope Crunch",
            "vi": "Rope Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Kneel 1-2 feet in front of a cable system with a rope attached. After selecting an appropriate weight, grasp the rope with both hands reaching overhea...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Rope_Crunch"
        },
        {
            "id": "Russian_Twist",
            "name": "Russian Twist",
            "vi": "Russian Twist",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Trung bình",
            "desc": "Lie down on the floor placing your feet either under something that will not move or by having a partner hold them. Your legs should be bent at the kn...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Russian_Twist"
        },
        {
            "id": "Seated_Band_Hamstring_Curl",
            "name": "Seated Band Hamstring Curl",
            "vi": "Seated Band Hamstring Curl",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Secure a band close to the ground and place a bench a couple feet away from it. Seat yourself on the bench and secure the band behind your ankles, beg...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Seated_Band_Hamstring_Curl"
        },
        {
            "id": "Seated_Barbell_Twist",
            "name": "Seated Barbell Twist",
            "vi": "Seated Barbell Twist",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "Start out by sitting at the end of a flat bench with a barbell placed on top of your thighs. Your feet should be shoulder width apart from each other....",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Seated_Barbell_Twist"
        },
        {
            "id": "Seated_Calf_Raise",
            "name": "Seated Calf Raise",
            "vi": "Seated Calf Raise",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Sit on the machine and place your toes on the lower portion of the platform provided with the heels extending off. Choose the toe positioning of your ...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Seated_Calf_Raise"
        },
        {
            "id": "Seated_Flat_Bench_Leg_Pull-In",
            "name": "Seated Flat Bench Leg Pull-In",
            "vi": "Seated Flat Bench Leg Pull-In",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Sit on a bench with the legs stretched out in front of you slightly below parallel and your arms holding on to the sides of the bench. Your torso shou...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Seated_Flat_Bench_Leg_Pull-In"
        },
        {
            "id": "Seated_Leg_Curl",
            "name": "Seated Leg Curl",
            "vi": "Seated Leg Curl",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Adjust the machine lever to fit your height and sit on the machine with your back against the back support pad. Place the back of lower leg on top of ...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Seated_Leg_Curl"
        },
        {
            "id": "Seated_Leg_Tucks",
            "name": "Seated Leg Tucks",
            "vi": "Seated Leg Tucks",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Sit on a bench with the legs stretched out in front of you slightly below parallel and your arms holding on to the sides of the bench. Your torso shou...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Seated_Leg_Tucks"
        },
        {
            "id": "Side_Bridge",
            "name": "Side Bridge",
            "vi": "Side Bridge",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "static",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Side_Bridge"
        },
        {
            "id": "Side_Jackknife",
            "name": "Side Jackknife",
            "vi": "Side Jackknife",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Side_Jackknife"
        },
        {
            "id": "Single-Leg_High_Box_Squat",
            "name": "Single-Leg High Box Squat",
            "vi": "Single-Leg High Box Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Position a box in a rack. Secure a band or rope in place above the box. Standing in front of it, step onto the box to a full standing position, lettin...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Single-Leg_High_Box_Squat"
        },
        {
            "id": "Single-Leg_Leg_Extension",
            "name": "Single-Leg Leg Extension",
            "vi": "Single-Leg Leg Extension",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Seat yourself in the machine and adjust it so that you are positioned properly. The pad should be against the lower part of the shin but not in contac...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Single-Leg_Leg_Extension"
        },
        {
            "id": "Single_Leg_Glute_Bridge",
            "name": "Single Leg Glute Bridge",
            "vi": "Single Leg Glute Bridge",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lay on the floor with your feet flat and knees bent. Raise one leg off of the ground, pulling the knee to your chest. This will be your starting posit...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Single_Leg_Glute_Bridge"
        },
        {
            "id": "Sit-Up",
            "name": "Sit-Up",
            "vi": "Sit-Up",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Lie down on the floor placing your feet either under something that will not move or by having a partner hold them. Your legs should be bent at the kn...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Sit-Up"
        },
        {
            "id": "Smith_Machine_Calf_Raise",
            "name": "Smith Machine Calf Raise",
            "vi": "Smith Machine Calf Raise",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Place a block or weight plate below the bar on the Smith machine. Set the bar to a position that best matches your height. Once the correct height is ...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Smith_Machine_Calf_Raise"
        },
        {
            "id": "Smith_Machine_Hang_Power_Clean",
            "name": "Smith Machine Hang Power Clean",
            "vi": "Smith Machine Hang Power Clean",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "Position the bar at knee height and load it to an appropriate weight. Take a pronated grip on the bar outside of shoulder width and unhook the bar fro...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Smith_Machine_Hang_Power_Clean"
        },
        {
            "id": "Smith_Machine_Hip_Raise",
            "name": "Smith Machine Hip Raise",
            "vi": "Smith Machine Hip Raise",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Position a bench in the rack and load the bar to an appropriate weight. Lie down on the bench, placing the bottom of your feet against the bar. Unlock...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Smith_Machine_Hip_Raise"
        },
        {
            "id": "Smith_Machine_Leg_Press",
            "name": "Smith Machine Leg Press",
            "vi": "Smith Machine Leg Press",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "Position a Smith machine bar a couple feet off of the ground. Ensure that it is resting on the safeties. After loading the bar to an appropriate weigh...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Smith_Machine_Leg_Press"
        },
        {
            "id": "Smith_Machine_Pistol_Squat",
            "name": "Smith Machine Pistol Squat",
            "vi": "Smith Machine Pistol Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Trung bình",
            "desc": "To begin, first set the bar to a position that best matches your height. Step under it and position the bar across the back of your shoulders. Take th...",
            "gradient": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            "imgFolder": "Smith_Machine_Pistol_Squat"
        },
        {
            "id": "Smith_Machine_Reverse_Calf_Raises",
            "name": "Smith Machine Reverse Calf Raises",
            "vi": "Smith Machine Reverse Calf Raises",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Adjust the barbell on the smith machine to fit your height and align a raised platform right under the bar. Stand on the platform with the heels of yo...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Smith_Machine_Reverse_Calf_Raises"
        },
        {
            "id": "Smith_Machine_Squat",
            "name": "Smith Machine Squat",
            "vi": "Smith Machine Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "To begin, first set the bar on the height that best matches your height. Once the correct height is chosen and the bar is loaded, step under the bar a...",
            "gradient": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
            "imgFolder": "Smith_Machine_Squat"
        },
        {
            "id": "Smith_Machine_Stiff-Legged_Deadlift",
            "name": "Smith Machine Stiff-Legged Deadlift",
            "vi": "Smith Machine Stiff-Legged Deadlift",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "To begin, set the bar on the smith machine to a height that is around the middle of your thighs. Once the correct height is chosen and the bar is load...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Smith_Machine_Stiff-Legged_Deadlift"
        },
        {
            "id": "Smith_Single-Leg_Split_Squat",
            "name": "Smith Single-Leg Split Squat",
            "vi": "Smith Single-Leg Split Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "To begin, place a flat bench 2-3 feet behind the smith machine. Then, set the bar on the height that best matches your height. Once the correct height...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Smith_Single-Leg_Split_Squat"
        },
        {
            "id": "Snatch_Pull",
            "name": "Snatch Pull",
            "vi": "Snatch Pull",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "With a barbell on the floor close to the shins, take a wide snatch grip. Lower your hips with the weight focused on the heels, back straight, head fac...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Snatch_Pull"
        },
        {
            "id": "Speed_Squats",
            "name": "Speed Squats",
            "vi": "Speed Squats",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Speed_Squats"
        },
        {
            "id": "Spell_Caster",
            "name": "Spell Caster",
            "vi": "Spell Caster",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Hold a dumbbell in each hand with a pronated grip. Your feet should be wide with your hips and knees extended. This will be your starting position. Be...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Spell_Caster"
        },
        {
            "id": "Spider_Crawl",
            "name": "Spider Crawl",
            "vi": "Spider Crawl",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Begin in a prone position on the floor. Support your weight on your hands and toes, with your feet together and your body straight. Your arms should b...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Spider_Crawl"
        },
        {
            "id": "Split_Squat_with_Dumbbells",
            "name": "Split Squat with Dumbbells",
            "vi": "Split Squat with Dumbbells",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Position yourself into a staggered stance with the rear foot elevated and front foot forward. Hold a dumbbell in each hand, letting them hang at the s...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Split_Squat_with_Dumbbells"
        },
        {
            "id": "Squat_Jerk",
            "name": "Squat Jerk",
            "vi": "Squat Jerk",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "Standing with the weight racked on the front of the shoulders, begin with the dip. With your feet directly under your hips, flex the knees without mov...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Squat_Jerk"
        },
        {
            "id": "Squat_with_Plate_Movers",
            "name": "Squat with Plate Movers",
            "vi": "Squat with Plate Movers",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "To begin, first set the bar on a rack to just below shoulder level. Position a weight plate on the ground a couple feet back from the rack. Once the b...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Squat_with_Plate_Movers"
        },
        {
            "id": "Squats_-_With_Bands",
            "name": "Squats - With Bands",
            "vi": "Squats - With Bands",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "bands",
            "diff": "Dễ",
            "desc": "To start out, make sure that the exercise band is at an even split between both the left and right side of the body. To do this, use your hands to gra...",
            "gradient": "linear-gradient(135deg, #e8d5b7 0%, #f5a623 100%)",
            "imgFolder": "Squats_-_With_Bands"
        },
        {
            "id": "Standing_Barbell_Calf_Raise",
            "name": "Standing Barbell Calf Raise",
            "vi": "Standing Barbell Calf Raise",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Dễ",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Standing_Barbell_Calf_Raise"
        },
        {
            "id": "Standing_Cable_Lift",
            "name": "Standing Cable Lift",
            "vi": "Standing Cable Lift",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect a standard handle on a tower, and move the cable to the lowest pulley position. With your side to the cable, grab the handle with one hand and...",
            "gradient": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
            "imgFolder": "Standing_Cable_Lift"
        },
        {
            "id": "Standing_Cable_Wood_Chop",
            "name": "Standing Cable Wood Chop",
            "vi": "Standing Cable Wood Chop",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Connect a standard handle to a tower, and move the cable to the highest pulley position. With your side to the cable, grab the handle with one hand an...",
            "gradient": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
            "imgFolder": "Standing_Cable_Wood_Chop"
        },
        {
            "id": "Standing_Calf_Raises",
            "name": "Standing Calf Raises",
            "vi": "Standing Calf Raises",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Adjust the padded lever of the calf raise machine to fit your height. Place your shoulders under the pads provided and position your toes facing forwa...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Standing_Calf_Raises"
        },
        {
            "id": "Standing_Dumbbell_Calf_Raise",
            "name": "Standing Dumbbell Calf Raise",
            "vi": "Standing Dumbbell Calf Raise",
            "icon": "🏋️",
            "muscles": [
                "Calves"
            ],
            "anim": "push",
            "equip": "dumbbell",
            "diff": "Trung bình",
            "desc": "Stand with your torso upright holding two dumbbells in your hands by your sides. Place the ball of the foot on a sturdy and stable wooden board (that ...",
            "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "imgFolder": "Standing_Dumbbell_Calf_Raise"
        },
        {
            "id": "Standing_Leg_Curl",
            "name": "Standing Leg Curl",
            "vi": "Standing Leg Curl",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "Adjust the machine lever to fit your height and lie with your torso bent at the waist facing forward around 30-45 degrees (since an angled position is...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Standing_Leg_Curl"
        },
        {
            "id": "Standing_Rope_Crunch",
            "name": "Standing Rope Crunch",
            "vi": "Standing Rope Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "cable",
            "diff": "Dễ",
            "desc": "Attach a rope to a high pulley and select an appropriate weight. Stand with your back to the cable tower. Take the rope with both hands over your shou...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Standing_Rope_Crunch"
        },
        {
            "id": "Step-up_with_Knee_Raise",
            "name": "Step-up with Knee Raise",
            "vi": "Step-up with Knee Raise",
            "icon": "🏋️",
            "muscles": [
                "Glutes"
            ],
            "anim": "push",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Stand facing a box or bench of an appropriate height with your feet together. This will be your starting position. Begin the movement by stepping up, ...",
            "gradient": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            "imgFolder": "Step-up_with_Knee_Raise"
        },
        {
            "id": "Stiff-Legged_Barbell_Deadlift",
            "name": "Stiff-Legged Barbell Deadlift",
            "vi": "Stiff-Legged Barbell Deadlift",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Grasp a bar using an overhand grip (palms facing down). You may need some wrist wraps if using a significant amount of weight. Stand with your torso s...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Stiff-Legged_Barbell_Deadlift"
        },
        {
            "id": "Stiff-Legged_Dumbbell_Deadlift",
            "name": "Stiff-Legged Dumbbell Deadlift",
            "vi": "Stiff-Legged Dumbbell Deadlift",
            "icon": "🏋️",
            "muscles": [
                "Hamstrings"
            ],
            "anim": "pull",
            "equip": "dumbbell",
            "diff": "Dễ",
            "desc": "Grasp a couple of dumbbells holding them by your side at arm's length. Stand with your torso straight and your legs spaced using a shoulder width or n...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Stiff-Legged_Dumbbell_Deadlift"
        },
        {
            "id": "Suspended_Fallout",
            "name": "Suspended Fallout",
            "vi": "Suspended Fallout",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Adjust the straps so the handles are at an appropriate height, below waist level. Begin standing and grasping the handles. Lean into the straps, movin...",
            "gradient": "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
            "imgFolder": "Suspended_Fallout"
        },
        {
            "id": "Suspended_Reverse_Crunch",
            "name": "Suspended Reverse Crunch",
            "vi": "Suspended Reverse Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "Secure a set of suspension straps with the handles hanging about a foot off of the ground. Move yourself into a pushup plank position facing away from...",
            "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "imgFolder": "Suspended_Reverse_Crunch"
        },
        {
            "id": "Suspended_Split_Squat",
            "name": "Suspended Split Squat",
            "vi": "Suspended Split Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Suspend your straps so the handles are 18-30 inches from the floor. Facing away from the setup, place your rear foot into the handle behind you. Keep ...",
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
            "anim": "push",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "To begin, sit down on the abductor machine and select a weight you are comfortable with. When your legs are positioned properly, grip the handles on e...",
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
            "anim": "pull",
            "equip": "machine",
            "diff": "Dễ",
            "desc": "To begin, sit down on the adductor machine and select a weight you are comfortable with. When your legs are positioned properly on the leg pads of the...",
            "gradient": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            "imgFolder": "Thigh_Adductor"
        },
        {
            "id": "Trap_Bar_Deadlift",
            "name": "Trap Bar Deadlift",
            "vi": "Trap Bar Deadlift",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Dễ",
            "desc": "For this exercise load a trap bar, also known as a hex bar, to an appropriate weight resting on the ground. Stand in the center of the apparatus and g...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Trap_Bar_Deadlift"
        },
        {
            "id": "Tuck_Crunch",
            "name": "Tuck Crunch",
            "vi": "Tuck Crunch",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "To begin, lie down on the floor or an exercise mat with your back pressed against the floor. Your arms should be lying across your sides with the palm...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Tuck_Crunch"
        },
        {
            "id": "Weighted_Ball_Side_Bend",
            "name": "Weighted Ball Side Bend",
            "vi": "Weighted Ball Side Bend",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "exercise ball",
            "diff": "Trung bình",
            "desc": "To begin, lie down on an exercise ball with your left side of the torso (waist, hips and shoulder) pressed against the ball. Your feet should be on th...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Weighted_Ball_Side_Bend"
        },
        {
            "id": "Weighted_Crunches",
            "name": "Weighted Crunches",
            "vi": "Weighted Crunches",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "medicine ball",
            "diff": "Dễ",
            "desc": "Lie flat on your back with your feet flat on the ground or resting on a bench with your knees bent at a 90 degree angle. Hold a weight to your chest, ...",
            "gradient": "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            "imgFolder": "Weighted_Crunches"
        },
        {
            "id": "Weighted_Jump_Squat",
            "name": "Weighted Jump Squat",
            "vi": "Weighted Jump Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "Position a lightly loaded barbell across the back of your shoulders. You could also use a weighted vest, sandbag, or other type of resistance for this...",
            "gradient": "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
            "imgFolder": "Weighted_Jump_Squat"
        },
        {
            "id": "Weighted_Sissy_Squat",
            "name": "Weighted Sissy Squat",
            "vi": "Weighted Sissy Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "Standing upright, with feet at shoulder width and toes raised, use one hand to hold onto the beams of a squat rack and the opposite arm to hold a plat...",
            "gradient": "linear-gradient(135deg, #f78ca0 0%, #fe9a8b 60%, #f6d365 100%)",
            "imgFolder": "Weighted_Sissy_Squat"
        },
        {
            "id": "Weighted_Sit-Ups_-_With_Bands",
            "name": "Weighted Sit-Ups - With Bands",
            "vi": "Weighted Sit-Ups - With Bands",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Start out by strapping the bands around the base of the decline bench. Place the handles towards the inside of the decline bench so that when lying do...",
            "gradient": "linear-gradient(135deg, #0acffe 0%, #495aff 100%)",
            "imgFolder": "Weighted_Sit-Ups_-_With_Bands"
        },
        {
            "id": "Weighted_Squat",
            "name": "Weighted Squat",
            "vi": "Weighted Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "other",
            "diff": "Trung bình",
            "desc": "Start by positioning two flat benches shoulder width apart from each other. Stand on top of them and wrap the weighted belt around your waist with the...",
            "gradient": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "imgFolder": "Weighted_Squat"
        },
        {
            "id": "Wide_Stance_Barbell_Squat",
            "name": "Wide Stance Barbell Squat",
            "vi": "Wide Stance Barbell Squat",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Trung bình",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. Once the...",
            "gradient": "linear-gradient(135deg, #2af598 0%, #009efd 100%)",
            "imgFolder": "Wide_Stance_Barbell_Squat"
        },
        {
            "id": "Wind_Sprints",
            "name": "Wind Sprints",
            "vi": "Wind Sprints",
            "icon": "🏋️",
            "muscles": [
                "Abdominals"
            ],
            "anim": "pull",
            "equip": "body only",
            "diff": "Dễ",
            "desc": "Hang from a pull-up bar using a pronated grip. Your arms and legs should be extended. This will be your starting position. Begin by quickly raising on...",
            "gradient": "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
            "imgFolder": "Wind_Sprints"
        },
        {
            "id": "Zercher_Squats",
            "name": "Zercher Squats",
            "vi": "Zercher Squats",
            "icon": "🏋️",
            "muscles": [
                "Quadriceps"
            ],
            "anim": "push",
            "equip": "barbell",
            "diff": "Khó",
            "desc": "This exercise is best performed inside a squat rack for safety purposes. To begin, first set the bar on a rack that best matches your height. The corr...",
            "gradient": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
            "imgFolder": "Zercher_Squats"
        }
    ]
};

const WORKOUT_TYPES = {
    1: { name:'Ngực - Vai - Tay sau', short:'Bài 1' },
    2: { name:'Lưng - Tay trước - Cẳng', short:'Bài 2' },
    3: { name:'Chân - Bụng', short:'Bài 3' }
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
    document.getElementById('volume-today-total').textContent = fmtNum(Math.round(todayEntries.reduce((sum,e)=>sum+calcVol(e),0)));
    const muscleVol={};
    todayEntries.forEach(entry => {
        const exInfo=findExerciseByName(entry.exercise), grp=exInfo?getPrimaryMuscleGroup(exInfo):'chest', f=MUSCLE_FILTERS[grp];
        if(!muscleVol[grp]) muscleVol[grp]={label:f.label,color:f.color,vol:0};
        muscleVol[grp].vol += calcVol(entry);
    });
    const musclesDiv = document.getElementById('volume-muscles');
    const chips = Object.values(muscleVol).map(m => `<span class="volume-muscle-chip" style="background:${m.color}22;color:${m.color}">${m.label}: ${fmtNum(Math.round(m.vol))} kg</span>`);
    musclesDiv.innerHTML = chips.length ? chips.join('') : '<span style="color:var(--text-3);font-size:.78rem">Chưa có dữ liệu hôm nay</span>';
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
        date: todayStr(),
        workoutType: exInfo ? exInfo.workoutType : 1,
        exercise: exName,
        targetSets, targetReps, setsData, notes: ''
    };
    
    btn.disabled = true;
    btn.innerHTML = '✅ Đã lưu!';
    
    await addEntry(state.currentMember, entry);
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

document.addEventListener('DOMContentLoaded', init);
