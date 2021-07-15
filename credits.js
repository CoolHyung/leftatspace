/*
This state represents the credits page on the main menu
*/

demo.credits = function(){}; //state1 property to our game object that's a function 
demo.credits.prototype = {
	preload: function(){ //loading images
	   //game.load.image('image','assets2/menu/win_page.png');
        game.load.image('Return to menu', 'assets/text/Return to menu.png')
        game.load.image('LB credit', 'assets/text/Game design and programming.png')
        game.load.image('HL credit', 'assets/text/Programming.png');
        game.load.image('AV credit', 'assets/text/Trailer and programming.png');
        game.load.image('LB', 'assets/text/Lukas Brazdeikis.png');
        game.load.image('HL', 'assets/text/Hyungjoo Lee.png');
        game.load.image('AV', 'assets/text/Angelo Vergara.png');
        game.load.image('Game made as part of', 'assets/text/Game made as part of.png');
        game.load.image('Sprites', 'assets/text/Sprites.png');
        game.load.image('Penusbmic', 'assets/text/Penusbmic.png');
        game.load.image("Most of the sprites", "assets/text/Most of the sprites.png");
    },
	create: function(){ //setting initial values for everything

        //var image = game.add.image(0, 0 , 'image');
        //image.scale.setTo(1.2, 1.2);
        
        game.stage.backgroundColor = '#dddddd';
        
        button = game.add.button(dimensionsX/2, 600, 'Return to menu', actionOntheClick, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
        
        var LB_Credit = game.add.sprite(dimensionsX/2 + 65, 200, 'LB credit');
        LB_Credit.anchor.setTo(1, 0.5);
        var LB = game.add.sprite(dimensionsX/2 + 65, 200, 'LB');
        LB.anchor.setTo(0, 0.5);
        
        var HL_Credit = game.add.sprite(dimensionsX/2 + 53, 250, 'HL credit');
        HL_Credit.anchor.setTo(1, 0.5);
        var HL = game.add.sprite(dimensionsX/2 + 53, 250, 'HL');
        HL.anchor.setTo(0, 0.5);
        
        var AV_Credit = game.add.sprite(dimensionsX/2 + 50, 300, 'AV credit');
        AV_Credit.anchor.setTo(1, 0.5);
        var AV = game.add.sprite(dimensionsX/2 + 50, 300, 'AV');
        AV.anchor.setTo(0, 0.5);
        
        var mostOfTheSprites = game.add.sprite(dimensionsX/2 - 160, 385, 'Most of the sprites');
        mostOfTheSprites.anchor.setTo(0, 0.5);
        
        var gameMadeAsPartOf = game.add.sprite(dimensionsX/2, 425, 'Game made as part of');
        gameMadeAsPartOf.anchor.setTo(0.5, 0.5);
        

        

	}, 
	update: function(){ //code run every frame

        
    },
    render: function(){

    }
};




function actionOntheClick () {

  //background.visible =! background.visible;
  game.state.start('menu');


}