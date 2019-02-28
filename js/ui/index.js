export function filterList(items, filter) {
  var filtered = items.filter(function(item) {
    var results = Object.values(item).filter(function(element) {
      if (typeof element === "string") {
        return element.includes(filter);
      }
    });
    return results.length > 0;
  });

  buildList(filtered);
}