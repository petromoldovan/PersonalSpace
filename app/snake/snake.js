angular.module('app.snake', [
        'ui.router',
        'ui.bootstrap'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('snake', {
            url: '/snake',
            views: {
                "main": {
                    controller: 'snakeCtrl',
                    templateUrl: 'app/snake/snake.tpl.html'
                }
            },
            data: {pageTitle: 'snake'}
        })
    })

    .controller("snakeCtrl", function contactCtrl(){
        //axillary variables
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        var cellWidth = 16;   //single cell width 16px
        var direction = "";
        var food;
        var score=0;
        var snakeBody;

        //canvas dimentions
        var w = 720;
        var h = 640;

        startFunction=function ()
        {
            direction = "right";
            score = 0;
            constructSnake();
            createFood();

            //set the game speed per repetition of the gameCtrl function
            if(typeof gameLoop != "undefined") clearInterval(gameLoop);
            gameLoop = setInterval(gameCtrl, 60);
        }
        startFunction()

        //create snake------------------------------------------------------------------
        function constructSnake()
        {
            var length = 6; //set starting snake length
            snakeBody = [];

            //create snake by pushing elements to snake array
            for(var i = length-1; i>=0; i--){
                snakeBody.push({x: i, y:0});
            }
        }
        //------------------------------------------------------------------------------

        //creating and placing food at random place on the canvas-----------------------
        function createFood()
        {
            food = {
                x: Math.round(Math.random()*(w-cellWidth)/cellWidth),
                y: Math.round(Math.random()*(h-cellWidth)/cellWidth),
            };
        }
        //-------------------------------------------------------------------------------

        //START gameCtrl-----------------------------------------------------------------
        function gameCtrl()
        {
            //format canvas
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = "black";
            ctx.strokeRect(0, 0, w, h);

            //Movement. Pop out the last cell and place it in front of the head
            var headX = snakeBody[0].x;
            var headY = snakeBody[0].y;

            //change x and y of the head cell depending on direction
            if(direction == "right") headX++;
            else if(direction == "left") headX--;
            else if(direction == "up") headY--;
            else if(direction == "down") headY++;

            //restart game if snake hits a wall or itself
            if(headX == -1 || headX == w/cellWidth || headY == -1 || headY == h/cellWidth || checkCanibal(headX, headY, snakeBody)){
                startFunction();
                return;
            }

            //Eat and grow
            if(headX == food.x && headY == food.y)
            {
                //if snake eats add one cell in front of the head
                var tail = {x: headX, y: headY};
                score++;
                //create new food
                createFood();
            }
            else
            {
                //decrease snake when it does not eat by pop() the last element
                var tail = snakeBody.pop();
                tail.x = headX; tail.y = headY;
            }
            //and now add 1 cell in front of the head
            snakeBody.unshift(tail);

            //call snake painting function for each cell in snake
            for(var i = 0; i < snakeBody.length; i++) {
                var c = snakeBody[i];
                snakeColor(c.x, c.y);
            }

            //set score
            var scoreString = "Score: " + score;
            ctx.fillText(scoreString, w-60, h-10);

            //filling for food
            ctx.save();                     //save canvas
            ctx.fillStyle = "transparent";  //set color to transparent to see the pic
            foodImg(food.x, food.y);
            ctx.restore();                  //restore canvas
        }
        //----------------------------------------------------------------------------

        //create food img functio-----------------------------------------------------
        function foodImg(x, y){
            //select food image to be rendered
            if(x>20&&x<35){
                img.src="assets/img/food/appleSmall.png";
            }
            else if(x>35){
                img.src="assets/img/food/frogSmall.png";
            }
            else{
                img.src="assets/img/food/ratSmall.png";
            }
            //set food image and place it randomly on canvas
            ctx.fillStyle =ctx.drawImage(img,x*cellWidth,y*cellWidth);
            ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
        }
        //---------------------------------------------------------------------------

        //snake painting-------------------------------------------------------------
        function snakeColor(x, y)
        {
            ctx.fillStyle = "green";
            ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
            ctx.strokeStyle = "yellow";
            ctx.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
        }
        //---------------------------------------------------------------------------

        //Check if the snake eats itself---------------------------------------------
        function checkCanibal(x, y, snakeArray)
        {
            for(var i = 0; i < snakeArray.length; i++)
            {
                if(snakeArray[i].x == x && snakeArray[i].y == y)
                    return true;
            }
            return false;
        }
        //---------------------------------------------------------------------------

        //controll snake with keyboard-----------------------------------------------
        var handler = function(e){
            var key = e.which;
            if(key == "37" && direction != "right") direction = "left";
            else if(key == "38" && direction != "down") direction = "up";
            else if(key == "39" && direction != "left") direction = "right";
            else if(key == "40" && direction != "up") direction = "down";
        };
        var $doc = angular.element(document);
        $doc.on('keydown', handler);
        //---------------------------------------------------------------------------

    });
