export default function map(template, data) {
  var fragment = document.createElement("template");

  fragment.innerHTML = template.innerHTML.replace(/{{\s?(\w{1,})\s?}}/g, function (m, key) {
    return data.hasOwnProperty(key) ? data[key] : "";
  }).trim();

  return fragment.content;
};