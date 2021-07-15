/*
This is a transtition game state. The only purpose of this file is to provide a fade-effect when pressing the start button in the menu screen. This file transtitions between 'menu' and 'state0'.
*/

demo.transition = function(){}; //state0 property to our game object that's a function 
demo.transition.prototype = {
	preload: function(){ 
        
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);

  }, 

	create: function(){ 
        
        
        this.game.stateTransition.configure({
            duration: Phaser.Timer.SECOND * 1,
            ease: Phaser.Easing.Exponential.InOut,
            properties: {
                alpha: 0,
                scale: {
                x: 1,
                y: 1
                }       
            }
        });
        
        game.stage.backgroundColor = '#80a45f';
        
        game.time.events.add(Phaser.Timer.SECOND * 1.5, transitionState0, this);
        

        
    
	}
};

function transitionState0(){
    this.game.stateTransition.to('state0');
}



