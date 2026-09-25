function doPost(e) {
  var body = {};
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput("bad");
  }
  if (body.token !== "3180-casas") {
    return ContentService.createTextOutput("no");
  }
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["時間", "姓名", "編號", "程度", "答對", "題數", "百分比", "模式"]);
  }
  sheet.appendRow([
    new Date(),
    body.name || "",
    body.sid || "",
    body.level || "",
    Number(body.correct) || 0,
    Number(body.total) || 0,
    (Number(body.percent) || 0) + "%",
    body.mode || "",
  ]);
  return ContentService.createTextOutput("ok");
}
