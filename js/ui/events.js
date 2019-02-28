import { filterList } from "./index.js";
//import { getAll } from "../db/store.js";

export default function registerEvents() {
  document.querySelector('[data-js="search"]').addEventListener("keyup", function(event) {
    //filterList(getAll(), event.target.value);
  });

  document.querySelector('[data-js="new-password"]').addEventListener('click', function(event) {
    console.log(event);
  });
};