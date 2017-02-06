// 木偶人对战画面, 效率太低, 废弃;
let Matter = require('matter-js');
 var Engine = Matter.Engine,
     Render = Matter.Render,
     Runner = Matter.Runner,
     Body = Matter.Body,
     Constraint = Matter.Constraint,
     MouseConstraint = Matter.MouseConstraint,
     Mouse = Matter.Mouse,
     World = Matter.World,
     Bodies = Matter.Bodies,
     Composites = Matter.Composites,
     Composite = Matter.Composite,
     Events = Matter.Events;

Composites.Person = function(x, y, ){
  let group = Body.nextGroup(true),
      Person = Composite.create({ label: 'Person'}),
      radius = 2;
  
  var options = { 
    collisionFilter: { 
      group: group 
    },
    chamfer : {
      radius: 4
    }
  }

  let p = {
    x : x || 120,
    y : y || 200,
  }

  let s = {
    head : { w: 60, h: 60},
    neck : { w: 40, h: 10},
    hand : { w: 35, h: 90},
    body : { w: 70, h: 90},
    leg  : { w: 35, h: 90},
  }

  let head      = Bodies.rectangle(p.x, p.y + 30 + s.head.h / 2 , s.head.w, s.head.h, _.cloneDeep(options));

  let neck      = Bodies.rectangle(p.x, head.position.y + s.head.h / 2 + s.neck.h / 2, s.neck.w, s.neck.h, _.cloneDeep(options));

  let body      = Bodies.rectangle(p.x, neck.position.y + s.neck.h /2 + s.body.h / 2 ,s.body.w, s.body.h, _.cloneDeep(options));

  let handleft  = Bodies.rectangle(body.position.x - s.body.w / 2 ,neck.position.y + s.neck.h /2 + s.hand.h / 2,s.hand.w, s.hand.h, _.cloneDeep(options));

  let handright = Bodies.rectangle(body.position.x + s.body.w / 2 ,neck.position.y + s.neck.h /2 + s.hand.h / 2,s.hand.w, s.hand.h, _.cloneDeep(options));
  
  let legleft   = Bodies.trapezoid(body.position.x - s.body.w / 2 + s.leg.w / 2, 4 + body.position.y + s.body.h / 2 + s.leg.h / 2, s.leg.w , s.leg.h,0, _.cloneDeep(options));
  
  let legright  = Bodies.trapezoid(body.position.x + s.body.w / 2 - s.leg.w / 2, 4 + body.position.y + s.body.h / 2 + s.leg.h / 2, s.leg.w , s.leg.h,0, _.cloneDeep(options));

  let ConstraintList = [
    Constraint.create({
        pointA: { x: p.x, y: p.y },
        bodyB: head,
        pointB :{x : 0, y : -s.head.h / 2}
    }),
    Constraint.create({
        pointA: { x: 0, y: s.head.h / 2 },
        bodyA : head,
        bodyB: neck,
        pointB : { x:0, y: -s.neck.h / 2 },
    }),
    Constraint.create({
        pointA: { x: 0, y: s.neck.h / 2 },
        bodyA : neck,
        bodyB: body,
        pointB : { x:0, y:-s.body.h / 2 },
    }),
    Constraint.create({
        pointA: { x: -s.head.w/2, y: +s.head.h/2 },
        bodyA : head,
        bodyB: body,
        pointB : { x: -s.body.w/2, y: -s.body.h/2 },
        stiffness : 0.05,
    }),
    Constraint.create({
        pointA: { x: s.head.w/2, y: +s.head.h/2 },
        bodyA : head,
        bodyB: body,
        pointB : { x: s.body.w/2, y: -s.body.h/2 },
        stiffness : 0.05,
    }),
    Constraint.create({
        pointA: { x: -s.body.w / 4, y: s.body.h / 2 },
        bodyA : body,
        bodyB: legleft,
        pointB : { x: 0, y: -s.leg.h / 2 },
    }),
    Constraint.create({
        pointA: { x: s.body.w / 4, y: s.body.h / 2 },
        bodyA : body,
        bodyB: legright,
        pointB : { x:0, y:-s.leg.h / 2 },
    }),
    Constraint.create({
        pointA: { x: -s.body.w / 2, y: -s.body.h / 2 },
        bodyA : body,
        bodyB: handleft,
        pointB : { x: 0, y: -s.hand.h / 2 },
    }),
    Constraint.create({
        pointA: { x: s.body.w / 2, y: -s.body.h / 2 },
        bodyA : body,
        bodyB: handright,
        pointB : { x: 0, y: -s.hand.h / 2 },
    }),
  ]

  // ConstraintList.map(function(item){
  //   item.render.lineWidth = 0;
  // })

  Composite.add(Person,[
    head,
    neck,
    legleft,
    legright,
    body,
    handleft,
    handright,
  ].concat(ConstraintList))

  return Person;
}

const canvasRun = function(){


    // create engine
    var engine = Engine.create({

    }),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.querySelector('.fight-stage'),
        engine: engine,
        options: {
            width: 800,
            height: 600,
            background: '#0f0f13',
            wireframes : true,
            // showBroadphase : true,
            // showCollisions : true,
            // showPositions : true
        }
    });
    console.log(render);


    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);
    
    // add bodie
    var size = 50,
        x = 50,
        y = 50;

    var partC = Bodies.circle(x, y, 30),
        partD = Bodies.circle(x + size, y, 30),
        partE = Bodies.circle(x + size, y + size, 30),
        partF = Bodies.circle(x, y + size, 30);
        
    let ground = Bodies.circle(120, 250,30);
    
    ground.label = 'enemy'
    let ground1 = Bodies.circle(200, 250,30,{
      restitution: 0.4, 
      angle: -Math.PI * 0.15,
      render: {
        strokeStyle: '#eeeeee',
        fillStyle: '#C44D58'
      }
    });
    ground1.label = 'skill'

    var compoundBodyB = Body.create({
        parts: [partC, partD, partE, partF]
    });

    var constraint = Constraint.create({
        pointA: { x: 120, y: 100 },
        bodyB: ground,
        pointB: { x: 0, y: 0 }
    });

    var constraints = Constraint.create({
        pointA: { x: 120, y: 400 },
        bodyB: ground,
        pointB: { x: 0, y: 0 },
    });

    Body.applyForce(ground1, { x: 10, y: 10 }, {x: 0.05, y: -0.02})  

    // constraint.render.lineWidth = 2
    console.log(Matter.Composites)

    let stage = {
      area : Body.create({
          parts: [
            Bodies.rectangle(400, 0, 800, 5),
            Bodies.rectangle(400, 600, 800, 5),
            Bodies.rectangle(800, 300, 5, 600),
            Bodies.rectangle(0, 300, 5, 600)
          ],
          isStatic: true,
          render : {
            visible: false
          }
      })
    }

    let area = 

    World.add(world, [
        // Composites.car(150, 100, 100 * 0.9, 40 * 0.9, 30 * 0.9),
        // ground, 
        // constraint,
        // constraints,
        ground1,
        // Matter.Bodies.trapezoid(50, 50, 60, 80,0),
        Composites.Person(140,300),
        Composites.Person(640,300),
        stage.area,
    ]);

        var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    setInterval(function(){
      let skill = Bodies.circle(200, 250,30,{
        render: {
          strokeStyle: '#eeeeee',
          fillStyle: '#C44D58'
        }
      });
      skill.label = 'skill'
      Body.applyForce(skill, { x: 10, y: 10 }, {x: 0.1, y: -0.02})  
      World.add(world, skill);
    },1000)

    Events.on(mouseConstraint, "mousedown", function(e){
      console.log(e.mouse.position.x,e.mouse.position.y);
    })

    setTimeout(function(){
      // let test = Bodies.circle(120, 250,60,{restitution: 0.4, angle: -Math.PI * 0.15});
      // World.add(world, [test])
      // setTimeout(function(){
      //   World.remove(world, [test]);
      // },1000)
          console.log(ground1);
    },2000)

    // Matter.Events.on(engine, 'collisionActive', function(e) {
    //   if(!e || !e.pairs || !e.pairs.length){
    //     return ;
    //   }
    //   let len = e.pairs.length;

    //   for(let i = 0;i<len ;i++){
    //     let {bodyA , bodyB} = e.pairs[i];
    //     if(bodyA.label = 'skill'){
    //       World.remove(world, bodyA);
    //     }
    //     if(bodyB.label = 'skill'){
    //       World.remove(world, bodyB);
    //     }
    //   }

    // });

}



export default canvasRun;