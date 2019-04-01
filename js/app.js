import PasswordList from './components/password-list.js';
import CategoryLinks from './components/category-links.js';
import store from './store.js';
import eventHandlers from './event-handlers.js';
import { bind, attach } from './utils/bind.js';

customElements.define("password-list", PasswordList);
customElements.define("category-links", CategoryLinks);

bind(store);
attach(eventHandlers);
