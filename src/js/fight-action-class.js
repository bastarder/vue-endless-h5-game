const actionClass = function(){};

actionClass.prototype.change = function(key, value, cover) {
  if(this[key]){
    if(cover){
      this[key] = value;
    }else{
      if(this[key] instanceof Array){
        this[key] = this[key].concat(value);
      }else{
        this[key] += value;
      }
    }
  }else{
    this[key] = value;
  }
}

export default actionClass;