//a state is a scene in a game (main menu, game over, high score states)


demo.state9 = function(){}; //state1 property to our game object that's a function 
demo.state9.prototype = {
	preload: function(){ //loading images
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
	},
	create: function(){ //setting initial values for everything
        
        textArray = [
            'You see the final ubonatium ore needed to start your',
            'ship back up. You go to collect it...',
            '',
            '',
    
            'Releived and exhausted, you head to your ship. You',
            'stop for a moment to think about the mysterious force',
            'that shot you down in the first place. You never did',
            'figure out what caused it in the first place...',
    
            'Anyways, you decide to not push your luck, and head',
            'for your ship immediately. You enter your airlock, and',
            'do all necessary preparations to leave. After everything',
            'is set and ready, you press ENTER to fly away.',
    
            '',
            '',
            '',
            ''
    
        ];


        setUpState(9);
        setupflowers();
        
        MaxNumberOfTimesToPressSpaceToViewText = 2;
        
        totalUnobatiumNeededSoFarToContinueToNextState = 3;
        
        if (statesVisited.includes(currentState) == false){ //Spawn monsters if and only if the player has not been to this state before.
            /*
            game.time.events.add(Phaser.Timer.SECOND * 10, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 15, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 30, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 31, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 32, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 45, timerEvent, this);
            */
            game.time.events.add(Phaser.Timer.SECOND * 45, timerEvent2, this);
        }
        else{
            allMonstersSpawned = true;
        }
        
        addItemsState9();
        
		player = game.add.sprite(spawnX, spawnY, 'player');
		player.anchor.setTo(0.5, 0.5);
        correctOrientationWhenGoingBackToPreviousScene();
        
        cursors = game.input.keyboard.createCursorKeys();
        
        ships = game.add.sprite(1000, 400, 'ship');
        ships.scale.setTo(0.1, 0.1);
        ships.anchor.setTo(0.5, 0.5);
        
        
        
        
        game.physics.enable([player], Phaser.Physics.ARCADE);
        
        player.body.collideWorldBounds = true;
        
        this.game.stateTransition.configure({
            duration: Phaser.Timer.SECOND * 3,
            ease: Phaser.Easing.Sinusoidal.In,
            properties: {
                alpha: 0,
                scale: {
                x: 1,
                y: 1
                }       
            }
        });


	}, 
	update: function(){ //code run every frame
        updateState();
        
        /* add in this part when you add in more scenes
        if (player.body.blocked.right){
            spawnY = player.y;
            changeState(4, 4);
        }
        */
        
        move_between_scenes(9);
        
        nextText()
        
        wintheGame();
    },
    render: function(){

    }
};
/*
function nextText1(){
    game.debug.geom(floor,'#333333');
        
    game.debug.text(textArray[0 + numTabPresses*4], 325, 655, 'white');
    game.debug.text(textArray[1 + numTabPresses*4], 325, 670, 'white');
    game.debug.text(textArray[2 + numTabPresses*4], 325, 685, 'white');
    game.debug.text(textArray[3 + numTabPresses*4], 325, 700, 'white');
    
}
*/
function addItemsState9(){ //items that are added to be picked up in this state. There's a lot of "extra" code here, but new items can be added alongside the "add_item" function call under the if statement.
    
    if (statesVisited.includes(currentState) == false){
        add_item('unobatium ore', 1000, 550, 1);
        statesVisited.push(currentState);
    }
    else{
        firstTimeVisiting = false;
        var listOfItemsNotPickedUpFromLastVisit = TwoDimenionalListOfItemsNotPickedUp[currentState];
        for (i=0; i<listOfItemsNotPickedUpFromLastVisit.length; i++){
            var item = listOfItemsNotPickedUpFromLastVisit[i];
            add_item(item.key, item.x, item.y, 1);
        }
    }
    
}

function wintheGame(){
    if (typeof ships !== 'undefined'){
        player_and_ship_near = isNear(player, ships, 30, 30);
        if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && totalUnobatiumNeededSoFarToContinueToNextState == inventory["unobatium ore"]){
            if (player_and_ship_near){
                this.game.stateTransition.to('win');
            }   
        }
    }
}