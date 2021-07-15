/*
This is the main JavaScript file. This is the only JavaScript file that is called in the index.html file. The main use of this file is to combine all other JavaScript files together. 'menu', 'transition', 'state0', etc denote different states in the game. Each of these states have a separate JavaScript file. Most of the code for the game is found in the 'state0' file.
*/

var game = new Phaser.Game(1280, 720, Phaser.AUTO); //creating a Phaser game object
game.state.add('menu', demo.menu);
game.state.add('transition', demo.transition);
game.state.add('state0', demo.state0); //setting a property of this game using an object method
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.add('state3', demo.state3);
game.state.add('state4', demo.state4);
game.state.add('state5', demo.state5);
game.state.add('state6', demo.state6);
game.state.add('state7', demo.state7);
game.state.add('state8', demo.state8);
game.state.add('state9', demo.state9);
game.state.add('transition2', demo.transition2);
game.state.add('win', demo.win);
game.state.add('credits', demo.credits);
game.state.start('menu'); //game starts at menu