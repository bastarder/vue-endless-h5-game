import Fight from './fight';

const MonsterAI = function(){
  
  this.startTimer = null;

  this.start = function(){
    
  };

  this.end = function(){
    clearInterval(this.startTimer);
  };
}

export default MonsterAI;