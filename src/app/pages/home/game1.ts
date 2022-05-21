import * as Phaser from 'phaser';
import { debug } from 'console';
import {global} from "./global";
export class   cleanUpScene extends Phaser.Scene{
  bg;
  arrowUp;
  arrowDown;
  arrowLeft;
  arrowRight;
  arrowKeyIndex;
  initialTime = 10;
  bubble:Phaser.Physics.Arcade.Sprite;swipeDirection: string;
  swipeY =null;
;
  miss;
  count = 0;
  value;
  cleanText: Phaser.GameObjects.Text;
 public clean = 100;
  public life=100;
  public coins=100;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  btpress=null;
  pressed =false;
  drag=false;
  timerText: Phaser.GameObjects.Text;
  Hands: Phaser.Physics.Arcade.Sprite;
  otherbubble: Phaser.Physics.Arcade.Sprite;
  music;
  music1;
  music2;
  isClicking = false;
   downX
    upX 
    downY
     upY
      threshold = 50;

    constructor() {
        super({ key: 'game1' });
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
        this.load.image('Up', 'arrowUp.png');
        this.load.image('Down', 'arrowDown.png');
        this.load.image('Left', 'arrowLeft.png');
        this.load.image('Right', 'arrowRight.png'); 
        this.load.image('bathroom', 'bathroom.jpg'); 
        this.load.image('miss', 'miss.png'); 
        this.load.spritesheet("hands", "maozinha.png", { frameWidth: 600, frameHeight: 535});
        this.load.spritesheet("higiene", "higiene.png", { frameWidth: 128, frameHeight: 128});
        this.load.spritesheet("other", "higiene0.png", { frameWidth: 497, frameHeight: 445});
        this.load.audio('cleanUpSong', 'Washing.mp3');
        this.load.audio('yep', 'yep.ogg');
        this.load.audio('no', 'no.ogg');
       
       
     

        }
        create(){
           
            
          
            //set background
          this.bg = this.add.tileSprite(250,400,500,800, 'bathroom')
          this.arrowUp= this.add.image(250,150, 'Up')
          this.arrowDown= this.add.image(250,150, 'Down')
          this.arrowRight=this.add.image(250,150, 'Right')
          this.arrowLeft=this.add.image(250,150, 'Left')
          this.bubble = this.physics.add.sprite(250,150, 'higiene')
          this.miss = this.add.image(250,150, 'miss')
          
          this.initialTime = 20;
          this.cleanText = this.add.text(390, 10, '', { font: '50px Arial', fill: '#FF0000' });
          this.pressed =false;
     
           // CONTROLS
          this.cursors = this.input.keyboard.createCursorKeys();
            
        this.timerText = this.add.text(100, 10, '' + this.formatTime(this.initialTime),{font: '50px Arial', fill: 
          '#00FFFF', align: 'center'});
         var timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    
          this.arrowUp.visible = false;
          this.arrowDown.visible = false;
          this.arrowRight.visible = false;
          this.arrowLeft.visible = false;
          this.bubble.visible = false;
          this.miss.visible = false;

          this.Hands = this.physics.add.sprite(250, 600, 'hands');
          this.otherbubble = this.physics.add.sprite(250, 570, 'other');
          // ANIMS
    
    this.anims.create({
      key: 'wash',
      frameRate: 5,
      frames: this.anims.generateFrameNumbers('hands', { start: 0, end: 20 }),
      repeat:Infinity,
     
    });
    this.anims.create({
      key: 'bubble',
      frameRate: 10,
      frames: this.anims.generateFrameNumbers('higiene', { start: 0, end: 6 }),
      repeat:0,
     
    });
    this.anims.create({
      key: 'otherBubble',
      frameRate:5,
      frames: this.anims.generateFrameNumbers('other', { start: 0, end: 6 }),
      repeat:Infinity,
     
    });
    this.Hands.play("wash");
    this.otherbubble.play("otherBubble");
    
    this.music =  this.sound.add('cleanUpSong');
    this.music1 =  this.sound.add('yep');
    this.music2=  this.sound.add('no');
    this.music.loop = true; // This is what you are lookig for
    this.music.play();
    
       
          
        }

        saveFile = function(){
          var file = {
              coins: this.coins,
              hp:this.life,
              clean:this.clean
          };
          localStorage.setItem('saveFile',JSON.stringify(file));
      };
     


        update(){
          if(global.pressBack===true)
           {
            this.saveFile();
             
            this.registry.destroy(); // destroy registry
            this.events.off('game1'); // disable all active events
            this.music.stop();
            this.scene.start('menu',{ life: this.life ,clean:this.clean,coins:this.coins})
            global.pressBack=false
            global.loginState1=true;
            global.loginState=false;
            
           }


          if(this.clean < 0)
          {
           this.clean=0;
          }

          if(this.clean >100)
          {
           this.clean=100;
          }
       
          this.cleanText.setText('' + this.clean);

          if(this.initialTime <=0)
          {
            
            this.saveFile();
            this.music.stop();
            this.registry.destroy(); // destroy registry
            this.events.off('game1'); // disable all active events
            this.scene.start('menu',{ life: this.life ,clean:this.clean,coins:this.coins});
            global.pressBack=false
            global.loginState1=true;
            global.loginState=false;
      
            
          }
          if (this.pressed===false) {
            
         
          this.input.on('pointerdown', function (pointer) {
            this.downX = pointer.x;
            this.downY = pointer.y;
            
        },this);  
        
        this.input.on('pointerup', function (pointer) {
            this.upX = pointer.x;
            this.upY = pointer.y;
            
            
           
            
            
            if (this.upX < this.downX - 50){
              
                
                this.btpress=3;
                
            }  else if (this.upX > this.downX + 50) {
            
              
              this.btpress=2;
              
            } else if (this.upY < this.downY - 50) {
               
                
                this.btpress=0;
                
            }  else if (this.upY > this.downY + 50) {
               
              
                this.btpress=1;
              
            } 
            this.pressed=true
            this.drag=true;
           
        }, this);


      }
           

            

        
          if(this.pressed===true)
          {
            
            if(this.value === this.btpress)
            {
             
              this.clean +=10
              this.bubble.visible = true;
              this.bubble.play("bubble");
              this.music1.play();

            }
            else
            {
              this.clean -=5
              this.miss.visible = true;
              this.music2.play();
            }
           this.pressed=false;
          }
         
       
        
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
          this.count +=1;
          if(this.count >= 1)
          {
            
          this.value=Phaser.Math.Between(0, 3);
         
      
         
          if(this.value === 0)
          {
            this.arrowUp.visible = true;
            this.arrowDown.visible = false;
            this.arrowRight.visible = false;
            this.arrowLeft.visible = false;
            
          }
          if(this.value === 1)
          {
            this.arrowUp.visible = false;
            this.arrowDown.visible = true;
            this.arrowRight.visible = false;
            this.arrowLeft.visible = false;
            
          }
          if(this.value === 2)
          {
            this.arrowUp.visible = false;
            this.arrowDown.visible = false;
            this.arrowRight.visible = true;
            this.arrowLeft.visible = false;
            
          }
          if(this.value === 3)
          {
            this.arrowUp.visible = false;
            this.arrowDown.visible = false;
            this.arrowRight.visible = false;
            this.arrowLeft.visible = true;
            
          }
           
          this.count=0;
          this.bubble.visible = false;
          this.miss.visible = false;
          this.pressed=false;
         
          }
          this.timerText.setText('' + this.formatTime(this.initialTime));
      }
    }