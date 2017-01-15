import Vue from 'vue'
import PGET from './js/public-static-get';

Vue.filter('itemKey', function (id, key) {
  let data = PGET(id);
  return data[key] || data;
})