const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = 'kriptografiSangatlahMenyenangkan';
// const iv = Buffer.from('1234567890123456', 'utf-8'); 
const iv = crypto.randomBytes(16);

// Hash MD5
const hashEmail = (email) => {
  return crypto.createHash('md5').update(email).digest('hex');
}

// Hash SHA256
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Enkripsi AES
const encryptFullName = (text) =>{
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  console.log(encrypted);
  console.log(encrypted);
  return encrypted;
} 

// Dekripsi AES
const decryptFullName = (encryptedText) =>{
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}  

// Dekripsi && enkripsi Caesar
const caesarCipher = (str, shift, decrypt = false) => {
  const s = decrypt ? (26 - shift) % 26 : shift;
  const n = s > 0 ? s : 26 + (s % 26);
  return [...str]
    .map((l, i) => {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90)
        return String.fromCharCode(((c - 65 + n) % 26) + 65);
      if (c >= 97 && c <= 122)
        return String.fromCharCode(((c - 97 + n) % 26) + 97);
      return l;
    })
    .join('');
};

// supeer eknripsi
const superEnkripsi = (str, shift, decrypt = false) =>{
  let chiperText = encryptFullName(str);
  chiperText = caesarCipher(chiperText, shift, decrypt);
  return chiperText;
}

// supeer dekripsi
const superDekripsi = (str, shift, decrypt = false) =>{
  str = caesarCipher(str, shift, decrypt);
  const plainText = decryptFullName(str);
  return plainText;
}

// ENKRIPSI GAMBAR
function encryptImage() {
  var img = document.getElementById("img"),
      cover = document.getElementById("cover"),
      textarea = document.getElementById("text"),
      download = document.getElementById("download");
  if(img && textarea) {
      cover.src = steg.encode(textarea.value, img);
      download.href=cover.src.replace("image/png", "image/octet-stream");
      console.log("succes")
  }
}

// DEKRIPSI GAMBAR
function decryptImage() {
  var img = document.getElementById("img"),
  message = document.getElementById("message"),
  textarea = document.getElementById("text");
  if(img && textarea) {
    message.innerHTML = steg.decode(img);
    textarea.value = message.innerHTML;
  }
}

module.exports = { 
  hashEmail,
  hashPassword,
  encryptFullName,
  decryptFullName,
  caesarCipher,
  superEnkripsi,
  superDekripsi,
  encryptImage,
  decryptImage
};