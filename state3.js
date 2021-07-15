//a state is a scene in a game (main menu, game over, high score states)

demo.state3 = function(){}; //state1 property to our game object that's a function 
demo.state3.prototype = {
	preload: function(){ //loading images

	},
	create: function(){ //setting initial values for everything
        
        textArray = [
            'Your end goal is to rebuild your ship to head home. Ship',
            'components are scattered around the map for you to explore.',
            'The minimap will tell you when monsters come. Your sword is',
            'not strong enough to fight off the monsters so you will have...',
    
            'to set traps. Like your ship, traps can be built from items',
            'scattered across the map. Good luck...',
            '',
            '',
    
            '*Insert crafting guide tutorial*',
            '',
            '',
            '',
    
            '',
            '',
            '',
            ''
    
        ];
        

        totalUnobatiumNeededSoFarToContinueToNextState = 1;
        
        setUpState(3);
        

        setupflowers();
        
        if (statesVisited.includes(currentState) == false){ //Spawn monsters if and only if the player has not been to this state before.
            game.time.events.add(Phaser.Timer.SECOND * 7, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 10, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 12, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 12, timerEvent2, this);
        }
        else{
            allMonstersSpawned = true;
        }
        
        addItemsState3();
        

		player = game.add.sprite(spawnX, spawnY, 'player');
		player.anchor.setTo(0.5, 0.5);
        correctOrientationWhenGoingBackToPreviousScene();
        
        cursors = game.input.keyboard.createCursorKeys();
        
        
        
        game.physics.enable([player], Phaser.Physics.ARCADE);
        
        player.body.collideWorldBounds = true;

        

	}, 
	update: function(){ //code run every frame
        updateState()
        
        move_between_scenes(3);
        
        inventoryUI();
        
        
    },
    render: function(){

    }
};



function addItemsState3(){ //items that are added to be picked up in this state. There's a lot of "extra" code here, but new items can be added alongside the "add_item" function call under the if statement.
    
    
    if (statesVisited.includes(currentState) == false){
        add_item('healing crystal', 200, 500, 1);
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