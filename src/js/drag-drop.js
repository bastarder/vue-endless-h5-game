import moveClass from '../js/different-item-move-class'

const noting = function(from, to){
  if(from.position === to.position && from.index === to.index){
    return true;
  }
}

const destory = function(from, to){
  if(to.position === '$destory'){
    from.set();
    return true;
  }
}

const equip = function(from, to, hero){
  if(to.position === '$equipments'){
    hero.equip(from.get(), from.index, from.position);
    return true;
  }
}

const demount = function(from, to, hero){
  if(from.position === '$equipments'){
    if(to.get() && to.get().equipType === from.index){
      hero.equip(to.get(), to.index, to.position);
      return true;
    }
  }
}

const merge = function(from, to){
  if(from.get() && to.get() && (from.get().id === to.get().id) && from.get().pile && to.get().pile){
    to.get().num += from.get().num;
    from.set();
    return true;
  }
}

const change = function(from, to){
  let T = from.get();
  from.set(to.get());
  to.set(T);
  return true;
}

const initDrop = function(from, to, hero){

  from = new moveClass(from);

  to = new moveClass(to);

  for(let event of [noting, destory, equip, demount, merge, change]){

    let dropResult = event(from, to, hero);

    if(dropResult){

      console.info('[Move Event] From',from,'To',to);

      return dropResult;

    }

  }

}

export default initDrop;