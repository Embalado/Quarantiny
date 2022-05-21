import * as Phaser from 'phaser';

import { debug } from 'console';

export class FriendScene extends Phaser.Scene{
    bg;
    music;
  clean: any;
  life: any;
  coins: any;
    
  
    init (data)
    {
        console.log('init', data);
        this.clean = data.clean;
        this.life = data.hp;
        this.coins = data.coins;
    }
 
    constructor() {
        super({ key: 'friends' });
      }
     
     
      preload() {
        this.load.setPath('./assets/Game');
        this.load.image('friend', 'friend.png');
        this.load.image('buttonfriend1', 'button_voltar.png');
        this.load.audio('friendaudio', 'liro.mp3');
        
    }

        
        create(){
         
        
            //set background
          this.add.image(250, 400, 'friend');
          this.makeButton(410,35,1);
         
        
          
            
        this.music=  this.sound.add('friendaudio');
        this.music.loop = true; // This is what you are lookig for
        this.music.play();
         }
        
        
     
        makeButton(xx,yy,index)
        {
          
           let button =this.add.image(xx,yy,"buttonfriend"+ index);
          
           button.setInteractive();
        
           button.on('pointerdown', this.doSomething.bind(this))
           
           return button;
        }
        doSomething()
        {         
          this.music.stop();
            this.scene.start('menu',{ life: this.life ,clean:this.clean,coins:this.coins})
      
        }
        
       


    }