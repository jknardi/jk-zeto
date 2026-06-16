// EN: Example implementation using Fastify
// ID: Contoh implementasi menggunakan Fastify

import Fastify from 'fastify';
import { SecureToken } from '../src/index.js';

const fastify = Fastify({ logger: false });
const tokenManager = new SecureToken('super-secret-key-that-is-very-hard-to-guess-123');

/**
 * 🛡️ DECORATOR / MIDDLEWARE
 * EN: Fastify preHandler hook to validate jk-zeto token
 * ID: Hook preHandler Fastify untuk memvalidasi token jk-zeto
 */
fastify.decorate('authenticate', async (request, reply) => {
  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    reply.code(401).send({ error: 'EN: Unauthorized | ID: Tidak diizinkan' });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    reply.code(401).send({ error: 'EN: Invalid Token Format | ID: Format Token Salah' });
    return;
  }

  const tokenString = parts[1];

  try {
    const userPayload = tokenManager.verify(tokenString); // <-- Kirim string token-nya
    request.user = userPayload;
  } catch (error) {
    reply.code(403).send({ error: `EN: Forbidden: ${error.message} | ID: Terlarang: ${error.message}` });
  }

});


// 🔑 ROUTE: LOGIN
fastify.post('/api/login', async (request, reply) => {
  const { username, password } = request.body;

  if (username === 'joko' && password === 'rahasia123') {
    const token = tokenManager.generate({ userId: 'usr_777', role: 'developer' }, 3600);
    return { token };
  }

  reply.code(400).send({ error: 'EN: Invalid credentials | ID: Kredensial salah' });
});

// 🔒 ROUTE: PROTECTED
fastify.get('/api/dashboard', { preHandler: [fastify.authenticate] }, async (request, reply) => {
  return {
    message: 'EN: Hello from Fastify secure route | ID: Halo dari route aman Fastify',
    user: request.user
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    console.log('🚀 EN: Fastify running on http://localhost:3001 | ID: Fastify berjalan di http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
