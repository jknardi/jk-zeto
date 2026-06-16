# Contributing to jk-zeto 🤝

Thank you for your interest in contributing to `jk-zeto`! Project ini dibuat untuk menyediakan pustaka token aman, berkinerja tinggi, dan **tanpa dependensi luar (zero-dependency)** untuk ekosistem Node.js.

---

## 🌐 Language / Bahasa
* [English Guidelines (#-english-guidelines-rules)]
* [Panduan Bahasa Indonesia (#-panduan-bahasa-indonesia--aturan)]

---

## 🇬🇧 English Guidelines & Rules

### 📜 Core Principles
Before you write any code, please remember our absolute architectural requirements:
1. **Zero External Dependencies:** All code must only use native Node.js built-in modules (such as `node:crypto`). Do not add any packages to the `dependencies` section of `package.json`.
2. **Strict Cryptographic Stability:** Any modification to cryptographic primitives must ensure backward compatibility or follow a strict version bump (e.g., introducing `v2.sec.`).
3. **Bilingual Documentation:** All public code comments (JSDoc), errors, and console messages must be documented in both **English & Indonesia**.

### 🛠️ Development Workflow
1. **Fork the Repository:** Create your own copy of this repository on GitHub.
2. **Create a Feature Branch:** Use descriptive names like `feat/add-key-rotation` or `fix/token-padding`.
3. **Write Tests:** Ensure every new feature or fix comes with a corresponding test in the `test/` folder using Node.js native test runner.
4. **Run Local Tests:** Make sure all tests pass perfectly before submitting your code:
   ```bash
   npm test
   ```
5. **Submit a Pull Request (PR):** Describe your changes clearly in English or Indonesia. Our GitHub Actions will automatically test your PR against Node.js 18, 20, and 22.

---

## 🇮🇩 Panduan Bahasa Indonesia & Aturan

### 📜 Prinsip Inti Proyek
Sebelum Anda mulai menulis kode, harap ingat aturan arsitektur mutlak kami:
1. **Tanpa Dependensi Pihak Ketiga (Zero-Dependency):** Semua kode wajib hanya menggunakan modul bawaan asli dari Node.js (seperti `node:crypto`). Dilarang menambahkan pustaka baru ke dalam bagian `dependencies` di file `package.json`.
2. **Stabilitas Kriptografi yang Ketat:** Setiap modifikasi pada fungsi kriptografi harus menjamin kompatibilitas versi sebelumnya atau mengikuti perubahan versi yang kaku (misalnya, memperkenalkan versi `v2.sec.`).
3. **Dokumentasi Dwibahasa:** Semua komentar kode publik (JSDoc), pesan kesalahan (*error*), dan log konsol wajib ditulis dalam dua bahasa: **Inggris & Indonesia**.

### 🛠️ Alur Kerja Pengembangan
1. **Fork Repositori:** Buat salinan (*fork*) dari repositori ini ke akun GitHub Anda.
2. **Buat Branch Fitur:** Gunakan nama branch yang deskriptif, seperti `feat/add-key-rotation` atau `fix/token-padding`.
3. **Tulis Unit Testing:** Pastikan setiap fitur baru atau perbaikan *bug* dilengkapi dengan kode pengujian terkait di dalam folder `test/` menggunakan *test runner* bawaan Node.js.
4. **Jalankan Pengujian Lokal:** Pastikan semua pengujian lulus dengan sempurna di komputer Anda sebelum mengirimkan kode:
   ```bash
   npm test
   ```
5. **Kirim Pull Request (PR):** Jelaskan perubahan yang Anda lakukan dengan jelas menggunakan bahasa Inggris atau Indonesia. GitHub Actions kami akan menguji PR Anda secara otomatis pada Node.js versi 18, 20, dan 22.

---

## 🎖️ Code of Conduct / Kode Etik
We strive to maintain a welcoming, inclusive, and professional environment for everyone. Please treat all contributors with respect.

*Kami berkomitmen untuk menjaga lingkungan yang ramah, inklusif, dan profesional bagi siapa saja. Harap hormati seluruh kontributor lainnya.*
