const GetRange = function(opt){
  if (({}).toString.call(opt) === "[object Array]"){
    return _.random.apply(null,opt);
  }
  return opt || 0;
}

const GetRandom = function(opt){
  return Math.random() < opt;
}

export {
  GetRange,
  GetRandom
};