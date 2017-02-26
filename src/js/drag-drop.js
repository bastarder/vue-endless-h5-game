const noting = function(from, to){
  if(from.position === to.position && from.index === to.index){
    return true;
  }
}

const destory = function(from, to){
  if(to.position === '$destory'){
    from.cls();
    return true;
  }
}

const equip = function(from, to, hero){
  if(to.position === '$equipments'){
    hero.equip(from.item, from.index, from.position);
    return true;
  }
}

const demount = function(from, to, hero){
  if(from.position === '$equipments'){
    if(to.item && to.item.equipType === from.index){
      hero.equip(to.item, to.index, to.position);
      return true;
    }
  }
}

const merge = function(from, to){
  if(from.item && to.item && (from.item.id === to.item.id) && from.item.pile && to.item.pile){
    to.item.num += from.item.num;
    from.cls();
    // 考虑到可能会加入物品切分功能 所以暂时不用下面的功能;
    // hero.getItem([[from.item.id,from.item.num]], true, to.position);
    return true;
  }
}

const change = function(from, to){
  let T = from.item;
  from.set(to.item);
  to.set(T);
  return true;
}

const initDrop = function(from, to, hero){

  for(let event of [noting, destory, equip, demount, merge, change]){

    let dropResult = event(from, to, hero);

    if(dropResult){

      console.info('[Move Event] From',from,'To',to);

      return dropResult;

    }

  }

}

export default initDrop;