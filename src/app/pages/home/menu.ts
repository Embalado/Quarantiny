import * as Phaser from 'phaser';
import { HomePage } from './home.page';
import { debug } from 'console';
import {global} from "./global";
import "@babel/polyfill";
import { homedir } from 'os';


export class TitleScene extends Phaser.Scene{
    bg;
    bg1;
    bg2;
    public hp = 100;
    public clean = 100;
     
    hpText: Phaser.GameObjects.Text;
    foodText:Phaser.GameObjects.Text;
    count = 0;
    music;
    music1;
    count2=0;
    deathTimer=0;
    deathAnimation=false;
    public coins = 0;
  coinText: Phaser.GameObjects.Text;
  Quarantiny: Phaser.Physics.Arcade.Sprite;
  QuarantinyDirty: Phaser.Physics.Arcade.Sprite;
  QuarantinyDeath: Phaser.Physics.Arcade.Sprite;
  QuarantinyLowHp: Phaser.Physics.Arcade.Sprite;
  died= false;
 dayTime=0;

   
 
    constructor() {
        super({ key: 'menu' });
      }
      init (data)
      {
          console.log('init', data);
          this.hp = data.life;
          this.clean=data.clean;
          this.coins=data.coins;
         
          if(this.hp === undefined)
          {
            this.hp=  100;
          }
          if(this.clean === undefined)
          {
            this.clean = 100;
          }
          if(this.coins === undefined)
          {
            this.coins = 0;
          }
      }

     
      preload() {
        this.load.setPath('./assets/Game');
        this.load.image('platform', 'platform.png');
        this.load.image('trash', 'trash.png');
        this.load.image('star', 'star.png');
        this.load.image('room', 'room_bg.jpg');
        this.load.image('room1', 'room_bg_sunset.jpg');
        this.load.image('room2', 'room_bg_night.jpg');
        this.load.image('button1', 'btrunner.png');
        this.load.image('button2', 'btmarket.png');
        this.load.image('button3', 'btmoney.png')
        this.load.image('button4', 'button_friends.png')
        this.load.image('button5', 'button_shop.png')
        this.load.audio('menu', 'Main_Theme.mp3');
        this.load.audio('deathsong', 'deathsong.ogg');
        this.load.spritesheet("quarantiny", "quarantiny.png", { frameWidth: 319, frameHeight:382});
        this.load.spritesheet("quaranDirty", "quaran_dirty.png", { frameWidth: 321, frameHeight: 382});
        this.load.spritesheet("quaranDeath", "quaran_death.png", { frameWidth: 318, frameHeight: 378});
        this.load.spritesheet("quaranLowHp", "quaran_lowhp.png", { frameWidth: 321, frameHeight: 382});
     

        }
        create(){
        

        
            //set background
          this.bg=this.add.image(250, 400, 'room');
          this.bg1=this.add.image(250, 400, 'room1');
          this.bg2=this.add.image(250, 400, 'room2');
          this.bg1.alpha=0;
          this.bg2.alpha=0;

        

          
          this.foodText = this.add.text(110, 40, '', { font: '32px Arial', fill: '#00FFFF' });
          this.hpText = this.add.text(300, 40, '', { font: '32px Arial', fill: '#FF0000' });
          this.coinText = this.add.text(110, 105, '', { font: '32px Arial', fill: '#000000' });
          this.Quarantiny = this.physics.add.sprite(250, 500, 'quarantiny');
          this.QuarantinyDirty = this.physics.add.sprite(250, 500, 'quaranDirty');
          this.QuarantinyDeath = this.physics.add.sprite(250, 500, 'quaranDeath');
          this.QuarantinyLowHp = this.physics.add.sprite(250, 500, 'quaranLowHp');
          this.QuarantinyLowHp.visible=false;
          this.QuarantinyDeath.visible=false;
          this.QuarantinyDirty.visible=false;
          this.died=false;
          this.deathAnimation=false;
          this.deathTimer =0;

          //this.input.on('pointerdown', () => this.scene.start('game'))
          this.makeButton(250,50,1);
          this.makeButton1(60,50,2);
          this.makeButton2(420,720,4);
          this.makeButton3(60,120,3);
          this.makeButton4(80,720,5);
         
          // Each 1000 ms call onEvent
        var timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
          
            
        this.music=  this.sound.add('menu');
        this.music1=  this.sound.add('deathsong');
        this.music.loop = true; // This is what you are lookig for
        this.music.play();
        
        this.loadFile();
        
        this.anims.create({
          key: 'idle',
          frameRate: 5,
          frames: this.anims.generateFrameNumbers('quarantiny', { start: 0, end: 26 }),
          repeat:Infinity,
         
        });
        this.anims.create({
          key: 'dirty',
          frameRate:5,
          frames: this.anims.generateFrameNumbers('quaranDirty', { start: 0, end: 5 }),
          repeat:Infinity,
         
        });
        this.anims.create({
          key: 'death',
          frameRate:3,
          frames: this.anims.generateFrameNumbers('quaranDeath', { start: 0, end: 5 }),
          repeat:0,
         
        });
        this.anims.create({
          key: 'lowhp',
          frameRate:5,
          frames: this.anims.generateFrameNumbers('quaranLowHp', { start: 0, end: 8 }),
          repeat:Infinity,
         
        });

      
        this.Quarantiny.play("idle");
        this.QuarantinyDirty.play("dirty");
        this.QuarantinyLowHp.play("lowhp");
        
        
        
        
        
       
       
        

    
          
          
        }
        formatTime(seconds){
          // Minutes
          var minutes = Math.floor(seconds/60);
          // Seconds
          var partInSeconds = seconds%60;
          // Adds left zeros to seconds
          //partInSeconds =  partInSeconds.toString().padStart(2,'0');
          // Returns formated time
          return `${minutes}:${partInSeconds}`;
      }
      onEvent ()
      {
          this.deathTimer
          this.count +=1;
          
          if(this.count > 15)
          {
           this.count2+=1;

          if(this.count2 === 1)
          {
         
            this.dayTime=0;
          }
          if(this.count2 === 2)
          {
       
            this.dayTime=1;
          }
          if(this.count2 === 3)
          {
          
            this.count2=0;
            this.dayTime=2;
          }

          if(this.clean<=0)
          {
            this.clean=0;
          }
          if(this.clean == 0)
          {
            this.hp-=5;
          }
          this.clean -=1;
          this.count=0;
          }
          if(this.died===true)
          {
            
            this.deathTimer+=1;
          }
          if(this.deathTimer > 2)
          {  
            
            this.scene.start('gameover',{ hp: this.hp ,clean:this.clean,coins:this.coins })
            
          }
          
      }
        update()
        {

          


          switch (this.dayTime) {
            case 0:
              this.bg.alpha+=0.005;
              this.bg1.alpha-=0.005;
              this.bg2.alpha-=0.005;
              break;
            case 1:
              this.bg.alpha-=0.005;
              this.bg1.alpha+=0.005;
              this.bg2.alpha-=0.005;
              break;
            case 2:
              this.bg.alpha-=0.005;
              this.bg1.alpha-=0.005;
              this.bg2.alpha+=0.005;
              break;
          
            default:
              break;
          }
        
          this.saveFile();
      
          if (this.hp <1) {
            
            this.music.stop();
            
            this.died=true;
            this.Quarantiny.visible=false;
            this.QuarantinyLowHp.visible=false;
            this.QuarantinyDirty.visible=false;
            this.QuarantinyDeath.visible=true;
            
           if(this.deathAnimation===false){
            this.QuarantinyDeath.play("death");
            this.music1.play();
           this.deathAnimation=true;
          }
            
          }
          else{
          if(this.hp <=30)
          {
           
            this.Quarantiny.visible=false;
            this.QuarantinyDirty.visible=false;
            this.QuarantinyLowHp.visible=true;
          

          }
          else
          {
          
           if(this.clean<=30)
          {
            this.Quarantiny.visible=false;
            this.QuarantinyDirty.visible=true;
            this.QuarantinyLowHp.visible=false;
          }
          else
          {
            this.Quarantiny.visible=true;
            this.QuarantinyDirty.visible=false;
            this.QuarantinyLowHp.visible=false;
          }
        }
        
        }
         
        if(this.clean<0)
        {
          this.clean=0;
        }
        if(this.hp<0)
        {
          this.hp=0;
        }
          this.hpText.setText('' + this.hp);
          this.foodText.setText(''+this.clean);
          this.coinText.setText(''+this.coins);
        }
       
        
     
        makeButton(xx,yy,index)
        {
          
           let button =this.add.image(xx,yy,"button"+ index);
          
           button.setInteractive();
        
           button.on('pointerdown', this.doSomething.bind(this))
           
           return button;
        }
        doSomething()
        {         
          global.loginState=true;   
          global.loginState1=false;  
          this.music.stop();
            this.scene.start('game',{ hp: this.hp ,clean:this.clean,coins:this.coins})
      
        }
        makeButton1(xx,yy,index)
        {
          
           let button =this.add.image(xx,yy,"button"+ index);
          
           button.setInteractive();
           
           button.on('pointerdown', this.doSomething1.bind(this))
           
           return button;
        }
        doSomething1()
        {     
          global.loginState=true;   
          global.loginState1=false;      
            this.music.stop();
            this.scene.start('game1',{ hp: this.hp ,clean:this.clean,coins:this.coins })
      
        }


        makeButton2(xx,yy,index)
        {
          
           let button =this.add.image(xx,yy,"button"+ index);
          
           button.setInteractive();
           
           button.on('pointerdown', this.doSomething2.bind(this))
           
           return button;
        }
        doSomething2()
        {         
         
            this.music.stop();
           
            this.scene.start('friends',{ hp: this.hp ,clean:this.clean,coins:this.coins })
      
        }
        makeButton3(xx,yy,index)
        {
          
           let button =this.add.image(xx,yy,"button"+ index);
          
           button.setInteractive();
       
           
           button.on('pointerdown', this.doSomething3.bind(this))
           
           return button;
        }
        doSomething3()
        {     
          global.loginState=true;   
          global.loginState1=false;   
            this.music.stop();
            this.scene.start('work',{ hp: this.hp ,clean:this.clean,coins:this.coins })
      
        }
        makeButton4(xx,yy,index)
        {
          
           let button =this.add.image(xx,yy,"button"+ index);
          
           button.setInteractive();
       
           
           button.on('pointerdown', this.doSomething4.bind(this))
           
           return button;
        }
        doSomething4()
        {     
          
            this.music.stop();
            this.scene.start('shop',{ hp: this.hp ,clean:this.clean,coins:this.coins })
      
        }





        saveFile = function(){
          var file = {
              coins: this.coins,
              hp:this.hp,
              clean:this.clean
          };
          localStorage.setItem('saveFile',JSON.stringify(file));
      };
      loadFile = function(){
        var file = JSON.parse(localStorage.getItem('saveFile'));
        this.coins= file.coins;
        this.hp= file.hp;
        this.clean= file.clean;
    };
 
    
    }