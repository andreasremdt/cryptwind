import PasswordList from './components/password-list.js';
import store from './store.js';
import bind from './utils/bind.js';

customElements.define("password-list", PasswordList);

bind(store);