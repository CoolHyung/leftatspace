//a state is a scene in a game (main menu, game over, high score states)




demo.state1 = function(){}; //state1 property to our game object that's a function 
demo.state1.prototype = {
	preload: function(){ //loading images

	},
	create: function(){ //setting initial values for everything
        
        textArray = [
            'There is a health bar at the top to show your status.',
            'If the healthbar is completely reduced, you will die.',
            'Once you collect healing crystals, you can press Q to',
            'consume...',
            
            'You find a bone to craft a spike trap. Collect it.',
            '\(press F to collect\)...',
            '',
            '',
    
            'You can craft some sort of trap against unknown danger.',
            'You can press E to place down a trap...',
            '',
            '',
    
            'Press SPACE to swing the dagger. Press and hold SHIFT',
            'to sprint.',
            '',
            '',
    
            '',
            '',
            '',
            ''
    
        ];
        
        
        
        MaxNumberOfTimesToPressSpaceToViewText = 4;
        AllTextHasBeenViewed = false;
        totalUnobatiumNeededSoFarToContinueToNextState = 0;
        

		
        
        setUpState(1);
        
        if (statesVisited.includes(currentState) == false || levelsCleared.includes(currentState) == false){ //Spawn monsters if the player has not been to the state before or if this state was not cleared during last visit.
            game.time.events.add(Phaser.Timer.SECOND * 15, timerEvent, this);
            game.time.events.add(Phaser.Timer.SECOND * 15, timerEvent2, this);
        }
        else{
            allMonstersSpawned = true;
        }
 		
        
        addItemsState1();
        
        //state1
        
        
        
        flowers = game.add.group();
        
        
        var flowers2 = flowers.create(520, 460, 'flowers2');
        
        var flowers1 = flowers.create(230, 460, 'flowers');
        
        var flowers2 = flowers.create(480, 480, 'flowers2');
        
        var flowers1 = flowers.create(480, 450, 'flowers');

        var flowers2 = flowers.create(230, 530, 'flowers2');
        
        var flowers1 = flowers.create(250, 520, 'flowers');
        
        var flowers1 = flowers.create(0, 470, 'flowers');
        
        var flowers2 = flowers.create(10, 450, 'flowers2');
        
        
        objects = game.add.group();
        objects.enableBody = true;
        
        var rock1 = objects.create(900, 440, 'rock1');
        rock1.body.immovable = true;
        
        var rock1 = objects.create(200, 420, 'rock1');
        rock1.body.immovable = true;
        
        var rock1 = objects.create(1190, 490, 'rock1');
        rock1.body.immovable = true;
        
        var rock1 = objects.create(20, 500, 'rock1');
        rock1.body.immovable = true;
        
        var tree1 = objects.create(770, 420, 'tree1');
        tree1.body.immovable = true;
        
        var tree2 = objects.create(130, 425, 'tree2');
        tree2.body.immovable = true;
        
        var tree1 = objects.create(190, 425, 'tree1');
        tree1.body.immovable = true;
        
        var tree2 = objects.create(750, 425, 'tree2');
        tree2.body.immovable = true;
        
        var tree1 = objects.create(300, 420, 'tree1');
        tree1.body.immovable = true;
        
        var tree2 = objects.create(260, 430, 'tree2');
        tree2.body.immovable = true;
        
        
        
        

        
		player = game.add.sprite(spawnX, spawnY, 'player');
		player.anchor.setTo(0.5, 0.5);
        
        correctOrientationWhenGoingBackToPreviousScene();
        
        cursors = game.input.keyboard.createCursorKeys();
        
        game.physics.enable([player], Phaser.Physics.ARCADE);
        
        player.body.collideWorldBounds = true;
        
        
        
        
        
        
        

	}, 
	update: function(){ //code run every frame
        
        updateState();
        
        
        
        move_between_scenes(1);
        
        nextText();
        
        killMonster();
        
        

        //health.width = barWidth - barWidth/life;
        
        

    },
    render: function(){
        /*
        game.debug.body(player);
        if (spikes !== undefined){
            game.debug.body(spikes);
        }
        if (mummyGroup !== undefined){
            closestMonster = mummyGroup.getClosestTo(player);
            if (closestMonster !== null){
                game.debug.body(closestMonster);
            }
            
        }
        */
    }
};
/*
function nextText1(){
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

function addItemsState1(){ //items that are added to be picked up in this state. There's a lot of "extra" code here, but new items can be added alongside the "add_item" function call under the if statement.
    
    
    if (statesVisited.includes(currentState) == false){
        add_item('bone', 200, 500, 1);
        add_item('healing crystal', 250, 550, 1);
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



function setupflowers(){ //places plants in the state
    objects = game.add.group();
    objects.enableBody = true;

    var maxX = 1136
    var maxY = 640
    var minX = 0
    var minY = 410
    
    
    
    flowers = game.add.group();
    var f1x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var f2x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var f3x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var f4x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var f5x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var f1y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var f2y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var f3y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var f4y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var f5y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    var flowers1 = flowers.create(f1x, f1y, 'flowers2');
    flowers1.anchor.setTo(0,1);

    var flowers2 = flowers.create(f2x, f2y, 'flowers');
    flowers2.anchor.setTo(0,1);

    var flowers3 = flowers.create(f3x, f3y, 'flowers2');
    flowers3.anchor.setTo(0,1);

    var flowers4 = flowers.create(f4x, f4y, 'flowers');
    flowers4.anchor.setTo(0,1);

    var flowers5 = flowers.create(f5x, f5y, 'flowers2');
    flowers5.anchor.setTo(0,1);

    var flowers6 = flowers.create(f2x, f3y, 'flowers');
    flowers6.anchor.setTo(0,1);

    var flowers7 = flowers.create(f1x, f4y, 'flowers');
    flowers7.anchor.setTo(0,1);

    var flowers8 = flowers.create(f3x, f5y, 'flowers2');
    flowers8.anchor.setTo(0,1);
    
    

    var t1x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var t2x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var t3x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var t4x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var t5x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var t1y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var t2y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var t3y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var t4y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var t5y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    var r1x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var r2x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var r3x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var r4x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var r5x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var r1y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var r2y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var r3y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var r4y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    var r5y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    
    
    var rock1 = objects.create(r1x, r2y, 'rock1');
    rock1.anchor.setTo(0,1);
    rock1.body.immovable = true;

    var rock2 = objects.create(r2x, r2y, 'rock1');
    rock2.anchor.setTo(0,1);
    rock1.body.immovable = true;

    var rock3 = objects.create(r3x, r3y, 'rock1');
    rock3.anchor.setTo(0,1);
    rock1.body.immovable = true;

    var rock4 = objects.create(r4x, r4y, 'rock1');
    rock4.anchor.setTo(0,1);
    rock1.body.immovable = true;

    var tree1 = objects.create(t1x, t1y, 'tree1');
    tree1.anchor.setTo(0,1);
    tree1.body.immovable = true;

    var tree2 = objects.create(t2x, t2y, 'tree2');
    tree2.anchor.setTo(0,1);
    tree2.body.immovable = true;

    var tree3 = objects.create(t3x, t3y, 'tree1');
    tree3.anchor.setTo(0,1);
    tree3.body.immovable = true;

    var tree4 = objects.create(t4x, t4y, 'tree2');
    tree4.anchor.setTo(0,1);
    tree4.body.immovable = true;

    var tree5 = objects.create(t5x, t5y, 'tree1');
    tree5.anchor.setTo(0,1);
    tree5.body.immovable = true;

    


    
}
