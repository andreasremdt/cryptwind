import { generateIdentifier, encrypt, ab2str } from "../crypto/index.js";

const PASSWORDS_ENCRYPTED_KEY = "passwords_encrypted";
const PASSWORDS_DECRYPTED_KEY = "passwords_decrypted";

export default class Store {
  constructor() {
    this.items = [];
  }

  _persist() {
    var data = JSON.stringify(this.items);

    localStorage.setItem(PASSWORDS_DECRYPTED_KEY, data);

    encrypt(data, "1234").then(function(result) {
      localStorage.setItem(PASSWORDS_ENCRYPTED_KEY, ab2str(result.cipherText));
    });
  }

  static isDecrypted() {
    return localStorage.getItem(PASSWORDS_DECRYPTED_KEY) !== null;
  }

  init() {
    return new Promise((resolve, reject) => {
      if (!Store.isDecrypted()) {
        resolve("The password data is not decrypted.");
      }

      try {
        this.items = JSON.parse(localStorage.getItem(PASSWORDS_DECRYPTED_KEY));

        resolve();
      } catch (error) {
        reject({ message: "Unable to parse password data.", error });
      }
    });
  }

  get(id = null) {
    if (!Store.isDecrypted()) {
      throw new Error("The password data is not decrypted.");
    }

    if (id) {
      return this.items.find(item => item.id === id);
    }

    return this.items;
  }

  add(item) {
    if (!Store.isDecrypted()) {
      throw new Error("The password data is not decrypted.");
    }

    if (typeof item !== "object") {
      throw new TypeError("Invalid object data received.");
    }

    item["id"] = generateIdentifier();
    
    this.items.push(item);

    this._persist();
  }

  remove(id) {
    if (!Store.isDecrypted()) {
      throw new Error("The password data is not decrypted.");
    }
    
    this.items = this.items.filter(item => item.id !== id);

    this._persist();
  }
}