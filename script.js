// script.js

// fungsi global agar onsubmit="tambahMahasiswa(event)" bisa menemukannya
function tambahMahasiswa(event) {
  // cegah form melakukan submit & reload halaman
  event.preventDefault();

  // ambil nilai dari input
  const nama = document.getElementById('nama').value.trim();
  const nim = document.getElementById('nim').value.trim();
  const jurusan = document.getElementById('jurusan').value.trim();

  // validasi sederhana
  if (!nama || !nim || !jurusan) {
    alert('Tolong isi semua field!');
    return;
  }

  // objek mahasiswa
  const mahasiswa = { nama, nim, jurusan };

  // tampilkan di halaman (buat container jika belum ada)
  let daftar = document.getElementById('daftarMahasiswa');
  if (!daftar) {
    daftar = document.createElement('div');
    daftar.id = 'daftarMahasiswa';
    daftar.className = 'mt-4';
    // taruh setelah form (di dalam .container)
    const container = document.querySelector('.container');
    container.appendChild(daftar);
  }

  // tambahkan entry baru (gunakan escape sederhana untuk keamanan)
  daftar.insertAdjacentHTML('beforeend', `
    <div class="card mb-2">
      <div class="card-body p-2">
        <strong>${escapeHtml(mahasiswa.nama)}</strong>
        <span class="text-muted"> — ${escapeHtml(mahasiswa.nim)} — ${escapeHtml(mahasiswa.jurusan)}</span>
      </div>
    </div>
  `);

  // simpan ke localStorage agar data tetap ada jika halaman di-reload
  const list = JSON.parse(localStorage.getItem('mahasiswa') || '[]');
  list.push(mahasiswa);
  localStorage.setItem('mahasiswa', JSON.stringify(list));

  // reset form setelah disimpan
  event.target.reset();
}

// helper kecil untuk escape HTML supaya user input tidak menjadi HTML
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// saat halaman dimuat, muat data dari localStorage (jika ada)
document.addEventListener('DOMContentLoaded', () => {
  const list = JSON.parse(localStorage.getItem('mahasiswa') || '[]');
  if (list.length) {
    const container = document.querySelector('.container');
    const daftar = document.createElement('div');
    daftar.id = 'daftarMahasiswa';
    daftar.className = 'mt-4';
    container.appendChild(daftar);
    list.forEach(m => {
      daftar.insertAdjacentHTML('beforeend', `
        <div class="card mb-2">
          <div class="card-body p-2">
            <strong>${escapeHtml(m.nama)}</strong>
            <span class="text-muted"> — ${escapeHtml(m.nim)} — ${escapeHtml(m.jurusan)}</span>
          </div>
        </div>
      `);
    });
  }
});
