import * as Phaser from 'phaser';

import { debug } from 'console';

export class GameOverScene extends Phaser.Scene{
    bg;
    music;
    
    public clean = 100;
    public life=100;
    public coins=0;
   
 
    constructor() {
        super({ key: 'gameover' });
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
        this.load.image('gameover', 'gameover.png');
        this.load.image('buttonover1', 'button_voltar.png');
        this.load.audio('gameoveraudio', 'gameover.ogg');
        
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
         
        
            //set background
          this.add.image(250, 400, 'gameover');
          this.makeButton(250,700,1);
          this.clean = 100;
          this.life=100;
          this.coins=0;
        
          
            
        this.music=  this.sound.add('gameoveraudio');
        this.music.loop = true; // This is what you are lookig for
        this.music.play();
         }
        
        
     
        makeButton(xx,yy,index)
        {
          
           let button =this.add.image(xx,yy,"buttonover"+ index);
          
           button.setInteractive();
        
           button.on('pointerdown', this.doSomething.bind(this))
           
           return button;
        }
        doSomething()
        {         
        this.saveFile();
          this.music.stop();
            this.scene.start('menu',{ life: this.life ,clean:this.clean,coins:this.coins})
      
        }
        
       


    }