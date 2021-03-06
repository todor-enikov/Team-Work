Game.Controls = {
    // Add all event listeners
    bind: function () {
        $(window).on('load', function () {
            Game.Timer.timerBreak = false;
        });

        Game.game_wrap.on('click', '.btn', function () {
            var btn = $(this),
                game_screen = $(btn).attr('data-nav');

            Game.game_wrap.removeClass('active');
            Game.game_wrap.html('');
           // if(btn[0].id == 'back-button'){
                //stops when button back is clicked
           //     Game.Timer.timerBreak = true;
            //}
            setTimeout(function () {
                Game.Screen.load(game_screen);
            }, 500);
        });

        Game.game_wrap.on('click', '#back-button', function () {
            Game.Timer.timerBreak = true;
        });

        Game.game_wrap.on('click', '.btn-level', function () {
            var btn = $(this),
                level = $(btn).attr('data-level');
            Game.level = level;
        });

        Game.game_wrap.on('click', '.mouse-btn', function () {
            var mouse = $(this),
                mouse_id = $(mouse).find('.mouse').attr('id');

            $(mouse).addClass('active')
                    .siblings().removeClass('active');
            Game.mouse.id = mouse_id;
        });

      
        $('#home-button, #load-button').on('click', function () {
            var btn = $(this),
                game_screen = $(btn).attr('data-nav');

            Game.game_wrap.removeClass('active');
            Game.game_wrap.html('');
            $(this).parents('#popup').addClass('hidden');

            setTimeout(function () {
                Game.Screen.load(game_screen);
            }, 500);
        });


        // Add event listeners for arrow buttons
        $(window).on('keydown', function (e) {
            var forest = $('#forest');
            if (!forest || forest.length < 1) {
                return;
            }
            Game.Controls.keyDown(e);
        });
    }


  , keyDown: function (e) {
      var ctx_mouse = Game.Canvas.mouse.getContext('2d'),
          ctx_cheese = Game.Canvas.cheese.getContext('2d'),
          width = Game.Canvas.forest.width,
          height = Game.Canvas.forest.height,
          x = Game.mouse.coords[0],
          y = Game.mouse.coords[1],
          dx = Game.Canvas.step,
          dy = Game.Canvas.step,
          map = Game.currentLevelPlayed,
          keyCodeToDirs = {
              "37": 2,
              "38": 3,
              "39": 0,
              "40": 1
          },
          dirsToMouseRotation = {
              0: "right",
              1: "down",
              2: "left",
              3: "up"
          },
          notAllowedPositions = ["g", "x", "bl", "na", "or", "gr", 1],
          mouse_sound = Game.Sound.init("../sounds/mouse eating.mp3"),
          target_reached_sound = Game.Sound.init("../sounds/successful.mp3"),
       dirDeltas = [{
           "x": +Game.Canvas.step,
           "y": 0
       }, {
           "x": 0,
           "y": Game.Canvas.step
       }, {
           "x": -Game.Canvas.step,
           "y": 0
       }, {
           "x": 0,
           "y": -Game.Canvas.step
       }];

      if (!keyCodeToDirs.hasOwnProperty(e.keyCode)) {
          console.log("Wrong dir");
          return;
      }

      var dir = keyCodeToDirs[e.keyCode];
      var mouseNextX = x + dirDeltas[dir].x;
      var mouseNextY = y + dirDeltas[dir].y;

      if (mouseNextY < 0 || mouseNextY >= height || mouseNextX < 0 || mouseNextX >= width)
          return;

      var mapNextPosition = map[mouseNextY / Game.Canvas.step][mouseNextX / Game.Canvas.step];

      if (notAllowedPositions.indexOf(mapNextPosition) == -1 ||
          (mapNextPosition == 1 && (
            (mouseNextY + dirDeltas[dir].y) / Game.Canvas.step < map.length &&
            (mouseNextX + dirDeltas[dir].x) / Game.Canvas.step < map[0].length &&
            (mouseNextY + dirDeltas[dir].y) >= 0 &&
            (mouseNextX + dirDeltas[dir].x) >= 0)

          &&

          ( map[(mouseNextY + dirDeltas[dir].y) / Game.Canvas.step][(mouseNextX + dirDeltas[dir].x) / Game.Canvas.step] == 0 ||
            map[(mouseNextY + dirDeltas[dir].y) / Game.Canvas.step][(mouseNextX + dirDeltas[dir].x) / Game.Canvas.step] == 'p')))
      {

          //updates the position of the mouse
          ctx_mouse.clearRect(Game.mouse.coords[0], Game.mouse.coords[1], dx, dy);
          Game.mouse.coords[0] = mouseNextX;
          Game.mouse.coords[1] = mouseNextY;
          Game.Draw.Mouse(ctx_mouse, [Game.mouse.coords[0], Game.mouse.coords[1]], dirsToMouseRotation[dir]);
          mouse_sound.play();

          //updates position of the cheese
          if (map[mouseNextY / Game.Canvas.step][mouseNextX / Game.Canvas.step] == 1) {
              //gives points when cheese is on target
              console.log("I'm here!!!!");

              function findTargetOfNextNext(target) {
                  return target.row == (mouseNextY + dirDeltas[dir].y) / Game.Canvas.step && target.col == (mouseNextX + dirDeltas[dir].x) / Game.Canvas.step;
              }

              function findTagetOfNext(target) {
                  return target.row == mouseNextY / Game.Canvas.step &&
                         target.col == mouseNextX / Game.Canvas.step;
              }

              var indexOfTargetNextNext = Game.Canvas.targets.find(findTargetOfNextNext);
              var indexOfTargetNext = Game.Canvas.targets.find(findTagetOfNext);

              //adds score if cheese is on a target for the first time
              if (indexOfTargetNextNext != undefined && indexOfTargetNext == undefined) {
                  Game.Canvas.score += 10;
                  Game.Canvas.remaining -= 1;
                  Game.Canvas.collected += 1;
                  target_reached_sound.play();
                  Game.Controls.updateStats();
              }

              if (indexOfTargetNextNext == undefined && indexOfTargetNext != undefined) {
                  //removes scores if cheese leaves target
                  Game.Canvas.score -= 10;
                  Game.Canvas.remaining += 1;
                  Game.Canvas.collected -= 1;

                  Game.Controls.updateStats();
              }

              //update cheese new location on map
              map[mouseNextY / Game.Canvas.step][mouseNextX / Game.Canvas.step] = 0;
              map[(mouseNextY + dirDeltas[dir].y) / Game.Canvas.step][(mouseNextX + dirDeltas[dir].x) / Game.Canvas.step] = 1;
              ctx_cheese.clearRect(Game.mouse.coords[0], Game.mouse.coords[1], dx, dy);
              Game.Canvas.setCheese(ctx_cheese, Game.Canvas.step);
              //checks if it is on point and add points to score
          }

          //counts the move
          Game.mouse.moves += 1;
          $('#moves').text(Game.mouse.moves);

          if (Game.Canvas.remaining == 0) {
              Game.Timer.timerBreak = false;
              var message = "You made it! Game over! Your score is " + Game.Canvas.score;
              Game.Controls.showPopup(message);
          }
      }

  }


  , showPopup: function (message) {
      $('#popup .message').text(message);
      $('#popup').removeClass('hidden');
  }


  , updateStats: function () {
      $("#score").text(Game.Canvas.score);
      $("#remaining").text(Game.Canvas.remaining);
      $("#collected").text(Game.Canvas.collected);
  }


}
