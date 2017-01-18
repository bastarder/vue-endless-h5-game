import PublicStaticGet from './public-static-get'

const CreateMonster = function(opt = {}){

  let option = _.cloneDeep(opt);
  
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

  // 处理增幅;
  let amplification = ['$maxHp','$mapMp','$good','$gem','$exp','$atk','$def','$str','$dex','$con','$int']
  _.each(amplification,key => {
    option[key] && (option[key] = Math.ceil(option[key] * option.$elite));
  });

  // 处理初始属性; 
  option.$hp = option.$maxHp;
  option.$mp = option.$maxMp;

  // 对象化 状态,技能;
  !option.$skills && (option.$skills = [1000001])
  option.$skills = _.map(option.$skills,function(id){
    return PublicStaticGet(id);
  });

  option.$status = _.map(option.$status,function(id){
    return PublicStaticGet(id);
  });

  // 删除非必要属性;
  delete option.$elite;
  delete this.$resource;
  delete this.$attrGrow;
  delete this.$package;

  // 合并数据;
  _.assign(this,option);

  // 删除不必要属性;

  
}

export default CreateMonster