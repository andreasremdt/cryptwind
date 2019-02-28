export function copy(text) {
  if (!text) {
    return;
  }

  return navigator.permissions.query({ name: "clipboard-write" }).then(function(result) {
    if (result.state === "granted" || result.state === "prompt") {
      return navigator.clipboard.writeText(text);
    }
  });
}