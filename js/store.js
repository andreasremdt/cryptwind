import PASSWORD_DATA from './data.js';

class Store {
  constructor() {
    var handler = {
      set: (obj, prop, value) => {
        obj[prop] = value;

        if (this.__actions__.passwords) {
          this.__actions__.passwords.forEach(f => f());
        }

        return true;
      }
    };

    this.__actions__ = {};
    this.__data__ = new Proxy({
      passwords: new Proxy(PASSWORD_DATA, handler),
      query: "",
      category: ""
    }, handler);
  }

  subscribe(scope, action) {
    if (!this.__actions__.hasOwnProperty(scope)) {
      this.__actions__[scope] = [action];
    } else {
      this.__actions__[scope].push(action);
    }
  }

  unsubscribe(scope) {
    // TODO
  }

  get(accessor, value) {
    var [obj, prop] = accessor.split(/\./);

    return this.__data__[obj].filter(obj => obj[prop] === value)[0];
  }

  get passwords() {
    var temp = this.__data__.passwords.filter((password) => {
      var query = this.__data__.query.toLowerCase();

      if (password.title.toLowerCase().includes(query)) {
        return true;
      }

      if (password.url.toLowerCase().includes(query)) {
        return true;
      }

      if (password.username.toLowerCase().includes(query)) {
        return true;
      }
    });

    if (this.__data__.category !== "") {
      return temp.filter(i => i.category === this.__data__.category);
    }

    return temp;
  }

  set query(value) {
    this.__data__.query = value;
  }

  set category(category) {
    this.__data__.category = category;
  }
}

var store = new Store();
export default store;






// setTimeout(() => {
//   store.__data__.passwords.push({
//     id: 4,
//     title: 'PayPal',
//     username: 'someemail@ada.de',
//     password: '234234',
//     url: 'https://paypal.de',
//     created: new Date()
//   })
// }, 2000);

// setTimeout(() => {
//   store.__data__.passwords.shift()
// }, 5000);