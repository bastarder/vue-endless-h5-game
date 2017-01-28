import Vue from 'vue';
import PGET from './js/public-static-get';
import CONSTANT from './data/constant';

Vue.filter('itemKey', function (id, key) {
  let data = PGET(id);
  return data[key] || data;
})

Vue.filter('heroAttrKey', function (key) {
  return CONSTANT.UNIT_ATTR_NAME[key]
})
