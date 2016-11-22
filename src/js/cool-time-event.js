const coolTimeEvent = function(currentCoolTime){
  var self = this;
  self.coolTimeTimer && clearInterval(self.coolTimeTimer);
  self.coolTime = currentCoolTime || self.defaultTime;
  self.currentCoolTime = currentCoolTime || self.defaultTime;
  self.coolTimeTimer = setInterval(function(){
    self.coolTime -= 10;
    if(self.coolTime < 0){
      self.coolTime = 0;
      clearInterval(self.coolTimeTimer);
    }
  },9);
}

export default coolTimeEvent;
