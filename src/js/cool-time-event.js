const coolTimeEvent = function(currentCoolTime){

  this.coolTimeTimer && clearInterval(this.coolTimeTimer);

  this.coolTime = currentCoolTime || this.defaultTime;

  this.currentCoolTime = currentCoolTime || this.defaultTime;

  this.coolTimeTimer = setInterval( () => {
    this.coolTime -= 30;
    if(this.coolTime < 0){
      this.coolTime = 0;
      clearInterval(this.coolTimeTimer);
    }
  }, 30);
  
}

export default coolTimeEvent;
