async function generateEncryptionKey(password, mode = "AES-GCM", length = 256) {
  if (!password) {
    return;
  }

  var configuration = {
    name: "PBKDF2",
    hash: "SHA-256",
    salt: new TextEncoder().encode('my-unique-salt'),
    iterations: 1000
  };

  var derived = {
    name: mode,
    length
  };

  var encoded = new TextEncoder().encode(password);
  var key = await crypto.subtle.importKey("raw", encoded, { name: "PBKDF2" }, false, ["deriveKey"]);

  return crypto.subtle.deriveKey(configuration, key, derived, false, ["encrypt", "decrypt"]);
}



export async function encrypt(text, password) {
  if (!text || !password) {
    return;
  }

  var configuration = {
    name: "AES-GCM",
    length: 256,
    iv: crypto.getRandomValues(new Uint8Array(12))
  };

  var key = await generateEncryptionKey(password);
  var encoded = new TextEncoder().encode(text);

  return {
    cipherText: await crypto.subtle.encrypt(configuration, key, encoded),
    iv: configuration.iv
  };
}



export async function decrypt(encrypted, password) {
  var configuration = {
    name: "AES-GCM",
    length: 256,
    iv: encrypted.iv
  };

  var key = await generateEncryptionKey(password);
  var decrypted = await crypto.subtle.decrypt(configuration, key, encrypted.cipherText);

  return new TextDecoder().decode(decrypted);
}



export function ab2str(buffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

export function str2ab(str) {
  var buffer = new ArrayBuffer(str.length);
  var bufferView = new Uint8Array(buffer);

  for (var i = 0; i < str.length; i++) {
    bufferView[i] = str.charCodeAt(i);
  }

  return buffer;
}

export function generateIdentifier() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function(c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  });
}