export function bind(store) {
  var bindings = document.querySelectorAll("[data-bind]");

  Array.from(bindings).forEach(function (binding) {
    binding.addEventListener('input', function (evt) {
      store[binding.dataset.bind] = evt.target.value;
    });
  });
};

export function attach(handlers) {
  document.body.addEventListener('click', function (evt) {
    if (!evt.target.dataset.on) {
      return;
    }
    var [type, method] = evt.target.dataset.on.split(/:/);

    if (!handlers[method]) {
      return console.warn(`WARNING: The event handler doesn't have a function ${method}(). Please register this function before you can use it in the event listener.`);
    }

    handlers[method](evt);
  });
};