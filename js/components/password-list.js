import store from '../store.js';
import map from '../utils/parser.js';

export default class PasswordList extends HTMLElement {
  constructor() {
    super();

    this.template = document.getElementById("password-list-item");
    this.wrapper = document.createElement("ol");
    this.wrapper.classList.add("password-list");

    this.render = this.render.bind(this);
  }
  
  connectedCallback() {
    store.subscribe('passwords', this.render);

    this.render();
  }
  
  render() {
    this.wrapper.innerHTML = "";

    store.passwords.forEach((password) => {
      this.wrapper.appendChild(document.importNode(map(this.template, password), true));
    });
  
    this.appendChild(this.wrapper);
  }
}