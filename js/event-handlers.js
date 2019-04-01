import store from './store.js';

export default {
  copy: function (evt) {
    var id = parseInt(evt.target.closest('li').dataset.id);

    navigator.clipboard.writeText(store.get('passwords.id', id).password).then(function () {
      console.log('copied');
    }, function (err) {
      console.log('the fuck happened', err);
    });
  },
  
  duplicate: function() {

  },

  rename: function() {

  }
};