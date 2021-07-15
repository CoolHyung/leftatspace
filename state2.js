//a state is a scene in a game (main menu, game over, high score states)



demo.state2 = function(){}; //state1 property to our game object that's a function 
demo.state2.prototype = {
	preload: function(){ //loading images


	},
	create: function(){ //setting initial values for everything
        
        textArray = [
            'Your end goal is to refuel your ship to head home. Ship',
            'fuel is found in the form of unobatium ore and is scattered',
            'around the map for you to explore. You need a total of 3 ores',
            'to have enough fuel to head back home...',
    
            'Your sword is technically strong enough to kill the monsters,',
            'but it is recommended to set traps in the later stages.',
            'Good luck.',
            '',
    
            '',
            '',
            '',
            '',
    
            '',
            '',
            '',
            ''
            
    
        ];
        
        MaxNumberOfTimesToPressSpaceToViewText = 2;
        AllTextHasBeenViewed = false;
        totalUnobatiumNeededSoFarToContinueToNextState = 1;
        
        setUpState(2);
        

		if (statesVisited.includes(currentState) == false){ //Spawn monsters if and only if the player has not been to this state before.
            game.time.events.add(Phaser.Timer.SECOND * 8, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 12, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 14, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 16, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 16, timerEvent2, this);
        }
        else{
            allMonstersSpawned = true;
        }
        
        addItemsState2();
        
        
        flowers = game.add.group();
        
        var flowers2 = flowers.create(920, 490, 'flowers2');
        
        var flowers1 = flowers.create(230, 510, 'flowers');
        
        var flowers2 = flowers.create(480, 540, 'flowers2');

        var flowers1 = flowers.create(480, 400, 'flowers');

        var flowers2 = flowers.create(730, 450, 'flowers2');
        
        var flowers1 = flowers.create(250, 400, 'flowers');
        
        var flowers1 = flowers.create(0, 480, 'flowers');
        
        var flowers2 = flowers.create(810, 450, 'flowers2');
        
        objects = game.add.group();
        objects.enableBody = true;
        
        var rock1 = objects.create(300, 450, 'rock1');
        rock1.body.immovable = true;
        
        var rock1 = objects.create(410, 440, 'rock1');
        rock1.body.immovable = true;
        
        var rock1 = objects.create(130, 450, 'rock1');
        rock1.body.immovable = true;
        
        var tree1 = objects.create(300, 410, 'tree1');
        tree1.body.immovable = true;
        
        var tree2 = objects.create(90, 425, 'tree2');
        tree2.body.immovable = true;
        
        player = game.add.sprite(spawnX, spawnY, 'player');
		player.anchor.setTo(0.5, 0.5);
        correctOrientationWhenGoingBackToPreviousScene();
        
        cursors = game.input.keyboard.createCursorKeys();
        
        
        game.physics.enable([player], Phaser.Physics.ARCADE);
        
        
        player.body.collideWorldBounds = true;
        
        
        monster_over_traps();
	}, 
	update: function(){ //code run every frame
        updateState();
        
        move_between_scenes(2);
        
        nextText();
        
        /*player_and_monster_near = isNear(player, mummy, 20, 20);
        
        if(player_and_monster_near){ 
            if(mummy.active){
                barWidth = health.width;
                damage = 100;
                health.width = barWidth - barWidth/damage;
            }
        }*/
        
        
        
    },
    render: function(){
    }
};
/*
function nextText2(){
    game.debug.geom(floor,'#333333');
    if (hasDiedStates3to9){
        return;
    }
    game.debug.text(textArray[0 + numSpacePresses*4], 325, 655, 'white');
    game.debug.text(textArray[1 + numSpacePresses*4], 325, 670, 'white');
    game.debug.text(textArray[2 + numSpacePresses*4], 325, 685, 'white');
    game.debug.text(textArray[3 + numSpacePresses*4], 325, 700, 'white');
    
}
*/

function addItemsState2(){ //items that are added to be picked up in this state. There's a lot of "extra" code here, but new items can be added alongside the "add_item" function call under the if statement.
    
    if (statesVisited.includes(currentState) == false){
        add_item('bone', 200, 500, 1);
        add_item('unobatium ore', 1200, 525, 1);
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