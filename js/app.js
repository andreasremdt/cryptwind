import PasswordList from './components/password-list.js';
import store from './store.js';
import eventHandlers from './event-handlers.js';
import { bind, attach } from './utils/bind.js';

customElements.define("password-list", PasswordList);

bind(store);
attach(eventHandlers);
