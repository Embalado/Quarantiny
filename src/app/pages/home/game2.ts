import * as Phaser from 'phaser';
import {global} from "./global";
import { debug } from 'console';

export class workScene extends Phaser.Scene{
    bg;
    music;
    music1;
    music2;
    music3;
    sprPaper;
    sprPlastic;
    sprGlass;
    sprMetal;
    timer = 100;
    public clean = 100;
    public life=100;
    public coins=0;
    timerDefine =800;
    initialTime = 10;
    velGarbage=120;
    velTrack=2;
    metal: Phaser.Physics.Arcade.Group;
    glass:Phaser.Physics.Arcade.Group;
    paper: Phaser.Physics.Arcade.Group;
    plastic:Phaser.Physics.Arcade.Group;
    timerText: Phaser.GameObjects.Text;
    metalBin: Phaser.Physics.Arcade.Image;
    glassBin:Phaser.Physics.Arcade.Image;
    paperBin: Phaser.Physics.Arcade.Image;
    plasticBin:Phaser.Physics.Arcade.Image;
    destroyer:Phaser.Physics.Arcade.Image;

    coinText: Phaser.GameObjects.Text;

  graphics;
    constructor() {
        super({ key: 'work' });
      }
     
      init (data)
      {
          console.log('init', data);
          this.clean = data.clean;
          this.life = data.hp;
          this.coins = data.coins;
      }
      preload() {
        this.load.setPath('./assets/Game');
        this.load.image('esteira', 'esteira.jpg');
        this.load.image('buttonover1', 'button_voltar.png');
        this.load.audio('Limehouse', 'Limehouse_Blues.ogg');
        this.load.audio('win', 'HAPPYBEL.wav');
        this.load.audio('lost', 'wrongTrash.ogg');
        this.load.audio('invalid', 'INVALID.wav');
        this.load.image('paper', 'paper.png');
        this.load.image('glass', 'glass.png');
        this.load.image('metal', 'metal.png');
        this.load.image('plastic', 'plastic.png');
        this.load.image('plastico','plastico.png')
        this.load.image('metais','metais.png')
        this.load.image('papeis','papeis.png')
        this.load.image('vidros','vidros.png')
        this.load.image('ground','ground.jpg')
        this.load.image('money', 'btmoney.png')
        this.load.image('clock', 'clock.png')
        this.load.image('destroyer', 'destroyer.png')
        
    }
    saveFile = function(){
        var file = {
            coins: this.coins,
            hp:this.life,
            clean:this.clean
        };
        localStorage.setItem('saveFile',JSON.stringify(file));
    };
        
        create(){
         
            this.add.tileSprite(250,400,500,800, 'ground')
            //set background
          this.add.image(32,32,"money")
          this.add.image(380,35,"clock")
          this.bg = this.add.tileSprite(250,400,180,800, 'esteira')
          
          
        this.input.addPointer(2);
        this.initialTime = 59;
         this.destroyer = this.physics.add.image(250,830, 'destroyer')
         this.plasticBin = this.physics.add.image(425,650, 'plastico')
         this.metalBin =  this.physics.add.image(425,200, 'metais')
         this.paperBin =  this.physics.add.image(75,650, 'papeis')
         this.glassBin =  this.physics.add.image(75,200, 'vidros')
         this.coinText = this.add.text(70,10, '', { font: '50px Arial', fill: '#FFFFFF' });
         this.timerText = this.add.text(420, 10, '' + this.formatTime(this.initialTime),{font: '50px Arial', fill: 
          '#00FFFF', align: 'center'});
         var timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
      
        
       
     
  this.graphics = this.add.graphics();
            
        this.music=  this.sound.add('Limehouse');
        this.music1 =  this.sound.add('win');
    this.music2=  this.sound.add('lost');
    this.music3=  this.sound.add('invalid');
        this.music.loop = true; // This is what you are lookig for
        this.music.play();
         }
         update()
         {
           if(this.initialTime<=0)
           {
            this.saveFile();
            this.registry.destroy(); // destroy registry
            this.events.off('work'); // disable all active events
            this.music.stop();
            this.scene.start('menu',{ life: this.life ,clean:this.clean,coins:this.coins})
            global.pressBack=false
            global.loginState1=true;
            global.loginState=false;
           }
           if(global.pressBack===true)
           {
            this.saveFile();
            this.registry.destroy(); // destroy registry
            this.events.off('work'); // disable all active events
            this.music.stop();
            this.scene.start('menu',{ life: this.life ,clean:this.clean,coins:this.coins})
            global.pressBack=false
            global.loginState1=true;
            global.loginState=false;
            
           }

           if(this.coins<=0)
           {
             this.coins=0;
           }
            this.bg.tilePositionY -= this.velTrack
            this.generateGlass()
            this.generateMetal()
            this.generatePaper()
            this.generatePlastic()
            if (this.input.pointer1.isDown || this.input.pointer2.isDown || this.input.pointer3.isDown)
            {
               this.graphics.clear();
            }
        
            
            this.graphics.fillRect(this.input.pointer1.x, this.input.pointer1.y, 44, 44);
        
            
            this.graphics.fillRect(this.input.pointer2.x, this.input.pointer2.y, 44, 44);
        
            
            this.graphics.fillRect(this.input.pointer3.x, this.input.pointer3.y, 44, 44);
            this.coinText.setText(''+this.coins);
         }
        
        
     
       
        
        generatePaper() {
   
            this.timer -=1;
            this.paper= this.physics.add.group();
         
            //phaser's random number generator
            var numMounds = 1;
           
            if(this.timer< 0){
        
            for (var i = 0; i < numMounds; i++) {
              //add sprite within an area excluding the beginning and ending
              //  of the game world so items won't suddenly appear or disappear when wrapping
              var x = Phaser.Math.Between(200,300 );
        
             this.sprPaper = this.paper.create(x, -200, 'paper').setInteractive({ draggable: true });
              
              this.paper.angle(x);
              this.sprPaper.body.velocity.x = 0;
              this.sprPaper.body.velocity.y = this.velGarbage;
              this.sprPaper.on('drag', function (pointer, dragX, dragY) {

                this.x = dragX;
                this.y = dragY;
        
            });
            }
            this.timer=this.timerDefine;
         
          }
          this.physics.add.overlap(this.glassBin, this.paper, this.colliderOther, null, this,);
          this.physics.add.overlap(this.metalBin, this.paper, this.colliderOther, null, this);
          this.physics.add.overlap(this.paperBin, this.paper, this.colliderPaper, null, this);
          this.physics.add.overlap(this.plasticBin, this.paper, this.colliderOther, null, this);
          this.physics.add.overlap(this.destroyer, this.paper, this.colliderDestroyer, null, this);
          
            
        
          }
          generatePlastic() {
   
            this.timer -=1;
            this.plastic= this.physics.add.group();
         
            //phaser's random number generator
            var numMounds = 1;
            
            if(this.timer< 0){
        
            for (var i = 0; i < numMounds; i++) {
              //add sprite within an area excluding the beginning and ending
              //  of the game world so items won't suddenly appear or disappear when wrapping
              var x = Phaser.Math.Between(200,300 );
        
              this.sprPlastic = this.plastic.create(x, -200, 'plastic').setInteractive({ draggable: true });
              this.plastic.angle(x);
              this.sprPlastic.body.velocity.x = 0;
              this.sprPlastic.body.velocity.y = this.velGarbage;
              this.sprPlastic.on('drag', function (pointer, dragX, dragY) {

                this.x = dragX;
                this.y = dragY;
        
            });
              
            }
            this.timer=this.timerDefine;
         
          }
          
          this.physics.add.overlap(this.glassBin, this.plastic, this.colliderOther, null, this,);
          this.physics.add.overlap(this.metalBin, this.plastic, this.colliderOther, null, this);
          this.physics.add.overlap(this.paperBin, this.plastic, this.colliderOther, null, this);
          this.physics.add.overlap(this.plasticBin, this.plastic, this.colliderPlastic, null, this);
          this.physics.add.overlap(this.destroyer, this.plastic, this.colliderDestroyer, null, this);
            
        
          }
          generateMetal() {
   
            this.timer -=1;
            this.metal= this.physics.add.group();
         
            //phaser's random number generator
            var numMounds = 1;
            
            if(this.timer< 0){
        
            for (var i = 0; i < numMounds; i++) {
              //add sprite within an area excluding the beginning and ending
              //  of the game world so items won't suddenly appear or disappear when wrapping
              var x = Phaser.Math.Between(200,300 );
        
              this.sprMetal = this.metal.create(x, -200, 'metal').setInteractive({ draggable: true });
              this.metal.angle(x);
             this.sprMetal.body.velocity.x = 0;
             this.sprMetal.body.velocity.y = this.velGarbage;
             this.sprMetal.on('drag', function (pointer, dragX, dragY) {

              this.x = dragX;
              this.y = dragY;
      
          });
              
            }
            this.timer=this.timerDefine;
         
          }
          
          this.physics.add.overlap(this.glassBin, this.metal, this.colliderOther, null, this,);
          this.physics.add.overlap(this.metalBin, this.metal, this.colliderMetal, null, this);
          this.physics.add.overlap(this.paperBin, this.metal, this.colliderOther, null, this);
          this.physics.add.overlap(this.plasticBin, this.metal, this.colliderOther, null, this);
          this.physics.add.overlap(this.destroyer, this.metal, this.colliderDestroyer, null, this);
        
          }
          generateGlass() {
   
            this.timer -=1;
            this.glass= this.physics.add.group();
         
            //phaser's random number generator
            var numMounds = 1;
            
            if(this.timer< 0){
        
            for (var i = 0; i < numMounds; i++) {
              //add sprite within an area excluding the beginning and ending
              //  of the game world so items won't suddenly appear or disappear when wrapping
              var x = Phaser.Math.Between(200,300 );
        
              this.sprGlass = this.glass.create(x, -200, 'glass').setInteractive({ draggable: true });
              this.glass.angle(x);
              this.sprGlass.body.velocity.x = 0;
              this.sprGlass.body.velocity.y = this.velGarbage;
              this.sprGlass.on('drag', function (pointer, dragX, dragY) {

                this.x = dragX;
                this.y = dragY;
        
            });
              
            }
            this.timer=this.timerDefine;
         
          }
          
            this.physics.add.overlap(this.glassBin, this.glass, this.colliderGlass, null, this,);
            this.physics.add.overlap(this.metalBin, this.glass, this.colliderOther, null, this);
            this.physics.add.overlap(this.paperBin, this.glass, this.colliderOther, null, this);
            this.physics.add.overlap(this.plasticBin, this.glass, this.colliderOther, null, this);
            this.physics.add.overlap(this.destroyer, this.glass, this.colliderDestroyer, null, this);
            
        
          }
          colliderPaper(player, paper) {
          
            paper.destroy()
            this.music1.play()
            this.coins += 10;
           
            
            
          }
          colliderMetal(player, metal) {
           
           metal.destroy()
           
            this.music1.play()
            this.coins += 10;
           
            
            
          }
          colliderGlass(player, glass) {
        
      
           
            glass.destroy()

            this.music1.play()
            this.coins += 10;
           
            
            
          }
          colliderPlastic(player, plastic) {
           
            
           plastic.destroy()
            this.music1.play()
            this.coins += 10;
           
            
            
          }
          colliderOther(player, other) {
       
            other.destroy()
            
            this.music2.play()
            this.coins -= 10;
           
            
            
          }
          colliderDestroyer(player, other) {
            
            other.destroy()
            
            this.music3.play()
            this.coins -= 5;
           
            
            
          }
          formatTime(seconds){
            // Minutes
            var minutes = Math.floor(seconds/60);
            // Seconds
            var partInSeconds = seconds%60;
            
            // Returns formated time
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
            if(this.initialTime <40)
            {
              this.timerDefine=400;
              this.velGarbage= 140;
              this.velTrack = 2.3;
            }
            else if(this.initialTime <30)
            {
              this.timerDefine=300;
              this.velGarbage= 160;
              this.velTrack = 2.5;
            }
            else if(this.initialTime <20)
            {
              this.timerDefine=200;
              this.velGarbage= 180;
              this.velTrack = 2.7;
            }
            else if(this.initialTime <10)
            {
              this.timerDefine=50;
              this.velGarbage= 200;
              this.velTrack = 2.9;
            }

            
             
            this.timerText.setText('' + this.formatTime(this.initialTime));
        }



    }