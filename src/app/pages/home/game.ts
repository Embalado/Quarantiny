import * as Phaser from 'phaser';
import { debug } from 'console';
import {global} from "./global";

export class GameScene extends Phaser.Scene{
    
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    sicko: Phaser.Physics.Arcade.Group;
    stars: Phaser.Physics.Arcade.Group;
    trashBags: Phaser.Physics.Arcade.Group;
    motocaColl:Phaser.Physics.Arcade.Group;
    scoreText: Phaser.GameObjects.Text;
    timerText:Phaser.GameObjects.Text;
    bombs: Phaser.Physics.Arcade.Group;
    destroyer:Phaser.Physics.Arcade.Image;
    bg;
    timer = 100;
    timersick =200;
     pause ;
    score = 0;
  public clean= 100;
   public life = 100;
    count = 0;
    
  initialTime: number;
  lifeText: Phaser.GameObjects.Text;
  cleanText: Phaser.GameObjects.Text;
  music;
  music1;
  music2;
  btR;
  
  zone_left: Phaser.GameObjects.Zone;
  
  isClicking = false;
  
  
    constructor() {
        super({ key: 'game' });
      }
      init (data)
      {
          console.log('init', data);
          this.clean = data.clean;
          this.life = data.hp;
          this.score = data.coins;
        
         
      }
      
    
     
      preload() {
        this.load.setPath('./assets/Game');
        this.load.image('platform', 'platform.png');
        this.load.image('trash', 'trash.png');
        this.load.image('star', 'star.png');
        this.load.image('sky', 'street.png');
        this.load.image('moto', 'moto.png');
        this.load.spritesheet("dude", "dude.png", { frameWidth: 49, frameHeight: 64});
        this.load.image("sicko", "runner_sicko.png");
        this.load.image('icon2', 'btrunner.png');
        this.load.image('icon1', 'btmarket.png');
        this.load.image('icon3', 'btmoney.png')
        this.load.audio('run', 'A_Go_Go.ogg');
        this.load.audio('crash', 'CRASH1.ogg');
        this.load.audio('coin', 'coin.ogg');
        this.load.image('btright', 'btright.png');
        this.load.image('btleft', 'btleft.png');
        this.load.image('destroyer1', 'destroyer.png')
        
       
      }
      create(){

       
       
        //set background
      this.bg = this.add.tileSprite(250,400,500,800, 'sky')
      this.destroyer = this.physics.add.image(250,1000, 'destroyer1')
        // Plataformas
     
   
    this.player = this.physics.add.sprite(250, 650, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // ANIMS
    // Quando DUDE for para a esquerda
    this.anims.create({
      key: 'run',
      frameRate: 4,
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 1 }),
      repeat:Infinity,
     
    });
    this.anims.create({
      key: 'sicko',
      frameRate: 4,
      frames: this.anims.generateFrameNumbers('sicko', { start: 0, end: 1 }),
      repeat:Infinity,
     
    });
  
   this.player.play("run");
   
    //TXT
    this.scoreText = this.add.text(100,16, '0', { font: '30px Arial', fill: '#FFFFFF' }).setDepth(1);
    this.lifeText = this.add.text(430, 16, '0', { font: '30px Arial', fill: '#FF0000' }).setDepth(1);
    this.cleanText = this.add.text(430, 90, '50', { font: '30px Arial', fill: '#00FFFF' }).setDepth(1);
    
    this.physics.add.collider(this.player, this.platforms);

    // CONTROLS
    this.cursors = this.input.keyboard.createCursorKeys();
//TIMER CODE SHOULD GO HERE AND NOT AT THE BEGINNING OF CREATE

  
  
 
    console.log('create');
    // 2:30 in seconds
    this.initialTime = 59;

    this.timerText = this.add.text(220, 30, '' + this.formatTime(this.initialTime),{font: '30px Arial', fill: 
    '#FFFFFF', align: 'center'}).setDepth(1);

    // Each 1000 ms call onEvent
   var timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
   
   
   
    this.add.image(380,100, 'icon1').setDepth(1);
   this.add.image(380,30, 'icon2').setDepth(1);
   this.add.image(40,30, 'icon3').setDepth(1);
   this.music =  this.sound.add('run');
   this.music1 =  this.sound.add('crash');
   this.music2 =  this.sound.add('coin');
   this.music.play();
  

    

    
  }
  






   formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    if(partInSeconds<10)
          {
            return ` 0${partInSeconds}`;
          }
          else
          {
            return `${partInSeconds}`;
          }
}


 onEvent ()
{
    this.initialTime -= 1; // One second
    this.count +=1;
    if(this.count >=3)
    {
    this.life +=2;
    this.clean-=2;
    this.count=0;
    }
    this.timerText.setText('' + this.formatTime(this.initialTime));
}
  collectStar(player, star) {
    star.destroy()
    this.music2.play()
    this.score += 1;
    this.scoreText.setText('Moedas: ' + this.score);
    
  }
  colliderTrashBags(player, trashbags) {
    trashbags.destroy()
    this.music1.play();
    this.life -= 10;
    this.clean-=20;
    if(this.clean <0)
    {
      this.clean=0;
    }
   
    
    
  }
  colliderMotoca(player, motoca) {
    motoca.destroy()
    this.music1.play()
    this.life -= 15;
   
    
    
  }
  colliderDestroyer(player, other) {
    other.destroy()
    
   
    
    
  }


 
  
  generateCoins() {
    this.timer -=1;
    this.stars = this.physics.add.group();
 
    //phaser's random number generator
    var numMounds = 1;
    var mound;
    if(this.timer< 0){

    for (var i = 0; i < numMounds; i++) {
      //add sprite within an area excluding the beginning and ending
      //  of the game world so items won't suddenly appear or disappear when wrapping
       var x = Phaser.Math.Between(20,480 );

      mound = this.stars.create(x, -200, 'star');
      mound.body.velocity.x = 0;
      mound.body.velocity.y = 179;
    }
    this.timer=100;
 
  }
  
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    this.physics.add.overlap(this.destroyer, this.stars, this.colliderDestroyer, null, this);

  }


  generateTrash() {
   
    this.timer -=1;
    this.trashBags= this.physics.add.group();
 
    //phaser's random number generator
    var numMounds = 1;
    var mound;
    if(this.timer< 0){

    for (var i = 0; i < numMounds; i++) {
      //add sprite within an area excluding the beginning and ending
      //  of the game world so items won't suddenly appear or disappear when wrapping
       var x = Phaser.Math.Between(20,480 );

      mound = this.trashBags.create(x, -200, 'trash');
      mound.body.velocity.x = 0;
      mound.body.velocity.y = 179;
      
    }
    this.timer=100;
 
  }
  
    this.physics.add.overlap(this.player, this.trashBags, this.colliderTrashBags, null, this);
    this.physics.add.overlap(this.destroyer, this.trashBags, this.colliderDestroyer, null, this);

  }
  generateSicko() {
   
    this.timersick -=1;
    this.sicko= this.physics.add.group();
    
 
    //phaser's random number generator
    var numMounds = 1;
    var mound;
    if(this.timersick< 0){

    for (var i = 0; i < numMounds; i++) {
      //add sprite within an area excluding the beginning and ending
      //  of the game world so items won't suddenly appear or disappear when wrapping
       var x = Phaser.Math.Between(470,471 );

      mound = this.sicko.create(x, -200, 'sicko');
      mound.body.velocity.x = 0;
      mound.body.velocity.y = 179;
    }
    this.timersick=380;
 
  }
  
    this.physics.add.overlap(this.player, this.sicko, this.colliderTrashBags, null, this);
    this.physics.add.overlap(this.destroyer, this.sicko, this.colliderDestroyer, null, this);

  }
  generateMotoca() {
   
    this.timer -=1;
    this.motocaColl= this.physics.add.group();
 
    //phaser's random number generator
    var numMounds = 1;
    var mound;
    if(this.timer< 0){

    for (var i = 0; i < numMounds; i++) {
      //add sprite within an area excluding the beginning and ending
      //  of the game world so items won't suddenly appear or disappear when wrapping
       var x = Phaser.Math.Between(60,380 );

      mound = this.motocaColl.create(x, -200, 'moto');
      mound.body.velocity.x = 0;
      mound.body.velocity.y = 300;
      
    }
    this.timer=100;
 
  }
  
    this.physics.add.overlap(this.player, this.motocaColl, this.colliderMotoca, null, this);
    this.physics.add.overlap(this.destroyer, this.motocaColl, this.colliderDestroyer, null, this);

  }
  saveFile = function(){
    var file = {
        coins: this.score,
        hp:this.life,
        clean:this.clean
    };
    localStorage.setItem('saveFile',JSON.stringify(file));
};

  update() {
   
    
    if(this.life>100)
    {
      this.life = 100
    }
    this.lifeText.setText('' + this.life);
    this.scoreText.setText('' + this.score);
    this.cleanText.setText('' + this.clean);
    //var value = Phaser.Math.Between(min, max)
    if(this.life <=0)
    {
      this.saveFile();
      this.music.stop();
      this.registry.destroy(); // destroy registry
      this.events.off("game"); // disable all active events
      this.scene.start('menu',{ life: this.life, clean:this.clean , coins:this.score});
      global.pressBack=false
      global.loginState1=true;
      global.loginState=false;
    }
    if(this.initialTime <=0)
    {
      this.saveFile();
      this.music.stop();
      this.registry.destroy(); // destroy registry
      this.events.off("game"); // disable all active events
      this.scene.start('menu',{ life: this.life, clean:this.clean , coins:this.score});
      global.pressBack=false
      global.loginState1=true;
      global.loginState=false;

      //this.life= 50;
    }
    if(global.pressBack===true)
    {
    this.saveFile();
      
     this.registry.destroy(); // destroy registry
     this.events.off('game'); // disable all active events
     this.music.stop();
     this.scene.start('menu',{ life: this.life ,clean:this.clean,coins:this.score})
     global.pressBack=false
     global.loginState1=true;
     global.loginState=false;
     
    }
    if(this.clean <0)
    {
      this.clean=0;
    }
   
    
    this.generateCoins();
    this.generateTrash();
    this.generateMotoca();
    this.generateSicko();
   
    this.bg.tilePositionY -= 3
      
  
 //  only move when you click
 if (this.input.activePointer.isDown)
 {
   
   
  
     this.physics.moveToObject(this.player,this.input.activePointer,500);

     //  if it's overlapping the mouse, don't move any more
     if (this.player.x === this.input.activePointer.x)
     {
         this.player.body.velocity.setTo(0, 0);
     }
 }
 else
 {
     this.player.body.velocity.setTo(0, 0);
 }
  
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160); // Movimentação do DUDE
     
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    
    } else {
      this.player.setVelocityY(0);
      
    }

  
      }
}

