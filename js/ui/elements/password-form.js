import { generateIdentifier } from "../../crypto/index.js";

export default class PasswordForm extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = this.html;

    this.registerEvents();
  }
  
  registerEvents() {
    this.shadow.querySelector("form").addEventListener("submit", this.add);
  }

  add(event) {
    event.preventDefault();
    
    var json = {};

    for (var [key, value] of new FormData(this)) {
      json[key] = value;
    }

    json["id"] = generateIdentifier();

    
  }

  get html() {
    return `
      <style>
        label {
          display: block;
        }
      </style>

      <form action="#" method="POST">
        <h2>New password</h2>
        
        <div>
          <label for="title">Title</label>
          <input type="text" id="title" name="title">
        </div>
        <div>
          <label for="username">Username</label>
          <input type="text" id="username">
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email">
        </div>
        <div>
          <label for="password">Password</label>
          <input type="text" id="password">
        </div>
        <div>
          <label for="url">Website</label>
          <input type="url" id="url">
        </div>
        <div>
          <label for="description">Description</label>
          <textarea id="description"></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
    `;
  }
}