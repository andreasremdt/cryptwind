// import Store from "./db/store.js";
// import { encrypt, str2ab, ab2str, decrypt } from "./crypto/index.js";
// import { filterList } from "./ui/index.js";
// import registerEvents from "./ui/events.js";

// import PasswordForm from "./ui/elements/password-form.js";
// import PasswordList from "./ui/elements/password-list.js";

// window.store = new Store();

// registerEvents();

// store.init().then(function() {
//   customElements.define("password-form", PasswordForm);
//   customElements.define("password-list", PasswordList);
// });


// (async function() {
//   "use strict";


//   /*encrypt(JSON.stringify(store.passwords), "1234").then(function(result) {
//     console.log(result.cipherText);
//     var str = ab2str(result.cipherText);

//     console.log(str);

//     var d = str2ab(str);
//     console.log(d);

//     decrypt({
//       cipherText: d,
//       iv: result.iv
//     }, "1234").then(function(data) {
//       console.log(data);
//     }).catch(console.warn);
//   });*/
// })();


var NotesStorage = {
  load: function () {
    var values = Promise.all([
      localforage.getItem("notes4"),
      localforage.getItem("nonce4")
    ]);

    return values.then(function (values) {
      var enc_notes = values[0];
      var nonce = values[1];
      if (!enc_notes || !nonce) {
        return null;
      }

      return retrieveKey().then(function (key) {
        var alg = { name: "AES-GCM", iv: nonce };

        // Decrypt our notes using the stored |nonce|.
        return crypto.subtle.decrypt(alg, key, enc_notes)
          .then(decode, function (err) {
            throw "Integrity/Authenticity check failed! Invalid password?";
          });
      });
    });
  },

  save: function (notes) {
    var buffer = encode(notes);

    return retrieveKey().then(function (key) {
      // Set up parameters.
      var nonce = crypto.getRandomValues(new Uint8Array(16));
      var alg = { name: "AES-GCM", iv: nonce };

      // Encrypt |notes| under |key| using AES-GCM.
      return crypto.subtle.encrypt(alg, key, buffer)
        .then(function (notes_enc) {
          return Promise.all([
            localforage.setItem("notes4", notes_enc),
            localforage.setItem("nonce4", nonce)
          ]);
        });
    });
  }
};

function retrieveKey() {
  var params = Promise.all([
    // Get base key and salt.
    retrievePWKey(), getSalt()
  ]);

  return params.then(function (values) {
    var pwKey = values[0];
    var salt = values[1];

    // Do the PBKDF2 dance.
    return deriveKey(pwKey, salt);
  });
}

function deriveKey(pwKey, salt) {
  var params = {
    name: "PBKDF2",

    // TODO NSS does unfortunately not support PBKDF2 with anything
    // other than SHA-1 for now. Update this to SHA-256 once we support it.
    hash: "SHA-1",
    salt: salt,

    // The more iterations the slower, but also more secure.
    iterations: 5000
  };

  // The derived key will be used to encrypt with AES.
  var alg = { name: "AES-GCM", length: 256 };
  var usages = ["encrypt", "decrypt"];

  return crypto.subtle.deriveKey(
    params, pwKey, alg, false, usages);
}

function retrievePWKey() {
  // We will derive a new key from it.
  var usages = ["deriveKey"];

  // Show a native password input dialog.
  //return crypto.subtle.generateKey(
  //"PBKDF2", false, usages);

  // TODO Use .generateKey() as soon as that's supported for PBKDF2.
  var buffer = encode(prompt("Please enter your password"));
  return crypto.subtle.importKey("raw", buffer, "PBKDF2", false, usages);
}

function getSalt() {
  // Try to read a stored salt.
  return localforage.getItem("salt4")
    .then(function (salt) {
      if (salt) {
        return salt;
      }

      // We should generate at least 8 bytes
      // to allow for 2^64 possible variations.
      var salt = crypto.getRandomValues(new Uint8Array(8));
      return localforage.setItem("salt4", salt);
    });
}

function encode(str) {
  return new TextEncoder("utf-8").encode(str);
}

function decode(buf) {
  return new TextDecoder("utf-8").decode(new Uint8Array(buf));
}