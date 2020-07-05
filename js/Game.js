class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    p1 = createSprite(150,200,50,50);
    p2 = createSprite(150,200,50,50);
    p3 = createSprite(150,200,50,50);
    p4 = createSprite(150,200,50,50);

    players = [p1, p2, p3, p4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var display_position = 180;

      //Index of Array
      var index = 0;

      //X and Y pos of player
      var x = 150;
      var y = 0;

      for(var plr in allPlayers){
        index += 1;
        x = displayWidth + allPlayers[plr].distance;;

        y += 125;

        players[index-1].x = x;
        players[index-1].y = y;

        if(index === player.index){
          players[index-1].shapeColor = 'red';
          camera.position.x = x;
          camera.position.y = y;
        }
       if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");
        //display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, x-70,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && gameState === 1 && player.index !== null){
      console.log(x);
      player.distance +=10
      player.update();
    }
    for(var x =2280; x<3200; x = x+200){
      hurdles = new Hurdle;
      hurdles.spawnHurdle(x, 125);
      hurdleGroup.push(hurdle);
    }
    for(var x =2280; x<3200; x = x+200){
      hurdles = new Hurdle;
      hurdles.spawnHurdle(x, 250);
      hurdleGroup.push(hurdle);
    }
    for(var x =2280; x<3200; x = x+200){
      hurdles = new Hurdle;
      hurdles.spawnHurdle(x, 375);
      hurdleGroup.push(hurdle);
    }
    for(var x =2280; x<3200; x = x+200){
      hurdles = new Hurdle;
      hurdles.spawnHurdle(x, 500);
      hurdleGroup.push(hurdle);
    }


    if(player.distance > 1290){
      gameState = 2;
      game.update(2)
    }

    drawSprites();
  }
}
