const coolTimeEvent = function(currentCoolTime){

  this.coolTimeTimer && clearInterval(this.coolTimeTimer);

  this.coolTime = currentCoolTime || this.defaultTime;

  this.currentCoolTime = currentCoolTime || this.defaultTime;

  this.coolTimeTimer = setInterval( () => {
    this.coolTime -= 10;
    if(this.coolTime < 0){
      this.coolTime = 0;
      clearInterval(this.coolTimeTimer);
    }
  }, 9);
  
}

export default coolTimeEvent;
