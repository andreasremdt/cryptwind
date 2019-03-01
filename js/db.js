// var store = {
//   passwords: [
//     {
//       id: 1,
//       name: "Amazon",
//       email: "andreas.remdt@gmail.com",
//       url: "https://amazon.de",
//       password: "1234",
//       username: "andreas.remdt",
//       note: "This is something",
//       folders: ["Login"],
//       created: Date.now()
//     }
//   ]
// }

class DatabaseError extends Error {
  constructor(message) {
    super(message);

    this.name = "DatabaseError";
  }
}

class Store {
  constructor() {
    this._items = null;

    this._getFromDisk();
  }
  
  _getFromDisk() {    
    this._items = JSON.parse(localStorage.getItem("passwords"));
  }
  
  _writeToDisk() {  
    localStorage.setItem("passwords", JSON.stringify(this._items));
  }
  
  /**
   * Filters through all items and filters out the ones that match
   * the given search parameters.
   * 
   * @param {Object} query The search parameters.
   * @returns {Array} The found items that matched the query.
   */
  get(query = null) {
    if (!query) {
      return this._items;
    }

    var results = [];

    for (let i = 0; i < this._items.length; i++) {
      var item = this._items[i];
      var match;

      for (let field in query) {
        match = item.hasOwnProperty(field) && item[field] === query[field];

        if (!match) break;
      }

      if (match && !results.includes(item)) {
        results.push(item);
      }
    }

    return results;
  }

  /**
   * Creates a new item in the store and returns it after
   * it has been added.
   * 
   * @param {Object} data The new data to be 
   */
  create(data) {
    if (!(data.hasOwnProperty("name") && data.hasOwnProperty("password"))) {
      throw new DatabaseError("Can't create a new entry without `name` and `password`. Both values are required, please enter them.");
    }

    var created = Date.now();
    var id = Math.floor(Math.random() * 1e10) + created;
    var item = { id, ...data, created };

    this._items.push(item);

    return item;
  }

  delete(id) {
    if (!id) {
      throw new DatabaseError("Can't delete any entries without `id`.");
    }

    for (let i = 0; i < this._items.length; i++) {
      var item = this._items[i];

      if (item.id === id) {
        return this._items.splice(i, 1)[0];
      }
    }

    return false;
  }

  update(id, updates = {}) {
    if (!id) {
      throw new DatabaseError("Can't update any entries without `id`.");
    }

    for (let i = 0; i < this._items.length; i++) {
      var item = this._items[i];

      if (item.id === id) {
        item = Object.assign(item, updates);
        
        return item;
      }
    }

    return false;
  }
}

var store = new Store();

console.log(store.get());
console.log(store.get({ name: "Amazon", email: "andreas.remdt@gmail.com" }));
// console.log(store.create({ name: "ada", password: "214234" }));
// console.log(store.delete(3));
// console.log(store.update(1, { name: "adasd", email: "gfhj" }));