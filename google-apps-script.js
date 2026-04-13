/**
 * =============================================
 *  Google Apps Script — Fitness Tracker Backend
 *  Dán code này vào Google Apps Script Editor
 *  
 *  HƯỚNG DẪN:
 *  1. Tạo Google Sheet mới tại sheets.google.com
 *  2. Đặt tên Sheet đầu tiên: "Data"
 *  3. Thêm headers ở hàng 1: Member | Date | WorkoutType | Exercise | Sets | Reps | Weight | Notes | ID | Timestamp
 *  4. Vào Extensions > Apps Script
 *  5. Xóa code mặc định, dán toàn bộ code này vào
 *  6. Deploy > New deployment > Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  7. Copy URL của Web App và dán vào file script.js (biến GOOGLE_SCRIPT_URL)
 * =============================================
 */

const SHEET_NAME = 'Data';
const LOG_SHEET_NAME = 'Logs';

function appendLog(member, action, details) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LOG_SHEET_NAME);
    if (!sheet) return;
    const timestamp = new Date().toISOString();
    sheet.appendRow([timestamp, member, action, details]);
  } catch(e) {}
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'read') {
      return readAllData();
    }
    
    return jsonResponse({ error: 'Unknown action' }, 400);
  } catch (err) {
    return jsonResponse({ error: err.toString() }, 500);
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    
    if (action === 'add') {
      return addEntry(body.member, body.entry);
    }
    
    if (action === 'delete') {
      return deleteEntry(body.member, body.id);
    }
    
    return jsonResponse({ error: 'Unknown action' }, 400);
  } catch (err) {
    return jsonResponse({ error: err.toString() }, 500);
  }
}

function readAllData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  
  if (rows.length <= 1) {
    // Only headers, return empty data
    return jsonResponse({ data: {} });
  }
  
  const headers = rows[0];
  const data = {};
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const member = row[0];
    if (!member) continue;
    
    if (!data[member]) data[member] = [];
    
    data[member].push({
      date: row[1],
      workoutType: parseInt(row[2]) || 1,
      exercise: row[3],
      sets: parseInt(row[4]) || 0,
      reps: parseInt(row[5]) || 0,
      weight: parseFloat(row[6]) || 0,
      notes: row[7] || '',
      id: row[8],
      timestamp: row[9]
    });
  }
  
  // Sort each member's entries by date descending
  for (const member in data) {
    data[member].sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  let logs = [];
  try {
    const logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LOG_SHEET_NAME);
    if (logSheet) {
      const logRows = logSheet.getDataRange().getValues();
      if (logRows.length > 1) {
        // Read the last 50 edits
        const maxLogs = 50;
        const start = Math.max(1, logRows.length - maxLogs);
        for (let i = logRows.length - 1; i >= start; i--) {
          logs.push({
            timestamp: logRows[i][0],
            member: logRows[i][1],
            action: logRows[i][2],
            details: logRows[i][3]
          });
        }
      }
    }
  } catch(e) {}
  
  return jsonResponse({ data, logs });
}

function addEntry(member, entry) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  
  const id = Utilities.getUuid().substring(0, 12);
  const timestamp = new Date().toISOString();
  
  sheet.appendRow([
    member,
    entry.date,
    entry.workoutType,
    entry.exercise,
    entry.sets,
    entry.reps,
    entry.weight,
    entry.notes || '',
    id,
    timestamp
  ]);
  
  appendLog(member, 'Thêm mới', `Thêm bài ${entry.exercise} (${entry.sets}x${entry.reps}x${entry.weight}kg)`);
  
  return jsonResponse({ success: true, id: id });
}

function deleteEntry(member, id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  
  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][8] === id && rows[i][0] === member) {
      const exName = rows[i][3];
      sheet.deleteRow(i + 1); // +1 because sheets are 1-indexed
      appendLog(member, 'Xóa', `Xóa bài ${exName}`);
      return jsonResponse({ success: true });
    }
  }
  
  return jsonResponse({ error: 'Entry not found' }, 404);
}

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Chạy hàm này 1 lần để tạo headers tự động
 * Vào Run > setupSheet
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Set headers
  const headers = ['Member', 'Date', 'WorkoutType', 'Exercise', 'Sets', 'Reps', 'Weight', 'Notes', 'ID', 'Timestamp'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#6C63FF')
    .setFontColor('#FFFFFF');
  
  // Auto-resize columns
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Setup Logs Sheet
  let logSheet = ss.getSheetByName(LOG_SHEET_NAME);
  if (!logSheet) {
    logSheet = ss.insertSheet(LOG_SHEET_NAME);
    const logHeaders = ['Timestamp', 'Member', 'Action', 'Details'];
    logSheet.getRange(1, 1, 1, logHeaders.length).setValues([logHeaders])
      .setFontWeight('bold').setBackground('#FF9800').setFontColor('#FFFFFF');
    logSheet.setFrozenRows(1);
    for (let i = 1; i <= logHeaders.length; i++) logSheet.autoResizeColumn(i);
  }
  
  Logger.log('Sheet setup complete!');
}
