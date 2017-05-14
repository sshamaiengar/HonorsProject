var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var ball;
var paddle;
var bricks;

var ballOnPaddle = true;
var lives = 3;
var score = 0;

function preload(){

}

function create(){
	// add the initializing code below
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.checkCollision.down = false;

	var graphics = game.add.graphics(0, 0);
	graphics.beginFill(0x68b0fd, 1);
	graphics.drawCircle(400, 550, 20);
	ball = game.add.sprite(game.world.centerX, 520, graphics.generateTexture());
	graphics.destroy();

	graphics = game.add.graphics(0, 0);
	graphics.beginFill(0xFFFFFF, 1);
	graphics.drawRect(350, 560, 100, 20);
	paddle = game.add.sprite(game.world.centerX,ball.y+20, graphics.generateTexture());
	graphics.destroy();

	//create ball body
	ball.anchor.set(0.5);
	ball.checkWorldBounds = true;
	game.physics.enable(ball, Phaser.Physics.ARCADE);
	ball.body.collideWorldBounds = true;
	ball.body.bounce.set(1);

	//create paddle
	paddle.anchor.setTo(0.5,0.5);
	game.physics.enable(paddle, Phaser.Physics.ARCADE);
	paddle.body.collideWorldBounds = true;
	paddle.body.bounce.set(1);
	paddle.body.immovable = true;
	paddle.body.allowGravity = false;
	paddle.body.enable = true;

	bricks = game.add.group();
	bricks.enableBody = true;
	bricks.physicsBodyType = Phaser.Physics.ARCADE;
	var colors = [0x0000ff, 0x00ff00, 0xff0000, 0xf0f0f0];
	for (var y = 0; y < 4; y++)
	{
		graphics = game.add.graphics(0, 0);
		graphics.beginFill(colors[y], 1);
		graphics.drawRect(350, 560, 40, 20);
	    for (var x = 0; x < 13; x++)
	    {
	        var brick = bricks.create(104 + (x * 46), 100 + (y * 52), graphics.generateTexture());
	        brick.body.bounce.set(1);
	        brick.body.immovable = true;
	    }
	    graphics.destroy();
	}

	scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
	livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
	introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
	introText.anchor.setTo(0.5, 0.5);

	game.input.onDown.add(releaseBall, this);
	ball.events.onOutOfBounds.add(ballLost, this);
}

function update(){
	paddle.x = game.input.x;
	if (paddle.x < 50)
	{
	    paddle.x = 50;
	}
	else if (paddle.x > game.width - 50)
	{
	    paddle.x = game.width - 50;
	}

	if (ballOnPaddle)
    {
        ball.body.x = paddle.x;
    }
    else
    {
        game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
        game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
    }

}

function ballLost () {
    lives--;
    livesText.text = 'lives: ' + lives;
    if (lives === 0)
    {
        ball.body.velocity.setTo(0, 0);
	    introText.text = 'Game Over!';
	    introText.visible = true;
    }
    else
    {
        ballOnPaddle = true;
        ball.reset(paddle.body.x, paddle.y - 20);
    }
}

function releaseBall () {
    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
        introText.visible = false;
    }
}

function ballHitBrick (_ball, _brick) {
    _brick.kill();
    score += 10;
    scoreText.text = 'score: ' + score;
    if (bricks.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = 'score: ' + score;
        introText.text = '- Next Level -';
        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x;
        ball.y = paddle.y - 20;
        bricks.callAll('revive');
    }
}

function ballHitPaddle (_ball, _paddle) {
    var diff = 0;
    if (_ball.x != _paddle.x)
    {
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else
    {
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

}
