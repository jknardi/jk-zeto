// EN: Example implementation using Express.js
// ID: Contoh implementasi menggunakan Express.js

import express from 'express';
import { SecureToken } from '../src/index.js';

const app = express();
app.use(express.json());

// EN: Initialize jk-zeto with a secure secret key
// ID: Inisialisasi jk-zeto dengan kunci rahasia yang aman
const tokenManager = new SecureToken('super-secret-key-that-is-very-hard-to-guess-123');

/**
 * 🛡️ MIDDLEWARE
 * EN: Middleware to protect routes using jk-zeto
 * ID: Middleware untuk melindungi route menggunakan jk-zeto
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  // EN: Check if authorization header exists
  // ID: Periksa apakah header otorisasi ada
  if (!authHeader) {
    return res.status(401).json({ 
      error: 'EN: Access token missing | ID: Token akses tidak ditemukan' 
    });
  }

  // === FIXED LINE / BAGIAN YANG DIPERBAIKI ===
  // EN: Extract the token string from "Bearer <token>" format
  // ID: Ambil string token dari format "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ 
      error: 'EN: Invalid Authorization header format. Expected "Bearer <token>" | ID: Format header Otorisasi tidak valid. Harus "Bearer <token>"' 
    });
  }

  const tokenString = parts[1]; // EN: Get only the token part | ID: Ambil bagian token saja

  try {
    // EN: Pass the token string (not the array) to the verify method
    // ID: Kirim string token (bukan array) ke dalam metode verify
    const userPayload = tokenManager.verify(tokenString);
    req.user = userPayload;
    next();
  } catch (error) {
    return res.status(403).json({ 
      error: `EN: Invalid token: ${error.message} | ID: Token tidak valid: ${error.message}` 
    });
  }
}


/**
 * 🔑 ROUTE: LOGIN
 * EN: Public route to generate a token upon login
 * ID: Route publik untuk menghasilkan token saat login
 */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // EN: Demo validation (Replace with actual database check)
  // ID: Validasi demo (Ganti dengan pemeriksaan database asli)
  if (username === 'joko' && password === 'rahasia123') {
    const userPayload = { userId: 'usr_777', role: 'developer' };
    
    // EN: Generate token valid for 1 hour (3600 seconds)
    // ID: Buat token yang berlaku selama 1 jam (3600 detik)
    const token = tokenManager.generate(userPayload, 3600);

    return res.json({ 
      message: 'EN: Login successful | ID: Login berhasil',
      token: token 
    });
  }

  return res.status(400).json({ error: 'EN: Invalid credentials | ID: Kredensial salah' });
});

/**
 * 🔒 ROUTE: PROTECTED
 * EN: Protected route that requires a valid jk-zeto token
 * ID: Route terproteksi yang membutuhkan token jk-zeto yang valid
 */
app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: 'EN: Welcome to the secure dashboard! | ID: Selamat datang di dashboard yang aman!',
    userData: req.user
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 EN: Server running on http://localhost:${PORT} | ID: Server berjalan di http://localhost:${PORT}`);
});
