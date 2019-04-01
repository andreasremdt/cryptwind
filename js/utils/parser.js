export default function map(template, data) {
  var fragment = document.createElement("template");
  var source = template;

  if (typeof template !== "string") {
    source = template.innerHTML;
  }
  
  fragment.innerHTML = source.replace(/{{\s?(\w{1,})\s?}}/g, function (m, key) {
    return data.hasOwnProperty(key) ? data[key] : "";
  }).trim();

  return fragment.content;
};