export default function bind(store) {
  var bindings = document.querySelectorAll("[data-bind]");

  Array.from(bindings).forEach(function (binding) {
    binding.addEventListener('input', function (evt) {
      store[binding.dataset.bind] = evt.target.value;
    });
  });
};