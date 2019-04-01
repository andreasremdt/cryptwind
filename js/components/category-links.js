import store from '../store.js';
import map from '../utils/parser.js';

export default class CategoryLinks extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  get items() {
    var items = [];

    store.passwords.forEach(function (password) {
      var index = items.findIndex(i => i.category === password.category);

      if (index === -1) {
        items.push({
          category: password.category,
          count: 1
        });
      } else {
        items[index].count++;
      }
    });

    return items;
  }

  get html() {
    return `
      <a href="#" class="link -big" data-on="click:filter" data-category="{{ category }}">
        {{ category }} <span class="badge">{{ count }}</span>
      </a>
    `;
  }

  render() {
    this.innerHTML = "";

    this.items.forEach((item) => {
      this.appendChild(document.importNode(map(this.html, item), true));
    });
  }
}