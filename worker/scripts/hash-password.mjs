#!/usr/bin/env node
// Prints the value for the Worker secret ADMIN_PASSWORD_HASH.
//
//   node scripts/hash-password.mjs            asks for the password (typing is hidden)
//   echo "the password" | node scripts/hash-password.mjs   reads it from stdin
//   node scripts/hash-password.mjs --secret   prints a random SESSION_SECRET instead
//
// Format: pbkdf2-sha256$<iterations>$<salt>$<hash>  (100000 iterations, the most a
// Worker can verify). Only the hash is printed; the password is never stored.
import { pbkdf2Sync, randomBytes } from 'node:crypto';

if (process.argv.includes('--secret')) {
  console.log(randomBytes(48).toString('base64url'));
  process.exit(0);
}

const CTRL_C = String.fromCharCode(3);
const DEL = String.fromCharCode(127);
const BS = String.fromCharCode(8);

function readPassword(prompt) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    if (!stdin.isTTY) {
      let data = '';
      stdin.setEncoding('utf8');
      stdin.on('data', (chunk) => {
        data += chunk;
      });
      stdin.on('end', () => resolve(data.replace(/\r?\n$/, '')));
      return;
    }
    process.stderr.write(prompt);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    let value = '';
    const onData = (ch) => {
      if (ch === CTRL_C) process.exit(130);
      if (ch === '\r' || ch === '\n') {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener('data', onData);
        process.stderr.write('\n');
        resolve(value);
      } else if (ch === DEL || ch === BS) {
        value = value.slice(0, -1);
      } else {
        value += ch;
      }
    };
    stdin.on('data', onData);
  });
}

const password = await readPassword('New password: ');
if (password.length < 10) {
  console.error('Use at least 10 characters.');
  process.exit(1);
}
const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
console.log(`pbkdf2-sha256$100000$${salt.toString('base64url')}$${hash.toString('base64url')}`);
