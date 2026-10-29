/*
  Data awal cabang Tokomas Berkah. Sumber: DOCX daftar cabang terbaru yang diberikan pengguna.
  Koordinat adalah titik perkiraan area/pasar untuk prototipe, BUKAN koordinat GPS toko yang terverifikasi.
*/
window.STORE_AREAS = [
  { id: 'ujungberung', name: 'Ujungberung', lat: -6.9147, lng: 107.7048 },
  { id: 'lembang', name: 'Lembang', lat: -6.8114, lng: 107.6175 },
  { id: 'soreang', name: 'Soreang', lat: -7.0236, lng: 107.5184 },
  { id: 'banjaran', name: 'Banjaran', lat: -7.0450, lng: 107.5874 },
  { id: 'sumedang', name: 'Sumedang', lat: -6.8585, lng: 107.9238 },
  { id: 'jatigede', name: 'Jatigede', lat: -6.9185, lng: 108.0460 },
  { id: 'pangalengan', name: 'Pangalengan', lat: -7.1850, lng: 107.5670 },
  { id: 'tasikmalaya', name: 'Tasikmalaya', lat: -7.3150, lng: 108.2035 },
  { id: 'purwadadi', name: 'Purwadadi', lat: -6.4505, lng: 107.7315 },
  { id: 'buahbatu', name: 'Buah Batu', lat: -6.9490, lng: 107.6488 },
  { id: 'padalarang', name: 'Padalarang', lat: -6.8375, lng: 107.4725 },
  { id: 'ciparay', name: 'Ciparay', lat: -7.0455, lng: 107.7095 },
  { id: 'ciwidey', name: 'Ciwidey', lat: -7.0990, lng: 107.4325 }
];

window.STORE_BRANCHES = [
  { id:'ujung-a', name:'Berkah A', area:'Ujungberung', address:'Pasar Ujungberung, Jl. A.H. Nasution, Ujungberung', phones:['082122619053'], mapsUrl:'https://maps.app.goo.gl/DcZtq9a51kpouBAr6', dayOff:'Buka setiap hari' },
  { id:'ujung-c', name:'Berkah C', area:'Ujungberung', address:'Pasar Ujungberung, Jl. A.H. Nasution, Ujungberung', phones:['082121757547'], mapsUrl:'https://maps.app.goo.gl/rA7UueYwkxcYiWx89', dayOff:'Buka setiap hari' },
  { id:'ujung-d', name:'Berkah D', area:'Ujungberung', address:'Pasar Ujungberung, Jl. A.H. Nasution, Ujungberung', phones:['082121757548'], mapsUrl:'https://maps.app.goo.gl/LV9CpAhLUi4yBqoA6', dayOff:'Buka setiap hari' },
  { id:'ujung-e', name:'Berkah E', area:'Ujungberung', address:'Pasar Ujungberung, Jl. A.H. Nasution, Ujungberung', phones:['082121757554'], mapsUrl:'https://maps.app.goo.gl/f4oDFEC8QxnPp2EU8', dayOff:'Buka setiap hari' },

  { id:'lembang-1', name:'Berkah Baru 1', area:'Lembang', address:'Pasar Lembang, Jl. Panorama, Lembang, Kabupaten Bandung Barat', phones:['082115513474'], mapsUrl:'https://maps.app.goo.gl/Ga3k6mW7RG5cnipJ9', dayOff:'Minggu' },
  { id:'lembang-2', name:'Berkah Baru 2', area:'Lembang', address:'Pasar Lembang, Jl. Panorama, Lembang, Kabupaten Bandung Barat', phones:['081223777055'], mapsUrl:'https://maps.app.goo.gl/fKCUnPG7EkhtfJv76', dayOff:'Minggu' },
  { id:'lembang-3', name:'Berkah Baru 3', area:'Lembang', address:'Pasar Lembang, Jl. Panorama, Lembang, Kabupaten Bandung Barat', phones:['081214454750'], dayOff:'Minggu' },
  { id:'lembang-4', name:'Berkah Baru 4', area:'Lembang', address:'Pasar Lembang, Jl. Panorama, Lembang, Kabupaten Bandung Barat', phones:['082117283878'], dayOff:'Minggu' },

  { id:'soreang-umat', name:'Berkah Umat', area:'Soreang', address:'Pasar Soreang, Jl. Raya Soreang No. 38 B (samping Terminal Soreang / seberang Paramount Silver), Kabupaten Bandung', phones:['081395984846'], mapsUrl:'https://maps.app.goo.gl/rj54HavxFJQBXYobA', dayOff:'Jumat' },
  { id:'soreang-umat-2', name:'Berkah Umat 2', area:'Soreang', address:'Pasar Soreang, Jl. Raya Soreang No. 38 B (samping Terminal Soreang / seberang Paramount Silver), Kabupaten Bandung', phones:['081283136772'], dayOff:'Jumat' },
  { id:'soreang-muda-1', name:'Berkah Muda 1', area:'Soreang', address:'Pasar Soreang, Jl. Raya Soreang No. 38 B (samping Terminal Soreang / seberang Paramount Silver), Kabupaten Bandung', phones:['081321110987'], mapsUrl:'https://maps.app.goo.gl/uaa3kWFBy7ZyGfCj6', dayOff:'Jumat' },
  { id:'soreang-muda-2', name:'Berkah Muda 2', area:'Soreang', address:'Pasar Soreang, Jl. Raya Soreang No. 38 B (samping Terminal Soreang / seberang Paramount Silver), Kabupaten Bandung', phones:['081223304900'], mapsUrl:'https://maps.app.goo.gl/mAThPFoH4f5gUrUt7', dayOff:'Jumat' },

  { id:'banjaran-muda-1', name:'Berkah Muda 1', area:'Banjaran', address:'Pasar Sehat Banjaran, Terminal Banjaran, Jl. Raya Banjaran Barat No. 155, Kabupaten Bandung', phones:['082113888162'], mapsUrl:'https://maps.app.goo.gl/NZsTuxpCHnGMoxws6', dayOff:'Jumat' },
  { id:'banjaran-muda-2', name:'Berkah Muda 2', area:'Banjaran', address:'Pasar Sehat Banjaran, Terminal Banjaran, Jl. Raya Banjaran Barat No. 155, Kabupaten Bandung', phones:['081395655596'], mapsUrl:'https://maps.app.goo.gl/XTXYAWbHF5MrMXGZ9', dayOff:'Jumat' },
  { id:'banjaran-muda-3', name:'Berkah Muda 3', area:'Banjaran', address:'Pasar Sehat Banjaran, Terminal Banjaran, Jl. Raya Banjaran Barat No. 155, Kabupaten Bandung', phones:['081214399815'], mapsUrl:'https://maps.app.goo.gl/VCMiKkYVAUyHsg7B9', dayOff:'Jumat' },
  { id:'banjaran-umat', name:'Berkah Umat', area:'Banjaran', address:'Pasar Sehat Banjaran, Terminal Banjaran, Jl. Raya Banjaran Barat No. 155, Kabupaten Bandung', phones:['081214399542'], mapsUrl:'https://maps.app.goo.gl/sTFzhM4NKEjL26B36', dayOff:'Minggu' },

  { id:'sumedang-duta-1', name:'Duta 1 Sumedang', area:'Sumedang', address:'Jl. Mayor Abdurachman No. 1, Kabupaten Sumedang', phones:['082116924554'], mapsUrl:'https://maps.app.goo.gl/F7tpgq6yw2k2yWXW6', dayOff:'Buka setiap hari' },
  { id:'sumedang-duta-2', name:'Duta 2 Sumedang', area:'Sumedang', address:'Pasar Semi Modern Sumedang', phones:['089507638098'], mapsUrl:'https://maps.app.goo.gl/RkR6FKXeCM79LDsm7', dayOff:'Minggu' },
  { id:'sumedang-zahra', name:'Zahra Sumedang', area:'Sumedang', address:'Pasar Semi Modern Sumedang', phones:['08996233609'], mapsUrl:'https://maps.app.goo.gl/BR1X4jm3ZMBRvfrG6', dayOff:'Belum tercantum' },
  { id:'jatigede-cahaya', name:'Cahaya Jatigede', area:'Jatigede', address:'Jatigede', phones:[], mapsUrl:'https://maps.app.goo.gl/MqUQ1FQgHFteabUF6', dayOff:'Minggu' },

  { id:'pangalengan-umat-1', name:'Berkah Umat 1', area:'Pangalengan', address:'Jl. Kartini, Pangalengan, Kabupaten Bandung', phones:['08211929813'], dayOff:'Jumat' },
  { id:'pangalengan-umat-2', name:'Berkah Umat 2', area:'Pangalengan', address:'Jl. Kartini No. 17, Kabupaten Bandung', phones:['081221583733'], mapsUrl:'https://maps.app.goo.gl/AET8sQ5tzbgV95Ck8', dayOff:'Jumat' },
  { id:'pangalengan-umat-3', name:'Berkah Umat 3', area:'Pangalengan', address:'Jl. Kartini No. 7–8, Kabupaten Bandung', phones:['081385263939'], mapsUrl:'https://maps.app.goo.gl/BtD65ubRzS27qZF78', dayOff:'Jumat' },

  { id:'tasik-zahra-1', name:'Zahra 1', area:'Tasikmalaya', address:'Pasar Indihiang, Kota Tasikmalaya', phones:['085942013728'], mapsUrl:'https://maps.app.goo.gl/AwkC9WxhG2hpPZ4J8', dayOff:'Minggu' },
  { id:'tasik-zahra-2', name:'Zahra 2', area:'Tasikmalaya', address:'Pasar Indihiang, Kota Tasikmalaya', phones:['082298509110'], mapsUrl:'https://maps.app.goo.gl/itJ6E7g7ovX4yEma7', dayOff:'Minggu' },

  { id:'purwadadi-baru-1', name:'Berkah Baru 1', area:'Purwadadi', address:'Jl. Raya Purwadadi, Kabupaten Subang', phones:['081386222237'], mapsUrl:'https://maps.app.goo.gl/L79ppCZNiPRHuZSJ7', dayOff:'Minggu' },
  { id:'purwadadi-baru-2', name:'Berkah Baru 2', area:'Purwadadi', address:'Pasar Purwadadi, Blok A No. 21–22 Lantai 2, Purwadadi Barat, Kabupaten Subang', phones:['088102333612'], mapsUrl:'https://maps.app.goo.gl/T9Q1oqH1oTeMTsar7', dayOff:'Minggu' },

  { id:'buahbatu-muda', name:'Berkah Muda', area:'Buah Batu', address:'Jl. Terusan Kiaracondong No. 199, Buahbatu, Kota Bandung', phones:['082258778158'], mapsUrl:'https://maps.app.goo.gl/MZZZBqKSjqgdAtQt5', dayOff:'Jumat' },
  { id:'padalarang-baru', name:'Berkah Baru', area:'Padalarang', address:'Pasar Tagog Padalarang, Lantai 2, Blok B2 No. 9–12, Padalarang, Kabupaten Bandung Barat', phones:['085294249523','085284635976'], mapsUrl:'https://maps.app.goo.gl/jM9mqSw8UVLN2oro8', dayOff:'Jumat' },
  { id:'ciparay-baru', name:'Berkah Baru', area:'Ciparay', address:'Jl. Pasar Timur No. 106–107, Ciparay, Kabupaten Bandung', phones:['08131500565'], mapsUrl:'https://maps.app.goo.gl/chGRv3F7KPtrXVUx7', dayOff:'Jumat' },
  { id:'ciwidey-baru', name:'Berkah Baru', area:'Ciwidey', address:'Terminal, Jl. Terusan Pasar Cibeureum, Ciwidey, Kabupaten Bandung', phones:['08211864051'], mapsUrl:'https://maps.app.goo.gl/Yb5fP3s5Q7BVd9EAA', dayOff:'Minggu' }
];
