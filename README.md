# Tokomas Berkah — Prototipe Website

Prototipe front-end company profile dan direktori jaringan toko emas, berdasarkan daftar cabang yang diperbarui pengguna dalam DOCX daftar cabang terbaru yang diberikan pengguna, dengan entri lama tetap dipertahankan untuk cabang yang tidak muncul pada revisi terbaru.

## Fitur saat ini
- Desain responsif untuk desktop dan ponsel, dengan identitas warna merah, hitam, putih, dan aksen emas yang mengikuti logo resmi.
- Logo resmi dari pengguna ditampilkan pada header, hero landing page dalam kartu identitas besar, bagian company profile, footer, dan favicon.
- Landing page berfokus pada identitas merek, logo besar, dan pengenalan Toko Mas Berkah sebelum pengunjung menuju direktori cabang.
- Animasi reveal saat elemen memasuki viewport, hover states pada kartu, dan micro-interactions; animasi dikurangi saat preferensi perangkat meminta reduced motion.
- Peta interaktif MapLibre GL JS dengan gaya peta dari OpenFreeMap dan penanda jumlah entri toko per area (menghindari server tile standar OSM yang sempat memblokir permintaan).
- Pencarian berdasarkan nama toko, area, alamat, dan nomor telepon.
- Filter wilayah custom dengan pencarian, jumlah toko per area, status wilayah aktif, dan panel dropdown bermerek merah-krem (bukan dropdown native standar).
- Tautan Google Maps langsung untuk cabang yang memiliki tautan titik lokasi dari daftar terbaru; cabang tanpa tautan menggunakan pencarian alamat Google Maps sebagai fallback.
- Tombol Google Maps ditampilkan langsung pada kartu cabang dan juga pada dialog detail.
- Detail cabang, tautan WhatsApp/telepon, dan pencarian alamat melalui Google Maps.
- Bagian Produk & Layanan berbasis galeri foto ilustrasi: Cincin, Gelang, Kalung, Liontin, Anting, Giwang, Logam Mulia, Jual Beli Emas, dan Konsultasi. Kartu gambar interaktif mengarahkan pengunjung ke direktori cabang.
- Foto kategori disimpan secara lokal di `assets/products/` agar tidak bergantung pada layanan gambar eksternal; foto bersifat ilustrasi dan bukan jaminan stok/kemasan aktual.
- Kategori perhiasan: Cincin, Gelang, Kalung, Liontin, Anting, Giwang.
- Kategori logam mulia: Antam, MiniGold, dan lainnya.
- Company profile awal menggunakan narasi netral yang tidak mengklaim sejarah atau pencapaian yang belum dikonfirmasi owner; isi dapat diperdalam setelah wawancara pemilik.
- Jam buka sementara diatur 07.00–17.00.

## Cara menjalankan
1. Ekstrak berkas ZIP.
2. Buka terminal/Command Prompt di folder `tokomas-berkah-web`.
3. Jalankan server lokal:

   ```bash
   python -m http.server 8000
   ```

4. Buka `http://localhost:8000` di browser.
5. Pastikan internet aktif agar MapLibre GL JS dan peta OpenFreeMap dimuat.

## Penyedia peta dan atribusi
- Basemap memakai OpenFreeMap, dengan data peta dari OpenStreetMap. Atribusi OpenFreeMap/OpenMapTiles/OpenStreetMap ditampilkan pada area peta.
- Kebijakan OpenStreetMap menjelaskan bahwa server tile standar dapat memblokir aplikasi yang tidak memenuhi kebijakan penggunaan; karena itu prototipe ini menggunakan penyedia alternatif.

## Sumber dan catatan data
- Daftar toko, alamat, tautan Google Maps, dan informasi hari libur mengikuti DOCX terbaru pengguna jika tersedia; cabang lama yang tidak tercantum dalam DOCX terbaru tetap dipertahankan dari daftar sebelumnya.
- Jam operasional 07.00–17.00 mengikuti instruksi pengguna dan bersifat sementara.
- Area/pasar yang ada di PDF belum disertai koordinat GPS setiap toko. Oleh karena itu, marker saat ini adalah **perkiraan titik area/pasar**, bukan posisi toko yang telah diverifikasi. Alamat yang sama pada beberapa entri dipertahankan mengikuti data sumber.
- Kontak Berkah Muda 2 (Banjaran) diperbarui menjadi 081395655596 sesuai DOCX terbaru; Cahaya Jatigede masih tidak memiliki nomor kontak. Data hari libur yang kosong ditandai `Belum tercantum`.
- Nama domain `tokomasberkah.com` belum didaftarkan atau dihubungkan ke hosting oleh proyek ini.

## Aset visual
- `assets/products/` — gambar ilustrasi kategori perhiasan, logam mulia, dan layanan.
- `assets/logo-toko-mas-berkah.png` — logo transparan yang dikirim pengguna, dipotong hanya pada area transparan di sekelilingnya untuk penggunaan web.

## Struktur
- `index.html` — struktur website
- `styles.css` — desain dan tata letak responsif
- `app.js` — pencarian, filter, kartu cabang, dialog detail, dan peta
- `data.js` — data area dan 31 entri toko
- `cabang.csv` — salinan tabel cabang yang mudah diedit

## Sebelum website dipublikasikan
1. Verifikasi jumlah cabang, nama publik, setiap nomor telepon/WhatsApp, alamat dan koordinat GPS.
2. Konfirmasi jam buka dan hari libur setiap cabang.
3. Minta owner menyetujui company profile, visi-misi, sejarah, dan narasi resmi.
4. Konfirmasi produk dan layanan apa yang benar-benar tersedia pada tiap cabang.
5. Daftarkan domain dan pilih hosting; tambahkan dashboard admin/backend jika pembaruan cabang ingin dilakukan tanpa mengedit berkas.

### Tautan peta
- Sebanyak 27 tautan Google Maps langsung diambil dari hyperlink tertanam pada DOCX terbaru dan dipakai apa adanya agar membuka titik lokasi yang dipilih pengguna.
- Untuk empat entri tanpa tautan langsung pada dokumen terbaru—Berkah Baru 3 dan 4 di Lembang, Berkah Umat 2 di Soreang, dan Berkah Umat 1 di Pangalengan—website otomatis membuka pencarian Google Maps berdasarkan nama toko dan alamat.
- Tautan langsung untuk Berkah Baru di Padalarang, Ciparay, dan Ciwidey sudah ditambahkan dari dokumen terbaru.
- Data hari libur Duta 2 Sumedang dan Cahaya Jatigede diperbarui menjadi Minggu mengikuti dokumen terbaru.
