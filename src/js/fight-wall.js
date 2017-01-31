const canvasRun = function(){
  var wall = document.getElementById('fight-wall').getContext('2d');
  wall.fillRect(138,58,30,50);

function init(){
  let pageList = [];
  for(let i = 0; i <= 19; i++){
    pageList.push(new Image());
    let index = (i < 10 ? "0" + i : i);
    pageList[i].src = `../src/assets/2017/a_000${index}.png`;
  }

  let i = -1;
  let timer = setInterval(function(){
    i++;
    draw(pageList[i]);
    if(!pageList[i]){
      i = 0;
    }
  },1000/20)

}

function draw(img) {
  wall.clearRect(0,0,300,300);
  wall.save();
  var time = new Date();
  if(Date.now() % 2 === 0 ){
      wall.translate(1,0);
  }else{
      wall.translate(-1,0);
  }
  wall.fillRect(138,58,30,50);
  wall.restore();
  img && wall.drawImage(img,0,0,300,150);
}

  return init();

}



export default canvasRun;