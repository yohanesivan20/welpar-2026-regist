// Google Apps Script untuk menghitung registered users dari spreadsheet
// Simpan script ini di Google Apps Script yang connect ke spreadsheet kamu

function doGet(e) {
  try {
    // Ganti 'Sheet1' dengan nama sheet kamu
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Hitung jumlah row (exclude header)
    // Sesuaikan index dengan row pertama data yang ada (biasanya baris 2)
    const registered = Math.max(0, data.length - 1);
    
    return ContentService.createTextOutput(
      JSON.stringify({ 
        registered: registered,
        timestamp: new Date().toISOString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ 
        error: error.toString(),
        registered: 0
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Deploy sebagai: New deployment -> Web app -> Execute as: Me, Who has access: Anyone
// Salin URL hasil deployment ke NEXT_PUBLIC_GOOGLE_SCRIPT_URL di .env.local
