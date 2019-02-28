import Store from "./db/store.js";
import { encrypt, str2ab, ab2str, decrypt } from "./crypto/index.js";
import { filterList } from "./ui/index.js";
import registerEvents from "./ui/events.js";

import PasswordForm from "./ui/elements/password-form.js";
import PasswordList from "./ui/elements/password-list.js";

window.store = new Store();

registerEvents();

store.init().then(function() {
  customElements.define("password-form", PasswordForm);
  customElements.define("password-list", PasswordList);
});


(async function() {
  "use strict";


  /*encrypt(JSON.stringify(store.passwords), "1234").then(function(result) {
    console.log(result.cipherText);
    var str = ab2str(result.cipherText);

    console.log(str);

    var d = str2ab(str);
    console.log(d);

    decrypt({
      cipherText: d,
      iv: result.iv
    }, "1234").then(function(data) {
      console.log(data);
    }).catch(console.warn);
  });*/
})();