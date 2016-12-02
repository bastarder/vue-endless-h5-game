const CreateMonster = function(option = {}){

  // 精英
  if(!option.$elite){
    let rndNum = Math.floor(Math.random() * 100) + 1;
    if(rndNum <= 90){
      option.$elite = 1;
    }else if(rndNum <= 95){
      option.$elite = 1.3
    }else if(rndNum <= 98){
      option.$elite = 1.6
    }else if(rndNum <= 100){
      option.$elite = 2
    }
  }
  // 名称前缀
  if(!option.$nickname){
    if(option.$elite <=1){
      option.$nickname = "普通的"
    }else if(option.$elite <=1.3){
      option.$nickname = "威猛的"
    }else if(option.$elite <=1.6){
      option.$nickname = "发怒的"
    }else if(option.$elite <=2){
      option.$nickname = "变异的"
    }else{
      option.$nickname = "???"
    }
  }

  let amplification = ['$maxHp','$mapMp','$good','$gem','$exp','$atk','$def','$str','$dex','$con','$int']
  

  delete option.$elite;  // 删除精英数据;

  _.assign(this,option);

  delete this.$resource;
  delete this.$attrGrow;
  delete this.$package;
  
}

export default CreateMonster