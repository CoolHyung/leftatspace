/*
This is state0 of the game. This is where all sprites and audio are preloaded into the game. This is also where the vast majority of functions exist that are used throughout all other states of the game.
*/


// global variables are initialized below
var gameWidth = 1280, gameHeight = 720;
var player, iron, mummy, sword, ship, floor, spikes, healing_crystal;
var music;
var cursors;
var listOfItemsNotPickedUp = [];
var velocity = 175;
var spawnY = 450;
var spawnX = gameWidth/2;
var anim_chain_attack, hit_attack;
var text1 = '';
var text2 = '';
var text3 = '';
var text4 = '';
var textArray;
var numTabPresses = 0;
var inventory = {
    "bone": 1,
    "rope": 0,
    "rock": 0,
    "chain": 0,
    "dagger": 0,
    "healing crystal": 0,
    "unobatium ore": 0
};
var dead = [];
var movementMade = false;
var hasChangedScenesAtLeastOnce = false;
var currentState = 0;
var statesVisited = [];
var firstTimeVisiting = true;
var TwoDimenionalListOfItemsNotPickedUp = [];
var MaxNumberOfTimesToPressSpaceToViewText = 4;
var AllTextHasBeenViewed = false;

var volumes = 1;
var globalhealth = 500;
var maxglobalhealth = 500;
var gamebar, mummyGamebar, mummyHealthBar;

var justDied = false;
var hasDiedState1 = false;
var hasDiedState2 = false;
var hasDiedStates3to9 = false;

var currentlyBeingHit = false;

var respawning = false;
var immune = false;

var allMonstersSpawned = true;
var previousMummySpeed;

var totalUnobatiumNeededSoFarToContinueToNextState = 0;

var levelsCleared = [];


//var mummyHealth = 100;





demo.state0 = function(){}; 
demo.state0.prototype = {
	preload: function(){ //loading images and audio into the game
		
        
        game.load.image('player', 'assets/sprites/player_idle_sharp.png');
        game.load.spritesheet('player_dying_animations', 'assets/sprites/Hero/Sprites/damaged_death.png', 256, 128);
        
        game.load.image('mountains_and_hills','assets/background/hills_and_mountains_sharp.png');
        game.load.image('grass', 'assets/background/grass_sharp.png');
        game.load.image('gray_bar', 'assets/background/dark_tile_sharp.png');
        
        game.load.spritesheet('monster','assets/sprites/Toaster_Bot/idle.png', 212, 44);
        game.load.image('iron', 'assets/sprites/iron2.png');
        game.load.image('sword', 'assets/sprites/sword2.png');
        game.load.spritesheet('attack','assets/spritesheets/Chain_Attack_sharp.png',256,128);
        game.load.image('ship', 'assets/sprites/ship3.png');
        game.load.image('dagger', 'assets/sprites/items/Icons_27.png');
        
        game.load.image('bone', 'assets/sprites/items/Icons_40.png');
        game.load.image('chain', 'assets/sprites/items/Icons_10.png');
        game.load.image('rope', 'assets/sprites/items/Icons_25.png');
        game.load.image('rock', 'assets/sprites/items/Icons_36.png');
        
        game.load.image('spikes', 'assets/spritesheets/5 Spikes/5.png');
        
        //visual sprites that does not have any function
        game.load.image('tree1', 'assets/background/tree1.png');	
        game.load.image('tree2', 'assets/background/tree2.png');	
        game.load.image('rock1', 'assets/background/rock1.png');	
        game.load.image('rock2', 'assets/background/rock2.png');	
        game.load.image('river','assets/background/river.png');
        game.load.image('tent','assets/background/tent.png')	
        game.load.image('flowers', 'assets/background/flowers.png');	
        game.load.image('flowers2', 'assets/background/flowers2.png');
        
        game.load.image('healing crystal', 'assets/sprites/items/Icons_24.png');
        game.load.image('unobatium ore', 'assets/sprites/items2/Icon_09.png')
        
        //audio files
        game.load.audio('uneasymp3', 'assets/audio/BGM1.mp3');
        game.load.audio('slash', 'assets/audio/swordslash2.mp3');
        game.load.audio('monsterdying', 'assets/audio/Monster-dying.mp3');
        game.load.audio('craft', 'assets2/audio/craft1.mp3');
        game.load.audio('playerdead', 'assets2/audio/player_dead.mp3')
        game.load.audio('potion', 'assets2/audio/potion.mp3')
        game.load.audio('whack', 'assets2/audio/whack.mp3')
        
        //game.load.bitmapFont('Font', 'assets2/font/Custom-Font.ttf');
        
        
    }, 
    
    

	create: function(){ //placing sprites and setting up audio. This function represents all code that is run at the start of the game.
        
        if (justDied == false){
            textArray = [
                'You were on a spaceship which has been shot down by a mysterious force.',
                'You find yourself on a strange, unknown planet. Miraculously, you find',
                'yourself uninjured. Perhaps the fact that you\'re uninjured has something',
                'to do with this mysterious force \(press tab to continue text\)...',

                'Note: anytime an ellipse appears at the end of the text, you can press',
                'tab to view more text...',
                '',
                '',

                'Suddenly, you hear something freightening in the distance. You look around',
                'and see a rusty dagger. You decided to arm yourself in case something comes',
                'to attack you later on.\(use WASD to move and press F to pick up',
                'an item\)...',

                'You decide to move to the right border.',
                '',
                '',
                '',

                '',
                '',
                '',
                ''

            ];
        }
        
        
        allMonstersSpawned = true;
        totalUnobatiumNeededSoFarToContinueToNextState = 0;
        
        volumes *= 0.3;
        
        if (justDied){
            initialize_variables_on_respawn();
            music.stop();
        }
        
        currentState = 0;

        addChangeStateEventListeners();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
	    //addKeyCallback(Phaser.Keyboard.X, attack, null);//initialize attack upon pressing X	
        	
        game.physics.startSystem(Phaser.Physics.ARCADE);

        setUpBackground();
        
        addItemsState0();
        
        
        
        ship = game.add.sprite(175, 425, 'ship');
        ship.scale.setTo(0.1, 0.1);
        
        objects = game.add.group();
        objects.enableBody = true;
          
        var tree1 = objects.create(650, 350, 'tree1');
        tree1.body.immovable = true;
        
        var tree2 = objects.create(130, 425, 'tree2');
        tree2.body.immovable = true;
       
        var rock1 = objects.create(420, 560, 'rock1');
        rock1.body.immovable = true;
        
        var rock1 = objects.create(1000, 500, 'rock1');
        rock1.body.immovable = true;
        
        var river = objects.create(20, 394, 'river');
        river.body.immovable = true;
        
        //flowers that you can walk over
        flowers = game.add.group();
        var flowers1 = flowers.create(900, 560, 'flowers');
        
        var flowers2 = flowers.create(520, 460, 'flowers2');
        
        player = game.add.sprite(spawnX, spawnY, 'player');	
		player.anchor.setTo(0.5, 0.5);
        correctOrientationWhenGoingBackToPreviousScene();
        //this.game.debug.spriteInfo(player, 32, 32);

        cursors = game.input.keyboard.createCursorKeys();
        
        game.physics.enable([player], Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        
        monster_dying = game.add.audio('monsterdying');
        monster_dying.volume = volumes * 0.5;
        hit_attack = game.add.audio('slash');
        hit_attack.volume = volumes;
        background_music = game.add.audio('uneasymp3');
        background_music.volume = volumes;
        craft_sound = game.add.audio('craft');
        craft_sound.volume = volumes;
        player_dying = game.add.audio('playerdead');
        player_dying.volume = volumes;
        potion_drinking = game.add.audio('potion');
        potion_drinking.volume = volumes;
        player_getting_hit = game.add.audio('whack');
        player_getting_hit.volume = volumes;
        
            
        
        //game.time.events.add(Phaser.Timer.SECOND * 10, timerEvent, this);
        floor.enableBody = true
        
        spikeGroup = game.add.group();
        
        mummyGroup = game.add.group();
        mummyGroup.enableBody = true;
        mummyGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        mummyHealthBarGroup = game.add.group();
        mummyHealthBarGroup.enableBody = true;
        mummyHealthBarGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        //var customBounds = new Phaser.Geom.Rectangle(0, 0, 1280, 622);
        
        
	}, 
	update: function(){ //the update function represents code that is run every frame of the game.
        
        fast_movement();
        
        movement();
        
        /*	
        if (game.input.keyboard.addKey('x').onDown){	
            attack();	
        }	
        */	
        move_between_scenes(0);
        
        nextText();
        
        //fightAnimation();
        
        //pickUpSword();
        
        pickUpItems();
        
        craft();
        
        killMonsterWithSword();
        
        

        //killMonster(); 
    },
    render: function(){ //render function is used in debugging
        /*
        game.debug.text('Controls', 0, 15, 'black');
        game.debug.text('Move: Arrow Keys', 0, 30, 'black');
        game.debug.text('View more text: Space', 0, 45, 'black');
        game.debug.text('Attack: X', 0, 60, 'black');
        game.debug.text('Collect items: C', 0, 75, 'black');
        //game.debug.text(text4, 0, 75, 'blue');
        */
        
    }
};


//These three functions (changeState, addKeyCallback, addChangeStateEventListeners) deal with changing states upon pressing keys 0-9
function changeState(i, stateNum) { //changes the state of the game
	game.state.start('state' + stateNum);
};
function addKeyCallback(key, fn, args){ //helper function for addChangeStateEventListeners
	game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};
function addChangeStateEventListeners(){ //runs the changestate function when keys 0-9 are pressed
    
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
    
    addKeyCallback(Phaser.Keyboard.TAB, incrementTabs, null);
}

//Controls movement of the player
function movement(){
    
    //Stops player from leaving the ground
    if (player.y < 382){
        player.y = 382;
    }
    if (player.y > 622){
        player.y = 622;
    }
    
    if (currentlyBeingHit){
        return;
    }

    //Up and down movement
    if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
        if (player.y > 382){
            player.body.velocity.y = -velocity;
        }
        else{
            player.body.velocity.y = 0;
        }
        
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
        if (player.y <622){
            player.body.velocity.y = velocity;
        }
        else{
            player.body.velocity.y = 0;
        }
        
    }
    else{
        player.body.velocity.y = 0;
    }
        
    //Sideways movement
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
        player.body.velocity.x = -velocity;
        player.scale.setTo(-1, 1);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
        player.body.velocity.x = velocity;
        player.scale.setTo(1, 1);
    }
    else{
        player.body.velocity.x = 0;
    }

    
}
function timerEvent() { //function to be run when the timer event is complete
    
    summonmonster();
    
}

function timerEvent2(){ //function used to tell the game that all monsters have been spawned
    allMonstersSpawned = true;
}

//Spawns monsters with an idle animation
function summonmonster(){
    
    var maxX = 1280
    var maxY = 620
    var minX = 1270
    var minY = 380
    var x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    var y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;


    
    mummy = mummyGroup.create(x, y, 'monster');

    
    mummy.anchor.setTo(0.16, 0.5);
    
    mummy.animations.add('walk');
    
    //  And this starts the animation playing by using its key ("walk")
    //  10 is the frame rate (10fps)
    //  true means it will loop when it finishes
    mummy.animations.play('walk', 10, true);

    
    // if player to left of enemy AND enemy moving to right (or not moving)
    var speed = Math.floor(Math.random() * (200 - 20 + 1)) + 80;

    mummy.body.velocity.x = -speed;
    mummy.body.velocity.y = -speed;
    
    //((mummy.body.velocity.x * player))
    
    mummy.body.collideWorldBounds = true;
    mummy.body.bounce.set(1,1);
    mummy.body.gravity.set(0, 50);
    mummy.body.setSize(32, 32, 18, 7); //makes collision box smaller
    

    //mummy.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0,380, 1280, 620));
    
}


/*
//Plays attack animation of the player
function attack(i, a){ //arguments i and a are essential dummy arguments but are not used
    player.animations.play('chain_attack',30, false);
}
*/


//returns true if two sprites are within range of each other (range determined by x_tolerance and y_tolerance), and false otherwise
function isNear(sprite1, sprite2, x_tolerance, y_tolerance){
    if (sprite1 == undefined || sprite2 == undefined){
        return false;
        
    }
    
    if ((sprite1.x < sprite2.x + x_tolerance) && (sprite1.x > sprite2.x - x_tolerance)){
        if ((sprite1.y < sprite2.y + y_tolerance) && (sprite1.y > sprite2.y - y_tolerance)){
            //console.log('sprites are near');
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

//*******Note: killMonster not used anymore, killMonsterWithSword used instead//
function killMonster(){
    
    
    if (typeof mummy !== 'undefined'){
        //console.log(mummy.x);
        //console.log(player.x);
        var dying;
        if (dead.includes(mummy) == false){
            player_and_monster_near = isNear(player, mummy, 40, 40);
            if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
                if (hit_attack.isPlaying){
                    if (player_and_monster_near){
                        bone = game.add.sprite(mummy.x, mummy.y, 'bone');
                        listOfItemsNotPickedUp.push(bone);

                        mummy.destroy();
                        mummy = undefined;

                        monster_dying.play();
                    }
                }
            }
        }
    }

    

}

function killMonsterWithSword(){ //drastically improved killing monster function
    closestMonster = mummyGroup.getClosestTo(player);
    
    player_and_monster_near = isNear(player, closestMonster, 60, 60);
    if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)/*&&(hit_attack.frame == 0 || hit_attack.frame == 1)*/){ //checks if space was pressed and the hit animation just began. The reason you check if the hit animation just began is so that you can just spam spacebar to hit monsters, but can only attack once per hit animation.
        if (player_and_monster_near){
            var willBoneSpawn = Math.random();
            if (willBoneSpawn > 0.67){
                bone = game.add.sprite(closestMonster.x, closestMonster.y, 'bone');
                listOfItemsNotPickedUp.push(bone);
            }
            
            
            closestMonster.destroy();
            monster_dying.play();
        }
    }
    
}

/*
function pickUpSword(){
    player_and_sword_near = isNear(player, sword, 30, 30);
    if (game.input.keyboard.justPressed(Phaser.Keyboard.V)){
        if (player_and_sword_near){
            //playing the crafting sound when the key c is pressed near iron
            sword.kill();
        }
    }
}
*/

//If enter is pressed and player is near ship, winning message appears on screen
function winGame(){
    if (typeof ship !== 'undefined'){
        player_and_ship_near = isNear(player, ship, 30, 30);
        if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && totalUnobatiumNeededSoFarToContinueToNextState == inventory["unobatium ore"]){
            if (player_and_ship_near){
                text4 = 'You win!';
                game.state.start('win');
            }   
        }
    }
}


//this function is used for animation	
//to be specific, this function changes the texture of the player object (temporarily) to simulate various animations such as an attack animation	
function changeTexture(textureName, numFrames){	
    player.loadTexture(textureName, 0, true);
    if (textureName == 'attack'){
        player.anchor.setTo(0.44, 0.61);
    }
    player.animations.add(textureName);	
    player.animations.play(textureName, numFrames, false);	
    //player.events.onAnimationComplete = new Phaser.Signal();	
    player.events.onAnimationComplete.add(revert_player_back_to_idle, this);	
    	
}	
//this function is used in conjunction with changeTexture() to revert the player back to its default sprite after the animation has ended	
function revert_player_back_to_idle(){	
    player.loadTexture('player');	
    player.anchor.setTo(0.5, 0.5);
}

function fightAnimation(){ //fight animation when spacebar is pressed
    if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
        if (hit_attack.isPlaying == false){
            hit_attack.play();
            immune = true;
            player.events.onAnimationComplete.add(revert_immunity, this);
            changeTexture('attack', 14);
        }
        
        
    }
    
    
}

function revert_immunity(){ //helper function for fightAnimation()
    immune = false;
}

function nextText(){ //displays tutorial text
    game.debug.geom(floor,'#333333');
    if ((numTabPresses <= MaxNumberOfTimesToPressSpaceToViewText) && firstTimeVisiting && (hasDiedStates3to9 == false || currentState == 9)){
        game.debug.text(textArray[0 + numTabPresses*4], 325, 655, 'white');
        game.debug.text(textArray[1 + numTabPresses*4], 325, 670, 'white');
        game.debug.text(textArray[2 + numTabPresses*4], 325, 685, 'white');
        game.debug.text(textArray[3 + numTabPresses*4], 325, 700, 'white');
    }
    else{
        game.debug.text("bones: " + inventory["bone"], 325, 655, 'white');
        game.debug.text("unobatium ore: " + inventory["unobatium ore"] + " of 3", 325, 670, 'white');
        game.debug.text("healing crystals: " + inventory["healing crystal"], 325, 685, 'white');
    }
    
    if (numTabPresses == MaxNumberOfTimesToPressSpaceToViewText - 1){
        AllTextHasBeenViewed = true;
    }
    
        
    
    
}

function incrementTabs(){ //counts the number of times the player hits space. Used to show more tutorial text
    numTabPresses = numTabPresses + 1;
}

function pickUpItems(){ //allows a player to pick up certain items and adjusts the inventory accordingly
    var craftsound, playerX, playerY;
    if (game.input.keyboard.justPressed(Phaser.Keyboard.F)){
        playerX = player.x;
        playerY = player.y;
        
        for (i=0; i < listOfItemsNotPickedUp.length; i ++){
            if (listOfItemsNotPickedUp[i] !== undefined && isNear(player, listOfItemsNotPickedUp[i], 30, 30)){
                //console.log(listOfItemsNotPickedUp[i] !== undefined && inventory[listOfItemsNotPickedUp[i].key]);
                inventory[listOfItemsNotPickedUp[i].key] = inventory[listOfItemsNotPickedUp[i].key] + 1;
                //console.log(inventory[listOfItemsNotPickedUp[i].key]);
                
                listOfItemsNotPickedUp[i].kill();
                listOfItemsNotPickedUp.splice(i, 1);
                break;
            }
        }
    }
}

function craft(){ //allows a player to place down a spike trap and adjusts the inventory accordingly
    if (game.input.keyboard.justPressed(Phaser.Keyboard.E)){
        //console.log('c just pressed');
        if (inventory['bone'] > 0){
            //console.log('spikes crafted');
            craft_sound.play();
            inventory['bone'] = inventory['bone'] - 1;
            spikes = spikeGroup.create(player.x, player.y, 'spikes');
            spikes.anchor.setTo(0.5, 0.5);
        }
    }
}

function drink_potion(){ //enables user to press Q to drink a potion from their inventory
    if (game.input.keyboard.justPressed(Phaser.Keyboard.Q)){
        //console.log('c just pressed');
        
        if (inventory['healing crystal'] > 0){
            //console.log('spikes crafted');
            inventory['healing crystal'] = inventory['healing crystal'] - 1;
            if (globalhealth < maxglobalhealth - 100){
                globalhealth += 150;
                potion_drinking.play();
            }
            else{
                globalhealth = maxglobalhealth;
            }
        }
    }
}

function monster_over_traps(){ //kills monsters when they are over the traps *****Note: Not used anymore *****
    if (typeof spikes !== 'undefined' && typeof mummy !== 'undefined'){
        
        if (dead.includes(mummy) == false){
            spike_and_monster_near = isNear(spikes, mummy, 40,40);
            if (spike_and_monster_near){
                var willBoneSpawn = Math.random();
                if (willBoneSpawn > 0.67){
                    bone = game.add.sprite(closestMonster.x, closestMonster.y, 'bone');
                    listOfItemsNotPickedUp.push(bone);
                }
            
                dead.push(mummy);
            
                mummy.destroy();
                mummy = undefined;
            
                monster_dying.play();
            }
        
        }
    
    }
}

function monsterOverTraps(spikes){ //Checks to see if monster has hit traps and kills the monster
    if (typeof spikes !== undefined && spikes !== null && spikes !== 'undefined'){
        closestMonster = mummyGroup.getClosestTo(player);
        
        player_and_monster_near = isNear(spikes, closestMonster, 40, 40);
        if (player_and_monster_near){
            var willBoneSpawn = Math.random();
            if (willBoneSpawn > 0.67){
                bone = game.add.sprite(closestMonster.x, closestMonster.y, 'bone');
                listOfItemsNotPickedUp.push(bone);
            }
            
            //player.animations.add('player_dying_animations');
            //player.animations.play('player_death_animation', 12, false);
            //console.log("animations playing");

            closestMonster.destroy();
            spikes.destroy();
            //spikes.destroy();
            monster_dying.play();
        }
    }
    
    
}

function add_item(item_key, item_x, item_y, scale){ //used to add items in the game that can be picked up
    item = game.add.sprite(item_x, item_y, item_key);
    item.scale.setTo(scale, scale);
    item.anchor.setTo(0.5, 0.5);
    listOfItemsNotPickedUp.push(item);
}

function move_between_scenes(currentStateNum){ //used to move the player between the scenes
    if (((currentStateNum == 0 || currentStateNum == 1 || currentStateNum == 2) && AllTextHasBeenViewed) || (currentStateNum >= 3) || (player.body.blocked.left &&  game.input.keyboard.isDown(Phaser.Keyboard.A)) || (firstTimeVisiting == false) || hasDiedStates3to9){ //checks if tutorial text has been viewed
        if (currentStateNum !== 9 && player.body.blocked.right && game.input.keyboard.isDown(Phaser.Keyboard.D)){ //if player is trying to move to the right scene
            
            spawnY = player.y;
            spawnX = 0;
            if (allMonstersSpawned){ // makes sure all monsters have been spawned
                closestMonster = mummyGroup.getClosestTo(player);
                if (closestMonster == null){ //makes sure that all monsters have been killed
                    if (totalUnobatiumNeededSoFarToContinueToNextState == inventory['unobatium ore']){ //makes sure all unobatium ore have been picked up
                        
                        //the following pair of if-else statements are used to save a list of items that remain in this scene. These items are then respawned when the player enters the scene again.
                        if (firstTimeVisiting == true){
                            TwoDimenionalListOfItemsNotPickedUp.push(listOfItemsNotPickedUp);
                        }
                        else{
                            var index = currentState;
                            TwoDimenionalListOfItemsNotPickedUp[index] = listOfItemsNotPickedUp;
                        }
                        
                        levelsCleared.push(currentStateNum);
                        changeState(currentStateNum + 1, currentStateNum + 1); //change state made
                    }
                    else{
                        game.debug.text('You need to pick up all unobatium ore before moving on.', 853, 15, 'orange');
                    }
                    
                }
                else{
                    game.debug.text('You need to kill all monsters before moving on.', 910, 15, 'blue');
                }

            }
            else{
                    game.debug.text('You need to kill all monsters before moving on.', 910, 15, 'blue');
            }
        }
            
        if (currentStateNum !== 0 && player.body.blocked.left && game.input.keyboard.isDown(Phaser.Keyboard.A)){
            if (firstTimeVisiting == true){
                TwoDimenionalListOfItemsNotPickedUp.push(listOfItemsNotPickedUp);
            }
            else{
                var index = currentState;
                TwoDimenionalListOfItemsNotPickedUp[index] = listOfItemsNotPickedUp;
            }

            spawnY = player.y;
            spawnX = 1280
            changeState(currentStateNum - 1, currentStateNum - 1);
        }
    }
    else{ //if tutorial text has not been viewed
        if (player.body.blocked.right &&  game.input.keyboard.isDown(Phaser.Keyboard.D))
        game.debug.text('Please read all of the tutorial before moving on.', 895, 15, 'red');
    }
    
}

function correctOrientationWhenGoingBackToPreviousScene(){ //flips player sprite to face the left if it moves back to a previous scene
    if (spawnX == 1280){
        player.scale.setTo(-1, 1);
    }
}

function setUpBackground(){ //adds background, text box, grass, and sets world bounds
    game.stage.backgroundColor = '#999999';
    var background1 = game.add.sprite(0,0,'mountains_and_hills');
    background1.settings = {      duration: Phaser.Timer.SECOND * 3,      ease: Phaser.Easing.Exponential.InOut,      properties: {        alpha: 0      }    };
    var background2 = game.add.sprite(640,0,'mountains_and_hills');

    
    var grass = game.add.sprite(0,400,'grass');
    
    var gray_bar = game.add.sprite(0, 640, 'gray_bar');
    floor = new Phaser.Rectangle(320, 640, 640, 80);
    /*
    game.physics.enable([floor, gray_bar], Phaser.Physics.ARCADE);

    floor.body.collideWorldBounds = true;
    floor.body.immovable = true;
    floor.body.allowGravity = false;

    gray_bar.body.collideWorldBounds = true;
    gray_bar.body.immovable = true;
    gray_bar.body.allowGravity = false;
    */
    game.world.setBounds(0, 0, 1280, 640);

    
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setUpState(currentStateNum){ //functions called in the create function of states 1-9. Code that needs to be in the create function of all states (except state0) can be added here to avoid repetition
    setUpBackground();
    addChangeStateEventListeners();
    
    declareVariablesState(currentStateNum);
    

    
    mummyGroup = game.add.group();
    mummyGroup.enableBody = true;
    mummyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    
    spikeGroup = game.add.group();

    createHealhBar();
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateState(){ //functions called in the update function of states 1-9
    fast_movement();
    movement();
    killMonsterWithSword();
    spikeGroup.forEachExists(monsterOverTraps, this);
    craft();
    pickUpItems();
    fightAnimation();
    
    if(typeof mummy != "undefined" && mummy.body != null){
        if(mummy.y < 390){
            mummy.body.velocity.y = 20;
        }
    }
    
    mummyGroup.forEachExists(keepInBounds, this);
    
    winGame();
    
//    mummy.body.velocity.x = -speed;
//    mummy.body.velocity.y = -speed;

    
    killMonsterWithSword();
    
    updateHealth(player, mummy, health);
    //updateMonsterHealth(player, mummy, mummyHealthBar);
    
    drink_potion();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function declareVariablesState(currentStateNum){ //functions called in the create function of states 1-9 that have to do with variable declaration
    dead = [];
    currentState = currentStateNum;
    listOfItemsNotPickedUp = [];
    firstTimeVisiting = true;
    //spikes = 'undefined';
    numTabPresses = 0;
    allMonstersSpawned = false;
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initialize_variables_on_respawn(){ //Resetting values upon respawn
    gameWidth = 1280, gameHeight = 720;
    player, iron, mummy, sword, ship, floor, spikes, healing_crystal;
    music;
    cursors;
    listOfItemsNotPickedUp = [];
    velocity = 175;
    spawnY = 450;
    spawnX = gameWidth/2;
    anim_chain_attack, hit_attack;
    text1 = '';
    text2 = '';
    text3 = '';
    text4 = '';
    textArray;
    numTabPresses = 0;
    inventory = {
        "bone": 1,
        "rope": 0,
        "rock": 0,
        "chain": 0,
        "dagger": 0,
        "healing crystal": 0,
        "unobatium ore": 0
    };
    dead = [];
    movementMade = false;
    hasChangedScenesAtLeastOnce = false;
    currentState = 0;
    statesVisited = [];
    firstTimeVisiting = true;
    TwoDimenionalListOfItemsNotPickedUp = [];
    MaxNumberOfTimesToPressSpaceToViewText = 1;
    AllTextHasBeenViewed = false;

    volumes = 0.3;
    globalhealth = 500;
    maxglobalhealth = 500;
    gamebar, mummyGamebar, mummyHealthBar;
    
    currentlyBeingHit = false;
    
    textArray = [
    'You have died and respawned.',
    '',
    '',
    '',
    
    '',
    '',
    '',
    '',
    ];
    respawning = false;
    immune = false;
    
    allMonstersSpawned = true;
    previousMummySpeed;
    totalUnobatiumNeededSoFarToContinueToNextState = 0;
    
    levelsCleared = [];
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fast_movement(){ //enables sprinting
    if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
        velocity = 350;
    }
    else{
        velocity = 175;
    }
    
}


function addItemsState0(){ //items that are added to be picked up in this state. There's a lot of "extra" code here, but new items can be added alongside the "add_item" function call under the if statement.
    if (statesVisited.includes(currentState) == false){
        music = game.add.audio('uneasymp3');
        music.volume = volumes;
        music.play();
        
        add_item('dagger', 400, 500, 1);
        
        statesVisited.push(currentState);

    }
    else{
        firstTimeVisiting = false;
        var listOfItemsNotPickedUpFromLastVisit = TwoDimenionalListOfItemsNotPickedUp[currentState];
        var looplength = listOfItemsNotPickedUpFromLastVisit.length;
        for (i=0; i<looplength; i++){
            var item = listOfItemsNotPickedUpFromLastVisit[i];
            add_item(item.key, item.x, item.y, 1);
        }
    }
    
}

function createHealhBar(){ //Create the healthbar
    gamebar = game.add.bitmapData(500, 60);
    gamebar.ctx.beginPath();
    gamebar.ctx.rect(10, 10, 180, 20);
    gamebar.ctx.fillStyle = '#bc4531';
    gamebar.ctx.fill();


    health = game.add.sprite(10, 5, gamebar);

}

function updateHealth(player, mummy, health){  //Update the healthbar in each state
    closestMonster = mummyGroup.getClosestTo(player);
    game.physics.arcade.overlap(mummyGroup, player, this.playerGetsHit);
    health.width = globalhealth;
    
    

    
}
/*
function updateMonsterHealth(player, mummy, healthBar){
    closestMonster = mummyGroup.getClosestTo(player);
    if (closestMonster == null){
        return;
    }
    healthBar.width = globalhealth;
}
*/

function playerGetsHit(){ //Called when player gets hit by the monster
    if (immune == true){
        return;
    }
    closestMonster = mummyGroup.getClosestTo(player);
    vectorToMonster = [closestMonster.x - player.x, closestMonster.y - player.y];

    vectorLength = (vectorToMonster[0]*vectorToMonster[0] + vectorToMonster[1]*vectorToMonster[1]) ** (0.5);
    normalizedVectorToMonster = [vectorToMonster[0]/vectorLength, vectorToMonster[1]/vectorLength];
    
    currentlyBeingHit = true;

    player.body.velocity.x = -400*normalizedVectorToMonster[0];
    player.body.velocity.y = -400*normalizedVectorToMonster[1];
    game.time.events.add(Phaser.Timer.SECOND * 0.125, stopBeingHit, this);
    if (globalhealth >= 40){
        globalhealth -= 40;
        player_getting_hit.play();
    }
    else{
        globalhealth = 0;
    }
    
    if (globalhealth <= 0){
        if (respawning == false){
            respawn();
        }
        
        //player.animations.play('player_dying_animations', 20, false);
        //game.time.events.add(1000000, function(){
        //console.log("died");
        //player_dying.play();
        //});
        
    }
    
    previousMummySpeed = closestMonster.body.velocity.x
    closestMonster.body.velocity.x = 0;
    closestMonster.body.velocity.y = 0;
    game.time.events.add(Phaser.Timer.SECOND * 0.5, mummyStopHitting, this, closestMonster);
    
}

function stopBeingHit(){ //Helper function for playerGetsHit
    currentlyBeingHit = false;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
}

function mummyStopHitting(closestMonster){ //Helper function for playerGetsHit.
    if (closestMonster == null || closestMonster.body == null){
        return;
    }
    else{
        closestMonster.body.velocity.x = previousMummySpeed;
        closestMonster.body.velocity.y = previousMummySpeed;
    }
    
}

function respawn(){ //Function called when health reaches zero in the updateHealth function
    respawning = true;
    justDied = true;
    if (currentState == 1){
        hasDiedState1 = true;
    }
    if (currentState == 2){
        hasDiedState2 = true;
    }
    if (currentState >= 3){
        hasDiedStates3to9 = true;
    }
    player_dying.play();
    changeTexture('player_dying_animations', 14);
    player.events.onAnimationComplete.add(changeStateToState0, this);
}

function changeStateToState0(){ //helper function for the timer event in respawn()
    game.state.start('state0');
}

function inventoryUI(){
    game.debug.geom(floor,'#333333');
    game.debug.text("bones: " + inventory["bone"], 325, 655, 'white');
    game.debug.text("unobatium ore: " + inventory["unobatium ore"] + " of 3", 325, 670, 'white');
    game.debug.text("healing crystals: " + inventory["healing crystal"], 325, 685, 'white');
    
}

function keepInBounds(monsterObject){ //Keeps monsters from flying up above the grass
    if (monsterObject.y < 389){

        monsterObject.y = 389;
    }
}