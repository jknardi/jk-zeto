import test from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
// EN: Import both classes from the main entry point
// ID: Impor kedua kelas dari entry point utama
import { SecureToken, AsymmetricToken } from '../src/index.js';

test(
  'SecureToken - Successful Flow (Generate & Verify) / Alur Sukses (Generate & Verify)',
  () => {
    const secret = 'super-secret-key-123';
    const tokenManager = new SecureToken(secret);

    const originalPayload = {
      userId: 'usr_99X',
      role: 'admin'
    };

    // Generate a secure token from the payload.
    // Membuat token aman dari payload.
    const token = tokenManager.generate(originalPayload, 60);

    // Ensure the token contains the expected version prefix.
    // Pastikan token memiliki prefix versi yang sesuai.
    assert.ok(token.startsWith('v1.sec.'));

    // Verify and decrypt the token.
    // Verifikasi dan dekripsi token.
    const decryptedPayload = tokenManager.verify(token);

    // Ensure the decrypted payload matches the original payload.
    // Pastikan payload hasil dekripsi sama dengan payload asli.
    assert.deepStrictEqual(
      decryptedPayload,
      originalPayload
    );
  }
);

test(
  'SecureToken - Should Fail When Token Is Tampered / Gagal Jika Token Dimodifikasi (Tampering)',
  () => {
    const tokenManager = new SecureToken('secret');

    const token = tokenManager.generate(
      { data: 'secure' },
      60
    );

    // Intentionally modify the last character of the token.
    // Sengaja memodifikasi karakter terakhir token.
    const tamperedToken =
      token.slice(0, -1) +
      (token.endsWith('A') ? 'B' : 'A');

    // Verification should fail because AES-GCM
    // detects any modification to the ciphertext.
    //
    // Verifikasi harus gagal karena AES-GCM
    // dapat mendeteksi perubahan sekecil apa pun pada ciphertext.
    assert.throws(() => {
      tokenManager.verify(tamperedToken);
    }, /Verification failed|Verifikasi gagal/);
  }
);





test('AsymmetricToken - EN: Full flow Success (Sign with Private, Verify with Public) | ID: Alur Sukses (Tanda tangan dengan Private, Verifikasi dengan Public)', () => {
  // EN: Generate temporary Ed25519 key pair for testing
  // ID: Buat pasangan kunci Ed25519 sementara untuk pengujian
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ed25519', {
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    publicKeyEncoding: { type: 'spki', format: 'pem' }
  });

  const signer = new AsymmetricToken(privateKey);
  const verifier = new AsymmetricToken(publicKey);
  
  const samplePayload = { scope: 'read:profile', userId: 'user_123' };

  // EN: Create token
  // ID: Buat token
  const token = signer.generate(samplePayload, 30);
  assert.ok(token.startsWith('v1.asym.'));

  // EN: Verify token
  // ID: Verifikasi token
  const result = verifier.verify(token);
  assert.deepStrictEqual(result, samplePayload);
});

test('AsymmetricToken - EN: Reject altered signatures | ID: Tolak tanda tangan yang dimodifikasi', () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ed25519', {
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    publicKeyEncoding: { type: 'spki', format: 'pem' }
  });

  const signer = new AsymmetricToken(privateKey);
  const verifier = new AsymmetricToken(publicKey);
  
  const token = signer.generate({ data: 'test' }, 30);
  
  // EN: Tamper with the signature part
  // ID: Ubah bagian tanda tangan token
  const corruptedToken = token + 'xyz';

  assert.throws(() => {
    verifier.verify(corruptedToken);
  }, /Verification failed/);
});


