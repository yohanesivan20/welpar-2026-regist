# Setup Google Sheets Integration

## Langkah-Langkah:

### 1. Setup Google Apps Script
- Buka [Google Apps Script](https://script.google.com)
- Buat project baru
- Hubungkan dengan spreadsheet kamu (Tools → Script Properties → Project Settings)
- Copy kode dari file `GOOGLE_APPS_SCRIPT_EXAMPLE.js` ke dalam Apps Script editor
- Sesuaikan nama sheet jika tidak menggunakan "Sheet1"

### 2. Deploy sebagai Web App
- Klik tombol "Deploy" di pojok kanan atas
- Pilih "New deployment" (atau yang mirip)
- Tipe: "Web app"
- Execute as: Pilih akun Google kamu
- Who has access: "Anyone"
- Deploy dan copy URL yang dihasilkan

### 3. Setup Environment Variable
- Buat file `.env.local` di root project (atau update jika sudah ada)
- Paste URL dari step 2:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/{SCRIPT_ID}/usercontent/exec
```

### 4. Selesai!
- Sekarang aplikasi akan otomatis fetch jumlah registered users dari spreadsheet kamu
- Nilai akan di-update secara real-time

## Troubleshooting:
- Jika muncul CORS error, pastikan akses Apps Script sudah "Anyone"
- Jika tidak muncul data, cek console browser untuk error message
- Pastikan spreadsheet memiliki data (minimal 1 row selain header)

## Catatan:
- Kapasitas (NEXT_PUBLIC_MAX_SLOTS) masih bisa di-set di .env.local
- Default: 456 slots
- Sesuaikan dengan kapasitas event kamu
