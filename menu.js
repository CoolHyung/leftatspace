/*
This file is the menu of the game. 
*/

var demo = {};
var button;
var background;
var dimensionsX = 1280;
var dimensionsY = 720;
var soundbar;


demo.menu = function(){}; //state0 property to our game object that's a function 
demo.menu.prototype = {
	preload: function(){ 
        game.load.image('start', 'assets/text/start.png');
        game.load.image('up', 'assets2/audio/plus2.png');    
        game.load.image('down', 'assets2/audio/minus2.png');


        game.load.image('background','assets2/menu/spacemenu.png');  

        game.load.image('mountains_and_hills','assets/background/hills_and_mountains_sharp.png');
        game.load.image('grass', 'assets/background/grass_sharp_menu_version.png');
        game.load.image('pillar', 'assets/background/pillar.png');
        game.load.image('straight_single_lightning_line', 'assets/background/straight_single_lightning_line.png');
        game.load.image('big_lightning_ball', 'assets/background/big_lightning_ball.png');
        game.load.image('title', 'assets/text/Leftatspace.png');
        game.load.image('+', 'assets/text/+.png');
        game.load.image('-', 'assets/text/-.png');
        game.load.image('volume', 'assets/text/volume.png');
        
        game.load.image('credits', 'assets/text/credits.png');
        
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);

  }, 

	create: function(){ 
        
        
        this.game.stateTransition.configure({
            duration: Phaser.Timer.SECOND * 1.5,
            ease: Phaser.Easing.Sinusoidal.In,
            properties: {
                alpha: 0,
                scale: {
                x: 1,
                y: 1
                }       
            }
        });
        
        game.stage.backgroundColor = '#182d3b';

        setUpMenuBackground();


        button = game.add.button(dimensionsX/2 + 3, 220, 'start', actionOnClick, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);

        button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(up, this);


        var volBar = game.add.bitmapData(500, 60);
        volBar.ctx.beginPath();
        volBar.ctx.rect(0, 0, 200, 15);
        volBar.ctx.fillStyle = 'grey';
        volBar.ctx.fill();

        soundbar = game.add.sprite(50, 718, volBar);
        soundbar.anchor.setTo(0, 0.5);

        up_volume = game.add.button(265, 681, 'up', increaseVolume, this, 2, 1, 0);
        up_volume.tint = '0x555555';

        down_volume = game.add.button(10, 682, 'down', decreaseVolume, this, 2, 1, 0);
        down_volume.tint = '0x555555';
        
        button = game.add.button(1170, 0, 'credits', actionOnClick2, this, 2, 1, 0);
    
	}
};


function up() {
    return;
}

function over() {
    return;
}

function out() {
    return;
}

function actionOnClick () {

    //background.visible =! background.visible;
    //game.state.start('state' + 0);
    this.game.stateTransition.to('transition');


}

function actionOnClick2 (){
    this.game.state.start('credits');
}

function increaseVolume(){
    if (volumes >= 0.95){
        return
    } 
    else{
        volumes += 0.1;
        soundbar.width += 50;
    }
}
    

function decreaseVolume(){
    if (volumes <= 0.05){
        return
        
    } 
    else{
        volumes -= 0.1
        soundbar.width -= 50;
    }
 
}


function addChangeStateEventListeners(){
	addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
	addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
	addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
	addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
	addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
	addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
	addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
	addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
	addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
	addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
    addKeyCallback(Phaser.Keyboard.SPACEBAR, incrementSpaces, null);
}

function setUpMenuBackground(){ //adds background, text box, grass, and sets world bounds
    game.stage.backgroundColor = '#999999';
    var background1 = game.add.sprite(0,0,'mountains_and_hills');
    var background2 = game.add.sprite(640,0,'mountains_and_hills');

    var grass = game.add.sprite(0,400,'grass');
    
    var big_ball = game.add.sprite(dimensionsX/2, dimensionsY/2 - 150, 'big_lightning_ball');
    big_ball.anchor.setTo(0.5, 0.5);
    
    var topYSide = -73;
    var topYMid = -57;
    
    var lightning_line_a1 = game.add.sprite(dimensionsX/2 + 50, dimensionsY/2 + topYSide, 'straight_single_lightning_line');
    var lightning_line_b1 = game.add.sprite(dimensionsX/2 - 50, dimensionsY/2 + topYSide, 'straight_single_lightning_line');
    var lightning_line_c1 = game.add.sprite(dimensionsX/2, dimensionsY/2 + topYMid, 'straight_single_lightning_line');
    
    var lightning_line_a2 = game.add.sprite(dimensionsX/2 + 50, dimensionsY/2 + topYSide + 64, 'straight_single_lightning_line');
    var lightning_line_b2 = game.add.sprite(dimensionsX/2 - 50, dimensionsY/2 + topYSide + 64, 'straight_single_lightning_line');
    var lightning_line_c2 = game.add.sprite(dimensionsX/2, dimensionsY/2 + topYMid + 64, 'straight_single_lightning_line');
    
    var lightning_line_a3 = game.add.sprite(dimensionsX/2 + 50, dimensionsY/2 + topYSide + 128, 'straight_single_lightning_line');
    var lightning_line_b3 = game.add.sprite(dimensionsX/2 - 50, dimensionsY/2 + topYSide + 128, 'straight_single_lightning_line');
    var lightning_line_c3 = game.add.sprite(dimensionsX/2, dimensionsY/2 + topYMid + 128, 'straight_single_lightning_line');
    
    var pillar1 = game.add.sprite(dimensionsX/2 + 14, dimensionsY/2 + topYSide + 192 - 4, 'pillar');
    var pillar2 = game.add.sprite(dimensionsX/2 - 36, dimensionsY/2 + topYMid + 192 - 4, 'pillar');
    var pillar3 = game.add.sprite(dimensionsX/2 - 86, dimensionsY/2 + topYSide + 192 - 4, 'pillar');
    
    var title = game.add.sprite(dimensionsX/2, 40, 'title');
    title.anchor.setTo(0.5, 0.5);
    
    //var volumeText = game.add.sprite(100, 630, 'volume');
}