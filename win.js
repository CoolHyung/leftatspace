demo.win = function(){}; //state1 property to our game object that's a function 
demo.win.prototype = {
	preload: function(){ //loading images
	   //game.load.image('image','assets2/menu/win_page.png');
        game.load.image('Return to menu', 'assets/text/Return to menu.png')
        game.load.image('Congratulations on winning', 'assets/text/Congratulations on winning.png')
        game.load.image('Thank you', 'assets/text/Thank you.png');
        game.load.image('LB credit', 'assets/text/Game design and programming.png')
        game.load.image('HL credit', 'assets/text/Programming.png');
        game.load.image('AV credit', 'assets/text/Trailer and programming.png');
        game.load.image('LB', 'assets/text/Lukas Brazdeikis.png');
        game.load.image('HL', 'assets/text/Hyungjoo Lee.png');
        game.load.image('AV', 'assets/text/Angelo Vergara.png');
        game.load.image('Most of the sprites', 'assets/text/Most of the sprites.png');
    },
	create: function(){ //setting initial values for everything

        //var image = game.add.image(0, 0 , 'image');
        //image.scale.setTo(1.2, 1.2);
        
        game.stage.backgroundColor = '#dddddd';
        
        button = game.add.button(dimensionsX/2 + 5, 600, 'Return to menu', actionOntheClick3, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
        var congratulations = game.add.sprite(dimensionsX/2, 150, 'Congratulations on winning');
        congratulations.anchor.setTo(0.5, 0.5);
        
        var thankyou = game.add.sprite(dimensionsX/2, 200, 'Thank you');
        thankyou.anchor.setTo(0.5, 0.5);
        
        var LB_Credit = game.add.sprite(dimensionsX/2 + 68, 350, 'LB credit');
        LB_Credit.anchor.setTo(1, 0.5);
        var LB = game.add.sprite(dimensionsX/2 + 68, 350, 'LB');
        LB.anchor.setTo(0, 0.5);
        
        var HL_Credit = game.add.sprite(dimensionsX/2 + 53, 400, 'HL credit');
        HL_Credit.anchor.setTo(1, 0.5);
        var HL = game.add.sprite(dimensionsX/2 + 53, 400, 'HL');
        HL.anchor.setTo(0, 0.5);
        
        var AV_Credit = game.add.sprite(dimensionsX/2 + 50, 450, 'AV credit');
        AV_Credit.anchor.setTo(1, 0.5);
        var AV = game.add.sprite(dimensionsX/2 + 50, 450, 'AV');
        AV.anchor.setTo(0, 0.5);
        
        var mostOfTheSprites = game.add.sprite(dimensionsX/2 - 150, 525, 'Most of the sprites');
        mostOfTheSprites.anchor.setTo(0, 0.5);
        
        
        

	}, 
	update: function(){ //code run every frame

        
    },
    render: function(){

    }
};




function actionOntheClick3 () {

    music.stop();
    game.state.start('menu');
    


}