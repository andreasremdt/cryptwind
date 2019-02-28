import { copy } from "../../helpers/clipboard.js";

export default class PasswordList extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    
    this.render();
  }

  connectedCallback() {
    this.shadow.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    var target = event.target;

    if (!target.dataset) {
      return;
    }

    switch(target.dataset.js) {
      case "remove-entry":
        window.store.remove(target.parentNode.dataset.id);
        this.render();
        break;
      
      case "copy-password":
        copy(target.parentNode.dataset.password).then(() => console.log("Copied"));
        break;
    }
  }

  render() {
    var items = window.store.get();

    this.shadow.innerHTML = `
      <ul>
        ${items.map(item => `
          <li data-id="${item.id}" data-password="${item.password}">
            <h3>${item.title}</h3>
            <p>${item.email}</p>
            <button type="button">Edit</button>
            <button type="button" data-js="remove-entry">Remove</button>
            <button type="button" data-js="copy-password">Copy password</button>
          </li>`).join("")}
      </ul>
    `;
  }
}