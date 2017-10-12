const crypto = require('crypto')

const buf = crypto.randomBytes(256);
// console.log(
//   `${buf.length} bytes of random data: ${buf.toString('base64')}`);

const encrypted = crypto.createHash('sha256').update('domoT1230').update(buf.toString('base64')).digest('hex')

const encrypted2 = crypto.createHash('sha256').update('domoT1230').digest('hex')

console.log(encrypted)
